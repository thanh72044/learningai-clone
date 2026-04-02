import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STATS = [
  { value: '2000+', label: 'Học Viên' },
  { value: '50+', label: 'Khóa Học' },
  { value: '98%', label: 'Hài Lòng' },
  { value: '24/7', label: 'Hỗ Trợ' },
];

/** Homepage hero — full-width dark bg with headline, stats, CTAs */
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-emerald-950">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8">
          🚀 Chương Trình AI Agent 2026 Đã Ra Mắt
        </span>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Làm Chủ AI,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-300">
            Dẫn Đầu
          </span>{' '}
          Tương Lai
        </h1>

        <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10">
          Khóa học AI thực chiến số 1 Việt Nam. Từ cơ bản đến Agentic AI —
          học xong là làm được ngay.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/courses">
            <Button variant="primary" size="lg">Khám Phá Khóa Học</Button>
          </Link>
          <Link href="/free-courses">
            <Button variant="outline" size="lg">Học Miễn Phí</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
