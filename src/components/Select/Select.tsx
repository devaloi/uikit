import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Select.module.css';

export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T> {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  searchable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

function SelectInner<T>(
  {
    options,
    value,
    onChange,
    placeholder = 'Select…',
    searchable = false,
    size = 'md',
    disabled = false,
    className,
  }: SelectProps<T>,
  ref: React.Ref<HTMLButtonElement>,
) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  const listboxId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = searchable && search
    ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  const enabledOptions = filtered.filter((o) => !o.disabled);

  const close = useCallback(() => {
    setOpen(false);
    setSearch('');
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
  }, [open, searchable]);

  const selectOption = useCallback(
    (opt: SelectOption<T>) => {
      if (opt.disabled) return;
      onChange(opt.value);
      close();
    },
    [onChange, close],
  );

  const handleTriggerKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    handleListKeyDown(e);
  };

  const handleListKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((prev) => {
          const nextIdx = enabledOptions.findIndex(
            (o, i) => i > (prev === -1 ? -1 : filtered.indexOf(enabledOptions[prev] ?? filtered[0])) && !o.disabled,
          );
          return nextIdx === -1 ? 0 : nextIdx;
        });
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((prev) => (prev <= 0 ? enabledOptions.length - 1 : prev - 1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && enabledOptions[activeIndex]) {
          selectOption(enabledOptions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
    }
  };

  const activeOptionId = activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper, styles[size], className)}>
      <button
        ref={ref}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={activeOptionId}
        className={styles.trigger}
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className={!selected ? styles.placeholder : undefined}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={cn(styles.chevron, open && styles.chevronOpen)}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          className={styles.dropdown}
          onKeyDown={handleListKeyDown}
        >
          {searchable && (
            <input
              ref={searchRef}
              className={styles.searchInput}
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleListKeyDown}
              placeholder="Search…"
              aria-label="Search options"
            />
          )}
          {filtered.length === 0 ? (
            <div className={styles.noResults}>No results</div>
          ) : (
            filtered.map((opt, i) => {
              const enabledIdx = enabledOptions.indexOf(opt);
              return (
                <div
                  key={i}
                  id={`${listboxId}-option-${enabledIdx}`}
                  role="option"
                  aria-selected={opt.value === value}
                  aria-disabled={opt.disabled || undefined}
                  className={cn(
                    styles.option,
                    enabledIdx === activeIndex && styles.optionActive,
                    opt.value === value && styles.optionSelected,
                    opt.disabled && styles.optionDisabled,
                  )}
                  onClick={() => selectOption(opt)}
                >
                  {opt.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export const Select = forwardRef(SelectInner) as <T>(
  props: SelectProps<T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement | null;

(Select as { displayName?: string }).displayName = 'Select';
