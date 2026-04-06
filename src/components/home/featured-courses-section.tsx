'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { CoursesCarousel } from '@/components/home/courses-carousel';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Course } from '@/types/database.types';

interface FeaturedCoursesSectionProps {
  courses: Course[];
}

/** Featured courses horizontal carousel — data fetched server-side in page.tsx */
export function FeaturedCoursesSection({ courses }: FeaturedCoursesSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <SectionHeader
            title="Khóa Học Nổi Bật"
            subtitle="Được hàng ngàn học viên tin tưởng — thực chiến, cập nhật liên tục"
          />
        </motion.div>

        <CoursesCarousel courses={courses} />

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          <Link href="/courses">
            <Button variant="outline" size="lg">Xem Tất Cả Khóa Học</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
