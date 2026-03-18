# Content Workflow

## Blog Posts

Blog posts are the primary content type. The goal is minimal friction: write markdown, publish.

### File Location

- Blog posts live in `src/content/posts/en/` and `src/content/posts/es/` as `.md` or `.mdx` files.
- Filename becomes the URL slug and must match across both language versions.
- English is required. Spanish is optional.
- Routes use `/blog/<slug>` for English and `/es/blog/<slug>` for Spanish.
- If a Spanish version does not exist, `/es/blog/<slug>` redirects to the English post.

### Frontmatter Schema

Defined in `src/schemas/post.ts` using Zod:

```yaml
---
title: 'Post Title'
pubDate: 2024-03-21
description: 'Full description for SEO and previews'
shortDesc: 'Short description for cards and lists'
tldr: 'Factual, answer-first summary for AI citation' # optional, strongly recommended for GEO
author:
  name: 'Santiago Carrasco'
  img: '/path/to/author-image.webp' # optional
image: '/path/to/cover-image.webp'
imageAlt: 'Descriptive alt text for cover image'
categories:
  - astro
  - blog
keywords:
  - astro
  - web development
faq: # optional, generates FAQPage schema for GEO
  - q: 'What is this post about?'
    a: 'A concise answer to the question.'
---
```

**Required fields:** title, pubDate, description, shortDesc, author.name, image, imageAlt, categories, keywords.
**Optional (GEO):** tldr, faq, updatedDate, slug, lang, canonical, author.img.

### Bilingual Rules

- Set `lang: en` in English files and `lang: es` in Spanish files.
- Keep the same slug and filename for both versions of the same post.
- Do not localize the slug; localize the title and content instead.
- Keep metadata aligned when possible: title intent, description, image, categories, keywords, and SEO target.
- Use locale-correct internal links inside content: `/blog/<slug>` in English and `/es/blog/<slug>` in Spanish.
- If a post only exists in English, do not expose a language switcher or Spanish alternate for that post.

Example:

```text
src/content/posts/en/my-post.md
src/content/posts/es/my-post.md
```

```yaml
# English
lang: en
title: "My Post"

# Spanish
lang: es
title: "Mi Post"
```

### Content Collections

Astro Content Collections are configured in `src/content/config.ts`. This provides:

- Type-safe frontmatter validation via Zod schema.
- Automatic TypeScript types for blog post data.
- Collection querying APIs (`getCollection`, `getEntry`).

### Visual Editing (Astro Editor)

- Astro Editor is the default visual editor for blog posts.
- Open the repository folder in Astro Editor and work directly with files in `src/content/posts/en/` or `src/content/posts/es/`.
- Frontmatter fields are generated from `src/schemas/post.ts` through `src/content/config.ts`.
- Keep `bun dev` running while writing to preview changes locally in the browser.

### RSS Feed

- Generated at `/feed.xml` via `src/pages/feed.xml.js`.
- Spanish feed is generated at `/es/feed.xml` via `src/pages/es/feed.xml.js`.
- Each feed only includes posts for its own locale.
- Uses `@astrojs/rss` with `markdown-it` for rendering and `sanitize-html` for sanitization.
- Includes full post content in the feed.

### Work/Projects Data

- Work experience and projects are stored as JSON in `src/content/work/`.
- Files: `experience.json`, `projects.json`, `all.json`.
- These are v1 content and may be restructured or removed in v2 (max 3 pages).

### Publishing Flow

1. Create the English post in `src/content/posts/en/` with proper frontmatter.
2. Use the filename as the slug, and keep it stable.
3. Add the Spanish version in `src/content/posts/es/` only if that translation exists, using the same filename and slug.
4. Preview locally or on Cloudflare Pages preview.
5. Merge to `main` to publish to production.

### v2 Content Goals

- Support both English and Spanish versions of posts with low-friction authoring.
- Keep Astro Editor workflow smooth and aligned with schema changes.
- Explore interactive components within blog posts (future scope).
