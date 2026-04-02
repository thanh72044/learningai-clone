import { createClient } from '@/lib/supabase/server';
import type { Testimonial } from '@/types/database.types';

/** Fetch featured testimonials ordered by sort_order */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('is_featured', true)
    .order('sort_order', { ascending: true })
    .limit(6);

  if (error) { console.error('getFeaturedTestimonials:', error.message); return []; }
  return data ?? [];
}
