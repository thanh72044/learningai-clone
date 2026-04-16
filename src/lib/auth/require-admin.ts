import { createClient } from '@/lib/supabase/server';

/**
 * Verifies the caller is an authenticated admin.
 * Throws if not authenticated or not an admin.
 * Use at the top of every admin server action to prevent privilege escalation
 * (middleware only guards page routes — server actions can be called directly).
 */
export async function requireAdmin(): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error('Unauthorized');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Forbidden');
}
