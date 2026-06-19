import type { College } from '../types';

export const colleges: College[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology, Bombay',
    location: 'Mumbai, Maharashtra',
    rating: 8.9,
    fees: '₹2.2 Lakhs / Year',
    placements: '₹21.8 LPA Average',
    ranking: '#1 in India (NIRF)',
    logo: 'iit-bombay',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'IIT Bombay is a leading public engineering institution in Mumbai. Established in 1958, it is renowned for its world-class research facilities, engineering degrees, and excellent campus environment.',
    infrastructure: ['AC Classrooms', 'Robotic Labs', 'Supercomputing Lab', 'Central Library', 'Sports Grounds'],
    courses: [
      { name: 'B.Tech in Computer Science', fees: '₹2.2 Lakhs', seats: 120 },
      { name: 'M.Tech in Artificial Intelligence', fees: '₹80,000', seats: 40 }
    ],
    placementDetails: [
      { company: 'Google', package: '₹64.5 LPA' },
      { company: 'Microsoft', package: '₹58.2 LPA' }
    ],
    scholarships: [
      { name: 'Institute Merit-cum-Means', criteria: 'Income < ₹5 Lakhs', amount: '₹1.5 Lakhs / Yr' }
    ],
    hostels: [
      { type: 'Standard Room', sharing: 'Twin', fees: '₹25,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Aarav Mehta', rating: 5, text: 'Awesome college culture and top tier placements.', date: '2026-05-10' }
    ],
    faq: [
      { q: 'What exam is needed for B.Tech?', a: 'You must qualify through JEE Advanced.' }
    ]
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management, Bangalore',
    location: 'Bangalore, Karnataka',
    rating: 8.9,
    fees: '₹11.5 Lakhs / Year',
    placements: '₹35.3 LPA Average',
    ranking: '#2 in India (NIRF MBA)',
    logo: 'iim-bangalore',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'IIM Bangalore is a highly prestigious management school. Famed for its beautiful stone campus and exceptional academic rigour, it consistently produces elite leaders.',
    infrastructure: ['Management Hub', 'Case Rooms', 'Auditorium Complex', 'Sports Center', 'Executive Hostel'],
    courses: [
      { name: 'MBA (PGP in Management)', fees: '₹11.5 Lakhs', seats: 480 },
      { name: 'Executive MBA (EPGP)', fees: '₹14.0 Lakhs', seats: 75 }
    ],
    placementDetails: [
      { company: 'McKinsey & Co', package: '₹38.5 LPA' },
      { company: 'Boston Consulting Group', package: '₹38.0 LPA' }
    ],
    scholarships: [
      { name: 'Financial Aid', criteria: 'Income < ₹8 Lakhs', amount: 'Up to 100% waiver' }
    ],
    hostels: [
      { type: 'Standard Room', sharing: 'Single', fees: '₹40,000 / Semester' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Deepak Rao', rating: 5, text: 'Case-study based learning is top-tier here.', date: '2026-03-24' }
    ],
    faq: [
      { q: 'Is CAT required?', a: 'Yes, CAT is mandatory for admission.' }
    ]
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, Delhi',
    rating: 9.0,
    fees: '₹1,628 / Year',
    placements: '₹18.0 LPA Average',
    ranking: '#1 in India (Medical)',
    logo: 'aiims-delhi',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Medicine',
    about: 'AIIMS New Delhi is the premier medical institute of India. Established in 1956, it offers high-quality medical education and comprehensive clinical exposure.',
    infrastructure: ['Super Specialty Hospital', 'Research Wings', 'Hostels & Gyms', 'Moot Operating Theatres'],
    courses: [
      { name: 'MBBS (Bachelor of Medicine)', fees: '₹1,628', seats: 125 },
      { name: 'MD in General Medicine', fees: '₹2,400', seats: 35 }
    ],
    placementDetails: [
      { company: 'Apollo Hospitals', package: '₹22.0 LPA' }
    ],
    scholarships: [
      { name: 'AIIMS Merit Award', criteria: 'Top performers', amount: '₹12,000 / Yr' }
    ],
    hostels: [
      { type: 'Standard UG Room', sharing: 'Twin', fees: '₹1,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Dr. Sneha Paul', rating: 5, text: 'Clinical exposure at AIIMS is unmatched.', date: '2026-02-12' }
    ],
    faq: [
      { q: 'Is NEET required?', a: 'Yes, admission is purely via NEET UG.' }
    ]
  },
  {
    id: 'kr-mangalam',
    name: 'K R Mangalam University, (KRMU), Gurgaon',
    location: 'Gurgaon, Haryana',
    rating: 8.0,
    fees: '₹2.8 Lakhs / Year',
    placements: '₹6.0 LPA Average',
    ranking: '#15 in India (Private B-Schools)',
    logo: 'kr-mangalam',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'K R Mangalam University is a premier university located in Gurgaon, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.',
    infrastructure: ['AC Classrooms', 'Moot Court', 'Central Library', 'Innovation Cell'],
    courses: [
      { name: 'MBA in Business Analytics', fees: '₹2.8 Lakhs', seats: 120 },
      { name: 'B.Tech in Computer Science', fees: '₹1.8 Lakhs', seats: 150 }
    ],
    placementDetails: [
      { company: 'Amazon', package: '₹36.0 LPA' },
      { company: 'HCL', package: '₹6.0 LPA' }
    ],
    scholarships: [
      { name: 'KRMU Scholarship', criteria: 'Class 12 Marks > 90%', amount: '50% Waiver' }
    ],
    hostels: [
      { type: 'AC Double Sharing', sharing: 'Twin', fees: '₹1.2 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Amit Roy', rating: 4, text: 'Great infrastructure and good corporate linkages.', date: '2026-04-10' }
    ],
    faq: [
      { q: 'Is there a transport service?', a: 'Yes, buses connect all parts of NCR.' }
    ]
  },
  {
    id: 'great-lakes',
    name: 'Great Lakes Institute of Management',
    location: 'Chennai, Tamil Nadu',
    rating: 8.2,
    fees: '₹9.0 Lakhs / Year',
    placements: '₹14.5 LPA Average',
    ranking: '#12 in Management (NIRF)',
    logo: 'great-lakes',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'Great Lakes is a top tier management institute in Chennai. Offering both PGDM and PGPM programs, it focuses on tech-driven management curriculum.',
    infrastructure: ['Green Campus', 'Research Labs', 'Seminar Rooms', 'AC Hostels'],
    courses: [
      { name: 'PGDM', fees: '₹9.0 Lakhs', seats: 240 },
      { name: 'Executive PGPM', fees: '₹11.2 Lakhs', seats: 120 }
    ],
    placementDetails: [
      { company: 'Deloitte', package: '₹18.0 LPA' },
      { company: 'Cognizant', package: '₹14.5 LPA' }
    ],
    scholarships: [
      { name: 'Diversity Scholarship', criteria: 'Outstanding women candidates', amount: '₹1.0 Lakh' }
    ],
    hostels: [
      { type: 'Single Room (AC)', sharing: 'Single', fees: '₹1.5 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Pooja Nair', rating: 4, text: 'Excellent one year PGPM program.', date: '2026-03-15' }
    ],
    faq: [
      { q: 'Are international candidates eligible?', a: 'Yes, GMAT scores are accepted for NRI/foreign candidates.' }
    ]
  },
  {
    id: 'vydehi-medical',
    name: 'Vydehi Institute of Medical Sciences and Research',
    location: 'Bangalore, Karnataka',
    rating: 8.1,
    fees: '₹1.1 Lakhs / Year',
    placements: '₹12.0 LPA Average',
    ranking: '#20 in Medical (NIRF)',
    logo: 'vydehi-medical',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Medicine',
    about: 'Vydehi Institute is a premium medical science center in Whitefield, Bangalore, integrated with a multi-specialty hospital system.',
    infrastructure: ['AC Classrooms', 'Diagnostic Labs', 'Multi-Specialty Wards', 'Library'],
    courses: [
      { name: 'MBBS (Bachelor of Medicine)', fees: '₹1.1 Lakhs', seats: 250 },
      { name: 'MD in Pediatrics', fees: '₹3.5 Lakhs', seats: 20 }
    ],
    placementDetails: [
      { company: 'Vydehi Hospital', package: '₹12.0 LPA' }
    ],
    scholarships: [
      { name: 'Karnataka State Award', criteria: 'State merit rank', amount: '₹50,000 / Yr' }
    ],
    hostels: [
      { type: 'Standard Shared Room', sharing: 'Twin', fees: '₹60,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1582750433449-64c676ee7424?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Dr. Vivek S', rating: 4, text: 'VIMS offers amazing clinical exposure in Whitefield.', date: '2026-02-28' }
    ],
    faq: [
      { q: 'Is there an internship post MBBS?', a: 'Yes, a mandatory 1-year rotatory internship is included.' }
    ]
  },
  {
    id: 'jims-delhi',
    name: 'Jagannath Institute of Management Sciences (JIMS)',
    location: 'Delhi, Delhi',
    rating: 7.9,
    fees: '₹4.5 Lakhs / Year',
    placements: '₹7.5 LPA Average',
    ranking: '#25 in Management (Private)',
    logo: 'jims-delhi',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'JIMS Delhi is an acclaimed B-school offering premium postgraduate degrees in business administration, marketing, and finance.',
    infrastructure: ['Smart Rooms', 'Computer Labs', 'Cafeteria', 'Conference Hall'],
    courses: [
      { name: 'PGDM', fees: '₹4.5 Lakhs', seats: 180 },
      { name: 'BBA', fees: '₹1.5 Lakhs', seats: 120 }
    ],
    placementDetails: [
      { company: 'E&Y', package: '₹12.0 LPA' },
      { company: 'Genpact', package: '₹7.5 LPA' }
    ],
    scholarships: [
      { name: 'JIMS Merit Aid', criteria: 'CAT Percentile > 80', amount: '₹50,000' }
    ],
    hostels: [
      { type: 'Off-campus PG Option', sharing: 'Twin', fees: '₹80,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Sanjay Jain', rating: 4, text: 'Solid faculty and helpful placement cell.', date: '2026-05-18' }
    ],
    faq: [
      { q: 'Is the course AICTE approved?', a: 'Yes, all PGDM courses are AICTE approved.' }
    ]
  },
  {
    id: 'accurate-group',
    name: 'Accurate Group of Institutions',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.8,
    fees: '₹1.6 Lakhs / Year',
    placements: '₹6.5 LPA Average',
    ranking: '#11 in Placement Records (NCR)',
    logo: 'accurate-group',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'Accurate Group of Institutions is a major educational complex in Knowledge Park, Greater Noida, famous for engineering and management programs with high return on investment.',
    infrastructure: ['Digital Labs', 'Seminar Halls', 'Sports Arena', 'AC Rooms'],
    courses: [
      { name: 'MBA in Finance/Marketing', fees: '₹1.6 Lakhs', seats: 240 },
      { name: 'B.Tech in Computer Science', fees: '₹1.2 Lakhs', seats: 180 }
    ],
    placementDetails: [
      { company: 'Accenture', package: '₹15.0 LPA' },
      { company: 'Wipro', package: '₹6.5 LPA' }
    ],
    scholarships: [
      { name: 'Accurate Scholarship', criteria: 'UPSEE rank under 5000', amount: '50% fee concession' }
    ],
    hostels: [
      { type: 'Standard Shared Room', sharing: 'Twin', fees: '₹85,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1505664194779-8bebcb95c557?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Pawan Singh', rating: 4, text: 'Amazing placement drives. Many big firms visit Knowledge Park.', date: '2026-05-20' }
    ],
    faq: [
      { q: 'Is hostel facility available?', a: 'Yes, separate hostels for boys and girls are on campus.' }
    ]
  },
  {
    id: 'amity-university',
    name: 'Amity University, Noida',
    location: 'Noida, Uttar Pradesh',
    rating: 8.4,
    fees: '₹3.5 Lakhs / Year',
    placements: '₹7.5 LPA Average',
    ranking: '#5 in India (Private Universities)',
    logo: 'amity-university',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'Amity University Noida features a massive state-of-the-art campus. It offers a global education system with modern research labs and premium amenities.',
    infrastructure: ['Hi-Tech Labs', 'Olympic Sports Complex', 'AC Hostels', 'Auditorium Complex'],
    courses: [
      { name: 'MBA (General Management)', fees: '₹3.5 Lakhs', seats: 500 },
      { name: 'B.Tech in Computer Science', fees: '₹2.8 Lakhs', seats: 360 }
    ],
    placementDetails: [
      { company: 'Amazon', package: '₹40.0 LPA' },
      { company: 'Infosys', package: '₹7.5 LPA' }
    ],
    scholarships: [
      { name: 'Amity Direct Admission Scholarship', criteria: 'Marks > 95%', amount: '100% Scholarship' }
    ],
    hostels: [
      { type: 'Premium AC Single', sharing: 'Single', fees: '₹1.5 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Rohan Verma', rating: 4.5, text: 'Campus life is incredible. Infinite exposure here.', date: '2026-04-18' }
    ],
    faq: [
      { q: 'Is there a swimming pool?', a: 'Yes, an Olympic size swimming pool is on campus.' }
    ]
  },
  {
    id: 'jims-gn',
    name: 'JIMS Greater Noida, Knowledge Park III',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.7,
    fees: '₹3.8 Lakhs / Year',
    placements: '₹5.5 LPA Average',
    ranking: '#12 in NCR (Management)',
    logo: 'jims-gn',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'JIMS Greater Noida offers premium professional education across business, computer science, and engineering disciplines in Knowledge Park.',
    infrastructure: ['AC Classrooms', 'Language Labs', 'Auditorium', 'Recreation Room'],
    courses: [
      { name: 'PGDM in Marketing', fees: '₹3.8 Lakhs', seats: 120 },
      { name: 'BBA', fees: '₹1.2 Lakhs', seats: 90 }
    ],
    placementDetails: [
      { company: 'Genpact', package: '₹18.0 LPA' },
      { company: 'Cognizant', package: '₹5.5 LPA' }
    ],
    scholarships: [
      { name: 'JIMS Excellence Scheme', criteria: 'MAT score > 750', amount: '₹40,000' }
    ],
    hostels: [
      { type: 'Shared Double Room', sharing: 'Twin', fees: '₹95,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Prerna Joshi', rating: 4, text: 'Very nice staff and good industry visits.', date: '2026-05-02' }
    ],
    faq: [
      { q: 'What is the closest metro?', a: 'Knowledge Park II Metro Station.' }
    ]
  },
  {
    id: 'gl-bajaj',
    name: 'GL Bajaj Institute of Technology and Management',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.8,
    fees: '₹1.6 Lakhs / Year',
    placements: '₹28.83 LPA Average',
    ranking: '#11 in Engineering (NIRF)',
    logo: 'gl-bajaj',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'GL Bajaj is one of the premier self-financed institutes in Knowledge Park, Greater Noida, famous for outstanding placement records and B.Tech programs.',
    infrastructure: ['AC Classrooms', 'CNC Labs', 'Apple Mac Lab', 'Robotics Hub', 'Sports fields'],
    courses: [
      { name: 'B.Tech in Computer Science', fees: '₹1.6 Lakhs', seats: 240 },
      { name: 'MBA in Finance', fees: '₹1.5 Lakhs', seats: 120 }
    ],
    placementDetails: [
      { company: 'Adobe', package: '₹53.58 LPA' },
      { company: 'TCS', package: '₹28.83 LPA' }
    ],
    scholarships: [
      { name: 'GLB Merit Scholarship', criteria: 'JEE Rank < 10000', amount: '50% tuition waiver' }
    ],
    hostels: [
      { type: 'Standard AC Room', sharing: 'Twin', fees: '₹1.1 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Ankur S', rating: 4, text: 'Awesome computer labs and super smooth placements.', date: '2026-05-12' }
    ],
    faq: [
      { q: 'Is there a uniform?', a: 'Yes, uniforms are prescribed for corporate meets.' }
    ]
  },
  {
    id: 'bennett-university',
    name: 'Bennett University',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 8.2,
    fees: '₹3.6 Lakhs / Year',
    placements: '₹7.99 LPA Average',
    ranking: '#14 in NIRF (Private B-Schools)',
    logo: 'bennett-university',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'Bennett University was established by the Times of India Group, offering students a premium ivy-league quality learning culture in Greater Noida.',
    infrastructure: ['Supercomputer Lab', 'Media Studio', 'AC Hostels', 'Indoor Sports Complex'],
    courses: [
      { name: 'B.Tech in Computer Science', fees: '₹3.6 Lakhs', seats: 450 },
      { name: 'MBA (General Management)', fees: '₹4.5 Lakhs', seats: 180 }
    ],
    placementDetails: [
      { company: 'Google', package: '₹1.2 CPA' },
      { company: 'Microsoft', package: '₹7.99 LPA' }
    ],
    scholarships: [
      { name: 'Times Merit Scholarship', criteria: 'JEE Score > 95 percentile', amount: 'Up to 100% waiver' }
    ],
    hostels: [
      { type: 'Premium Quad sharing', sharing: 'Four', fees: '₹1.5 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Riya Gupta', rating: 5, text: 'Ivy league class infrastructure and superb events.', date: '2026-04-11' }
    ],
    faq: [
      { q: 'Is there a laundry facility?', a: 'Yes, centralized laundry is included in hostels.' }
    ]
  },
  {
    id: 'lloyd-school',
    name: 'Lloyd Business School, Greater Noida',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.8,
    fees: '₹1.5 Lakhs / Year',
    placements: '₹6.5 LPA Average',
    ranking: '#15 in Delhi NCR (B-Schools)',
    logo: 'lloyd-school',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Management',
    about: 'Lloyd Business School is a leading management school in Knowledge Park, focusing on industry-integrated learning with co-op internships.',
    infrastructure: ['AC Rooms', 'Seminar Hubs', 'Mock Boardrooms', 'Library'],
    courses: [
      { name: 'MBA in HR/Marketing', fees: '₹1.5 Lakhs', seats: 240 },
      { name: 'PGDM in Supply Chain', fees: '₹2.8 Lakhs', seats: 120 }
    ],
    placementDetails: [
      { company: 'IBM India', package: '₹22.0 LPA' },
      { company: 'Wipro', package: '₹6.5 LPA' }
    ],
    scholarships: [
      { name: 'Lloyd Academic Scholarship', criteria: 'Marks > 85%', amount: '₹30,000' }
    ],
    hostels: [
      { type: 'Shared PG Style Room', sharing: 'Twin', fees: '₹90,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Ankita P', rating: 4, text: 'Practical learning and useful internship tieups.', date: '2026-05-15' }
    ],
    faq: [
      { q: 'Do they offer placement assistance?', a: 'Yes, a dedicated placement cell coordinates all interviews.' }
    ]
  },
  {
    id: 'mangalmay-institute',
    name: 'Mangalmay Institute of Management and Technology',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.6,
    fees: '₹1.2 Lakhs / Year',
    placements: '₹4.5 LPA Average',
    ranking: '#18 in Placement Records (NCR)',
    logo: 'mangalmay-institute',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'Mangalmay Institute offers engineering and business management programs in Greater Noida, focusing on practical learning and corporate placement drives.',
    infrastructure: ['AC Classrooms', 'Programming Labs', 'Auditorium', 'Cafeteria'],
    courses: [
      { name: 'MBA', fees: '₹1.2 Lakhs', seats: 180 },
      { name: 'B.Tech in Computer Science', fees: '₹1.0 Lakhs', seats: 120 }
    ],
    placementDetails: [
      { company: 'Wipro', package: '₹15.0 LPA' },
      { company: 'HCL Tech', package: '₹4.5 LPA' }
    ],
    scholarships: [
      { name: 'Mangalmay Aid', criteria: 'Economic hardships', amount: '₹20,000' }
    ],
    hostels: [
      { type: 'Standard Shared Hostel', sharing: 'Twin', fees: '₹80,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1505664194779-8bebcb95c557?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Rahul Dev', rating: 4, text: 'Decent ROI, low fees and good campus environment.', date: '2026-04-30' }
    ],
    faq: [
      { q: 'Is transport available?', a: 'Yes, college buses connect Delhi, Noida, and Ghaziabad.' }
    ]
  },
  {
    id: 'sharda-university',
    name: 'Sharda University, Greater Noida',
    location: 'Noida, Uttar Pradesh',
    rating: 8.8,
    fees: '₹2.5 Lakhs / Year',
    placements: '₹6.5 LPA Average',
    ranking: '#88 in NIRF (Universities)',
    logo: 'sharda-university',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Engineering',
    about: 'Sharda University is a major private university in Greater Noida, famous for its tag "The World is Here" and featuring students from 80+ nations.',
    infrastructure: ['AC Classrooms', 'Moot Court', 'Sharda Hospital', 'Auditorium Complex', 'Sports Arena'],
    courses: [
      { name: 'MBA General', fees: '₹2.5 Lakhs', seats: 360 },
      { name: 'B.Tech in Computer Science', fees: '₹2.2 Lakhs', seats: 300 }
    ],
    placementDetails: [
      { company: 'Cognizant', package: '₹1.6 CR' },
      { company: 'Amazon', package: '₹6.5 LPA' }
    ],
    scholarships: [
      { name: 'Sharda Merit Scholarship', criteria: 'Class 12 Marks > 95%', amount: '100% Tuition Waiver' }
    ],
    hostels: [
      { type: 'AC Double sharing room', sharing: 'Twin', fees: '₹1.2 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Aman Preet', rating: 4.8, text: 'Superb campus, massive diversity and nice placements.', date: '2026-05-18' }
    ],
    faq: [
      { q: 'Is there a medical facility?', a: 'Yes, Sharda Hospital is on campus and offers 24/7 service.' }
    ]
  }
];
