# Select

A custom select dropdown with generic type support, keyboard navigation, and optional search filtering.

## Import

```tsx
import { Select } from 'uikit';
import type { SelectOption } from 'uikit';
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `SelectOption<T>[]` | — | Array of `{ value, label, disabled? }` |
| `value` | `T \| null` | — | Currently selected value |
| `onChange` | `(value: T) => void` | — | Selection callback |
| `placeholder` | `string` | `'Select…'` | Placeholder text |
| `searchable` | `boolean` | `false` | Enable type-to-filter |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size preset |
| `disabled` | `boolean` | `false` | Disable the select |
| `className` | `string` | — | Additional CSS class |

## Usage

```tsx
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];

<Select options={options} value={selected} onChange={setSelected} />

<Select
  options={options}
  value={selected}
  onChange={setSelected}
  searchable
  placeholder="Search frameworks…"
/>
```

## Accessibility

- `role="listbox"` on the dropdown with `aria-activedescendant`.
- `aria-expanded` on the trigger button.
- Arrow keys navigate options, Enter selects, Escape closes.
- When `searchable`, the search input is auto-focused on open.

## Related

- [Input](../Input/README.md) — text input alternative
