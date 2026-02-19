# Badge

A small label component for status indicators, tags, and counts, with variant colors and an optional dot mode.

## Import

```tsx
import { Badge } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color scheme |
| `size` | `'sm' \| 'md'` | `'md'` | Size preset |
| `dot` | `boolean` | `false` | Show status dot instead of text content |

Also accepts all native `<span>` attributes.

## Usage

```tsx
<Badge variant="success">Active</Badge>

<Badge variant="danger" size="sm">3</Badge>

<Badge variant="warning" dot />
```

## Accessibility

- Badge is rendered as a `<span>` and is read inline by screen readers.
- When using `dot` mode without visible text, provide an `aria-label` for screen reader context.

## Related

- [Avatar](../Avatar/README.md) — often paired with badges for status
- [Alert](../Alert/README.md) — for larger notifications
