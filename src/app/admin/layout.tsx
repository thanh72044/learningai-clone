import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUserProfile } from '@/lib/auth/get-user';

const ADMIN_NAV = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/courses', label: 'Khóa Học', icon: '📚' },
  { href: '/admin/lessons', label: 'Bài Học', icon: '🎬' },
  { href: '/', label: '← Về Trang Chủ', icon: '🏠' },
];

// Uses Supabase server client (auth + admin check with getUserProfile())
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const profile = await getUserProfile();
  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-4 sticky top-20">
            <div className="mb-4 px-2">
              <p className="text-xs text-orange-400 font-bold uppercase tracking-wider">⚙ Admin Panel</p>
            </div>
            <nav className="flex flex-col gap-1">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
