import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export const TIMEZONE = "America/Mexico_City" as const;
export const UNKNOWN_PROVIDER = "__unknown_provider__";
export const UNKNOWN_MODEL = "__unknown_model__";
export const FORBIDDEN_KEYS = [
	"source_path",
	"source_record_id",
	"project",
	"session_id",
	"request_id",
	"message_id",
	"timestamp_ms",
] as const;

export interface DailyUsage {
	date: string;
	usageKey: string;
	provider: string | null;
	model: string | null;
	sources: string[];
	usageEvents: number;
	uncachedInput: number;
	cacheRead: number;
	cacheWrite: number;
	output: number;
	reasoning: number;
	totalProcessed: number;
	pricedEvents: number;
	unpricedEvents: number;
	costNanoUsd: number;
}

export interface ModelUsage {
	schemaVersion: 1;
	generatedAt: string;
	timezone: typeof TIMEZONE;
	collector: {
		name: "memex";
		version: string;
		authority: "local_log";
		costMode: "source";
	};
	coverage: {
		usageEvents: number;
		pricedEvents: number;
		unpricedEvents: number;
		unknownProviderEvents: number;
		unknownModelEvents: number;
		conservativeEvents: number;
		warnings: string[];
	};
	totals: {
		uncachedInput: number;
		cacheRead: number;
		cacheWrite: number;
		output: number;
		reasoning: number;
		totalProcessed: number;
		costNanoUsd: number;
	};
	daily: DailyUsage[];
}

type UnknownRecord = Record<string, unknown>;

const mexicoDateFormatter = new Intl.DateTimeFormat("en-CA", {
	timeZone: TIMEZONE,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
});

function record(value: unknown, name: string): UnknownRecord {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		throw new Error(`Invalid ${name}`);
	}
	return value as UnknownRecord;
}

function array(value: unknown, name: string): unknown[] {
	if (!Array.isArray(value)) throw new Error(`Invalid ${name}`);
	return value;
}

function safeInteger(value: unknown, name: string): number {
	if (!Number.isSafeInteger(value) || (value as number) < 0) {
		throw new Error(`Invalid ${name}`);
	}
	return value as number;
}

function finiteNumber(value: unknown, name: string): number {
	if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
		throw new Error(`Invalid ${name}`);
	}
	return value;
}

function nonemptyString(value: unknown, name: string): string {
	if (typeof value !== "string" || value.length === 0) {
		throw new Error(`Invalid ${name}`);
	}
	return value;
}

function nullableIdentity(value: unknown, name: string): string | null {
	if (value === null) return null;
	const identity = nonemptyString(value, name);
	if (identity === UNKNOWN_PROVIDER || identity === UNKNOWN_MODEL) {
		throw new Error(`Reserved ${name}`);
	}
	return identity;
}

function add(left: number, right: number, name = "aggregate"): number {
	return safeInteger(left + right, name);
}

function localDate(timestamp: unknown): string {
	const milliseconds = safeInteger(timestamp, "timestamp_ms");
	const instant = new Date(milliseconds);
	if (Number.isNaN(instant.valueOf())) throw new Error("Invalid timestamp_ms");
	const parts = Object.fromEntries(
		mexicoDateFormatter
			.formatToParts(instant)
			.filter(({ type }) => type !== "literal")
			.map(({ type, value }) => [type, value]),
	);
	return `${parts.year}-${parts.month}-${parts.day}`;
}

function usageKey(provider: string | null, model: string | null): string {
	return `${provider ?? UNKNOWN_PROVIDER}/${model ?? UNKNOWN_MODEL}`;
}

function validateGeneratedAt(value: string): string {
	if (
		!/^\d{4}-\d{2}-\d{2}T/.test(value) ||
		Number.isNaN(new Date(value).valueOf())
	) {
		throw new Error("Invalid generatedAt");
	}
	return value;
}

function validateWarnings(value: unknown): string[] {
	const warnings = array(value, "warnings").map((warning) =>
		nonemptyString(warning, "warning"),
	);
	if (warnings.length > 0) {
		throw new Error(
			`Memex reported ${warnings.length} warning(s); export aborted`,
		);
	}
	return warnings;
}

export function parseMemexVersion(output: string): string {
	const match = /^memex\s+(\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?)\s*$/.exec(
		output,
	);
	if (!match) throw new Error("Unable to parse Memex version");
	return match[1];
}

export function buildUsageDocument(
	input: unknown,
	version: string,
	generatedAt = new Date().toISOString(),
): ModelUsage {
	const report = record(input, "Memex report");
	if (report.authority !== "local_log") throw new Error("Invalid authority");
	if (report.cost_mode !== "source") throw new Error("Invalid cost mode");
	validateWarnings(report.warnings);
	nonemptyString(report.price_catalog, "price_catalog");
	record(report.cache_waste, "cache_waste");
	array(report.by_source, "by_source");

	const details = array(report.details, "details");
	const reportEvents = safeInteger(report.events, "events");
	const reportTotal = safeInteger(report.total_tokens, "total_tokens");
	const reportUnknownModels = safeInteger(
		report.unknown_model_events,
		"unknown_model_events",
	);
	const reportConservative = safeInteger(
		report.conservative_events,
		"conservative_events",
	);
	const reportPriced = safeInteger(report.priced_events, "priced_events");
	const reportUnpriced = safeInteger(report.unpriced_events, "unpriced_events");
	const reportKnownCost = finiteNumber(report.known_cost_usd, "known_cost_usd");
	if (details.length !== reportEvents)
		throw new Error("Event reconciliation failed");
	if (add(reportPriced, reportUnpriced) !== reportEvents) {
		throw new Error("Cost coverage reconciliation failed");
	}

	const rows = new Map<string, DailyUsage>();
	let usageEvents = 0;
	let pricedEvents = 0;
	let unpricedEvents = 0;
	let unknownProviderEvents = 0;
	let unknownModelEvents = 0;
	let conservativeEvents = 0;

	for (const [index, value] of details.entries()) {
		const event = record(value, `event ${index}`);
		const provider = nullableIdentity(event.provider, "provider");
		const model = nullableIdentity(event.model, "model");
		const source = nonemptyString(event.source, "source");
		const tokens = record(event.tokens, "tokens");
		// Required non-additive fields are validated so schema drift fails closed.
		safeInteger(tokens.raw_input, "raw_input");
		const uncachedInput = safeInteger(tokens.uncached_input, "uncached_input");
		const cacheRead = safeInteger(tokens.cache_read, "cache_read");
		const cacheWrite = safeInteger(tokens.cache_write, "cache_write");
		const cacheWrite1h = safeInteger(tokens.cache_write_1h, "cache_write_1h");
		const output = safeInteger(tokens.output, "output");
		const reasoning = safeInteger(tokens.reasoning, "reasoning");
		if (cacheWrite1h > cacheWrite)
			throw new Error("Invalid cache_write_1h subset");
		if (reasoning > output) throw new Error("Invalid reasoning subset");
		const totalProcessed = add(
			add(uncachedInput, cacheRead),
			add(cacheWrite, output),
			"total processed",
		);

		const sourceCost = event.source_cost_usd;
		const isPriced = sourceCost !== null;
		const costNanoUsd = isPriced
			? safeInteger(
					Math.round(
						finiteNumber(sourceCost, "source_cost_usd") * 1_000_000_000,
					),
					"costNanoUsd",
				)
			: 0;
		const date = localDate(event.timestamp_ms);
		const exactUsageKey = usageKey(provider, model);
		const groupKey = JSON.stringify([date, provider, model]);
		const row = rows.get(groupKey) ?? {
			date,
			usageKey: exactUsageKey,
			provider,
			model,
			sources: [],
			usageEvents: 0,
			uncachedInput: 0,
			cacheRead: 0,
			cacheWrite: 0,
			output: 0,
			reasoning: 0,
			totalProcessed: 0,
			pricedEvents: 0,
			unpricedEvents: 0,
			costNanoUsd: 0,
		};
		row.usageEvents = add(row.usageEvents, 1);
		row.uncachedInput = add(row.uncachedInput, uncachedInput);
		row.cacheRead = add(row.cacheRead, cacheRead);
		row.cacheWrite = add(row.cacheWrite, cacheWrite);
		row.output = add(row.output, output);
		row.reasoning = add(row.reasoning, reasoning);
		row.totalProcessed = add(row.totalProcessed, totalProcessed);
		row.pricedEvents = add(row.pricedEvents, Number(isPriced));
		row.unpricedEvents = add(row.unpricedEvents, Number(!isPriced));
		row.costNanoUsd = add(row.costNanoUsd, costNanoUsd);
		if (!row.sources.includes(source)) row.sources.push(source);
		rows.set(groupKey, row);

		usageEvents = add(usageEvents, 1);
		pricedEvents = add(pricedEvents, Number(isPriced));
		unpricedEvents = add(unpricedEvents, Number(!isPriced));
		unknownProviderEvents = add(
			unknownProviderEvents,
			Number(provider === null),
		);
		unknownModelEvents = add(unknownModelEvents, Number(model === null));
		conservativeEvents = add(
			conservativeEvents,
			Number(event.conservative_undercount === true),
		);
		if (typeof event.conservative_undercount !== "boolean") {
			throw new Error("Invalid conservative_undercount");
		}
	}

	const daily = [...rows.values()]
		.map((row) => ({ ...row, sources: row.sources.toSorted() }))
		.sort(
			(left, right) =>
				left.date.localeCompare(right.date) ||
				left.usageKey.localeCompare(right.usageKey),
		);
	const totals: ModelUsage["totals"] = {
		uncachedInput: 0,
		cacheRead: 0,
		cacheWrite: 0,
		output: 0,
		reasoning: 0,
		totalProcessed: 0,
		costNanoUsd: 0,
	};
	for (const row of daily) {
		totals.uncachedInput = add(totals.uncachedInput, row.uncachedInput);
		totals.cacheRead = add(totals.cacheRead, row.cacheRead);
		totals.cacheWrite = add(totals.cacheWrite, row.cacheWrite);
		totals.output = add(totals.output, row.output);
		totals.reasoning = add(totals.reasoning, row.reasoning);
		totals.totalProcessed = add(totals.totalProcessed, row.totalProcessed);
		totals.costNanoUsd = add(totals.costNanoUsd, row.costNanoUsd);
	}

	if (
		usageEvents !== reportEvents ||
		pricedEvents !== reportPriced ||
		unpricedEvents !== reportUnpriced ||
		unknownModelEvents !== reportUnknownModels ||
		conservativeEvents !== reportConservative ||
		totals.totalProcessed !== reportTotal
	) {
		throw new Error("Memex aggregate reconciliation failed");
	}
	const costDifference = Math.abs(
		reportKnownCost - totals.costNanoUsd / 1_000_000_000,
	);
	const costTolerance = Math.max(1, pricedEvents) / 1_000_000_000;
	if (costDifference > costTolerance)
		throw new Error("Memex cost reconciliation failed");

	return {
		schemaVersion: 1,
		generatedAt: validateGeneratedAt(generatedAt),
		timezone: TIMEZONE,
		collector: {
			name: "memex",
			version: nonemptyString(version, "Memex version"),
			authority: "local_log",
			costMode: "source",
		},
		coverage: {
			usageEvents,
			pricedEvents,
			unpricedEvents,
			unknownProviderEvents,
			unknownModelEvents,
			conservativeEvents,
			warnings: [],
		},
		totals,
		daily,
	};
}

export async function writeUsageAtomically(
	destination: string,
	usage: ModelUsage,
): Promise<void> {
	const temporary = join(
		dirname(destination),
		`.model-usage-${process.pid}-${crypto.randomUUID()}.tmp`,
	);
	await mkdir(dirname(destination), { recursive: true });
	try {
		await writeFile(temporary, `${JSON.stringify(usage, null, 2)}\n`, "utf8");
		await rename(temporary, destination);
	} finally {
		await rm(temporary, { force: true });
	}
}

export async function exportReport(
	report: unknown,
	destination: string,
	version: string,
	generatedAt?: string,
): Promise<ModelUsage> {
	const usage = buildUsageDocument(report, version, generatedAt);
	await writeUsageAtomically(destination, usage);
	return usage;
}

async function runMemex(arguments_: string[]): Promise<string> {
	let child: ReturnType<typeof Bun.spawn>;
	try {
		child = Bun.spawn(arguments_, { stdout: "pipe", stderr: "pipe" });
	} catch {
		throw new Error("Unable to start Memex; is it installed?");
	}
	const stdout = new Response(child.stdout).text();
	// Consume stderr without echoing it: Memex diagnostics may contain private paths.
	const stderr = new Response(child.stderr).text();
	const [exitCode, output] = await Promise.all([
		child.exited,
		stdout,
		stderr,
	]).then(([code, text]) => [code, text] as const);
	if (exitCode !== 0) throw new Error(`Memex exited with status ${exitCode}`);
	return output;
}

async function main(): Promise<void> {
	const version = parseMemexVersion(await runMemex(["memex", "--version"]));
	let report: unknown;
	try {
		report = JSON.parse(
			await runMemex([
				"memex",
				"usage",
				"--json",
				"--events",
				"--cost",
				"source",
			]),
		);
	} catch (error) {
		if (error instanceof SyntaxError)
			throw new Error("Memex stdout was not valid JSON");
		throw error;
	}
	const destination = join(
		import.meta.dir,
		"..",
		"src",
		"data",
		"model-usage.json",
	);
	const usage = await exportReport(report, destination, version);
	const keys = new Set(usage.daily.map(({ usageKey: key }) => key));
	const range = usage.daily.length
		? `${usage.daily[0].date} to ${usage.daily.at(-1)?.date}`
		: "no observed dates";
	console.log(`Generated src/data/model-usage.json`);
	console.log(
		`${range}; ${keys.size} exact usage keys; ${usage.coverage.usageEvents} events; ${usage.totals.totalProcessed} total processed tokens; ${usage.coverage.pricedEvents}/${usage.coverage.usageEvents} priced`,
	);
}

if (import.meta.main) {
	await main();
}
