import { colleges } from './colleges';

export interface CapCollege {
  id: string;
  name: string;
  location: string;
  fees: number;
  courses: string[];
  image: string;
  specializations: string[];
}

export const capCourses = [
  'MVA',
  'BMLT',
  'Dip',
  'Certificate',
  'PG',
  'DM',
  'M.B.B.S.',
  'MBA',
  'B-Tech'
];

export const capSpecializations = [
  'General',
  'Obstetrics & Gynaecology',
  'Ophthalmology',
  'Forensic Medicine',
  'Radio-Diagnosis',
  'Clinical Pathology',
  'Child Health',
  'Venereology',
  'Public Health'
];

export const capColleges: CapCollege[] = colleges.map((col) => {
  const isFree = col.id.includes('sanskriti') || col.id.includes('sage') || col.id.includes('future') || col.id.includes('haridwar');
  return {
    id: col.id,
    name: col.name,
    location: col.location,
    fees: isFree ? 0 : 1000,
    courses: col.courses.map((c) => {
      if (c.name.toLowerCase().includes('computer science') || c.name.toLowerCase().includes('cse') || c.name.toLowerCase().includes('b.tech')) {
        return 'B-Tech';
      }
      if (c.name.toLowerCase().includes('mba') || c.name.toLowerCase().includes('management')) {
        return 'MBA';
      }
      return 'PG';
    }),
    image: col.image,
    specializations: ['General', 'Radio-Diagnosis', 'Public Health', 'Ophthalmology', 'Child Health']
  };
});

