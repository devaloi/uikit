import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Portal } from './portal';

describe('Portal', () => {
  it('renders children into document.body', () => {
    render(
      <Portal>
        <div data-testid="portal-content">Hello</div>
      </Portal>,
    );
    expect(screen.getByTestId('portal-content')).toBeInTheDocument();
  });

  it('renders into custom container', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      <Portal container={container}>
        <div data-testid="custom-portal">Custom</div>
      </Portal>,
    );
    expect(container.querySelector('[data-testid="custom-portal"]')).toBeTruthy();
    document.body.removeChild(container);
  });
});
