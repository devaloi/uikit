import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    clearable: { control: 'boolean' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: { placeholder: 'Enter text…' },
};

export const WithError: Story = {
  args: { error: 'This field is required', placeholder: 'Email' },
};

export const WithPrefix: Story = {
  args: { prefix: <span>$</span>, placeholder: '0.00' },
};

export const WithSuffix: Story = {
  args: { suffix: <span>.com</span>, placeholder: 'domain' },
};

export const Clearable: Story = {
  render: function ClearableInput() {
    const [value, setValue] = useState('Hello world');
    return (
      <Input
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
        placeholder="Type something…"
      />
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'Cannot edit', placeholder: 'Disabled' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: 300 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};
