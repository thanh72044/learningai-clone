import { Variants } from 'framer-motion';

/**
 * Common animation variants for Framer Motion
 * Use with motion components: variants={fadeInVariants} initial="hidden" animate="visible"
 */

// Fade animations
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Slide animations
export const slideInLeftVariants: Variants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export const slideInRightVariants: Variants = {
  hidden: { x: 20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Scale animations
export const scaleInVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Stagger container (parent)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Stagger item (child of staggerContainer)
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Glow pulse (replaces animate-glow-pulse)
export const glowPulseVariants: Variants = {
  initial: { boxShadow: '0 0 0 rgba(16, 185, 129, 0)' },
  animate: {
    boxShadow: [
      '0 0 0 rgba(16, 185, 129, 0)',
      '0 0 20px rgba(16, 185, 129, 0.4)',
      '0 0 0 rgba(16, 185, 129, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Shimmer (replaces animate-shimmer)
export const shimmerVariants: Variants = {
  initial: { backgroundPosition: '200% center' },
  animate: {
    backgroundPosition: '-200% center',
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Float (replaces animate-float)
export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Page enter (for route transitions)
export const pageEnterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * USAGE NOTES:
 * 
 * 1. Use centralized variants for COMMON patterns (fadeIn, fadeUp, etc.)
 * 2. Use INLINE animations for COMPONENT-SPECIFIC tuning (unique durations, colors, sequences)
 * 
 * Example - Centralized (reusable):
 *   <motion.div variants={fadeInVariants} initial="hidden" animate="visible" />
 * 
 * Example - Inline (component-specific):
 *   <motion.span animate={{ boxShadow: [...] }} transition={{ duration: 2 }} />
 * 
 * Current pattern: Hero/CTA use inline for glow-pulse, shimmer, float because:
 * - Specific colors (emerald-500)
 * - Specific timing (2s glow, 3s shimmer)
 * - Not reused elsewhere
 * 
 * If these animations ARE reused, refactor to use centralized variants.
 */
