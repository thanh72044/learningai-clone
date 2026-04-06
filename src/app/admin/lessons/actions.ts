'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createLessonSchema, updateLessonSchema } from '@/lib/validations/admin';

/** Create a new lesson from form data with Zod validation */
export async function createLessonAction(formData: FormData) {
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = createLessonSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { course_id, title, video_url, duration_minutes, sort_order, is_preview } = parsed.data;

  const { error } = await supabase.from('lessons').insert({
    course_id,
    title,
    video_url: video_url || null,
    duration_minutes: duration_minutes || 0,
    sort_order,
    is_preview,
  });

  if (error) {
    console.error('createLessonAction error:', error.message);
    throw new Error('Không thể tạo bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
  revalidatePath('/course');
  redirect('/admin/lessons');
}

/** Update an existing lesson with Zod validation */
export async function updateLessonAction(id: string, formData: FormData) {
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = updateLessonSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { title, video_url, duration_minutes, sort_order, is_preview } = parsed.data;

  const { error } = await supabase.from('lessons').update({
    title,
    video_url: video_url || null,
    duration_minutes: duration_minutes || 0,
    sort_order,
    is_preview,
  }).eq('id', id);

  if (error) {
    console.error('updateLessonAction error:', error.message);
    throw new Error('Không thể cập nhật bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
  redirect('/admin/lessons');
}

/** Delete a lesson by id */
export async function deleteLessonAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('lessons').delete().eq('id', id);

  if (error) {
    console.error('deleteLessonAction error:', error.message);
    throw new Error('Không thể xóa bài học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/lessons');
}
