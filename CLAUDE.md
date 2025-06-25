## Project Overview

This is santychuy.com - a personal website built with Astro framework, deployed on Cloudflare Pages. The site features a blog, portfolio showcasing projects and work experience, and contact functionality.

## Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Format code with Prettier
pnpm format

# Run ESLint
pnpm lint
```

### Technology Stack

- **Framework**: Astro 4.6.1 with hybrid rendering
- **Deployment**: Cloudflare Pages via Wrangler
- **Package Manager**: pnpm
- **Styling**: CSS with custom properties (e.g. vars.css)
- **Content**: Markdown-based blog posts with Astro Content Collections
- **Type Safety**: TypeScript with strict mode

### Project Structure

```
src/
├── components/       # Reusable Astro components
│   ├── common/      # Shared UI components (buttons, inputs, tabs)
│   ├── icons/       # Icon components
│   ├── layout/      # Layout components (Header, Footer, Contact)
│   └── pages/       # Page-specific components
│       ├── About/
│       ├── Blog/
│       ├── Home/
│       └── Projects/
├── content/         # Content collections
│   ├── posts/       # Blog posts in Markdown
│   └── work/        # Work experience and projects data (JSON)
├── layouts/         # Page layouts
│   ├── Base.astro   # Base HTML layout
│   └── Blog.astro   # Blog post layout
├── pages/           # File-based routing
├── schemas/         # Zod schemas for content validation
├── stores/          # Nanostores for client-side state
└── styles/          # Global styles
```

### Key Architectural Patterns

1. **Component Organization**: Components are organized by scope (common, layout, pages) with page-specific components nested under their respective page directories.

2. **Content Management**: Blog posts use Astro Content Collections with Zod schema validation. Work experience and projects are stored as JSON files.

3. **Path Aliases**: TypeScript path aliases are configured for cleaner imports:

   - `@components/*`, `@layouts/*`, `@content/*`, `@styles/*`, etc.

4. **Styling Strategy**: Global CSS variables defined in `vars.css`, with component-specific styles scoped within Astro components.

5. **State Management**: Uses nanostores for lightweight client-side state (e.g., tabs.ts).

## Code Conventions

- **Component Files**: Use `.astro` extension for Astro components
- **TypeScript**: Strict mode enabled, use type imports where applicable
- **Formatting**: Prettier with single quotes, trailing commas (ES5)
- **Linting**: ESLint with TypeScript and Astro plugins, JSX accessibility rules
- **Git Hooks**: Husky with lint-staged for pre-commit checks

## Blog Content

Blog posts are written in Markdown with frontmatter following the schema defined in `src/schemas/post.ts`:

- title, pubDate, description, shortDesc
- author object with name and optional image
- image path and categories array

## Web analytics

It use Plausible to track all event inside the website, specially to register and show the visits of each blog post.
