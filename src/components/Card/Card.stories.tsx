import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    shadow: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    hoverable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: { children: 'Simple card content' },
};

export const WithSlots: Story = {
  render: () => (
    <Card padding="none" style={{ maxWidth: 400 }}>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        <p>This is the card body content. It can contain anything.</p>
      </Card.Body>
      <Card.Footer>
        <Button size="sm">Action</Button>
      </Card.Footer>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hoverable shadow="sm" style={{ maxWidth: 300 }}>
      <Card.Header>Hover me</Card.Header>
      <Card.Body>This card has a hover effect.</Card.Body>
    </Card>
  ),
};

export const AllShadows: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px' }}>
      <Card shadow="none" style={{ width: 150 }}>None</Card>
      <Card shadow="sm" style={{ width: 150 }}>Small</Card>
      <Card shadow="md" style={{ width: 150 }}>Medium</Card>
      <Card shadow="lg" style={{ width: 150 }}>Large</Card>
    </div>
  ),
};
