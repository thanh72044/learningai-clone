import { createClient } from '@/lib/supabase/server';
import type { Course } from '@/types/database.types';

/** Fetch all featured published courses for homepage */
export async function getFeaturedCourses(): Promise<Course[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .eq('is_featured', true)
    .order('student_count', { ascending: false })
    .limit(6);

  if (error) { console.error('getFeaturedCourses:', error.message); return []; }
  return data ?? [];
}

/** Fetch all published courses for listing page */
export async function getAllCourses(level?: string): Promise<Course[]> {
  const supabase = await createClient();
  let query = supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (level && level !== 'all') {
    query = query.eq('level', level);
  }

  const { data, error } = await query;
  if (error) { console.error('getAllCourses:', error.message); return []; }
  return data ?? [];
}

/** Fetch a single published course by slug, with instructor info */
export async function getCourseBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('courses')
    .select('*, instructors(*)')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error) { console.error('getCourseBySlug:', error.message); return null; }
  return data;
}

/** Fetch all lessons for a course, ordered by sort_order */
export async function getLessonsByCourse(courseId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', courseId)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getLessonsByCourse:', error.message); return []; }
  return data ?? [];
}
