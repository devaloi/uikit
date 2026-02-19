import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

describe('Tabs', () => {
  function renderTabs(props: Partial<React.ComponentProps<typeof Tabs>> = {}) {
    return render(
      <Tabs defaultValue="one" {...props}>
        <Tabs.List>
          <Tabs.Tab value="one">Tab 1</Tabs.Tab>
          <Tabs.Tab value="two">Tab 2</Tabs.Tab>
          <Tabs.Tab value="three">Tab 3</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Panel 1 content</Tabs.Panel>
        <Tabs.Panel value="two">Panel 2 content</Tabs.Panel>
        <Tabs.Panel value="three">Panel 3 content</Tabs.Panel>
      </Tabs>,
    );
  }

  it('renders tabs', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('shows active panel', () => {
    renderTabs();
    expect(screen.getByText('Panel 1 content')).toBeInTheDocument();
    expect(screen.queryByText('Panel 2 content')).not.toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Panel 2 content')).toBeInTheDocument();
    expect(screen.queryByText('Panel 1 content')).not.toBeInTheDocument();
  });

  it('navigates tabs with arrow keys', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByText('Tab 1').focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 2')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 3')).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByText('Tab 1')).toHaveFocus();
  });

  it('navigates with Home/End keys', async () => {
    const user = userEvent.setup();
    renderTabs();
    screen.getByText('Tab 1').focus();
    await user.keyboard('{End}');
    expect(screen.getByText('Tab 3')).toHaveFocus();
    await user.keyboard('{Home}');
    expect(screen.getByText('Tab 1')).toHaveFocus();
  });

  it('has correct ARIA attributes', () => {
    renderTabs();
    const tab1 = screen.getByText('Tab 1');
    expect(tab1).toHaveAttribute('aria-selected', 'true');
    expect(tab1).toHaveAttribute('role', 'tab');
    const tab2 = screen.getByText('Tab 2');
    expect(tab2).toHaveAttribute('aria-selected', 'false');
  });

  it('tab panel has tabpanel role', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
  });

  it('supports controlled mode', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Tabs value="one" onChange={onChange}>
        <Tabs.List>
          <Tabs.Tab value="one">Tab 1</Tabs.Tab>
          <Tabs.Tab value="two">Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Panel 1</Tabs.Panel>
        <Tabs.Panel value="two">Panel 2</Tabs.Panel>
      </Tabs>,
    );
    await user.click(screen.getByText('Tab 2'));
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('handles disabled tabs', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">Tab 1</Tabs.Tab>
          <Tabs.Tab value="two" disabled>Tab 2</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Panel 1</Tabs.Panel>
        <Tabs.Panel value="two">Panel 2</Tabs.Panel>
      </Tabs>,
    );
    await user.click(screen.getByText('Tab 2'));
    expect(screen.getByText('Panel 1')).toBeInTheDocument();
  });
});
