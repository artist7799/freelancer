export interface Course {
  name: string;
  fees: string;
  seats: number;
}

export interface PlacementDetail {
  company: string;
  package: string;
}

export interface CollegeScholarship {
  name: string;
  criteria: string;
  amount: string;
}

export interface HostelDetail {
  type: string;
  sharing: string;
  fees: string;
}

export interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  rating: number;
  fees: string;
  placements: string;
  ranking: string;
  logo: string;
  image: string;
  category: string;
  about: string;
  courses: Course[];
  placementDetails: PlacementDetail[];
  scholarships: CollegeScholarship[];
  hostels: HostelDetail[];
  gallery: string[];
  reviews: Review[];
  faq: FAQItem[];
  infrastructure: string[];
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  date: string;
  registrationDeadline: string;
  eligibility: string;
  category: string;
  syllabus: string[];
  pattern: string;
  difficulty: string;
  description: string;
}

export interface Scholarship {
  id: string;
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  provider: string;
  type: string;
  details: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  skills: string[];
}

export interface CareerRoadmap {
  id: string;
  title: string;
  salary: string;
  demand: string;
  skills: string[];
  steps: RoadmapStep[];
  description: string;
}

export interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  readTime: string;
}
