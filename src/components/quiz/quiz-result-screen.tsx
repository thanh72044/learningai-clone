'use client';

interface Props {
  score: number;
  passed: boolean;
  correctCount: number;
  totalCount: number;
  onRetry: () => void;
  onClose: () => void;
}

export function QuizResultScreen({ score, passed, correctCount, totalCount, onRetry, onClose }: Props) {
  return (
    <div className="flex flex-col items-center text-center gap-5 py-4">
      <div className="text-6xl">{passed ? '🎉' : '💪'}</div>
      <div>
        <h3 className={`text-2xl font-bold ${passed ? 'text-emerald-400' : 'text-white'}`}>
          {passed ? 'Hoàn thành!' : 'Chưa đạt'}
        </h3>
        <p className="text-white/60 text-sm mt-1">
          {passed
            ? 'Bài học đã được đánh dấu hoàn thành.'
            : 'Cần ≥ 70% để vượt qua. Thử lại nhé!'}
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-2">
        <div className="text-5xl font-bold text-white">{score}%</div>
        <p className="text-xs text-white/50">
          {correctCount}/{totalCount} câu đúng
        </p>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full transition-all ${passed ? 'bg-emerald-500' : 'bg-amber-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {!passed && (
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-semibold"
          >
            Làm lại
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className={`px-5 py-2 rounded-xl text-sm ${
            passed
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white font-semibold'
              : 'border border-white/20 text-white/60 hover:text-white'
          }`}
        >
          {passed ? 'Đóng' : 'Để sau'}
        </button>
      </div>
    </div>
  );
}
