# AI model leaderboard design

## Goal

Make `/ai-models` and `/es/ai-models` compact editorial ranking directories. Preserve manual rank and the separate “Used but not ranked” grouping. Put complete reviews and evidence on static model pages.

## Directory

- Lead with title, brief premise, and evidence update date.
- Render ranked models as an ordered leaderboard.
- Each ranked entry shows rank, model, provider, one-sentence review, optional best-for, active days, usage events, last observed date, and a detail link.
- Do not show token buckets, costs, coverage, or daily tables on directory.
- Keep unranked models secondary. Collapse list using native `details` when more than eight models; summary includes count.
- Keep short disclosure that rank is manual and usage means familiarity, not quality. Keep raw JSON and source repository links.

## Detail pages

- Create static bilingual pages only for ranked models: `/ai-models/[id]` and `/es/ai-models/[id]`.
- Lead with review content: rank, identity, summary, best-for, tradeoff.
- Follow with full evidence: active days, events, dates, token buckets, cost/coverage, sources, and model-specific daily history.
- Preserve no-evidence and unknown-value honesty.

## Constraints

- Preserve current listing routes and public usage JSON route.
- Keep manual order in `src/data/ai-models.ts` as ranking source of truth.
- No automatic rank, filters, chart, database, runtime Memex calls, or detail pages for unranked models.
- Use static Astro routes, existing bilingual metadata patterns, semantic HTML, current tokens, and mobile-first layout.

## Validation

Run `bun run test:models`, `bun check`, and `bun run build`. Check English/Spanish listing and details pages at desktop and 390px, no overflow, focus states, language switching, and unknown detail URL 404.
