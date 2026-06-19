import { Request, Response, NextFunction } from 'express';
import { Exam } from '../models/Exam';
import { AppError } from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const getAllExams = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const query: any = {};

  if (req.query.search) {
    const searchVal = String(req.query.search);
    query.$or = [
      { examName: { $regex: searchVal, $options: 'i' } },
      { fullName: { $regex: searchVal, $options: 'i' } },
      { description: { $regex: searchVal, $options: 'i' } },
      { conductingBody: { $regex: searchVal, $options: 'i' } },
    ];
  }

  if (req.query.category) {
    query.category = { $regex: `^${req.query.category}$`, $options: 'i' };
  }

  const exams = await Exam.find(query);

  const formattedExams = exams.map(exam => ({
    id: exam.slug, // Frontend expects slug as id
    name: exam.examName,
    fullName: exam.fullName,
    date: exam.examDate.toISOString().split('T')[0],
    registrationDeadline: exam.applicationEndDate.toISOString().split('T')[0],
    resultDate: exam.resultDate ? exam.resultDate.toISOString().split('T')[0] : '',
    eligibility: exam.eligibility,
    category: exam.category,
    mode: exam.mode,
    courses: exam.courses,
    syllabus: exam.syllabus,
    pattern: exam.pattern,
    difficulty: exam.difficulty,
    description: exam.description,
  }));

  res.status(200).json({
    status: 'success',
    results: formattedExams.length,
    data: {
      exams: formattedExams,
    },
  });
});

export const getExamBySlugOrId = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { idOrSlug } = req.params;

  let exam = await Exam.findOne({ slug: idOrSlug });

  if (!exam && idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
    exam = await Exam.findById(idOrSlug);
  }

  if (!exam) {
    return next(new AppError('Exam not found', 404));
  }

  const formattedExam = {
    id: exam.slug,
    name: exam.examName,
    fullName: exam.fullName,
    date: exam.examDate.toISOString().split('T')[0],
    registrationDeadline: exam.applicationEndDate.toISOString().split('T')[0],
    resultDate: exam.resultDate ? exam.resultDate.toISOString().split('T')[0] : '',
    eligibility: exam.eligibility,
    category: exam.category,
    mode: exam.mode,
    courses: exam.courses,
    syllabus: exam.syllabus,
    pattern: exam.pattern,
    difficulty: exam.difficulty,
    description: exam.description,
  };

  res.status(200).json({
    status: 'success',
    data: {
      exam: formattedExam,
    },
  });
});

export const createExam = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const exam = await Exam.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Exam created successfully',
    data: {
      exam,
    },
  });
});

export const updateExam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const exam = await Exam.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!exam) {
    return next(new AppError('Exam not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Exam updated successfully',
    data: {
      exam,
    },
  });
});

export const deleteExam = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const exam = await Exam.findByIdAndDelete(id);

  if (!exam) {
    return next(new AppError('Exam not found', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'Exam deleted successfully',
  });
});
