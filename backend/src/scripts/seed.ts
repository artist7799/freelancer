import mongoose from 'mongoose';
import dotenv from 'dotenv';
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
    courses: ['MBA', 'PGDM'],
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
    courses: ['MBA', 'M.A.', 'M.Sc.', 'M.Com'],
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
    courses: ['LLB', 'LLM'],
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
    collegeName: 'Indian Institute of Technology, Bombay',
    name: 'Indian Institute of Technology, Bombay',
    slug: 'iit-bombay',
    logo: 'iit-bombay',
    banner: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'IIT Bombay is a leading public engineering institution in Mumbai. Established in 1958, it is renowned for its world-class research facilities, engineering degrees, and excellent campus environment.',
    about: 'IIT Bombay is a leading public engineering institution in Mumbai. Established in 1958, it is renowned for its world-class research facilities, engineering degrees, and excellent campus environment.',
    city: 'Mumbai',
    state: 'Maharashtra',
    location: 'Mumbai, Maharashtra',
    country: 'India',
    ranking: '#1 in India (NIRF)',
    nirfRanking: 1,
    accreditation: 'NAAC A++',
    establishedYear: 1958,
    fees: '₹2.2 Lakhs / Year',
    placementPercentage: 98,
    averagePackage: '₹21.8 LPA',
    highestPackage: '₹64.5 LPA',
    placements: '₹21.8 LPA Average',
    rating: 8.9,
    category: 'Engineering',
    website: 'https://www.iitb.ac.in',
    images: ['https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80'],
    facilities: ['Robotic Labs', 'Central Library', 'Sports Grounds'],
    infrastructure: ['AC Classrooms', 'Robotic Labs', 'Supercomputing Lab', 'Central Library', 'Sports Grounds'],
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    ],
    courses: [
      { name: 'B.Tech in Computer Science', fees: '₹2.2 Lakhs', seats: 120 },
      { name: 'M.Tech in Artificial Intelligence', fees: '₹80,000', seats: 40 },
    ],
    placementDetails: [
      { company: 'Google', package: '₹64.5 LPA' },
      { company: 'Microsoft', package: '₹58.2 LPA' },
    ],
    scholarships: [
      { name: 'Institute Merit-cum-Means', criteria: 'Income < ₹5 Lakhs', amount: '₹1.5 Lakhs / Yr' },
    ],
    hostels: [
      { type: 'Standard Room', sharing: 'Twin', fees: '₹25,000 / Year' },
    ],
    reviews: [
      { name: 'Aarav Mehta', rating: 5, text: 'Awesome college culture and top tier placements.', date: '2026-05-10' },
    ],
    faq: [
      { q: 'What exam is needed for B.Tech?', a: 'You must qualify through JEE Advanced.' },
    ],
  },
  {
    collegeName: 'Indian Institute of Management, Bangalore',
    name: 'Indian Institute of Management, Bangalore',
    slug: 'iim-bangalore',
    logo: 'iim-bangalore',
    banner: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'IIM Bangalore is a highly prestigious management school. Famed for its beautiful stone campus and exceptional academic rigour, it consistently produces elite leaders.',
    about: 'IIM Bangalore is a highly prestigious management school. Famed for its beautiful stone campus and exceptional academic rigour, it consistently produces elite leaders.',
    city: 'Bangalore',
    state: 'Karnataka',
    location: 'Bangalore, Karnataka',
    country: 'India',
    ranking: '#2 in India (NIRF MBA)',
    nirfRanking: 2,
    accreditation: 'EQUIS Accredited',
    establishedYear: 1973,
    fees: '₹11.5 Lakhs / Year',
    placementPercentage: 100,
    averagePackage: '₹35.3 LPA',
    highestPackage: '₹80.0 LPA',
    placements: '₹35.3 LPA Average',
    rating: 8.9,
    category: 'Management',
    website: 'https://www.iimb.ac.in',
    images: ['https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80'],
    facilities: ['Case Rooms', 'Auditorium Complex', 'Executive Hostel'],
    infrastructure: ['Management Hub', 'Case Rooms', 'Auditorium Complex', 'Sports Center', 'Executive Hostel'],
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
    ],
    courses: [
      { name: 'MBA (PGP in Management)', fees: '₹11.5 Lakhs', seats: 480 },
      { name: 'Executive MBA (EPGP)', fees: '₹14.0 Lakhs', seats: 75 },
    ],
    placementDetails: [
      { company: 'McKinsey & Co', package: '₹38.5 LPA' },
      { company: 'Boston Consulting Group', package: '₹38.0 LPA' },
    ],
    scholarships: [
      { name: 'Financial Aid', criteria: 'Income < ₹8 Lakhs', amount: 'Up to 100% waiver' },
    ],
    hostels: [
      { type: 'Standard Room', sharing: 'Single', fees: '₹40,000 / Semester' },
    ],
    reviews: [
      { name: 'Deepak Rao', rating: 5, text: 'Case-study based learning is top-tier here.', date: '2026-03-24' },
    ],
    faq: [
      { q: 'Is CAT required?', a: 'Yes, CAT is mandatory for admission.' },
    ],
  },
  {
    collegeName: 'All India Institute of Medical Sciences',
    name: 'All India Institute of Medical Sciences',
    slug: 'aiims-delhi',
    logo: 'aiims-delhi',
    banner: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'AIIMS New Delhi is the premier medical institute of India. Established in 1956, it offers high-quality medical education and comprehensive clinical exposure.',
    about: 'AIIMS New Delhi is the premier medical institute of India. Established in 1956, it offers high-quality medical education and comprehensive clinical exposure.',
    city: 'New Delhi',
    state: 'Delhi',
    location: 'New Delhi, Delhi',
    country: 'India',
    ranking: '#1 in India (Medical)',
    nirfRanking: 1,
    accreditation: 'Statutory Body',
    establishedYear: 1956,
    fees: '₹1,628 / Year',
    placementPercentage: 99,
    averagePackage: '₹18.0 LPA',
    highestPackage: '₹35.0 LPA',
    placements: '₹18.0 LPA Average',
    rating: 9.0,
    category: 'Medicine',
    website: 'https://www.aiims.edu',
    images: ['https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80'],
    facilities: ['Super Specialty Hospital', 'Research Wings', 'Moot Operating Theatres'],
    infrastructure: ['Super Specialty Hospital', 'Research Wings', 'Hostels & Gyms', 'Moot Operating Theatres'],
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80',
    ],
    courses: [
      { name: 'MBBS (Bachelor of Medicine)', fees: '₹1,628', seats: 125 },
      { name: 'MD in General Medicine', fees: '₹2,400', seats: 35 },
    ],
    placementDetails: [
      { company: 'Apollo Hospitals', package: '₹22.0 LPA' },
    ],
    scholarships: [
      { name: 'AIIMS Merit Award', criteria: 'Top performers', amount: '₹12,000 / Yr' },
    ],
    hostels: [
      { type: 'Standard UG Room', sharing: 'Twin', fees: '₹1,000 / Year' },
    ],
    reviews: [
      { name: 'Dr. Sneha Paul', rating: 5, text: 'Clinical exposure at AIIMS is unmatched.', date: '2026-02-12' },
    ],
    faq: [
      { q: 'Is NEET required?', a: 'Yes, admission is purely via NEET UG.' },
    ],
  },
  {
    collegeName: 'K R Mangalam University, (KRMU), Gurgaon',
    name: 'K R Mangalam University, (KRMU), Gurgaon',
    slug: 'kr-mangalam',
    logo: 'kr-mangalam',
    banner: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'K R Mangalam University is a premier university located in Gurgaon, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.',
    about: 'K R Mangalam University is a premier university located in Gurgaon, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.',
    city: 'Gurgaon',
    state: 'Haryana',
    location: 'Gurgaon, Haryana',
    country: 'India',
    ranking: '#15 in India (Private B-Schools)',
    nirfRanking: 75,
    accreditation: 'UGC Recognized',
    establishedYear: 2013,
    fees: '₹2.8 Lakhs / Year',
    placementPercentage: 85,
    averagePackage: '₹6.0 LPA',
    highestPackage: '₹36.0 LPA',
    placements: '₹6.0 LPA Average',
    rating: 8.0,
    category: 'Management',
    website: 'https://www.krmangalam.edu.in',
    images: ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80'],
    facilities: ['AC Classrooms', 'Moot Court', 'Innovation Cell'],
    infrastructure: ['AC Classrooms', 'Moot Court', 'Central Library', 'Innovation Cell'],
    gallery: [
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80',
    ],
    courses: [
      { name: 'MBA (PGP in Management)', fees: '₹2.8 Lakhs', seats: 120 },
      { name: 'B.Tech in Computer Science', fees: '₹1.8 Lakhs', seats: 150 },
    ],
    placementDetails: [
      { company: 'Amazon', package: '₹36.0 LPA' },
      { company: 'HCL', package: '₹6.0 LPA' },
    ],
    scholarships: [
      { name: 'KRMU Scholarship', criteria: 'Class 12 Marks > 90%', amount: '50% Waiver' },
    ],
    hostels: [
      { type: 'AC Double Sharing', sharing: 'Twin', fees: '₹1.2 Lakhs / Year' },
    ],
    reviews: [
      { name: 'Amit Roy', rating: 4, text: 'Great infrastructure and good corporate linkages.', date: '2026-04-10' },
    ],
    faq: [
      { q: 'Is there a transport service?', a: 'Yes, buses connect all parts of NCR.' },
    ],
  },
  {
    collegeName: 'Sharda University, Greater Noida',
    name: 'Sharda University, Greater Noida',
    slug: 'sharda-university',
    logo: 'sharda-university',
    banner: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    description: 'Sharda University is a major private university in Greater Noida, famous for its tag "The World is Here" and featuring students from 80+ nations.',
    about: 'Sharda University is a major private university in Greater Noida, famous for its tag "The World is Here" and featuring students from 80+ nations.',
    city: 'Greater Noida',
    state: 'Uttar Pradesh',
    location: 'Greater Noida, Uttar Pradesh',
    country: 'India',
    ranking: '#88 in NIRF (Universities)',
    nirfRanking: 88,
    accreditation: 'NAAC A+',
    establishedYear: 2009,
    fees: '₹2.5 Lakhs / Year',
    placementPercentage: 88,
    averagePackage: '₹6.5 LPA',
    highestPackage: '₹1.6 CR',
    placements: '₹6.5 LPA Average',
    rating: 8.8,
    category: 'Engineering',
    website: 'https://www.sharda.ac.in',
    images: ['https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80'],
    facilities: ['Sharda Hospital', 'Auditorium Complex', 'Sports Arena'],
    infrastructure: ['AC Classrooms', 'Moot Court', 'Sharda Hospital', 'Auditorium Complex', 'Sports Arena'],
    gallery: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    ],
    courses: [
      { name: 'MBA (PGP in Management)', fees: '₹2.5 Lakhs', seats: 360 },
      { name: 'B.Tech in Computer Science', fees: '₹2.2 Lakhs', seats: 300 },
    ],
    placementDetails: [
      { company: 'Cognizant', package: '₹1.6 CR' },
      { company: 'Amazon', package: '₹6.5 LPA' },
    ],
    scholarships: [
      { name: 'Sharda Merit Scholarship', criteria: 'Class 12 Marks > 95%', amount: '100% Tuition Waiver' },
    ],
    hostels: [
      { type: 'AC Double sharing room', sharing: 'Twin', fees: '₹1.2 Lakhs / Year' },
    ],
    reviews: [
      { name: 'Aman Preet', rating: 4.8, text: 'Superb campus, massive diversity and nice placements.', date: '2026-05-18' },
    ],
    faq: [
      { q: 'Is there a medical facility?', a: 'Yes, Sharda Hospital is on campus and offers 24/7 service.' },
    ],
  },
];

const seedDB = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

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
      collegeId: insertedColleges[0]._id, // IIT Bombay
      courseId: insertedCourses[0]._id, // B.Tech in CS
      applicationStatus: 'submitted',
    });
    console.log('Mock application created.');

    console.log('Database seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding engine encountered an error:', error);
    process.exit(1);
  }
};

seedDB();
