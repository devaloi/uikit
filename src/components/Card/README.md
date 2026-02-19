# Card

A compound container component with optional header, body, and footer slots, customizable padding and shadow.

## Import

```tsx
import { Card } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Box shadow level |
| `hoverable` | `boolean` | `false` | Hover elevation effect |

Compound sub-components: `Card.Header`, `Card.Body`, `Card.Footer` — each accepts standard `<div>` attributes.

## Usage

```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content goes here.</Card.Body>
  <Card.Footer>Footer actions</Card.Footer>
</Card>
```

```tsx
<Card padding="lg" shadow="md" hoverable>
  <Card.Body>
    <h3>Hoverable card</h3>
    <p>Elevates on hover.</p>
  </Card.Body>
</Card>
```

```tsx
// Slots are optional — use any combination
<Card padding="none" shadow="none">
  <Card.Body>Minimal card</Card.Body>
</Card>
```

## Accessibility

- Card is a presentational container with no implicit ARIA role.
- Add appropriate roles (e.g., `role="region"`, `aria-label`) when the card represents a distinct section.

## Related

- [Badge](../Badge/README.md) — status indicators inside cards
- [Button](../Button/README.md) — actions in card footers
