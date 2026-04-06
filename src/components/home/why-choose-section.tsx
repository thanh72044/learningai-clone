'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';

const REASONS = [
  { icon: '🎯', title: 'Học Từ Chuyên Gia', desc: 'Giảng viên là AI practitioners với 5-10 năm kinh nghiệm thực tế tại các công ty lớn.' },
  { icon: '⚡', title: 'Thực Hành Ngay', desc: 'Mỗi bài học đều có project thực tế. Học xong là áp dụng được vào công việc ngay hôm đó.' },
  { icon: '🗺️', title: 'Lộ Trình Rõ Ràng', desc: 'Từ AI cơ bản đến Agentic AI — lộ trình 4 cấp độ được thiết kế bởi chuyên gia.' },
  { icon: '👥', title: 'Cộng Đồng Sôi Động', desc: '2000+ học viên trong cộng đồng Discord, hỗ trợ nhau 24/7 và cùng phát triển.' },
  { icon: '🏆', title: 'Chứng Chỉ Được Công Nhận', desc: 'Chứng chỉ hoàn thành được doanh nghiệp Việt Nam và quốc tế ghi nhận.' },
  { icon: '📱', title: 'Học Mọi Lúc, Mọi Nơi', desc: 'Truy cập mọi thiết bị, học theo tốc độ của bạn, không giới hạn thời gian.' },
];

// Reusable stagger variants
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** 6 value proposition cards with staggered scroll-triggered entrance */
export function WhyChooseSection() {
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
            title="Tại Sao Chọn LearningAI?"
            subtitle="Chúng tôi không chỉ dạy lý thuyết — chúng tôi giúp bạn làm chủ AI trong thực tế"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {REASONS.map((r) => (
            <motion.div key={r.title} variants={cardVariants}>
              <Card glass className="p-6 flex flex-col gap-3 h-full">
                <span className="text-4xl">{r.icon}</span>
                <h3 className="text-white font-semibold text-lg">{r.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{r.desc}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
