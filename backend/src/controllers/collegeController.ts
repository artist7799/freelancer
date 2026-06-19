import { Request, Response, NextFunction } from 'express';
import { College } from '../models/College';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { uploadImage } from '../services/cloudinaryService';

export const getAllColleges = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const query: any = {};

  // 1. Search Query (Text search matching name, city, state, description, category)
  if (req.query.search) {
    const searchVal = String(req.query.search);
    query.$or = [
      { name: { $regex: searchVal, $options: 'i' } },
      { collegeName: { $regex: searchVal, $options: 'i' } },
      { city: { $regex: searchVal, $options: 'i' } },
      { state: { $regex: searchVal, $options: 'i' } },
      { category: { $regex: searchVal, $options: 'i' } },
      { description: { $regex: searchVal, $options: 'i' } },
    ];
  }

  // 2. Exact Filters
  if (req.query.city) {
    query.city = { $regex: `^${req.query.city}$`, $options: 'i' };
  }
  if (req.query.state) {
    query.state = { $regex: `^${req.query.state}$`, $options: 'i' };
  }
  if (req.query.category) {
    query.category = { $regex: `^${req.query.category}$`, $options: 'i' };
  }
  if (req.query.course) {
    query['courses.name'] = { $regex: String(req.query.course), $options: 'i' };
  }

  // 3. Min Placement Percentage
  if (req.query.minPlacement) {
    query.placementPercentage = { $gte: Number(req.query.minPlacement) };
  }

  // 4. Max Fees
  if (req.query.maxFees) {
    // Max fees filter placeholder
  }

  // 5. Pagination & Sorting Setup
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  let sortQuery: any = {};
  if (req.query.sortBy) {
    const sortBy = String(req.query.sortBy);
    if (sortBy === 'nirfRanking') {
      // Ascending (since 1 is best)
      sortQuery = { nirfRanking: 1 };
    } else if (sortBy === 'rating') {
      sortQuery = { rating: -1 };
    } else if (sortBy === 'placement') {
      sortQuery = { placementPercentage: -1 };
    } else if (sortBy === 'fees') {
      // fees sort requires parsing or a clean field. Let's sort by fees if possible
      sortQuery = { fees: 1 };
    } else {
      sortQuery = { createdAt: -1 };
    }
  } else {
    sortQuery = { createdAt: -1 };
  }

  // Execute query
  const total = await College.countDocuments(query);
  const colleges = await College.find(query)
    .sort(sortQuery)
    .skip(skip)
    .limit(limit);

  // Map to format required by frontend (matching the College model in frontend types)
  const formattedColleges = colleges.map(col => ({
    id: col.slug, // Frontend expects slug as id
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
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: {
      colleges: formattedColleges,
    },
  });
});

export const getCollegeBySlugOrId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  let college = await College.findOne({ slug: idOrSlug });

  if (!college && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    college = await College.findById(idOrSlug);
  }

  if (!college) {
    return next(new AppError('College not found with that identifier', 404));
  }

  const formattedCollege = {
    id: college.slug,
    name: college.name || college.collegeName,
    location: college.location || `${college.city}, ${college.state}`,
    rating: college.rating || 4.0,
    fees: college.fees,
    placements: college.placements || `${college.averagePackage} Average`,
    ranking: college.ranking || `#${college.nirfRanking || college.establishedYear} in NIRF`,
    logo: college.logo,
    image: college.banner,
    category: college.category,
    about: college.about || college.description,
    courses: college.courses,
    placementDetails: college.placementDetails,
    scholarships: college.scholarships,
    hostels: college.hostels,
    gallery: college.gallery,
    reviews: college.reviews,
    faq: college.faq,
    infrastructure: college.infrastructure,
  };

  res.status(200).json({
    status: 'success',
    data: {
      college: formattedCollege,
    },
  });
});

export const createCollege = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const fileFields = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  
  let logoUrl = '';
  let bannerUrl = '';
  const galleryUrls: string[] = [];

  if (fileFields) {
    if (fileFields['logo'] && fileFields['logo'][0]) {
      logoUrl = await uploadImage(fileFields['logo'][0]);
    }
    if (fileFields['banner'] && fileFields['banner'][0]) {
      bannerUrl = await uploadImage(fileFields['banner'][0]);
    }
    if (fileFields['gallery']) {
      for (const file of fileFields['gallery']) {
        const url = await uploadImage(file);
        galleryUrls.push(url);
      }
    }
  }

  // Parse nested JSON strings from req.body (courses, placementDetails, scholarships, hostels, reviews, faq, infrastructure)
  // Multer uploads send nested arrays/objects as strings, which need to be parsed
  const body = { ...req.body };
  
  const jsonFields = ['courses', 'placementDetails', 'scholarships', 'hostels', 'reviews', 'faq', 'infrastructure'];
  for (const field of jsonFields) {
    if (body[field] && typeof body[field] === 'string') {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (err) {
        // Fallback to empty array or leave as is if parsing fails
        body[field] = [];
      }
    }
  }

  const college = await College.create({
    ...body,
    logo: logoUrl || body.logo,
    banner: bannerUrl || body.banner,
    gallery: galleryUrls.length > 0 ? galleryUrls : body.gallery,
  });

  res.status(201).json({
    status: 'success',
    message: 'College created successfully',
    data: {
      college,
    },
  });
});

export const updateCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const college = await College.findById(id);

  if (!college) {
    return next(new AppError('College not found', 404));
  }

  const fileFields = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
  let logoUrl = college.logo;
  let bannerUrl = college.banner;
  const galleryUrls = [...college.gallery];

  if (fileFields) {
    if (fileFields['logo'] && fileFields['logo'][0]) {
      logoUrl = await uploadImage(fileFields['logo'][0]);
    }
    if (fileFields['banner'] && fileFields['banner'][0]) {
      bannerUrl = await uploadImage(fileFields['banner'][0]);
    }
    if (fileFields['gallery']) {
      for (const file of fileFields['gallery']) {
        const url = await uploadImage(file);
        galleryUrls.push(url);
      }
    }
  }

  const body = { ...req.body };
  const jsonFields = ['courses', 'placementDetails', 'scholarships', 'hostels', 'reviews', 'faq', 'infrastructure'];
  for (const field of jsonFields) {
    if (body[field] && typeof body[field] === 'string') {
      try {
        body[field] = JSON.parse(body[field]);
      } catch (err) {
        // Keep existing if invalid json
      }
    }
  }

  // Update properties manually or with Object.assign
  Object.assign(college, body);
  college.logo = logoUrl;
  college.banner = bannerUrl;
  college.gallery = galleryUrls;

  await college.save();

  res.status(200).json({
    status: 'success',
    message: 'College updated successfully',
    data: {
      college,
    },
  });
});

export const deleteCollege = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const college = await College.findByIdAndDelete(id);

  if (!college) {
    return next(new AppError('College not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'College deleted successfully',
  });
});
