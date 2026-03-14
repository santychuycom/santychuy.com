# SEO Requirements

## Current State (v1)

- Meta tags: title, description, OG, Twitter cards present.
- No sitemap generated.
- `robots.txt` allows all bots but has no sitemap reference.
- Canonical URL implementation has a typo (`cannonicalURL`).
- No structured data (JSON-LD).
- RSS feed exists at `/feed.xml`.

## v2 Improvements

### Sitemap

- Add `@astrojs/sitemap` integration.
- Configure in `astro.config.mjs` with `site` property.
- Generates `/sitemap-index.xml` automatically.
- Update `robots.txt` to reference sitemap.

### Meta Tags Pattern

Every page must include:

- `<title>` - Unique, descriptive, 50-60 characters. Pattern: `{Page Title} - Santychuy`.
- `<meta name="description">` - Unique per page, 150-160 characters.
- `<link rel="canonical">` - Self-referencing canonical URL (fix typo).
- OpenGraph: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `og:locale`.
- Twitter: `twitter:card` (summary_large_image), `twitter:site`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`.

### Structured Data

Add JSON-LD for:

- **WebSite** schema on the home page.
- **Article** schema on blog post pages (title, author, datePublished, dateModified, image).
- **Person** schema for author info.

### robots.txt

```
User-agent: *
Allow: /

Sitemap: https://santychuy.com/sitemap-index.xml
```

### i18n SEO

- `hreflang` tags linking English and Spanish versions of each page.
- `og:locale` set per language (`en_US`, `es_MX`).
- Separate canonical URLs per language version.

### Performance

- Current: Font preloading for Satoshi.
- Ensure images use modern formats (WebP), lazy loading, and responsive `srcset`.
- Core Web Vitals targets: LCP < 2.5s, INP < 200ms, CLS < 0.1.

### Content SEO

- One H1 per page containing the primary topic.
- Logical heading hierarchy (H1 > H2 > H3).
- Descriptive alt text on all images.
- Internal linking between blog posts.
- Clean, descriptive URLs (already using kebab-case slugs).
