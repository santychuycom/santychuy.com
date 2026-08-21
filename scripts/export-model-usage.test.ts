import { describe, expect, test } from "bun:test";
import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { type RankedModel, validateRankings } from "../src/data/ai-models";
import {
	buildUsageDocument,
	exportReport,
	FORBIDDEN_KEYS,
	parseMemexVersion,
	UNKNOWN_MODEL,
	UNKNOWN_PROVIDER,
} from "./export-model-usage";

interface FixtureEvent {
	source: string;
	timestamp_ms: number;
	provider: string | null;
	model: string | null;
	tokens: {
		raw_input: number;
		uncached_input: number;
		cache_read: number;
		cache_write: number;
		cache_write_1h: number;
		output: number;
		reasoning: number;
	};
	source_cost_usd: number | null;
	conservative_undercount: boolean;
	[key: string]: unknown;
}

const instant = (value: string) => new Date(value).valueOf();
const fixtureEvent = (overrides: Partial<FixtureEvent> = {}): FixtureEvent => ({
	source: "pi",
	timestamp_ms: instant("2026-08-22T06:00:00Z"),
	provider: "openai",
	model: "gpt-test",
	tokens: {
		raw_input: 3,
		uncached_input: 1,
		cache_read: 2,
		cache_write: 3,
		cache_write_1h: 1,
		output: 4,
		reasoning: 2,
	},
	source_cost_usd: 0.0000000014,
	conservative_undercount: false,
	...overrides,
});

const fixtureReport = (events: FixtureEvent[]) => {
	const priced = events.filter(({ source_cost_usd: cost }) => cost !== null);
	return {
		authority: "local_log",
		events: events.length,
		total_tokens: events.reduce(
			(total, { tokens }) =>
				total +
				tokens.uncached_input +
				tokens.cache_read +
				tokens.cache_write +
				tokens.output,
			0,
		),
		unknown_model_events: events.filter(({ model }) => model === null).length,
		conservative_events: events.filter(
			({ conservative_undercount: conservative }) => conservative,
		).length,
		cost_mode: "source",
		price_catalog: "ignored-in-source-mode",
		known_cost_usd:
			priced.reduce(
				(total, { source_cost_usd: cost }) =>
					total + Math.round((cost ?? 0) * 1_000_000_000),
				0,
			) / 1_000_000_000,
		priced_events: priced.length,
		unpriced_events: events.length - priced.length,
		cache_waste: {},
		by_source: [],
		details: events,
		warnings: [],
	};
};

const build = (events: FixtureEvent[]) =>
	buildUsageDocument(
		fixtureReport(events),
		"0.10.2",
		"2026-08-23T00:00:00.000Z",
	);

describe("model usage export", () => {
	test("parses the installed Memex version", () => {
		expect(parseMemexVersion("memex 0.10.2\n")).toBe("0.10.2");
		expect(() => parseMemexVersion("unexpected")).toThrow();
	});

	test("merges one model on the same Mexico City day", () => {
		const usage = build([fixtureEvent(), fixtureEvent()]);
		expect(usage.daily).toHaveLength(1);
		expect(usage.daily[0].usageEvents).toBe(2);
	});

	test("buckets UTC timestamps across Mexico City midnight", () => {
		const usage = build([
			fixtureEvent({ timestamp_ms: instant("2026-08-22T04:30:00Z") }),
			fixtureEvent({ timestamp_ms: instant("2026-08-22T06:30:00Z") }),
		]);
		expect(usage.daily.map(({ date }) => date)).toEqual([
			"2026-08-21",
			"2026-08-22",
		]);
	});

	test("merges exact models across sources and sorts source names", () => {
		const usage = build([
			fixtureEvent({ source: "pi" }),
			fixtureEvent({ source: "codex" }),
		]);
		expect(usage.daily[0].sources).toEqual(["codex", "pi"]);
	});

	test("keeps providers with the same model name separate", () => {
		const usage = build([
			fixtureEvent({ provider: "openai" }),
			fixtureEvent({ provider: "other" }),
		]);
		expect(usage.daily.map(({ usageKey }) => usageKey)).toEqual([
			"openai/gpt-test",
			"other/gpt-test",
		]);
	});

	test("includes cache buckets but does not count reasoning twice", () => {
		const usage = build([fixtureEvent()]);
		expect(usage.totals).toMatchObject({
			uncachedInput: 1,
			cacheRead: 2,
			cacheWrite: 3,
			output: 4,
			reasoning: 2,
			totalProcessed: 10,
		});
	});

	test("rounds each source cost to integer nano-USD", () => {
		const usage = build([
			fixtureEvent({ source_cost_usd: 0.0000000014 }),
			fixtureEvent({ source_cost_usd: 0.0000000016 }),
		]);
		expect(usage.totals.costNanoUsd).toBe(3);
	});

	test("keeps unpriced events without fabricating cost", () => {
		const usage = build([fixtureEvent({ source_cost_usd: null })]);
		expect(usage.coverage).toMatchObject({
			pricedEvents: 0,
			unpricedEvents: 1,
		});
		expect(usage.totals.costNanoUsd).toBe(0);
	});

	test("preserves unknown identities as explicit non-rankable evidence", () => {
		const usage = build([
			fixtureEvent({ provider: null }),
			fixtureEvent({ model: null }),
		]);
		expect(usage.coverage).toMatchObject({
			unknownProviderEvents: 1,
			unknownModelEvents: 1,
		});
		expect(usage.daily.map(({ usageKey }) => usageKey)).toEqual([
			`${UNKNOWN_PROVIDER}/gpt-test`,
			`openai/${UNKNOWN_MODEL}`,
		]);
	});

	test("publishes conservative coverage without rejecting observed evidence", () => {
		const usage = build([fixtureEvent({ conservative_undercount: true })]);
		expect(usage.coverage.conservativeEvents).toBe(1);
	});

	test("constructs output from an allowlist", () => {
		const event = fixtureEvent({
			source_path: "/home/SECRET-SENTINEL/transcript.jsonl",
			source_record_id: "SECRET-SENTINEL",
			project: "SECRET-SENTINEL",
			session_id: "SECRET-SENTINEL",
			request_id: "SECRET-SENTINEL",
			message_id: "SECRET-SENTINEL",
			transcript: "SECRET-SENTINEL",
		});
		const serialized = JSON.stringify(build([event]));
		for (const key of FORBIDDEN_KEYS) expect(serialized).not.toContain(key);
		expect(serialized).not.toContain("SECRET-SENTINEL");
	});

	test("orders rows and sources deterministically", () => {
		const events = [
			fixtureEvent({ model: "z", source: "pi" }),
			fixtureEvent({ model: "a", source: "codex" }),
		];
		expect(JSON.stringify(build(events))).toBe(
			JSON.stringify(build(events.toReversed())),
		);
	});

	test("fails closed on warnings, malformed buckets, and reconciliation", () => {
		const warned = fixtureReport([fixtureEvent()]);
		warned.warnings = ["partial scan"];
		expect(() =>
			buildUsageDocument(warned, "0.10.2", "2026-08-23T00:00:00.000Z"),
		).toThrow();
		expect(() =>
			build([
				fixtureEvent({
					tokens: { ...fixtureEvent().tokens, uncached_input: -1 },
				}),
			]),
		).toThrow();
		const mismatched = fixtureReport([fixtureEvent()]);
		mismatched.total_tokens += 1;
		expect(() =>
			buildUsageDocument(mismatched, "0.10.2", "2026-08-23T00:00:00.000Z"),
		).toThrow();
	});

	test("does not replace the destination after validation failure", async () => {
		const directory = await mkdtemp(join(tmpdir(), "model-usage-"));
		const destination = join(directory, "model-usage.json");
		await writeFile(destination, "UNCHANGED\n");
		const invalid = fixtureReport([fixtureEvent()]);
		invalid.events += 1;
		await expect(
			exportReport(invalid, destination, "0.10.2", "2026-08-23T00:00:00.000Z"),
		).rejects.toThrow();
		expect(await readFile(destination, "utf8")).toBe("UNCHANGED\n");
		expect(await readdir(directory)).toEqual(["model-usage.json"]);
		await rm(directory, { recursive: true, force: true });
	});
});

describe("manual ranking validation", () => {
	const ranked = (overrides: Partial<RankedModel> = {}): RankedModel => ({
		id: "model",
		usageKeys: ["provider/model"],
		name: "Model",
		provider: "Provider",
		opinion: {
			en: { summary: "Owner-written English summary." },
			es: { summary: "Resumen en español escrito por el propietario." },
		},
		...overrides,
	});

	test("rejects duplicate ranking IDs and usage-key ownership", () => {
		expect(() => validateRankings([ranked(), ranked()])).toThrow();
		expect(() =>
			validateRankings([
				ranked(),
				ranked({ id: "other", usageKeys: ["provider/model"] }),
			]),
		).toThrow();
	});

	test("rejects reserved unknown keys and missing bilingual summaries", () => {
		expect(() =>
			validateRankings([ranked({ usageKeys: [`${UNKNOWN_PROVIDER}/model`] })]),
		).toThrow();
		expect(() =>
			validateRankings([
				ranked({
					opinion: { en: { summary: "" }, es: { summary: "Resumen" } },
				}),
			]),
		).toThrow();
	});
});
