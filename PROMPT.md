# Build uikit — React Component Library

You are building a **portfolio project** for a Senior AI Engineer's public GitHub. It must be impressive, clean, and production-grade. Read these docs before writing any code:

1. **`F03-react-component-library.md`** — Complete project spec: architecture, component APIs, design tokens, build config, commit plan. This is your primary blueprint. Follow it phase by phase.
2. **`github-portfolio.md`** — Portfolio goals and Definition of Done (Level 1 + Level 2). Understand the quality bar.
3. **`github-portfolio-checklist.md`** — Pre-publish checklist. Every item must pass before you're done.

---

## Instructions

### Read first, build second
Read all three docs completely before writing a single line of code. Understand the design token system, the component API patterns (compound components, generics, polymorphic), the Vite library build setup, and the Storybook configuration.

### Follow the phases in order
The project spec has 6 phases. Do them in order:
1. **Foundation & Theming** — project setup, Vite library mode, design tokens (CSS custom properties), light/dark themes, ThemeProvider, utility modules
2. **Simple Components** — Button (polymorphic, variants, loading), Badge, Spinner, Avatar (with group)
3. **Form Components** — Input (sizes, prefix/suffix, clearable, error), Select with generics and keyboard nav, Alert
4. **Interactive Components** — Modal (focus trap, portal, scroll lock), Toast + ToastProvider, Tabs (compound, ARIA tablist), Tooltip
5. **Card & Build** — Card (compound), Vite library build (ESM + CJS), exports map, Chromatic setup
6. **Docs & Polish** — per-component READMEs, root README, refactoring, final checks

### Commit frequently
Follow the commit plan in the spec. Use **conventional commits** (`feat:`, `test:`, `refactor:`, `docs:`, `ci:`, `chore:`). Each commit should be a logical unit.

### Quality non-negotiables
- **CSS Modules only.** No runtime CSS-in-JS (styled-components, emotion, Stitches). CSS Modules for component styles, CSS custom properties for design tokens. Zero runtime style overhead.
- **Design tokens in CSS custom properties.** Every color, spacing, radius, shadow, and transition is a `--uikit-*` variable. Components never use hardcoded values.
- **TypeScript strict with generics.** Select uses `Select<T>` for type-safe values. Polymorphic components use `as` prop with proper type inference. No `any`.
- **Compound components.** Card, Tabs use the compound pattern with dot notation (`Card.Header`, `Tabs.Tab`). Context-based, not prop-drilling.
- **Every component has tests.** Vitest + Testing Library. Test keyboard navigation, ARIA attributes, and visual states. Not just "renders without crashing."
- **Every component has a Storybook story.** Interactive controls for all props. Accessibility addon enabled. Show all variants and states.
- **Accessibility is non-negotiable.** Modal: focus trap + restore. Select: full keyboard nav. Tabs: arrow keys + ARIA. Tooltip: keyboard trigger. Toast: `aria-live`. All interactive components must be keyboard-operable.
- **Tree-shakeable build.** Vite library mode. `sideEffects: false`. Importing one component must not bundle all 12.
- **Lint clean.** ESLint + Prettier. `tsc --noEmit` passes. Zero warnings in build.

### What NOT to do
- Don't use styled-components, emotion, or any runtime CSS-in-JS. CSS Modules only.
- Don't use a third-party component library as a base (no Radix, no Headless UI, no Chakra). Build from scratch.
- Don't skip the compound component pattern for Card and Tabs. It's a key demonstration of advanced React patterns.
- Don't use native `<select>` for the Select component. Build a custom dropdown with keyboard navigation.
- Don't skip the library build. This must be a publishable npm package, not just a Storybook demo.
- Don't leave `// TODO` or `// FIXME` comments anywhere.

---

## GitHub Username

The GitHub username is **devaloi**. For package.json, use package name `uikit`. For any GitHub URLs, use `github.com/devaloi/uikit`. For npm-style install examples, use `@devaloi/uikit`.

## Start

Read the three docs. Then begin Phase 1 from `F03-react-component-library.md`.
