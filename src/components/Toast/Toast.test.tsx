import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';

function ToastTrigger() {
  const { toast, dismiss } = useToast();
  return (
    <div>
      <button onClick={() => toast({ message: 'Hello!', variant: 'success' })}>Show Toast</button>
      <button onClick={() => toast({ message: 'Error!', variant: 'error', duration: 0 })}>
        Show Persistent
      </button>
      <button onClick={() => { const id = toast({ message: 'Dismiss me' }); dismiss(id); }}>
        Show and Dismiss
      </button>
    </div>
  );
}

describe('Toast', () => {
  it('renders message', () => {
    render(<Toast>Test message</Toast>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('has status role and aria-live', () => {
    render(<Toast>Message</Toast>);
    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('aria-live', 'polite');
  });

  it('calls onDismiss when dismiss clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Toast dismissible onDismiss={onDismiss}>
        Message
      </Toast>,
    );
    await user.click(screen.getByLabelText('Dismiss notification'));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not show dismiss when dismissible is false', () => {
    render(
      <Toast dismissible={false}>Message</Toast>,
    );
    expect(screen.queryByLabelText('Dismiss notification')).not.toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = render(<Toast variant="error">Error</Toast>);
    expect(container.firstChild).toHaveClass('error');
  });
});

describe('ToastProvider', () => {
  it('shows toast when triggered', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await user.click(screen.getByText('Show Toast'));
    expect(screen.getByText('Hello!')).toBeInTheDocument();
  });

  it('dismisses toast', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await user.click(screen.getByText('Show and Dismiss'));
    expect(screen.queryByText('Dismiss me')).not.toBeInTheDocument();
  });

  it('auto-dismisses toast after duration', async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await act(async () => { vi.advanceTimersByTime(0); }); // flush portal mount
    const btn = screen.getByText('Show Toast');
    await act(async () => { btn.click(); });
    await act(async () => { vi.advanceTimersByTime(0); });
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    await act(async () => { vi.advanceTimersByTime(6000); });
    expect(screen.queryByText('Hello!')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('shows multiple toasts', async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );
    await act(async () => { vi.advanceTimersByTime(0); });
    await act(async () => { screen.getByText('Show Toast').click(); });
    await act(async () => { vi.advanceTimersByTime(0); });
    await act(async () => { screen.getByText('Show Persistent').click(); });
    await act(async () => { vi.advanceTimersByTime(0); });
    expect(screen.getByText('Hello!')).toBeInTheDocument();
    expect(screen.getByText('Error!')).toBeInTheDocument();
    vi.useRealTimers();
  });

  it('throws when useToast is outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ToastTrigger />)).toThrow('useToast must be used within a ToastProvider');
    spy.mockRestore();
  });
});
