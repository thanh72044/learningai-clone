import { createClient } from '@/lib/supabase/server';

/** Mark a lesson as complete for a user */
export async function markLessonComplete(userId: string, lessonId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('progress')
    .insert({ user_id: userId, lesson_id: lessonId });

  // Ignore duplicate (already completed)
  if (error && !error.message.includes('unique')) {
    throw new Error(error.message);
  }
}

/** Get set of completed lesson IDs for a user within a course */
export async function getCourseProgress(userId: string, courseId: string): Promise<{
  completedLessonIds: Set<string>;
  completedCount: number;
  totalCount: number;
  percentage: number;
}> {
  const supabase = await createClient();

  // Get all lessons for this course
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id')
    .eq('course_id', courseId);

  const totalCount = lessons?.length ?? 0;
  if (totalCount === 0) {
    return { completedLessonIds: new Set(), completedCount: 0, totalCount: 0, percentage: 0 };
  }

  const lessonIds = lessons!.map((l) => l.id);

  // Get completed lessons within this course
  const { data: completed } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .in('lesson_id', lessonIds);

  const completedLessonIds = new Set((completed ?? []).map((p) => p.lesson_id));
  const completedCount = completedLessonIds.size;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return { completedLessonIds, completedCount, totalCount, percentage };
}

/** Issue a certificate if course is 100% complete. Returns true if issued. */
export async function maybeIssueCertificate(userId: string, courseId: string): Promise<boolean> {
  const { completedCount, totalCount } = await getCourseProgress(userId, courseId);
  if (totalCount === 0 || completedCount < totalCount) return false;

  const supabase = await createClient();
  const { error } = await supabase
    .from('certificates')
    .insert({ user_id: userId, course_id: courseId });

  // Ignore duplicate (already issued)
  if (error && !error.message.includes('unique')) {
    console.error('maybeIssueCertificate:', error.message);
    return false;
  }
  return true;
}
