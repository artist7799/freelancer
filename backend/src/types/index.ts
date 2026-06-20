import { Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  role: 'student' | 'admin';
  profileImage: string;
  city: string;
  state: string;
  country: string;
  isVerified: boolean;
  otp: string | null;
  otpExpiry: Date | null;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

export interface ICollegeCourse {
  name: string;
  fees: string;
  seats: number;
}

export interface IPlacementDetail {
  company: string;
  package: string;
}

export interface ICollegeScholarship {
  name: string;
  criteria: string;
  amount: string;
}

export interface IHostelDetail {
  type: string;
  sharing: string;
  fees: string;
}

export interface IReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

export interface IFAQItem {
  q: string;
  a: string;
}

export interface ICollege extends Document {
  collegeName: string;
  slug: string;
  logo: string;
  banner: string;
  description: string;
  city: string;
  state: string;
  country: string;
  ranking: string;
  nirfRanking: number;
  accreditation: string;
  establishedYear: number;
  fees: string;
  placementPercentage: number;
  averagePackage: string;
  highestPackage: string;
  website: string;
  images: string[];
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
  
  // Frontend alignment fields
  name: string;
  location: string;
  rating: number;
  placements: string;
  category: string;
  about: string;
  courses: ICollegeCourse[];
  placementDetails: IPlacementDetail[];
  scholarships: ICollegeScholarship[];
  hostels: IHostelDetail[];
  gallery: string[];
  reviews: IReview[];
  faq: IFAQItem[];
  infrastructure: string[];
  
  // Placement & Contact redone fields
  totalOffers?: number;
  companyVisiting?: number;
  highestInternationalPackage?: string;
  phone?: string;
  address?: string;
  email?: string;
}

export interface ICourse extends Document {
  name: string;
  category: string;
  duration: string;
  eligibility: string;
  description: string;
  averageFees: string;
  careerOptions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IExam extends Document {
  examName: string;
  description: string;
  eligibility: string;
  applicationStartDate: Date;
  applicationEndDate: Date;
  examDate: Date;
  resultDate: Date;
  conductingBody: string;
  createdAt: Date;
  updatedAt: Date;

  // Frontend alignment fields
  slug: string;
  fullName: string;
  category: string;
  mode: 'online' | 'offline' | 'both';
  courses: string[];
  syllabus: string[];
  pattern: string;
  difficulty: string;
}

export interface IScholarship extends Document {
  scholarshipName: string;
  provider: string;
  amount: string;
  eligibility: string;
  deadline: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  // Frontend alignment fields
  slug: string;
  type: string;
  details: string;
}

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;

  // Frontend alignment fields
  excerpt: string;
  readTime: string;
}

export interface IApplication extends Document {
  userId: SchemaIdType;
  collegeId: SchemaIdType;
  courseId: SchemaIdType;
  applicationStatus: 'pending' | 'submitted' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface ISavedCollege extends Document {
  userId: SchemaIdType;
  collegeId: SchemaIdType;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComparedCollege extends Document {
  userId: SchemaIdType;
  collegeIds: SchemaIdType[];
  createdAt: Date;
  updatedAt: Date;
}

type SchemaIdType = any; // Will resolve cleanly in models

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

