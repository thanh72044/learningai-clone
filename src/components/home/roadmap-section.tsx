import { SectionHeader } from '@/components/ui/section-header';

const LEVELS = [
  {
    code: 'L1',
    name: 'Cơ Bản',
    duration: '4-6 tuần',
    color: 'border-green-500 bg-green-500/10 text-green-400',
    dotColor: 'bg-green-500',
    courses: ['AI Foundation', 'Prompt Engineering', 'ChatGPT cho công việc'],
  },
  {
    code: 'L2',
    name: 'Trung Cấp',
    duration: '8-10 tuần',
    color: 'border-blue-500 bg-blue-500/10 text-blue-400',
    dotColor: 'bg-blue-500',
    courses: ['AI for Marketing', 'AI for Sales', 'Workflow Automation'],
  },
  {
    code: 'L3',
    name: 'Chuyên Sâu',
    duration: '12-16 tuần',
    color: 'border-orange-500 bg-orange-500/10 text-orange-400',
    dotColor: 'bg-orange-500',
    courses: ['Agentic AI', 'AI Workflows nâng cao', 'Xây dựng AI Solutions'],
  },
  {
    code: 'L4',
    name: 'Developer',
    duration: '16+ tuần',
    color: 'border-purple-500 bg-purple-500/10 text-purple-400',
    dotColor: 'bg-purple-500',
    courses: ['AI for Developers', 'Multi-Agent Systems', 'Production AI Apps'],
  },
];

/** L1–L4 learning roadmap with horizontal stepper */
export function RoadmapSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Lộ Trình Học AI"
          subtitle="Từ người mới đến AI Engineer — 4 cấp độ được thiết kế khoa học"
        />

        {/* Desktop: horizontal stepper */}
        <div className="hidden md:flex items-start gap-0 mb-8">
          {LEVELS.map((level, i) => (
            <div key={level.code} className="flex-1 flex items-start gap-0">
              {/* Card */}
              <div className={`flex-1 rounded-2xl border p-6 ${level.color}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold">{level.code}</span>
                  <div>
                    <p className="font-semibold text-white">{level.name}</p>
                    <p className="text-xs text-white/40">{level.duration}</p>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {level.courses.map((c) => (
                    <li key={c} className="text-sm text-white/70 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${level.dotColor}`} />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Arrow connector */}
              {i < LEVELS.length - 1 && (
                <div className="flex items-center self-center px-2 text-white/20 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical list */}
        <div className="md:hidden flex flex-col gap-4">
          {LEVELS.map((level) => (
            <div key={level.code} className={`rounded-2xl border p-5 ${level.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl font-bold">{level.code}</span>
                <div>
                  <p className="font-semibold text-white">{level.name}</p>
                  <p className="text-xs text-white/40">{level.duration}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {level.courses.map((c) => (
                  <li key={c} className="text-sm text-white/70 flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${level.dotColor}`} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
