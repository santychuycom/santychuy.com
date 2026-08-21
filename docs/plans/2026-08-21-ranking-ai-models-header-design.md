# Ranking AI Models header design

## Goal

Make model-ranking navigation easier to discover without changing URLs.

## Approved design

- Keep routes `/ai-models` and `/es/ai-models`.
- Place model-ranking navigation next to site logo on left side of header.
- Keep language switcher and theme control on right side.
- Rename public English labels to `Ranking AI Models`.
- Rename public Spanish labels to `Ranking Modelos de IA`.
- Update page title and metadata with matching names.

## Scope

Edit existing header and translation strings only. No layout system, route, data model, or analytics changes.

## Validation

Run Astro check and build. Confirm desktop and mobile header placement and both localized pages.
