# santychuy.com

Personal website and blog of Santiago Carrasco (Santychuy). Open-source, content-first, AI-agent optimized.

## Quick Reference

- **Package Manager:** bun
- **Framework:** Astro (latest) on Cloudflare Pages
- **Language:** TypeScript (strict)
- **Lint/Format:** Biome
- **Branch Strategy:** `main` = production. Other branches = preview environments.

## Commands

```bash
bun install            # Install dependencies
bun dev                # Start dev server
bun build              # Production build
bun preview            # Preview build locally (wrangler)
bun check              # Astro type check
biome check .          # Lint + format check
biome check --write .  # Auto-fix lint + format
```

## Bilingual Content Flow

- English lives at `/`; Spanish lives at `/es/`.
- Posts live in `src/content/posts/en/` and `src/content/posts/es/`.
- Use the same filename and slug in both languages.
- English posts are required; Spanish posts are optional.
- Missing Spanish posts redirect from `/es/blog/<slug>` to `/blog/<slug>`, and that post should not show the language switcher.
- Use `lang: en` or `lang: es` in frontmatter and keep metadata aligned across both versions.

## Project Context

For detailed context on specific areas, see:

- Project vision and v2 roadmap @.context/project-overview.md
- Technology stack details @.context/tech-stack.md
- Deployment pipeline @.context/deployment.md
- Blog content workflow @.context/content-workflow.md
- Design context @.context/design-context.md
- Brand and design system @.context/design-system.md
- Internationalization strategy @.context/i18n-strategy.md
- SEO requirements @.context/seo.md
- CLI tools available @.context/cli-tools.md
- Subagent patterns @.context/subagents.md
