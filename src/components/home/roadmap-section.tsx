'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';

const STEPS = [
  {
    step: '01',
    icon: '🔍',
    title: 'Chọn Khóa Học',
    desc: 'Khám phá thư viện khóa học được phân cấp rõ ràng. Từ AI cơ bản đến Agentic AI — chọn lộ trình phù hợp với mục tiêu của bạn.',
  },
  {
    step: '02',
    icon: '🎓',
    title: 'Học & Thực Hành',
    desc: 'Học qua video thực chiến, bài tập có hướng dẫn và dự án thực tế. Cộng đồng hỗ trợ bạn 24/7 trong suốt quá trình.',
  },
  {
    step: '03',
    icon: '🚀',
    title: 'Áp Dụng & Bứt Phá',
    desc: 'Nhận chứng chỉ được công nhận và áp dụng kiến thức vào công việc ngay. Tăng năng suất, thăng tiến sự nghiệp với AI.',
  },
];

/** "How It Works" 3-step vertical timeline with scroll-triggered animations */
export function RoadmapSection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader
            title="Bắt Đầu Chỉ 3 Bước"
            subtitle="Hành trình làm chủ AI của bạn đơn giản hơn bạn nghĩ"
          />
        </motion.div>

        <div className="relative flex flex-col gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              className="relative flex gap-6 pb-12 last:pb-0"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.15, ease: 'easeOut' }}
            >
              {/* Left: number circle + connecting line */}
              <div className="flex flex-col items-center shrink-0">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold text-sm z-10">
                  {step.step}
                </div>
                {/* Connecting line — hidden on last step */}
                {i < STEPS.length - 1 && (
                  <div className="w-px flex-1 mt-2 bg-emerald-500/20" />
                )}
              </div>

              {/* Right: content card */}
              <div className="flex-1 pt-2 pb-4">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/60 p-6 hover:border-emerald-500/40 transition-colors">
                  <span className="text-3xl mb-3 block">{step.icon}</span>
                  <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
