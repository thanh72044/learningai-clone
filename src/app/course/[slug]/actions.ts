'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';
import { enroll } from '@/lib/db/enrollments';

/** Server action: enroll user in a course then redirect to dashboard player */
export async function enrollAction(courseId: string, courseSlug: string) {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  await enroll(user.id, courseId);
  redirect(`/dashboard/course/${courseSlug}`);
}
