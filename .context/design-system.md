# Design System

## Goal

Build a readability-first, token-driven system for santychuy.com. Long-form reading comfort has priority over visual effects.

## Foundations

- **Font family:** Satoshi Variable (self-hosted in `public/fonts/Satoshi-Variable.woff2`, preloaded in layout head).
- **Readability defaults:** warm paper background, dark ink text, generous line-height, constrained line length.
- **Breakpoints:**
  - `34.375rem` (550px) mobile threshold
  - `68.75rem` (1100px) desktop threshold

## Breakpoint Constants

Use these names in planning/docs/reviews so breakpoint intent is explicit.

- `BP_MOBILE_MAX = 34.374rem`
- `BP_TABLET_MIN = 34.375rem`
- `BP_DESKTOP_MIN = 68.75rem`

Notes:
- In code, media queries remain explicit `rem` values for compatibility.
- If a reusable CSS breakpoint token strategy is introduced later, map to these constants.

## Token Architecture

All source-of-truth tokens live in `src/styles/vars.css`.

### 1) Primitive / Legacy

Legacy palettes remain for compatibility (`--primary---*`, `--secondary---*`, `--neutrals---*`, `--supporting---*`).

### 2) Semantic Tokens (Canonical)

Use these in component styles by default.

- **Color:** `--text-*`, `--surface-*`, `--border-*`, `--focus-ring`, `--paper-*`
- **Status & charts:** `--status-*`, `--chart-tone-*`
- **Typography:** `--font-size-*`, `--leading-*`, `--font-weight-*`, `--reading-max-width`
- **Spacing:** `--space-1` to `--space-17`
- **Radii:** `--shape-radius-*`
- **Layout:** `--layout-*`, `--measure-*`, logo size tokens
- **Motion:** `--motion-duration-*`, `--motion-ease-*`, `--motion-translate-*`, `--motion-delay-step`
- **Elevation:** `--elevation-*`
- **Focus:** `--focus-outline-*`, `--focus-ring-soft`
- **Layering:** `--z-*`

### 3) Utility Bridge

`src/styles/globals.css` maps semantic tokens into `@theme inline` variables (`--color-*`, `--radius-*`) for utility/component interoperability.

## Styling Approach

- Primary style authoring is scoped CSS in Astro components + global token files.
- Tailwind imports are present in `globals.css` for utility compatibility and shadcn/ui integration.
- Global files:
  - `reset.css` -> reset primitives
  - `vars.css` -> token source of truth
  - `globals.css` -> semantic defaults and token mapping
  - `animations.css` -> shared keyframes

## Theming

- Current canonical UI direction: light paper theme (readability-first).
- `.dark` mappings exist in `globals.css` for compatibility but are secondary to paper semantics.
- Dark token values are defined in `vars.css` as source-of-truth and remapped in `.dark`.
- Theme changes should be implemented by remapping semantic tokens, not rewriting component styles.

## Usage Rules (Required)

1. **Use semantic tokens first.**
   - Prefer `--text-primary`, `--surface-elevated`, `--border-subtle` over raw values.
2. **No magic numbers in active UI.**
   - Repeated spacing/sizing/motion values must become tokens.
3. **Accessibility built in.**
   - Keep readable contrast, visible focus states, and minimum touch target (`--touch-target-min`).
4. **Motion is subtle by default.**
   - Use motion tokens and always support `prefers-reduced-motion`.
   - A global reduced-motion fallback is defined in `globals.css`; component-level motion should still be optional and restrained.
5. **Content-first rhythm.**
   - Keep line lengths, heading rhythm, and section spacing optimized for long reading.

## Migration Policy

- Active surfaces must be fully tokenized.
- Legacy/hidden components should be migrated before reuse.
- New components must not introduce new raw values unless truly one-off; if reused twice, promote to token.

## Intentional Exceptions

- `src/components/Background.astro` is a decorative/generated animation surface.
- Allowed non-token literals in this file:
  - generated per-node animation timings (`animation-duration`, `animation-delay`)
  - generated transform/geometry randomness (`transform-origin`, `box-shadow` vmin values)
  - `translate3d(..., 1px)` in keyframes for GPU composition behavior
- This exception applies only to decorative background effects. Active content/shell UI must remain fully tokenized.

## Validation Checklist

- Desktop + mobile snapshot review (`agent-browser`).
- Readability check: line length, line-height, heading rhythm, paragraph spacing.
- Interaction check: focus ring visibility, hover/focus parity, touch targets.
- Build/type status recorded separately from known repo-level issues.

## PR Review Checklist

- Breakpoint usage is consistent with documented constants intent (`BP_MOBILE_MAX`, `BP_TABLET_MIN`, `BP_DESKTOP_MIN`).
- New media queries use the canonical `34.375rem` and `68.75rem` thresholds unless explicitly justified.
- Mobile-first behavior is preserved (base styles first, breakpoint enhancements second).
- No active UI changes introduce ad hoc breakpoint values without documentation.
