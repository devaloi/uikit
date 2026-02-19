import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders when open', () => {
    render(
      <Modal open onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal open={false} onClose={() => {}}>
        <p>Content</p>
      </Modal>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders title', () => {
    render(
      <Modal open onClose={() => {}} title="My Dialog">
        <p>Content</p>
      </Modal>,
    );
    expect(screen.getByText('My Dialog')).toBeInTheDocument();
  });

  it('has aria-modal attribute', () => {
    render(
      <Modal open onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('closes on escape', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close on escape when closeOnEscape is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnEscape={false}>
        Content
      </Modal>,
    );
    await user.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on overlay click', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        Content
      </Modal>,
    );
    await user.click(screen.getByTestId('modal-overlay'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('does not close on overlay when closeOnOverlay is false', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} closeOnOverlay={false}>
        Content
      </Modal>,
    );
    await user.click(screen.getByTestId('modal-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('does not close when clicking dialog content', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose}>
        <p>Click me</p>
      </Modal>,
    );
    await user.click(screen.getByText('Click me'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('locks body scroll when open', () => {
    render(
      <Modal open onClose={() => {}}>
        Content
      </Modal>,
    );
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll on unmount', () => {
    const { unmount } = render(
      <Modal open onClose={() => {}}>
        Content
      </Modal>,
    );
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('traps focus within modal', async () => {
    const user = userEvent.setup();
    render(
      <Modal open onClose={() => {}} title="Focus Test">
        <button>First</button>
        <button>Last</button>
      </Modal>,
    );
    const lastBtn = screen.getByText('Last');
    lastBtn.focus();
    await user.tab();
    // Should cycle back to first focusable element (close button in header)
    expect(screen.getByLabelText('Close dialog')).toHaveFocus();
  });

  it('applies size class', () => {
    render(
      <Modal open onClose={() => {}} size="lg">
        Content
      </Modal>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('lg');
  });
});
