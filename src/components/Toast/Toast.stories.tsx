import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: { variant: 'success', children: 'Operation completed successfully!' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'Something went wrong.' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Please review before continuing.' },
};

export const Info: Story = {
  args: { variant: 'info', children: 'New updates available.' },
};

function ToastDemo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button
        variant="primary"
        onClick={() => toast({ message: 'Success!', variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="danger"
        onClick={() => toast({ message: 'Error occurred', variant: 'error' })}
      >
        Error
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Heads up!', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="ghost"
        onClick={() => toast({ message: 'FYI', variant: 'info' })}
      >
        Info
      </Button>
    </div>
  );
}

export const Interactive: Story = {
  render: () => <ToastDemo />,
};
