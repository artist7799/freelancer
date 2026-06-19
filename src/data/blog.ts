export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  author: string;
  date: string;
  image?: string;
  star?: boolean;
}

export const blogCategories = [
  'ATMA Exam',
  'Best Management College in Delhi-NCR',
  'Best Management College in Lucknow',
  'CAT 2026 score vs percentile',
  'CAT Exam',
  'CAT/MAT/CMAT Scholarship',
  'Cutoff 2026',
  'DY Patil MBA',
  'DY Patil Pune',
  'GIBS Business School Bangalore',
  'GMAT courses',
  'GMAT Exam',
  'IILM Academy Lucknow',
  'IIM Lucknow',
  'MAH-CET Exam',
  'MAT Exam',
  'MBA',
  'MBA and PGDM programs',
  'MBA Application Form 2026',
  'MBA at DY Patil Pune',
  'MBA Exam',
  'Top B.Tech Colleges in Delhi NCR',
  'Top Colleges in Delhi',
  'Top Engineering Colleges in Delhi',
  'Top MBA College in Delhi',
  'Top PGDM College in Delhi',
  'Top PGDM College in New Delhi',
  'Top University in India',
  'Top Colleges in Pune',
  'Top Colleges in Surat',
  'Top Engineering Colleges in Lucknow',
  'Top Mba Colleges in Lucknow',
  'Uncategorized'
];

export const latestPostTitles = [
  'Private BTech Colleges in Delhi',
  'Best BTech Colleges in Delhi Without JEE 2026 | Fees, Admission & Placements',
  'Top Engineering Colleges in Pune 2026: Rankings, Fees & Placements',
  'Top Engineering Colleges in Surat 2026: Fees, Admission & Placements',
  'Best Engineering Colleges in Pune 2026'
];

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Amity University Noida: Placement Trends, Packages & Top Recruiters',
    excerpt: 'Amity University Noida provides strong placement support to its final-year and graduating students through its dedicated Corporate Resource Centre (CRC). The CRC actively...',
    content: 'Amity University Noida is celebrated for its industry linkages and massive annual placement drives. The Corporate Resource Centre (CRC) partners with Fortune 500 multinationals and leading Indian firms. Top recruitment streams include Computer Science Engineering, MBA, Finance, and Media Communications. Average salary packages range from 6 to 9 LPA, with the highest packages breaching 30+ LPA in recent placement cycles. Recruiters include Microsoft, Amazon, Deloitte, Cognizant, and Wipro.',
    categories: [
      'Top B.Tech Colleges in Delhi NCR',
      'Top Colleges in Delhi',
      'Top Engineering Colleges in Delhi',
      'Top MBA College in Delhi',
      'Top PGDM College in Delhi',
      'Top PGDM College in New Delhi',
      'Top University in India'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-15',
    star: true
  },
  {
    id: 'post-2',
    title: 'Private BTech Colleges in Delhi',
    excerpt: 'Best Private BTech Colleges in Delhi, the capital of India, is not only the political center but also a prospective educational hub for...',
    content: 'Delhi and the National Capital Region (NCR) harbor some of the finest private technical universities. Students here benefit from premium labs, global industrial exposure, and placement partnerships with NCR tech parks. Private colleges like Maharaja Surajmal Institute of Technology, Bharati Vidyapeeth, and others offer cutting-edge engineering courses under Guru Gobind Singh Indraprastha University (GGSIPU) alongside autonomous colleges. Fee packages average around 1.5 to 2.5 Lakhs per annum.',
    categories: [
      'Top B.Tech Colleges in Delhi NCR',
      'Top Colleges in Delhi'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-12'
  },
  {
    id: 'post-3',
    title: 'Best BTech Colleges in Delhi Without JEE 2026 | Fees, Admission & Placements',
    excerpt: 'Best BTech Colleges in Delhi Without JEE, they are becoming increasingly popular among students who want to pursue engineering without appearing for JEE...',
    content: 'Many private universities in Delhi NCR offer direct engineering admissions without a JEE Main score. These admissions are typically based on 10+2 board marks, state-level entrance exams (like IPU CET), or institutional tests (like Amity JEE). This article explores list of colleges, their eligibility requirements (minimum 50-60% in Physics, Chemistry, Mathematics), average course fee structures, and the final placement ratios for non-JEE candidates.',
    categories: [
      'Top Colleges in Delhi',
      'Top B.Tech Colleges in Delhi NCR'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-10',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-4',
    title: 'Top Engineering Colleges in Pune 2026: Rankings, Fees & Placements',
    excerpt: 'Top Engineering Colleges in Pune 2026: Rankings, Fees & Placements Pune has become one of the top destinations for engineering aspirants, & the...',
    content: 'Known as the "Oxford of the East", Pune houses renowned institutions like COEP Technological University, MIT World Peace University, Pune Institute of Computer Technology (PICT), and Vishwakarma Institute of Technology (VIT). Admissions are processed via MHT-CET and JEE Main scores. Placement packages at Pune colleges remain extremely competitive, heavily backed by Pune\'s sprawling IT hubs in Hinjewadi and automotive corridors in Chakan.',
    categories: [
      'Top Colleges in Pune',
      'Top B.Tech Colleges in Delhi NCR'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-08',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-5',
    title: 'Top Engineering Colleges in Surat 2026: Fees, Admission & Placements',
    excerpt: 'Top Engineering Colleges in Surat? Surat is one of Gujarat\'s fastest-growing educational and industrial hubs. The city...',
    content: 'Surat is home to SVNIT (Sardar Vallabhbhai National Institute of Technology) and several private engineering schools. Students benefit from local industrial links with diamond, textile, and chemical sectors. SVNIT is highly ranked in NIRF, boasting placement percentages above 85% for core sectors and computer applications.',
    categories: [
      'Top Colleges in Surat'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-05',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-6',
    title: 'Best Engineering Colleges in Pune 2026',
    excerpt: 'The academic landscape in Pune remains a vibrant destination for aspiring students, blending a rich cultural heritage...',
    content: 'Pune stands tall as Maharashtra\'s engineering center. In this comprehensive guide, we index government-aided and private engineering programs based on faculty qualifications, laboratory quality, incubation labs, and international partnerships. Detailed statistics on placement records and minimum admission cutoff trends for 2026 entry are also discussed.',
    categories: [
      'Top Colleges in Pune'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-06-02',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-7',
    title: 'Top Engineering Colleges in Lucknow',
    excerpt: 'Top Engineering Colleges in Lucknow. Lucknow offers a diverse mix of technical education, but if you are looking for the absolute top tier...',
    content: 'Lucknow offers several engineering paths, spearheaded by IET Lucknow (Institute of Engineering and Technology) and prestigious private universities like Amity Lucknow and BBD University. Admissions are mainly structured via JEE Main scores and UPTAC counseling. Graduating students find career avenues in local corporate hubs and nearby Noida tech complexes.',
    categories: [
      'Top Engineering Colleges in Lucknow'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-05-28',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-8',
    title: 'Top B.Tech Colleges in Pune (2026 Rankings)',
    excerpt: 'Top B.Tech. Colleges in Pune (2026 Rankings) Pune has emerged as a premier destination for engineering aspirants, making the search for top B.Tech...',
    content: 'Looking for a verified B.Tech rank catalog in Pune? COEP, PICT, Cummins College (for women), VIT, and AIT (Army Institute of Technology) continue to command the highest rankings in Maharashtra. We detail course options, specializations like AI & Data Science, annual fee grids, and average packages.',
    categories: [
      'Top Colleges in Pune',
      'Uncategorized'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-05-25',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-9',
    title: 'Top MBA Colleges in Lucknow',
    excerpt: 'Top MBA Colleges in Lucknow. Lucknow offers a diverse mix of management studies, but if you are looking for the absolute top tier...',
    content: 'Spearheaded by IIM Lucknow, the city is a stellar destination for MBA and PGDM studies. Other highly sought-after institutes include Jaipuria Institute of Management, LBSIM, and University of Lucknow. Admission requirements include CAT, CMAT, and MAT entrance test percentiles, followed by rigorous GD/PI sessions. Placement averages range from 6 LPA up to 30+ LPA (at IIM Lucknow).',
    categories: [
      'Top Mba Colleges in Lucknow'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-05-20',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&h=400&q=80'
  },
  {
    id: 'post-10',
    title: 'Top 3 MCA colleges in Pune 2026',
    excerpt: 'Top 3 MCA colleges in Pune 2026. Aspiring IT professionals often target the top 3 MCA colleges in Pune for 2026 to leverage...',
    content: 'Master of Computer Applications (MCA) is a highly coveted post-graduate program for software careers. Pune\'s top 3 MCA colleges are Pune University (SPPU), DES Pune, and Bharati Vidyapeeth. Admission is strictly handled through the MAH-MCA-CET. The curriculum combines advanced programming, cloud paradigms, and databases, assuring students placements in leading MNC software services.',
    categories: [
      'Top Colleges in Pune'
    ],
    author: 'ARUNA-NAND EDTECH SERVICES',
    date: '2025-05-18',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80'
  }
];
