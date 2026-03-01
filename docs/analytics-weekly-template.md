# Analytics Weekly Template (Posts + Incoming Visitors)

Use this every week to review Umami data in a consistent way and make one clear decision for content/distribution.

## What this template is for

- Focus on post performance and visitor acquisition quality.
- Avoid vanity metrics. Prioritize read depth and intent.
- Keep a weekly log so trends are visible over time.

## Current tracking scope (v1)

Built-in Umami:

- Pageviews
- Visitors
- Landing pages
- Referrers
- Countries/devices/browsers

Custom events currently implemented:

- `campaign_landing`
- `post_card_click`
- `post_read_progress` (25, 50, 75, 100)
- `post_outbound_click`

## Weekly review steps (15-20 min)

1. Set date range to `Last 7 days` and compare to previous period.
2. Review acquisition: landing pages + referrers.
3. Review event performance by post slug.
4. Identify top 3 winners and top 3 opportunities.
5. Decide one action for next week.

## Weekly scorecard

Fill this every Monday.

| Metric | This week | Last week | Delta | Notes |
| --- | --- | --- | --- | --- |
| Total visitors |  |  |  |  |
| Total pageviews |  |  |  |  |
| Blog pageviews (`/blog/*`) |  |  |  |  |
| `campaign_landing` count |  |  |  |  |
| `post_card_click` count |  |  |  |  |
| `post_read_progress` at 75 |  |  |  |  |
| `post_read_progress` at 100 |  |  |  |  |
| `post_outbound_click` count |  |  |  |  |

## Post performance table

| Post slug | Pageviews | 75% reads | 100% reads | 75% read rate | Outbound clicks | Notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

Formula:

- `75% read rate = post_read_progress(75) / post pageviews`

## Campaign attribution table

Use this to evaluate social distribution quality.

| Source | Medium | Campaign | Content | Campaign landings | 75% reads from campaign traffic | Quality notes |
| --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

UTM naming reference:

- `utm_source`: `x`, `linkedin`, `newsletter`, `github`, `reddit`
- `utm_medium`: `social`, `email`, `community`
- `utm_campaign`: `post_<slug>_<phase>_<yyyy_mm>`
- `utm_content`: `thread_1`, `feed_post_1`, `story_1`

Example URL:

```text
https://santychuy.com/blog/ai-agents-in-production?utm_source=x&utm_medium=social&utm_campaign=post_ai_agents_launch_2026_03&utm_content=thread_1
```

## Insights and decisions log

### Top insights this week

- 
- 
- 

### Decision for next week (one only)

- 

### Planned experiment

- Hypothesis:
- What will change:
- Success metric:
- Review date:

## Data quality checklist

- [ ] `campaign_landing` appears when URL includes UTM params
- [ ] `post_read_progress` fires at 25/50/75/100 only once each per page view
- [ ] `post_card_click` is recorded from home latest posts
- [ ] `post_outbound_click` records destination host on blog posts
- [ ] No obvious spike from bots/test traffic
