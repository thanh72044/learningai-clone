import { getFeaturedCourses } from '@/lib/db/courses';
import { getFeaturedTestimonials } from '@/lib/db/testimonials';
import { getFeaturedFreeResources } from '@/lib/db/free-resources';
import type { Course, Testimonial, FreeResource } from '@/types/database.types';
import { HeroSection } from '@/components/home/hero-section';
import { Program2026Section } from '@/components/home/program-2026-section';
import { FeaturedCoursesSection } from '@/components/home/featured-courses-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { RoadmapSection } from '@/components/home/roadmap-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { FreeCoursesPreviewSection } from '@/components/home/free-courses-preview-section';
import { CtaSection } from '@/components/home/cta-section';

// This route uses Supabase server client which accesses cookies (auth session management)
// Mark as dynamic to avoid static rendering conflicts
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let courses: Course[] = [];
  let testimonials: Testimonial[] = [];
  let freeResources: FreeResource[] = [];

  try {
    // Parallel data fetch — falls back to hardcoded data if DB not seeded
    [courses, testimonials, freeResources] = await Promise.all([
      getFeaturedCourses(),
      getFeaturedTestimonials(),
      getFeaturedFreeResources(),
    ]);
  } catch (error) {
    console.error('HomePage data fetch error:', error);
    // Continue with empty arrays - components handle empty state
  }

  return (
    <>
      <HeroSection />
      <Program2026Section />
      <FeaturedCoursesSection courses={courses} />
      <WhyChooseSection />
      <RoadmapSection />
      <TestimonialsSection testimonials={testimonials} />
      <FreeCoursesPreviewSection resources={freeResources} />
      <CtaSection />
    </>
  );
}
