import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('renders an input element', () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText('Type here')).toBeInTheDocument();
  });

  it('updates value on typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Input value="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows clear button when clearable and has value', () => {
    render(<Input clearable value="hello" onChange={() => {}} />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('does not show clear button when empty', () => {
    render(<Input clearable value="" onChange={() => {}} />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Input clearable value="hello" onClear={onClear} onChange={() => {}} />);
    await user.click(screen.getByLabelText('Clear input'));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('shows error message', () => {
    render(<Input error="Required field" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Required field');
  });

  it('sets aria-invalid when error present', () => {
    render(<Input error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('links error to input via aria-describedby', () => {
    render(<Input error="Required" />);
    const input = screen.getByRole('textbox');
    const errorId = input.getAttribute('aria-describedby');
    expect(errorId).toBeTruthy();
    expect(document.getElementById(errorId as string)).toHaveTextContent('Required');
  });

  it('is disabled when disabled prop set', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders prefix', () => {
    render(<Input prefix={<span data-testid="prefix">$</span>} />);
    expect(screen.getByTestId('prefix')).toBeInTheDocument();
  });

  it('renders suffix', () => {
    render(<Input suffix={<span data-testid="suffix">.com</span>} />);
    expect(screen.getByTestId('suffix')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Input size="lg" />);
    expect(container.firstChild).toHaveClass('lg');
  });
});
