import { cn } from '@/lib/utils';
import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

const typographyVariants = cva('font-medium', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      'heading-xl': 'text-2xl/[30px] font-bold',
      'heading-l': 'text-lg/[23px] font-bold',
      'heading-m': 'text-[15px]/[19px] font-bold',
      'heading-s': 'text-[12px]/[15px] tracking-[2.4px] font-bold',
      'body-l': 'text-[13px]/[23px] font-medium',
      'body-m': 'text-[12px]/[15px] font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'body-m',
  },
});

export type TypographyProps = {
  size: 'heading-xl' | 'heading-l' | 'heading-m' | 'heading-s' | 'body-l' | 'body-m';
  className?: string;
  children: React.ReactNode;
};

const Typography = React.forwardRef<
  HTMLParagraphElement | HTMLHeadingElement | HTMLSpanElement,
  TypographyProps
>(({ className, size, ...props }, ref) => {
  const compMap = {
    'heading-xl': 'h1',
    'heading-l': 'h2',
    'heading-m': 'h3',
    'heading-s': 'h4',
    'body-l': 'p',
    'body-m': 'p',
  };

  const Comp = compMap[size] || Slot;
  return <Comp className={cn(typographyVariants({ size, className }))} ref={ref} {...props} />;
});

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
