# Internationalization Strategy

## Languages

- **English (en)** - Default language.
- **Spanish (es)** - Secondary language.

Both the website UI and blog posts will be available in both languages.

## Astro i18n Routing

Astro has built-in i18n routing support. Configuration in `astro.config.mjs`:

```javascript
export default defineConfig({
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

### URL Structure

- English (default): `/`, `/blog/post-slug`
- Spanish: `/es/`, `/es/blog/post-slug`

English content lives at the root (no prefix). Spanish content is prefixed with `/es/`.

## Content Organization

### Blog Posts

Blog posts need both language versions. Approach options (TBD):

**Option A: Separate content directories per locale**

```
src/content/posts/
  en/
    my-post.md
  es/
    my-post.md
```

**Option B: Frontmatter-based locale field**

```
src/content/posts/
  my-post.md        # English
  my-post.es.md     # Spanish
```

### UI Strings

- Static UI text (navigation, buttons, labels) needs translation.
- Approach: Translation files (JSON or TypeScript maps) with locale keys.
- Example: `src/i18n/en.ts`, `src/i18n/es.ts`.

## Open Questions

- Translation workflow: manual or AI-assisted?
- Fallback strategy: show English if Spanish version doesn't exist?
- Language switcher UI component design.
- SEO: `hreflang` tags for each language version.
- RSS feed: one per language or unified?
