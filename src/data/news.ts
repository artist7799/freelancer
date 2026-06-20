export interface NewsItem {
  id: string;
  category?: string;
  title: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export const breakingNews: NewsItem[] = [
  {
    id: 'bn-1',
    title: 'Swami Vivekananda Scholarship an initiative of the...',
    author: 'Ashvini',
    date: '2023-12-02 10:47:41',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'The Swami Vivekananda Scholarship is a premier initiative by the government of West Bengal to assist students from economically backward families.',
    content: 'The Swami Vivekananda Merit-cum-Means Scholarship scheme has been thoroughly updated for the current academic session. Students enrolled in regular courses at undergraduate, postgraduate, and doctoral levels can apply online to receive significant financial aid.'
  },
  {
    id: 'bn-2',
    title: 'MAT 2024 Registration | Application process | Appl...',
    author: 'Ashvini',
    date: '2023-11-28 05:39:31',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'All India Management Association (AIMA) has launched registrations for the MAT 2024 session.',
    content: 'The Management Aptitude Test (MAT) 2024 is now accepting registrations. Candidates seeking admission to MBA and PGDM courses can register online. The test will be conducted in Computer Based Test (CBT), Paper Based Test (PBT), and Internet Based Test (IBT) modes.'
  },
  {
    id: 'bn-3',
    title: 'CAT Exam date 2024 released | Application Process ...',
    author: 'Ashvini',
    date: '2023-11-28 05:34:08',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'The official dates and guidelines for the Common Admission Test (CAT) 2024 have been published by the coordinating IIM.',
    content: 'The Common Admission Test (CAT) 2024 notification has been officially released. The registration gate is set to close shortly, and the exam will be held across multiple test cities nationwide. Scoring card details will be published in early January.'
  },
  {
    id: 'bn-4',
    title: 'XAT 2025 Registration | Eligibility, deadlines, application guide...',
    author: 'Ashvini',
    date: '2023-11-25 08:12:14',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'XLRI Jamshedpur has opened registration links for XAT 25. Learn about cutoffs, fees, and requirements.',
    content: 'Xavier Aptitude Test (XAT) 2025 registration is now active. As one of the oldest and most respected management admission tests, XAT scores are accepted by over 160 premium business colleges in India.'
  },
  {
    id: 'bn-5',
    title: 'CMAT 2026 Registration | Exam structure, dates and registration steps...',
    author: 'Ashvini',
    date: '2023-11-22 14:10:45',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'NTA will open application lines for CMAT 2026. Register early to book your preferred exam center.',
    content: 'Common Management Admission Test (CMAT) registrations will launch on the official website. CMAT is a standard 3-hour computer-based exam checking quantitative aptitude, logic, language, and general awareness.'
  },
  {
    id: 'bn-6',
    title: 'NEET UG Counselling 2025 | Allotments guidelines and schedules...',
    author: 'Ashvini',
    date: '2023-11-18 11:35:10',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&h=150&q=80',
    excerpt: 'MCC has declared seat allotment timelines for medical aspirants participating in national counselling.',
    content: 'The Medical Counselling Committee (MCC) is announcing seat allocation steps for AIQ MBBS/BDS registrations. Qualifying NEET candidates can log in to fill in and lock choices.'
  }
];

export const allNews: NewsItem[] = [
  {
    id: 'an-1',
    category: 'News Category',
    title: 'MBA in Banking and Finance: Complete Guide to Getting Admission for 2025',
    author: 'Ashvini',
    date: '2024-12-31 10:17:18',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Specialization of a Master of Business Administration in Banking and Finance accords graduates targeted expertise in that area, coupled with desired competencie',
    content: 'An MBA in Banking & Finance is designed to prepare professionals for leading roles in banking, investment firms, corporate finance, and treasury management. The course curriculum covers key concepts like portfolio management, risk evaluation, accounting structures, and financial technologies. Admissions for the 2025 batch are open globally across prominent colleges.'
  },
  {
    id: 'an-2',
    category: 'News Category',
    title: 'Amity University, Mohali: Courses, Fees, Admission 2025, Placements, Cut Off, Ranking',
    author: 'Ashvini',
    date: '2024-12-31 09:06:58',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Amity University Mohali offers world-class facilities and top placements.',
    content: 'Amity University in Mohali is a premier management institution with a global reputation. It features excellent MBA and BBA programs, dual specialties, international exchange options, and strong corporate connections. Annual placement cycles record averages of around 7.8 LPA, with recruiters from top MNCs visiting campus.'
  },
  {
    id: 'an-3',
    category: 'Admission news',
    title: 'Online MBA Programs Are they Worth for 2026?',
    author: 'Ashvini',
    date: '2024-12-28 14:22:10',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'An exhaustive analysis of how online degrees match traditional classes in terms of syllabus, network opportunities, and industry acceptance.',
    content: 'Online MBA degrees have gained massive momentum among corporate employees due to flexible scheduling. We examine syllabus ratings, university accreditations, digital networking platforms, and placement services to evaluate their return on investment.'
  },
  {
    id: 'an-4',
    category: 'News Category',
    title: 'Top 5 MBA Colleges Offering Scholarships in India',
    author: 'Ashvini',
    date: '2024-12-25 10:15:22',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Find out which elite institutions offer need-based and merit-based tuition fee waivers for management studies in 2026.',
    content: 'Scholarships can significantly reduce tuition expenses. Private and government-run management institutes offer waivers based on exam rankings, socioeconomic profiles, and gender diversity. This guide highlights the top 5 colleges offering MBA funding aid.'
  },
  {
    id: 'an-5',
    category: 'Admission news',
    title: 'Admission open for MBA in India 2026: Eligibility, Requirement, and details',
    author: 'Ashvini',
    date: '2024-12-22 16:30:45',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Get detail insights about MBA application steps, exams accepted, dates, criteria, and documentation processes.',
    content: 'Registrations are open for the 2026 business studies batch. Applicants need graduation marks above 50% and valid CAT/XAT/MAT scorecards. Check deadlines and selection parameters on the university dashboard.'
  },
  {
    id: 'an-6',
    category: 'Article Category',
    title: 'Why to Choose Information Technology?',
    author: 'Ashvini',
    date: '2024-12-18 11:12:05',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Analyzing syllabus differences, coding challenges, and market demand parameters for IT courses compared to other streams.',
    content: 'Information Technology offers dynamic career paths in cloud development, cyber networks, and machine learning. IT graduates enjoy rising recruitment packages and global job mobility. We explore the core syllabus topics.'
  },
  {
    id: 'an-7',
    category: 'Admission news',
    title: 'Top Law Colleges in Jaipur: A Comprehensive Guide',
    author: 'Ashvini',
    date: '2024-12-15 14:18:30',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Learn about fees, ratings, moot courts facilities, and placement packages of leading legal universities in the Pink City.',
    content: 'Jaipur has several reputed universities offering integrated BA-LLB, BBA-LLB, and LLM courses. With modern moot court setups and active legal aid cells, these colleges provide great paths for corporate law and litigation practice.'
  },
  {
    id: 'an-8',
    category: 'Article Category',
    title: 'Bangalore\'s Most Prominent Business Colleges for Future Managers',
    author: 'Ashvini',
    date: '2024-12-12 09:10:15',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'A deep dive into why corporate ties and tech environments make Bangalore management institutes highly attractive.',
    content: 'Bangalore-based management institutes leverage regional tech hubs and corporate centers. Students receive high-quality summer internships and on-campus interviews with leading firms. Compare rankings and fee structures.'
  },
  {
    id: 'an-9',
    category: 'Admission news',
    title: 'MBA in Sushant University Gurugram Course & Fees 2026',
    author: 'Ashvini',
    date: '2024-12-09 13:42:00',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Find registration fees, MBA specialties, placement records, and entrance exam requirements for Sushant candidates.',
    content: 'Sushant University Gurugram admissions are active for MBA classes. Offering international course integrations, a large campus, and active corporate recruitment, the college accepts CAT, NMAT, and MAT scores.'
  },
  {
    id: 'an-10',
    category: 'Article Category',
    title: 'PGDM Admission in Bangalore 2025: Your Guide to Choosing Bangalore\'s Best B-School',
    author: 'Ashvini',
    date: '2024-12-05 11:23:44',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&h=250&q=80',
    excerpt: 'Analyze rankings, infrastructure, faculty ratios, and industrial projects to select a prime business program in Bangalore.',
    content: 'A PGDM is a highly practical management diploma. Bangalore colleges align PGDM curriculums directly with current business trends, incorporating internships and projects with tech giants.'
  }
];

export const trendingNews: NewsItem[] = [
  {
    id: 'tn-1',
    title: 'Education Loan for MBA in India 2025: Eligibility, Requirements, and Insights...',
    author: 'Ashvini',
    date: '2024-12-25 04:51:37',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Securing student funding from nationalized banks with subsidised rates and simplified paper applications.',
    content: 'Students can seek education financing for MBA courses online. Central banks provide preferential terms and grace periods. We list the mandatory registration documents and co-signer requirements.'
  },
  {
    id: 'tn-2',
    title: 'CAT Cutoff 2024: Expected Cutoff for IIMs and Top MBA Colleges...',
    author: 'Ashvini',
    date: '2024-12-05 10:11:18',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Expected sectional and composite percentiles required to secure call letters from baby and black IIMs.',
    content: 'Cutoffs at premier business colleges like IIM Ahmedabad, Bangalore, and Calcutta remain high. Section-wise scores in quantitative and logical sections are evaluated during shortlist stages.'
  },
  {
    id: 'tn-3',
    title: 'IIT Hyderabad Duty Medical Officer recruitment|How to apply...',
    author: 'Ashvini',
    date: '2024-11-28 08:35:10',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'IIT Hyderabad invites medical professionals for full-time duty officer slots.',
    content: 'The recruitment notification outlines qualification checks, interview schedules, and application steps. Candidates with MBBS degrees can apply online.'
  },
  {
    id: 'tn-4',
    title: 'The AICTE: Revised law program eligibility guidelines and criteria...',
    author: 'Ashvini',
    date: '2024-11-22 14:15:30',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Operational updates from the council standardizing eligibility checks for colleges.',
    content: 'AICTE guidelines update credit transfer requirements and double-major options in combined tech-law tracks, improving academic scope.'
  },
  {
    id: 'tn-5',
    title: 'CLAT 2025: Best ways to prepare for NLU Entrance exams...',
    author: 'Ashvini',
    date: '2024-11-18 11:30:10',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Expert tips on practicing comprehension, reading legal codes, and logical puzzles.',
    content: 'CLAT preparation depends heavily on reading speeds and logical deduction. Daily newspaper review and practicing online mocks are recommended.'
  },
  {
    id: 'tn-6',
    title: 'IIFT Admission 2026: Exam dates and eligibility...',
    author: 'Ashvini',
    date: '2024-11-15 09:12:45',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Flagship business administration applications open at IIFT Delhi.',
    content: 'IIFT Delhi is coordinating registrations for its international trade MBA course, relying on national exam scores for candidate shortlists.'
  },
  {
    id: 'tn-7',
    title: 'Top 10 Dental Colleges in Karnataka',
    author: 'Ashvini',
    date: '2024-11-12 16:30:12',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Comparing tuition packages and clinical laboratory setups in MDS/BDS colleges.',
    content: 'Karnataka has multiple accredited dental training universities. We analyze tuition fees, host student comments, and patient inflow statistics.'
  },
  {
    id: 'tn-8',
    title: 'SAGE University Bhopal: Scholarship criteria and placements details...',
    author: 'Ashvini',
    date: '2024-11-09 13:42:15',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=150&h=100&q=80',
    excerpt: 'Incubation facilities and campus placements at SAGE University Bhopal.',
    content: 'SAGE University in Bhopal has launched academic scholarships for management fields. Students can join campus business camps and startup projects.'
  }
];
