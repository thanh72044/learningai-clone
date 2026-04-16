import { notFound, redirect } from 'next/navigation';
import { getUser } from '@/lib/auth/get-user';
import { getCourseBySlug, getLessonsByCourse } from '@/lib/db/courses';
import { isEnrolled, enroll } from '@/lib/db/enrollments';
import { getCourseProgress } from '@/lib/db/progress';
import { LessonList } from './lesson-list';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DashboardCoursePage({ params }: Props) {
  const { slug } = await params;
  const user = await getUser();
  if (!user) redirect('/auth/login');

  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  const enrolled = await isEnrolled(user.id, course.id);
  if (!enrolled) {
    // Auto-enroll free courses (price === 0), otherwise redirect
    if (course.price === 0) {
      await enroll(user.id, course.id);
    } else {
      redirect(`/course/${slug}`);
    }
  }

  const [lessons, progress] = await Promise.all([
    getLessonsByCourse(course.id),
    getCourseProgress(user.id, course.id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white leading-snug">{course.title}</h1>
        <div className="flex items-center gap-3 mt-2">
          <div className="flex-1 max-w-xs h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <span className="text-sm text-white/50">
            {progress.completedCount}/{progress.totalCount} bài · {progress.percentage}%
          </span>
        </div>
      </div>

      {/* Completion badge */}
      {progress.percentage === 100 && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <div>
            <p className="text-emerald-400 font-semibold">Bạn đã hoàn thành khóa học!</p>
            <p className="text-white/50 text-sm">Chứng chỉ đã được cấp trong mục Chứng Chỉ.</p>
          </div>
        </div>
      )}

      {/* Lesson list (client component for marking complete) */}
      <LessonList
        lessons={lessons}
        completedLessonIds={Array.from(progress.completedLessonIds)}
        courseId={course.id}
      />
    </div>
  );
}
