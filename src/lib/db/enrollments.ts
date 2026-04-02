import { createClient } from '@/lib/supabase/server';

/** Enroll a user in a course. No-op if already enrolled. */
export async function enroll(userId: string, courseId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('enrollments')
    .insert({ user_id: userId, course_id: courseId })
    .select()
    .single();

  // Ignore unique constraint violation (already enrolled)
  if (error && !error.message.includes('unique')) {
    throw new Error(error.message);
  }
}

/** Check if a user is enrolled in a course */
export async function isEnrolled(userId: string, courseId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('enrollments')
    .select('id')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .single();
  return !!data;
}

/** Get all courses a user is enrolled in, with course details */
export async function getUserEnrollments(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('enrollments')
    .select('*, courses(*)')
    .eq('user_id', userId)
    .order('enrolled_at', { ascending: false });

  if (error) { console.error('getUserEnrollments:', error.message); return []; }
  return data ?? [];
}
