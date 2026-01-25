# Design System

## Brand Identity

Maintain the current Santychuy brand. The design should feel minimalistic but not boring -- simple to digest, with personality.

## Typography

- **Primary font:** Satoshi Variable (self-hosted in `public/fonts/Satoshi-Variable.woff2`).
- Preloaded in the `<head>` for performance.
- Fluid typography using `clamp()` for responsive sizing.
- Font face defined in `src/styles/globals.css`.

## Color System

All colors are defined as CSS custom properties in `src/styles/vars.css`.

### Primary Colors

| Token       | Value                  | Usage          |
| ----------- | ---------------------- | -------------- |
| `--green-*` | Green palette (50-500) | Primary accent |
| `--blue-*`  | Blue palette (50-300)  | Primary accent |

### Secondary Colors

| Token            | Value               | Usage            |
| ---------------- | ------------------- | ---------------- |
| `--dark-green-*` | Dark green palette  | Secondary accent |
| `--purple-*`     | Purple palette      | Secondary accent |
| `--fiusha-*`     | Fiusha/pink palette | Secondary accent |

### Neutrals

| Token       | Value                  | Usage             |
| ----------- | ---------------------- | ----------------- |
| `--black-*` | Dark neutrals (50-500) | Text, backgrounds |

### Supporting Colors

- Error, info, success, warning tokens for UI feedback.

### Background

- Current: Deep dark blue (`hsl(229deg, 68%, 5%)`).
- Background effect: Animated floating dark circles (`Background.astro`).

## Dark / Light Mode

- **v1:** Dark mode only.
- **v2:** Add light mode support. Implementation approach TBD.
- Use CSS custom properties to toggle themes. Define light-mode overrides for all color tokens.

## Styling Approach

- **Vanilla CSS** with scoped `<style>` blocks in Astro components.
- **No CSS framework** (no Tailwind, no CSS-in-JS).
- Global styles in `src/styles/`:
  - `reset.css` - CSS reset (box-sizing, margin, fluid body).
  - `vars.css` - Design tokens (colors, shadows, spacing).
  - `globals.css` - Base styles, font-face, body defaults.
  - `animations.css` - Keyframe animations (bounce, appear, waving, spin).
- Responsive design via `@media` queries with `rem`-based breakpoints:
  - Primary breakpoint: `68.75rem` (1100px).
  - Secondary breakpoint: `34.375rem` (550px).

## Box Shadows

- Green-tinted shadows defined in `vars.css`.
- Used for cards, buttons, and interactive elements.

## Design Principles for v2

1. **Minimalistic:** Clean layouts, generous whitespace, clear hierarchy.
2. **Readable:** Content-first typography, comfortable line lengths.
3. **Consistent:** Use design tokens everywhere, no magic numbers.
4. **Accessible:** Sufficient contrast ratios, keyboard navigation, semantic HTML.
5. **Performant:** No heavy CSS frameworks, minimal animations on mobile.
