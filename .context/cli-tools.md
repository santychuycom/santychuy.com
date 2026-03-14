# CLI Tools

Tools available for agents to use via bash commands. Keep the agent lean by using CLIs instead of adding more MCPs.

## Primary Tools

### bun

Package manager and runtime. Use for all dependency and script operations.

```bash
bun install            # Install dependencies
bun add <pkg>          # Add dependency
bun add -D <pkg>       # Add dev dependency
bun remove <pkg>       # Remove dependency
bun dev                # Start Astro dev server
bun build              # Production build
bun preview            # Preview with wrangler
bun check              # Astro type check
bun run <script>       # Run any package.json script
```

### gh (GitHub CLI)

GitHub operations: PRs, issues, releases, actions.

```bash
gh pr create           # Create pull request
gh pr list             # List open PRs
gh pr view <num>       # View PR details
gh pr merge <num>      # Merge PR
gh issue create        # Create issue
gh issue list          # List open issues
gh run list            # List workflow runs
gh run view <id>       # View workflow run details
gh release list        # List releases
gh api <endpoint>      # Raw GitHub API calls
```

### biome

Linting and formatting (replacing ESLint + Prettier).

```bash
biome check .                # Check all files (lint + format)
biome check --write .        # Auto-fix all issues
biome check src/             # Check specific directory
biome lint .                 # Lint only
biome format .               # Format only
biome format --write .       # Format and write
```

### wrangler

Cloudflare development and deployment tooling.

```bash
wrangler pages dev ./dist    # Local preview of Cloudflare Pages build
wrangler whoami              # Check authenticated Cloudflare account
```

### agent-browser

Headless browser automation CLI for AI agents. Fast Rust implementation with Playwright fallback. Use for web testing, screenshots, form filling, and extracting data from web pages.

```bash
# Navigation
agent-browser open <url>             # Navigate to URL
agent-browser back                   # Go back
agent-browser reload                 # Reload page

# Interaction
agent-browser click <sel>            # Click element (CSS selector or @ref from snapshot)
agent-browser fill <sel> <text>      # Clear and fill input
agent-browser type <sel> <text>      # Type into element
agent-browser press <key>            # Press key (Enter, Tab, Control+a)
agent-browser select <sel> <val>     # Select dropdown option
agent-browser scroll <dir> [px]      # Scroll (up/down/left/right)
agent-browser upload <sel> <files>   # Upload files

# Inspection
agent-browser snapshot               # Accessibility tree with refs (primary way to read page state)
agent-browser snapshot -i            # Interactive elements only
agent-browser snapshot -c            # Compact (remove empty structural elements)
agent-browser screenshot [path]      # Take screenshot
agent-browser screenshot --full      # Full page screenshot
agent-browser get text <sel>         # Get text content
agent-browser get url                # Get current URL
agent-browser get title              # Get page title
agent-browser is visible <sel>       # Check if element is visible

# Find elements semantically
agent-browser find role <role> click             # Find by ARIA role and click
agent-browser find text <text> click             # Find by text content and click
agent-browser find label <label> click           # Find by label
agent-browser find placeholder <text> fill <val> # Find by placeholder and fill

# Browser settings
agent-browser set viewport <w> <h>   # Set viewport size
agent-browser set media dark         # Set dark color scheme
agent-browser set media light        # Set light color scheme

# Sessions (isolated browser contexts)
agent-browser --session <name> open <url>  # Use named session
agent-browser session list                 # List active sessions

# Debug
agent-browser console                # View console logs
agent-browser errors                 # View page errors
agent-browser eval <js>              # Run JavaScript in page
```

Key patterns for AI agents:

- Use `snapshot` (not screenshot) as the primary way to understand page state. It returns an accessibility tree with `@ref` identifiers.
- Use `@ref` from snapshot output to target elements: `agent-browser click @e2`.
- Use `find` commands for semantic element discovery by role, text, or label.
- Use `--session <name>` to isolate browser contexts for parallel tasks.

## Experimental Tools

### ccmanager

Git worktree management for parallel agent workflows. See https://github.com/kbwo/ccmanager

Status: **Experimental**. Configuration file exists (`.ccmanager.json`) but is not yet configured.

Purpose: Manage git worktrees to enable multiple AI agents to work on separate branches simultaneously without conflicts.

## MCP Servers

Configured in `.mcp.json` (Claude Code) and `opencode.jsonc` (Open Code):

- **context7** - Documentation lookup for libraries and frameworks.
- **gh_grep** - Search real-world code examples from GitHub repositories.
