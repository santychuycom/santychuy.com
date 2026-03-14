# Home Hero Content Design

## Goal

Rewrite the homepage hero so it sounds like Santiago rather than a generic software-and-AI site. The homepage should present a personal technical brand with the blog as a natural extension of the work.

## Positioning

The hero should introduce Santiago as a software engineer who builds and writes. AI should appear as part of the work, not as the only identity. The tone should stay thoughtful, practical, and warm.

## Content Structure

### Hero

- H1: `Why human beings are machines of interpretation?`
- Style: italic, treated as a changeable phrase that can evolve over time
- Supporting copy: `I'm Santiago Carrasco, a SWE with a plan to share knowledge, thoughts, and the things I learn along the way.`

### Now

The `Now` list should feel personal and current, grounded in real work rather than abstract themes.

- `Building @ The & Company` (linked to the company website)
- `Sharing content related to software and thoughts`

## Rationale

- The hero becomes a living phrase Santiago can change often based on what resonates in the moment.
- The supporting copy explains the purpose of the phrase while still grounding the page in building and writing.
- The `Now` section gives immediate context about Santiago's present work without reading like a roadmap.
- The overall tone matches the site's editorial, readability-first design direction.

## Implementation Notes

- Update hero copy in `src/components/pages/Home/index.astro`.
- Keep the existing structure and animation behavior.
- Update homepage metadata description in `src/pages/index.astro` so SEO copy aligns with the new positioning.
