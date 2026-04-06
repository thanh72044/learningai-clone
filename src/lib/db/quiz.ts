import { createClient } from '@/lib/supabase/server';
import type { QuizQuestionWithOptions, QuizScore } from '@/types/database.types';

/** Fetch all questions for a lesson, each with its options ordered by sort_order */
export async function getQuizQuestions(lessonId: string): Promise<QuizQuestionWithOptions[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*, quiz_options(*)')
    .eq('lesson_id', lessonId)
    .order('sort_order', { ascending: true });

  if (error) { console.error('getQuizQuestions:', error.message); return []; }
  return (data ?? []) as QuizQuestionWithOptions[];
}

/** Get a user's saved score for a lesson, or null if not yet taken */
export async function getQuizScore(userId: string, lessonId: string): Promise<QuizScore | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('quiz_scores')
    .select('*')
    .eq('user_id', userId)
    .eq('lesson_id', lessonId)
    .single();
  return data ?? null;
}

/** Batch-insert quiz attempt records for one quiz submission */
export async function recordQuizAttempts(
  attempts: { userId: string; questionId: string; optionId: string; isCorrect: boolean }[]
): Promise<void> {
  if (attempts.length === 0) return;
  const supabase = await createClient();
  const rows = attempts.map((a) => ({
    user_id: a.userId,
    question_id: a.questionId,
    selected_option_id: a.optionId,
    is_correct: a.isCorrect,
  }));
  const { error } = await supabase.from('quiz_attempts').insert(rows);
  if (error) throw new Error(`recordQuizAttempts: ${error.message}`);
}

/** Upsert a quiz score (updates existing row if user retakes the quiz) */
export async function saveQuizScore(
  userId: string,
  lessonId: string,
  scorePercent: number,
  passed: boolean
): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase
    .from('quiz_scores')
    .upsert(
      { user_id: userId, lesson_id: lessonId, score_percent: scorePercent, passed, completed_at: new Date().toISOString() },
      { onConflict: 'user_id,lesson_id' }
    );
  if (error) throw new Error(`saveQuizScore: ${error.message}`);
}

/**
 * Given a list of lesson IDs, returns a Set of those that have at least one quiz question.
 * Used by lesson lists to show quiz badges without N+1 queries.
 */
export async function getQuizzesByLessonIds(lessonIds: string[]): Promise<Set<string>> {
  if (lessonIds.length === 0) return new Set();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('lesson_id')
    .in('lesson_id', lessonIds);

  if (error) { console.error('getQuizzesByLessonIds:', error.message); return new Set(); }
  return new Set((data ?? []).map((r) => r.lesson_id));
}

/**
 * Check if a selected quiz option is correct using secure RPC function.
 * This prevents exposing the answer key via direct API queries.
 *
 * @param optionId - The UUID of the selected quiz option
 * @returns true if the option is correct, false otherwise
 */
export async function checkAnswerRPC(optionId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc('check_quiz_answer', {
    p_selected_option_id: optionId,
  });

  if (error) {
    console.error('checkAnswerRPC:', error.message);
    return false;
  }

  return data ?? false;
}
