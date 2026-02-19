# Modal

A dialog component rendered via a portal with focus trapping, scroll lock, and configurable close behavior.

## Import

```tsx
import { Modal, useModalTrigger } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onClose` | `() => void` | — | Close callback |
| `title` | `string` | — | Dialog title (used for `aria-labelledby`) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Width preset |
| `closeOnOverlay` | `boolean` | `true` | Close on backdrop click |
| `closeOnEscape` | `boolean` | `true` | Close on Escape key |

Also accepts all native `<div>` attributes except `title`.

## Usage

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open Modal</Button>

<Modal open={open} onClose={() => setOpen(false)} title="Confirm">
  <p>Are you sure?</p>
  <Button onClick={() => setOpen(false)}>Close</Button>
</Modal>
```

```tsx
// Using the useModalTrigger hook
const { open, onClose, triggerProps } = useModalTrigger();

<Button {...triggerProps}>Open</Button>
<Modal open={open} onClose={onClose} title="Settings" size="lg">
  …
</Modal>
```

## Accessibility

- `role="dialog"` with `aria-modal="true"`.
- `aria-labelledby` is set from the `title` prop.
- Focus is trapped inside the modal (Tab cycles within).
- Focus returns to the trigger element on close.
- Body scroll is locked while the modal is open.

## Related

- [Toast](../Toast/README.md) — non-blocking notification alternative
- [Alert](../Alert/README.md) — inline feedback
