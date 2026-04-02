import Link from 'next/link';
import { SectionHeader } from '@/components/ui/section-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { FreeResource } from '@/types/database.types';

// Fallback data when DB not seeded
const FALLBACK: Omit<FreeResource, 'id' | 'created_at' | 'is_featured' | 'sort_order'>[] = [
  { title: 'Generative AI Learning Path', provider: 'Google', url: 'https://cloud.google.com/learn/training/machinelearning-ai', duration: '5-10 giờ', has_certificate: true },
  { title: '18 Free AI Courses', provider: 'Microsoft', url: 'https://learn.microsoft.com/en-us/ai/', duration: '20+ giờ', has_certificate: false },
  { title: 'AI For Everyone', provider: 'DeepLearning.AI', url: 'https://www.coursera.org/learn/ai-for-everyone', duration: '6 giờ', has_certificate: true },
  { title: "CS50's Introduction to AI with Python", provider: 'Harvard', url: 'https://cs50.harvard.edu/ai/2024/', duration: '25 giờ', has_certificate: true },
  { title: '5-Day Gen AI Intensive', provider: 'Google', url: 'https://rsvp.withgoogle.com/events/google-generativeai-intensive', duration: '5 ngày', has_certificate: true },
  { title: 'Generative AI for Everyone', provider: 'DeepLearning.AI', url: 'https://www.deeplearning.ai/courses/generative-ai-for-everyone/', duration: '5 giờ', has_certificate: true },
];

const PROVIDER_COLORS: Record<string, string> = {
  Google: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Microsoft: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'DeepLearning.AI': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Harvard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

interface FreeCoursesPreviewSectionProps {
  resources: FreeResource[];
}

/** Preview of 6 free external resources with link to full page */
export function FreeCoursesPreviewSection({ resources }: FreeCoursesPreviewSectionProps) {
  const items = resources.length > 0 ? resources : FALLBACK;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Học AI Miễn Phí"
          subtitle="Tổng hợp các khóa học AI miễn phí chất lượng từ Google, Microsoft, Harvard và hơn thế nữa"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {items.slice(0, 6).map((r) => (
            <a key={r.title} href={r.url} target="_blank" rel="noopener noreferrer">
              <Card glass className="p-5 flex flex-col gap-3 h-full hover:border-emerald-500/40 transition-colors cursor-pointer">
                {/* Provider badge */}
                {r.provider && (
                  <span className={`self-start px-2.5 py-0.5 rounded-full text-xs font-medium border ${PROVIDER_COLORS[r.provider] ?? 'bg-white/10 text-white/60 border-white/10'}`}>
                    {r.provider}
                  </span>
                )}
                <h3 className="text-white font-medium text-sm leading-snug flex-1">{r.title}</h3>
                <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/10">
                  {r.duration && <span>⏱ {r.duration}</span>}
                  {r.has_certificate && <span className="text-emerald-400">🎓 Chứng chỉ</span>}
                </div>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link href="/free-courses">
            <Button variant="outline" size="lg">Xem Tất Cả Khóa Miễn Phí</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
