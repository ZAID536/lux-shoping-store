import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'pink' | 'black' | 'outline';
  className?: string;
}

const variantStyles: Record<string, string> = {
  pink: 'bg-brand-pink text-brand-black',
  black: 'bg-brand-black text-white',
  outline: 'bg-white/90 text-brand-black border border-brand-black/10',
};

export default function Badge({ children, variant = 'black', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-[10px] font-body font-semibold uppercase tracking-widest2',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
