'use server';

import { markLessonComplete, maybeIssueCertificate } from '@/lib/db/progress';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/** Server action: mark a lesson complete and issue certificate if course done.
 *  userId is resolved server-side — never trusted from client (IDOR prevention). */
export async function markLessonCompleteAction(lessonId: string, courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await markLessonComplete(user.id, lessonId);
  await maybeIssueCertificate(user.id, courseId);
  revalidatePath('/dashboard');
}
