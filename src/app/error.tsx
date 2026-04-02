'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h1 className="text-2xl font-bold text-white mb-3">Đã xảy ra lỗi</h1>
        <p className="text-white/50 mb-8">Có lỗi không mong muốn. Vui lòng thử lại.</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors"
        >
          Thử lại
        </button>
      </div>
    </div>
  );
}
