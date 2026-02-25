---
paths:
  - 'src/content/posts/**'
  - 'src/schemas/post.ts'
  - 'content.config.ts'
  - 'src/content/config.ts'
---

# Blog Content Rules

## Frontmatter

Every blog post must include all required frontmatter fields:

```yaml
---
title: 'Descriptive Post Title'
pubDate: YYYY-MM-DD
description: 'Full description for SEO and social previews (150-160 chars ideal)'
shortDesc: 'Short description for cards and post lists'
author:
  name: 'Santiago Carrasco'
image: '/path/to/cover-image.webp'
categories:
  - category-one
  - category-two
---
```

## File Naming

- Use kebab-case for filenames: `my-post-title.md`.
- The filename becomes the URL slug.
- Keep slugs descriptive but concise.

## Content Guidelines

- Write in markdown.
- Use heading hierarchy starting from H2 (H1 is reserved for the post title in the layout).
- Categories should be lowercase strings.
- Images referenced in posts should be in `public/` or use external URLs.

## Schema

- The Zod schema in `src/schemas/post.ts` validates all frontmatter at build time.
- If modifying the schema, ensure all existing posts still pass validation.
- Content collection config in `src/content/config.ts` maps collections to their schemas.
- `content.config.ts` re-exports collections for Astro compatibility.
