# Toast

A notification toast system with variants, auto-dismiss, and stacking. Used via `ToastProvider` and the `useToast` hook.

## Import

```tsx
import { ToastProvider, useToast } from 'uikit';
```

## ToastProvider Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Stack position |
| `maxVisible` | `number` | `5` | Maximum visible toasts |
| `children` | `ReactNode` | — | App content |

## Toast Options (via `useToast`)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `message` | `string` | — | Toast message |
| `variant` | `'success' \| 'error' \| 'warning' \| 'info'` | `'info'` | Visual style |
| `duration` | `number` | `5000` | Auto-dismiss in ms (0 = persistent) |
| `dismissible` | `boolean` | `true` | Show close button |

## Usage

```tsx
// Wrap your app with ToastProvider
<ToastProvider position="top-right">
  <App />
</ToastProvider>
```

```tsx
// Trigger toasts from any component
function SaveButton() {
  const { toast, dismiss } = useToast();

  const handleSave = () => {
    toast({ message: 'Saved!', variant: 'success' });
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

```tsx
// Persistent error toast
const { toast } = useToast();
toast({ message: 'Network error', variant: 'error', duration: 0 });
```

## Accessibility

- Toast container uses `role="status"` and `aria-live="polite"`.
- Dismiss button has an accessible label.
- Timer pauses on hover so users can read the message.

## Related

- [Alert](../Alert/README.md) — inline notification alternative
- [Modal](../Modal/README.md) — blocking dialog
