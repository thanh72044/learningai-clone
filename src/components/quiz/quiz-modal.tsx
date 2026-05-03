'use client';

import { useEffect, useState, useTransition } from 'react';
import type { QuizQuestionWithOptions } from '@/types/database.types';
import { submitQuizAction } from '@/app/dashboard/course/[slug]/actions';
import { QuizQuestionStep } from './quiz-question-step';
import { QuizResultScreen } from './quiz-result-screen';

interface Props {
  open: boolean;
  onClose: () => void;
  lessonId: string;
  courseId: string;
  questions: QuizQuestionWithOptions[];
  onPassed: () => void;
}

interface Result {
  score: number;
  passed: boolean;
  correctCount: number;
}

export function QuizModal({ open, onClose, lessonId, courseId, questions, onPassed }: Props) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) {
      setIndex(0);
      setAnswers({});
      setResult(null);
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const current = questions[index];
  const allAnswered = questions.every((q) => answers[q.id]);

  function select(optionId: string) {
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
  }

  function submit() {
    setError(null);
    const payload = questions.map((q) => ({ questionId: q.id, optionId: answers[q.id] }));
    startTransition(async () => {
      try {
        const res = await submitQuizAction(lessonId, courseId, payload);
        const correctCount = res.results.filter((r) => r.correct).length;
        setResult({ score: res.score, passed: res.passed, correctCount });
        if (res.passed) onPassed();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      }
    });
  }

  function retry() {
    setIndex(0);
    setAnswers({});
    setResult(null);
    setError(null);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-emerald-950 border border-white/10 p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white/70">Quiz</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-white/40 hover:text-white text-xl leading-none"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-400 mb-3 px-3 py-2 bg-red-500/10 rounded-lg">{error}</p>
        )}

        {result ? (
          <QuizResultScreen
            score={result.score}
            passed={result.passed}
            correctCount={result.correctCount}
            totalCount={questions.length}
            onRetry={retry}
            onClose={onClose}
          />
        ) : current ? (
          <QuizQuestionStep
            question={current}
            index={index}
            total={questions.length}
            selectedOptionId={answers[current.id] ?? null}
            onSelect={select}
            onNext={() => setIndex((i) => Math.min(i + 1, questions.length - 1))}
            onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
            onSubmit={submit}
            canSubmit={allAnswered}
            isPending={isPending}
          />
        ) : (
          <p className="text-sm text-white/60">Bài học này chưa có câu hỏi.</p>
        )}
      </div>
    </div>
  );
}
