# F03: uikit — React Component Library

**Catalog ID:** F03 | **Size:** M | **Language:** TypeScript / React
**Repo name:** `uikit`
**One-liner:** A small, professional React component library with 12 accessible components, design tokens, Storybook interactive docs, comprehensive tests, and tree-shakeable npm-publishable build.

---

## Why This Stands Out

- **12 production-quality components** — not toy examples, real interactive components with edge cases handled
- **Design tokens / theming** — CSS custom properties for colors, spacing, typography; light/dark themes; runtime theme switching
- **Storybook 8.1 with docs** — interactive controls, accessibility addon, usage examples in MDX, component status badges
- **100% test coverage target** — Vitest + Testing Library for every component; keyboard, ARIA, and visual states all tested
- **Tree-shakeable build** — Vite library mode with proper `package.json` exports, `sideEffects: false`, ESM + CJS
- **TypeScript strict generics** — compound components (Tabs, Select) use generics for type-safe values
- **CSS Modules** — no runtime CSS-in-JS; zero-overhead styling with design token variables
- **Chromatic-ready** — visual regression testing configuration, snapshot baselines
- **Per-component README** — each component has its own doc file with API, examples, accessibility notes

---

## Architecture

```
uikit/
├── src/
│   ├── index.ts                       # Public API: re-exports all components
│   ├── tokens/
│   │   ├── tokens.css                 # Design tokens: colors, spacing, typography, radii
│   │   ├── themes/
│   │   │   ├── light.css              # Light theme token values
│   │   │   └── dark.css               # Dark theme token values
│   │   └── ThemeProvider.tsx           # Context provider for theme switching
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx             # Button component (variants, sizes, loading, icon)
│   │   │   ├── Button.module.css
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── README.md
│   │   ├── Input/
│   │   │   ├── Input.tsx              # Text input (sizes, states, prefix/suffix, clearable)
│   │   │   ├── Input.module.css
│   │   │   ├── Input.test.tsx
│   │   │   ├── Input.stories.tsx
│   │   │   └── README.md
│   │   ├── Select/
│   │   │   ├── Select.tsx             # Custom select with keyboard nav and generics
│   │   │   ├── Select.module.css
│   │   │   ├── Select.test.tsx
│   │   │   ├── Select.stories.tsx
│   │   │   └── README.md
│   │   ├── Modal/
│   │   │   ├── Modal.tsx              # Dialog with focus trap, portal, esc-to-close
│   │   │   ├── Modal.module.css
│   │   │   ├── Modal.test.tsx
│   │   │   ├── Modal.stories.tsx
│   │   │   └── README.md
│   │   ├── Toast/
│   │   │   ├── Toast.tsx              # Toast notification (success, error, warning, info)
│   │   │   ├── ToastProvider.tsx      # Toast context + container for stacking
│   │   │   ├── Toast.module.css
│   │   │   ├── Toast.test.tsx
│   │   │   ├── Toast.stories.tsx
│   │   │   └── README.md
│   │   ├── Card/
│   │   │   ├── Card.tsx               # Card container (header, body, footer slots)
│   │   │   ├── Card.module.css
│   │   │   ├── Card.test.tsx
│   │   │   ├── Card.stories.tsx
│   │   │   └── README.md
│   │   ├── Badge/
│   │   │   ├── Badge.tsx              # Badge/tag (variants, sizes, dot indicator)
│   │   │   ├── Badge.module.css
│   │   │   ├── Badge.test.tsx
│   │   │   ├── Badge.stories.tsx
│   │   │   └── README.md
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx             # Avatar (image, initials fallback, sizes, group)
│   │   │   ├── Avatar.module.css
│   │   │   ├── Avatar.test.tsx
│   │   │   ├── Avatar.stories.tsx
│   │   │   └── README.md
│   │   ├── Tabs/
│   │   │   ├── Tabs.tsx               # Compound component: Tabs, TabList, Tab, TabPanel
│   │   │   ├── Tabs.module.css
│   │   │   ├── Tabs.test.tsx
│   │   │   ├── Tabs.stories.tsx
│   │   │   └── README.md
│   │   ├── Tooltip/
│   │   │   ├── Tooltip.tsx            # Tooltip with positioning, delay, keyboard trigger
│   │   │   ├── Tooltip.module.css
│   │   │   ├── Tooltip.test.tsx
│   │   │   ├── Tooltip.stories.tsx
│   │   │   └── README.md
│   │   ├── Spinner/
│   │   │   ├── Spinner.tsx            # Loading spinner (sizes, accessible label)
│   │   │   ├── Spinner.module.css
│   │   │   ├── Spinner.test.tsx
│   │   │   ├── Spinner.stories.tsx
│   │   │   └── README.md
│   │   └── Alert/
│   │       ├── Alert.tsx              # Alert banner (variants, dismissible, icon)
│   │       ├── Alert.module.css
│   │       ├── Alert.test.tsx
│   │       ├── Alert.stories.tsx
│   │       └── README.md
│   └── utils/
│       ├── cn.ts                      # Classname merge utility
│       ├── polymorphic.ts             # Polymorphic component type helper
│       └── portal.tsx                 # Portal component for modals/tooltips
├── .storybook/
│   ├── main.ts                        # Storybook config
│   ├── preview.ts                     # Global decorators, theme toggle
│   └── manager.ts                     # Sidebar config, addon setup
├── tsconfig.json
├── tsconfig.build.json                # Build-specific TS config (excludes tests/stories)
├── vite.config.ts                     # Library mode build config
├── vitest.config.ts
├── package.json                       # Proper exports map, sideEffects: false
├── Makefile                           # dev, build, test, lint, storybook, chromatic
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── LICENSE
└── README.md
```

---

## Component API Reference

### Button
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `loading` | `boolean` | `false` | Shows spinner, disables click |
| `icon` | `ReactNode` | — | Icon before label |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement |
| `fullWidth` | `boolean` | `false` | Expand to container width |
| `as` | `ElementType` | `'button'` | Polymorphic element type |

### Input
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `error` | `string` | — | Error message (shows red border + message) |
| `prefix` | `ReactNode` | — | Left addon (icon or text) |
| `suffix` | `ReactNode` | — | Right addon |
| `clearable` | `boolean` | `false` | Show clear button when non-empty |
| `onClear` | `() => void` | — | Clear button callback |

### Select<T>
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption<T>[]` | — | `{ value: T, label: string, disabled? }` |
| `value` | `T \| null` | — | Selected value |
| `onChange` | `(value: T) => void` | — | Selection callback |
| `placeholder` | `string` | `'Select…'` | Placeholder text |
| `searchable` | `boolean` | `false` | Enable type-to-filter |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |

### Modal
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onClose` | `() => void` | — | Close callback |
| `title` | `string` | — | Dialog title (used for `aria-labelledby`) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Width preset |
| `closeOnOverlay` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |

### Toast
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Visual style |
| `duration` | `number` | `5000` | Auto-dismiss ms (0 = persistent) |
| `dismissible` | `boolean` | `true` | Show close button |
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Stack position |

### Card
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Box shadow |
| `hoverable` | `boolean` | `false` | Hover elevation effect |
| Slots: | `Card.Header`, `Card.Body`, `Card.Footer` | — | Compound component slots |

### Badge
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color scheme |
| `size` | `'sm' \| 'md'` | `'md'` | Size preset |
| `dot` | `boolean` | `false` | Show status dot instead of text |

### Avatar
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `name` | `string` | — | Name for initials fallback |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape |

### Tabs
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | — | Initially active tab |
| `value` | `string` | — | Controlled active tab |
| `onChange` | `(value: string) => void` | — | Tab change callback |
| Compound: | `Tabs.List`, `Tabs.Tab`, `Tabs.Panel` | — | ARIA tablist pattern |

### Tooltip
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position |
| `delay` | `number` | `200` | Show delay ms |

### Spinner
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `label` | `string` | `'Loading'` | Accessible label |

### Alert
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Visual style |
| `title` | `string` | — | Optional bold heading |
| `dismissible` | `boolean` | `false` | Show close button |
| `icon` | `ReactNode` | — | Custom icon (default per variant) |

---

## Design Tokens

```css
/* tokens.css — all components reference these */
:root {
  /* Colors */
  --uikit-color-primary: #2563eb;
  --uikit-color-primary-hover: #1d4ed8;
  --uikit-color-secondary: #64748b;
  --uikit-color-success: #16a34a;
  --uikit-color-warning: #d97706;
  --uikit-color-danger: #dc2626;
  --uikit-color-text: #0f172a;
  --uikit-color-text-muted: #64748b;
  --uikit-color-bg: #ffffff;
  --uikit-color-surface: #f8fafc;
  --uikit-color-border: #e2e8f0;

  /* Spacing */
  --uikit-space-xs: 4px;
  --uikit-space-sm: 8px;
  --uikit-space-md: 12px;
  --uikit-space-lg: 16px;
  --uikit-space-xl: 24px;
  --uikit-space-2xl: 32px;

  /* Typography */
  --uikit-font-sans: system-ui, -apple-system, sans-serif;
  --uikit-font-mono: 'SF Mono', Consolas, monospace;
  --uikit-text-sm: 0.875rem;
  --uikit-text-md: 1rem;
  --uikit-text-lg: 1.125rem;

  /* Radii */
  --uikit-radius-sm: 4px;
  --uikit-radius-md: 6px;
  --uikit-radius-lg: 8px;
  --uikit-radius-full: 9999px;

  /* Shadows */
  --uikit-shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --uikit-shadow-md: 0 4px 6px rgba(0,0,0,0.07);
  --uikit-shadow-lg: 0 10px 15px rgba(0,0,0,0.1);

  /* Transitions */
  --uikit-transition-fast: 150ms ease;
  --uikit-transition-normal: 200ms ease;
}
```

---

## Tech Stack

| Component | Choice |
|-----------|--------|
| Framework | React 19 (peer dependency) |
| Language | TypeScript 5.7 (strict mode) |
| Styling | CSS Modules + CSS custom properties |
| Testing | Vitest 1.4 + Testing Library |
| Stories | Storybook 8.1 (with a11y addon, controls) |
| Build | Vite library mode (ESM + CJS) |
| Visual testing | Chromatic-ready configuration |
| Linting | ESLint + Prettier |

---

## Phased Build Plan

### Phase 1: Foundation & Theming

**1.1 — Project setup**
- Vite library mode config: `build.lib` targeting `src/index.ts`
- TypeScript strict, Vitest + Testing Library, Storybook 8.1 with a11y addon
- ESLint + Prettier, Makefile (dev, build, test, lint, storybook, chromatic)
- `package.json`: name `uikit`, `exports` map for ESM/CJS, `sideEffects: false`, `peerDependencies: { react, react-dom }`

**1.2 — Design tokens**
- `tokens.css` with all CSS custom properties
- `themes/light.css` + `themes/dark.css` overriding color tokens
- Tokens namespaced: `--uikit-*` to avoid collisions
- Verify tokens cover: colors (8+), spacing (6 steps), typography (3 sizes), radii (4), shadows (3)

**1.3 — ThemeProvider**
- React context: `{ theme: 'light' | 'dark', setTheme }`
- Applies `data-theme` attribute to container element
- CSS selects tokens via `[data-theme="dark"]`
- SSR-safe: reads `prefers-color-scheme` on mount
- Tests: theme switches, dark mode applies, context accessible

**1.4 — Utility modules**
- `cn.ts`: classname merge (simple implementation, no clsx dependency)
- `polymorphic.ts`: `PolymorphicProps<E, P>` type for `as` prop
- `portal.tsx`: Portal component rendering into `document.body`
- Tests for each utility

### Phase 2: Simple Components

**2.1 — Button**
- Variants: primary, secondary, ghost, danger
- Sizes: sm, md, lg (mapped to design tokens)
- States: hover, active, focus, disabled, loading (spinner replaces content)
- Polymorphic: renders as `<button>`, `<a>`, or custom element via `as` prop
- Icon support: icon + label, icon-only (with `aria-label`)
- Tests: renders, click fires, disabled prevents click, loading shows spinner, keyboard Enter/Space
- Storybook: all variants × sizes, loading state, with icons, as link

**2.2 — Badge**
- Variants: default, primary, success, warning, danger
- Sizes: sm, md
- Dot mode: small circle indicator (no text)
- Tests: renders text, dot mode, variants apply correct styles
- Storybook: all variants, sizes, dot mode

**2.3 — Spinner**
- SVG circle animation with `stroke-dasharray`
- Sizes: sm (16px), md (24px), lg (32px)
- Accessible: `role="status"`, `aria-label` for screen readers
- Tests: renders, accessible label present, size classes
- Storybook: sizes, custom label

**2.4 — Avatar**
- Image mode: `<img>` with `loading="lazy"`
- Initials fallback: extract first letters of name, colored background
- Error fallback: if image fails, show initials
- Sizes: xs through xl
- Shapes: circle, square
- Avatar.Group: overlapping stack with `+N` overflow
- Tests: image renders, fallback on error, initials from name, group overflow
- Storybook: image, initials, error state, group

### Phase 3: Form Components

**3.1 — Input**
- Sizes: sm, md, lg
- States: default, focus, error, disabled
- Prefix/suffix: icon or text addon
- Clearable: show × button when non-empty
- Error: red border + error message below
- `aria-invalid`, `aria-describedby` for error message
- Forward ref for external focus management
- Tests: type updates value, clear button works, error displays, disabled blocks input, keyboard
- Storybook: sizes, states, addons, clearable

**3.2 — Select<T>**
- Generic type `T` for option values (type-safe selection)
- Custom dropdown (not native `<select>`) for consistent styling
- Keyboard: arrow keys navigate, Enter selects, Escape closes, type-to-filter when searchable
- ARIA: `role="listbox"`, `aria-activedescendant`, `aria-expanded`
- Portal dropdown to avoid overflow clipping
- Sizes: sm, md, lg
- Tests: open/close, keyboard navigation, selection, search filtering, type safety
- Storybook: basic, searchable, with disabled options, grouped

**3.3 — Alert**
- Variants: info, success, warning, error (each with default icon)
- Optional title (bold heading)
- Dismissible: close button with fade-out
- `role="alert"` for error/warning, `role="status"` for info/success
- Tests: renders message, dismiss callback, icon per variant, ARIA roles
- Storybook: all variants, with/without title, dismissible

### Phase 4: Interactive Components

**4.1 — Modal**
- Portal render via `portal.tsx`
- Focus trap: Tab cycles within modal, no focus escape
- Focus restore: returns focus to trigger element on close
- Escape key closes (configurable)
- Overlay click closes (configurable)
- Scroll lock on body when open
- `aria-modal="true"`, `role="dialog"`, `aria-labelledby` from title
- Transition: fade + scale animation
- Sizes: sm (400px), md (540px), lg (720px), full (100%)
- Tests: opens/closes, focus trap, escape, overlay click, focus restore, scroll lock
- Storybook: sizes, with form content, nested modals

**4.2 — Toast + ToastProvider**
- `ToastProvider`: wraps app, provides `useToast()` hook
- `useToast()` returns `{ toast(options), dismiss(id) }`
- Toast stacks in configurable corner
- Auto-dismiss with progress bar (visual countdown)
- Pause timer on hover
- Variants: success, error, warning, info
- Animation: slide-in + fade-out
- Max visible toasts (default 5, older ones collapse)
- `role="status"`, `aria-live="polite"` for screen readers
- Tests: show/dismiss, auto-dismiss, pause on hover, multiple toasts stack, variants
- Storybook: trigger buttons for each variant, position config

**4.3 — Tabs**
- Compound component: `Tabs` → `Tabs.List` + `Tabs.Tab` + `Tabs.Panel`
- Controlled and uncontrolled modes
- Keyboard: arrow keys move between tabs, Home/End, Space/Enter activates
- ARIA: `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls`
- Lazy rendering: panels only mount when activated (configurable)
- Active indicator: underline with CSS transition
- Tests: tab switching, keyboard navigation, controlled mode, ARIA attributes
- Storybook: basic, controlled, with icons, disabled tabs

**4.4 — Tooltip**
- Trigger: hover + focus (keyboard accessible)
- Positions: top, bottom, left, right with auto-flip on viewport edge
- Delay: configurable show delay (default 200ms), instant hide
- Portal render to avoid clipping
- Arrow pointer toward trigger
- `role="tooltip"`, `aria-describedby` on trigger
- Tests: shows on hover, shows on focus, hides on escape, positioning, delay
- Storybook: all positions, custom content, interactive (with focusable elements)

### Phase 5: Card & Build

**5.1 — Card**
- Compound component: `Card` → `Card.Header`, `Card.Body`, `Card.Footer`
- Padding presets: none, sm, md, lg
- Shadow presets: none, sm, md, lg
- Hoverable: elevation increase on hover
- Composable: slots are optional, use any combination
- Tests: renders with slots, padding/shadow props, hover effect
- Storybook: basic, with header/footer, hoverable, as link

**5.2 — Library build**
- Vite library mode: ESM (`dist/uikit.es.js`) + CJS (`dist/uikit.cjs.js`)
- Type declarations: `dist/index.d.ts` via `tsc --emitDeclarationOnly`
- CSS output: `dist/style.css` (all component styles + tokens)
- `package.json` exports map:
  ```json
  "exports": {
    ".": { "import": "./dist/uikit.es.js", "require": "./dist/uikit.cjs.js", "types": "./dist/index.d.ts" },
    "./style.css": "./dist/style.css"
  }
  ```
- Verify tree-shaking: importing single component doesn't bundle all
- Verify: `npm pack` produces clean tarball, installs in fresh project

**5.3 — Chromatic setup**
- `.storybook/main.ts`: configure for Chromatic integration
- Add `chromatic` script to package.json
- Document setup steps in README (requires Chromatic token)
- Storybook builds cleanly: `npm run build-storybook`

### Phase 6: Docs & Polish

**6.1 — Per-component README**
- Each component folder has `README.md` with:
  - Import example
  - Props table
  - Usage examples (2-3 scenarios)
  - Accessibility notes (keyboard, ARIA)
  - Related components

**6.2 — Root README.md**
- Hero: library name, description, badges (build, npm, storybook)
- Install: `npm install @devaloi/uikit`
- Quick start: wrap app in `ThemeProvider`, import components + CSS
- Component gallery: table with name, description, status
- Theming: how to override design tokens
- Dark mode: how to use `ThemeProvider`
- Development: dev, test, lint, storybook, build commands
- Contributing guidelines
- Architecture: file structure explanation

**6.3 — Refactoring pass**
- Consistent prop naming across all components
- All components forward refs
- All components have `displayName`
- Remove unused code and imports
- Verify no `any` types remain

**6.4 — Final checks**
- `npm run build` clean (zero warnings, output files correct)
- `npm run test` all green (aim for 100% coverage on component logic)
- `npm run lint` clean
- `npm run typecheck` (`tsc --noEmit`) clean
- `npm run build-storybook` clean
- Verify exports: fresh project can `import { Button } from 'uikit'`
- No `// TODO` or `// FIXME` comments

---

## Commit Plan

1. `chore: scaffold project with Vite library mode and Storybook`
2. `feat: add design tokens, themes (light/dark), and ThemeProvider`
3. `feat: add utility modules (cn, polymorphic, portal)`
4. `feat: add Button component with variants, sizes, and loading`
5. `feat: add Badge and Spinner components`
6. `feat: add Avatar component with image, initials, and group`
7. `feat: add Input component with sizes, addons, and clearable`
8. `feat: add Select component with keyboard nav and generics`
9. `feat: add Alert component with variants and dismiss`
10. `feat: add Modal with focus trap, portal, and scroll lock`
11. `feat: add Toast and ToastProvider with auto-dismiss`
12. `feat: add Tabs compound component with ARIA tablist`
13. `feat: add Tooltip with positioning and keyboard trigger`
14. `feat: add Card compound component`
15. `feat: configure library build with exports map`
16. `feat: add Chromatic setup and visual testing config`
17. `docs: add per-component READMEs and root README`
18. `refactor: consistent props, displayNames, forward refs`
19. `chore: final lint, typecheck, build verification`
