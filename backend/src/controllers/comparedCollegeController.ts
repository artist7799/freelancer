import { Request, Response, NextFunction } from 'express';
import { ComparedCollege } from '../models/ComparedCollege';
import { College } from '../models/College';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const addToCompare = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collegeId } = req.body;
  const userId = req.user?.id;

  let college = await College.findOne({ slug: collegeId });
  if (!college && collegeId.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(collegeId);
  }
  if (!college) {
    return next(new AppError('College not found', 404));
  }

  let basket = await ComparedCollege.findOne({ userId });
  if (!basket) {
    basket = await ComparedCollege.create({
      userId,
      collegeIds: [],
    });
  }

  // Limit comparison to 3 colleges
  if (basket.collegeIds.length >= 3 && !basket.collegeIds.includes(college._id)) {
    return next(new AppError('You can compare a maximum of 3 colleges at a time.', 400));
  }

  if (!basket.collegeIds.includes(college._id)) {
    basket.collegeIds.push(college._id);
    await basket.save();
  }

  res.status(200).json({
    status: 'success',
    message: `${college.name || college.collegeName} added to comparison basket successfully.`,
  });
});

export const removeFromCompare = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { collegeId } = req.params;
  const userId = req.user?.id;

  let college = await College.findOne({ slug: collegeId });
  if (!college && collegeId.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(collegeId);
  }
  if (!college) {
    return next(new AppError('College not found', 404));
  }

  const basket = await ComparedCollege.findOne({ userId });
  if (!basket) {
    return next(new AppError('Comparison basket not found', 404));
  }

  basket.collegeIds = basket.collegeIds.filter(
    id => id.toString() !== college!._id.toString()
  );
  await basket.save();

  res.status(200).json({
    status: 'success',
    message: `${college.name || college.collegeName} removed from comparison basket.`,
  });
});

export const getComparedColleges = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const userId = req.user?.id;

  const basket = await ComparedCollege.findOne({ userId }).populate({
    path: 'collegeIds',
    select: 'name collegeName slug logo banner location city state rating fees averagePackage placements ranking establishedYear courses category placementDetails scholarships hostels gallery reviews faq infrastructure',
  });

  if (!basket || basket.collegeIds.length === 0) {
    return res.status(200).json({
      status: 'success',
      results: 0,
      data: {
        colleges: [],
      },
    });
  }

  const formattedColleges = basket.collegeIds
    .filter(col => col !== null)
    .map((col: any) => ({
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
      about: col.about || col.description,
      courses: col.courses,
      placementDetails: col.placementDetails,
      scholarships: col.scholarships,
      hostels: col.hostels,
      gallery: col.gallery,
      reviews: col.reviews,
      faq: col.faq,
      infrastructure: col.infrastructure,
    }));

  res.status(200).json({
    status: 'success',
    results: formattedColleges.length,
    data: {
      colleges: formattedColleges,
    },
  });
});
