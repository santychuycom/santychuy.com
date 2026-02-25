# Content Workflow

## Blog Posts

Blog posts are the primary content type. The goal is minimal friction: write markdown, publish.

### File Location

- Blog posts live in `src/content/posts/` as `.md` files.
- Filename becomes the URL slug (kebab-case).

### Frontmatter Schema

Defined in `src/schemas/post.ts` using Zod:

```yaml
---
title: 'Post Title'
pubDate: 2024-03-21
description: 'Full description for SEO and previews'
shortDesc: 'Short description for cards and lists'
author:
  name: 'Santiago Carrasco'
  img: '/path/to/author-image.webp' # optional
image: '/path/to/cover-image.webp'
categories:
  - astro
  - blog
---
```

**Required fields:** title, pubDate, description, shortDesc, author.name, image, categories.

### Content Collections

Astro Content Collections are configured in `src/content/config.ts`. This provides:

- Type-safe frontmatter validation via Zod schema.
- Automatic TypeScript types for blog post data.
- Collection querying APIs (`getCollection`, `getEntry`).

### Visual Editing (Astro Editor)

- Astro Editor is the default visual editor for blog posts.
- Open the repository folder in Astro Editor and work directly with files in `src/content/posts/`.
- Frontmatter fields are generated from `src/schemas/post.ts` through `src/content/config.ts`.
- Keep `bun dev` running while writing to preview changes locally in the browser.

### RSS Feed

- Generated at `/feed.xml` via `src/pages/feed.xml.js`.
- Uses `@astrojs/rss` with `markdown-it` for rendering and `sanitize-html` for sanitization.
- Includes full post content in the feed.

### Work/Projects Data

- Work experience and projects are stored as JSON in `src/content/work/`.
- Files: `experience.json`, `projects.json`, `all.json`.
- These are v1 content and may be restructured or removed in v2 (max 3 pages).

### Publishing Flow

1. Create a new `.md` file in `src/content/posts/` with proper frontmatter.
2. Write content in markdown.
3. Commit and push to a feature branch.
4. Preview on Cloudflare Pages preview URL.
5. Merge to `main` to publish to production.

### v2 Content Goals

- Support both English and Spanish versions of posts (see i18n-strategy.md).
- Keep Astro Editor workflow smooth and aligned with schema changes.
- Explore interactive components within blog posts (future scope).
