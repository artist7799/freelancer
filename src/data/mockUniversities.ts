export interface MockUni {
  name: string;
  location: string;
  rating: string;
  placement: string;
  averagePackage: string;
  highestPackage: string;
  totalOffers: number;
  companyVisiting: number;
  establishedYear: number;
  accreditation: string;
  fees: string;
  logo: string;
  phone?: string;
  highestInternationalPackage?: string;
  collegeType?: string;
  whyChooseList?: string[];
}

export const MOCK_UNIVERSITY_MAP: Record<string, MockUni> = {
  'gl-bajaj': {
    name: 'GL Bajaj Institute of Technology and Management',
    location: 'Greater Noida, Uttar Pradesh',
    rating: '7.8/10',
    placement: '53.58 LPA',
    averagePackage: '28.83 LPA',
    highestPackage: '53.58 LPA',
    totalOffers: 1200,
    companyVisiting: 180,
    establishedYear: 1998,
    accreditation: 'AICTE, NBA Accredited, NAAC A',
    fees: '₹6.6 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 120 2350401'
  },
  'vidyashilp-university': {
    name: 'Vidyashilp University (VU), Bangalore',
    location: 'Adityanagar, Karnataka',
    rating: '8.8/10',
    placement: '45 LPA',
    averagePackage: '8.5 LPA',
    highestPackage: '45 LPA',
    totalOffers: 2214,
    companyVisiting: 235,
    establishedYear: 2021,
    accreditation: 'AICTE, NAAC, UGC Approved',
    fees: '₹5.13 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 7773045555'
  },
  'graphic-era': {
    name: 'Graphic Era (Deemed To Be University)',
    location: 'Dehra, Uttarakhand',
    rating: '8.3/10',
    placement: '47.88 LPA',
    averagePackage: '7.2 LPA',
    highestPackage: '47.88 LPA',
    totalOffers: 1850,
    companyVisiting: 210,
    establishedYear: 1993,
    accreditation: 'AICTE, UGC, NAAC A+',
    fees: '₹2.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 1800 270 1280'
  },
  'iibs-bangalore': {
    name: 'International Institute of Business Studies (IIBS)',
    location: 'Benga, Karnataka',
    rating: '8.8/10',
    placement: '47 LPA',
    averagePackage: '8.2 LPA',
    highestPackage: '47 LPA',
    totalOffers: 1200,
    companyVisiting: 180,
    establishedYear: 2001,
    accreditation: 'AICTE Approved, UGC Recognized',
    fees: '₹4.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 99900 11111'
  },
  'bennett-university': {
    name: 'Bennett University, Greater Noida',
    location: 'Great, Uttar Pradesh',
    rating: '8.7/10',
    placement: '1.2 CR',
    averagePackage: '9.5 LPA',
    highestPackage: '1.2 CR',
    totalOffers: 1650,
    companyVisiting: 220,
    establishedYear: 2016,
    accreditation: 'AICTE, UGC Approved',
    fees: '₹3.8 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 88000 22222'
  },
  'sanjay-ghodawat-university': {
    name: 'Sanjay Ghodawat University',
    location: 'Kolha, Maharashtra',
    rating: '7.8/10',
    placement: '15 LPA',
    averagePackage: '5.5 LPA',
    highestPackage: '15 LPA',
    totalOffers: 980,
    companyVisiting: 125,
    establishedYear: 2009,
    accreditation: 'UGC, AICTE Approved',
    fees: '₹1.8 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 90110 55555'
  },
  'xlri-jamshedpur': {
    name: 'Xavier School of Management',
    location: 'Jamsh, Jharkhand',
    rating: '8.9/10',
    placement: '1.1 CR',
    averagePackage: '32.7 LPA',
    highestPackage: '1.1 CR',
    totalOffers: 640,
    companyVisiting: 154,
    establishedYear: 1949,
    accreditation: 'AACSB, AMBA, AICTE',
    fees: '₹25.0 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 657 665 3333'
  },
  'alliance-university': {
    name: 'Alliance University Bangalore',
    location: 'Benga, Karnataka',
    rating: '8.0/10',
    placement: '60.1 LPA',
    averagePackage: '8.5 LPA',
    highestPackage: '60.1 LPA',
    totalOffers: 1800,
    companyVisiting: 350,
    establishedYear: 2010,
    accreditation: 'AICTE, IACBE, NAAC A',
    fees: '₹15.0 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 80 4607 5400'
  },
  'lpu-punjab': {
    name: 'Lovely Professional University',
    location: 'Jalan, Punjab',
    rating: '8.2/10',
    placement: '2.5 CR',
    averagePackage: '8.2 LPA',
    highestPackage: '2.5 CR',
    totalOffers: 2800,
    companyVisiting: 420,
    establishedYear: 2005,
    accreditation: 'AICTE, UGC, WASC',
    fees: '₹2.4 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 1824 404404'
  },
  'cgc-landran': {
    name: 'Chandigarh Group of Colleges (CGC)',
    location: 'Chand, Punjab',
    rating: '8.5/10',
    placement: '53 LPA',
    averagePackage: '6.8 LPA',
    highestPackage: '53 LPA',
    totalOffers: 2100,
    companyVisiting: 290,
    establishedYear: 2001,
    accreditation: 'AICTE, NBA Approved',
    fees: '₹1.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 95011 05656'
  },
  'its-management': {
    name: 'I.T.S School of Management',
    location: 'Ghazi, Uttar Pradesh',
    rating: '8.0/10',
    placement: '30.86 LPA',
    averagePackage: '7.0 LPA',
    highestPackage: '30.86 LPA',
    totalOffers: 850,
    companyVisiting: 160,
    establishedYear: 1995,
    accreditation: 'AICTE, NBA, NAAC A',
    fees: '₹3.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 84477 44044'
  },
  'poddar-college': {
    name: 'Poddar International College, Jaipur',
    location: 'Jaipu, Rajasthan',
    rating: '9.2/10',
    placement: '24 LPA',
    averagePackage: '5.8 LPA',
    highestPackage: '24 LPA',
    totalOffers: 640,
    companyVisiting: 110,
    establishedYear: 1998,
    accreditation: 'AICTE, NAAC B++',
    fees: '₹1.2 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 90018 90018'
  },
  'its-professional-studies': {
    name: 'ITS College Of Professional Studies',
    location: 'Noida, Uttar Pradesh',
    rating: '9.1/10',
    placement: '10 LPA',
    averagePackage: '4.8 LPA',
    highestPackage: '10 LPA',
    totalOffers: 520,
    companyVisiting: 95,
    establishedYear: 2003,
    accreditation: 'AICTE, UGC Approved',
    fees: '₹1.0 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 84477 44043'
  },
  'amity-university-noida': {
    name: 'Amity University, Noida',
    location: 'Noida, Uttar Pradesh',
    rating: '9.5/10',
    placement: '62 LPA',
    averagePackage: '8.5 LPA',
    highestPackage: '62 LPA',
    totalOffers: 3200,
    companyVisiting: 500,
    establishedYear: 2005,
    accreditation: 'AICTE, UGC, WASC',
    fees: '₹4.8 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 120 2445252'
  },
  'amity-university-mumbai': {
    name: 'Amity University Mumbai',
    location: 'Mumba, Maharashtra',
    rating: '8.9/10',
    placement: '44 LPA',
    averagePackage: '7.8 LPA',
    highestPackage: '44 LPA',
    totalOffers: 1100,
    companyVisiting: 180,
    establishedYear: 2014,
    accreditation: 'AICTE, UGC Approved',
    fees: '₹3.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 22 7198 7000'
  },
  'medhavi-university': {
    name: 'Medhavi Skills University, Sikkim',
    location: 'Namch, Sikkim',
    rating: '8.0/10',
    placement: '10 LPA',
    averagePackage: '4.2 LPA',
    highestPackage: '10 LPA',
    totalOffers: 450,
    companyVisiting: 70,
    establishedYear: 2021,
    accreditation: 'UGC Recognized, AICTE Approved',
    fees: '₹1.2 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 99999 88888'
  },
  'kiet-university': {
    name: 'KIET Deemed To Be University',
    location: 'Ghazi, Uttar Pradesh',
    rating: '8.9/10',
    placement: '90 LPA',
    averagePackage: '7.2 LPA',
    highestPackage: '90 LPA',
    totalOffers: 1850,
    companyVisiting: 240,
    establishedYear: 1998,
    accreditation: 'AICTE, NBA, NAAC A+',
    fees: '₹1.4 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 1800 313 0056'
  },
  'sage-university': {
    name: 'SAGE University Indore',
    location: 'Indor, Madhya Pradesh',
    rating: '9.0/10',
    placement: '30 LPA',
    averagePackage: '5.1 LPA',
    highestPackage: '30 LPA',
    totalOffers: 720,
    companyVisiting: 130,
    establishedYear: 2016,
    accreditation: 'AICTE, UGC Approved',
    fees: '₹1.5 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 95222 37600'
  },
  'accman-business-school': {
    name: 'ACCMAN Business School',
    location: 'Great, Uttar Pradesh',
    rating: '8.6/10',
    placement: '18 LPA',
    averagePackage: '5.5 LPA',
    highestPackage: '18 LPA',
    totalOffers: 480,
    companyVisiting: 80,
    establishedYear: 2006,
    accreditation: 'AICTE Approved',
    fees: '₹2.2 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 88002 99999'
  },
  'kr-mangalam': {
    name: 'K R Mangalam University, (KRMU)',
    location: 'Gurga, Haryana',
    rating: '8.0/10',
    placement: '56.6 LPA',
    averagePackage: '7.5 LPA',
    highestPackage: '56.6 LPA',
    totalOffers: 1400,
    companyVisiting: 190,
    establishedYear: 2013,
    accreditation: 'AICTE, UGC Approved',
    fees: '₹2.8 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 11 4888 8888'
  },
  'pimpri-chinchwad-university': {
    name: 'Pimpri Chinchwad University (PCU)',
    location: 'Pune, Maharashtra',
    rating: '9.1/10',
    placement: '61 LPA',
    averagePackage: '8.0 LPA',
    highestPackage: '61 LPA',
    totalOffers: 1850,
    companyVisiting: 220,
    establishedYear: 2020,
    accreditation: 'UGC, AICTE Approved',
    fees: '₹2.6 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 20 7117 7100'
  },
  'chandigarh-university': {
    name: 'Chandigarh University (CU), Mohali',
    location: 'Mohali, Punjab',
    rating: '9.0/10',
    placement: '1.7 CR',
    averagePackage: '8.0 LPA',
    highestPackage: '1.7 CR',
    totalOffers: 2500,
    companyVisiting: 310,
    establishedYear: 2012,
    accreditation: 'AICTE, UGC, NAAC A+ Approved',
    fees: '₹1.8 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 1800 1212 88'
  },
  'jims-delhi': {
    name: 'Jagan Institute of Management Studies (JIMS), Rohini',
    location: 'Delhi-NCR, Delhi',
    rating: '8.8/10',
    placement: '22 LPA',
    averagePackage: '7.5 LPA',
    highestPackage: '22 LPA',
    totalOffers: 850,
    companyVisiting: 160,
    establishedYear: 1993,
    accreditation: 'AICTE Approved, NBA Accredited',
    fees: '₹4.2 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 11 45184000'
  },
  'sharda-university': {
    name: 'Sharda University, Greater Noida',
    location: 'Noida, Uttar Pradesh',
    rating: '8.7/10',
    placement: '1.6 CR',
    averagePackage: '7.0 LPA',
    highestPackage: '1.6 CR',
    totalOffers: 1950,
    companyVisiting: 220,
    establishedYear: 2009,
    accreditation: 'AICTE, UGC, NAAC A+ Approved',
    fees: '₹2.2 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 120 4570000'
  },
  'mdi-gurgaon': {
    name: 'Management Development Institute (MDI), Gurgaon',
    location: 'Gurgaon, Haryana',
    rating: '8.7/10',
    placement: '60 LPA',
    averagePackage: '26.6 LPA',
    highestPackage: '60 LPA',
    totalOffers: 420,
    companyVisiting: 120,
    establishedYear: 1973,
    accreditation: 'AMBA, AACSB, AICTE Approved',
    fees: '₹24.9 Lakhs / Year',
    logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=120&h=120&q=80',
    phone: '+91 124 4560000'
  },
  'symbiosis-pune': {
    name: 'Symbiosis Institute of Business Management (SIBM), Pune',
    location: 'Pune, Maharashtra',
    rating: '8.8/10',
    placement: '35.05 LPA',
    averagePackage: '26.77 LPA',
    highestPackage: '35.05 LPA',
    totalOffers: 1200,
    companyVisiting: 180,
    establishedYear: 1978,
    accreditation: 'UGC, NAAC A++ Approved',
    fees: '₹23.5 Lakhs / Year',
    logo: 'symbiosis-pune',
    phone: '+91 20 2811 6000'
  },
  'iim-bangalore': {
    name: 'Indian Institute of Management (IIM), Bangalore',
    location: 'Bangalore, Karnataka',
    rating: '8.9/10',
    placement: '35.3 LPA',
    averagePackage: '35.3 LPA',
    highestPackage: '1.15 CR',
    totalOffers: 600,
    companyVisiting: 150,
    establishedYear: 1973,
    accreditation: 'UGC Approved, EQUIS Accredited',
    fees: '₹25.0 Lakhs / Year',
    logo: 'iim-bangalore',
    phone: '+91 80 2699 3000'
  },
  'dms-iit-delhi': {
    name: 'Department of Management Studies (DMS), IIT Delhi',
    location: 'Delhi, Delhi',
    rating: '8.7/10',
    placement: '40.11 LPA',
    averagePackage: '25.8 LPA',
    highestPackage: '40.11 LPA',
    totalOffers: 150,
    companyVisiting: 60,
    establishedYear: 1993,
    accreditation: 'AACSB Accredited, NIRF Ranked',
    fees: '₹10.4 Lakhs / Year',
    logo: 'dms-iit-delhi',
    phone: '+91 11 2659 1171'
  },
  'fms-delhi': {
    name: 'Faculty of Management Studies (FMS), Delhi University',
    location: 'Delhi, Delhi',
    rating: '8.9/10',
    placement: '1.23 CR',
    averagePackage: '32.4 LPA',
    highestPackage: '1.23 CR',
    totalOffers: 280,
    companyVisiting: 80,
    establishedYear: 1954,
    accreditation: 'UGC Approved, DU Affiliated',
    fees: '₹2.0 Lakhs / Year',
    logo: 'fms-delhi',
    phone: '+91 11 2766 6382'
  },
  'iim-ahmedabad': {
    name: 'Indian Institute of Management (IIM), Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    rating: '9.1/10',
    placement: '1.46 CR',
    averagePackage: '34.8 LPA',
    highestPackage: '1.46 CR',
    totalOffers: 400,
    companyVisiting: 130,
    establishedYear: 1961,
    accreditation: 'EQUIS Accredited, NIRF Ranked #1',
    fees: '₹25.0 Lakhs / Year',
    logo: 'iim-ahmedabad',
    phone: '+91 79 7152 7242'
  },
  'jlu-bhopal': {
    name: 'Jagran Lakecity University (JLU), Bhopal',
    location: 'Bhopal, Madhya Pradesh',
    rating: '8.0/10',
    placement: '24 LPA',
    averagePackage: '4.5 LPA',
    highestPackage: '24 LPA',
    totalOffers: 480,
    companyVisiting: 90,
    establishedYear: 2013,
    accreditation: 'UGC Approved',
    fees: '₹1.6 Lakhs / Year',
    logo: 'jlu-bhopal',
    phone: '+91 755 661 1100'
  }
};

export const getStaticCollege = (idOrSlug: string): any => {
  const custom = MOCK_UNIVERSITY_MAP[idOrSlug];
  if (!custom) return null;

  const name = custom.name;
  const rating = parseFloat(custom.rating) || 8.5;
  const location = custom.location;
  const city = location.split(',')[0].trim();
  const state = location.split(',')[1]?.trim() || '';

  return {
    id: idOrSlug,
    name,
    location,
    city,
    state,
    rating,
    fees: custom.fees || '₹4.5 Lakhs / Year',
    placements: `${custom.averagePackage || '8.5 LPA'} Average`,
    ranking: `#${Math.floor(50 + Math.random() * 50)} in NIRF 2025`,
    logo: custom.logo,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    category: 'Management',
    about: `${name} is a state-of-the-art educational institution known for its focus on holistic learning, world-class amenities, and consistent placement achievements. Established in ${custom.establishedYear}, the university has steadily built a reputation for excellence in technical and business studies, catering to students from all parts of India.`,
    courses: [
      { name: 'B.Tech in Computer Science & Engineering', fees: custom.fees || '₹5.13 Lakhs / Year', seats: 240 },
      { name: 'MBA (Marketing & Finance Specializations)', fees: '₹4.8 Lakhs / Year', seats: 180 }
    ],
    placementDetails: [
      { company: 'Amazon', package: custom.highestPackage || '45 LPA' },
      { company: 'Cognizant', package: custom.averagePackage || '8.5 LPA' }
    ],
    scholarships: [
      { name: 'Merit Scholarship', criteria: 'Marks > 90%', amount: '50% Tuition Waiver' }
    ],
    hostels: [
      { type: 'Standard AC Room', sharing: 'Twin', fees: '₹1.1 Lakhs / Year' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1541339907198-e08755dedf3f?auto=format&fit=crop&w=600&h=400&q=80'
    ],
    reviews: [],
    faq: [],
    infrastructure: ['AC Classrooms', 'Library', 'Sports Complex']
  };
};

