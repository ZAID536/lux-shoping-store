import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-brand-black text-white hover:bg-brand-pink hover:text-brand-black',
  secondary:
    'bg-brand-pink text-brand-black hover:bg-brand-black hover:text-white',
  outline:
    'bg-transparent border border-brand-black text-brand-black hover:bg-brand-black hover:text-white',
  ghost: 'bg-transparent text-brand-black hover:bg-brand-gray',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-9 py-4 text-sm',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 uppercase tracking-widest2 font-body font-medium transition-colors duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
