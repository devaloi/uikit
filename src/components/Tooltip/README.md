# Tooltip

A tooltip that appears on hover and focus with configurable placement and delay. Rendered via a portal to avoid clipping.

## Import

```tsx
import { Tooltip } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `ReactNode` | — | Tooltip content |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Position relative to trigger |
| `delay` | `number` | `200` | Show delay in ms |
| `children` | `ReactElement` | — | Trigger element |

## Usage

```tsx
<Tooltip content="Save your work">
  <Button>Save</Button>
</Tooltip>

<Tooltip content="Bottom aligned" placement="bottom" delay={0}>
  <span>Hover me</span>
</Tooltip>

<Tooltip content={<>Supports <strong>rich</strong> content</>}>
  <Button variant="ghost">Info</Button>
</Tooltip>
```

## Accessibility

- Trigger element receives `aria-describedby` pointing to the tooltip.
- `role="tooltip"` is set on the tooltip element.
- Shows on hover and on focus (keyboard accessible).
- Hides on Escape key press.
- Auto-flips position when near viewport edges.

## Related

- [Modal](../Modal/README.md) — for richer interactive overlays
