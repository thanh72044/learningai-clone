import Link from 'next/link';
import { Button } from '@/components/ui/button';

/** Bottom CTA — community join + trust badge */
export function CtaSection() {
  return (
    <section className="py-20 bg-emerald-950/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Card */}
        <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-emerald-950/80 p-10 md:p-16">
          <span className="text-5xl mb-6 block">🚀</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Sẵn Sàng Làm Chủ AI?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Gia nhập cộng đồng 2000+ học viên đang thay đổi sự nghiệp với AI.
            Bắt đầu hành trình của bạn ngay hôm nay.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg">Đăng Ký Ngay — Miễn Phí</Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg">Xem Khóa Học</Button>
            </Link>
          </div>

          {/* Trust badge */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <span>✓ Không cần thẻ tín dụng</span>
            <span>✓ Học thử miễn phí</span>
            <span>✓ Hủy bất cứ lúc nào</span>
          </div>
        </div>
      </div>
    </section>
  );
}
