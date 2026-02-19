import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['circle', 'square'] },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?u=1', name: 'John Doe' },
};

export const Initials: Story = {
  args: { name: 'Jane Smith' },
};

export const Square: Story = {
  args: { name: 'Bob Wilson', shape: 'square' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Avatar name="Test User" size="xs" />
      <Avatar name="Test User" size="sm" />
      <Avatar name="Test User" size="md" />
      <Avatar name="Test User" size="lg" />
      <Avatar name="Test User" size="xl" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Alice Johnson" />
      <Avatar name="Bob Smith" />
      <Avatar name="Carol White" />
      <Avatar name="Dave Brown" />
      <Avatar name="Eve Davis" />
    </AvatarGroup>
  ),
};

export const ImageError: Story = {
  args: { src: 'https://broken-url.example.com/avatar.jpg', name: 'Fallback User' },
};
