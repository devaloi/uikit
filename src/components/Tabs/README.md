# Tabs

A compound tab component supporting controlled and uncontrolled modes with full ARIA tablist semantics.

## Import

```tsx
import { Tabs } from 'uikit';
```

## Tabs Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | `string` | — | Initially active tab (uncontrolled) |
| `value` | `string` | — | Active tab (controlled) |
| `onChange` | `(value: string) => void` | — | Tab change callback |

## Sub-components

- **`Tabs.List`** — Tab button container (`role="tablist"`).
- **`Tabs.Tab`** — Individual tab button. Props: `value: string`, `disabled?: boolean`.
- **`Tabs.Panel`** — Content panel. Props: `value: string`.

## Usage

```tsx
// Uncontrolled
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">General</Tabs.Tab>
    <Tabs.Tab value="tab2">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">General content</Tabs.Panel>
  <Tabs.Panel value="tab2">Settings content</Tabs.Panel>
</Tabs>
```

```tsx
// Controlled
const [active, setActive] = useState('tab1');

<Tabs value={active} onChange={setActive}>
  <Tabs.List>
    <Tabs.Tab value="tab1">Profile</Tabs.Tab>
    <Tabs.Tab value="tab2" disabled>Billing</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Profile content</Tabs.Panel>
  <Tabs.Panel value="tab2">Billing content</Tabs.Panel>
</Tabs>
```

## Accessibility

- Implements the WAI-ARIA Tabs pattern: `role="tablist"`, `role="tab"`, `role="tabpanel"`.
- `aria-selected` and `aria-controls` are set automatically.
- Arrow keys move focus between tabs; Home/End jump to first/last.
- Space or Enter activates the focused tab.

## Related

- [Card](../Card/README.md) — container for tab panels
