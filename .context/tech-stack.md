# Technology Stack

## Framework

- **Astro** (latest stable) with hybrid rendering mode (`output: 'hybrid'`).
- Most pages are statically pre-rendered. Blog post detail pages use SSR (`prerender = false`) for dynamic data (e.g., view counts).
- Uses Astro Content Collections for blog posts (markdown).
- View Transitions enabled via Astro's `ViewTransitions` component.
- Cloudflare Pages adapter: `@astrojs/cloudflare`.

## Language

- **TypeScript** with strict mode (extends `astro/tsconfigs/strict`).
- Path aliases configured in `tsconfig.json`:
  - `@assets/*`, `@components/*`, `@content/*`, `@layouts/*`, `@schemas/*`, `@styles/*`, `@ts/*`

## Package Manager

- **Bun** is the primary package manager. Use `bun` for all install, dev, build, and script commands.
- Lockfile: `bun.lock`

## Lint & Format

- **Biome** replaces ESLint + Prettier (migration planned for v2).
- Biome v2.3.0+ has experimental Astro file support.
- Required overrides for `.astro` files to avoid false positives:
  ```json
  {
    "overrides": [
      {
        "includes": ["**/*.astro"],
        "linter": {
          "rules": {
            "style": { "useConst": "off", "useImportType": "off" },
            "correctness": {
              "noUnusedVariables": "off",
              "noUnusedImports": "off"
            }
          }
        }
      }
    ]
  }
  ```
- CLI: `biome check .` (lint + format check), `biome check --write .` (auto-fix).

## Styling

- **Vanilla CSS** with CSS custom properties (no CSS framework).
- Design tokens defined in `src/styles/vars.css`.
- Scoped `<style>` blocks in Astro components.
- Self-hosted Satoshi Variable font (`public/fonts/`).
- Responsive design via `@media` queries with `rem`-based breakpoints.
- Fluid typography using `clamp()`.

## State Management

- **Nanostores** for lightweight client-side state (e.g., tab switching).

## Key Dependencies

| Package               | Purpose                  |
| --------------------- | ------------------------ |
| `astro`               | Web framework            |
| `@astrojs/cloudflare` | Cloudflare Pages adapter |
| `@astrojs/rss`        | RSS feed generation      |
| `nanostores`          | Client-side state        |
| `markdown-it`         | Markdown rendering (RSS) |
| `sanitize-html`       | HTML sanitization (RSS)  |

## Dev Dependencies

| Package            | Purpose                      |
| ------------------ | ---------------------------- |
| `wrangler`         | Cloudflare local dev         |
| `@biomejs/biome`   | Lint + format (v2 migration) |
| `husky`            | Git hooks                    |
| `lint-staged`      | Pre-commit checks            |
| `semantic-release` | Automated versioning         |
