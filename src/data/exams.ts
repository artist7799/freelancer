import type { Exam } from '../types';

export const exams: Exam[] = [
  {
    id: 'atma',
    name: 'ATMA 2026',
    fullName: 'AIMS Test for Management Admissions',
    date: '2026-06-01',
    registrationDeadline: '2026-06-20',
    resultDate: '2026-07-12',
    eligibility: 'Bachelor Degree with minimum 50% marks or equivalent from a recognized university.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Analytical Reasoning Skills (Part 1 & 2)',
      'Quantitative Skills (Part 1 & 2)',
      'Verbal Skills (Part 1 & 2)'
    ],
    pattern: '180 multiple-choice questions (MCQs) to be answered in 180 minutes.',
    difficulty: 'Medium',
    description: 'ATMA is a high-quality national level test recognized by AICTE for admissions to MBA and PGDM programs across India.'
  },
  {
    id: 'cuet-pg',
    name: 'CUET PG 2026',
    fullName: 'Common University Entrance Test (PG)',
    date: '2026-06-13',
    registrationDeadline: '2026-04-25',
    resultDate: '2026-07-28',
    eligibility: 'Graduate in any discipline from a recognized university. No age limit.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'M.A.', 'M.Sc.', 'M.Com'],
    syllabus: [
      'Language Comprehension / Verbal Ability',
      'Mathematical / Quantitative Ability',
      'Data Interpretation & Logical Reasoning',
      'Domain Specific Knowledge'
    ],
    pattern: 'Computer-based test (CBT) with 75 multiple choice questions.',
    difficulty: 'Medium',
    description: 'CUET PG provides a single-window opportunity for candidates seeking admission to various postgraduate programs in participating Central, State, and private universities.'
  },
  {
    id: 'ibsat',
    name: 'IBSAT 2025',
    fullName: 'ICFAI Business School (IBS) Aptitude Test or IBSAT',
    date: '2025-12-27',
    registrationDeadline: '2025-12-21',
    resultDate: '2026-01-05',
    eligibility: 'Graduation in any discipline with 50% and above marks with English medium.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'PGPM'],
    syllabus: [
      'Verbal Ability',
      'Reading Comprehension',
      'Quantitative Aptitude',
      'Data Adequacy & Data Interpretation'
    ],
    pattern: 'Computer Based Test (CBT) containing 140 multiple choice questions with no negative marking.',
    difficulty: 'Medium',
    description: 'IBSAT is conducted by ICFAI Foundation for Higher Education for admission to the MBA/PGPM programs at all IBS campuses.'
  },
  {
    id: 'cat',
    name: 'CAT 2025',
    fullName: 'Common Admission Test (CAT)',
    date: '2025-11-30',
    registrationDeadline: '2025-09-15',
    resultDate: '2026-01-05',
    eligibility: 'Bachelor Degree with minimum 50% marks or equivalent CGPA.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Verbal Ability & Reading Comprehension (VARC)',
      'Data Interpretation & Logical Reasoning (DILR)',
      'Quantitative Ability (QA)'
    ],
    pattern: '3 Sections, 2 hours total (40 minutes per section), mix of MCQs and Non-MCQs.',
    difficulty: 'Hard',
    description: 'Conducted annually by the IIMs on a rotational basis, CAT is the primary gateway to India\'s top business schools, assessing quantitative, logical, and verbal capacity.'
  },
  {
    id: 'npat',
    name: 'NPAT 2025',
    fullName: 'NMIMS NPAT Examination',
    date: '2025-06-01',
    registrationDeadline: '2025-05-20',
    resultDate: '2025-07-12',
    eligibility: '10+2 with minimum 50%-60% marks from a recognized board.',
    category: 'Management',
    mode: 'online',
    courses: ['BBA', 'B.Com', 'B.Sc.'],
    syllabus: [
      'Quantitative & Numerical Ability',
      'Reasoning & General Intelligence',
      'Proficiency in English Language'
    ],
    pattern: '120-minute online exam with 120 questions, no negative marking.',
    difficulty: 'Medium',
    description: 'NPAT is the official entrance test for admissions to Undergraduate Degree and Integrated Degree Programs offered by SVKM\'s NMIMS.'
  },
  {
    id: 'pu-cet',
    name: 'PU CET 2025',
    fullName: 'Punjab University Common Entrance Test',
    date: '2025-06-15',
    registrationDeadline: '2025-05-20',
    resultDate: '2025-07-02',
    eligibility: '10+2 examination with Physics, Chemistry, and Biology/Maths with 50% marks.',
    category: 'Agriculture',
    mode: 'offline',
    courses: ['B.Sc.', 'B.Pharma'],
    syllabus: [
      'Physics: Kinematics, Laws of Motion, Optics',
      'Chemistry: Atom structure, Organic, Thermodynamics',
      'Biology / Mathematics: Botany, Zoology, Calculus, Algebra'
    ],
    pattern: 'Offline pen-paper test containing objective questions, 70 minutes per subject paper.',
    difficulty: 'Medium',
    description: 'PU CET is conducted by Panjab University, Chandigarh, for admissions to various undergraduate courses in Science, Pharmacy, and allied disciplines.'
  },
  {
    id: 'wbjee',
    name: 'WBJEE 2025',
    fullName: 'West Bengal Joint Entrance Examinations',
    date: '2025-04-27',
    registrationDeadline: '2025-02-05',
    resultDate: '2025-05-15',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Biology/Biotech with 45% aggregate.',
    category: 'Engineering',
    mode: 'offline',
    courses: ['B.Tech', 'B.Arch', 'B.Pharma'],
    syllabus: [
      'Mathematics: Coordinate Geometry, Calculus, Algebra',
      'Physics: Mechanics, Electrostatics, Thermal Physics',
      'Chemistry: Physical, Inorganic, Organic Chemistry'
    ],
    pattern: 'OMR based offline exam with two papers: Paper-I (Maths) and Paper-II (Physics & Chemistry).',
    difficulty: 'Hard',
    description: 'WBJEE is a state-level exam conducted for admission to Government and private Engineering, Technology, Pharmacy, and Architecture colleges in West Bengal.'
  },
  {
    id: 'clat',
    name: 'CLAT 2025',
    fullName: 'Common Law Admission Test',
    date: '2024-12-01',
    registrationDeadline: '2024-11-10',
    resultDate: '2024-12-15',
    eligibility: '10+2 or equivalent with minimum 45% marks.',
    category: 'Law',
    mode: 'offline',
    courses: ['Allied', 'LLB', 'LLM'],
    syllabus: [
      'English Language & Comprehension',
      'Current Affairs including General Knowledge',
      'Legal Reasoning & Aptitude',
      'Logical Reasoning',
      'Quantitative Techniques'
    ],
    pattern: '2-hour offline pen-and-paper test with 120 comprehension-based MCQs.',
    difficulty: 'Medium to Hard',
    description: 'CLAT is a centralized test for admissions to 24 National Law Universities in India, testing analytical reading, comprehension, and legal logical skills.'
  },
  {
    id: 'mat',
    name: 'MAT 2025',
    fullName: 'Management Aptitude Test (MAT)',
    date: '2025-03-10',
    registrationDeadline: '2025-02-15',
    resultDate: '2025-03-31',
    eligibility: 'Graduate in any discipline. Candidates in final year of graduation can also apply.',
    category: 'Management',
    mode: 'both',
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Language Comprehension',
      'Mathematical Skills',
      'Data Analysis and Sufficiency',
      'Intelligence and Critical Reasoning',
      'Indian and Global Environment'
    ],
    pattern: 'Available in CBT, PBT, and IBT modes. 150 questions in 120 minutes.',
    difficulty: 'Medium',
    description: 'MAT is a national level management entrance test conducted by AIMA multiple times a year for admissions to over 600 business schools in India.'
  },
  {
    id: 'xat',
    name: 'XAT 2025',
    fullName: 'Xavier Aptitude Test Exam',
    date: '2025-01-05',
    registrationDeadline: '2024-11-30',
    resultDate: '2025-01-20',
    eligibility: 'Bachelor Degree in any discipline from a recognized university.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Decision Making',
      'Verbal and Logical Ability',
      'Quantitative Ability & Data Interpretation',
      'General Knowledge'
    ],
    pattern: 'Online test with 100 questions of MCQ type and one analytical essay topic.',
    difficulty: 'Hard',
    description: 'XAT is conducted by XLRI Jamshedpur on behalf of XAMI. It is widely considered one of the most comprehensive aptitude tests for management admissions.'
  },
  {
    id: 'cmat',
    name: 'CMAT 2026',
    fullName: 'Common Management Admission Test (CMAT)',
    date: '2026-05-15',
    registrationDeadline: '2026-03-15',
    resultDate: '2026-06-05',
    eligibility: 'Graduate in any discipline from a recognized institution.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Quantitative Techniques & Data Interpretation',
      'Logical Reasoning',
      'Language Comprehension',
      'General Awareness',
      'Innovation & Entrepreneurship'
    ],
    pattern: 'Computer Based Test (CBT) with 100 multiple choice questions.',
    difficulty: 'Medium',
    description: 'CMAT is a national-level entrance exam conducted by NTA for admission to management programs in AICTE-approved institutions.'
  },
  {
    id: 'snap',
    name: 'SNAP Exam',
    fullName: 'Symbiosis National Aptitude Test (SNAP)',
    date: '2025-12-10',
    registrationDeadline: '2025-11-20',
    resultDate: '2026-01-10',
    eligibility: 'Graduate from any recognized university with a minimum of 50% marks.',
    category: 'Management',
    mode: 'online',
    courses: ['MBA', 'M.Sc.'],
    syllabus: [
      'General English: Reading Comprehension, Verbal Ability',
      'Analytical & Logical Reasoning',
      'Quantitative, Data Interpretation & Data Sufficiency'
    ],
    pattern: '60-minute CBT with 60 questions, negative marking of 0.25 for incorrect answers.',
    difficulty: 'Medium',
    description: 'SNAP is a common written test for candidates seeking admission to any post-graduate management programs offered by Symbiosis International University.'
  }
];
