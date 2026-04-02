import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import type { Testimonial } from '@/types/database.types';

// Fallback hardcoded testimonials when DB not seeded yet
const FALLBACK_TESTIMONIALS: Omit<Testimonial, 'id' | 'created_at' | 'is_featured' | 'sort_order' | 'avatar_url'>[] = [
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

/** Student testimonial cards grid */
export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials.length > 0 ? testimonials : FALLBACK_TESTIMONIALS;

  return (
    <section className="py-20 bg-emerald-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Học Viên Nói Gì?"
          subtitle="Hơn 2000 học viên đã thay đổi sự nghiệp với LearningAI"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t) => (
            <Card key={t.name} glass className="p-6 flex flex-col gap-4">
              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed flex-1">"{t.content}"</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                {/* Avatar placeholder */}
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-bold shrink-0">
                  {getInitials(t.name)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}{t.company ? ` · ${t.company}` : ''}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
