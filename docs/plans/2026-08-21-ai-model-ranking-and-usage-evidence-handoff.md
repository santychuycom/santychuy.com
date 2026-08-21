# AI Model Ranking and Usage Evidence Handoff

## Status

Implementation-ready design. No product code has been written yet.

Research completed on 2026-08-21 against:

- `santychuy.com` at commit `13c6197`
- locally installed Memex `0.10.2`
- latest available Memex release `0.11.4`

## Goal

Add a dedicated bilingual page where Santiago manually ranks AI models and publishes his own summary of each model. Support every ranked model with safe, daily usage evidence reconstructed locally by Memex and published weekly through the existing repository and deployment flow.

Usage demonstrates experience with a model. Usage must never determine rank automatically or be presented as proof that an opinion is objectively correct.

## Owner Decisions

These decisions are settled. Do not reopen them during implementation unless a repository constraint makes one impossible.

1. Use the existing `santychuy.com` Astro project.
2. Publish English and Spanish pages at `/ai-models` and `/es/ai-models`.
3. Santiago controls ranking manually. Array order is rank order.
4. Santiago writes every model opinion or summary manually. Do not generate opinions on his behalf.
5. Retain and publish all available daily aggregate history.
6. Refresh evidence weekly from the local machine, with human review before publication.
7. Total processed tokens include uncached input, cache reads, cache writes, and output.
8. Reasoning is already a subset of output in Memex and must not be counted twice.
9. Costs are analytical API-equivalent estimates. They are not subscription charges, subscription quotas, invoices, or proof of money paid.
10. Raw transcripts and event identifiers remain private.
11. Keep the first implementation static and simple: no database, ingestion API, public Memex service, scheduler, or chart dependency.

## Product Language

Use this distinction consistently across UI, metadata, documentation, and tests.

### Opinion

- Manually written by Santiago.
- Manually ordered.
- Subjective and expected to change.
- Never calculated from token count, cost, activity, or request volume.

### Evidence

- Self-reported usage reconstructed from local agent logs by Memex.
- Shows that Santiago has used a model and how much activity Memex observed.
- Supports familiarity, not objective model quality.
- Published only as aggregate counters grouped by local calendar day and model.

### Cost

Preferred visible label:

> API-equivalent estimate

Required methodology note:

> Costs are analytical API-equivalent estimates reconstructed from local provider telemetry. They do not represent subscription charges, subscription quotas, invoices, or confirmed money paid.

### Tokens

Preferred visible label:

> Total processed tokens

Required methodology note:

> Total processed tokens include uncached input, cache reads, cache writes, and output. Cache reads can dominate the total, so the token breakdown is shown separately.

## Current Project Fit

Observed project facts:

- Astro 5 with TypeScript strict mode.
- Cloudflare deployment through SST and GitHub Actions.
- English is served from root; Spanish uses `/es/`.
- Existing pages use `Base.astro`, locale message maps, canonical URLs, alternate language links, and static rendering.
- Styling is editorial and token-driven. Use existing semantic tokens and breakpoints.
- The v2 product plan allows a third dedicated page; this page fills that slot.
- `llms.txt` and `llms-full.txt` already expose site discovery information.

Follow `AGENTS.md` and relevant `.context/` files before implementation.

## Architecture

```text
Local agent logs
    |
    v
memex usage --json --events --cost source
    |
    v
Local Bun exporter
    |-- validates Memex output
    |-- groups all history by date and exact model key
    |-- removes private metadata
    |-- reconciles totals
    v
src/data/model-usage.json
    |
    +--> static Astro ranking pages
    +--> prerendered /data/model-usage.json
    |
    v
Normal branch, PR, review, and Cloudflare deployment
```

Manual opinion data stays separate:

```text
src/data/ai-models.ts
    |
    v
Manual order and bilingual summaries
```

The page joins manual opinion data to generated usage rows at build time.

## Why Memex Is Used Only Locally

Memex can reconstruct historical usage with:

```bash
memex usage --json --events --cost source
```

The event output includes enough data to aggregate by date, provider, and model. It also includes private paths and identifiers that must never be copied into the generated public file.

Do not use `memex web` as a website data source. Its server is intentionally loopback-only, authenticated, and capable of browsing private conversation history. Do not proxy it to Cloudflare or expose its bearer token.

Do not copy Memex's internal pricing table. Event-level automatic fallback costs are not serialized in a form that can be safely attributed per model. For v1, sum `source_cost_usd` when present and publish explicit cost coverage. Missing costs remain missing rather than guessed.

## Proposed Files

Keep the diff close to this shape:

```text
scripts/export-model-usage.ts
scripts/export-model-usage.test.ts
src/data/ai-models.ts
src/data/model-usage.json
src/components/pages/AIModels/index.astro
src/pages/ai-models.astro
src/pages/es/ai-models.astro
src/pages/data/model-usage.json.ts
```

Expected edits:

```text
package.json
src/components/layout/Header.astro
src/i18n/en.ts
src/i18n/es.ts
src/pages/llms.txt.ts
src/pages/llms-full.txt.ts
```

Do not add a dependency unless existing platform APIs cannot satisfy a verified requirement. Bun, Astro, TypeScript, `Intl`, and standard HTML are enough.

## Manual Ranking Contract

Create `src/data/ai-models.ts` as the only source of ranking and opinion content.

Recommended minimal shape:

```ts
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

export const rankedModels = [
  // Santiago supplies entries and wording.
] satisfies readonly RankedModel[];
```

Rules:

- Array position plus one is the displayed rank. Do not duplicate rank as a numeric property.
- `id` is a stable public slug-like identifier chosen for the opinion card.
- Each `usageKeys` entry matches generated evidence using `${provider}/${model}`.
- Multiple exact provider/model names may map to one public card when they are genuinely aliases or access routes for the same model.
- One exact usage key must not belong to two ranked cards.
- Build must fail on duplicate `id` or duplicate `usageKeys` ownership.
- Summaries are required in both languages before a ranked entry ships.
- `bestFor` and `tradeoff` stay optional. Do not force Santiago into a scoring rubric.

Missing owner content is the only expected content blocker. The implementation agent may build the empty and unranked states first, but must ask Santiago for initial ordered entries and bilingual summaries before declaring the page complete. Do not infer a ranking from observed usage.

## Generated Evidence Contract

Create `src/data/model-usage.json`. It is generated, committed, reviewable, and safe to expose publicly.

Recommended shape:

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-08-21T00:00:00.000Z",
  "timezone": "America/Mexico_City",
  "collector": {
    "name": "memex",
    "version": "0.10.2",
    "authority": "local_log",
    "costMode": "source"
  },
  "coverage": {
    "usageEvents": 0,
    "pricedEvents": 0,
    "unpricedEvents": 0,
    "unknownModelEvents": 0,
    "conservativeEvents": 0,
    "warnings": []
  },
  "totals": {
    "uncachedInput": 0,
    "cacheRead": 0,
    "cacheWrite": 0,
    "output": 0,
    "reasoning": 0,
    "totalProcessed": 0,
    "costNanoUsd": 0
  },
  "daily": [
    {
      "date": "2026-08-21",
      "usageKey": "provider/model",
      "provider": "provider",
      "model": "model",
      "sources": ["pi"],
      "usageEvents": 0,
      "uncachedInput": 0,
      "cacheRead": 0,
      "cacheWrite": 0,
      "output": 0,
      "reasoning": 0,
      "totalProcessed": 0,
      "pricedEvents": 0,
      "unpricedEvents": 0,
      "costNanoUsd": 0
    }
  ]
}
```

### Numeric rules

For every event:

```text
totalProcessed = uncachedInput + cacheRead + cacheWrite + output
```

Do not add `reasoning` again. Memex retains reasoning as an output subset.

Convert each finite, non-negative `source_cost_usd` into integer nano-USD before summing:

```text
costNanoUsd = round(source_cost_usd * 1_000_000_000)
```

Integer nano-USD avoids floating-point drift and mirrors Memex's internal accounting. Format USD only in the UI.

### Grouping rules

- Scan all available history on every weekly export.
- Group by local calendar date in `America/Mexico_City` and exact `provider/model` key.
- Merge the same exact provider/model across agent sources, while retaining a sorted unique `sources` list.
- Keep one daily row per date and exact usage key.
- Sort daily rows deterministically by date ascending, then usage key ascending.
- Recompute from source each run. Do not append incrementally in v1.
- Unknown provider or model values must not silently merge into a ranked model. Preserve them as explicit unmatched evidence when possible and report unknown coverage.

Full rescanning is deliberate. Add incremental storage only if measured runtime or memory becomes a real problem.

## Privacy Boundary

The generated JSON and rendered HTML must never contain these Memex event fields:

```text
source_path
source_record_id
project
session_id
request_id
message_id
timestamp_ms
```

Also exclude:

- Transcript text
- Prompt or response content
- Tool arguments or results
- Repository paths
- Usernames or machine paths
- Exact times of day
- Authentication material

The exporter should construct new safe objects from an allowlist. Do not clone events and delete selected keys afterward.

Add a test that recursively scans serialized output for every forbidden key and a fixture containing obvious secret-like sentinel values. The sentinels must not appear in output.

Never write raw `memex usage --events` output inside the repository. Keep it in memory. If debugging requires a temporary file, use the OS temporary directory and remove it before completion.

## Exporter Behavior

Add this package command:

```json
{
  "scripts": {
    "models:usage": "bun scripts/export-model-usage.ts",
    "test:models": "bun test scripts/export-model-usage.test.ts"
  }
}
```

Exporter sequence:

1. Run `memex --version` and parse the version string.
2. Run `memex usage --json --events --cost source` with arguments passed as an array, not shell interpolation.
3. Fail clearly if `memex` is missing, command exits nonzero, stdout is not JSON, or required fields are absent.
4. Require `authority === "local_log"` and `cost_mode === "source"`.
5. Fail when Memex reports non-empty `warnings`; do not publish a known partial scan.
6. Permit unpriced events, but expose priced and unpriced coverage.
7. Validate token buckets as finite, safe, non-negative integers.
8. Validate timestamps before date conversion.
9. Build safe daily rows from an allowlist.
10. Reconcile aggregate event and token totals against Memex's report.
11. Reconcile source-cost totals against `known_cost_usd` within a small rounding tolerance when all priced values are present.
12. Serialize stable, formatted JSON with a trailing newline.
13. Write atomically by creating a sibling temporary file and renaming it over `src/data/model-usage.json` only after every check passes.
14. Print a short summary: generated path, date range, model count, event count, total processed tokens, and cost coverage. Do not print private event data.

Do not run `memex update` automatically. Record the installed version. A future Memex schema mismatch should fail closed with an actionable error.

## Page Behavior

### Routes

- English: `/ai-models`
- Spanish: `/es/ai-models`
- Public evidence JSON: `/data/model-usage.json`

Both pages are static and use `Base.astro`.

Each page must provide:

- Locale-correct title and description.
- Canonical URL.
- English and Spanish alternate URLs.
- Working language switcher preserving the AI-model page route.
- A discoverable header link: `AI Models` in English and `Modelos de IA` in Spanish.

### Content order

1. **Introduction**
   - Explain that ranking is Santiago's current opinion.
   - Explain that usage demonstrates experience.
   - Show evidence generation date.

2. **Ranked models**
   - Render cards or editorial sections in manual array order.
   - Show rank, model name, provider, manual summary, and optional best-use/tradeoff copy.
   - Join every declared `usageKeys` entry and show lifetime evidence.

3. **Used but not ranked**
   - Show exact usage keys present in generated data but not owned by a ranked card.
   - This section catches new models and avoids silently hiding usage.

4. **Daily history**
   - Put all daily rows in an accessible native `<details>` section and semantic table.
   - Keep it collapsed by default so the page remains editorial rather than dashboard-heavy.
   - Use horizontal overflow on narrow screens instead of client-side table code.

5. **Methodology**
   - Include the required opinion, evidence, token, and cost language from this document.
   - Show Memex version, timezone, source-cost coverage, unknown events, conservative events, and warnings.
   - Link to `/data/model-usage.json` and the public repository.

### Per-model evidence

Show these lifetime values:

- Active days
- Usage events
- Uncached input
- Cache reads
- Cache writes
- Output
- Total processed tokens
- API-equivalent estimate
- First observed date
- Last observed date
- Cost coverage when below 100 percent

Do not show a single opaque total without the token breakdown.

Use `Intl.NumberFormat` for locale-aware integers, compact values, dates, and USD display. Keep exact values available in accessible text or title text when using compact formatting.

### Visual direction

Follow `.context/design-context.md` and `.context/design-system.md`:

- Editorial ranking, not SaaS dashboard.
- Existing Satoshi font and semantic tokens.
- Warm paper surface, readable measure, strong hierarchy.
- Rank should be typographic, not a decorative badge wall.
- Subtle borders and spacing; no gradients or heavy shadows.
- No chart library.
- No client JavaScript unless a verified accessibility or usability requirement cannot be met with native HTML.
- Preserve visible focus states, touch targets, contrast, reduced motion, and mobile table usability.

A small static activity treatment may be added only if it remains accessible and materially improves understanding. It is not required for v1; the daily table is sufficient.

## Derived Data Rules

Compute lifetime summaries at Astro build time from daily rows. Do not duplicate lifetime rows in generated JSON.

For each ranked card:

1. Select all daily rows whose `usageKey` appears in `usageKeys`.
2. Sum counters using integer arithmetic.
3. Count unique dates as active days.
4. Find first and last dates.
5. Calculate cost coverage as `pricedEvents / usageEvents`.

For unranked models:

1. Collect every generated usage key.
2. Remove keys owned by ranked cards.
3. Group remaining rows by exact usage key.
4. Render them by total processed tokens descending, with name as deterministic tie-breaker.

Ranking order never uses these derived totals.

## Evidence JSON Route

Create a prerendered `GET` route at `src/pages/data/model-usage.json.ts` that imports the generated JSON and returns it with:

```text
Content-Type: application/json; charset=utf-8
Cache-Control: public, max-age=3600
```

Do not add mutation methods or authentication. This route exposes only the already sanitized aggregate artifact.

## Site Discovery

Update `llms.txt.ts` and `llms-full.txt.ts` with links to:

- English AI-model ranking
- Spanish AI-model ranking
- Public evidence JSON

Do not duplicate the entire daily dataset into either text manifest.

The Astro sitemap integration should discover the two static pages automatically. Verify generated sitemap output during build rather than adding manual sitemap code.

## Weekly Publishing Workflow

Weekly updates remain intentionally human-reviewed:

```bash
cd ~/Programacion/Santychuycom/santychuy.com
wt switch --create chore-model-usage-YYYY-MM-DD
bun run models:usage
git diff -- src/data/model-usage.json
bun run test:models
bun run check
bun run lint
bun run build
```

Then commit, push, and open a normal PR through the existing workflow. Do not make the exporter commit, push, or deploy automatically.

The first implementation may document this command in the project README or a short methodology section if discoverability needs it. Do not add a scheduler in v1.

## Implementation Sequence

### Phase 1: Safe exporter

1. Add generated-data fixture with schema version 1.
2. Implement pure aggregation and validation functions in the exporter file.
3. Add fixture-based tests for grouping, timezone dates, token totals, reasoning non-duplication, cost conversion, deterministic ordering, reconciliation, and privacy.
4. Add the two package scripts.
5. Run exporter against real Memex data and inspect only aggregate output.

Gate:

```bash
bun run test:models
bun run models:usage
git diff -- src/data/model-usage.json
```

Do not continue if private keys or sentinel values appear.

### Phase 2: Manual ranking model and page

1. Add manual ranking contract and duplicate-key validation.
2. Ask Santiago for initial ordered models and bilingual summaries if not already supplied.
3. Implement lifetime aggregation from daily rows.
4. Build shared bilingual AI-model page component.
5. Add English and Spanish routes with canonical and alternate metadata.
6. Add ranked, unranked, daily-history, and methodology sections.
7. Add public JSON route.

Gate:

```bash
bun run check
bun run lint
bun run build
```

### Phase 3: Discovery and runtime evidence

1. Add header navigation link and locale messages.
2. Update both LLM discovery endpoints.
3. Start site and verify both routes with `agent-browser`.
4. Capture desktop and mobile screenshots for English and Spanish.
5. Verify keyboard access, language switching, theme switching, daily `<details>`, horizontal table behavior, and public JSON response.
6. Confirm no console errors and no private values in rendered HTML or JSON.

Gate:

```bash
bun run test:models
bun run check
bun run lint
bun run build
```

If repository-wide baseline failures exist, record them separately and prove no new failures were introduced.

## Test Cases

Use Bun's built-in test runner. No new test framework.

Minimum fixture cases:

1. Two events on the same Mexico City date and model merge into one row.
2. UTC timestamps crossing midnight bucket into the correct Mexico City date.
3. Same exact model used by `pi` and `codex` merges counters and retains both sorted sources.
4. Different providers with the same model name remain separate usage keys.
5. Total processed tokens include cache reads and cache writes.
6. Reasoning remains reported but is not added twice.
7. Source cost converts and sums as integer nano-USD.
8. Missing source cost increases `unpricedEvents` without fabricating cost.
9. Unknown model events remain visible in coverage and never join a ranked card.
10. Duplicate ranking IDs fail.
11. Duplicate ownership of one usage key fails.
12. Every forbidden field and secret sentinel is absent from serialized output.
13. Output ordering is deterministic.
14. Reconciliation failure prevents writing the destination file.

## Acceptance Criteria

Implementation is complete only when every item passes.

- [ ] `/ai-models` and `/es/ai-models` build and render.
- [ ] Manual array order exclusively controls rank.
- [ ] Santiago's manual bilingual summaries render without generated opinion text.
- [ ] Ranked models show lifetime evidence from all available daily history.
- [ ] Total processed tokens include uncached input, cache reads, cache writes, and output.
- [ ] Reasoning is not double-counted.
- [ ] Costs are labeled `API-equivalent estimate` and never described as subscription spending.
- [ ] Cost coverage is visible when any event lacks source cost.
- [ ] Usage is described as evidence of experience, not objective model quality.
- [ ] Unmatched used models appear under `Used but not ranked` or `Usados pero no clasificados`.
- [ ] All daily aggregate history is available through native page UI and `/data/model-usage.json`.
- [ ] Public JSON contains none of the forbidden fields or transcript content.
- [ ] Exporter fails closed on partial Memex warnings, malformed data, and reconciliation mismatch.
- [ ] English and Spanish canonical, alternate, and language-switch links are correct.
- [ ] Header and LLM discovery surfaces link to the new page.
- [ ] Desktop and mobile runtime checks pass in light and dark themes.
- [ ] `bun run test:models`, `bun run check`, `bun run lint`, and `bun run build` pass or documented pre-existing failures are proven unrelated.

## Explicit Non-Goals

Do not add these in v1:

- Automated or score-derived ranking
- Benchmark claims
- Subscription-cost tracking
- Provider billing reconciliation
- Raw request or transcript publication
- Exact activity times
- Public Memex Web UI
- Cloudflare database or KV
- Upload or ingestion API
- Authentication
- Daily scheduler
- Automatic commits or deployment
- Client-side chart package
- Custom signing or blockchain proof
- Incremental event database

## Known Caveats

1. This is self-reported evidence. Git history shows when aggregate data changed; it does not independently prove the source logs are genuine.
2. API-equivalent estimates may differ from invoices, subscriptions, credits, negotiated rates, and provider billing rules.
3. Cache reads can make total processed tokens much larger than fresh input. Always preserve the breakdown.
4. Once aggregate history is committed to a public repository, deleting it from the current branch does not remove it from Git history.
5. Memex's event schema may evolve. Fail closed and update the exporter deliberately rather than silently accepting a changed shape.

## Agent Stop Conditions

Stop and ask Santiago when:

- Initial model order or manual summaries are missing at final content integration.
- Two exact usage keys appear to represent one model but equivalence is uncertain.
- A requested opinion would need to be invented.
- Memex emits warnings or a schema that cannot reconcile.
- Any generated artifact contains private metadata.
- Existing route or navigation constraints conflict with the proposed URLs.

Do not stop for cosmetic choices already covered by the project's design system. Use the smallest token-consistent implementation.

## Validation Report Expected From Implementing Agent

Before handoff, report:

- Changed files
- Memex version recorded in generated data
- Aggregate date range and number of exact usage keys
- Cost coverage percentage
- Privacy test result
- Build, check, lint, and test results
- Runtime routes tested
- Screenshot or video evidence paths
- Any pre-existing failures
- Residual caveats

## Primary References

- Memex repository: <https://github.com/nicosuave/memex>
- Memex token usage documentation: <https://github.com/nicosuave/memex/blob/a03f838b3bc901efc4dea654bf65668352a302de/README.md#token-usage>
- Memex local Web UI security: <https://github.com/nicosuave/memex/blob/a03f838b3bc901efc4dea654bf65668352a302de/README.md#background-index-service>
- Memex usage event and report structures: <https://github.com/nicosuave/memex/blob/a03f838b3bc901efc4dea654bf65668352a302de/src/usage.rs#L100-L188>
- Memex cost calculation: <https://github.com/nicosuave/memex/blob/a03f838b3bc901efc4dea654bf65668352a302de/src/usage.rs#L1407-L1438>
- Latest researched Memex release: <https://github.com/nicosuave/memex/releases/tag/v0.11.4>
