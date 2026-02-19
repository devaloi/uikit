import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders dot mode without text', () => {
    render(<Badge dot data-testid="dot-badge">Text</Badge>);
    const badge = screen.getByTestId('dot-badge');
    expect(badge).toHaveClass('dot');
    expect(badge).toHaveTextContent('');
  });

  it('applies variant class', () => {
    render(<Badge variant="success" data-testid="badge">OK</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('success');
  });

  it('applies size class', () => {
    render(<Badge size="sm" data-testid="badge">Sm</Badge>);
    expect(screen.getByTestId('badge')).toHaveClass('sm');
  });

  it('applies all variant classes', () => {
    const variants = ['default', 'primary', 'success', 'warning', 'danger'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(
        <Badge variant={variant} data-testid="badge">{variant}</Badge>,
      );
      expect(screen.getByTestId('badge')).toHaveClass(variant);
      unmount();
    });
  });
});
