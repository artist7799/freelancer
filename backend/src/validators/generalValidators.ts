import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const courseSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Course name must be at least 2 characters'),
    category: z.string().min(2, 'Category is required'),
    duration: z.string().min(1, 'Duration is required'),
    eligibility: z.string().min(3, 'Eligibility description is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    averageFees: z.string().min(1, 'Average fees is required'),
    careerOptions: z.array(z.string()).optional(),
  }),
});

export const examSchema = z.object({
  body: z.object({
    examName: z.string().min(2, 'Exam name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    eligibility: z.string().min(3, 'Eligibility is required'),
    applicationStartDate: z.string().datetime({ message: 'Invalid start date format (ISO DateTime required)' }),
    applicationEndDate: z.string().datetime({ message: 'Invalid end date format (ISO DateTime required)' }),
    examDate: z.string().datetime({ message: 'Invalid exam date format (ISO DateTime required)' }),
    resultDate: z.string().datetime({ message: 'Invalid result date format (ISO DateTime required)' }),
    conductingBody: z.string().min(2, 'Conducting body is required'),
  }),
});

export const scholarshipSchema = z.object({
  body: z.object({
    scholarshipName: z.string().min(3, 'Scholarship name must be at least 3 characters'),
    provider: z.string().min(2, 'Provider is required'),
    amount: z.string().min(1, 'Amount details are required'),
    eligibility: z.string().min(3, 'Eligibility criteria is required'),
    deadline: z.string().datetime({ message: 'Invalid deadline date format (ISO DateTime required)' }),
    description: z.string().min(10, 'Description must be at least 10 characters'),
  }),
});

export const blogSchema = z.object({
  body: z.object({
    title: z.string().min(5, 'Title must be at least 5 characters'),
    content: z.string().min(20, 'Content must be at least 20 characters'),
    image: z.string().optional(),
    author: z.string().min(2, 'Author name is required'),
    category: z.string().min(2, 'Category is required'),
    tags: z.array(z.string()).optional(),
  }),
});

export const applicationSchema = z.object({
  body: z.object({
    collegeId: z.string().regex(objectIdRegex, 'Invalid College ID format'),
    courseId: z.string().regex(objectIdRegex, 'Invalid Course ID format'),
  }),
});
