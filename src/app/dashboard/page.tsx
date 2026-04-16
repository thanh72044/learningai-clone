import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';
import { getUserEnrollments } from '@/lib/db/enrollments';
import { getCourseProgress } from '@/lib/db/progress';
import { createClient } from '@/lib/supabase/server';

async function getCertificateCount(userId: string) {
  const supabase = await createClient();
  const { count } = await supabase
    .from('certificates')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);
  return count ?? 0;
}

export default async function DashboardPage() {
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const [enrollments, certCount] = await Promise.all([
    getUserEnrollments(user.id),
    getCertificateCount(user.id),
  ]);

  // Get progress for each enrolled course
  const progressData = await Promise.all(
    enrollments.slice(0, 3).map(async (e) => {
      const course = (e as { courses: { id: string; title: string; slug: string } }).courses;
      const progress = await getCourseProgress(user.id, course.id);
      return { course, progress };
    })
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Xin Chào! 👋</h1>
        <p className="text-white/50 mt-1">Tiếp tục hành trình học AI của bạn</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Khóa Học Đã Đăng Ký', value: enrollments.length, icon: '📚' },
          { label: 'Chứng Chỉ Đã Đạt', value: certCount, icon: '🏆' },
          { label: 'Ngày Học', value: '–', icon: '🔥' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-white/50 text-sm">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent courses */}
      {progressData.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">Tiếp Tục Học</h2>
          <div className="flex flex-col gap-3">
            {progressData.map(({ course, progress }) => (
              <Link key={course.id} href={`/dashboard/course/${course.slug}`}>
                <div className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors p-4 flex items-center gap-4">
                  <div className="text-2xl">🤖</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{course.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${progress.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs text-white/40 shrink-0">{progress.percentage}%</span>
                    </div>
                  </div>
                  <span className="text-white/30 text-sm shrink-0">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {enrollments.length === 0 && (
        <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center">
          <p className="text-4xl mb-3">🎯</p>
          <h3 className="text-white font-semibold mb-2">Bắt đầu học ngay</h3>
          <p className="text-white/50 text-sm mb-4">Bạn chưa đăng ký khóa học nào.</p>
          <Link href="/courses" className="text-emerald-400 text-sm hover:underline">
            Khám phá khóa học →
          </Link>
        </div>
      )}
    </div>
  );
}
