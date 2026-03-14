# Analytics Terms Guide (Simple + Reusable)

Use this as a quick reference when reviewing Umami so the numbers are easy to interpret.

## Core terms

- `Visitor`: a unique person/device that visited your site in a given period.
- `Pageview`: one page load or tracked route view.
- `Landing page`: the first page seen in a session.
- `Referrer`: where traffic came from (for example `x.com`, `linkedin.com`, `google.com`).
- `Campaign`: a grouped distribution effort identified with UTM parameters.
- `Event`: a tracked user action (for example `post_card_click`).
- `Conversion`: an event you consider meaningful progress toward your goal.

## UTM parameters (campaign attribution)

- `utm_source`: platform/source (`x`, `linkedin`, `newsletter`).
- `utm_medium`: channel type (`social`, `email`, `community`).
- `utm_campaign`: campaign name (`post_ai_agents_launch_2026_03`).
- `utm_content`: creative variant (`thread_1`, `feed_post_1`).

Tip: keep UTM values lowercase and consistent. This avoids split reporting.

## Your current post-focused events

- `campaign_landing`: fires when a visitor lands with UTM params.
  - Why it matters: tells you which promotion effort generated visits.
- `post_card_click`: click on post preview cards.
  - Why it matters: tells you which discovery surfaces drive post opens.
- `post_read_progress` (`25`, `50`, `75`, `100`): reading depth milestones.
  - Why it matters: tells you content quality/engagement, not only clicks.
- `post_outbound_click`: external link clicks from a post.
  - Why it matters: shows deeper intent and usefulness of content references.

## Practical metrics (for this website)

- `Post entry visits`: blog pageviews by slug.
- `Engaged reads`: count of `post_read_progress` with `progress=75`.
- `Read completion`: count of `post_read_progress` with `progress=100`.
- `75% read rate`: `post_read_progress(75) / post pageviews`.
- `Campaign volume`: count of `campaign_landing` by source/campaign.
- `Campaign quality`: engaged reads from campaign traffic / campaign landings.

## How to interpret results

- High visits + low 75% read rate -> distribution is working, content needs stronger hook/structure.
- Low visits + high 75% read rate -> strong content, needs better distribution.
- High campaign volume + low quality -> wrong audience/channel or weak message fit.
- High outbound clicks on a post -> readers find references actionable; topic likely resonates.

## Decision cheat sheet

- If `x` drives high quality reads -> publish more thread-style promotion.
- If LinkedIn drives higher volume but lower quality -> test tighter message + different post framing.
- If one topic has repeat high 75%+ rates -> prioritize follow-up posts in that topic cluster.
- If homepage card CTR drops -> revisit titles, descriptions, and card ordering.

## Common mistakes to avoid

- Optimizing for pageviews only.
- Mixing UTM naming styles (`LinkedIn` vs `linkedin`).
- Adding too many events too early.
- Changing event names frequently (breaks trend analysis).
- Sending PII in event payloads.

## Monthly reflection prompts

- Which 3 posts produced the highest engaged reads?
- Which traffic source produced the best campaign quality?
- What topic should get the next post based on engagement, not intuition?
- What one distribution experiment should run next month?
