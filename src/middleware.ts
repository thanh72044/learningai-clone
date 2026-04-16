import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Middleware: refresh Supabase auth session on every request.
 * Also protects /dashboard and /admin routes.
 */
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Only set cookies on the response — preserves httpOnly/secure/sameSite attributes.
          // (The deprecated pattern also mutated request cookies, stripping options.)
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session (IMPORTANT: do not remove)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define route categories
  const isAuthRoute = pathname.startsWith('/auth');
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/admin');
  const isPasswordResetRoute = pathname === '/auth/reset-password';

  // Logic:
  // 1. If unauthenticated AND accessing protected route → redirect to /auth/login
  if (isProtectedRoute && !user) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  // 2. If authenticated AND accessing auth route → redirect to /dashboard
  // (But allow /auth/callback, /auth/logout, and /auth/reset-password for password reset flow)
  if (user && isAuthRoute && !pathname.includes('/callback') && !pathname.includes('/logout') && !isPasswordResetRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 3. Admin specific check (Ensures non-admins don't see admin pages)
  if (pathname.startsWith('/admin') && user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
