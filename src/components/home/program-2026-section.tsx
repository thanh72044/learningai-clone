'use client';

import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MODULES = [
  {
    id: 'M1',
    title: 'Trợ Lý AI Cá Nhân Thông Minh',
    description: 'Xây dựng AI assistant cá nhân hóa, tự động hóa tác vụ hàng ngày và tăng năng suất 3-5x.',
    price: '2.990.000 ₫',
    originalPrice: '4.990.000 ₫',
    features: ['Prompt Engineering nâng cao', 'Tích hợp ChatGPT, Claude, Gemini', 'Workflow automation cơ bản'],
    color: 'from-emerald-500/20 to-emerald-600/10',
    badge: 'Cơ Bản',
  },
  {
    id: 'M2',
    title: 'AI Agent Vận Hành Doanh Nghiệp',
    description: 'Triển khai AI agents cho sales, marketing, và customer service — chạy 24/7 không cần nhân sự.',
    price: '3.490.000 ₫',
    originalPrice: '5.990.000 ₫',
    features: ['Xây dựng AI Sales Agent', 'Marketing automation AI', 'Customer service chatbot'],
    color: 'from-blue-500/20 to-blue-600/10',
    badge: 'Phổ Biến',
  },
  {
    id: 'M3',
    title: 'Hệ Thống Multi-Agent Tự Vận Hành',
    description: 'Thiết kế và triển khai hệ thống nhiều AI agents phối hợp tự vận hành toàn bộ quy trình.',
    price: '3.490.000 ₫',
    originalPrice: '5.990.000 ₫',
    features: ['Multi-agent orchestration', 'LangGraph & AutoGen', 'Production deployment'],
    color: 'from-purple-500/20 to-purple-600/10',
    badge: 'Nâng Cao',
  },
];

// Stagger variants for module cards
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** 2026 AI Agent Program — 3 modules with combo offer, scroll-triggered animations */
export function Program2026Section() {
  return (
    <section className="py-20 bg-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-semibold mb-4">
            🔥 MỚI 2026
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Chương Trình AI Agent 2026
          </h2>
          <div className="h-1 w-16 bg-emerald-400 rounded-full mx-auto mb-4" />
          <p className="text-white/60 max-w-xl mx-auto">
            Lộ trình 3 giai đoạn từ AI cơ bản đến hệ thống Multi-Agent tự vận hành
          </p>
        </motion.div>

        {/* Module cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {MODULES.map((mod) => (
            <motion.div key={mod.id} variants={cardVariants}>
              <Card className={`p-6 flex flex-col gap-4 h-full bg-gradient-to-br ${mod.color}`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider">{mod.id}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/70 text-xs">{mod.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">{mod.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed flex-1">{mod.description}</p>
                <ul className="space-y-1.5">
                  {mod.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                      <span className="text-emerald-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-emerald-400 font-bold text-xl">{mod.price}</span>
                  <span className="text-white/30 text-sm line-through ml-2">{mod.originalPrice}</span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Combo offer */}
        <motion.div
          className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <p className="text-yellow-400 font-semibold text-sm mb-1">🎁 COMBO 3 MODULE — TIẾT KIỆM 4.000.000 ₫</p>
            <p className="text-white/60 text-sm">Học toàn bộ lộ trình AI Agent 2026 với mức giá tốt nhất</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <p className="text-white/30 text-sm line-through">9.970.000 ₫</p>
              <p className="text-yellow-400 font-bold text-2xl">5.990.000 ₫</p>
            </div>
            <Link href="/courses">
              <Button variant="secondary" size="md">Đăng Ký Ngay</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
