import { forwardRef, type ElementType, type ReactNode } from 'react';
import type { PolymorphicProps } from '../../utils/polymorphic';
import { cn } from '../../utils/cn';
import styles from './Button.module.css';

export interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export type ButtonProps<E extends ElementType = 'button'> = PolymorphicProps<E, ButtonBaseProps>;

type ButtonComponent = <E extends ElementType = 'button'>(props: ButtonProps<E>) => ReactNode;

export const Button: ButtonComponent = forwardRef(function Button<
  E extends ElementType = 'button',
>(
  {
    as,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    className,
    children,
    disabled,
    ...rest
  }: ButtonProps<E>,
  ref: React.Ref<Element>,
) {
  const Component = as ?? 'button';
  const isDisabled = disabled || loading;

  return (
    <Component
      ref={ref}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        fullWidth && styles.fullWidth,
        iconPosition === 'right' && styles.iconRight,
        className,
      )}
      disabled={Component === 'button' ? isDisabled : undefined}
      aria-disabled={isDisabled || undefined}
      aria-busy={loading || undefined}
      {...rest}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {children && <span>{children}</span>}
      {loading && (
        <span className={styles.loadingSpinner} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ animation: 'spin 0.6s linear infinite' }}
          >
            <circle
              cx="8"
              cy="8"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="28"
              strokeDashoffset="20"
            />
          </svg>
        </span>
      )}
    </Component>
  );
}) as ButtonComponent;

(Button as { displayName?: string }).displayName = 'Button';
