'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

/** Create a new course from form data */
export async function createCourseAction(formData: FormData) {
  const supabase = await createClient();

  const slug = (formData.get('slug') as string).trim().toLowerCase().replace(/\s+/g, '-');

  const { error } = await supabase.from('courses').insert({
    slug,
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    level: (formData.get('level') as string) || null,
    price: parseInt(formData.get('price') as string) || 0,
    original_price: parseInt(formData.get('original_price') as string) || null,
    thumbnail_url: (formData.get('thumbnail_url') as string) || null,
    is_published: formData.get('is_published') === 'true',
    is_featured: formData.get('is_featured') === 'true',
  });

  if (error) throw new Error(error.message);

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  redirect('/admin/courses');
}

/** Update an existing course */
export async function updateCourseAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.from('courses').update({
    title: formData.get('title') as string,
    description: (formData.get('description') as string) || null,
    level: (formData.get('level') as string) || null,
    price: parseInt(formData.get('price') as string) || 0,
    original_price: parseInt(formData.get('original_price') as string) || null,
    thumbnail_url: (formData.get('thumbnail_url') as string) || null,
    is_published: formData.get('is_published') === 'on',
    is_featured: formData.get('is_featured') === 'on',
  }).eq('id', id);

  if (error) throw new Error(error.message);

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  redirect('/admin/courses');
}

/** Delete a course by id */
export async function deleteCourseAction(id: string) {
  const supabase = await createClient();
  await supabase.from('courses').delete().eq('id', id);
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
}
