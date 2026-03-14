# Deployment Pipeline

## Platform

- **Cloudflare Workers** via **SST** (Serverless Stack) for hosting.
- **GitHub Actions** for CI/CD.
- SST config: `sst.config.ts`. Deploys an Astro site as a Cloudflare Worker with static assets.
- Production domain: `santychuy.com` (mapped via `domain` in SST config when `stage === "production"`).

## Branch Strategy

- **`main`** = production deployment. Pushes to `main` trigger production build + deploy + semantic-release.
- **Pull requests** = preview environments via SST stages (`pr-<number>`) with temporary `.workers.dev` URLs.
- No `develop` branch in v2. Feature branches merge directly to `main`.

## GitHub Actions Workflows

### Production (`release.yml`)

Triggered on push to `main`:

1. **Build job:** Checkout → Bun setup → `bun install` → `bun run build` → Upload artifacts.
2. **Deploy job:** Download artifacts → Extract worker → `bunx sst deploy --stage production`.
3. **Release job:** Runs after deploy succeeds → `bunx semantic-release` (version bump, changelog, GitHub release).

### Preview (`deploy.yml`)

Triggered on pull request (opened, synchronize, reopened, closed):

1. **Build job:** Same build process as production.
2. **Deploy preview job:** `bunx sst deploy --stage pr-<number>` → Posts preview URL as PR comment.
3. **Cleanup job:** On PR close, `bunx sst remove --stage pr-<number>` tears down the preview.

## Semantic Release

Configured in `.releaserc`:

- **Release branch:** `main`
- **Plugins:**
  1. `@semantic-release/commit-analyzer` - Determines version bump from conventional commits.
  2. `@semantic-release/release-notes-generator` - Generates release notes.
  3. `@semantic-release/changelog` - Writes to `CHANGELOG.md`.
  4. `@semantic-release/npm` - Updates `package.json` version (no npm publish).
  5. `@semantic-release/git` - Commits `CHANGELOG.md` and `package.json` back to repo.
  6. `@semantic-release/github` - Creates GitHub release.

## Commit Convention

Follows **Conventional Commits**:

- `feat:` - New feature (minor version bump)
- `fix:` - Bug fix (patch version bump)
- `docs:` - Documentation (patch)
- `refactor:` - Code restructuring (patch)
- `style:` - Formatting, CSS changes (patch)
- `chore:` - Maintenance tasks (no release)
- `ci:` - CI/CD changes (no release)

Enforced locally by commitlint via husky `commit-msg` hook.

## Environment Variables

- Defined in `.env` (local) and GitHub Actions secrets (CI).
- `.env.example` documents required variables.

### Required GitHub Secrets

| Secret | Purpose |
|--------|---------|
| `CLOUDFLARE_API_TOKEN` | SST deployment to Cloudflare |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account identifier |
| `UMAMI_AUTH_TOKEN` | Analytics proxy authentication |
| `UMAMI_WEBSITE_ID` | Analytics site identifier |

`GITHUB_TOKEN` is provided automatically by GitHub Actions for semantic release.
