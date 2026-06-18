import type { Exam } from '../types';

export const exams: Exam[] = [
  {
    id: 'jee',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination Advanced',
    date: '2026-06-01',
    registrationDeadline: '2026-05-10',
    eligibility: 'Must clear JEE Main and be in Top 2,50,000 candidates',
    category: 'Engineering',
    syllabus: [
      'Physics: Mechanics, Electricity, Magnetism, Optics, Thermodynamics',
      'Chemistry: Physical, Organic, Inorganic Chemistry, Bio-molecules',
      'Mathematics: Calculus, Algebra, Coordinate Geometry, Vectors, Trigonometry'
    ],
    pattern: 'Two papers of 3 hours each (Computer Based Test), objective type with negative marking.',
    difficulty: 'Very Hard',
    description: 'JEE Advanced is the sole gatekeeper for admission into the prestigious Indian Institutes of Technology (IITs). It tests deep analytical and conceptual understanding in Science and Mathematics.'
  },
  {
    id: 'neet',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test',
    date: '2026-05-03',
    registrationDeadline: '2026-04-12',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotechnology & English',
    category: 'Medicine',
    syllabus: [
      'Biology: Botany & Zoology, Plant physiology, Human physiology, Genetics, Ecology',
      'Physics: Kinematics, Thermodynamics, Electrostatics, Electronic Devices',
      'Chemistry: Chemical Bonding, Equilibrium, Hydrocarbons, Coordination Compounds'
    ],
    pattern: 'Single paper of 3 hours 20 minutes (Pen & Paper), 200 multiple-choice questions (MCQs).',
    difficulty: 'Hard',
    description: 'NEET UG is the single nationwide entrance exam for admission to MBBS, BDS, and other undergraduate medical courses in all medical colleges across India, including AIIMS and JIPMER.'
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    date: '2026-11-29',
    registrationDeadline: '2026-09-15',
    eligibility: 'Bachelor Degree with minimum 50% marks or equivalent CGPA',
    category: 'Management',
    syllabus: [
      'Verbal Ability & Reading Comprehension (VARC)',
      'Data Interpretation & Logical Reasoning (DILR)',
      'Quantitative Ability (QA)'
    ],
    pattern: '3 Sections, 2 hours total (40 minutes per section), mix of MCQs and Non-MCQs.',
    difficulty: 'Hard',
    description: 'Conducted annually by the IIMs on a rotational basis, CAT is the gateway to India\'s top business schools, checking quantitative skill, data logic, and verbal capacity.'
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    date: '2026-02-07',
    registrationDeadline: '2025-10-10',
    eligibility: 'Currently in 3rd year or higher of any undergraduate degree program',
    category: 'Engineering',
    syllabus: [
      'General Aptitude: English, Numerical Ability',
      'Engineering Mathematics',
      'Subject Specific Syllabus (e.g., Computer Science, Electrical, Mechanical)'
    ],
    pattern: '3-hour Computer Based Test, 65 questions consisting of MCQs, MSQs (Multiple Select), and NATs (Numerical Answer Type).',
    difficulty: 'Hard',
    description: 'GATE is co-conducted by IISc and IITs. It is used for admissions to postgraduate engineering programs (M.Tech/Ph.D.) and recruitment in public sector undertakings (PSUs).'
  },
  {
    id: 'upsc',
    name: 'UPSC CSE',
    fullName: 'Civil Services Examination',
    date: '2026-05-31',
    registrationDeadline: '2026-03-05',
    eligibility: 'Graduate in any discipline; Age 21 to 32 years',
    category: 'Government Services',
    syllabus: [
      'Prelims Paper I: General Studies (History, Geography, Polity, Economics, Science)',
      'Prelims Paper II: CSAT (Logical Reasoning, Quant, Comprehension)',
      'Mains: Essay, 4 GS Papers, 2 Optional Subject Papers'
    ],
    pattern: 'Three stages: Prelims (Objective), Mains (Written Descriptive), and Personality Test (Interview).',
    difficulty: 'Extremely Hard',
    description: 'The Civil Services Examination is conducted by the Union Public Service Commission to recruit officers for IAS, IPS, IFS, and other central services. It is considered one of the most rigorous exams in the world.'
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    date: '2026-12-07',
    registrationDeadline: '2026-11-10',
    eligibility: '10+2 or equivalent with minimum 45% marks',
    category: 'Law',
    syllabus: [
      'English Language',
      'Current Affairs & General Knowledge',
      'Legal Reasoning',
      'Logical Reasoning',
      'Quantitative Techniques'
    ],
    pattern: '2-hour offline exam with 120 comprehension-based questions.',
    difficulty: 'Medium to Hard',
    description: 'CLAT is a centralized entrance test for admissions to 24 National Law Universities in India, assessing reading, analysis, and basic mathematical/logical ability.'
  }
];
