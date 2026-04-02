import Link from 'next/link';
import { getUser } from '@/lib/auth/get-user';
import { getUserEnrollments } from '@/lib/db/enrollments';
import { getCourseProgress } from '@/lib/db/progress';

export default async function DashboardCoursesPage() {
  const user = await getUser();
  if (!user) return null;

  const enrollments = await getUserEnrollments(user.id);

  const coursesWithProgress = await Promise.all(
    enrollments.map(async (e) => {
      const course = (e as { courses: { id: string; title: string; slug: string; level: string | null } }).courses;
      const progress = await getCourseProgress(user.id, course.id);
      return { course, progress, enrolledAt: e.enrolled_at };
    })
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Khóa Học Của Tôi</h1>
        <span className="text-white/40 text-sm">{enrollments.length} khóa</span>
      </div>

      {coursesWithProgress.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-white/60 mb-4">Bạn chưa đăng ký khóa học nào.</p>
          <Link href="/courses" className="text-emerald-400 text-sm hover:underline">
            Xem khóa học →
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {coursesWithProgress.map(({ course, progress }) => (
            <Link key={course.id} href={`/dashboard/course/${course.slug}`}>
              <div className="rounded-2xl border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-colors p-5 flex flex-col sm:flex-row gap-4">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-2xl shrink-0">🤖</div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm leading-snug">{course.title}</h3>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-white/50 shrink-0 w-12 text-right">
                      {progress.completedCount}/{progress.totalCount}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">{progress.percentage}% hoàn thành</p>
                </div>

                {/* CTA */}
                <div className="shrink-0 self-center">
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    progress.percentage === 100
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-white/10 text-white/60'
                  }`}>
                    {progress.percentage === 100 ? '✓ Hoàn thành' : 'Tiếp tục →'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
