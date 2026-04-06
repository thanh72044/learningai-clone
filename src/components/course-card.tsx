import Link from 'next/link';
import Image from 'next/image';
import { LevelBadge } from '@/components/ui/level-badge';
import { StarRating } from '@/components/ui/star-rating';
import { Card } from '@/components/ui/card';
import type { Course } from '@/types/database.types';

interface CourseCardProps {
  course: Course;
}

/** Format VND price — e.g. 1990000 → "1.990.000 ₫" */
function formatVND(amount: number) {
  return amount.toLocaleString('vi-VN') + ' ₫';
}

/** Reusable course card used on homepage + courses listing */
export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/course/${course.slug}`}>
      <Card className="group card-hover overflow-hidden h-full flex flex-col cursor-pointer">
        {/* Thumbnail */}
        <div className="relative w-full aspect-video bg-emerald-900/50 overflow-hidden">
          {course.thumbnail_url ? (
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <LevelBadge level={course.level} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          <h3 className="font-semibold text-white text-base leading-snug line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-sm text-white/50 line-clamp-2">{course.description}</p>
          )}

          <div className="mt-auto flex flex-col gap-2">
            <StarRating rating={course.rating} count={course.rating_count} />

            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>👥 {course.student_count.toLocaleString()} học viên</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-emerald-400 font-bold text-lg">
                {formatVND(course.price)}
              </span>
              {course.original_price && course.original_price > course.price && (
                <span className="text-white/40 text-sm line-through">
                  {formatVND(course.original_price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
