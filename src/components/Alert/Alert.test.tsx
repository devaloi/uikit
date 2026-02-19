import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders message', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByText('Something happened')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Alert title="Heads up">Details here</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss clicked', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Message
      </Alert>,
    );
    await user.click(screen.getByLabelText('Dismiss alert'));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('uses role="alert" for error variant', () => {
    render(<Alert variant="error">Error!</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="alert" for warning variant', () => {
    render(<Alert variant="warning">Careful</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('uses role="status" for info variant', () => {
    render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('uses role="status" for success variant', () => {
    render(<Alert variant="success">Done</Alert>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const variants = ['info', 'success', 'warning', 'error'] as const;
    variants.forEach((variant) => {
      const { container, unmount } = render(
        <Alert variant={variant}>Message</Alert>,
      );
      expect(container.firstChild).toHaveClass(variant);
      unmount();
    });
  });

  it('renders custom icon', () => {
    render(
      <Alert icon={<span data-testid="custom-icon">🔔</span>}>Alert</Alert>,
    );
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('does not show dismiss button by default', () => {
    render(<Alert>Message</Alert>);
    expect(screen.queryByLabelText('Dismiss alert')).not.toBeInTheDocument();
  });
});
