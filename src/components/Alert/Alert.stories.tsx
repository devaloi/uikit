import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    variant: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    dismissible: { control: 'boolean' },
    title: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { variant: 'info', children: 'This is an informational message.' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Operation completed successfully.' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Please review before continuing.' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Something went wrong.' },
};

export const WithTitle: Story = {
  args: {
    variant: 'info',
    title: 'Did you know?',
    children: 'You can customize these alerts with the variant prop.',
  },
};

export const Dismissible: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'This alert can be dismissed.',
    dismissible: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Alert variant="info" title="Info">An informational message.</Alert>
      <Alert variant="success" title="Success">Operation completed.</Alert>
      <Alert variant="warning" title="Warning">Proceed with caution.</Alert>
      <Alert variant="error" title="Error">Something went wrong.</Alert>
    </div>
  ),
};
