import type { College } from '../types';

export const colleges: College[] = [
  {
    id: 'iit-bombay',
    name: 'Indian Institute of Technology, Bombay',
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    fees: '₹2.2 Lakhs / Year',
    placements: '₹21.8 LPA Average',
    ranking: '#1 in India (NIRF)',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Engineering',
    about: 'Established in 1958, IIT Bombay is one of the premier engineering and research institutions globally. Known for its world-class faculty, outstanding student body, and vibrant campus life, it remains the dream destination for science graduates in India.',
    infrastructure: ['Smart Classrooms', 'R&D Labs', 'Olympic-size Pool', 'Supercomputing Facility', 'Central Library', 'Cricket Stadium'],
    courses: [
      { name: 'B.Tech in Computer Science Engineering', fees: '₹2,20,000 / Yr', seats: 120 },
      { name: 'B.Tech in Electrical Engineering', fees: '₹2,20,000 / Yr', seats: 100 },
      { name: 'B.Tech in Mechanical Engineering', fees: '₹2,10,000 / Yr', seats: 110 },
      { name: 'M.Tech in Artificial Intelligence', fees: '₹80,000 / Yr', seats: 40 }
    ],
    placementDetails: [
      { company: 'Google', package: '₹64.5 LPA' },
      { company: 'Microsoft', package: '₹58.2 LPA' },
      { company: 'Uber', package: '₹51.0 LPA' },
      { company: 'Apple', package: '₹48.0 LPA' }
    ],
    scholarships: [
      { name: 'Institute Merit-cum-Means', criteria: 'Annual income < ₹5 Lakhs', amount: '₹1.5 Lakhs / Yr' },
      { name: 'SC/ST Scholarship', criteria: 'Reserved category students', amount: 'Full tuition waiver' }
    ],
    hostels: [
      { type: 'Single Room (AC)', sharing: 'Single', fees: '₹45,000 / Semester' },
      { type: 'Double Room (Non-AC)', sharing: 'Twin', fees: '₹28,000 / Semester' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Aarav Mehta', rating: 5, text: 'Unbelievable exposure and peer group. The coding culture is best in the country. Fests like Mood Indigo make campus life amazing.', date: '2026-05-10' },
      { name: 'Riya Sen', rating: 4.8, text: 'Top placements and excellent research infrastructure. Professors are quite approachable if you want to write papers.', date: '2026-04-18' }
    ],
    faq: [
      { q: 'What is the cutoff for CSE in IIT Bombay?', a: 'Generally, you need to rank under top 60 in JEE Advanced to secure Computer Science.' },
      { q: 'Is hostel mandatory for all B.Tech students?', a: 'Yes, IIT Bombay is a fully residential campus, and staying in hostiles is mandatory.' }
    ]
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management, Bangalore',
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    fees: '₹11.5 Lakhs / Year',
    placements: '₹35.3 LPA Average',
    ranking: '#2 in India (NIRF MBA)',
    logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Management',
    about: 'IIM Bangalore is a leading graduate school of management in Asia. Its scenic campus, built in stone and surrounded by rich flora, houses an elite pool of faculty and industry-ready leaders of tomorrow.',
    infrastructure: ['Management Hub', 'Case Discussion Rooms', 'Auditorium Complex', 'Sports Center', 'Premium Executive Hostel'],
    courses: [
      { name: 'MBA (PGP in Management)', fees: '₹11,50,000 / Yr', seats: 480 },
      { name: 'Executive MBA (EPGP)', fees: '₹14,00,000 / Yr', seats: 75 },
      { name: 'Ph.D. in Management', fees: 'Full Fellowship', seats: 20 }
    ],
    placementDetails: [
      { company: 'McKinsey & Co', package: '₹38.5 LPA' },
      { company: 'Boston Consulting Group', package: '₹38.0 LPA' },
      { company: 'Goldman Sachs', package: '₹36.0 LPA' },
      { company: 'JPMorgan Chase', package: '₹34.5 LPA' }
    ],
    scholarships: [
      { name: 'IIMB Financial Aid', criteria: 'Household income < ₹8 Lakhs', amount: 'Up to 100% waiver' },
      { name: 'Citi Women Leader Award', criteria: 'Academic merit (Women candidates)', amount: '₹2.0 Lakhs / Yr' }
    ],
    hostels: [
      { type: 'Executive Single (AC)', sharing: 'Single', fees: '₹75,000 / Semester' },
      { type: 'Standard Student Single', sharing: 'Single', fees: '₹40,000 / Semester' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Deepak Rao', rating: 5, text: 'Case-study based learning here is world-class. Consulting firms hire in bunches. Highly recommended!', date: '2026-03-24' }
    ],
    faq: [
      { q: 'What CAT percentile is required for IIM Bangalore?', a: 'Typically, a percentile above 99.5 is required for General category, along with strong academics.' }
    ]
  },
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences',
    location: 'New Delhi, Delhi',
    rating: 4.9,
    fees: '₹1,628 / Year',
    placements: '₹18.0 LPA Average',
    ranking: '#1 in India (Medical)',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Medicine',
    about: 'Established in 1956, AIIMS New Delhi is the premier public medical school and hospital in India. Offering high-quality education virtually for free, AIIMS has produced some of the top medical experts globally.',
    infrastructure: ['Super Specialty Hospital', 'Robotic Surgery Labs', 'Dissection Halls', 'Research Wings', 'Hostels & Gyms'],
    courses: [
      { name: 'MBBS (Bachelor of Medicine)', fees: '₹1,628 / Yr', seats: 125 },
      { name: 'B.Sc. in Nursing', fees: '₹1,100 / Yr', seats: 50 },
      { name: 'MD in General Medicine', fees: '₹2,400 / Yr', seats: 35 }
    ],
    placementDetails: [
      { company: 'Apollo Hospitals', package: '₹22.0 LPA' },
      { company: 'Fortis Healthcare', package: '₹20.0 LPA' },
      { company: 'Max Healthcare', package: '₹19.5 LPA' }
    ],
    scholarships: [
      { name: 'AIIMS Merit Award', criteria: 'Top performers in final exams', amount: '₹12,000 / Yr' }
    ],
    hostels: [
      { type: 'Standard UG Hostel', sharing: 'Twin', fees: '₹1,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1582750433449-64c676ee7424?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Dr. Sneha Paul', rating: 4.9, text: 'Clinical exposure at AIIMS is unmatched. You see patients with rare conditions from all over India. Extremely competitive but rewarding.', date: '2026-02-12' }
    ],
    faq: [
      { q: 'Is AIIMS MBBS admission only through NEET?', a: 'Yes, admission is completely through NEET UG scores and counseling.' }
    ]
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science',
    location: 'Pilani, Rajasthan',
    rating: 4.7,
    fees: '₹4.8 Lakhs / Year',
    placements: '₹19.5 LPA Average',
    ranking: '#2 in India (Private Engineering)',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Engineering',
    about: 'BITS Pilani is a highly acclaimed private institute in India, famed for its "Zero Attendance Policy", dual-degree program, and the Practice School (internship) system that embeds students in corporates for 6 months.',
    infrastructure: ['AC Classrooms', 'Innovation Lab', 'High-Speed Wifi', 'Football Turf', 'Central Workshop', 'Auditorium'],
    courses: [
      { name: 'B.E. in Computer Science', fees: '₹4,80,000 / Yr', seats: 150 },
      { name: 'B.E. in Electronics & Communication', fees: '₹4,80,000 / Yr', seats: 120 },
      { name: 'B.E. in Chemical Engineering', fees: '₹4,50,000 / Yr', seats: 90 },
      { name: 'M.Sc. in Economics (Dual Degree)', fees: '₹4,50,000 / Yr', seats: 80 }
    ],
    placementDetails: [
      { company: 'Apple', package: '₹46.0 LPA' },
      { company: 'Nvidia', package: '₹42.5 LPA' },
      { company: 'Qualcomm', package: '₹35.0 LPA' },
      { company: 'Amazon', package: '₹38.0 LPA' }
    ],
    scholarships: [
      { name: 'BITS Merit Scholarship', criteria: 'CGPA > 9.5', amount: '₹2.4 Lakhs / Yr' },
      { name: 'Merit-cum-Means (MCN)', criteria: 'CGPA > 6.0 and income limits', amount: 'Up to ₹1.8 Lakhs / Yr' }
    ],
    hostels: [
      { type: 'Standard Double Sharing', sharing: 'Twin', fees: '₹35,000 / Semester' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Karthik N', rating: 4.8, text: 'No attendance policy gives you time to focus on coding, starting up, or whatever you want. Placements are super smooth.', date: '2026-06-01' }
    ],
    faq: [
      { q: 'How is admission conducted for BITS Pilani?', a: 'Admission is based purely on BITSAT score. Board ranks are not considered unless you are the board topper.' }
    ]
  },
  {
    id: 'nlsiu-bangalore',
    name: 'National Law School of India University',
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    fees: '₹3.2 Lakhs / Year',
    placements: '₹16.5 LPA Average',
    ranking: '#1 in India (Law)',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1453733190148-c44698c26588?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Law',
    about: 'NLSIU is the premier law school in India, established in 1986. Often called the Harvard of the East for legal studies, it pioneered the 5-year integrated B.A. LL.B.(Hons.) program in India.',
    infrastructure: ['Moot Court Hall', 'Legal Aid Clinic', 'Large Library', 'Cafeteria', 'Conference Hall'],
    courses: [
      { name: 'B.A. LL.B. (Hons.) 5-Year Program', fees: '₹3,20,000 / Yr', seats: 240 },
      { name: 'LL.M. (Master of Laws)', fees: '₹2,10,000 / Yr', seats: 60 },
      { name: 'Master of Public Policy (MPP)', fees: '₹2,50,000 / Yr', seats: 80 }
    ],
    placementDetails: [
      { company: 'Shardul Amarchand Mangaldas', package: '₹18.0 LPA' },
      { company: 'Cyril Amarchand Mangaldas', package: '₹18.0 LPA' },
      { company: 'Trilegal', package: '₹17.5 LPA' },
      { company: 'Luthra & Luthra', package: '₹16.0 LPA' }
    ],
    scholarships: [
      { name: 'Aditya Birla Scholarship', criteria: 'Top CLAT scorers', amount: '₹1.8 Lakhs / Yr' }
    ],
    hostels: [
      { type: 'Standard Triple Sharing', sharing: 'Triple', fees: '₹32,000 / Semester' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1505664194779-8bebcb95c557?auto=format&fit=crop&w=600&h=400&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Megha Sharma', rating: 4.7, text: 'Extremely rigorous academics. Trimester system keeps you on your toes, but you become a top-tier lawyer.', date: '2026-05-15' }
    ],
    faq: [
      { q: 'Is CLAT mandatory for NLSIU?', a: 'Yes, all undergraduate and postgraduate admissions are through CLAT.' }
    ]
  },
  {
    id: 'srcc-delhi',
    name: 'Shri Ram College of Commerce',
    location: 'New Delhi, Delhi',
    rating: 4.7,
    fees: '₹30,000 / Year',
    placements: '₹10.5 LPA Average',
    ranking: '#1 in India (Commerce)',
    logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&h=600&q=80',
    category: 'Commerce',
    about: 'SRCC is India’s top commerce college under the University of Delhi. Known for B.Com(Hons.) and Economics(Hons.), it offers premium corporate exposure and counts top business stalwarts among its alumni.',
    infrastructure: ['Heritage Building', 'AC Seminar Rooms', 'Digital Library', 'Hostels', 'Sports Ground'],
    courses: [
      { name: 'B.Com (Hons.)', fees: '₹30,000 / Yr', seats: 620 },
      { name: 'B.A. (Hons.) Economics', fees: '₹30,000 / Yr', seats: 155 },
      { name: 'Post Graduate Diploma in GBO', fees: '₹3,20,000 / Yr', seats: 90 }
    ],
    placementDetails: [
      { company: 'McKinsey & Co', package: '₹14.5 LPA' },
      { company: 'Deutsche Bank', package: '₹13.0 LPA' },
      { company: 'EY India', package: '₹9.0 LPA' },
      { company: 'KPMG', package: '₹8.5 LPA' }
    ],
    scholarships: [
      { name: 'Enactus Merit Fund', criteria: 'Economic hardships + social service', amount: '₹20,000 / Yr' }
    ],
    hostels: [
      { type: 'Standard Hostel Rooms', sharing: 'Twin', fees: '₹25,000 / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [
      { name: 'Aditya Bajaj', rating: 4.8, text: 'Best college for Commerce. ROI is insane: paying 30k a year and getting placements above 10 LPA is unbeatable.', date: '2026-04-30' }
    ],
    faq: [
      { q: 'How can I get admission to SRCC?', a: 'Admission is based purely on CUET (Common University Entrance Test) scores conducted by NTA.' }
    ]
  }
];
