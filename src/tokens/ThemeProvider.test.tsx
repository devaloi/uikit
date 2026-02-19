import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider, useTheme } from './ThemeProvider';

function ThemeDisplay() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>toggle</button>
    </div>
  );
}

describe('ThemeProvider', () => {
  it('provides light theme by default', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });

  it('provides dark theme when specified', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('sets data-theme attribute on container', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeDisplay />
      </ThemeProvider>,
    );
    const container = screen.getByTestId('theme').closest('[data-theme]');
    expect(container).toHaveAttribute('data-theme', 'dark');
  });

  it('toggles theme', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeDisplay />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    await user.click(screen.getByText('toggle'));
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('throws when useTheme is used outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<ThemeDisplay />)).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});
