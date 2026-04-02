import { getFeaturedCourses } from '@/lib/db/courses';
import { getFeaturedTestimonials } from '@/lib/db/testimonials';
import { getFeaturedFreeResources } from '@/lib/db/free-resources';
import { HeroSection } from '@/components/home/hero-section';
import { Program2026Section } from '@/components/home/program-2026-section';
import { FeaturedCoursesSection } from '@/components/home/featured-courses-section';
import { WhyChooseSection } from '@/components/home/why-choose-section';
import { RoadmapSection } from '@/components/home/roadmap-section';
import { TestimonialsSection } from '@/components/home/testimonials-section';
import { FreeCoursesPreviewSection } from '@/components/home/free-courses-preview-section';
import { CtaSection } from '@/components/home/cta-section';

export default async function HomePage() {
  // Parallel data fetch — falls back to hardcoded data if DB not seeded
  const [courses, testimonials, freeResources] = await Promise.all([
    getFeaturedCourses(),
    getFeaturedTestimonials(),
    getFeaturedFreeResources(),
  ]);

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
