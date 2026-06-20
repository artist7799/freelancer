import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}
import { User } from '../models/User';
import { College } from '../models/College';
import { Course } from '../models/Course';
import { Exam } from '../models/Exam';
import { Scholarship } from '../models/Scholarship';
import { Blog } from '../models/Blog';
import { Application } from '../models/Application';
import { SavedCollege } from '../models/SavedCollege';
import { ComparedCollege } from '../models/ComparedCollege';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/arunanandedtech';

const defaultCourses = [
  {
    name: 'B.Tech in Computer Science',
    category: 'Engineering',
    duration: '4 Years',
    eligibility: '10+2 with Physics, Chemistry, and Math (JEE qualified)',
    description: 'Undergraduate professional program in software engineering, algorithms, database systems, AI, and systems programming.',
    averageFees: '₹2.2 Lakhs / Year',
    careerOptions: ['Software Developer', 'System Architect', 'Data Scientist', 'DevOps Specialist'],
  },
  {
    name: 'MBA (PGP in Management)',
    category: 'Management',
    duration: '2 Years',
    eligibility: 'Bachelor Degree in any stream with minimum 50% marks (CAT qualified)',
    description: 'Postgraduate management program focusing on leadership, finance, operations, marketing, strategy, and organizational behavior.',
    averageFees: '₹11.5 Lakhs / Year',
    careerOptions: ['Management Consultant', 'Investment Analyst', 'Product Manager', 'HR Lead'],
  },
  {
    name: 'MBBS (Bachelor of Medicine)',
    category: 'Medicine',
    duration: '5.5 Years',
    eligibility: '10+2 with Physics, Chemistry, and Biology (NEET qualified)',
    description: 'Professional undergraduate degree in medical science, covering anatomy, pharmacology, clinical practice, and rotatory internship.',
    averageFees: '₹1.1 Lakhs / Year',
    careerOptions: ['General Physician', 'Resident Doctor', 'Clinical Researcher', 'Hospital Manager'],
  },
  {
    name: 'PGDM',
    category: 'Management',
    duration: '2 Years',
    eligibility: 'Graduate in any discipline (CAT/MAT/CMAT qualified)',
    description: 'Post Graduate Diploma in Management focusing on industry-relevant corporate training and business administration.',
    averageFees: '₹4.5 Lakhs / Year',
    careerOptions: ['Corporate Planner', 'Business Development Manager', 'Financial Controller'],
  },
  {
    name: 'BBA',
    category: 'Management',
    duration: '3 Years',
    eligibility: '10+2 from a recognized board with minimum 50% marks',
    description: 'Undergraduate program introducing core business management, human resources, marketing, and sales concepts.',
    averageFees: '₹1.5 Lakhs / Year',
    careerOptions: ['Sales Executive', 'Management Trainee', 'Marketing Assistant'],
  },
  {
    name: 'M.Tech in Artificial Intelligence',
    category: 'Engineering',
    duration: '2 Years',
    eligibility: 'B.Tech/B.E. in CSE/IT/ECE (GATE qualified)',
    description: 'Advanced postgraduate engineering specialization in machine learning, deep learning, NLP, computer vision, and neural systems.',
    averageFees: '₹80,000 / Year',
    careerOptions: ['AI Engineer', 'ML Researcher', 'CV Engineer', 'R&D Lead'],
  },
];

const defaultExams = [
  {
    examName: 'ATMA 2026',
    slug: 'atma',
    fullName: 'AIMS Test for Management Admissions',
    description: 'ATMA is a high-quality national level test recognized by AICTE for admissions to MBA and PGDM programs across India.',
    eligibility: 'Bachelor Degree with minimum 50% marks or equivalent from a recognized university.',
    applicationStartDate: new Date('2026-03-01'),
    applicationEndDate: new Date('2026-06-20'),
    examDate: new Date('2026-06-01'),
    resultDate: new Date('2026-07-12'),
    conductingBody: 'Association of Indian Management Schools (AIMS)',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'PGDM', 'BBA'],
    syllabus: [
      'Analytical Reasoning Skills (Part 1 & 2)',
      'Quantitative Skills (Part 1 & 2)',
      'Verbal Skills (Part 1 & 2)',
    ],
    pattern: '180 multiple-choice questions (MCQs) to be answered in 180 minutes.',
    difficulty: 'Medium',
  },
  {
    examName: 'CUET PG 2026',
    slug: 'cuet-pg',
    fullName: 'Common University Entrance Test (PG)',
    description: 'CUET PG provides a single-window opportunity for candidates seeking admission to various postgraduate programs in participating Central, State, and private universities.',
    eligibility: 'Graduate in any discipline from a recognized university. No age limit.',
    applicationStartDate: new Date('2026-01-15'),
    applicationEndDate: new Date('2026-04-25'),
    examDate: new Date('2026-06-13'),
    resultDate: new Date('2026-07-28'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'M.A.', 'M.Sc.', 'M.Com', 'BBA'],
    syllabus: [
      'Language Comprehension / Verbal Ability',
      'Mathematical / Quantitative Ability',
      'Data Interpretation & Logical Reasoning',
      'Domain Specific Knowledge',
    ],
    pattern: 'Computer-based test (CBT) with 75 multiple choice questions.',
    difficulty: 'Medium',
  },
  {
    examName: 'IBSAT 2025',
    slug: 'ibsat',
    fullName: 'ICFAI Business School (IBS) Aptitude Test or IBSAT',
    description: 'IBSAT is conducted by ICFAI Foundation for Higher Education for admission to the MBA/PGPM programs at all IBS campuses.',
    eligibility: 'Graduation in any discipline with 50% and above marks with English medium.',
    applicationStartDate: new Date('2025-07-01'),
    applicationEndDate: new Date('2025-12-21'),
    examDate: new Date('2025-12-27'),
    resultDate: new Date('2026-01-05'),
    conductingBody: 'ICFAI Foundation for Higher Education',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'PGPM', 'BBA'],
    syllabus: [
      'Verbal Ability',
      'Reading Comprehension',
      'Quantitative Aptitude',
      'Data Adequacy & Data Interpretation',
    ],
    pattern: 'Computer Based Test (CBT) containing 140 multiple choice questions with no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'CAT 2025',
    slug: 'cat',
    fullName: 'Common Admission Test (CAT)',
    description: 'Conducted annually by the IIMs on a rotational basis, CAT is the primary gateway to Indias top business schools, assessing quantitative, logical, and verbal capacity.',
    eligibility: 'Bachelor Degree with minimum 50% marks or equivalent CGPA.',
    applicationStartDate: new Date('2025-08-01'),
    applicationEndDate: new Date('2025-09-15'),
    examDate: new Date('2025-11-30'),
    resultDate: new Date('2026-01-05'),
    conductingBody: 'Indian Institutes of Management (IIMs)',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Verbal Ability & Reading Comprehension (VARC)',
      'Data Interpretation & Logical Reasoning (DILR)',
      'Quantitative Ability (QA)',
    ],
    pattern: '3 Sections, 2 hours total (40 minutes per section), mix of MCQs and Non-MCQs.',
    difficulty: 'Hard',
  },
  {
    examName: 'NPAT 2025',
    slug: 'npat',
    fullName: 'NMIMS NPAT Examination',
    description: 'NPAT is the official entrance test for admissions to Undergraduate Degree and Integrated Degree Programs offered by SVKM\'s NMIMS.',
    eligibility: '10+2 with minimum 50%-60% marks from a recognized board.',
    applicationStartDate: new Date('2025-02-01'),
    applicationEndDate: new Date('2025-05-20'),
    examDate: new Date('2025-06-01'),
    resultDate: new Date('2025-07-12'),
    conductingBody: 'SVKM\'s NMIMS',
    category: 'Management',
    mode: 'online' as const,
    courses: ['BBA', 'B.Com', 'B.Sc.'],
    syllabus: [
      'Quantitative & Numerical Ability',
      'Reasoning & General Intelligence',
      'Proficiency in English Language',
    ],
    pattern: '120-minute online exam with 120 questions, no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'PU CET 2025',
    slug: 'pu-cet',
    fullName: 'Punjab University Common Entrance Test',
    description: 'PU CET is conducted by Panjab University, Chandigarh, for admissions to various undergraduate courses in Science, Pharmacy, and allied disciplines.',
    eligibility: '10+2 examination with Physics, Chemistry, and Biology/Maths with 50% marks.',
    applicationStartDate: new Date('2025-04-01'),
    applicationEndDate: new Date('2025-05-20'),
    examDate: new Date('2025-06-15'),
    resultDate: new Date('2025-07-02'),
    conductingBody: 'Panjab University, Chandigarh',
    category: 'Agriculture',
    mode: 'offline' as const,
    courses: ['B.Sc.', 'B.Pharma'],
    syllabus: [
      'Physics: Kinematics, Laws of Motion, Optics',
      'Chemistry: Atom structure, Organic, Thermodynamics',
      'Biology / Mathematics: Botany, Zoology, Calculus, Algebra',
    ],
    pattern: 'Offline pen-paper test containing objective questions, 70 minutes per subject paper.',
    difficulty: 'Medium',
  },
  {
    examName: 'WBJEE 2025',
    slug: 'wbjee',
    fullName: 'West Bengal Joint Entrance Examinations',
    description: 'WBJEE is a state-level exam conducted for admission to Government and private Engineering, Technology, Pharmacy, and Architecture colleges in West Bengal.',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Biology/Biotech with 45% aggregate.',
    applicationStartDate: new Date('2024-12-20'),
    applicationEndDate: new Date('2025-02-05'),
    examDate: new Date('2025-04-27'),
    resultDate: new Date('2025-05-15'),
    conductingBody: 'West Bengal Joint Entrance Examinations Board',
    category: 'Engineering',
    mode: 'offline' as const,
    courses: ['B.Tech', 'B.Arch', 'B.Pharma'],
    syllabus: [
      'Mathematics: Coordinate Geometry, Calculus, Algebra',
      'Physics: Mechanics, Electrostatics, Thermal Physics',
      'Chemistry: Physical, Inorganic, Organic Chemistry',
    ],
    pattern: 'OMR based offline exam with two papers: Paper-I (Maths) and Paper-II (Physics & Chemistry).',
    difficulty: 'Hard',
  },
  {
    examName: 'CLAT 2025',
    slug: 'clat',
    fullName: 'Common Law Admission Test',
    description: 'CLAT is a centralized test for admissions to 24 National Law Universities in India, testing analytical reading, comprehension, and legal logical skills.',
    eligibility: '10+2 or equivalent with minimum 45% marks.',
    applicationStartDate: new Date('2024-07-01'),
    applicationEndDate: new Date('2024-11-10'),
    examDate: new Date('2024-12-01'),
    resultDate: new Date('2024-12-15'),
    conductingBody: 'Consortium of National Law Universities',
    category: 'Law',
    mode: 'offline' as const,
    courses: ['Allied', 'LLB', 'LLM'],
    syllabus: [
      'English Language & Comprehension',
      'Current Affairs including General Knowledge',
      'Legal Reasoning & Aptitude',
      'Logical Reasoning',
      'Quantitative Techniques',
    ],
    pattern: '2-hour offline pen-and-paper test with 120 comprehension-based MCQs.',
    difficulty: 'Medium to Hard',
  },
  {
    examName: 'MAT 2025',
    slug: 'mat',
    fullName: 'Management Aptitude Test (MAT)',
    description: 'MAT is a national level management entrance test conducted by AIMA multiple times a year for admissions to over 600 business schools in India.',
    eligibility: 'Graduate in any discipline. Candidates in final year of graduation can also apply.',
    applicationStartDate: new Date('2025-01-01'),
    applicationEndDate: new Date('2025-02-15'),
    examDate: new Date('2025-03-10'),
    resultDate: new Date('2025-03-31'),
    conductingBody: 'All India Management Association (AIMA)',
    category: 'Management',
    mode: 'both' as const,
    courses: ['MBA', 'PGDM', 'BBA'],
    syllabus: [
      'Language Comprehension',
      'Mathematical Skills',
      'Data Analysis and Sufficiency',
      'Intelligence and Critical Reasoning',
      'Indian and Global Environment',
    ],
    pattern: 'Available in CBT, PBT, and IBT modes. 150 questions in 120 minutes.',
    difficulty: 'Medium',
  },
  {
    examName: 'XAT 2025',
    slug: 'xat',
    fullName: 'Xavier Aptitude Test Exam',
    description: 'XAT is conducted by XLRI Jamshedpur on behalf of XAMI. It is widely considered one of the most comprehensive aptitude tests for management admissions.',
    eligibility: 'Bachelor Degree in any discipline from a recognized university.',
    applicationStartDate: new Date('2024-08-15'),
    applicationEndDate: new Date('2024-11-30'),
    examDate: new Date('2025-01-05'),
    resultDate: new Date('2025-01-20'),
    conductingBody: 'XLRI Jamshedpur',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Decision Making',
      'Verbal and Logical Ability',
      'Quantitative Ability & Data Interpretation',
      'General Knowledge',
    ],
    pattern: 'Online test with 100 questions of MCQ type and one analytical essay topic.',
    difficulty: 'Hard',
  },
  {
    examName: 'CMAT 2026',
    slug: 'cmat',
    fullName: 'Common Management Admission Test (CMAT)',
    description: 'CMAT is a national-level entrance exam conducted by NTA for admission to management programs in AICTE-approved institutions.',
    eligibility: 'Graduate in any discipline from a recognized institution.',
    applicationStartDate: new Date('2026-02-01'),
    applicationEndDate: new Date('2026-03-15'),
    examDate: new Date('2026-05-15'),
    resultDate: new Date('2026-06-05'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'PGDM'],
    syllabus: [
      'Quantitative Techniques & Data Interpretation',
      'Logical Reasoning',
      'Language Comprehension',
      'General Awareness',
      'Innovation & Entrepreneurship',
    ],
    pattern: 'Computer Based Test (CBT) with 100 multiple choice questions.',
    difficulty: 'Medium',
  },
  {
    examName: 'SNAP Exam',
    slug: 'snap',
    fullName: 'Symbiosis National Aptitude Test (SNAP)',
    description: 'SNAP is a common written test for candidates seeking admission to any post-graduate management programs offered by Symbiosis International University.',
    eligibility: 'Graduate from any recognized university with a minimum of 50% marks.',
    applicationStartDate: new Date('2025-08-20'),
    applicationEndDate: new Date('2025-11-20'),
    examDate: new Date('2025-12-10'),
    resultDate: new Date('2026-01-10'),
    conductingBody: 'Symbiosis International University',
    category: 'Management',
    mode: 'online' as const,
    courses: ['MBA', 'M.Sc.'],
    syllabus: [
      'General English: Reading Comprehension, Verbal Ability',
      'Analytical & Logical Reasoning',
      'Quantitative, Data Interpretation & Data Sufficiency',
    ],
    pattern: '60-minute CBT with 60 questions, negative marking of 0.25 for incorrect answers.',
    difficulty: 'Medium',
  },

  // ==========================================
  // ENGINEERING NEW EXAMS
  // ==========================================
  {
    examName: 'JEE Main 2026',
    slug: 'jee-main',
    fullName: 'Joint Entrance Examination (Main)',
    description: 'JEE Main is the premier national-level engineering entrance exam for NITs, IIITs, and other Centrally Funded Technical Institutions.',
    eligibility: '10+2 with Physics, Mathematics, and Chemistry/Biology/Biotech.',
    applicationStartDate: new Date('2026-01-10'),
    applicationEndDate: new Date('2026-03-02'),
    examDate: new Date('2026-04-15'),
    resultDate: new Date('2026-05-10'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['B.Tech', 'B.Arch', 'Allied'],
    syllabus: ['Mathematics', 'Physics', 'Chemistry'],
    pattern: 'MCQs and Numerical Value Questions, 3 hours.',
    difficulty: 'Hard',
  },
  {
    examName: 'JEE Advanced 2026',
    slug: 'jee-advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    description: 'JEE Advanced is the sole gateway for admission to the undergraduate programs of the Indian Institutes of Technology (IITs).',
    eligibility: 'Must qualify JEE Main and be within the top 2,50,000 candidates.',
    applicationStartDate: new Date('2026-04-26'),
    applicationEndDate: new Date('2026-05-05'),
    examDate: new Date('2026-05-24'),
    resultDate: new Date('2026-06-15'),
    conductingBody: 'Indian Institute of Technology (IIT) Delhi',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['B.Tech', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Mathematics (Advanced topics)'],
    pattern: 'Two papers of 3 hours each, testing analytical and comprehension abilities.',
    difficulty: 'Hard',
  },
  {
    examName: 'GATE 2026',
    slug: 'gate',
    fullName: 'Graduate Aptitude Test in Engineering',
    description: 'GATE is a highly competitive examination testing comprehensive understanding of undergraduate engineering and science subjects.',
    eligibility: 'Bachelor\'s degree in Engineering/Technology/Architecture/Science/Arts.',
    applicationStartDate: new Date('2025-08-30'),
    applicationEndDate: new Date('2025-10-15'),
    examDate: new Date('2026-02-07'),
    resultDate: new Date('2026-03-15'),
    conductingBody: 'Indian Institute of Science (IISc) Bangalore',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['B.Tech', 'Allied'],
    syllabus: ['General Aptitude', 'Engineering Mathematics', 'Technical Subject paper'],
    pattern: '65 questions (MCQs, MSQs, and NATs) in 180 minutes.',
    difficulty: 'Hard',
  },
  {
    examName: 'BITSAT 2026',
    slug: 'bitsat',
    fullName: 'BITS Admission Test',
    description: 'BITSAT is conducted by BITS Pilani for admission to integrated first-degree programs at its Pilani, Goa, and Hyderabad campuses.',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics/Biology with 75% marks.',
    applicationStartDate: new Date('2026-01-15'),
    applicationEndDate: new Date('2026-04-12'),
    examDate: new Date('2026-05-20'),
    resultDate: new Date('2026-06-05'),
    conductingBody: 'Birla Institute of Technology and Science (BITS) Pilani',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['B.Tech', 'B.Sc.', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'English Proficiency & Logical Reasoning', 'Mathematics/Biology'],
    pattern: '130 questions to be answered in 3 hours. Features extra questions for fast candidates.',
    difficulty: 'Medium to Hard',
  },
  {
    examName: 'SRMJEEE 2026',
    slug: 'srmjeee',
    fullName: 'SRM Joint Engineering Entrance Exam',
    description: 'SRMJEEE is conducted by SRM Institute of Science and Technology for admissions to B.Tech programs across all campuses.',
    eligibility: '10+2 with minimum 60% marks in Physics, Chemistry, and Mathematics.',
    applicationStartDate: new Date('2026-01-05'),
    applicationEndDate: new Date('2026-04-10'),
    examDate: new Date('2026-04-20'),
    resultDate: new Date('2026-05-02'),
    conductingBody: 'SRM Institute of Science and Technology',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['B.Tech'],
    syllabus: ['Physics', 'Chemistry', 'Mathematics', 'English & Aptitude'],
    pattern: '125 MCQs to be answered in 2.5 hours with no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'IPU CET BCA 2026',
    slug: 'ipu-cet-bca',
    fullName: 'Indraprastha University Common Entrance Test (BCA)',
    description: 'Conducted by GGSIPU Delhi for undergraduate computer application course placements.',
    eligibility: '10+2 with English and Mathematics/Computer Science/IP with 50% marks.',
    applicationStartDate: new Date('2026-02-01'),
    applicationEndDate: new Date('2026-04-15'),
    examDate: new Date('2026-05-18'),
    resultDate: new Date('2026-06-02'),
    conductingBody: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
    category: 'Engineering',
    mode: 'offline' as const,
    courses: ['BCA', 'Allied'],
    syllabus: ['English Language', 'Mathematics', 'Computer Awareness', 'General Knowledge'],
    pattern: '100 MCQs in 150 minutes, standard offline pen and paper exam.',
    difficulty: 'Medium',
  },
  {
    examName: 'NIMCET 2026',
    slug: 'nimcet',
    fullName: 'NIT MCA Common Entrance Test',
    description: 'NIMCET is the national level entrance test for admission into MCA programs across participating National Institutes of Technology.',
    eligibility: 'B.Sc. / B.Sc. (Hons) / BCA / BIT with Mathematics/Statistics as one subject.',
    applicationStartDate: new Date('2026-03-01'),
    applicationEndDate: new Date('2026-04-20'),
    examDate: new Date('2026-06-08'),
    resultDate: new Date('2026-06-25'),
    conductingBody: 'National Institute of Technology (NIT) Jamshedpur',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['BCA', 'Allied'],
    syllabus: ['Mathematics (600 marks)', 'Analytical Ability & Logical Reasoning', 'Computer Awareness', 'General English'],
    pattern: '120 MCQs in 120 minutes with a negative marking scheme.',
    difficulty: 'Hard',
  },
  {
    examName: 'Christ University BCA 2026',
    slug: 'christ-bca',
    fullName: 'Christ University Entrance Test (BCA)',
    description: 'Christ University entrance exam for the prestigious Bachelor of Computer Applications program in Bangalore.',
    eligibility: '10+2 from any recognized board in India.',
    applicationStartDate: new Date('2026-01-10'),
    applicationEndDate: new Date('2026-04-05'),
    examDate: new Date('2026-04-14'),
    resultDate: new Date('2026-04-22'),
    conductingBody: 'Christ University Bangalore',
    category: 'Engineering',
    mode: 'online' as const,
    courses: ['BCA'],
    syllabus: ['Fundamental Accounting', 'English', 'Mathematics', 'Logical Reasoning', 'Data Analysis'],
    pattern: 'Computer-based online entrance test followed by personal interview and micro-presentation.',
    difficulty: 'Medium',
  },

  // ==========================================
  // COMMERCE NEW EXAMS
  // ==========================================
  {
    examName: 'CA Foundation 2026',
    slug: 'ca-foundation',
    fullName: 'Chartered Accountants Foundation Examination',
    description: 'CA Foundation is the entry-level exam for the Chartered Accountancy course conducted by ICAI.',
    eligibility: 'Must have registered with Board of Studies of ICAI and passed 10+2.',
    applicationStartDate: new Date('2026-01-01'),
    applicationEndDate: new Date('2026-02-01'),
    examDate: new Date('2026-06-20'),
    resultDate: new Date('2026-08-10'),
    conductingBody: 'Institute of Chartered Accountants of India (ICAI)',
    category: 'Commerce',
    mode: 'offline' as const,
    courses: ['B.Com', 'Allied'],
    syllabus: ['Principles and Practice of Accounting', 'Business Laws', 'Quantitative Aptitude', 'Business Economics'],
    pattern: '4 papers (2 subjective of 100 marks each, 2 objective with negative marking).',
    difficulty: 'Hard',
  },
  {
    examName: 'CSEET 2026',
    slug: 'cseet',
    fullName: 'Company Secretary Executive Entrance Test',
    description: 'CSEET is the mandatory entrance test conducted by ICSI for admission to the Company Secretary Executive Program.',
    eligibility: 'Must have passed or appearing in 10+2 or equivalent examination.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-15'),
    examDate: new Date('2026-05-09'),
    resultDate: new Date('2026-05-20'),
    conductingBody: 'Institute of Company Secretaries of India (ICSI)',
    category: 'Commerce',
    mode: 'online' as const,
    courses: ['B.Com', 'Allied'],
    syllabus: ['Business Communication', 'Legal Aptitude & Logical Reasoning', 'Economic & Business Environment', 'Current Affairs'],
    pattern: 'Computer-based exam of 120 minutes containing 140 questions with no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'CMA Foundation 2026',
    slug: 'cma-foundation',
    fullName: 'Cost and Management Accountants Foundation',
    description: 'CMA Foundation is conducted by the Institute of Cost Accountants of India (ICMAI) as the gateway to the CMA course.',
    eligibility: '10+2 from a recognized board or equivalent.',
    applicationStartDate: new Date('2026-01-05'),
    applicationEndDate: new Date('2026-02-10'),
    examDate: new Date('2026-06-10'),
    resultDate: new Date('2026-07-05'),
    conductingBody: 'Institute of Cost Accountants of India (ICMAI)',
    category: 'Commerce',
    mode: 'online' as const,
    courses: ['B.Com', 'Allied'],
    syllabus: ['Fundamentals of Economics and Management', 'Fundamentals of Financial and Cost Accounting', 'Fundamentals of Laws and Ethics', 'Fundamentals of Business Mathematics and Statistics'],
    pattern: 'Online exam with Multiple Choice Questions across 4 papers.',
    difficulty: 'Medium',
  },
  {
    examName: 'CUET UG Commerce 2026',
    slug: 'cuet-ug-commerce',
    fullName: 'Common University Entrance Test (UG - Commerce)',
    description: 'CUET UG provides a common platform for admission to undergraduate programs in Central Universities across India.',
    eligibility: 'Must have passed 10+2 from a recognized education board.',
    applicationStartDate: new Date('2026-02-09'),
    applicationEndDate: new Date('2026-03-25'),
    examDate: new Date('2026-05-20'),
    resultDate: new Date('2026-07-02'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Commerce',
    mode: 'both' as const,
    courses: ['B.Com', 'Allied'],
    syllabus: ['Accountancy / Book Keeping', 'Business Studies', 'Economics / Business Economics', 'English Language'],
    pattern: 'Computer-based test (CBT) with section-wise objective type multiple choice questions.',
    difficulty: 'Medium',
  },

  // ==========================================
  // LAW NEW EXAMS
  // ==========================================
  {
    examName: 'AILET 2026',
    slug: 'ailet',
    fullName: 'All India Law Entrance Test',
    description: 'AILET is conducted by National Law University Delhi (NLU Delhi) for admissions to BA LLB (Hons), LLM, and Ph.D. programs.',
    eligibility: '10+2 with 45% marks (40% for SC/ST/PwD). No upper age limit.',
    applicationStartDate: new Date('2025-08-01'),
    applicationEndDate: new Date('2025-11-15'),
    examDate: new Date('2025-12-07'),
    resultDate: new Date('2025-12-25'),
    conductingBody: 'National Law University Delhi',
    category: 'Law',
    mode: 'offline' as const,
    courses: ['Allied', 'B.A.', 'LLB'],
    syllabus: ['English Language', 'Current Affairs & General Knowledge', 'Logical Reasoning'],
    pattern: '150 questions to be solved in 120 minutes with a negative marking of 0.25.',
    difficulty: 'Hard',
  },
  {
    examName: 'LSAT India 2026',
    slug: 'lsat-india',
    fullName: 'Law School Admission Test - India',
    description: 'LSAT India is a standardized test of reading and verbal reasoning skills, used by several premier private law colleges in India.',
    eligibility: '10+2 from a recognized board for 5-year integrated law, or graduation for 3-year LLB.',
    applicationStartDate: new Date('2025-11-10'),
    applicationEndDate: new Date('2026-05-02'),
    examDate: new Date('2026-05-16'),
    resultDate: new Date('2026-06-12'),
    conductingBody: 'Law School Admission Council (LSAC)',
    category: 'Law',
    mode: 'online' as const,
    courses: ['Allied', 'LLB'],
    syllabus: ['Analytical Reasoning', 'Logical Reasoning (Part 1 & 2)', 'Reading Comprehension'],
    pattern: '92 questions in 2 hours and 20 minutes across 4 timed sections, no negative marking.',
    difficulty: 'Medium to Hard',
  },
  {
    examName: 'MH CET Law 2026',
    slug: 'mhcet-law',
    fullName: 'Maharashtra Common Entrance Test for Law',
    description: 'State-level examination conducted by the State Common Entrance Test Cell, Maharashtra, for admissions to law courses.',
    eligibility: '10+2 with 45% aggregate (40% for MH SC/ST) for 5-year Integrated LLB.',
    applicationStartDate: new Date('2026-01-10'),
    applicationEndDate: new Date('2026-02-18'),
    examDate: new Date('2026-03-28'),
    resultDate: new Date('2026-04-30'),
    conductingBody: 'State Common Entrance Test Cell, Maharashtra',
    category: 'Law',
    mode: 'online' as const,
    courses: ['Allied', 'B.A.', 'LLB'],
    syllabus: ['Legal Aptitude and Legal Reasoning', 'General Knowledge with Current Affairs', 'Logical and Analytical Reasoning', 'English', 'Mathematical Ability'],
    pattern: '150 objective questions in 120 minutes with no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'SLAT 2026',
    slug: 'slat',
    fullName: 'Symbiosis Law Admission Test',
    description: 'Symbiosis Law Admission Test (SLAT) is the common entrance test for admission to BA LLB and BBA LLB programs in Symbiosis Law Schools.',
    eligibility: '10+2 or equivalent or 10+3 Diploma with minimum 45% marks from any recognized board.',
    applicationStartDate: new Date('2026-01-10'),
    applicationEndDate: new Date('2026-04-12'),
    examDate: new Date('2026-05-05'),
    resultDate: new Date('2026-05-15'),
    conductingBody: 'Symbiosis International University (SIU)',
    category: 'Law',
    mode: 'online' as const,
    courses: ['Allied', 'LLB'],
    syllabus: ['Logical Reasoning', 'Legal Reasoning', 'Analytical Reasoning', 'Reading Comprehension', 'General Knowledge'],
    pattern: '60 MCQs in 60 minutes, followed by Writing Ability Test (WAT) and Personal Interaction (PI).',
    difficulty: 'Medium',
  },

  // ==========================================
  // ARTS NEW EXAMS
  // ==========================================
  {
    examName: 'CUET UG Arts 2026',
    slug: 'cuet-ug-arts',
    fullName: 'Common University Entrance Test (UG - Arts)',
    description: 'Gateway for admission to Bachelor of Arts (BA Hons) and other humanities courses in premium Central Universities.',
    eligibility: '10+2 from a recognized board in any stream.',
    applicationStartDate: new Date('2026-02-09'),
    applicationEndDate: new Date('2026-03-25'),
    examDate: new Date('2026-05-22'),
    resultDate: new Date('2026-07-02'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Arts',
    mode: 'both' as const,
    courses: ['B.A.', 'Allied'],
    syllabus: ['English Language', 'History', 'Political Science', 'Sociology / Geography', 'General Test'],
    pattern: 'Computer-based test containing multi-choice objective sections.',
    difficulty: 'Medium',
  },
  {
    examName: 'TISSNET 2026',
    slug: 'tissnet',
    fullName: 'Tata Institute of Social Sciences NET',
    description: 'TISSNET is conducted for admissions to Master of Arts and other postgraduate social work programs of TISS campuses.',
    eligibility: 'Bachelor\'s degree of minimum 3 or 4 years duration or equivalent from a recognized university.',
    applicationStartDate: new Date('2025-10-15'),
    applicationEndDate: new Date('2025-11-30'),
    examDate: new Date('2026-01-10'),
    resultDate: new Date('2026-02-15'),
    conductingBody: 'Tata Institute of Social Sciences (TISS)',
    category: 'Arts',
    mode: 'online' as const,
    courses: ['B.A.', 'Allied'],
    syllabus: ['General Awareness', 'Mathematical & Logical Reasoning', 'English Proficiency'],
    pattern: '100 multiple choice questions to be answered in 100 minutes, with no negative marking.',
    difficulty: 'Medium to Hard',
  },
  {
    examName: 'PUBDET 2026',
    slug: 'pubdet',
    fullName: 'Presidency University Bachelor Degree Entrance Test',
    description: 'PUBDET is conducted by WBJEEB for admission to three-year B.A. and B.Sc. Honors programs at Presidency University, Kolkata.',
    eligibility: '10+2 from a recognized board with minimum aggregate requirements based on subject selection.',
    applicationStartDate: new Date('2026-02-10'),
    applicationEndDate: new Date('2026-03-18'),
    examDate: new Date('2026-06-21'),
    resultDate: new Date('2026-07-15'),
    conductingBody: 'West Bengal Joint Entrance Examinations Board (WBJEEB)',
    category: 'Arts',
    mode: 'offline' as const,
    courses: ['B.A.', 'B.Sc.'],
    syllabus: ['Subject specific syllabus (English, History, Sociology, Economics, etc.)'],
    pattern: 'OMR based offline exam with 50 MCQs to be answered in 90 minutes.',
    difficulty: 'Medium',
  },
  {
    examName: 'HSEE 2026',
    slug: 'hsee',
    fullName: 'Humanities and Social Sciences Entrance Examination',
    description: 'Conducted by IIT Madras for admissions to its integrated five-year Master of Arts (M.A.) program.',
    eligibility: '10+2 with minimum 60% aggregate marks (55% for SC/ST/PD) from a recognized board.',
    applicationStartDate: new Date('2026-03-01'),
    applicationEndDate: new Date('2026-04-15'),
    examDate: new Date('2026-06-07'),
    resultDate: new Date('2026-06-28'),
    conductingBody: 'Indian Institute of Technology (IIT) Madras',
    category: 'Arts',
    mode: 'online' as const,
    courses: ['B.A.', 'Allied'],
    syllabus: ['English, Analytical & Quantitative Ability', 'General Studies (Indian Economy, Society, World Affairs)'],
    pattern: 'Part I: 150-minute computer test, Part II: 30-minute essay writing section.',
    difficulty: 'Hard',
  },
  {
    examName: 'RIE CEE B.Ed 2026',
    slug: 'rie-cee',
    fullName: 'Regional Institute of Education Common Entrance Exam',
    description: 'National level entrance examination conducted by NCERT for admission to various teacher education programs (B.Ed, B.A. B.Ed, B.Sc. B.Ed).',
    eligibility: 'Must hold a graduation or post-graduation degree in Science/Social Sciences/Humanities with 50% marks.',
    applicationStartDate: new Date('2026-04-10'),
    applicationEndDate: new Date('2026-05-10'),
    examDate: new Date('2026-06-14'),
    resultDate: new Date('2026-07-05'),
    conductingBody: 'National Council of Educational Research and Training (NCERT)',
    category: 'Arts',
    mode: 'offline' as const,
    courses: ['B.Ed'],
    syllabus: ['Language Proficiency in English', 'Teaching Aptitude / Attitude', 'Reasoning Ability'],
    pattern: '80 MCQs in 120 minutes with a negative marking of 0.25.',
    difficulty: 'Medium',
  },
  {
    examName: 'DU B.Ed 2026',
    slug: 'du-bed',
    fullName: 'Delhi University Bachelor of Education Entrance',
    description: 'Admissions gateway for the prestigious B.Ed program offered by Faculty of Education under the University of Delhi.',
    eligibility: 'Bachelor\'s Degree and/or Master\'s Degree in Science/Social Sciences/Humanities with 50% marks.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-05'),
    examDate: new Date('2026-05-28'),
    resultDate: new Date('2026-06-20'),
    conductingBody: 'University of Delhi (Faculty of Education)',
    category: 'Arts',
    mode: 'online' as const,
    courses: ['B.Ed'],
    syllabus: ['Subject Knowledge (up to Class X)', 'Language Proficiency (English/Hindi)', 'Reasoning & General Awareness'],
    pattern: '100 MCQs in 120 minutes, conducted through CUET PG guidelines.',
    difficulty: 'Medium',
  },
  {
    examName: 'BHU B.Ed 2026',
    slug: 'bhu-bed',
    fullName: 'Banaras Hindu University B.Ed Admission Test',
    description: 'BHU B.Ed entrance is conducted by NTA under CUET PG, for teacher training admissions in Faculty of Education, BHU.',
    eligibility: '50% marks in Bachelor degree and/or Master degree in Science, Social Science, Humanities.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-10'),
    examDate: new Date('2026-05-30'),
    resultDate: new Date('2026-06-25'),
    conductingBody: 'Banaras Hindu University (NTA)',
    category: 'Arts',
    mode: 'online' as const,
    courses: ['B.Ed'],
    syllabus: ['Teaching Aptitude', 'Reasoning, General Awareness', 'Subject Group Knowledge (Languages/Science/Maths/Social Sciences)'],
    pattern: 'Computer-based test of 100 questions, total duration 120 minutes.',
    difficulty: 'Medium',
  },

  // ==========================================
  // ARCHITECTURE NEW EXAMS
  // ==========================================
  {
    examName: 'NATA 2026',
    slug: 'nata',
    fullName: 'National Aptitude Test in Architecture',
    description: 'NATA is conducted by the Council of Architecture (CoA) for admission to the first year of 5-year B.Arch degree courses in India.',
    eligibility: 'Passed 10+2 with Physics, Chemistry & Mathematics, or 10+3 Diploma with Mathematics.',
    applicationStartDate: new Date('2026-02-01'),
    applicationEndDate: new Date('2026-03-20'),
    examDate: new Date('2026-04-06'),
    resultDate: new Date('2026-04-20'),
    conductingBody: 'Council of Architecture (CoA)',
    category: 'Architecture',
    mode: 'online' as const,
    courses: ['Allied', 'B.Arch'],
    syllabus: ['Drawing and Visual Composition', 'Cognitive Skills', 'Mathematics & General Aptitude'],
    pattern: 'Computer-based test containing MCQ, MSQ, PCQ, and numerical questions, 180 minutes.',
    difficulty: 'Medium',
  },
  {
    examName: 'JEE Main Paper 2 2026',
    slug: 'jee-main-paper2',
    fullName: 'Joint Entrance Examination (Paper 2)',
    description: 'JEE Main Paper 2 is the gateway for admissions to B.Arch and B.Plan courses offered by SPAs, NITs, and select CFTIs.',
    eligibility: '10+2 with Physics, Chemistry, and Mathematics (minimum 50% marks).',
    applicationStartDate: new Date('2026-01-10'),
    applicationEndDate: new Date('2026-03-02'),
    examDate: new Date('2026-04-18'),
    resultDate: new Date('2026-05-15'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Architecture',
    mode: 'online' as const,
    courses: ['Allied', 'B.Arch'],
    syllabus: ['Mathematics (Part I)', 'Aptitude Test (Part II)', 'Drawing Test (Part III - Pen and Paper)'],
    pattern: 'Mixed Computer-based (Maths & Aptitude) and offline (Drawing) test, 3 hours.',
    difficulty: 'Hard',
  },
  {
    examName: 'AAT 2026',
    slug: 'aat',
    fullName: 'Architecture Aptitude Test',
    description: 'AAT is the entrance test for candidates seeking admission to the 5-year Bachelor of Architecture (B.Arch) program at IIT Roorkee, IIT Kharagpur, and IIT BHU.',
    eligibility: 'Must have qualified JEE Advanced 2026 and registered for AAT.',
    applicationStartDate: new Date('2026-06-02'),
    applicationEndDate: new Date('2026-06-08'),
    examDate: new Date('2026-06-12'),
    resultDate: new Date('2026-06-18'),
    conductingBody: 'Joint Admission Board (JAB) / IITs',
    category: 'Architecture',
    mode: 'offline' as const,
    courses: ['Allied', 'B.Arch'],
    syllabus: ['Freehand Drawing', 'Geometrical Drawing', 'Three-Dimensional Perception', 'Imagination and Aesthetic Sensitivity'],
    pattern: '3-hour pen and paper drawing examination held only at IIT campuses.',
    difficulty: 'Hard',
  },

  // ==========================================
  // DENTAL NEW EXAMS
  // ==========================================
  {
    examName: 'NEET MDS 2026',
    slug: 'neet-mds',
    fullName: 'National Eligibility cum Entrance Test for MDS',
    description: 'NEET MDS is the single entrance exam for admission to various Post Graduate MDS courses under the Dentists Act.',
    eligibility: 'BDS degree from a recognized university and completion of 1-year rotatory internship.',
    applicationStartDate: new Date('2025-12-15'),
    applicationEndDate: new Date('2026-01-25'),
    examDate: new Date('2026-03-08'),
    resultDate: new Date('2026-04-02'),
    conductingBody: 'National Board of Examinations (NBE)',
    category: 'Dental',
    mode: 'online' as const,
    courses: ['BDS', 'Allied'],
    syllabus: ['General Anatomy', 'Dental Anatomy', 'Oral Pathology', 'Orthodontics', 'Periodontics', 'Prosthodontics'],
    pattern: '240 multiple-choice questions (MCQs) in English, 3 hours duration.',
    difficulty: 'Hard',
  },
  {
    examName: 'NEET UG Dental 2026',
    slug: 'neet-ug-dental',
    fullName: 'National Eligibility cum Entrance Test (UG) for BDS',
    description: 'NEET UG is the highly competitive national-level entrance exam for securing Bachelor of Dental Surgery (BDS) seats in India.',
    eligibility: '10+2 with Physics, Chemistry, Biology/Biotech, and English with 50% aggregate.',
    applicationStartDate: new Date('2026-02-09'),
    applicationEndDate: new Date('2026-03-10'),
    examDate: new Date('2026-05-03'),
    resultDate: new Date('2026-06-15'),
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Dental',
    mode: 'offline' as const,
    courses: ['BDS', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Biology (Botany & Zoology)'],
    pattern: '180 objective questions (out of 200) to be solved in 200 minutes on OMR sheet.',
    difficulty: 'Hard',
  },
  {
    examName: 'AIIMS Dental 2026',
    slug: 'aiims-dental',
    fullName: 'AIIMS Bachelor of Dental Surgery Entrance',
    description: 'AIIMS Dental entrance is conducted for admissions to BDS seats at select All India Institutes of Medical Sciences.',
    eligibility: '10+2 with Physics, Chemistry, Biology and English with 60% aggregate.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-12'),
    examDate: new Date('2026-06-01'),
    resultDate: new Date('2026-06-18'),
    conductingBody: 'All India Institute of Medical Sciences (AIIMS)',
    category: 'Dental',
    mode: 'online' as const,
    courses: ['BDS', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Biology', 'General Knowledge / Aptitude'],
    pattern: 'Computer Based Test with multiple-choice questions.',
    difficulty: 'Hard',
  },
  {
    examName: 'JIPMER Dental 2026',
    slug: 'jipmer-dental',
    fullName: 'JIPMER BDS Entrance Cycle',
    description: 'JIPMER dental entrance admission process for Bachelor of Dental Surgery seats.',
    eligibility: 'Passed 10+2 with Physics, Chemistry, Biology/Biotech and English with 50% marks.',
    applicationStartDate: new Date('2026-02-10'),
    applicationEndDate: new Date('2026-03-15'),
    examDate: new Date('2026-05-10'),
    resultDate: new Date('2026-06-10'),
    conductingBody: 'Jawaharlal Institute of Postgraduate Medical Education & Research',
    category: 'Dental',
    mode: 'online' as const,
    courses: ['BDS', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Biology', 'English Language and Comprehension', 'Logical and Quantitative Reasoning'],
    pattern: 'Computer-based test of 200 questions, 150 minutes duration.',
    difficulty: 'Medium to Hard',
  },

  // ==========================================
  // AGRICULTURE NEW EXAMS
  // ==========================================
  {
    examName: 'ICAR AIEEA 2026',
    slug: 'icar-aieea',
    fullName: 'ICAR All India Entrance Examination for Admission',
    description: 'ICAR AIEEA UG is the national-level exam for admission to bachelor degree programmes in agriculture and allied sciences in agricultural universities.',
    eligibility: 'Passed 10+2 with PCM/PCB/PCMB/Agriculture with 50% marks in aggregate.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-02'),
    examDate: new Date('2026-05-15'),
    resultDate: new Date('2026-06-15'),
    conductingBody: 'National Testing Agency (NTA) / ICAR',
    category: 'Agriculture',
    mode: 'online' as const,
    courses: ['B.Sc.', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Mathematics/Biology/Agriculture'],
    pattern: 'Computer Based Test (CBT) with 150 objective questions, 150 minutes duration.',
    difficulty: 'Medium',
  },
  {
    examName: 'MP PAT 2026',
    slug: 'mp-pat',
    fullName: 'Madhya Pradesh Pre-Agriculture Test',
    description: 'MP PAT is a state-level entrance test conducted by Vyapam for admission to B.Sc. (Agriculture) and B.Sc. (Forestry) courses in Madhya Pradesh.',
    eligibility: '10+2 in Science (PCB/PCM) or Agriculture from a recognized board.',
    applicationStartDate: new Date('2026-04-01'),
    applicationEndDate: new Date('2026-05-02'),
    examDate: new Date('2026-06-08'),
    resultDate: new Date('2026-07-02'),
    conductingBody: 'MP Professional Examination Board (PEB)',
    category: 'Agriculture',
    mode: 'offline' as const,
    courses: ['B.Sc.', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Mathematics/Biology or Elements of Agriculture'],
    pattern: 'Offline pen-paper test with 200 questions in 3 hours with no negative marking.',
    difficulty: 'Medium',
  },
  {
    examName: 'UPCATET 2026',
    slug: 'upcatet',
    fullName: 'UP Combined Agriculture and Technology Entrance Test',
    description: 'UPCATET is a state-level exam conducted for admission to various UG and PG agriculture courses in UP agricultural universities.',
    eligibility: 'Passed 10+2 with Agricultural Science / Physics, Chemistry & Biology / Mathematics.',
    applicationStartDate: new Date('2026-02-15'),
    applicationEndDate: new Date('2026-04-15'),
    examDate: new Date('2026-05-30'),
    resultDate: new Date('2026-06-25'),
    conductingBody: 'Chandra Shekhar Azad University of Agriculture & Technology',
    category: 'Agriculture',
    mode: 'offline' as const,
    courses: ['B.Sc.', 'Allied'],
    syllabus: ['General Studies', 'Physics', 'Chemistry', 'Mathematics / Biology / Agriculture domain subjects'],
    pattern: 'Pen and paper offline test containing 200 multiple-choice questions, duration 3 hours.',
    difficulty: 'Medium',
  },
  {
    examName: 'Bihar BCECE Agriculture 2026',
    slug: 'bihar-ugeac-agri',
    fullName: 'Bihar Combined Entrance Competitive Examination (Agriculture)',
    description: 'BCECE agriculture is the entrance exam for securing B.Sc. Agriculture and Horticulture seats in government colleges of Bihar.',
    eligibility: '10+2 passed with Physics, Chemistry and Biology/Maths/Agri subjects.',
    applicationStartDate: new Date('2026-04-12'),
    applicationEndDate: new Date('2026-05-12'),
    examDate: new Date('2026-06-15'),
    resultDate: new Date('2026-07-12'),
    conductingBody: 'Bihar Combined Entrance Competitive Examination Board (BCECEB)',
    category: 'Agriculture',
    mode: 'offline' as const,
    courses: ['B.Sc.', 'Allied'],
    syllabus: ['Physics', 'Chemistry', 'Biology / Mathematics / Agricultural Science'],
    pattern: 'Subject-wise papers of 100 questions each, duration 90 minutes per subject.',
    difficulty: 'Medium',
  },

  // ==========================================
  // DESIGN NEW EXAMS
  // ==========================================
  {
    examName: 'UCEED 2026',
    slug: 'uceed',
    fullName: 'Undergraduate Common Entrance Examination for Design',
    description: 'UCEED is conducted by IIT Bombay for admissions to the Bachelor of Design (B.Des) programs at IIT Bombay, IIT Delhi, IIT Guwahati, IIT Hyderabad, and IIITDM Jabalpur.',
    eligibility: 'Passed 10+2 or equivalent in any stream (Science, Commerce, or Arts & Humanities).',
    applicationStartDate: new Date('2025-10-01'),
    applicationEndDate: new Date('2025-11-10'),
    examDate: new Date('2026-01-18'),
    resultDate: new Date('2026-03-08'),
    conductingBody: 'Indian Institute of Technology (IIT) Bombay',
    category: 'Design',
    mode: 'offline' as const,
    courses: ['Allied', 'B.Arch'],
    syllabus: ['Visualization and Spatial Ability', 'Observation and Design Sensitivity', 'Analytical and Logical Reasoning', 'Drawing / Creativity'],
    pattern: 'Part-A (Computer-based test of 2 hours) and Part-B (Offline drawing test of 1 hour).',
    difficulty: 'Hard',
  },
  {
    examName: 'NID DAT 2026',
    slug: 'nid-dat',
    fullName: 'National Institute of Design - Design Aptitude Test',
    description: 'NID DAT is the national-level entrance exam conducted for admissions to Bachelor of Design (B.Des) courses across NID campuses.',
    eligibility: 'Passed or appearing in 10+2 in any stream from a recognized board.',
    applicationStartDate: new Date('2025-09-08'),
    applicationEndDate: new Date('2025-11-05'),
    examDate: new Date('2025-12-28'),
    resultDate: new Date('2026-02-15'),
    conductingBody: 'National Institute of Design (NID)',
    category: 'Design',
    mode: 'offline' as const,
    courses: ['Allied'],
    syllabus: ['NID DAT Prelims: Visual Analysis, Color and Composition, General mental ability', 'NID DAT Mains: Studio Test (Model making, material handling)'],
    pattern: 'Prelims (3-hour written exam containing objective and subjective design questions) followed by Mains (Studio test).',
    difficulty: 'Hard',
  },
  {
    examName: 'NIFT GCAT 2026',
    slug: 'nift-gcat',
    fullName: 'NIFT Entrance Examination (GAT & CAT)',
    description: 'NIFT entrance exam is conducted by NIFT for admissions to undergraduate design courses across 18 NIFT campuses.',
    eligibility: '10+2 from a recognized board. Maximum age limit is 24 years.',
    applicationStartDate: new Date('2025-11-01'),
    applicationEndDate: new Date('2025-12-31'),
    examDate: new Date('2026-02-05'),
    resultDate: new Date('2026-03-10'),
    conductingBody: 'National Institute of Fashion Technology (NIFT)',
    category: 'Design',
    mode: 'both' as const,
    courses: ['Allied'],
    syllabus: ['General Ability Test (Quantitative, Communication, English, GK)', 'Creative Ability Test (Intuitive ability, design sketch, concept illustration)'],
    pattern: 'Written exams: GAT (CBT mode) and CAT (Offline drawing mode), followed by a Situation Test.',
    difficulty: 'Medium to Hard',
  },
  {
    examName: 'SEED 2026',
    slug: 'seed-design',
    fullName: 'Symbiosis Entrance Exam for Design',
    description: 'SEED is conducted by Symbiosis International (Deemed University) for admission to the B.Des programs at Symbiosis Institute of Design.',
    eligibility: '10+2 or equivalent or 10+3 Diploma with minimum 50% marks from a recognized board.',
    applicationStartDate: new Date('2025-09-05'),
    applicationEndDate: new Date('2025-12-15'),
    examDate: new Date('2026-01-11'),
    resultDate: new Date('2026-01-22'),
    conductingBody: 'Symbiosis International (Deemed University)',
    category: 'Design',
    mode: 'online' as const,
    courses: ['Allied'],
    syllabus: ['Visualization', 'Observational Skills', 'Creative Thinking & Writing', 'Art & Craft History', 'Design Awareness'],
    pattern: '150-minute online test containing objective questions, followed by PRPI (Portfolio Review & Personal Interview).',
    difficulty: 'Medium',
  }
];

const defaultScholarships = [
  {
    scholarshipName: 'Aditya Birla Academy Scholarship',
    slug: 'aditya-birla',
    amount: '₹1,80,000 / Year',
    eligibility: 'Top 20 students in CLAT / CAT rank list, or top 50 in JEE Advanced',
    deadline: new Date('2026-09-30'),
    provider: 'Aditya Birla Group',
    type: 'Merit-Based',
    description: 'Academic tuition support for premier institute entrants.',
    details: 'This scholarship covers tuition and hostel fees for students joining premier law schools, IITs, and B-schools, honoring meritorious academic achievements throughout their course.',
  },
  {
    scholarshipName: 'Reliance Foundation Undergraduate Scholarship',
    slug: 'reliance-foundation',
    amount: 'Up to ₹2,00,000 / Year',
    eligibility: '1st-year UG students with family income < ₹15 Lakhs; Aptitude test clearance required',
    deadline: new Date('2026-10-15'),
    provider: 'Reliance Foundation',
    type: 'Need-cum-Merit',
    description: 'Support for deserving undergraduate students in engineering and IT fields.',
    details: 'Aims to support students in fields like engineering, medicine, and humanities. Awardees receive funding and access to mentoring and leadership workshops.',
  },
  {
    scholarshipName: "L'Oréal India For Young Women In Science",
    slug: 'loreal-science',
    amount: '₹2,50,000 Total',
    eligibility: 'Female students who passed 10+2 with PCB/PCM (min 85%) and family income < ₹6 LPA',
    deadline: new Date('2026-08-31'),
    provider: "L'Oréal India",
    type: 'Women in STEM',
    description: 'Financial aid for girls entering scientific careers.',
    details: 'Provides financial aid to young, passionate girls to pursue higher education in any scientific discipline at a recognized university in India.',
  },
];

const defaultBlogs = [
  {
    title: 'How to Crack CAT 2026: Strategy from a 100 Percentiler',
    slug: 'how-to-crack-cat',
    content: 'The Common Admission Test (CAT) is one of the most competitive exams globally, serving as the gateway to the elite Indian Institutes of Management (IIMs). In this detailed guide, Siddharth Sharma, who achieved a perfect 100 percentile in CAT 2025, shares his section-by-section preparation strategy, recommendations for mock tests, time management tips during the exam, and advice on handling pressure. Key highlights include: focusing on accuracy in Verbal Ability (VARC), building structured logic blocks for Data Interpretation (DILR), and selective question choice in Quant (QA).',
    excerpt: 'Cracking the Common Admission Test requires more than just knowing math formulas. It requires a mock strategy, section-wise timing, and mental resilience.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80',
    author: 'Siddharth Sharma',
    category: 'Exam Tips',
    tags: ['CAT', 'MBA', 'Exam Preparation'],
    readTime: '6 mins read',
    publishedAt: new Date('2026-06-12'),
  },
  {
    title: 'Top 5 College Destinations in India for Tech Graduates',
    slug: 'top-college-destinations-india',
    content: 'Choosing a college is not just about the institute itself; geography plays a massive role in internships, industry exposure, and placement opportunities. Bangalore (the Silicon Valley of India), Hyderabad, Pune, Mumbai, and Delhi NCR stand out as prime tech hubs. We break down the cost of living, presence of tech companies, local networking events, and the top engineering institutions in each of these cities to help you make an informed choice for your undergraduate studies.',
    excerpt: 'Explore why cities like Bangalore, Pune, and Hyderabad have become the absolute hotspots for technology studies and post-grad placements.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&h=250&q=80',
    author: 'Priya Narang',
    category: 'Admission Updates',
    tags: ['Engineering', 'Placements', 'Cities'],
    readTime: '8 mins read',
    publishedAt: new Date('2026-06-05'),
  },
];

const defaultColleges = [
  {
    "collegeName": "IILM University, Greater Noida",
    "name": "IILM University, Greater Noida",
    "slug": "iilm-university-greater-noida",
    "logo": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
    "description": "IILM University Greater Noida is a premier educational institution known for its high-quality management and engineering programs, state-of-the-art campus, and outstanding industry connections.",
    "about": "IILM University Greater Noida is a premier educational institution known for its high-quality management and engineering programs, state-of-the-art campus, and outstanding industry connections.",
    "city": "Greater Noida",
    "state": "Uttar Pradesh",
    "location": "Uttar Pradesh, Greater Noida",
    "country": "India",
    "ranking": "#45 in India (Private Universities)",
    "nirfRanking": 45,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 2001,
    "fees": "₹1.8 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "7.5 LPA",
    "highestPackage": "36 LPA",
    "placements": "7.5 LPA Average",
    "rating": 8.2,
    "category": "Management",
    "website": "https://iilm.edu",
    "images": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.8 Lakhs",
        "seats": 180
      },
      {
        "name": "MBA (General Management)",
        "fees": "₹2.4 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "Amazon",
        "package": "₹36.0 LPA"
      },
      {
        "company": "Wipro",
        "package": "₹6.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Merit Scholarship",
        "criteria": "Marks > 90%",
        "amount": "50% Tuition Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Standard AC Room",
        "sharing": "Twin",
        "fees": "₹1.1 Lakhs / Year"
      }
    ],
    "reviews": [
      {
        "name": "Rohan Sharma",
        "rating": 4,
        "text": "Great environment, helpful faculty, and nice placements.",
        "date": "2026-05-10"
      }
    ],
    "faq": [
      {
        "q": "Is transport available?",
        "a": "Yes, buses connect all parts of Delhi-NCR."
      }
    ],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "36 LPA",
    "phone": "+91 120 232 1000",
    "address": "Knowledge Park II, Greater Noida, Uttar Pradesh 201306",
    "email": "admissions.gn@iilm.edu"
  },
  {
    "collegeName": "Sushant University, Gurugram",
    "name": "Sushant University, Gurugram",
    "slug": "sushant-university-gurugram",
    "logo": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
    "description": "Sushant University, formerly Ansal University, offers various undergraduate and postgraduate courses in fields like architecture, design, law, management, and engineering, focusing on holistic learning.",
    "about": "Sushant University, formerly Ansal University, offers various undergraduate and postgraduate courses in fields like architecture, design, law, management, and engineering, focusing on holistic learning.",
    "city": "Gurugram",
    "state": "Haryana",
    "location": "Haryana, Gurugram",
    "country": "India",
    "ranking": "#52 in India (Private Universities)",
    "nirfRanking": 52,
    "accreditation": "UGC Approved",
    "establishedYear": 2012,
    "fees": "₹2.2 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "6.8 LPA",
    "highestPackage": "32 LPA",
    "placements": "6.8 LPA Average",
    "rating": 8,
    "category": "Management",
    "website": "https://sushantuniversity.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Marketing",
        "fees": "₹2.2 Lakhs",
        "seats": 60
      },
      {
        "name": "BBA (General)",
        "fees": "₹1.5 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "KPMG",
        "package": "₹8.0 LPA"
      },
      {
        "company": "Deloitte",
        "package": "₹7.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Sports Scholarship",
        "criteria": "State level participation",
        "amount": "25% Tuition Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Premium Girls Hostel",
        "sharing": "Twin",
        "fees": "₹1.2 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "32 LPA",
    "phone": "+91 124 4750400",
    "address": "Sector 55, Golf Course Road, Gurugram, Haryana 122003",
    "email": "admissions@sushantuniversity.edu.in"
  },
  {
    "collegeName": "Haridwar University, Roorkee",
    "name": "Haridwar University, Roorkee",
    "slug": "haridwar-university-roorkee",
    "logo": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    "description": "Haridwar University Roorkee is committed to quality technical education, offering industry-aligned engineering courses in Uttarakhand.",
    "about": "Haridwar University Roorkee is committed to quality technical education, offering industry-aligned engineering courses in Uttarakhand.",
    "city": "Roorkee",
    "state": "Uttarakhand",
    "location": "Uttarakhand, Roorkee",
    "country": "India",
    "ranking": "#68 in India (Engineering)",
    "nirfRanking": 68,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 2010,
    "fees": "₹1.2 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.5 LPA",
    "highestPackage": "18 LPA",
    "placements": "5.5 LPA Average",
    "rating": 7.8,
    "category": "Engineering",
    "website": "https://huroorkee.ac.in",
    "images": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Mechanical Engineering",
        "fees": "₹1.2 Lakhs",
        "seats": 60
      },
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.4 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "TCS",
        "package": "₹4.5 LPA"
      },
      {
        "company": "Infosys",
        "package": "₹4.0 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Uttarakhand State Merit",
        "criteria": "State Board Top 100",
        "amount": "Full Tuition Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Standard Room",
        "sharing": "Triple",
        "fees": "₹75,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "18 LPA",
    "phone": "+91 74550 25000",
    "address": "Roorkee-Haridwar Highway, Roorkee, Uttarakhand 247667",
    "email": "admissions@huroorkee.ac.in"
  },
  {
    "collegeName": "Future University, Bareilly",
    "name": "Future University, Bareilly",
    "slug": "future-university-bareilly",
    "logo": "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&w=1200&q=80",
    "description": "Future University bareilly provides a wide variety of courses in engineering, business management, and computer science, prioritizing career readiness and practical exposure.",
    "about": "Future University bareilly provides a wide variety of courses in engineering, business management, and computer science, prioritizing career readiness and practical exposure.",
    "city": "Bareilly",
    "state": "Uttar Pradesh",
    "location": "Uttar Pradesh, Bareilly",
    "country": "India",
    "ranking": "#75 in India",
    "nirfRanking": 75,
    "accreditation": "AICTE & UGC Approved",
    "establishedYear": 2009,
    "fees": "₹1.1 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.2 LPA",
    "highestPackage": "15 LPA",
    "placements": "5.2 LPA Average",
    "rating": 7.7,
    "category": "Engineering",
    "website": "https://futureuniversity.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Civil Engineering",
        "fees": "₹1.1 Lakhs",
        "seats": 60
      },
      {
        "name": "B.Tech in Information Technology",
        "fees": "₹1.2 Lakhs",
        "seats": 90
      }
    ],
    "placementDetails": [
      {
        "company": "Tech Mahindra",
        "package": "₹4.5 LPA"
      },
      {
        "company": "HCL Tech",
        "package": "₹4.0 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Academic Concession",
        "criteria": "Marks > 80%",
        "amount": "₹15,000 / Year"
      }
    ],
    "hostels": [
      {
        "type": "Boys Shared Room",
        "sharing": "Twin",
        "fees": "₹80,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "15 LPA",
    "phone": "+91 99174 80040",
    "address": "Bareilly-Lucknow Road, Near Faridpur, Bareilly, Uttar Pradesh 243503",
    "email": "info@futureuniversity.edu.in"
  },
  {
    "collegeName": "Sanskriti University, Mathura",
    "name": "Sanskriti University, Mathura",
    "slug": "sanskriti-university-mathura",
    "logo": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    "description": "Sanskriti University Mathura focuses on providing value-based education in diverse disciplines, including technology, management, agriculture, and healthcare.",
    "about": "Sanskriti University Mathura focuses on providing value-based education in diverse disciplines, including technology, management, agriculture, and healthcare.",
    "city": "Mathura",
    "state": "Uttar Pradesh",
    "location": "Uttar Pradesh, Mathura",
    "country": "India",
    "ranking": "#35 in India (Private Universities)",
    "nirfRanking": 35,
    "accreditation": "UGC Approved",
    "establishedYear": 2016,
    "fees": "₹1.5 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "6.0 LPA",
    "highestPackage": "22 LPA",
    "placements": "6.0 LPA Average",
    "rating": 8.1,
    "category": "Management",
    "website": "https://sanskriti.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Finance",
        "fees": "₹1.5 Lakhs",
        "seats": 60
      },
      {
        "name": "BBA (General)",
        "fees": "₹1.0 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "HDFC Bank",
        "package": "₹6.5 LPA"
      },
      {
        "company": "Genpact",
        "package": "₹5.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Sanskriti Merit Scholarship",
        "criteria": "Class 12 Marks > 95%",
        "amount": "100% Tuition Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Standard Shared",
        "sharing": "Twin",
        "fees": "₹90,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "22 LPA",
    "phone": "+91 75007 22200",
    "address": "Chhata, Mathura, Uttar Pradesh 281401",
    "email": "admissions@sanskriti.edu.in"
  },
  {
    "collegeName": "Sanskriti University, Bareilly",
    "name": "Sanskriti University, Bareilly",
    "slug": "sanskriti-university-bareilly",
    "logo": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80",
    "description": "Sanskriti University Bareilly is a modern extension campus offering specialized undergraduate and diploma engineering programs.",
    "about": "Sanskriti University Bareilly is a modern extension campus offering specialized undergraduate and diploma engineering programs.",
    "city": "Bareilly",
    "state": "Uttar Pradesh",
    "location": "Uttar Pradesh, Bareilly",
    "country": "India",
    "ranking": "#72 in India",
    "nirfRanking": 72,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 2018,
    "fees": "₹1.3 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.8 LPA",
    "highestPackage": "20 LPA",
    "placements": "5.8 LPA Average",
    "rating": 7.9,
    "category": "Engineering",
    "website": "https://sanskritibareilly.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in CSE",
        "fees": "₹1.3 Lakhs",
        "seats": 60
      },
      {
        "name": "Diploma in Electrical Engineering",
        "fees": "₹60,000",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Wipro",
        "package": "₹4.8 LPA"
      },
      {
        "company": "Cognizant",
        "package": "₹4.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "State Aid",
        "criteria": "Financial constraints",
        "amount": "₹20,000 / Year"
      }
    ],
    "hostels": [
      {
        "type": "Boys Hostel Room",
        "sharing": "Twin",
        "fees": "₹85,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "20 LPA",
    "phone": "+91 75007 22201",
    "address": "Bareilly, Uttar Pradesh 243001",
    "email": "info@sanskritibareilly.edu.in"
  },
  {
    "collegeName": "Amity University, Mohali",
    "name": "Amity University, Mohali",
    "slug": "amity-university-mohali",
    "logo": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    "description": "Amity University Mohali offers world-class facilities, advanced digital classrooms, and top placements in business management, engineering, and science fields.",
    "about": "Amity University Mohali offers world-class facilities, advanced digital classrooms, and top placements in business management, engineering, and science fields.",
    "city": "Mohali",
    "state": "Punjab",
    "location": "Punjab, Mohali",
    "country": "India",
    "ranking": "#18 in India (Private B-Schools)",
    "nirfRanking": 18,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 2021,
    "fees": "₹2.8 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "7.8 LPA",
    "highestPackage": "38 LPA",
    "placements": "7.8 LPA Average",
    "rating": 8.3,
    "category": "Management",
    "website": "https://amity.edu/mohali",
    "images": [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Business Analytics",
        "fees": "₹2.8 Lakhs",
        "seats": 120
      },
      {
        "name": "BBA (International Business)",
        "fees": "₹2.0 Lakhs",
        "seats": 180
      }
    ],
    "placementDetails": [
      {
        "company": "Amazon",
        "package": "₹38.0 LPA"
      },
      {
        "company": "Flipkart",
        "package": "₹12.0 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Amity Direct Entry",
        "criteria": "Marks > 93%",
        "amount": "100% Tuition Support"
      }
    ],
    "hostels": [
      {
        "type": "Premium AC Single Room",
        "sharing": "Single",
        "fees": "₹1.5 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "38 LPA",
    "phone": "+91 172 4090000",
    "address": "Sector 82A, IT City, Mohali, Punjab 140306",
    "email": "admissions@pb.amity.edu"
  },
  {
    "collegeName": "SAGE University, Indore",
    "name": "SAGE University, Indore",
    "slug": "sage-university-indore",
    "logo": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80",
    "description": "SAGE University Indore is an award-winning academic institution in central India, offering progressive engineering, technology, and applied sciences curricula.",
    "about": "SAGE University Indore is an award-winning academic institution in central India, offering progressive engineering, technology, and applied sciences curricula.",
    "city": "Indore",
    "state": "Madhya Pradesh",
    "location": "Madhya Pradesh, Indore",
    "country": "India",
    "ranking": "#48 in India",
    "nirfRanking": 48,
    "accreditation": "AICTE & UGC Approved",
    "establishedYear": 2016,
    "fees": "₹1.5 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.1 LPA",
    "highestPackage": "30 LPA",
    "placements": "5.1 LPA Average",
    "rating": 8,
    "category": "Engineering",
    "website": "https://sageuniversity.in",
    "images": [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Artificial Intelligence",
        "fees": "₹1.5 Lakhs",
        "seats": 120
      },
      {
        "name": "B.Tech in Mechanical Engineering",
        "fees": "₹1.2 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "TCS",
        "package": "₹6.5 LPA"
      },
      {
        "company": "Capgemini",
        "package": "₹5.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "SAGE Scholarship",
        "criteria": "JEE Rank < 15000",
        "amount": "50% Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Standard AC Room",
        "sharing": "Twin",
        "fees": "₹95,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "30 LPA",
    "phone": "+91 95222 37600",
    "address": "Kailod Kartal, Indore-Dewas Bypass Road, Indore, Madhya Pradesh 452020",
    "email": "admission@sageuniversity.in"
  },
  {
    "collegeName": "SAGE University, Bhopal",
    "name": "SAGE University, Bhopal",
    "slug": "sage-university-bhopal",
    "logo": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    "description": "SAGE University Bhopal provides state-of-the-art infrastructure and highly focused management/entrepreneurship programs for dynamic career paths.",
    "about": "SAGE University Bhopal provides state-of-the-art infrastructure and highly focused management/entrepreneurship programs for dynamic career paths.",
    "city": "Bhopal",
    "state": "Madhya Pradesh",
    "location": "Madhya Pradesh, Bhopal",
    "country": "India",
    "ranking": "#55 in India",
    "nirfRanking": 55,
    "accreditation": "UGC Approved",
    "establishedYear": 2020,
    "fees": "₹1.4 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "4.8 LPA",
    "highestPackage": "25 LPA",
    "placements": "4.8 LPA Average",
    "rating": 7.9,
    "category": "Management",
    "website": "https://sageuniversitybhopal.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in HR & Finance",
        "fees": "₹1.4 Lakhs",
        "seats": 90
      },
      {
        "name": "BBA in Business Analytics",
        "fees": "₹1.1 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "ICICI Bank",
        "package": "₹6.0 LPA"
      },
      {
        "company": "Airtel",
        "package": "₹5.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Merit-Based Scholarship",
        "criteria": "Marks > 88%",
        "amount": "25% Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Bhopal Campus Room",
        "sharing": "Twin",
        "fees": "₹85,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "25 LPA",
    "phone": "+91 95222 37601",
    "address": "Sahara Bypass Road, Katara Hills, Bhopal, Madhya Pradesh 462022",
    "email": "admissions@subhopal.edu.in"
  },
  {
    "collegeName": "Avantika University, Ujjain",
    "name": "Avantika University, Ujjain",
    "slug": "avantika-university-ujjain",
    "logo": "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=1200&q=80",
    "description": "Avantika University Ujjain is Indias first design-centered university. Promoted by MIT Group Pune, it offers highly experiential learning in design and technology.",
    "about": "Avantika University Ujjain is Indias first design-centered university. Promoted by MIT Group Pune, it offers highly experiential learning in design and technology.",
    "city": "Ujjain",
    "state": "Madhya Pradesh",
    "location": "Madhya Pradesh, Ujjain",
    "country": "India",
    "ranking": "#12 in Design (Private Universities)",
    "nirfRanking": 12,
    "accreditation": "UGC & COA Approved",
    "establishedYear": 2017,
    "fees": "₹3.1 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "7.2 LPA",
    "highestPackage": "28 LPA",
    "placements": "7.2 LPA Average",
    "rating": 8.4,
    "category": "Design",
    "website": "https://avantikauniversity.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Des in Product Design",
        "fees": "₹3.1 Lakhs",
        "seats": 60
      },
      {
        "name": "B.Des in User Experience (UX)",
        "fees": "₹3.5 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Microsoft India",
        "package": "₹28.0 LPA"
      },
      {
        "company": "Tata Motors",
        "package": "₹8.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "MIT Design Scholarship",
        "criteria": "DAT Rank < 200",
        "amount": "50% Tuition Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Design Studios Hostel",
        "sharing": "Twin",
        "fees": "₹1.3 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "28 LPA",
    "phone": "+91 77219 65333",
    "address": "Vishwanathpuram, Lekoda, Ujjain, Madhya Pradesh 456006",
    "email": "info@avantika.edu.in"
  },
  {
    "collegeName": "K.K. Modi University, Durg",
    "name": "K.K. Modi University, Durg",
    "slug": "kk-modi-university-durg",
    "logo": "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80",
    "description": "K.K. Modi University Durg focuses on industry-ready corporate and digital management courses backed by the industrial legacy of Modi Group.",
    "about": "K.K. Modi University Durg focuses on industry-ready corporate and digital management courses backed by the industrial legacy of Modi Group.",
    "city": "Durg",
    "state": "Chhattisgarh",
    "location": "Chhattisgarh, Durg",
    "country": "India",
    "ranking": "#82 in India",
    "nirfRanking": 82,
    "accreditation": "UGC Approved",
    "establishedYear": 2018,
    "fees": "₹1.3 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.0 LPA",
    "highestPackage": "15 LPA",
    "placements": "5.0 LPA Average",
    "rating": 7.6,
    "category": "Management",
    "website": "https://kkmu.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Digital Marketing",
        "fees": "₹1.3 Lakhs",
        "seats": 60
      },
      {
        "name": "BBA (General Business)",
        "fees": "₹90,000",
        "seats": 90
      }
    ],
    "placementDetails": [
      {
        "company": "HDFC Bank",
        "package": "₹5.5 LPA"
      },
      {
        "company": "Tech Mahindra",
        "package": "₹4.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Modi Corporate Scholarship",
        "criteria": "Class 12 Marks > 85%",
        "amount": "30% Concession"
      }
    ],
    "hostels": [
      {
        "type": "Standard Shared Hostel",
        "sharing": "Twin",
        "fees": "₹70,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "15 LPA",
    "phone": "+91 70241 33413",
    "address": "Maharajpur, Durg, Chhattisgarh 491001",
    "email": "admissions@kkmu.edu.in"
  },
  {
    "collegeName": "Medhavi Skills University, Sikkim",
    "name": "Medhavi Skills University, Sikkim",
    "slug": "medhavi-skills-university-sikkim",
    "logo": "https://images.unsplash.com/photo-1492538368578-83b320261140?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1492538368578-83b320261140?auto=format&fit=crop&w=1200&q=80",
    "description": "Medhavi Skills University is co-designed with industry partners to offer vocational and skill-integrated management and technology training in North-East India.",
    "about": "Medhavi Skills University is co-designed with industry partners to offer vocational and skill-integrated management and technology training in North-East India.",
    "city": "Namchi",
    "state": "Sikkim",
    "location": "Sikkim, Namchi",
    "country": "India",
    "ranking": "#88 in India (Skill Development)",
    "nirfRanking": 88,
    "accreditation": "UGC & NSDC Approved",
    "establishedYear": 2021,
    "fees": "₹1.2 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "4.2 LPA",
    "highestPackage": "10 LPA",
    "placements": "4.2 LPA Average",
    "rating": 8,
    "category": "Management",
    "website": "https://medhaviskillsuniversity.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1492538368578-83b320261140?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1492538368578-83b320261140?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "BBA in Retail Management",
        "fees": "₹1.2 Lakhs",
        "seats": 120
      },
      {
        "name": "B.Sc. in Hospitality & Tourism",
        "fees": "₹1.4 Lakhs",
        "seats": 90
      }
    ],
    "placementDetails": [
      {
        "company": "Taj Group",
        "package": "₹5.0 LPA"
      },
      {
        "company": "Reliance Retail",
        "package": "₹3.6 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "North-East Merit Scheme",
        "criteria": "Sikkim Domicile",
        "amount": "50% Fee Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Standard Shared Room",
        "sharing": "Twin",
        "fees": "₹60,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "10 LPA",
    "phone": "+91 99999 88888",
    "address": "Namchi, Sikkim 737126",
    "email": "info@msu.edu.in"
  },
  {
    "collegeName": "Mohan Babu University, Tirupati",
    "name": "Mohan Babu University, Tirupati",
    "slug": "mohan-babu-university-tirupati",
    "logo": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80",
    "description": "Mohan Babu University Tirupati, formerly Sree Vidyanikethan, is a premier multi-disciplinary campus famous for top placements and robust technical education.",
    "about": "Mohan Babu University Tirupati, formerly Sree Vidyanikethan, is a premier multi-disciplinary campus famous for top placements and robust technical education.",
    "city": "Tirupati",
    "state": "Andhra Pradesh",
    "location": "Andhra Pradesh, Tirupati",
    "country": "India",
    "ranking": "#38 in India (Private Universities)",
    "nirfRanking": 38,
    "accreditation": "AICTE & UGC Approved",
    "establishedYear": 1992,
    "fees": "₹1.6 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "6.2 LPA",
    "highestPackage": "44 LPA",
    "placements": "6.2 LPA Average",
    "rating": 8.2,
    "category": "Engineering",
    "website": "https://mbu.asia",
    "images": [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.6 Lakhs",
        "seats": 360
      },
      {
        "name": "B.Tech in Data Science",
        "fees": "₹1.6 Lakhs",
        "seats": 120
      }
    ],
    "placementDetails": [
      {
        "company": "Google",
        "package": "₹44.0 LPA"
      },
      {
        "company": "Cognizant",
        "package": "₹6.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Sree Sainath Merit Scheme",
        "criteria": "EAPCET Rank < 5000",
        "amount": "50% Fee Concession"
      }
    ],
    "hostels": [
      {
        "type": "Standard Shared Hostel",
        "sharing": "Twin",
        "fees": "₹95,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "44 LPA",
    "phone": "+91 877 2236555",
    "address": "Sree Sainath Nagar, Tirupati, Andhra Pradesh 517102",
    "email": "admissions@mbu.asia"
  },
  {
    "collegeName": "Amity University, Hyderabad",
    "name": "Amity University, Hyderabad",
    "slug": "amity-university-hyderabad",
    "logo": "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80",
    "description": "Amity University Hyderabad offers corporate-aligned BBA and MBA programs with specialized training in financial technology and global logistics.",
    "about": "Amity University Hyderabad offers corporate-aligned BBA and MBA programs with specialized training in financial technology and global logistics.",
    "city": "Hyderabad",
    "state": "Telangana",
    "location": "Telangana, Hyderabad",
    "country": "India",
    "ranking": "#30 in India (Private B-Schools)",
    "nirfRanking": 30,
    "accreditation": "UGC Approved",
    "establishedYear": 2015,
    "fees": "₹3.0 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "7.2 LPA",
    "highestPackage": "26 LPA",
    "placements": "7.2 LPA Average",
    "rating": 8.1,
    "category": "Management",
    "website": "https://amity.edu/hyderabad",
    "images": [
      "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Finance",
        "fees": "₹3.0 Lakhs",
        "seats": 120
      },
      {
        "name": "BBA (General)",
        "fees": "₹2.0 Lakhs",
        "seats": 180
      }
    ],
    "placementDetails": [
      {
        "company": "Deloitte",
        "package": "₹8.5 LPA"
      },
      {
        "company": "HSBC",
        "package": "₹7.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Amity Merit Award",
        "criteria": "Marks > 92%",
        "amount": "50% Tuition Support"
      }
    ],
    "hostels": [
      {
        "type": "Standard AC Room",
        "sharing": "Twin",
        "fees": "₹1.2 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "26 LPA",
    "phone": "+91 40 23000000",
    "address": "Maharajpet, Shankarpally, Hyderabad, Telangana 501203",
    "email": "admissions@hyd.amity.edu"
  },
  {
    "collegeName": "Rayat Bahra University, Shimla",
    "name": "Rayat Bahra University, Shimla",
    "slug": "rayat-bahra-university-shimla",
    "logo": "https://images.unsplash.com/photo-1607013398845-2517de280c41?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1607013398845-2517de280c41?auto=format&fit=crop&w=1200&q=80",
    "description": "Rayat Bahra University Shimla offers scenic learning spaces and highly structured management studies customized for administrative and tourist service sectors.",
    "about": "Rayat Bahra University Shimla offers scenic learning spaces and highly structured management studies customized for administrative and tourist service sectors.",
    "city": "Shimla",
    "state": "Himachal Pradesh",
    "location": "Himachal Pradesh, Shimla",
    "country": "India",
    "ranking": "#85 in India",
    "nirfRanking": 85,
    "accreditation": "UGC & HP State Council Approved",
    "establishedYear": 2008,
    "fees": "₹1.1 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "4.5 LPA",
    "highestPackage": "12 LPA",
    "placements": "4.5 LPA Average",
    "rating": 7.7,
    "category": "Management",
    "website": "https://rbu.edu/shimla",
    "images": [
      "https://images.unsplash.com/photo-1607013398845-2517de280c41?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1607013398845-2517de280c41?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Tourism",
        "fees": "₹1.1 Lakhs",
        "seats": 60
      },
      {
        "name": "BBA (General)",
        "fees": "₹80,000",
        "seats": 90
      }
    ],
    "placementDetails": [
      {
        "company": "MakeMyTrip",
        "package": "₹5.5 LPA"
      },
      {
        "company": "HDFC Bank",
        "package": "₹4.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Hill State Concession",
        "criteria": "HP Domicile",
        "amount": "₹15,000 / Year"
      }
    ],
    "hostels": [
      {
        "type": "Standard Room",
        "sharing": "Twin",
        "fees": "₹65,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "12 LPA",
    "phone": "+91 177 2830000",
    "address": "Shimla Hills, Shimla, Himachal Pradesh 171001",
    "email": "info@rbushimla.edu.in"
  },
  {
    "collegeName": "Rayat Bahra University, Mohali",
    "name": "Rayat Bahra University, Mohali",
    "slug": "rayat-bahra-university-mohali",
    "logo": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80",
    "description": "Rayat Bahra University Mohali features a massive campus in Tricity, offering industry-tied engineering curricula and strong placements.",
    "about": "Rayat Bahra University Mohali features a massive campus in Tricity, offering industry-tied engineering curricula and strong placements.",
    "city": "Mohali",
    "state": "Punjab",
    "location": "Punjab, Mohali",
    "country": "India",
    "ranking": "#60 in India",
    "nirfRanking": 60,
    "accreditation": "AICTE & UGC Approved",
    "establishedYear": 2005,
    "fees": "₹1.4 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.2 LPA",
    "highestPackage": "20 LPA",
    "placements": "5.2 LPA Average",
    "rating": 7.9,
    "category": "Engineering",
    "website": "https://rbu.edu/mohali",
    "images": [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.4 Lakhs",
        "seats": 180
      },
      {
        "name": "B.Tech in Civil Engineering",
        "fees": "₹1.1 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Cognizant",
        "package": "₹6.0 LPA"
      },
      {
        "company": "Wipro",
        "package": "₹5.2 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Tricity Merit Scheme",
        "criteria": "Marks > 85%",
        "amount": "₹25,000 / Year"
      }
    ],
    "hostels": [
      {
        "type": "Standard Hostel Room",
        "sharing": "Twin",
        "fees": "₹80,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "20 LPA",
    "phone": "+91 172 5025001",
    "address": "Mohali-Kharar G.T. Road, Mohali, Punjab 140103",
    "email": "admissions@rbumohali.edu.in"
  },
  {
    "collegeName": "Rajasthan University, Jaipur",
    "name": "Rajasthan University, Jaipur",
    "slug": "rajasthan-university",
    "logo": "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80",
    "description": "University of Rajasthan is the oldest institution of higher learning in Rajasthan, offering high-quality traditional and professional management studies.",
    "about": "University of Rajasthan is the oldest institution of higher learning in Rajasthan, offering high-quality traditional and professional management studies.",
    "city": "Jaipur",
    "state": "Rajasthan",
    "location": "Rajasthan, Jaipur",
    "country": "India",
    "ranking": "#42 in India (UGC Universities)",
    "nirfRanking": 42,
    "accreditation": "UGC Approved, NAAC A Grade",
    "establishedYear": 1947,
    "fees": "₹30,000 / Year",
    "placementPercentage": 90,
    "averagePackage": "4.8 LPA",
    "highestPackage": "14 LPA",
    "placements": "4.8 LPA Average",
    "rating": 8,
    "category": "Management",
    "website": "https://uniraj.ac.in",
    "images": [
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA (General Business)",
        "fees": "₹30,000",
        "seats": 120
      },
      {
        "name": "BBA (General)",
        "fees": "₹18,000",
        "seats": 240
      }
    ],
    "placementDetails": [
      {
        "company": "ICICI Bank",
        "package": "₹5.0 LPA"
      },
      {
        "company": "TCS",
        "package": "₹4.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "State Government Scholarship",
        "criteria": "SC/ST/OBC category support",
        "amount": "Full Fee Reimbursement"
      }
    ],
    "hostels": [
      {
        "type": "Standard Government Room",
        "sharing": "Twin",
        "fees": "₹15,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "14 LPA",
    "phone": "+91 141 2711070",
    "address": "Jawahar Lal Nehru Marg, Jaipur, Rajasthan 302004",
    "email": "admissions@uniraj.ac.in"
  },
  {
    "collegeName": "Don Bosco University, Guwahati",
    "name": "Don Bosco University, Guwahati",
    "slug": "don-bosco-university",
    "logo": "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1200&q=80",
    "description": "Assam Don Bosco University is a premier Catholic research university, offering advanced engineering and technology courses in North-East India.",
    "about": "Assam Don Bosco University is a premier Catholic research university, offering advanced engineering and technology courses in North-East India.",
    "city": "Guwahati",
    "state": "Assam",
    "location": "Assam, Guwahati",
    "country": "India",
    "ranking": "#58 in India (UGC)",
    "nirfRanking": 58,
    "accreditation": "UGC Approved, NAAC A Grade",
    "establishedYear": 2008,
    "fees": "₹1.5 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.0 LPA",
    "highestPackage": "18 LPA",
    "placements": "5.0 LPA Average",
    "rating": 7.9,
    "category": "Engineering",
    "website": "https://dbuniversity.ac.in",
    "images": [
      "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in CSE",
        "fees": "₹1.5 Lakhs",
        "seats": 90
      },
      {
        "name": "B.Tech in Electronics",
        "fees": "₹1.2 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Tech Mahindra",
        "package": "₹6.0 LPA"
      },
      {
        "company": "Wipro",
        "package": "₹5.0 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Don Bosco Foundation Support",
        "criteria": "Economic background",
        "amount": "50% Fee Waiver"
      }
    ],
    "hostels": [
      {
        "type": "Boys Shared Room",
        "sharing": "Twin",
        "fees": "₹75,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "18 LPA",
    "phone": "+91 94355 44994",
    "address": "Airport Road, Azara, Guwahati, Assam 781017",
    "email": "admissions@dbuniversity.ac.in"
  },
  {
    "collegeName": "DIT University, Dehradun",
    "name": "DIT University, Dehradun",
    "slug": "dit-university-dehradun",
    "logo": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    "description": "DIT University Dehradun, formerly Dehradun Institute of Technology, is a prominent private university in Uttarakhand known for B.Tech CSE placements.",
    "about": "DIT University Dehradun, formerly Dehradun Institute of Technology, is a prominent private university in Uttarakhand known for B.Tech CSE placements.",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "location": "Uttarakhand, Dehradun",
    "country": "India",
    "ranking": "#45 in India (Engineering)",
    "nirfRanking": 45,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 1998,
    "fees": "₹1.8 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "6.5 LPA",
    "highestPackage": "38 LPA",
    "placements": "6.5 LPA Average",
    "rating": 8.1,
    "category": "Engineering",
    "website": "https://dituniversity.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.8 Lakhs",
        "seats": 240
      },
      {
        "name": "B.Tech in Cyber Security",
        "fees": "₹2.0 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Amazon",
        "package": "₹38.0 LPA"
      },
      {
        "company": "Infosys",
        "package": "₹5.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Uttarakhand Domicile Discount",
        "criteria": "State Residents",
        "amount": "26% Tuition Discount"
      }
    ],
    "hostels": [
      {
        "type": "Standard AC Room",
        "sharing": "Twin",
        "fees": "₹1.1 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "38 LPA",
    "phone": "+91 135 3000300",
    "address": "Mussoorie Diversion Road, Dehradun, Uttarakhand 248009",
    "email": "admissions@dituniversity.edu.in"
  },
  {
    "collegeName": "K.R. Mangalam University, Gurugram",
    "name": "K.R. Mangalam University, Gurugram",
    "slug": "kr-mangalam-university",
    "logo": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80",
    "description": "K.R. Mangalam University is a premier university located in Gurugram, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.",
    "about": "K.R. Mangalam University is a premier university located in Gurugram, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.",
    "city": "Gurugram",
    "state": "Haryana",
    "location": "Haryana, Gurugram",
    "country": "India",
    "ranking": "#15 in India (Private B-Schools)",
    "nirfRanking": 15,
    "accreditation": "AICTE & UGC Approved",
    "establishedYear": 2013,
    "fees": "₹2.8 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "7.5 LPA",
    "highestPackage": "56.6 LPA",
    "placements": "7.5 LPA Average",
    "rating": 8,
    "category": "Management",
    "website": "https://krmangalam.edu.in",
    "images": [
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "MBA in Business Analytics",
        "fees": "₹2.8 Lakhs",
        "seats": 120
      },
      {
        "name": "B.Tech in Computer Science",
        "fees": "₹1.8 Lakhs",
        "seats": 150
      }
    ],
    "placementDetails": [
      {
        "company": "Amazon",
        "package": "₹36.0 LPA"
      },
      {
        "company": "HCL",
        "package": "₹6.0 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "KRMU Scholarship",
        "criteria": "Class 12 Marks > 90%",
        "amount": "50% Waiver"
      }
    ],
    "hostels": [
      {
        "type": "AC Double Sharing",
        "sharing": "Twin",
        "fees": "₹1.2 Lakhs / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "56.6 LPA",
    "phone": "+91 11 4888 8888",
    "address": "Sohna Road, Gurugram, Haryana 122103",
    "email": "admissions@krmangalam.edu.in"
  },
  {
    "collegeName": "Dev Bhoomi Uttarakhand University, Dehradun",
    "name": "Dev Bhoomi Uttarakhand University, Dehradun",
    "slug": "dev-bhoomi-university",
    "logo": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    "banner": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80",
    "description": "Dev Bhoomi Uttarakhand University offers practical-based engineering and medical sciences programs in a expansive foothills campus in Dehradun.",
    "about": "Dev Bhoomi Uttarakhand University offers practical-based engineering and medical sciences programs in a expansive foothills campus in Dehradun.",
    "city": "Dehradun",
    "state": "Uttarakhand",
    "location": "Uttarakhand, Dehradun",
    "country": "India",
    "ranking": "#68 in India (UGC)",
    "nirfRanking": 68,
    "accreditation": "UGC & AICTE Approved",
    "establishedYear": 2005,
    "fees": "₹1.3 Lakhs / Year",
    "placementPercentage": 90,
    "averagePackage": "5.5 LPA",
    "highestPackage": "20 LPA",
    "placements": "5.5 LPA Average",
    "rating": 7.8,
    "category": "Engineering",
    "website": "https://dbuu.ac.in",
    "images": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
    ],
    "facilities": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
    ],
    "gallery": [
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1200&q=80"
    ],
    "courses": [
      {
        "name": "B.Tech in CSE",
        "fees": "₹1.3 Lakhs",
        "seats": 180
      },
      {
        "name": "B.Tech in Civil Engineering",
        "fees": "₹1.0 Lakhs",
        "seats": 60
      }
    ],
    "placementDetails": [
      {
        "company": "Cognizant",
        "package": "₹5.5 LPA"
      },
      {
        "company": "HCL Tech",
        "package": "₹4.5 LPA"
      }
    ],
    "scholarships": [
      {
        "name": "Merit Discount Scheme",
        "criteria": "Marks > 85%",
        "amount": "25% Tuition Support"
      }
    ],
    "hostels": [
      {
        "type": "Standard Shared Hostel",
        "sharing": "Twin",
        "fees": "₹80,000 / Year"
      }
    ],
    "reviews": [],
    "faq": [],
    "totalOffers": 500,
    "companyVisiting": 120,
    "highestInternationalPackage": "20 LPA",
    "phone": "+91 135 2694241",
    "address": "Manduwala, Dehradun, Uttarakhand 248007",
    "email": "admissions@dbuu.ac.in"
  }
];

export const seedDB = async (shouldExit: boolean = true) => {
  try {
    if (mongoose.connection.readyState === 0) {
      console.log('Connecting to database...');
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB.');
    } else {
      console.log('Using existing MongoDB connection.');
    }

    // Clear existing collections
    console.log('Clearing old collections...');
    await Promise.all([
      User.deleteMany({}),
      College.deleteMany({}),
      Course.deleteMany({}),
      Exam.deleteMany({}),
      Scholarship.deleteMany({}),
      Blog.deleteMany({}),
      Application.deleteMany({}),
      SavedCollege.deleteMany({}),
      ComparedCollege.deleteMany({}),
    ]);
    console.log('Database cleared.');

    // Seed Courses
    console.log('Seeding courses...');
    const insertedCourses = await Course.insertMany(defaultCourses);
    console.log(`Seeded ${insertedCourses.length} courses.`);

    // Seed Exams
    console.log('Seeding entrance exams...');
    const insertedExams = await Exam.insertMany(defaultExams);
    console.log(`Seeded ${insertedExams.length} exams.`);

    // Seed Scholarships
    console.log('Seeding scholarships...');
    const insertedScholarships = await Scholarship.insertMany(defaultScholarships);
    console.log(`Seeded ${insertedScholarships.length} scholarships.`);

    // Seed Blogs
    console.log('Seeding blogs...');
    const insertedBlogs = await Blog.insertMany(defaultBlogs);
    console.log(`Seeded ${insertedBlogs.length} blogs.`);

    // Seed Colleges
    console.log('Seeding colleges...');
    const insertedColleges = await College.insertMany(defaultColleges);
    console.log(`Seeded ${insertedColleges.length} colleges.`);

    // Seed Users (Student and Admin)
    console.log('Seeding users...');
    const admin = new User({
      fullName: 'Aruna-Nand EdTech Admin',
      email: 'admin@arunanandedtech.org',
      phone: '9999999999',
      password: 'AdminPassword@123',
      role: 'admin',
      isVerified: true,
      city: 'Bangalore',
      state: 'Karnataka',
    });

    const student = new User({
      fullName: 'Karan Sharma',
      email: 'student@arunanandedtech.org',
      phone: '8888888888',
      password: 'StudentPassword@123',
      role: 'student',
      isVerified: true,
      city: 'Delhi',
      state: 'Delhi',
    });

    await admin.save();
    await student.save();
    console.log('Users seeded successfully. Credentials:');
    console.log('- Admin: admin@arunanandedtech.org / AdminPassword@123');
    console.log('- Student: student@arunanandedtech.org / StudentPassword@123');

    // Create a mock application
    console.log('Creating a mock application...');
    await Application.create({
      userId: student._id,
      collegeId: insertedColleges[0]._id, // IIM Bangalore
      courseId: insertedCourses[0]._id, // B.Tech
      applicationStatus: 'submitted',
    });
    console.log('Mock application created.');

    console.log('Database seeding process completed successfully!');
    if (shouldExit) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Seeding engine encountered an error:', error);
    if (shouldExit) {
      process.exit(1);
    } else {
      throw error;
    }
  }
};

if (require.main === module) {
  seedDB(true);
}
