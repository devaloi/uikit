import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const fruits = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const meta: Meta<typeof Select<string>> = {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    searchable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select<string>>;

export const Default: Story = {
  render: function DefaultSelect() {
    const [value, setValue] = useState<string | null>(null);
    return <Select options={fruits} value={value} onChange={setValue} />;
  },
};

export const Searchable: Story = {
  render: function SearchableSelect() {
    const [value, setValue] = useState<string | null>(null);
    return <Select options={fruits} value={value} onChange={setValue} searchable />;
  },
};

export const WithDisabledOptions: Story = {
  render: function DisabledOptSelect() {
    const [value, setValue] = useState<string | null>(null);
    const opts = [
      ...fruits,
      { value: 'fig', label: 'Fig (out of stock)', disabled: true },
    ];
    return <Select options={opts} value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: () => <Select options={fruits} value="apple" onChange={() => {}} disabled />,
};

export const AllSizes: Story = {
  render: function SizesSelect() {
    const [v1, setV1] = useState<string | null>(null);
    const [v2, setV2] = useState<string | null>(null);
    const [v3, setV3] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: 300 }}>
        <Select options={fruits} value={v1} onChange={setV1} size="sm" placeholder="Small" />
        <Select options={fruits} value={v2} onChange={setV2} size="md" placeholder="Medium" />
        <Select options={fruits} value={v3} onChange={setV3} size="lg" placeholder="Large" />
      </div>
    );
  },
};
