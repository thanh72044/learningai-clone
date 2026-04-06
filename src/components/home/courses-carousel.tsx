'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CourseCard } from '@/components/course-card';
import type { Course } from '@/types/database.types';

interface CoursesCarouselProps {
  courses: Course[];
}

/** Horizontal scroll carousel with animated cards and prev/next arrows */
export function CoursesCarousel({ courses }: CoursesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update arrow visibility based on scroll position
  function updateArrows() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => el.removeEventListener('scroll', updateArrows);
  }, [courses]);

  function scrollBy(offset: number) {
    scrollRef.current?.scrollBy({ left: offset, behavior: 'smooth' });
  }

  if (courses.length === 0) {
    return <p className="text-center text-white/40 py-12">Chưa có khóa học nào.</p>;
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-340)}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-900 transition-colors shadow-lg"
        >
          ‹
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            className="shrink-0 w-[300px] sm:w-[340px]"
            style={{ scrollSnapAlign: 'start' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
          >
            <CourseCard course={course} />
          </motion.div>
        ))}
      </div>

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scrollBy(340)}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center hover:bg-emerald-900 transition-colors shadow-lg"
        >
          ›
        </button>
      )}
    </div>
  );
}
