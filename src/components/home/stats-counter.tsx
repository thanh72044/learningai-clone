'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  duration?: number; // ms
}

/**
 * Animated count-up number that triggers when scrolled into view.
 * Resets and re-counts each time the element enters the viewport.
 */
export function StatsCounter({ target, suffix = '', duration = 1800 }: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: '-50px' });
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isInView) {
      // Reset when out of view so it re-animates on next entry
      setCount(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    intervalRef.current = setInterval(() => {
      current += 1;
      // Ease-out: slow down near end
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (current >= steps) {
        setCount(target);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, stepDuration);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}
