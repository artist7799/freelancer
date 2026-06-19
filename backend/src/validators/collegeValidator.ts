import { z } from 'zod';

export const collegeSchema = z.object({
  body: z.object({
    collegeName: z.string().min(3, 'College name must be at least 3 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    country: z.string().optional(),
    ranking: z.string().optional(),
    nirfRanking: z.number().optional().nullable(),
    accreditation: z.string().optional(),
    establishedYear: z.number().int().min(1800).max(new Date().getFullYear()),
    courses: z.array(z.string()).min(1, 'At least one course must be provided'),
    fees: z.string().min(1, 'Fees details are required'),
    placementPercentage: z.number().min(0).max(100).optional().nullable(),
    averagePackage: z.string().optional(),
    highestPackage: z.string().optional(),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    images: z.array(z.string()).optional(),
    facilities: z.array(z.string()).optional(),
  }),
});
