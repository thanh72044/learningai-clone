import { cn } from '@/lib/utils/cn';
import type { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean; /** Semi-transparent glass card variant */
}

/** Base card component with emerald dark theme */
export function Card({ glass = false, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border transition-colors duration-200',
        glass
          ? 'bg-white/5 border-white/10 hover:border-emerald-500/30'
          : 'bg-emerald-900/30 border-emerald-800/50 hover:border-emerald-500/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
