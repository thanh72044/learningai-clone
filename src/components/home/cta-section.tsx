'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';

/** Bottom CTA with parallax scroll effect on the background glow */
export function CtaSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Parallax: glow moves up as user scrolls through the section
  const glowY = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);

  return (
    <section ref={ref} className="py-20 bg-emerald-950/50 relative overflow-hidden">
      {/* Parallax background glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: glowY }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/8 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-emerald-950/80 p-10 md:p-16">
            {/* Float animation for rocket emoji */}
            <motion.span
              className="text-5xl mb-6 block inline-block"
              animate={{ y: [-10, 10, -10] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              🚀
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sẵn Sàng Làm Chủ AI?
            </h2>
            <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
              Gia nhập cộng đồng 2000+ học viên đang thay đổi sự nghiệp với AI.
              Bắt đầu hành trình của bạn ngay hôm nay.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/auth/signup">
                <Button variant="secondary" size="lg">Đăng Ký Ngay — Miễn Phí</Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg">Xem Khóa Học</Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
              <span>✓ Không cần thẻ tín dụng</span>
              <span>✓ Học thử miễn phí</span>
              <span>✓ Hủy bất cứ lúc nào</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
