import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar, AvatarGroup } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" name="John Doe" data-testid="avatar" />);
    const avatar = screen.getByTestId('avatar');
    expect(avatar.querySelector('img')).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });

  it('shows initials when no src', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByRole('img')).toHaveTextContent('JD');
  });

  it('falls back to initials on image error', () => {
    render(<Avatar src="bad.jpg" name="Jane Smith" data-testid="avatar" />);
    const img = screen.getByTestId('avatar').querySelector('img');
    expect(img).toBeTruthy();
    fireEvent.error(img as Element);
    expect(screen.getByTestId('avatar')).toHaveTextContent('JS');
  });

  it('extracts initials from single name', () => {
    render(<Avatar name="Alice" />);
    expect(screen.getByRole('img')).toHaveTextContent('A');
  });

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(<Avatar name="Test" size={size} />);
      expect(screen.getByRole('img')).toHaveClass(size);
      unmount();
    });
  });

  it('applies shape classes', () => {
    render(<Avatar name="Test" shape="square" />);
    expect(screen.getByRole('img')).toHaveClass('square');
  });

  it('has accessible aria-label', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByRole('img')).toHaveAttribute('aria-label', 'John Doe');
  });

  it('image has loading lazy', () => {
    render(<Avatar src="photo.jpg" name="Test" data-testid="avatar" />);
    expect(screen.getByTestId('avatar').querySelector('img')).toHaveAttribute('loading', 'lazy');
  });
});

describe('AvatarGroup', () => {
  it('renders multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="Alice" />
        <Avatar name="Bob" />
      </AvatarGroup>,
    );
    expect(screen.getAllByRole('img')).toHaveLength(2);
  });

  it('shows overflow count', () => {
    const avatars = Array.from({ length: 7 }, (_, i) => (
      <Avatar key={i} name={`User ${i}`} />
    ));
    render(<AvatarGroup max={3}>{avatars}</AvatarGroup>);
    expect(screen.getByText('+4')).toBeInTheDocument();
  });

  it('respects max prop', () => {
    const avatars = Array.from({ length: 5 }, (_, i) => (
      <Avatar key={i} name={`User ${i}`} />
    ));
    render(<AvatarGroup max={2}>{avatars}</AvatarGroup>);
    // 2 visible + 1 overflow indicator
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});
