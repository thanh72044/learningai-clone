import Link from 'next/link';

const FOOTER_LINKS = {
  'Học Tập': [
    { href: '/courses', label: 'Khóa Học' },
    { href: '/free-courses', label: 'Học Miễn Phí' },
  ],
  'Công Ty': [
    { href: '/about', label: 'Về Chúng Tôi' },
    { href: '/contact', label: 'Liên Hệ' },
  ],
  'Tài Khoản': [
    { href: '/auth/login', label: 'Đăng Nhập' },
    { href: '/auth/signup', label: 'Đăng Ký' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
};

/** Site-wide footer */
export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-emerald-950/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <span className="text-emerald-400">🤖</span>
              <span>Learning<span className="text-emerald-400">AI</span></span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed">
              Làm Chủ AI, Dẫn Đầu Tương Lai.<br />
              Nền tảng học AI thực chiến số 1 Việt Nam.
            </p>
            {/* Social links */}
            <div className="flex gap-3 mt-4">
              {['Facebook', 'YouTube', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-xs text-white/40 hover:text-emerald-400 transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-white mb-3">{group}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <p>© 2025 Learning AI. All rights reserved.</p>
          <p>AI ECOSYSTEM Technology Company • MST: 0319083201</p>
        </div>
      </div>
    </footer>
  );
}
