'use client';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra reveal-delay-N class e.g. "reveal-delay-2" */
  delay?: string;
}

/**
 * Wraps any content in a scroll-reveal container.
 * Adds `.reveal` class; JS intersection observer adds `.visible` on enter.
 */
export function Reveal({ children, className = '', delay = '' }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`.trim()}>
      {children}
    </div>
  );
}
