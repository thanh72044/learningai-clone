import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCourseBySlug, getLessonsByCourse } from '@/lib/db/courses';
import { LevelBadge } from '@/components/ui/level-badge';
import { StarRating } from '@/components/ui/star-rating';
import { Button } from '@/components/ui/button';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: 'Khóa Học Không Tìm Thấy' };
  return { title: course.title, description: course.description ?? undefined };
}

function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const [course, lessons] = await Promise.all([
    getCourseBySlug(slug),
    getCourseBySlug(slug).then((c) => c ? getLessonsByCourse(c.id) : []),
  ]);

  if (!course) notFound();

  const instructor = (course as { instructors?: { name: string; bio: string | null; avatar_url: string | null } }).instructors;
  const totalMinutes = lessons.reduce((sum, l) => sum + (l.duration_minutes ?? 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Header */}
          <div>
            <LevelBadge level={course.level} className="mb-3" />
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">{course.title}</h1>
            {course.description && (
              <p className="text-white/60 leading-relaxed">{course.description}</p>
            )}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <StarRating rating={course.rating} count={course.rating_count} />
              <span className="text-white/40 text-sm">👥 {course.student_count.toLocaleString()} học viên</span>
              {totalMinutes > 0 && (
                <span className="text-white/40 text-sm">⏱ {Math.round(totalMinutes / 60)} giờ nội dung</span>
              )}
            </div>
          </div>

          {/* Instructor */}
          {instructor && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg shrink-0">
                {instructor.name[0]}
              </div>
              <div>
                <p className="text-white font-semibold">{instructor.name}</p>
                {instructor.bio && <p className="text-white/50 text-sm mt-1">{instructor.bio}</p>}
              </div>
            </div>
          )}

          {/* Syllabus */}
          {lessons.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Nội Dung Khóa Học</h2>
              <div className="rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/10">
                {lessons.map((lesson, i) => (
                  <div key={lesson.id} className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/8 transition-colors">
                    <span className="text-white/30 text-sm w-6 shrink-0">{i + 1}</span>
                    <span className="flex-1 text-white/80 text-sm">{lesson.title}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      {lesson.is_preview && (
                        <span className="text-xs text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">Xem thử</span>
                      )}
                      {lesson.duration_minutes && (
                        <span className="text-xs text-white/30">{lesson.duration_minutes} phút</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky sidebar — price + enroll */}
        <div className="lg:col-span-1">
          <div className="sticky top-20 rounded-2xl border border-white/10 bg-emerald-900/30 overflow-hidden">
            {/* Thumbnail */}
            <div className="relative w-full aspect-video bg-emerald-900/50">
              {course.thumbnail_url ? (
                <Image src={course.thumbnail_url} alt={course.title} fill className="object-cover" sizes="400px" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-5xl">🤖</div>
              )}
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <span className="text-3xl font-bold text-emerald-400">{formatVND(course.price)}</span>
                {course.original_price && course.original_price > course.price && (
                  <span className="text-white/30 text-sm line-through ml-2">{formatVND(course.original_price)}</span>
                )}
              </div>
              <Link href="/auth/signup">
                <Button variant="primary" size="lg" className="w-full">Đăng Ký Học Ngay</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="md" className="w-full">Đã có tài khoản? Đăng nhập</Button>
              </Link>
              <ul className="space-y-2 text-sm text-white/50 pt-2 border-t border-white/10">
                <li>✓ Truy cập trọn đời</li>
                <li>✓ Học mọi lúc, mọi nơi</li>
                <li>✓ Chứng chỉ hoàn thành</li>
                <li>✓ Hỗ trợ cộng đồng 24/7</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
