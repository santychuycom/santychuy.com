# Project Overview

## What is santychuy.com?

Personal website and blog of Santiago Carrasco (Santychuy), a software developer from Mexico. The site is fully open-source and serves as a content-first platform for sharing long-format blog posts, primarily about software development, AI agents, and personal growth.

## v2 Vision

The core goal for v2 is **simplicity**. Remove friction from the writing and publishing workflow. The site should be a safe place to experiment with real-world AI scenarios and showcase results publicly.

### Key Principles

- **Content-first:** The primary purpose is writing and publishing blog posts with minimal friction.
- **Simple structure:** Maximum 3 pages (Home, Blog Post Detail, third page TBD).
- **LLM-first development:** The codebase is optimized for AI agent workflows with skills, subagents, and structured context.
- **Open-source:** The repository remains public to share the experience.
- **Minimalistic design:** Not boring, but simple to digest. Maintain the current brand identity.

### What's Changing from v1

| Area           | v1 (Current)                                  | v2 (Target)                                       |
| -------------- | --------------------------------------------- | ------------------------------------------------- |
| Libraries      | Outdated (Astro 4.6.1)                        | Latest Astro                                      |
| Pages          | Home, About, Blog Detail, Project Detail, 404 | Max 3 pages                                       |
| Languages      | English only                                  | English + Spanish                                 |
| Theme          | Dark only                                     | Light + Dark mode                                 |
| Lint/Format    | ESLint + Prettier                             | Biome                                             |
| SEO            | Acceptable, no sitemap                        | Improved, with sitemap and structured data        |
| Analytics      | Umami                                         | TBD                                               |
| Newsletter     | Placeholder ("Coming soon")                   | TBD                                               |
| Content        | Broken links/images, stale data               | Clean, maintained                                 |
| Pipeline       | npm in CI, pnpm in docs, bun locally          | Bun everywhere, solid CI/CD                       |
| Infra          | GitHub Actions + Cloudflare Pages action      | Same, SST planned for future                      |
| Agent workflow | Basic CLAUDE.md                               | Full context system with skills, rules, subagents |

### Future Ideas (Not v2 Scope)

- Cross-post to X/Twitter with blog as the interactive, rich-content version.
- Interactive components/elements in blog posts (beyond pure text).
- Newsletter integration.
- SST for Cloudflare infrastructure management.
