import { createClient } from '@/lib/supabase/server';
import type { FreeResource } from '@/types/database.types';

/** Fetch featured free resources for homepage preview */
export async function getFeaturedFreeResources(): Promise<FreeResource[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('free_resources')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order', { ascending: true })
      .limit(6);

    if (error) { console.error('getFeaturedFreeResources:', error.message); return []; }
    return data ?? [];
  } catch (error) {
    console.error('getFeaturedFreeResources (exception):', error);
    return [];
  }
}

/** Fetch all free resources for the free-courses page */
export async function getAllFreeResources(): Promise<FreeResource[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('free_resources')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) { console.error('getAllFreeResources:', error.message); return []; }
    return data ?? [];
  } catch (error) {
    console.error('getAllFreeResources (exception):', error);
    return [];
  }
}
