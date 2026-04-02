import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-emerald-950 flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-black text-emerald-500/20 mb-4">404</p>
        <h1 className="text-2xl font-bold text-white mb-3">Trang Không Tìm Thấy</h1>
        <p className="text-white/50 mb-8">Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-colors"
        >
          ← Về Trang Chủ
        </Link>
      </div>
    </div>
  );
}
