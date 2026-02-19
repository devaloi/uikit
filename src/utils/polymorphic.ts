import type { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

export type PolymorphicProps<E extends ElementType, P = object> = P &
  Omit<ComponentPropsWithRef<E>, keyof P | 'as'> & {
    as?: E;
    children?: ReactNode;
  };
