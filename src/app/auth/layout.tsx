import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';

/**
 * Auth Layout: Redirect authenticated users away from auth pages
 * (New proxy pattern: auth check at layout level, not in middleware)
 */
export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser();

  // If already authenticated, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return <>{children}</>;
}
