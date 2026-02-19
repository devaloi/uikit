# Alert

An inline alert banner with variant styles, optional title, dismiss support, and automatic ARIA roles.

## Import

```tsx
import { Alert } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Visual style |
| `title` | `string` | — | Optional bold heading |
| `dismissible` | `boolean` | `false` | Show close button |
| `onDismiss` | `() => void` | — | Callback when dismissed |
| `icon` | `ReactNode` | — | Custom icon (default icon per variant) |

Also accepts all native `<div>` attributes except `title`.

## Usage

```tsx
<Alert variant="info">Your session will expire in 5 minutes.</Alert>

<Alert variant="error" title="Upload failed" dismissible onDismiss={handleDismiss}>
  The file exceeds the 10 MB limit.
</Alert>

<Alert variant="success" icon={<CheckCircle />}>
  Changes saved successfully.
</Alert>
```

## Accessibility

- `role="alert"` for `error` and `warning` variants (assertive).
- `role="status"` for `info` and `success` variants (polite).
- Dismiss button has `aria-label="Dismiss alert"`.
- Default icons are marked `aria-hidden="true"`.

## Related

- [Toast](../Toast/README.md) — transient notification alternative
- [Modal](../Modal/README.md) — blocking dialog for confirmations
