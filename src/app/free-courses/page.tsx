import type { Metadata } from 'next';
import { getAllFreeResources } from '@/lib/db/free-resources';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Học AI Miễn Phí',
  description: 'Tổng hợp các khóa học AI miễn phí chất lượng từ Google, Microsoft, Harvard và hơn thế nữa.',
};

// Uses Supabase server client which accesses cookies (auth session)
export const dynamic = 'force-dynamic';

const PROVIDER_COLORS: Record<string, string> = {
  Google: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Microsoft: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'DeepLearning.AI': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  Harvard: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default async function FreeCoursesPage() {
  const resources = await getAllFreeResources();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Học AI Miễn Phí</h1>
        <div className="h-1 w-16 bg-emerald-400 rounded-full mb-4" />
        <p className="text-white/60 max-w-2xl">
          Danh sách các khóa học AI chất lượng cao, hoàn toàn miễn phí từ các tổ chức hàng đầu thế giới.
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-6 mb-10 p-4 rounded-xl border border-white/10 bg-white/5">
        <div className="text-sm text-white/60">
          <span className="text-emerald-400 font-bold text-lg mr-1">{resources.length || '50+'}</span>
          khóa học miễn phí
        </div>
        <div className="text-sm text-white/60">
          <span className="text-emerald-400 font-bold text-lg mr-1">4</span>
          nhà cung cấp uy tín
        </div>
        <div className="text-sm text-white/60">
          <span className="text-emerald-400 font-bold text-lg mr-1">🎓</span>
          Nhiều khoá có chứng chỉ
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {resources.map((r) => (
          <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer">
            <Card glass className="p-5 flex flex-col gap-3 h-full hover:border-emerald-500/40 transition-colors">
              {r.provider && (
                <span className={`self-start px-2.5 py-0.5 rounded-full text-xs font-medium border ${PROVIDER_COLORS[r.provider] ?? 'bg-white/10 text-white/60 border-white/10'}`}>
                  {r.provider}
                </span>
              )}
              <h3 className="text-white font-medium text-sm leading-snug flex-1">{r.title}</h3>
              <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/10">
                {r.duration && <span>⏱ {r.duration}</span>}
                {r.has_certificate
                  ? <span className="text-emerald-400">🎓 Chứng chỉ</span>
                  : <span>Không chứng chỉ</span>
                }
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
