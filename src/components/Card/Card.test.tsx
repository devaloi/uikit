import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders with header, body, footer', () => {
    render(
      <Card padding="none">
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies padding class', () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('paddingLg');
  });

  it('applies shadow class', () => {
    const { container } = render(<Card shadow="md">Content</Card>);
    expect(container.firstChild).toHaveClass('shadowMd');
  });

  it('applies hoverable class', () => {
    const { container } = render(<Card hoverable>Content</Card>);
    expect(container.firstChild).toHaveClass('hoverable');
  });

  it('renders without slots', () => {
    render(<Card>Simple content</Card>);
    expect(screen.getByText('Simple content')).toBeInTheDocument();
  });

  it('renders only body slot', () => {
    render(
      <Card padding="none">
        <Card.Body>Only body</Card.Body>
      </Card>,
    );
    expect(screen.getByText('Only body')).toBeInTheDocument();
  });

  it('has header class on header slot', () => {
    render(
      <Card padding="none">
        <Card.Header data-testid="header">H</Card.Header>
      </Card>,
    );
    expect(screen.getByTestId('header')).toHaveClass('header');
  });

  it('has footer class on footer slot', () => {
    render(
      <Card padding="none">
        <Card.Footer data-testid="footer">F</Card.Footer>
      </Card>,
    );
    expect(screen.getByTestId('footer')).toHaveClass('footer');
  });
});
