# Input

A text input component with size variants, error state, prefix/suffix addons, and a clearable option.

## Import

```tsx
import { Input } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `error` | `string` | — | Error message (shows red border + text below) |
| `prefix` | `ReactNode` | — | Left addon (icon or text) |
| `suffix` | `ReactNode` | — | Right addon |
| `clearable` | `boolean` | `false` | Show clear button when non-empty |
| `onClear` | `() => void` | — | Callback when clear button is clicked |

Also accepts all native `<input>` attributes except `size` and `prefix`.

## Usage

```tsx
<Input placeholder="Email address" size="md" />

<Input
  error="This field is required"
  prefix={<SearchIcon />}
  clearable
  onClear={() => setValue('')}
/>

<Input suffix=".com" disabled />
```

## Accessibility

- Uses `aria-invalid` when `error` is set.
- Error message is linked via `aria-describedby`.
- Forwards ref for external focus management.

## Related

- [Button](../Button/README.md) — form companion
- [Select](../Select/README.md) — dropdown alternative
