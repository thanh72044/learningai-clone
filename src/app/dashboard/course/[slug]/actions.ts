'use server';

import { markLessonComplete, maybeIssueCertificate } from '@/lib/db/progress';
import { revalidatePath } from 'next/cache';

/** Server action: mark a lesson complete and issue certificate if course done */
export async function markLessonCompleteAction(
  userId: string,
  lessonId: string,
  courseId: string
) {
  await markLessonComplete(userId, lessonId);
  await maybeIssueCertificate(userId, courseId);
  revalidatePath('/dashboard');
}
