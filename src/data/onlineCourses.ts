export interface OnlineCourse {
  id: string;
  university: string;
  degree: string;
  duration: string;
  rating: string;
  logo: string;
  image: string;
  category: string;
}

export interface StudentTestimonial {
  id: string;
  name: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export const onlineCourseCategories = [
  'Online MBA',
  'Online MCA',
  'Online M.Com',
  'Online M.Sc',
  'Online MA',
  'Distance MBA',
  'Online MS',
  'Distance MCA',
  'Distance M.Com',
  'Distance M.Sc',
  'Online LLM',
  'Online BCA'
];

export const onlineCourses: OnlineCourse[] = [
  {
    id: 'oc-1',
    university: 'Amity University, Mohali',
    degree: 'Online MBA Degree Programme',
    duration: '2 Years | 2 Year Program',
    rating: '4/5',
    logo: 'AMITY',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-2',
    university: 'Sushant University, Gurugram',
    degree: 'Online MBA Programme',
    duration: '24 Months | 2 Year Program',
    rating: '4/5',
    logo: 'SUSHANT',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-3',
    university: 'Sanskriti University, Mathura',
    degree: 'Online MBA Programme',
    duration: '24 Months | 2 Year Program',
    rating: '4/5',
    logo: 'SANSKRITI',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-4',
    university: 'SAGE University, Bhopal',
    degree: 'Executive MBA',
    duration: '17 Months | 17 Months',
    rating: '4/5',
    logo: 'SAGE',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-5',
    university: 'K.K. Modi University, Durg',
    degree: 'Online BBA Degree Programme',
    duration: '3 Years | 3 Years',
    rating: '4/5',
    logo: 'KKMODI',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-6',
    university: 'Medhavi Skills University, Sikkim',
    degree: 'Online B.Com Programme',
    duration: '3 Years | 3 Years',
    rating: '4/5',
    logo: 'MEDHAVI',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online M.Com'
  },
  {
    id: 'oc-7',
    university: 'Amity University, Hyderabad',
    degree: 'Master Of Computer Applications (MCA) Online Degree Programme',
    duration: '24 Months | 24 Months',
    rating: '4/5',
    logo: 'AMITY',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MCA'
  },
  {
    id: 'oc-8',
    university: 'Amity University, Mohali',
    degree: 'Online MBA',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'AMITY',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-9',
    university: 'Sanskriti University, Mathura',
    degree: 'Online MBA Programme',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'SANSKRITI',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-10',
    university: 'Rayat Bahra University, Shimla',
    degree: 'Online B.Com Programme',
    duration: '3 Years | 3 Years',
    rating: '4/5',
    logo: 'RAYATBAHRA',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online M.Com'
  },
  {
    id: 'oc-11',
    university: 'K.R. Mangalam University, Gurugram',
    degree: 'Online MBA',
    duration: '2 Years | 2 Year Program',
    rating: '4/5',
    logo: 'KRMU',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MBA'
  },
  {
    id: 'oc-12',
    university: 'Rayat Bahra University, Shimla',
    degree: 'Online BCA',
    duration: '3 Years | 3 Years',
    rating: '4/5',
    logo: 'RAYATBAHRA',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online BCA'
  },
  {
    id: 'oc-13',
    university: 'Rajasthan University, Jaipur',
    degree: 'Online MCA',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'RAJASTHAN',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MCA'
  },
  {
    id: 'oc-14',
    university: 'IILM University, Greater Noida',
    degree: 'Master of Arts (Sociology)',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'IILM',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MA'
  },
  {
    id: 'oc-15',
    university: 'Sushant University, Gurugram',
    degree: 'Master of Arts (History)',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'SUSHANT',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MA'
  },
  {
    id: 'oc-16',
    university: 'Amity University, Mohali',
    degree: 'Master of Arts (Political Science)',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'AMITY',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MA'
  },
  {
    id: 'oc-17',
    university: 'SAGE University, Bhopal',
    degree: 'Master of Arts (Economics)',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'SAGE',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MA'
  },
  {
    id: 'oc-18',
    university: 'K.K. Modi University, Durg',
    degree: 'Master of Art (M.A.) English',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'KKMODI',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online MA'
  },
  {
    id: 'oc-19',
    university: 'Medhavi Skills University, Sikkim',
    degree: 'Master of Science (Mathematics)',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'MEDHAVI',
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5c?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online M.Sc'
  },
  {
    id: 'oc-20',
    university: 'Amity University, Hyderabad',
    degree: 'Master of Commerce',
    duration: '2 Years | 2 Years',
    rating: '4/5',
    logo: 'AMITY',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    category: 'Online M.Com'
  }
];

export const onlineTestimonials: StudentTestimonial[] = [
  {
    id: 't-1',
    name: 'Priya',
    text: 'EduPlus Network transformed my educational experience. The Pay after Placement Model gave me financial peace of mind. The personalized attention and collaborative atmosphere fostered my growth and confidence.'
  },
  {
    id: 't-2',
    name: 'Srijal Singh',
    text: "EduPlus Network's innovative approach to education made my journey unforgettable. The Pay after Placement Model was a lifesaver, making quality education accessible. The personalized attention and collaborative atmosphere fostered my growth and confidence."
  },
  {
    id: 't-3',
    name: 'Swapnil Jadhav',
    text: 'EduPlus Network exceeded my expectations! The Pay after Placement Model made pursuing my dream course stress-free. The support from faculty and the practical approach to learning were game-changers. I\'m grateful for this transformative educational experience.'
  },
  {
    id: 't-4',
    name: 'Pravin Kumar',
    text: 'Choosing EduPlus was a game-changer for me. The Pay after Placement Model eased my financial concerns, allowing me to focus on my studies. The hands-on learning and industry-relevant curriculum prepared me for real-world challenges. Highly recommend!'
  }
];

export const onlineFaqs: FaqItem[] = [
  {
    q: 'What are the benefits of pursuing an online UG/PG program?',
    a: 'Online programs offer flexible learning schedules, allowing you to study anywhere while continuing to work. They also reduce commuting costs, offer premium self-paced learning content, and provide certifications recognized globally by employers.'
  },
  {
    q: 'How do I know if an online UG/PG program is accredited and recognized?',
    a: 'Accredited online universities in India are recognized by UGC-DEB (Distance Education Bureau) and carry NAAC ratings. We partner strictly with premium A++ accredited institutions including Amity University, Sushant University, and IILM University.'
  },
  {
    q: 'What technology and resources do I need to participate in an online program?',
    a: 'You need a functional computer or laptop, a reliable high-speed internet connection, and standard software platforms. Digital learning resources, e-books, and video modules are supplied through the university LMS.'
  },
  {
    q: 'How do online UG/PG programs compare to traditional on-campus programs in terms of quality?',
    a: 'Online programs cover the identical core academic syllabus as traditional on-campus programs. Content is produced and presented by identical leading faculty members and top-tier industry executives.'
  },
  {
    q: 'Can I transfer credits earned from an online UG/PG program to another institution?',
    a: 'Yes, online universities compliant with UGC parameters participate in ABC (Academic Bank of Credits), enabling you to accumulate and transfer credits across recognized institutions.'
  }
];
