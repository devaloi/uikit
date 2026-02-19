# Button

A polymorphic button component with multiple variants, sizes, loading state, and icon support.

## Import

```tsx
import { Button } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `loading` | `boolean` | `false` | Shows spinner and disables click |
| `icon` | `ReactNode` | — | Icon element |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Icon placement relative to label |
| `fullWidth` | `boolean` | `false` | Expand to container width |
| `as` | `ElementType` | `'button'` | Polymorphic element type |

Also accepts all native attributes of the rendered element.

## Usage

```tsx
<Button variant="primary" size="lg">
  Save Changes
</Button>

<Button variant="danger" loading>
  Deleting…
</Button>

<Button as="a" href="/docs" variant="ghost" icon={<LinkIcon />}>
  Documentation
</Button>
```

## Accessibility

- Renders a native `<button>` by default for full keyboard support.
- `aria-disabled` and `aria-busy` are set automatically during loading.
- Icon-only buttons should include an `aria-label`.
- When `as` is set to `"a"`, ensure `href` is provided.

## Related

- [Spinner](../Spinner/README.md) — used internally for loading state
- [Input](../Input/README.md) — form companion
