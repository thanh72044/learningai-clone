'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { StatsCounter } from '@/components/home/stats-counter';

// Reusable stagger variant for entrance animations
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Gradient shift animation (replaces Tailwind animate-gradient-shift)
const gradientShiftVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

const STATS = [
  { target: 2000, suffix: '+', label: 'Học Viên' },
  { target: 50, suffix: '+', label: 'Khóa Học' },
  { target: 98, suffix: '%', label: 'Hài Lòng' },
  { target: 24, suffix: '/7', label: 'Hỗ Trợ' },
];

/** Homepage hero — animated gradient bg, floating elements, staggered text, count-up stats */
export function HeroSection() {
  return (
    <motion.section
      className="relative min-h-[85vh] flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(110deg, #0a0b0d 40%, #0d1117 50%, #111827 60%)',
        backgroundSize: '200% 200%',
      }}
      variants={gradientShiftVariants}
      animate="animate"
    >
      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/6 w-48 h-48 bg-emerald-300/5 rounded-full blur-2xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge with glow pulse */}
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
            animate={{
              boxShadow: [
                '0 0 0 rgba(16, 185, 129, 0)',
                '0 0 20px rgba(16, 185, 129, 0.4)',
                '0 0 0 rgba(16, 185, 129, 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🚀 Chương Trình AI Agent 2026 Đã Ra Mắt
          </motion.span>

          {/* Headline with shimmer effect */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Làm Chủ AI,{' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 bg-clip-text text-transparent"
              style={{ backgroundSize: '200% auto' }}
              animate={{ backgroundPosition: ['200% center', '-200% center'] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              Dẫn Đầu
            </motion.span>{' '}
            Tương Lai
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10"
          >
            Khóa học AI thực chiến số 1 Việt Nam. Từ cơ bản đến Agentic AI —
            học xong là làm được ngay.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link href="/courses">
              <Button variant="primary" size="lg">Khám Phá Khóa Học</Button>
            </Link>
            <Link href="/free-courses">
              <Button variant="outline" size="lg">Học Miễn Phí</Button>
            </Link>
          </motion.div>

          {/* Animated stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">
                  <StatsCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
