import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

const defaultIcons: Record<AlertVariant, string> = {
  info: 'ℹ️',
  success: '✓',
  warning: '⚠',
  error: '✕',
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, dismissible = false, onDismiss, icon, className, children, ...rest },
  ref,
) {
  const alertRole = variant === 'error' || variant === 'warning' ? 'alert' : 'status';

  return (
    <div ref={ref} role={alertRole} className={cn(styles.alert, styles[variant], className)} {...rest}>
      <span className={styles.icon} aria-hidden="true">
        {icon ?? defaultIcons[variant]}
      </span>
      <div className={styles.content}>
        {title && <div className={styles.title}>{title}</div>}
        <div>{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className={styles.dismissButton}
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          ✕
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';
