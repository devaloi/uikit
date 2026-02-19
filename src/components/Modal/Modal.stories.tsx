import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
    closeOnOverlay: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: function ModalDemo() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Example Modal">
          <p>This is the modal content. Press Escape or click the overlay to close.</p>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: function SmallModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Small Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Small" size="sm">
          <p>A compact dialog for confirmations.</p>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: function LargeModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Large Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Large" size="lg">
          <p>A wide dialog for complex content.</p>
        </Modal>
      </>
    );
  },
};

export const WithForm: Story = {
  render: function FormModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Edit Profile">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label>
              Name
              <input type="text" style={{ display: 'block', width: '100%' }} />
            </label>
            <label>
              Email
              <input type="email" style={{ display: 'block', width: '100%' }} />
            </label>
            <Button type="submit" onClick={(e: React.MouseEvent) => { e.preventDefault(); setOpen(false); }}>
              Save
            </Button>
          </form>
        </Modal>
      </>
    );
  },
};
