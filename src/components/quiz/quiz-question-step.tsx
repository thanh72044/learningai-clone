'use client';

import type { QuizQuestionWithOptions } from '@/types/database.types';

interface Props {
  question: QuizQuestionWithOptions;
  index: number;
  total: number;
  selectedOptionId: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  canSubmit: boolean;
  isPending: boolean;
}

export function QuizQuestionStep({
  question,
  index,
  total,
  selectedOptionId,
  onSelect,
  onNext,
  onPrev,
  onSubmit,
  canSubmit,
  isPending,
}: Props) {
  const isLast = index === total - 1;
  const options = [...question.quiz_options].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs text-white/40 mb-1">Câu {index + 1}/{total}</p>
        <div className="h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-white leading-snug">{question.question_text}</h3>

      <div className="flex flex-col gap-2">
        {options.map((o) => {
          const selected = selectedOptionId === o.id;
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onSelect(o.id)}
              className={`text-left px-4 py-3 rounded-xl border text-sm transition-colors ${
                selected
                  ? 'border-emerald-500 bg-emerald-500/10 text-white'
                  : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30'
              }`}
            >
              {o.option_text}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0 || isPending}
          className="px-5 py-2 rounded-xl border border-white/20 text-white/60 hover:text-white text-sm disabled:opacity-30"
        >
          ← Trước
        </button>
        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit || isPending}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold disabled:opacity-50"
          >
            {isPending ? 'Đang chấm...' : 'Nộp bài'}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            disabled={!selectedOptionId}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold disabled:opacity-50"
          >
            Tiếp →
          </button>
        )}
      </div>
    </div>
  );
}
