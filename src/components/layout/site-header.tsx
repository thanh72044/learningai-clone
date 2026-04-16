'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const NAV_LINKS = [
  { href: '/courses', label: 'Khóa Học' },
  { href: '/free-courses', label: 'Miễn Phí' },
  { href: '/about', label: 'Về Chúng Tôi' },
  { href: '/contact', label: 'Liên Hệ' },
];

/** Site-wide header with navigation and auth buttons */
export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Listen to auth state changes in real-time
  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    // Subscribe to auth changes (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-emerald-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
            <span className="text-emerald-400">🤖</span>
            <span>Learning<span className="text-emerald-400">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-white/70 hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Auth buttons — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-1.5 rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">Đăng Nhập</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button variant="primary" size="sm">Đăng Ký</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-emerald-950 px-4 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white py-2 text-sm font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-white/10">
            {user ? (
              <>
                <Link href="/dashboard" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Dashboard</Button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-1.5 rounded-xl border border-white/20 text-white/70 hover:text-white text-sm font-medium transition-colors"
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">Đăng Nhập</Button>
                </Link>
                <Link href="/auth/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">Đăng Ký</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
