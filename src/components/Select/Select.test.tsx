import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={options} value={null} onChange={() => {}} placeholder="Pick a fruit" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Pick a fruit');
  });

  it('shows selected value label', () => {
    render(<Select options={options} value="banana" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
  });

  it('opens dropdown on click', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value={null} onChange={() => {}} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('selects an option on click', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value={null} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(onChange).toHaveBeenCalledWith('cherry');
  });

  it('closes on escape', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value={null} onChange={() => {}} />);
    await user.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('navigates with keyboard', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select options={options} value={null} onChange={onChange} />);
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    await user.keyboard('{ArrowDown}{ArrowDown}{Enter}');
    expect(onChange).toHaveBeenCalled();
  });

  it('filters options when searchable', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value={null} onChange={() => {}} searchable />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Search options'), 'ban');
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  it('shows no results when search has no matches', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value={null} onChange={() => {}} searchable />);
    await user.click(screen.getByRole('combobox'));
    await user.type(screen.getByLabelText('Search options'), 'xyz');
    expect(screen.getByText('No results')).toBeInTheDocument();
  });

  it('does not select disabled option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const opts = [
      { value: 'a', label: 'A' },
      { value: 'b', label: 'B', disabled: true },
    ];
    render(<Select options={opts} value={null} onChange={onChange} />);
    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: 'B' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-expanded correctly', async () => {
    const user = userEvent.setup();
    render(<Select options={options} value={null} onChange={() => {}} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('is disabled when disabled prop set', () => {
    render(<Select options={options} value={null} onChange={() => {}} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
