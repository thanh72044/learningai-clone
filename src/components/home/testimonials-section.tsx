'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import type { Testimonial } from '@/types/database.types';

const FALLBACK: Omit<Testimonial, 'id' | 'created_at' | 'is_featured' | 'sort_order' | 'avatar_url'>[] = [
  { name: 'Nguyễn Hoàng Lâm Duy', role: 'AI Marketing Specialist', company: 'StartupVN', content: 'Khóa học thực chiến, áp dụng được ngay vào công việc. Tôi đã tăng năng suất 3x sau 1 tháng học.' },
  { name: 'Trần Bình Tường', role: 'Sales Executive', company: 'SIHUB', content: 'Nhờ LearningAI, tôi đã xây dựng được AI agent tự động follow-up khách hàng, doanh số tăng 40%.' },
  { name: 'Yumi Tran', role: 'Content Creator', company: 'Freelancer', content: 'Học xong là làm được luôn! Giảng viên nhiệt tình, cộng đồng hỗ trợ tuyệt vời.' },
  { name: 'Hà Ngọc Bảo Phúc', role: 'Student', company: 'AIOV Institute', content: 'Lộ trình học rõ ràng từ cơ bản đến nâng cao. Tôi từ zero đến tự build AI agent chỉ trong 2 tháng.' },
  { name: 'Pão Báo', role: 'Marketing Manager', company: 'DIGISO', content: 'Đầu tư xứng đáng nhất trong năm 2025. ROI từ khóa học này gấp 10 lần học phí.' },
  { name: 'Tuyết Lan', role: 'Marketing Specialist', company: 'Startup', content: 'Community của LearningAI rất chất lượng. Được hỗ trợ 24/7, hỏi là có người trả lời ngay.' },
];

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function getInitials(name: string) {
  return name.split(' ').slice(-2).map((n) => n[0]).join('').toUpperCase();
}

const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/** Auto-sliding testimonial carousel — 4s interval, pauses on hover */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK;
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
  }, [items.length]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    startInterval();
    return stopInterval;
  }, [startInterval, stopInterval]);

  // Visible cards: 1 on mobile, 3 on desktop (slice from currentIndex)
  const visibleCount = 3;
  const visibleItems = Array.from({ length: visibleCount }, (_, i) =>
    items[(currentIndex + i) % items.length]
  );

  return (
    <section className="py-20 bg-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader
            title="Học Viên Nói Gì?"
            subtitle="Hơn 2000 học viên đã thay đổi sự nghiệp với LearningAI"
          />
        </motion.div>

        {/* Carousel — pause on hover */}
        <div
          onMouseEnter={stopInterval}
          onMouseLeave={startInterval}
          className="overflow-hidden"
        >
          {/* Mobile: single card */}
          <div className="sm:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <TestimonialCard item={items[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Desktop: 3 cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="hidden sm:grid grid-cols-3 gap-6"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {visibleItems.map((item, i) => (
                <TestimonialCard key={`${item.name}-${i}`} item={item} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? 'bg-emerald-400 w-6'
                  : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Single testimonial card */
function TestimonialCard({ item }: { item: typeof FALLBACK[number] }) {
  return (
    <Card glass className="p-6 flex flex-col gap-4 h-full">
      <p className="text-white/70 text-sm leading-relaxed flex-1">"{item.content}"</p>
      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
          {getInitials(item.name)}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{item.name}</p>
          <p className="text-white/40 text-xs">{item.role}{item.company ? ` · ${item.company}` : ''}</p>
        </div>
      </div>
    </Card>
  );
}
