import { getUser } from '@/lib/auth/get-user';
import { createClient } from '@/lib/supabase/server';

async function getUserCertificates(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('certificates')
    .select('*, courses(title, slug, level)')
    .eq('user_id', userId)
    .order('issued_at', { ascending: false });
  return data ?? [];
}

export default async function CertificatesPage() {
  const user = await getUser();
  if (!user) return null;

  const certificates = await getUserCertificates(user.id);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Chứng Chỉ Của Tôi</h1>
        <p className="text-white/50 text-sm mt-1">
          Hoàn thành 100% khóa học để nhận chứng chỉ
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 p-12 text-center">
          <p className="text-5xl mb-4">🏆</p>
          <h3 className="text-white font-semibold mb-2">Chưa có chứng chỉ nào</h3>
          <p className="text-white/50 text-sm">
            Hoàn thành tất cả bài học trong một khóa học để nhận chứng chỉ.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => {
            const course = (cert as { courses: { title: string; slug: string; level: string | null } }).courses;
            const issuedDate = new Date(cert.issued_at).toLocaleDateString('vi-VN', {
              day: '2-digit', month: '2-digit', year: 'numeric',
            });
            return (
              <div
                key={cert.id}
                className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-emerald-950/80 p-6 flex flex-col gap-3"
              >
                {/* Header */}
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
                      Chứng Chỉ Hoàn Thành
                    </p>
                    <p className="text-white/40 text-xs">Cấp ngày {issuedDate}</p>
                  </div>
                </div>

                {/* Course title */}
                <h3 className="text-white font-semibold leading-snug">{course.title}</h3>

                {/* Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/40">LearningAI · AI ECOSYSTEM</span>
                  <span className="text-xs text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    ✓ Đã xác thực
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
