import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/db/quiz';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/quiz/[lessonId]
 * Returns quiz questions + options for a lesson. Auth required.
 * The `is_correct` field is already stripped by `getQuizQuestions` (select list).
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { lessonId } = await params;
  const questions = await getQuizQuestions(lessonId);
  return NextResponse.json(questions);
}
