import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with status role', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default accessible label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading');
  });

  it('accepts custom label', () => {
    render(<Spinner label="Saving data" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Saving data');
  });

  it('applies size class', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('lg');
  });

  it('applies all size classes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Spinner size={size} />);
      expect(screen.getByRole('status')).toHaveClass(size);
      unmount();
    });
  });
});
