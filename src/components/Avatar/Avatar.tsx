import { forwardRef, useState, type HTMLAttributes, type ReactElement } from 'react';
import { cn } from '../../utils/cn';
import styles from './Avatar.module.css';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'square';
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function hashColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 50%, 45%)`;
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, name = '', size = 'md', shape = 'circle', className, ...rest },
  ref,
) {
  const [imgError, setImgError] = useState(false);
  const showImage = src && !imgError;
  const initials = getInitials(name);
  const bgStyle = !showImage && name ? { backgroundColor: hashColor(name) } : undefined;

  return (
    <span
      ref={ref}
      className={cn(styles.avatar, styles[size], styles[shape], className)}
      style={bgStyle}
      role="img"
      aria-label={name || undefined}
      {...rest}
    >
      {showImage ? (
        <img className={styles.image} src={src} alt={name} loading="lazy" onError={() => setImgError(true)} />
      ) : (
        initials
      )}
    </span>
  );
});

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
  children: ReactElement<AvatarProps>[];
}

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { max = 5, size = 'md', children, className, ...rest },
  ref,
) {
  const items = Array.isArray(children) ? children : [children];
  const visible = items.slice(0, max);
  const overflow = items.length - max;

  return (
    <div ref={ref} className={cn(styles.group, className)} {...rest}>
      {overflow > 0 && (
        <span className={cn(styles.avatar, styles[size], styles.circle, styles.overflow)}>+{overflow}</span>
      )}
      {[...visible].reverse().map((child, i) => (
        <span key={i}>{child}</span>
      ))}
    </div>
  );
});

AvatarGroup.displayName = 'AvatarGroup';
