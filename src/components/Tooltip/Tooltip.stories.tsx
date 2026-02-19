import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    delay: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Top: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="This is a tooltip" placement="top">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Bottom: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="Bottom tooltip" placement="bottom">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Left: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="Left tooltip" placement="left">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Right: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="Right tooltip" placement="right">
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const AllPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '100px', justifyContent: 'center' }}>
      <Tooltip content="Top" placement="top"><Button variant="secondary">Top</Button></Tooltip>
      <Tooltip content="Bottom" placement="bottom"><Button variant="secondary">Bottom</Button></Tooltip>
      <Tooltip content="Left" placement="left"><Button variant="secondary">Left</Button></Tooltip>
      <Tooltip content="Right" placement="right"><Button variant="secondary">Right</Button></Tooltip>
    </div>
  ),
};

export const CustomDelay: Story = {
  render: () => (
    <div style={{ padding: '100px' }}>
      <Tooltip content="Slow tooltip (500ms)" delay={500}>
        <Button>Slow tooltip</Button>
      </Tooltip>
    </div>
  ),
};
