# uikit

A small, professional React component library with 12 accessible components, design tokens, Storybook interactive docs, comprehensive tests, and tree-shakeable npm-publishable build.

[![CI](https://github.com/devaloi/uikit/actions/workflows/ci.yml/badge.svg)](https://github.com/devaloi/uikit/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB)](https://react.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-8-FF4785)](https://storybook.js.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Install

```bash
npm install @devaloi/uikit
```

## Quick Start

```tsx
import { ThemeProvider, Button, Card } from 'uikit';
import 'uikit/style.css';

function App() {
  return (
    <ThemeProvider>
      <Card>
        <Card.Header>Welcome</Card.Header>
        <Card.Body>
          <Button variant="primary">Get Started</Button>
        </Card.Body>
      </Card>
    </ThemeProvider>
  );
}
```

## Components

| Component | Description | Status |
|-----------|-------------|--------|
| [Button](src/components/Button/README.md) | Polymorphic button with variants, sizes, loading | ✅ |
| [Input](src/components/Input/README.md) | Text input with prefix/suffix, clearable, error | ✅ |
| [Select](src/components/Select/README.md) | Custom select with keyboard nav and generics | ✅ |
| [Modal](src/components/Modal/README.md) | Dialog with focus trap, portal, scroll lock | ✅ |
| [Toast](src/components/Toast/README.md) | Notifications with auto-dismiss and stacking | ✅ |
| [Card](src/components/Card/README.md) | Compound card with header, body, footer | ✅ |
| [Badge](src/components/Badge/README.md) | Badge/tag with variants, sizes, dot mode | ✅ |
| [Avatar](src/components/Avatar/README.md) | Avatar with image, initials fallback, group | ✅ |
| [Tabs](src/components/Tabs/README.md) | Compound tabs with ARIA tablist pattern | ✅ |
| [Tooltip](src/components/Tooltip/README.md) | Tooltip with positioning and keyboard trigger | ✅ |
| [Spinner](src/components/Spinner/README.md) | Loading spinner with accessible label | ✅ |
| [Alert](src/components/Alert/README.md) | Alert banner with variants and dismiss | ✅ |

## Theming

All components use CSS custom properties (design tokens) namespaced with `--uikit-*`. Override any token to customize the look:

```css
:root {
  --uikit-color-primary: #8b5cf6;
  --uikit-color-primary-hover: #7c3aed;
  --uikit-radius-md: 8px;
}
```

### Dark Mode

Wrap your app in `ThemeProvider` for automatic dark mode based on system preference:

```tsx
import { ThemeProvider, useTheme } from 'uikit';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourApp />
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme}
    </button>
  );
}
```

## Development

```bash
# Prerequisites: Node.js v22+

# Install dependencies
npm install

# Start Storybook dev server
make dev

# Run tests
make test

# Run linter
make lint

# Type check
make typecheck

# Build library
make build

# Build Storybook static site
make build-storybook
```

## Architecture

```
uikit/
├── src/
│   ├── index.ts                 # Public API: re-exports all components
│   ├── tokens/
│   │   ├── tokens.css           # Design tokens (colors, spacing, typography)
│   │   ├── themes/light.css     # Light theme overrides
│   │   ├── themes/dark.css      # Dark theme overrides
│   │   └── ThemeProvider.tsx     # Theme context + provider
│   ├── components/              # 12 components, each with:
│   │   └── ComponentName/
│   │       ├── Component.tsx        # Implementation
│   │       ├── Component.module.css # CSS Modules styles
│   │       ├── Component.test.tsx   # Vitest + Testing Library tests
│   │       ├── Component.stories.tsx# Storybook stories
│   │       └── README.md           # Component documentation
│   └── utils/
│       ├── cn.ts                # Classname merge utility
│       ├── polymorphic.ts       # Polymorphic component type helper
│       └── portal.tsx           # Portal component
├── .storybook/                  # Storybook configuration
├── vite.config.ts               # Vite library mode build
├── vitest.config.ts             # Test configuration
└── tsconfig.json                # TypeScript strict mode
```

## Tech Stack

- **React 19** — peer dependency
- **TypeScript 5.7** — strict mode, generics for type-safe components
- **CSS Modules** — zero-runtime styling with design token variables
- **Vite** — library mode build (ESM + CJS), tree-shakeable
- **Vitest + Testing Library** — comprehensive component tests
- **Storybook 8** — interactive docs with a11y addon

## License

[MIT](./LICENSE) © [devaloi](https://github.com/devaloi)
