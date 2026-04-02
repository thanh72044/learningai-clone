'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/** Create a new lesson from form data */
export async function createLessonAction(formData: FormData) {
  const supabase = await createClient();

  const courseId = formData.get('course_id') as string;

  const { error } = await supabase.from('lessons').insert({
    course_id: courseId,
    title: formData.get('title') as string,
    video_url: (formData.get('video_url') as string) || null,
    duration: parseInt(formData.get('duration') as string) || 0,
    sort_order: parseInt(formData.get('sort_order') as string) || 1,
    is_preview: formData.get('is_preview') === 'on',
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin/lessons');
  revalidatePath(`/course`);
  redirect('/admin/lessons');
}

/** Update an existing lesson */
export async function updateLessonAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('lessons').update({
    title: formData.get('title') as string,
    video_url: (formData.get('video_url') as string) || null,
    duration: parseInt(formData.get('duration') as string) || 0,
    sort_order: parseInt(formData.get('sort_order') as string) || 1,
    is_preview: formData.get('is_preview') === 'on',
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/lessons');
  redirect('/admin/lessons');
}

/** Delete a lesson by id */
export async function deleteLessonAction(id: string) {
  const supabase = await createClient();
  await supabase.from('lessons').delete().eq('id', id);
  revalidatePath('/admin/lessons');
}
