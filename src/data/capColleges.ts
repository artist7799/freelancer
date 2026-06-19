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

export const capColleges: CapCollege[] = [
  {
    id: 'cap-1',
    name: 'Shadan Women College of Engineering & Technology, Hyderabad',
    location: 'Hyderabad, Telangana',
    fees: 0,
    courses: ['B-Tech', 'MBA', 'PG'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Radio-Diagnosis']
  },
  {
    id: 'cap-2',
    name: 'Swamy Vivekananda Medical College and Hospital, Namakkal',
    location: 'Namakkal, Tamil Nadu',
    fees: 0,
    courses: ['M.B.B.S.', 'DM', 'PG'],
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Obstetrics & Gynaecology', 'Ophthalmology', 'Child Health']
  },
  {
    id: 'cap-3',
    name: 'Mepco Schlenk Engineering College, Tamil Nadu',
    location: 'Sivakasi, Tamil Nadu',
    fees: 0,
    courses: ['B-Tech', 'MBA', 'PG'],
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Clinical Pathology']
  },
  {
    id: 'cap-4',
    name: 'Medi-Caps University, Indore',
    location: 'Indore, Madhya Pradesh',
    fees: 0,
    courses: ['B-Tech', 'MBA', 'PG', 'Dip'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Radio-Diagnosis', 'Public Health']
  },
  {
    id: 'cap-5',
    name: 'Garden City University, Bangalore',
    location: 'Bangalore, Karnataka',
    fees: 0,
    courses: ['MBA', 'PG', 'Certificate'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Venereology']
  },
  {
    id: 'cap-6',
    name: 'Pimpri Chinchwad University (PCU), Pune',
    location: 'Pune, Maharashtra',
    fees: 1000,
    courses: ['B-Tech', 'MBA', 'PG', 'Dip', 'MVA'],
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Ophthalmology', 'Child Health']
  },
  {
    id: 'cap-7',
    name: 'ACCMAN Business School, Greater Noida',
    location: 'Greater Noida, Uttar Pradesh',
    fees: 0,
    courses: ['MBA', 'PG'],
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General']
  },
  {
    id: 'cap-8',
    name: 'Sri Sai Institute of Technology and Management Studies, (SSITMS) Lucknow',
    location: 'Lucknow, Uttar Pradesh',
    fees: 1000,
    courses: ['MBA', 'PG', 'B-Tech', 'BMLT'],
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General', 'Forensic Medicine', 'Clinical Pathology']
  },
  {
    id: 'cap-9',
    name: 'Pearl Academy, Mumbai',
    location: 'Mumbai, Maharashtra',
    fees: 1000,
    courses: ['PG', 'Certificate', 'MVA'],
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    specializations: ['General']
  }
];
