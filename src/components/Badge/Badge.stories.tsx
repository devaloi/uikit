import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
    dot: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: 'Badge' } };
export const Primary: Story = { args: { children: 'Primary', variant: 'primary' } };
export const Success: Story = { args: { children: 'Success', variant: 'success' } };
export const Warning: Story = { args: { children: 'Warning', variant: 'warning' } };
export const Danger: Story = { args: { children: 'Danger', variant: 'danger' } };
export const Small: Story = { args: { children: 'Small', size: 'sm' } };

export const DotIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge dot variant="success" />
      <Badge dot variant="warning" />
      <Badge dot variant="danger" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
};
