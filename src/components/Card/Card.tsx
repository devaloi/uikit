import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const paddingMap: Record<string, string> = {
  none: styles.paddingNone,
  sm: styles.paddingSm,
  md: styles.paddingMd,
  lg: styles.paddingLg,
};

const shadowMap: Record<string, string> = {
  none: styles.shadowNone,
  sm: styles.shadowSm,
  md: styles.shadowMd,
  lg: styles.shadowLg,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { padding = 'md', shadow = 'sm', hoverable = false, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        styles.card,
        paddingMap[padding],
        shadowMap[shadow],
        hoverable && styles.hoverable,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}) as CardComponent;

Card.displayName = 'Card';

export type CardHeaderProps = HTMLAttributes<HTMLDivElement>;

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.header, className)} {...rest}>
      {children}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';

export type CardBodyProps = HTMLAttributes<HTMLDivElement>;

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.body, className)} {...rest}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';

export type CardFooterProps = HTMLAttributes<HTMLDivElement>;

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn(styles.footer, className)} {...rest}>
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';

interface CardComponent
  extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

(Card as CardComponent).Header = CardHeader;
(Card as CardComponent).Body = CardBody;
(Card as CardComponent).Footer = CardFooter;
