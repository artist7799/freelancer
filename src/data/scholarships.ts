import type { Scholarship } from '../types';

export const scholarships: Scholarship[] = [
  {
    id: 'aditya-birla',
    name: 'Aditya Birla Academy Scholarship',
    amount: '₹1,80,000 / Year',
    eligibility: 'Top 20 students in CLAT / CAT rank list, or top 50 in JEE Advanced',
    deadline: '2026-09-30',
    provider: 'Aditya Birla Group',
    type: 'Merit-Based',
    details: 'This scholarship covers tuition and hostel fees for students joining premier law schools, IITs, and B-schools, honoring meritorious academic achievements throughout their course.'
  },
  {
    id: 'reliance-foundation',
    name: 'Reliance Foundation Undergraduate Scholarship',
    amount: 'Up to ₹2,00,000 / Year',
    eligibility: '1st-year UG students with family income < ₹15 Lakhs; Aptitude test clearance required',
    deadline: '2026-10-15',
    provider: 'Reliance Foundation',
    type: 'Need-cum-Merit',
    details: 'Aims to support students in fields like engineering, medicine, and humanities. Awardees receive funding and access to mentoring and leadership workshops.'
  },
  {
    id: 'loreal-science',
    name: "L'Oréal India For Young Women In Science",
    amount: '₹2,50,000 Total',
    eligibility: 'Female students who passed 10+2 with PCB/PCM (min 85%) and family income < ₹6 LPA',
    deadline: '2026-08-31',
    provider: "L'Oréal India",
    type: 'Women in STEM',
    details: 'Provides financial aid to young, passionate girls to pursue higher education in any scientific discipline at a recognized university in India.'
  },
  {
    id: 'hDFC-ecss',
    name: 'HDFC Bank ECSS Scholarship',
    amount: '₹75,000 / Year',
    eligibility: 'Students in school (Class 6-12) or UG/PG, facing personal/financial crises',
    deadline: '2026-09-15',
    provider: 'HDFC Bank',
    type: 'Crisis Assistance',
    details: 'Designed to help students whose families have suffered income losses due to critical illness, death, or severe emergencies, ensuring their studies continue uninterrupted.'
  },
  {
    id: 'tata-scholarship-cornell',
    name: 'Tata Scholarship for Cornell University',
    amount: 'Full Tuition Support',
    eligibility: 'Indian citizens accepted to Cornell Undergraduate programs, demonstrating financial need',
    deadline: '2026-03-01',
    provider: 'Tata Education and Development Trust',
    type: 'Study Abroad (Need-Based)',
    details: 'Enables up to 20 outstanding Indian students to attend Cornell University for their undergraduate degrees, covering all academic tuition expenses.'
  },
  {
    id: 'sitaram-jindal',
    name: 'Sitaram Jindal Foundation Scholarship',
    amount: '₹30,000 / Year',
    eligibility: 'Students pursuing UG or PG courses with min 65% marks (varies by category)',
    deadline: '2026-11-30',
    provider: 'Sitaram Jindal Foundation',
    type: 'Need-Based',
    details: 'A purely merit-cum-means assistance scheme for students from economically weaker sections to complete general, technical, or professional education.'
  }
];
