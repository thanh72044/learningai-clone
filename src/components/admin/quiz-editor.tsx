'use client';

import { useState, useTransition } from 'react';
import type { QuizQuestionWithOptions } from '@/types/database.types';
import {
  createQuizQuestionAction,
} from '@/app/admin/lessons/actions';
import { QuizQuestionItem } from './quiz-question-item';

const INPUT = 'w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500/50';

interface Props {
  lessonId: string;
  initialQuestions: QuizQuestionWithOptions[];
}

interface OptionDraft {
  option_text: string;
  is_correct: boolean;
}

const EMPTY_OPTIONS: OptionDraft[] = [
  { option_text: '', is_correct: true },
  { option_text: '', is_correct: false },
  { option_text: '', is_correct: false },
  { option_text: '', is_correct: false },
];

export function QuizEditor({ lessonId, initialQuestions }: Props) {
  const [adding, setAdding] = useState(false);
  const [text, setText] = useState('');
  const [explanation, setExplanation] = useState('');
  const [options, setOptions] = useState<OptionDraft[]>(EMPTY_OPTIONS);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateOption(i: number, patch: Partial<OptionDraft>) {
    setOptions((prev) => prev.map((o, idx) => (idx === i ? { ...o, ...patch } : o)));
  }
  function addOption() {
    setOptions((prev) => [...prev, { option_text: '', is_correct: false }]);
  }
  function removeOption(i: number) {
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
  }

  function reset() {
    setText('');
    setExplanation('');
    setOptions(EMPTY_OPTIONS.map((o) => ({ ...o })));
    setError(null);
    setAdding(false);
  }

  function save() {
    setError(null);
    const cleaned = options.filter((o) => o.option_text.trim() !== '');
    startTransition(async () => {
      try {
        await createQuizQuestionAction({
          lesson_id: lessonId,
          question_text: text,
          explanation,
          sort_order: initialQuestions.length,
          options: cleaned,
        });
        reset();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          Câu Hỏi Quiz ({initialQuestions.length})
        </h2>
        {!adding && (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold"
          >
            + Thêm câu hỏi
          </button>
        )}
      </div>

      {initialQuestions.length === 0 && !adding && (
        <p className="text-sm text-white/40 italic">Chưa có câu hỏi nào.</p>
      )}

      <div className="flex flex-col gap-3">
        {initialQuestions.map((q, i) => (
          <QuizQuestionItem key={q.id} question={q} lessonId={lessonId} index={i} />
        ))}
      </div>

      {adding && (
        <div className="rounded-xl border border-emerald-500/30 bg-white/5 p-4 flex flex-col gap-3">
          <p className="text-xs text-white/40">Câu hỏi mới</p>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Câu hỏi..."
            className={INPUT}
          />
          <div className="flex flex-col gap-2">
            {options.map((o, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={o.is_correct}
                  onChange={(e) => updateOption(i, { is_correct: e.target.checked })}
                  className="w-4 h-4 accent-emerald-500"
                  aria-label="Đáp án đúng"
                />
                <input
                  value={o.option_text}
                  onChange={(e) => updateOption(i, { option_text: e.target.value })}
                  placeholder={`Đáp án ${i + 1}`}
                  className={INPUT + ' flex-1'}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(i)}
                    className="text-white/40 hover:text-red-400 px-2"
                    aria-label="Xóa đáp án"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-xs text-emerald-400 hover:text-emerald-300 self-start"
            >
              + Thêm đáp án
            </button>
          </div>
          <textarea
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            placeholder="Giải thích (tùy chọn)"
            rows={2}
            className={INPUT}
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={save}
              disabled={isPending}
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold disabled:opacity-50"
            >
              {isPending ? 'Đang lưu...' : 'Lưu câu hỏi'}
            </button>
            <button
              type="button"
              onClick={reset}
              className="px-4 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white text-sm"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
