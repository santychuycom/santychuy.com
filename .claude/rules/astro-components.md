---
paths:
  - 'src/components/**/*.astro'
  - 'src/layouts/**/*.astro'
  - 'src/pages/**/*.astro'
---

# Astro Component Rules

## Component Scripts

- Use TypeScript in the frontmatter script section (between `---` fences).
- Destructure props from `Astro.props` with explicit TypeScript interfaces.
- Use path aliases for imports (`@components/`, `@layouts/`, `@styles/`, etc.).

## Scoped Styles

- Always use scoped `<style>` blocks inside components. Avoid global CSS in component files.
- Reference CSS custom properties from `src/styles/vars.css` for colors, shadows, and spacing.
- Use `rem`-based values for breakpoints and spacing.
- Use `clamp()` for fluid typography.

## Component Organization

- Common/reusable components go in `src/components/common/`.
- Icon components go in `src/components/icons/`.
- Layout components (Header, Footer) go in `src/components/layout/`.
- Page-specific components go in `src/components/pages/{PageName}/`.

## HTML Semantics

- Use semantic HTML elements (`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`).
- One `<h1>` per page, provided by the page component or layout.
- Logical heading hierarchy (never skip levels).
- All images must have descriptive `alt` text.

## Layouts

- `Base.astro` is the root HTML layout for all pages (includes `<html>`, `<head>`, `<body>`).
- `Blog.astro` extends Base for blog post pages with article-specific meta tags.
- Layouts accept props for title, description, image, noIndex, etc.
