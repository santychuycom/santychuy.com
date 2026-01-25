# Deployment Pipeline

## Platform

- **Cloudflare Pages** for hosting.
- **GitHub Actions** for CI/CD.
- No `wrangler.toml` needed; the `@astrojs/cloudflare` adapter handles the build output.

## Branch Strategy

- **`main`** = production deployment. Pushes to `main` trigger production build + deploy + semantic-release.
- **All other branches** = preview environments with temporary Cloudflare Pages URLs.
- No `develop` branch in v2. Feature branches merge directly to `main`.

## GitHub Actions Workflows

### Production (`DeployProd.yml`)

Triggered on push to `main`:

1. **Build & Deploy job:** Checkout -> Bun setup -> `bun install` -> `bun build` -> Deploy via `cloudflare/pages-action@v1` (branch: main).
2. **Version job:** Runs after deploy succeeds -> `npx semantic-release`.

### Preview (for feature branches)

Triggered on push to non-main branches:

1. Same build process but deploys to a preview URL via Cloudflare Pages.

## Semantic Release

Configured in `.releaserc`:

- **Release branch:** `main`
- **Plugins:**
  1. `@semantic-release/commit-analyzer` - Determines version bump from conventional commits.
  2. `@semantic-release/release-notes-generator` - Generates release notes.
  3. `@semantic-release/changelog` - Writes to `docs/CHANGELOG.md`.
  4. `@semantic-release/git` - Commits release assets.
  5. `@semantic-release/github` - Creates GitHub release.

## Commit Convention

Follows **Conventional Commits**:

- `feat:` - New feature (minor version bump)
- `fix:` - Bug fix (patch version bump)
- `chore:` - Maintenance tasks
- `style:` - Formatting, CSS changes
- `docs:` - Documentation
- `refactor:` - Code restructuring
- `ci:` - CI/CD changes

## Environment Variables

- Defined in `.env` (local) and GitHub Actions secrets (CI).
- `.env.example` documents required variables.
- Analytics-related env vars: `UMAMI_AUTH_TOKEN`, `UMAMI_WEBSITE_ID` (may change in v2).

## Future: SST

- SST (Serverless Stack) is planned for future infrastructure-as-code management of Cloudflare resources.
- Not part of v2 initial scope. Will be documented separately when implemented.
