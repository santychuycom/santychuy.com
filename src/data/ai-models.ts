export interface RankedModel {
	id: string;
	usageKeys: readonly string[];
	name: string;
	provider: string;
	opinion: {
		en: {
			summary: string;
			bestFor?: string;
			tradeoff?: string;
		};
		es: {
			summary: string;
			bestFor?: string;
			tradeoff?: string;
		};
	};
}

const RESERVED_USAGE_SEGMENTS = new Set([
	"__unknown_provider__",
	"__unknown_model__",
]);

// Owner-managed: array position + 1 is rank. Keep empty until Santiago supplies
// the initial ordered entries and bilingual opinions.
export const rankedModels: readonly RankedModel[] = [];

function requireText(value: string | undefined, label: string): void {
	if (!value?.trim()) throw new Error(`Missing ${label}`);
}

export function validateRankings(
	models: readonly RankedModel[] = rankedModels,
): void {
	const ids = new Set<string>();
	const usageKeyOwners = new Set<string>();
	for (const model of models) {
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(model.id) || ids.has(model.id)) {
			throw new Error(`Duplicate or invalid model id: ${model.id}`);
		}
		ids.add(model.id);
		requireText(model.name, `${model.id} name`);
		requireText(model.provider, `${model.id} provider`);
		requireText(model.opinion.en.summary, `${model.id} English summary`);
		requireText(model.opinion.es.summary, `${model.id} Spanish summary`);
		for (const [locale, opinion] of Object.entries(model.opinion)) {
			if (opinion.bestFor !== undefined) {
				requireText(opinion.bestFor, `${model.id} ${locale} bestFor`);
			}
			if (opinion.tradeoff !== undefined) {
				requireText(opinion.tradeoff, `${model.id} ${locale} tradeoff`);
			}
		}
		if (model.usageKeys.length === 0) {
			throw new Error(`Missing usage keys for ${model.id}`);
		}
		for (const key of model.usageKeys) {
			const segments = key.split("/");
			if (
				segments.length < 2 ||
				segments.some((segment) => !segment) ||
				segments.some((segment) => RESERVED_USAGE_SEGMENTS.has(segment)) ||
				usageKeyOwners.has(key)
			) {
				throw new Error(`Duplicate, unknown, or invalid usage key: ${key}`);
			}
			usageKeyOwners.add(key);
		}
	}
}

validateRankings();
