'use server';

import { markLessonComplete, maybeIssueCertificate } from '@/lib/db/progress';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { checkAnswerRPC, recordQuizAttempts, saveQuizScore, getQuizQuestions } from '@/lib/db/quiz';

const PASS_THRESHOLD = 70;

/** Server action: mark a lesson complete and issue certificate if course done.
 *  userId is resolved server-side — never trusted from client (IDOR prevention). */
export async function markLessonCompleteAction(lessonId: string, courseId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await markLessonComplete(user.id, lessonId);
  await maybeIssueCertificate(user.id, courseId);
  revalidatePath('/dashboard');
}

/**
 * Submit a quiz: validates each answer via RPC (answer key never leaves DB),
 * records attempts, saves score, auto-marks lesson complete when passed.
 * Returns { score, passed, results: { questionId, correct }[] }.
 */
export async function submitQuizAction(
  lessonId: string,
  courseId: string,
  answers: { questionId: string; optionId: string }[]
): Promise<{ score: number; passed: boolean; results: { questionId: string; correct: boolean }[] }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Chưa đăng nhập');

  const questions = await getQuizQuestions(lessonId);
  if (questions.length === 0) throw new Error('Bài học không có quiz');

  // Verify every question got an answer and every optionId is valid for its question
  const questionIds = new Set(questions.map((q) => q.id));
  const optionToQuestion = new Map<string, string>();
  for (const q of questions) {
    for (const o of q.quiz_options) optionToQuestion.set(o.id, q.id);
  }
  for (const a of answers) {
    if (!questionIds.has(a.questionId)) throw new Error('Câu hỏi không hợp lệ');
    if (optionToQuestion.get(a.optionId) !== a.questionId) {
      throw new Error('Đáp án không thuộc câu hỏi');
    }
  }

  const results = await Promise.all(
    answers.map(async (a) => ({
      questionId: a.questionId,
      optionId: a.optionId,
      correct: await checkAnswerRPC(a.optionId),
    }))
  );

  const correctCount = results.filter((r) => r.correct).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const passed = score >= PASS_THRESHOLD;

  await recordQuizAttempts(
    results.map((r) => ({
      userId: user.id,
      questionId: r.questionId,
      optionId: r.optionId,
      isCorrect: r.correct,
    }))
  );
  await saveQuizScore(user.id, lessonId, score, passed);

  if (passed) {
    await markLessonComplete(user.id, lessonId);
    await maybeIssueCertificate(user.id, courseId);
  }

  revalidatePath('/dashboard');

  return {
    score,
    passed,
    results: results.map((r) => ({ questionId: r.questionId, correct: r.correct })),
  };
}
