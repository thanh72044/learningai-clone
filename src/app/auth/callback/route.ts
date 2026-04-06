import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Auth callback: exchange PKCE code for session then redirect.
 * Handles: Signup verification, Password reset, OAuth (Google).
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // If we're on a password reset flow, ensure we redirect to the reset form
      const isPasswordReset = next.includes('/auth/reset-password');
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Auth failed or code missing — redirect to login with error
  return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`);
}
