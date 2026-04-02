import { createClient } from '@/lib/supabase/server';
import type { Profile } from '@/types/database.types';

/** Get current authenticated user from server context. Returns null if not logged in. */
export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return user;
}

/** Get current user's profile (includes role). Returns null if not logged in. */
export async function getUserProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return null;
  return data;
}
