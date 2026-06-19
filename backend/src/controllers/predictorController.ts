import { Request, Response, NextFunction } from 'express';
import { College } from '../models/College';
import { catchAsync } from '../utils/catchAsync';

// Helper to parse fees from string (e.g., "₹2.2 Lakhs / Year" -> 220000, "₹1,628 / Year" -> 1628)
const parseFeeAmount = (feeStr: string): number => {
  if (!feeStr) return 0;
  // Clean string
  const cleanStr = feeStr.replace(/[^\d.kKlL]/g, '').toLowerCase();
  
  let val = parseFloat(cleanStr);
  if (isNaN(val)) return 0;

  if (cleanStr.includes('l') || cleanStr.includes('lakh')) {
    val = val * 100000;
  } else if (cleanStr.includes('k') || cleanStr.includes('thousand')) {
    val = val * 1000;
  }
  return val;
};

// Map typical cutoff thresholds per college slug
const collegeCutoffs: { [slug: string]: { [exam: string]: number } } = {
  'iit-bombay': { 'jee-advanced': 98, 'jee-main': 99.5 },
  'iim-bangalore': { 'cat': 98, 'gmat': 720 },
  'aiims-delhi': { 'neet': 99.2 },
  'kr-mangalam': { 'cat': 60, 'mat': 65, 'cmat': 60, 'npat': 50 },
  'great-lakes': { 'cat': 85, 'xat': 85, 'cmat': 90, 'gmat': 650 },
  'vydehi-medical': { 'neet': 85 },
  'jims-delhi': { 'cat': 75, 'mat': 80, 'cmat': 75 },
  'jims-gn': { 'cat': 65, 'mat': 70, 'cmat': 65 },
  'accurate-group': { 'cat': 50, 'mat': 55, 'cmat': 50 },
  'amity-university': { 'cat': 70, 'mat': 75, 'cmat': 70 },
  'gl-bajaj': { 'cat': 60, 'mat': 65, 'cmat': 60 },
  'bennett-university': { 'cat': 65, 'mat': 70, 'cmat': 65 },
  'lloyd-school': { 'cat': 50, 'mat': 55, 'cmat': 50 },
  'mangalmay-institute': { 'cat': 55, 'mat': 60, 'cmat': 55 },
  'sharda-university': { 'cat': 65, 'mat': 70, 'cmat': 65 },
};

export const predictColleges = catchAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const { exam, score, category, stream, preferredState, budget } = req.body;

  const scoreNum = Number(score);

  // 1. Build Query for stream & budget
  const query: any = {};
  if (stream) {
    // Map stream to category
    let mappedCategory = stream;
    if (stream.toLowerCase() === 'management' || stream.toLowerCase() === 'mba') {
      mappedCategory = 'Management';
    } else if (stream.toLowerCase() === 'engineering' || stream.toLowerCase() === 'btech') {
      mappedCategory = 'Engineering';
    } else if (stream.toLowerCase() === 'medicine' || stream.toLowerCase() === 'medical' || stream.toLowerCase() === 'mbbs') {
      mappedCategory = 'Medicine';
    } else if (stream.toLowerCase() === 'law' || stream.toLowerCase() === 'llb') {
      mappedCategory = 'Law';
    }
    query.category = { $regex: `^${mappedCategory}$`, $options: 'i' };
  }

  if (preferredState) {
    if (Array.isArray(preferredState) && preferredState.length > 0) {
      query.state = { $in: preferredState.map(s => new RegExp(`^${s}$`, 'i')) };
    } else if (typeof preferredState === 'string' && preferredState.trim() !== '') {
      query.state = { $regex: `^${preferredState}$`, $options: 'i' };
    }
  }

  // Fetch all qualifying colleges
  const colleges = await College.find(query);

  // 2. Perform cutoff-based evaluation & budget filtration in memory
  const predictions = colleges
    .filter(col => {
      if (!budget) return true;
      const colFee = parseFeeAmount(col.fees);
      const userMaxBudget = Number(budget);
      return colFee <= userMaxBudget;
    })
    .map(col => {
      const slug = col.slug;
      const cutoffMap = collegeCutoffs[slug] || {};
      
      // Look up target cutoff for the exam, default to 70 percentile if not mapped
      const targetExam = String(exam).toLowerCase().trim();
      const cutoff = cutoffMap[targetExam] || 70;

      let matchProbability: 'High' | 'Medium' | 'Low' = 'Low';
      let admissionChance = 10; // in percent

      // Basic SC/ST/OBC cutoff reduction benefit (e.g. 5-10 percentile concession)
      let finalCutoff = cutoff;
      const catLower = String(category).toLowerCase();
      if (catLower === 'sc' || catLower === 'st') {
        finalCutoff = cutoff - 8;
      } else if (catLower === 'obc') {
        finalCutoff = cutoff - 3;
      }

      if (scoreNum >= finalCutoff + 5) {
        matchProbability = 'High';
        admissionChance = Math.min(99, Math.round(85 + (scoreNum - finalCutoff) * 2));
      } else if (scoreNum >= finalCutoff - 2) {
        matchProbability = 'Medium';
        admissionChance = Math.min(84, Math.round(55 + (scoreNum - finalCutoff) * 4));
      } else if (scoreNum >= finalCutoff - 8) {
        matchProbability = 'Low';
        admissionChance = Math.max(5, Math.round(25 + (scoreNum - finalCutoff) * 3));
      } else {
        matchProbability = 'Low';
        admissionChance = Math.max(1, Math.round(5 + (scoreNum - finalCutoff)));
      }

      return {
        college: {
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
        },
        matchProbability,
        cutoffPercentile: finalCutoff,
        admissionChance: `${admissionChance}%`,
      };
    })
    // Sort by admission chance descending
    .sort((a, b) => parseInt(b.admissionChance) - parseInt(a.admissionChance));

  res.status(200).json({
    status: 'success',
    results: predictions.length,
    data: {
      predictions,
    },
  });
});
