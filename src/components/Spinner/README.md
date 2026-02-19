# Spinner

An animated loading spinner with size variants and an accessible label for screen readers.

## Import

```tsx
import { Spinner } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset (16px / 24px / 32px) |
| `label` | `string` | `'Loading'` | Accessible label for screen readers |

Also accepts all native `<span>` attributes.

## Usage

```tsx
<Spinner />

<Spinner size="lg" label="Fetching results" />

<Button loading>
  {/* Spinner is used internally by Button in loading state */}
  Saving…
</Button>
```

## Accessibility

- Uses `role="status"` so screen readers announce the loading state.
- `aria-label` defaults to `"Loading"` and can be customized via the `label` prop.
- The SVG is decorative and hidden from assistive technology.

## Related

- [Button](../Button/README.md) — uses Spinner internally for loading state
