import type { Metadata } from 'next';
import { getAllCourses } from '@/lib/db/courses';
import { CoursesClient } from './courses-client';

export const metadata: Metadata = {
  title: 'Khóa Học AI',
  description: 'Khám phá 50+ khóa học AI thực chiến từ cơ bản đến nâng cao.',
};

// Uses Supabase server client which accesses cookies (auth session)
export const dynamic = 'force-dynamic';

export default async function CoursesPage() {
  const courses = await getAllCourses();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Khóa Học AI</h1>
        <div className="h-1 w-16 bg-emerald-400 rounded-full mb-4" />
        <p className="text-white/60">Chọn lộ trình phù hợp với mục tiêu của bạn</p>
      </div>
      <CoursesClient courses={courses} />
    </div>
  );
}
