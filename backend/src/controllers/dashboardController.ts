import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { College } from '../models/College';
import { Course } from '../models/Course';
import { Exam } from '../models/Exam';
import { Scholarship } from '../models/Scholarship';
import { Application } from '../models/Application';
import { catchAsync } from '../utils/catchAsync';

export const getAdminStats = catchAsync(async (_req: Request, res: Response, _next: NextFunction) => {
  const [
    totalStudents,
    totalColleges,
    totalCourses,
    totalExams,
    totalScholarships,
    totalApplications,
  ] = await Promise.all([
    User.countDocuments({ role: 'student' }),
    College.countDocuments(),
    Course.countDocuments(),
    Exam.countDocuments(),
    Scholarship.countDocuments(),
    Application.countDocuments(),
  ]);

  // Aggregate application status breakdown
  const statusBreakdown = await Application.aggregate([
    {
      $group: {
        _id: '$applicationStatus',
        count: { $sum: 1 },
      },
    },
  ]);

  const statusMap = {
    pending: 0,
    submitted: 0,
    approved: 0,
    rejected: 0,
  };

  statusBreakdown.forEach(item => {
    if (item._id in statusMap) {
      statusMap[item._id as keyof typeof statusMap] = item.count;
    }
  });

  // Fetch recent applications
  const recentApplications = await Application.find()
    .populate({
      path: 'userId',
      select: 'fullName email phone',
    })
    .populate({
      path: 'collegeId',
      select: 'name collegeName slug logo',
    })
    .populate({
      path: 'courseId',
      select: 'name category',
    })
    .sort({ createdAt: -1 })
    .limit(5);

  res.status(200).json({
    status: 'success',
    data: {
      stats: {
        totalStudents,
        totalColleges,
        totalCourses,
        totalExams,
        totalScholarships,
        totalApplications,
        applicationStatusBreakdown: statusMap,
      },
      recentApplications,
    },
  });
});
