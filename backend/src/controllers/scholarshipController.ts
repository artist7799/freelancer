import { Request, Response, NextFunction } from 'express';
import { Scholarship } from '../models/Scholarship';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const getAllScholarships = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const query: any = {};

  if (req.query.search) {
    const searchVal = String(req.query.search);
    query.$or = [
      { scholarshipName: { $regex: searchVal, $options: 'i' } },
      { provider: { $regex: searchVal, $options: 'i' } },
      { description: { $regex: searchVal, $options: 'i' } },
      { type: { $regex: searchVal, $options: 'i' } },
    ];
  }

  if (req.query.type) {
    query.type = { $regex: `^${req.query.type}$`, $options: 'i' };
  }

  const scholarships = await Scholarship.find(query);

  const formattedScholarships = scholarships.map(sch => ({
    id: sch.slug, // Frontend expects slug as id
    name: sch.scholarshipName,
    amount: sch.amount,
    eligibility: sch.eligibility,
    deadline: sch.deadline.toISOString().split('T')[0],
    provider: sch.provider,
    type: sch.type,
    details: sch.details || sch.description,
  }));

  res.status(200).json({
    status: 'success',
    results: formattedScholarships.length,
    data: {
      scholarships: formattedScholarships,
    },
  });
});

export const getScholarshipBySlugOrId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  let scholarship = await Scholarship.findOne({ slug: idOrSlug });

  if (!scholarship && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    scholarship = await Scholarship.findById(idOrSlug);
  }

  if (!scholarship) {
    return next(new AppError('Scholarship not found', 404));
  }

  const formattedScholarship = {
    id: scholarship.slug,
    name: scholarship.scholarshipName,
    amount: scholarship.amount,
    eligibility: scholarship.eligibility,
    deadline: scholarship.deadline.toISOString().split('T')[0],
    provider: scholarship.provider,
    type: scholarship.type,
    details: scholarship.details || scholarship.description,
  };

  res.status(200).json({
    status: 'success',
    data: {
      scholarship: formattedScholarship,
    },
  });
});

export const createScholarship = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const scholarship = await Scholarship.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Scholarship created successfully',
    data: {
      scholarship,
    },
  });
});

export const updateScholarship = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const scholarship = await Scholarship.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!scholarship) {
    return next(new AppError('Scholarship not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Scholarship updated successfully',
    data: {
      scholarship,
    },
  });
});

export const deleteScholarship = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const scholarship = await Scholarship.findByIdAndDelete(id);

  if (!scholarship) {
    return next(new AppError('Scholarship not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Scholarship deleted successfully',
  });
});
