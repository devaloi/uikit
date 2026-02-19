import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Toast.module.css';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  dismissible?: boolean;
  onDismiss?: () => void;
  progress?: number;
}

const variantIcons: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = 'info', dismissible = true, onDismiss, progress, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(styles.toast, styles[variant], className)}
      {...rest}
    >
      <span className={styles.icon} aria-hidden="true">
        {variantIcons[variant]}
      </span>
      <div className={styles.content}>{children}</div>
      {dismissible && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss notification"
        >
          ✕
        </button>
      )}
      {progress !== undefined && (
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      )}
    </div>
  );
});

Toast.displayName = 'Toast';
