import { SectionHeader } from '@/components/ui/section-header';
import { CourseCard } from '@/components/course-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Course } from '@/types/database.types';

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

/** Featured courses grid — data fetched server-side in page.tsx */
export function FeaturedCoursesSection({ courses }: FeaturedCoursesSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Khóa Học Nổi Bật"
          subtitle="Được hàng ngàn học viên tin tưởng — thực chiến, cập nhật liên tục"
        />

        {courses.length === 0 ? (
          <p className="text-center text-white/40 py-12">Chưa có khóa học nào.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/courses">
            <Button variant="outline" size="lg">Xem Tất Cả Khóa Học</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
