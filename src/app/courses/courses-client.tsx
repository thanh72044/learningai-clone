'use client';

import { useState } from 'react';
import { CourseCard } from '@/components/course-card';
import { LevelBadge } from '@/components/ui/level-badge';
import type { Course } from '@/types/database.types';

const LEVELS = ['all', 'beginner', 'intermediate', 'advanced', 'developer'] as const;

interface CoursesClientProps {
  courses: Course[];
}

/** Client component handling level filter UI */
export function CoursesClient({ courses }: CoursesClientProps) {
  const [activeLevel, setActiveLevel] = useState<string>('all');

  const filtered = activeLevel === 'all'
    ? courses
    : courses.filter((c) => c.level === activeLevel);

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {LEVELS.map((level) => (
          <button
            key={level}
            onClick={() => setActiveLevel(level)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              activeLevel === level
                ? 'bg-emerald-500 border-emerald-500 text-white'
                : 'border-white/20 text-white/60 hover:border-emerald-500/50 hover:text-white'
            }`}
          >
            {level === 'all' ? 'Tất Cả' : <LevelBadge level={level} />}
          </button>
        ))}
        <span className="ml-auto text-sm text-white/40 self-center">
          {filtered.length} khóa học
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-white/40 py-16">Không có khóa học nào.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}
