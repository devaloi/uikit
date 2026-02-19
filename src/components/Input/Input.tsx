import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Input.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearable?: boolean;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', error, prefix, suffix, clearable = false, onClear, className, disabled, value, ...rest },
  ref,
) {
  const errorId = useId();
  const hasValue = value !== undefined && value !== '';

  return (
    <div
      className={cn(
        styles.wrapper,
        styles[size],
        error && styles.error,
        disabled && styles.disabled,
        className,
      )}
    >
      <div className={styles.inputWrapper}>
        {prefix && <span className={styles.prefix}>{prefix}</span>}
        <input
          ref={ref}
          className={styles.input}
          disabled={disabled}
          value={value}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          {...rest}
        />
        {clearable && hasValue && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
            aria-label="Clear input"
            tabIndex={-1}
          >
            ✕
          </button>
        )}
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
      {error && (
        <span id={errorId} className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
