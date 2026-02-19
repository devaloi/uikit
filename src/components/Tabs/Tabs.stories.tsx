import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <Tabs.List>
        <Tabs.Tab value="overview">Overview</Tabs.Tab>
        <Tabs.Tab value="features">Features</Tabs.Tab>
        <Tabs.Tab value="pricing">Pricing</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="overview">
        <p>Welcome to the overview panel.</p>
      </Tabs.Panel>
      <Tabs.Panel value="features">
        <p>Here are the features.</p>
      </Tabs.Panel>
      <Tabs.Panel value="pricing">
        <p>Pricing information goes here.</p>
      </Tabs.Panel>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <Tabs.List>
        <Tabs.Tab value="home">🏠 Home</Tabs.Tab>
        <Tabs.Tab value="settings">⚙️ Settings</Tabs.Tab>
        <Tabs.Tab value="profile">👤 Profile</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="home"><p>Home content</p></Tabs.Panel>
      <Tabs.Panel value="settings"><p>Settings content</p></Tabs.Panel>
      <Tabs.Panel value="profile"><p>Profile content</p></Tabs.Panel>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <Tabs.List>
        <Tabs.Tab value="active">Active</Tabs.Tab>
        <Tabs.Tab value="disabled" disabled>Disabled</Tabs.Tab>
        <Tabs.Tab value="other">Other</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="active"><p>Active tab content</p></Tabs.Panel>
      <Tabs.Panel value="disabled"><p>This should not show</p></Tabs.Panel>
      <Tabs.Panel value="other"><p>Other tab content</p></Tabs.Panel>
    </Tabs>
  ),
};
