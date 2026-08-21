export interface DailyUsage {
	date: string;
	usageKey: string;
	provider: string | null;
	model: string | null;
	sources: string[];
	sourceUsageEvents: Record<string, number | undefined>;
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

export interface ModelUsageData {
	generatedAt: string;
	timezone: string;
	collector: { version: string };
	daily: DailyUsage[];
}

export interface UsageSummary {
	key: string;
	provider: string | null;
	model: string | null;
	rows: DailyUsage[];
	activeDays: number;
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
	firstObserved?: string;
	lastObserved?: string;
}

export const summarizeUsage = (
	daily: readonly DailyUsage[],
	keys: readonly string[],
): UsageSummary => {
	const rows = daily.filter(({ usageKey }) => keys.includes(usageKey));
	const first = rows[0];
	const last = rows.at(-1);
	return {
		key: keys.join(", "),
		provider: first?.provider ?? null,
		model: first?.model ?? null,
		rows,
		activeDays: new Set(rows.map(({ date }) => date)).size,
		usageEvents: rows.reduce((total, row) => total + row.usageEvents, 0),
		uncachedInput: rows.reduce((total, row) => total + row.uncachedInput, 0),
		cacheRead: rows.reduce((total, row) => total + row.cacheRead, 0),
		cacheWrite: rows.reduce((total, row) => total + row.cacheWrite, 0),
		output: rows.reduce((total, row) => total + row.output, 0),
		reasoning: rows.reduce((total, row) => total + row.reasoning, 0),
		totalProcessed: rows.reduce((total, row) => total + row.totalProcessed, 0),
		pricedEvents: rows.reduce((total, row) => total + row.pricedEvents, 0),
		unpricedEvents: rows.reduce((total, row) => total + row.unpricedEvents, 0),
		costNanoUsd: rows.reduce((total, row) => total + row.costNanoUsd, 0),
		firstObserved: first?.date,
		lastObserved: last?.date,
	};
};

export const mostUsedSource = (
	rows: readonly DailyUsage[],
): string | undefined => {
	const usage = new Map<string, number>();
	for (const row of rows) {
		for (const [source, events] of Object.entries(row.sourceUsageEvents)) {
			if (events !== undefined) {
				usage.set(source, (usage.get(source) ?? 0) + events);
			}
		}
	}
	return [...usage.entries()].sort(
		([leftSource, leftEvents], [rightSource, rightEvents]) =>
			rightEvents - leftEvents || leftSource.localeCompare(rightSource),
	)[0]?.[0];
};

export const unrankedUsage = (
	daily: readonly DailyUsage[],
	ownedKeys: ReadonlySet<string>,
): UsageSummary[] =>
	[...new Set(daily.map(({ usageKey }) => usageKey))]
		.filter((key) => !ownedKeys.has(key))
		.map((key) => summarizeUsage(daily, [key]))
		.sort(
			(left, right) =>
				right.totalProcessed - left.totalProcessed ||
				left.key.localeCompare(right.key),
		);
