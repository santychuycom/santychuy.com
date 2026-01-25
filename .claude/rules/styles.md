---
paths:
  - 'src/styles/**/*.css'
---

# CSS Rules

## Design Tokens

- All colors, shadows, and reusable values are defined as CSS custom properties in `src/styles/vars.css`.
- Never use hardcoded color values in components. Always reference tokens (e.g., `var(--green-300)`).
- When adding new tokens, follow the existing naming pattern: `--{color}-{shade}`.

## File Organization

| File             | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `reset.css`      | CSS reset (box-sizing, margins, fluid body, balanced headings) |
| `vars.css`       | Design tokens (colors, shadows, spacing, breakpoints)          |
| `globals.css`    | Base styles, `@font-face`, body/link defaults                  |
| `animations.css` | Keyframe animations (bounce, appear, waving, spin)             |

## Responsive Design

- Mobile-first approach: base styles for mobile, `@media` queries for larger screens.
- Use `rem`-based breakpoints:
  - `68.75rem` (~1100px) for desktop.
  - `34.375rem` (~550px) for small screens.
- Use `clamp()` for fluid typography and spacing where appropriate.

## Conventions

- No CSS frameworks (no Tailwind, no CSS-in-JS).
- Prefer CSS custom properties over preprocessor variables.
- Keep global styles minimal; prefer scoped `<style>` in Astro components.
- Use logical properties where practical (`margin-inline`, `padding-block`).
