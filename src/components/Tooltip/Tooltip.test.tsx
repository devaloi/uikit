import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
    });
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help text">
        <button>Hover me</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    await user.unhover(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('shows tooltip on focus', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Focus help">
        <button>Focus me</button>
      </Tooltip>,
    );
    await user.tab();
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveTextContent('Focus help');
    });
  });

  it('hides on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    const trigger = screen.getByText('Trigger');
    trigger.focus();
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument());
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
  });

  it('applies placement class', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Bottom tooltip" placement="bottom" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('bottom');
    });
  });

  it('sets aria-describedby on trigger', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Description" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    await waitFor(() => {
      const trigger = screen.getByText('Trigger');
      expect(trigger).toHaveAttribute('aria-describedby');
      const tooltipId = trigger.getAttribute('aria-describedby');
      expect(document.getElementById(tooltipId!)).toHaveTextContent('Description');
    });
  });

  it('respects delay', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Delayed" delay={500}>
        <button>Trigger</button>
      </Tooltip>,
    );
    await user.hover(screen.getByText('Trigger'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('tooltip')).toBeInTheDocument(), { timeout: 1000 });
  });
});
