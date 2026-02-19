import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Tooltip.module.css';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: ReactElement;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(function Tooltip(
  { content, placement = 'top', delay = 200, children, className, ...rest },
  ref,
) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const tooltipId = useId();

  const show = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    },
    [hide],
  );

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        'aria-describedby': visible ? tooltipId : undefined,
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        onKeyDown: handleKeyDown,
      })
    : children;

  return (
    <div ref={ref} className={cn(styles.wrapper, className)} {...rest}>
      {trigger}
      {visible && (
        <div id={tooltipId} role="tooltip" className={cn(styles.tooltip, styles[placement])}>
          {content}
          <span className={styles.arrow} />
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
