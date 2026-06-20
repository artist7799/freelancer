import React from 'react';
import {
  Hero,
  PopularDestinations,
  StudentHelpDesk,
  TopCourses,
  DisciplinesSection,
  AdmissionBanners,
  FeaturedCollegesMockup,
  StudentChoiceColleges,
  TopCollegesList,
  PlacementVerifiedColleges,
  UpcomingExamsCarousel
} from '../components/sections/HomeSections';

export const Home: React.FC = () => {
  return (
    <div className="relative w-full">
      <Hero />
      <PopularDestinations />
      <DisciplinesSection />
      <StudentHelpDesk />
      <TopCourses />
      <AdmissionBanners />
      <FeaturedCollegesMockup />

      <StudentChoiceColleges />
      <TopCollegesList />
      <PlacementVerifiedColleges />
      <UpcomingExamsCarousel />
    </div>
  );
};
export default Home;
