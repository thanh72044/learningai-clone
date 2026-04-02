import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

async function getAdminStats() {
  const supabase = await createClient();
  const [{ count: courseCount }, { count: lessonCount }, { count: userCount }] = await Promise.all([
    supabase.from('courses').select('*', { count: 'exact', head: true }),
    supabase.from('lessons').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ]);
  return { courseCount: courseCount ?? 0, lessonCount: lessonCount ?? 0, userCount: userCount ?? 0 };
}

export default async function AdminDashboardPage() {
  const { courseCount, lessonCount, userCount } = await getAdminStats();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Khóa Học', value: courseCount, href: '/admin/courses', icon: '📚', color: 'text-emerald-400' },
          { label: 'Bài Học', value: lessonCount, href: '/admin/lessons', icon: '🎬', color: 'text-blue-400' },
          { label: 'Người Dùng', value: userCount, href: '#', icon: '👥', color: 'text-purple-400' },
        ].map((s) => (
          <Link key={s.label} href={s.href}>
            <div className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors p-5 flex items-center gap-4">
              <span className="text-3xl">{s.icon}</span>
              <div>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                <p className="text-white/50 text-sm">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Thao Tác Nhanh</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/courses/new">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium transition-colors">
              + Thêm Khóa Học
            </span>
          </Link>
          <Link href="/admin/lessons/new">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-medium transition-colors">
              + Thêm Bài Học
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
