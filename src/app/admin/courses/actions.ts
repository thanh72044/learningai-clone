'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createCourseSchema, updateCourseSchema } from '@/lib/validations/admin';

/** Create a new course from form data with Zod validation */
export async function createCourseAction(formData: FormData) {
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = createCourseSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { slug, title, description, level, price, originalPrice, thumbnailUrl, isPublished, isFeatured } = parsed.data;

  const { error } = await supabase.from('courses').insert({
    slug: slug.toLowerCase().replace(/\s+/g, '-'),
    title,
    description: description || null,
    level: level || null,
    price,
    original_price: originalPrice || null,
    thumbnail_url: thumbnailUrl || null,
    is_published: isPublished,
    is_featured: isFeatured,
  });

  if (error) {
    console.error('createCourseAction error:', error.message);
    throw new Error('Không thể tạo khóa học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  redirect('/admin/courses');
}

/** Update an existing course with Zod validation */
export async function updateCourseAction(id: string, formData: FormData) {
  const supabase = await createClient();

  // Parse and validate with Zod
  const data = Object.fromEntries(formData);
  const parsed = updateCourseSchema.safeParse(data);

  if (!parsed.success) {
    const firstError = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    throw new Error(firstError || 'Dữ liệu không hợp lệ');
  }

  const { title, description, level, price, originalPrice, thumbnailUrl, isPublished, isFeatured } = parsed.data;

  const { error } = await supabase.from('courses').update({
    title,
    description: description || null,
    level: level || null,
    price,
    original_price: originalPrice || null,
    thumbnail_url: thumbnailUrl || null,
    is_published: isPublished,
    is_featured: isFeatured,
  }).eq('id', id);

  if (error) {
    console.error('updateCourseAction error:', error.message);
    throw new Error('Không thể cập nhật khóa học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  redirect('/admin/courses');
}

/** Delete a course by id */
export async function deleteCourseAction(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('courses').delete().eq('id', id);

  if (error) {
    console.error('deleteCourseAction error:', error.message);
    throw new Error('Không thể xóa khóa học. Vui lòng thử lại.');
  }

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
}
