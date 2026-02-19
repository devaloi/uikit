# Avatar

Displays a user avatar with image, initials fallback, configurable sizes and shapes. Includes `AvatarGroup` for stacked layouts.

## Import

```tsx
import { Avatar, AvatarGroup } from 'uikit';
```

## Avatar Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | Image URL |
| `name` | `string` | — | Name for initials fallback and alt text |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size preset |
| `shape` | `'circle' \| 'square'` | `'circle'` | Shape |

## AvatarGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `max` | `number` | — | Max avatars before `+N` overflow indicator |
| `size` | `AvatarProps['size']` | — | Override size for all children |
| `children` | `ReactElement<AvatarProps>[]` | — | Avatar elements |

## Usage

```tsx
<Avatar src="/photo.jpg" name="Jane Doe" size="lg" />

<Avatar name="John Smith" shape="square" />

<AvatarGroup max={3} size="sm">
  <Avatar name="Alice" src="/a.jpg" />
  <Avatar name="Bob" src="/b.jpg" />
  <Avatar name="Carol" src="/c.jpg" />
  <Avatar name="Dave" src="/d.jpg" />
</AvatarGroup>
```

## Accessibility

- Image avatars use `name` as `alt` text.
- Falls back to initials if the image fails to load.
- `AvatarGroup` overflow renders a count indicator readable by screen readers.

## Related

- [Badge](../Badge/README.md) — status indicator alongside avatars
