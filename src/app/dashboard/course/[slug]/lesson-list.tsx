'use client';

import { useState, useTransition } from 'react';
import { markLessonCompleteAction } from './actions';
import { QuizModal } from '@/components/quiz/quiz-modal';
import type { Lesson, QuizQuestionWithOptions } from '@/types/database.types';

interface LessonListProps {
  lessons: Lesson[];
  completedLessonIds: string[];
  courseId: string;
  quizLessonIds: string[];
  quizScores: Record<string, { score: number; passed: boolean }>;
}

/** Interactive lesson list with mark-complete toggle + quiz gating */
export function LessonList({
  lessons,
  completedLessonIds,
  courseId,
  quizLessonIds,
  quizScores,
}: LessonListProps) {
  const [completed, setCompleted] = useState(new Set(completedLessonIds));
  const [scores, setScores] = useState(quizScores);
  const [quizLessonId, setQuizLessonId] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestionWithOptions[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [isPending, startTransition] = useTransition();
  const quizSet = new Set(quizLessonIds);

  function toggleComplete(lessonId: string) {
    if (completed.has(lessonId)) return;
    // If lesson has a quiz, require passing it instead of manual toggle
    if (quizSet.has(lessonId)) {
      openQuiz(lessonId);
      return;
    }
    startTransition(async () => {
      await markLessonCompleteAction(lessonId, courseId);
      setCompleted((prev) => new Set([...prev, lessonId]));
    });
  }

  async function openQuiz(lessonId: string) {
    setLoadingQuiz(true);
    try {
      const res = await fetch(`/api/quiz/${lessonId}`);
      if (!res.ok) throw new Error('Không tải được quiz');
      const data: QuizQuestionWithOptions[] = await res.json();
      setQuizQuestions(data);
      setQuizLessonId(lessonId);
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Lỗi tải quiz');
    } finally {
      setLoadingQuiz(false);
    }
  }

  function onQuizPassed() {
    if (!quizLessonId) return;
    setCompleted((prev) => new Set([...prev, quizLessonId]));
    setScores((prev) => ({ ...prev, [quizLessonId]: { score: 100, passed: true } }));
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-3">Nội Dung Khóa Học</h2>
      <div className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
        {lessons.map((lesson, i) => {
          const done = completed.has(lesson.id);
          const hasQuiz = quizSet.has(lesson.id);
          const score = scores[lesson.id];
          return (
            <div
              key={lesson.id}
              className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors"
            >
              <button
                onClick={() => toggleComplete(lesson.id)}
                disabled={done || isPending}
                aria-label={done ? 'Đã hoàn thành' : 'Đánh dấu hoàn thành'}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  done
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-white/30 hover:border-emerald-400'
                }`}
              >
                {done && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              <span className="text-white/20 text-sm w-5 shrink-0">{i + 1}</span>

              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-snug ${done ? 'text-white/40 line-through' : 'text-white/80'}`}>
                  {lesson.title}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {lesson.is_preview && !done && (
                  <span className="text-xs text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Xem thử
                  </span>
                )}
                {lesson.duration_minutes && (
                  <span className="text-xs text-white/30">{lesson.duration_minutes}p</span>
                )}
                {lesson.video_url && (
                  <a
                    href={lesson.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-emerald-400 hover:underline"
                  >
                    ▶ Xem
                  </a>
                )}
                {hasQuiz && (
                  <button
                    type="button"
                    onClick={() => openQuiz(lesson.id)}
                    disabled={loadingQuiz}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
                      score?.passed
                        ? 'border-emerald-500/50 text-emerald-400 bg-emerald-500/10'
                        : 'border-amber-500/40 text-amber-400 hover:bg-amber-500/10'
                    }`}
                  >
                    {score?.passed ? `Quiz ✓ ${score.score}%` : score ? `Quiz ${score.score}% · Làm lại` : 'Làm Quiz'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <QuizModal
        open={quizLessonId !== null}
        onClose={() => setQuizLessonId(null)}
        lessonId={quizLessonId ?? ''}
        courseId={courseId}
        questions={quizQuestions}
        onPassed={onQuizPassed}
      />
    </div>
  );
}
