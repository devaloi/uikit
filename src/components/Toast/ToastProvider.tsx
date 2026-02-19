import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { Portal } from '../../utils/portal';
import { Toast, type ToastData, type ToastPosition, type ToastVariant } from './Toast';
import styles from './Toast.module.css';

interface ToastOptions {
  message: string;
  variant?: ToastVariant;
  duration?: number;
  dismissible?: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
  maxVisible?: number;
}

const positionClassMap: Record<ToastPosition, string> = {
  'top-right': styles.topRight,
  'top-left': styles.topLeft,
  'bottom-right': styles.bottomRight,
  'bottom-left': styles.bottomLeft,
};

let counter = 0;

export function ToastProvider({ children, position = 'top-right', maxVisible = 5 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<(ToastData & { createdAt: number })[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setInterval>>>(new Map());
  const progressRef = useRef<Map<string, number>>(new Map());
  const [, forceUpdate] = useState(0);
  const pausedRef = useRef<Set<string>>(new Set());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearInterval(timer);
      timersRef.current.delete(id);
    }
    progressRef.current.delete(id);
    pausedRef.current.delete(id);
  }, []);

  const startTimer = useCallback(
    (id: string, duration: number) => {
      const interval = 100;
      let elapsed = 0;
      progressRef.current.set(id, 100);
      const timer = setInterval(() => {
        if (pausedRef.current.has(id)) return;
        elapsed += interval;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        progressRef.current.set(id, remaining);
        forceUpdate((v) => v + 1);
        if (elapsed >= duration) {
          dismiss(id);
        }
      }, interval);
      timersRef.current.set(id, timer);
    },
    [dismiss],
  );

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = `toast-${++counter}`;
      const duration = options.duration ?? 5000;
      setToasts((prev) => [
        ...prev,
        {
          id,
          message: options.message,
          variant: options.variant ?? 'info',
          duration,
          dismissible: options.dismissible ?? true,
          createdAt: Date.now(),
        },
      ]);
      if (duration > 0) {
        startTimer(id, duration);
      }
      return id;
    },
    [startTimer],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);
  const visible = toasts.slice(-maxVisible);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Portal>
        <div
          className={`${styles.container} ${positionClassMap[position]}`}
          data-testid="toast-container"
        >
          {visible.map((t) => (
            <Toast
              key={t.id}
              variant={t.variant}
              dismissible={t.dismissible}
              onDismiss={() => dismiss(t.id)}
              progress={progressRef.current.get(t.id)}
              onMouseEnter={() => pausedRef.current.add(t.id)}
              onMouseLeave={() => pausedRef.current.delete(t.id)}
            >
              {t.message}
            </Toast>
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}

ToastProvider.displayName = 'ToastProvider';

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
}
