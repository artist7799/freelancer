import { Request, Response, NextFunction } from 'express';
import { Application } from '../models/Application';
import { College } from '../models/College';
import { Course } from '../models/Course';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const submitApplication = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collegeId, courseId } = req.body;
  const userId = req.user?.id;

  // Verify college exists (accepts Mongo ID or slug)
  let college = await College.findOne({ slug: collegeId });
  if (!college && collegeId.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(collegeId);
  }
  if (!college) {
    return next(new AppError('College not found', 404));
  }

  // Verify course exists (accepts Mongo ID or course name)
  let course = await Course.findOne({ name: courseId });
  if (!course && courseId.match(/^[0-9a-fA-F]{24}$/)) {
    course = await Course.findById(courseId);
  }
  if (!course) {
    // If not found in standalone Courses, let's check if it exists on the college's course list
    const hasCourseOnCollege = college.courses.some(c => c.name.toLowerCase() === courseId.toLowerCase());
    if (!hasCourseOnCollege) {
      return next(new AppError('Course not offered at this college', 404));
    }
    // Create or mock a course reference or just use a generic course ID
    // If the course doesn't exist in the database standalone Course, we will throw error or auto-create it
    return next(new AppError(`Course '${courseId}' not found`, 404));
  }

  // Check for duplicate application
  const existingApp = await Application.findOne({
    userId,
    collegeId: college._id,
    courseId: course._id,
  });

  if (existingApp) {
    return next(new AppError('You have already applied for this course at this college.', 400));
  }

  const application = await Application.create({
    userId,
    collegeId: college._id,
    courseId: course._id,
    applicationStatus: 'submitted',
  });

  res.status(201).json({
    status: 'success',
    message: `Application for ${college.name} - ${course.name} submitted successfully!`,
    data: {
      application,
    },
  });
});

export const getMyApplications = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id;

  const applications = await Application.find({ userId })
    .populate({
      path: 'collegeId',
      select: 'name collegeName slug logo location city state banner',
    })
    .populate({
      path: 'courseId',
      select: 'name category duration',
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications,
    },
  });
});

export const getAllApplications = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const applications = await Application.find()
    .populate({
      path: 'userId',
      select: 'fullName email phone profileImage city state',
    })
    .populate({
      path: 'collegeId',
      select: 'name collegeName slug logo location city state',
    })
    .populate({
      path: 'courseId',
      select: 'name category',
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: 'success',
    results: applications.length,
    data: {
      applications,
    },
  });
});

export const updateApplicationStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'submitted', 'approved', 'rejected'].includes(status)) {
    return next(new AppError('Invalid application status value', 400));
  }

  const application = await Application.findByIdAndUpdate(
    id,
    { applicationStatus: status },
    { new: true, runValidators: true }
  );

  if (!application) {
    return next(new AppError('Application record not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Application status updated to '${status}' successfully.`,
    data: {
      application,
    },
  });
});
