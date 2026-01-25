---
paths:
  - '.github/workflows/**'
  - '.github/**'
  - '.releaserc'
---

# CI/CD Rules

## GitHub Actions

- Use `cloudflare/pages-action@v1` for Cloudflare Pages deployments.
- Use Bun for install and build steps in CI (not npm or pnpm).
- Pin action versions (e.g., `actions/checkout@v4`, `actions/setup-node@v4`).
- Use GitHub secrets for sensitive values (Cloudflare API token, account ID).

## Workflow Structure

- **Production:** Triggered on push to `main`. Build -> Deploy -> Semantic Release.
- **Preview:** Triggered on push to any non-main branch. Build -> Deploy to preview URL.
- Keep workflows simple and focused. One workflow per deployment target.

## Semantic Release

- Configured in `.releaserc` at project root.
- Runs only on `main` branch after successful deployment.
- Uses conventional commits to determine version bumps.
- Generates changelog in `docs/CHANGELOG.md`.
- Creates GitHub releases automatically.

## Pre-commit Hooks

- Husky runs `lint-staged` on pre-commit.
- lint-staged runs Biome check on staged `.astro`, `.ts`, `.tsx`, `.css` files.
- Do not skip hooks (`--no-verify`) unless explicitly needed.
