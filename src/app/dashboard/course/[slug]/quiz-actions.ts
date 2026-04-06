'use server';

import { revalidatePath } from 'next/cache';
import { getUser } from '@/lib/auth/get-user';
import { checkAnswerRPC, recordQuizAttempts, saveQuizScore } from '@/lib/db/quiz';

/**
 * Server action: Submit quiz answers and calculate score using secure RPC.
 * This prevents exposing the correct answers to the client.
 *
 * @param lessonId - The UUID of the lesson containing the quiz
 * @param answers - Array of { questionId, selectedOptionId } pairs
 * @returns { scorePercent, passed, attempts } - Score percentage and pass status
 */
export async function submitQuizAction(
  lessonId: string,
  answers: Array<{ questionId: string; selectedOptionId: string }>
) {
  const user = await getUser();
  if (!user) {
    throw new Error('User must be logged in to submit quiz');
  }

  // Use RPC to check each answer (secure - doesn't expose is_correct column)
  const attempts: Array<{
    userId: string;
    questionId: string;
    optionId: string;
    isCorrect: boolean;
  }> = [];

  for (const answer of answers) {
    const isCorrect = await checkAnswerRPC(answer.selectedOptionId);
    attempts.push({
      userId: user.id,
      questionId: answer.questionId,
      optionId: answer.selectedOptionId,
      isCorrect,
    });
  }

  // Calculate score percentage
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const scorePercent = Math.round((correctCount / attempts.length) * 100);
  const passed = scorePercent >= 70; // 70% pass threshold

  // Save attempts and score to database
  await recordQuizAttempts(attempts);
  await saveQuizScore(user.id, lessonId, scorePercent, passed);

  // Revalidate dashboard to show updated quiz status
  revalidatePath('/dashboard');

  return { scorePercent, passed, attempts };
}
