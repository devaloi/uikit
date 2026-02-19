import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../utils/cn';
import styles from './Tabs.module.css';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs compound components must be used within <Tabs>');
  return ctx;
}

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { defaultValue, value, onChange, className, children, ...rest },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const baseId = useId();

  const activeTab = value !== undefined ? value : internalValue;
  const setActiveTab = useCallback(
    (v: string) => {
      if (value === undefined) setInternalValue(v);
      onChange?.(v);
    },
    [value, onChange],
  );

  const ctx = useMemo(() => ({ activeTab, setActiveTab, baseId }), [activeTab, setActiveTab, baseId]);

  return (
    <TabsContext.Provider value={ctx}>
      <div ref={ref} className={cn(styles.tabs, className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}) as TabsComponent;

Tabs.displayName = 'Tabs';

export interface TabListProps extends HTMLAttributes<HTMLDivElement> {}

const TabList = forwardRef<HTMLDivElement, TabListProps>(function TabList(
  { className, children, ...rest },
  ref,
) {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const list = listRef.current;
    if (!list) return;

    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('button[role="tab"]:not(:disabled)'),
    );
    const current = tabs.findIndex((t) => t === document.activeElement);
    if (current === -1) return;

    let next = current;
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        next = (current + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        e.preventDefault();
        next = (current - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        e.preventDefault();
        next = 0;
        break;
      case 'End':
        e.preventDefault();
        next = tabs.length - 1;
        break;
      default:
        return;
    }
    tabs[next].focus();
  }, []);

  return (
    <div
      ref={(node) => {
        (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      role="tablist"
      className={cn(styles.list, className)}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </div>
  );
});

TabList.displayName = 'TabList';

export interface TabProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, disabled, className, children, ...rest },
  ref,
) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      ref={ref}
      role="tab"
      type="button"
      id={`${baseId}-tab-${value}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={cn(styles.tab, isActive && styles.tabActive, className)}
      onClick={() => !disabled && setActiveTab(value)}
      {...rest}
    >
      {children}
    </button>
  );
});

Tab.displayName = 'Tab';

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value, className, children, ...rest },
  ref,
) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn(styles.panel, className)}
      {...rest}
    >
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';

interface TabsComponent extends React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>> {
  List: typeof TabList;
  Tab: typeof Tab;
  Panel: typeof TabPanel;
}

(Tabs as TabsComponent).List = TabList;
(Tabs as TabsComponent).Tab = Tab;
(Tabs as TabsComponent).Panel = TabPanel;
