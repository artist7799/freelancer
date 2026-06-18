import React from 'react';
import {
  Hero,
  PopularDestinations,
  StudentHelpDesk,
  FeaturedColleges,
  TopCourses,
  PlacementUniversities,
  AdmissionBanners,
  ScholarshipsList,
  ExamsTimeline,
  StudentServices,
  CareerRoadmapsSection,
  TestimonialsCarousel,
  BlogsSection,
  FAQSection,
  CTA
} from '../components/sections/HomeSections';

export const Home: React.FC = () => {
  return (
    <div className="relative w-full">
      <Hero />
      <PopularDestinations />
      <StudentHelpDesk />
      <TopCourses />
      <PlacementUniversities />
      <AdmissionBanners />
      <FeaturedColleges />
      <ScholarshipsList />
      <ExamsTimeline />
      <StudentServices />
      <CareerRoadmapsSection />
      <TestimonialsCarousel />
      <BlogsSection />
      <FAQSection />
      <CTA />
    </div>
  );
};
export default Home;
