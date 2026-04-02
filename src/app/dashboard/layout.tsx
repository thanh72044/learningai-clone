import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUser } from '@/lib/auth/get-user';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Tổng Quan', icon: '🏠' },
  { href: '/dashboard/courses', label: 'Khóa Học Của Tôi', icon: '📚' },
  { href: '/dashboard/certificates', label: 'Chứng Chỉ', icon: '🏆' },
  { href: '/courses', label: 'Khám Phá Thêm', icon: '🔍' },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-56 shrink-0">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sticky top-20">
            <div className="mb-4 px-2">
              <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Tài Khoản</p>
              <p className="text-white text-sm font-medium truncate">{user.email}</p>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
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
            {/* Logout */}
            <form action="/auth/logout" method="post" className="mt-4 pt-4 border-t border-white/10">
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <span>🚪</span> Đăng Xuất
              </button>
            </form>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
