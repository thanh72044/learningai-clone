'use client';

import { useState, useTransition } from 'react';
import type { QuizQuestionWithOptions } from '@/types/database.types';
import {
  updateQuizQuestionAction,
  deleteQuizQuestionAction,
} from '@/app/admin/lessons/actions';

const INPUT = 'w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/30 focus:outline-none focus:border-emerald-500/50';

interface Props {
  question: QuizQuestionWithOptions;
  lessonId: string;
  index: number;
}

interface OptionDraft {
  option_text: string;
  is_correct: boolean;
}

export function QuizQuestionItem({ question, lessonId, index }: Props) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(question.question_text);
  const [explanation, setExplanation] = useState(question.explanation ?? '');
  const [options, setOptions] = useState<OptionDraft[]>(
    [...question.quiz_options]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((o) => ({ option_text: o.option_text, is_correct: o.is_correct }))
  );
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

  function save() {
    setError(null);
    startTransition(async () => {
      try {
        await updateQuizQuestionAction(question.id, {
          lesson_id: lessonId,
          question_text: text,
          explanation,
          sort_order: question.sort_order,
          options,
        });
        setEditing(false);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      }
    });
  }

  function remove() {
    if (!confirm('Xóa câu hỏi này?')) return;
    startTransition(async () => {
      try {
        await deleteQuizQuestionAction(question.id, lessonId);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Có lỗi xảy ra');
      }
    });
  }

  if (!editing) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-white/40 mb-1">Câu {index + 1}</p>
            <p className="text-white text-sm font-medium">{question.question_text}</p>
            <ul className="mt-3 space-y-1">
              {[...question.quiz_options]
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((o) => (
                  <li
                    key={o.id}
                    className={`text-xs flex items-center gap-2 ${
                      o.is_correct ? 'text-emerald-400' : 'text-white/60'
                    }`}
                  >
                    <span>{o.is_correct ? '✓' : '·'}</span>
                    <span>{o.option_text}</span>
                  </li>
                ))}
            </ul>
            {question.explanation && (
              <p className="text-xs text-white/40 mt-2 italic">💡 {question.explanation}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs text-emerald-400 hover:text-emerald-300"
            >
              Sửa
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={isPending}
              className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-emerald-500/30 bg-white/5 p-4 flex flex-col gap-3">
      <p className="text-xs text-white/40">Sửa câu {index + 1}</p>
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
          {isPending ? 'Đang lưu...' : 'Lưu'}
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="px-4 py-2 rounded-lg border border-white/20 text-white/60 hover:text-white text-sm"
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
