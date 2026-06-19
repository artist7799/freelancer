import { Request, Response, NextFunction } from 'express';
import { SavedCollege } from '../models/SavedCollege';
import { College } from '../models/College';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const saveCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collegeId } = req.body;
  const userId = req.user?.id;

  // Find college
  let college = await College.findOne({ slug: collegeId });
  if (!college && collegeId.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(collegeId);
  }
  if (!college) {
    return next(new AppError('College not found', 404));
  }

  // Check if already saved
  const existingSave = await SavedCollege.findOne({
    userId,
    collegeId: college._id,
  });

  if (existingSave) {
    return res.status(200).json({
      status: 'success',
      message: 'College already saved in your shortlist',
    });
  }

  await SavedCollege.create({
    userId,
    collegeId: college._id,
  });

  res.status(201).json({
    status: 'success',
    message: `${college.name || college.collegeName} added to your shortlist successfully!`,
  });
});

export const unsaveCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collegeId } = req.params;
  const userId = req.user?.id;

  let college = await College.findOne({ slug: collegeId });
  if (!college && collegeId.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(collegeId);
  }
  if (!college) {
    return next(new AppError('College not found', 404));
  }

  const result = await SavedCollege.findOneAndDelete({
    userId,
    collegeId: college._id,
  });

  if (!result) {
    return next(new AppError('College was not in your shortlist', 400));
  }

  res.status(200).json({
    status: 'success',
    message: `${college.name || college.collegeName} removed from your shortlist successfully!`,
  });
});

export const getSavedColleges = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id;

  const savedList = await SavedCollege.find({ userId })
    .populate({
      path: 'collegeId',
      select: 'name collegeName slug logo banner location city state rating fees averagePackage placements ranking establishedYear courses category',
    });

  const formattedColleges = savedList
    .filter(item => item.collegeId !== null)
    .map(item => {
      const col = item.collegeId as any;
      return {
        id: col.slug,
        name: col.name || col.collegeName,
        location: col.location || `${col.city}, ${col.state}`,
        rating: col.rating || 4.0,
        fees: col.fees,
        placements: col.placements || `${col.averagePackage} Average`,
        ranking: col.ranking || `#${col.nirfRanking || col.establishedYear} in NIRF`,
        logo: col.logo,
        image: col.banner,
        category: col.category,
        courses: col.courses,
      };
    });

  res.status(200).json({
    status: 'success',
    results: formattedColleges.length,
    data: {
      colleges: formattedColleges,
    },
  });
});
