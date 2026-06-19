import { Request, Response, NextFunction } from 'express';
import { Course } from '../models/Course';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const getAllCourses = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const query: any = {};

  if (req.query.search) {
    const searchVal = String(req.query.search);
    query.$or = [
      { name: { $regex: searchVal, $options: 'i' } },
      { category: { $regex: searchVal, $options: 'i' } },
      { description: { $regex: searchVal, $options: 'i' } },
    ];
  }

  if (req.query.category) {
    query.category = { $regex: `^${req.query.category}$`, $options: 'i' };
  }

  const courses = await Course.find(query);

  res.status(200).json({
    status: 'success',
    results: courses.length,
    data: {
      courses,
    },
  });
});

export const getCourseById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findById(id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      course,
    },
  });
});

export const createCourse = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const course = await Course.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Course created successfully',
    data: {
      course,
    },
  });
});

export const updateCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Course updated successfully',
    data: {
      course,
    },
  });
});

export const deleteCourse = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const course = await Course.findByIdAndDelete(id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Course deleted successfully',
  });
});
