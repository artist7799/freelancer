import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, ChevronDown, Award, DollarSign, Briefcase, Search, Sparkles } from 'lucide-react';
import { CollegeCard } from '../components/cards/CollegeCard';
import { useColleges } from '../hooks/useColleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { getStaticCollege } from '../data/mockUniversities';

const PLACEMENT_UNIV_IDS = [
  'vidyashilp-university',
  'graphic-era',
  'iibs-bangalore',
  'bennett-university',
  'sanjay-ghodawat-university',
  'xlri-jamshedpur',
  'alliance-university',
  'lpu-punjab',
  'cgc-landran',
  'its-management',
  'poddar-college',
  'its-professional-studies',
  'amity-university-noida',
  'amity-university-mumbai',
  'medhavi-university',
  'kiet-university',
  'sage-university',
  'accman-business-school',
  'kr-mangalam',
  'pimpri-chinchwad-university'
];

export const STATIC_COLLEGES: any[] = PLACEMENT_UNIV_IDS.map(id => getStaticCollege(id)).filter(Boolean);

// ── Comprehensive Static Fallback Colleges ────────────────────────────────────
// Used when the API / backend returns no data, ensuring Popular Searches always show results.
const STATIC_COLLEGES_OLD: any[] = [
  {
    "id": "iilm-university-greater-noida",
    "name": "IILM University, Greater Noida",
    "location": "Greater Noida, Uttar Pradesh",
    "rating": 8.2,
    "fees": "₹1.8 Lakhs / Year",
    "placements": "7.5 LPA Average",
    "ranking": "#45 in India (Private Universities)",
    "logo": "iilm-university-greater-noida",
    "image": "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "IILM University Greater Noida is a premier educational institution known for its high-quality management and engineering programs, state-of-the-art campus, and outstanding industry connections.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
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
    ]
  },
  {
    "id": "sushant-university-gurugram",
    "name": "Sushant University, Gurugram",
    "location": "Gurugram, Haryana",
    "rating": 8,
    "fees": "₹2.2 Lakhs / Year",
    "placements": "6.8 LPA Average",
    "ranking": "#52 in India (Private Universities)",
    "logo": "sushant-university-gurugram",
    "image": "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Sushant University, formerly Ansal University, offers various undergraduate and postgraduate courses in fields like architecture, design, law, management, and engineering, focusing on holistic learning.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "haridwar-university-roorkee",
    "name": "Haridwar University, Roorkee",
    "location": "Roorkee, Uttarakhand",
    "rating": 7.8,
    "fees": "₹1.2 Lakhs / Year",
    "placements": "5.5 LPA Average",
    "ranking": "#68 in India (Engineering)",
    "logo": "haridwar-university-roorkee",
    "image": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Haridwar University Roorkee is committed to quality technical education, offering industry-aligned engineering courses in Uttarakhand.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "future-university-bareilly",
    "name": "Future University, Bareilly",
    "location": "Bareilly, Uttar Pradesh",
    "rating": 7.7,
    "fees": "₹1.1 Lakhs / Year",
    "placements": "5.2 LPA Average",
    "ranking": "#75 in India",
    "logo": "future-university-bareilly",
    "image": "https://images.unsplash.com/photo-1498243691581-b145c3f54a91?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Future University bareilly provides a wide variety of courses in engineering, business management, and computer science, prioritizing career readiness and practical exposure.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "sanskriti-university-mathura",
    "name": "Sanskriti University, Mathura",
    "location": "Mathura, Uttar Pradesh",
    "rating": 8.1,
    "fees": "₹1.5 Lakhs / Year",
    "placements": "6.0 LPA Average",
    "ranking": "#35 in India (Private Universities)",
    "logo": "sanskriti-university-mathura",
    "image": "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Sanskriti University Mathura focuses on providing value-based education in diverse disciplines, including technology, management, agriculture, and healthcare.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "sanskriti-university-bareilly",
    "name": "Sanskriti University, Bareilly",
    "location": "Bareilly, Uttar Pradesh",
    "rating": 7.9,
    "fees": "₹1.3 Lakhs / Year",
    "placements": "5.8 LPA Average",
    "ranking": "#72 in India",
    "logo": "sanskriti-university-bareilly",
    "image": "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Sanskriti University Bareilly is a modern extension campus offering specialized undergraduate and diploma engineering programs.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "amity-university-mohali",
    "name": "Amity University, Mohali",
    "location": "Mohali, Punjab",
    "rating": 8.3,
    "fees": "₹2.8 Lakhs / Year",
    "placements": "7.8 LPA Average",
    "ranking": "#18 in India (Private B-Schools)",
    "logo": "amity-university-mohali",
    "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Amity University Mohali offers world-class facilities, advanced digital classrooms, and top placements in business management, engineering, and science fields.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "sage-university-indore",
    "name": "SAGE University, Indore",
    "location": "Indore, Madhya Pradesh",
    "rating": 8,
    "fees": "₹1.5 Lakhs / Year",
    "placements": "5.1 LPA Average",
    "ranking": "#48 in India",
    "logo": "sage-university-indore",
    "image": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "SAGE University Indore is an award-winning academic institution in central India, offering progressive engineering, technology, and applied sciences curricula.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "sage-university-bhopal",
    "name": "SAGE University, Bhopal",
    "location": "Bhopal, Madhya Pradesh",
    "rating": 7.9,
    "fees": "₹1.4 Lakhs / Year",
    "placements": "4.8 LPA Average",
    "ranking": "#55 in India",
    "logo": "sage-university-bhopal",
    "image": "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "SAGE University Bhopal provides state-of-the-art infrastructure and highly focused management/entrepreneurship programs for dynamic career paths.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "avantika-university-ujjain",
    "name": "Avantika University, Ujjain",
    "location": "Ujjain, Madhya Pradesh",
    "rating": 8.4,
    "fees": "₹3.1 Lakhs / Year",
    "placements": "7.2 LPA Average",
    "ranking": "#12 in Design (Private Universities)",
    "logo": "avantika-university-ujjain",
    "image": "https://images.unsplash.com/photo-1525920980995-f8a382bf42c5?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Design",
    "about": "Avantika University Ujjain is Indias first design-centered university. Promoted by MIT Group Pune, it offers highly experiential learning in design and technology.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "kk-modi-university-durg",
    "name": "K.K. Modi University, Durg",
    "location": "Durg, Chhattisgarh",
    "rating": 7.6,
    "fees": "₹1.3 Lakhs / Year",
    "placements": "5.0 LPA Average",
    "ranking": "#82 in India",
    "logo": "kk-modi-university-durg",
    "image": "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "K.K. Modi University Durg focuses on industry-ready corporate and digital management courses backed by the industrial legacy of Modi Group.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "medhavi-skills-university-sikkim",
    "name": "Medhavi Skills University, Sikkim",
    "location": "Namchi, Sikkim",
    "rating": 8,
    "fees": "₹1.2 Lakhs / Year",
    "placements": "4.2 LPA Average",
    "ranking": "#88 in India (Skill Development)",
    "logo": "medhavi-skills-university-sikkim",
    "image": "https://images.unsplash.com/photo-1492538368578-83b320261140?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Medhavi Skills University is co-designed with industry partners to offer vocational and skill-integrated management and technology training in North-East India.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "mohan-babu-university-tirupati",
    "name": "Mohan Babu University, Tirupati",
    "location": "Tirupati, Andhra Pradesh",
    "rating": 8.2,
    "fees": "₹1.6 Lakhs / Year",
    "placements": "6.2 LPA Average",
    "ranking": "#38 in India (Private Universities)",
    "logo": "mohan-babu-university-tirupati",
    "image": "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Mohan Babu University Tirupati, formerly Sree Vidyanikethan, is a premier multi-disciplinary campus famous for top placements and robust technical education.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "amity-university-hyderabad",
    "name": "Amity University, Hyderabad",
    "location": "Hyderabad, Telangana",
    "rating": 8.1,
    "fees": "₹3.0 Lakhs / Year",
    "placements": "7.2 LPA Average",
    "ranking": "#30 in India (Private B-Schools)",
    "logo": "amity-university-hyderabad",
    "image": "https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Amity University Hyderabad offers corporate-aligned BBA and MBA programs with specialized training in financial technology and global logistics.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "rayat-bahra-university-shimla",
    "name": "Rayat Bahra University, Shimla",
    "location": "Shimla, Himachal Pradesh",
    "rating": 7.7,
    "fees": "₹1.1 Lakhs / Year",
    "placements": "4.5 LPA Average",
    "ranking": "#85 in India",
    "logo": "rayat-bahra-university-shimla",
    "image": "https://images.unsplash.com/photo-1607013398845-2517de280c41?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "Rayat Bahra University Shimla offers scenic learning spaces and highly structured management studies customized for administrative and tourist service sectors.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "rayat-bahra-university-mohali",
    "name": "Rayat Bahra University, Mohali",
    "location": "Mohali, Punjab",
    "rating": 7.9,
    "fees": "₹1.4 Lakhs / Year",
    "placements": "5.2 LPA Average",
    "ranking": "#60 in India",
    "logo": "rayat-bahra-university-mohali",
    "image": "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Rayat Bahra University Mohali features a massive campus in Tricity, offering industry-tied engineering curricula and strong placements.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "rajasthan-university",
    "name": "Rajasthan University, Jaipur",
    "location": "Jaipur, Rajasthan",
    "rating": 8,
    "fees": "₹30,000 / Year",
    "placements": "4.8 LPA Average",
    "ranking": "#42 in India (UGC Universities)",
    "logo": "rajasthan-university",
    "image": "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "University of Rajasthan is the oldest institution of higher learning in Rajasthan, offering high-quality traditional and professional management studies.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "don-bosco-university",
    "name": "Don Bosco University, Guwahati",
    "location": "Guwahati, Assam",
    "rating": 7.9,
    "fees": "₹1.5 Lakhs / Year",
    "placements": "5.0 LPA Average",
    "ranking": "#58 in India (UGC)",
    "logo": "don-bosco-university",
    "image": "https://images.unsplash.com/photo-1627556704302-624286467c65?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Assam Don Bosco University is a premier Catholic research university, offering advanced engineering and technology courses in North-East India.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "dit-university-dehradun",
    "name": "DIT University, Dehradun",
    "location": "Dehradun, Uttarakhand",
    "rating": 8.1,
    "fees": "₹1.8 Lakhs / Year",
    "placements": "6.5 LPA Average",
    "ranking": "#45 in India (Engineering)",
    "logo": "dit-university-dehradun",
    "image": "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "DIT University Dehradun, formerly Dehradun Institute of Technology, is a prominent private university in Uttarakhand known for B.Tech CSE placements.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "kr-mangalam-university",
    "name": "K.R. Mangalam University, Gurugram",
    "location": "Gurugram, Haryana",
    "rating": 8,
    "fees": "₹2.8 Lakhs / Year",
    "placements": "7.5 LPA Average",
    "ranking": "#15 in India (Private B-Schools)",
    "logo": "kr-mangalam-university",
    "image": "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Management",
    "about": "K.R. Mangalam University is a premier university located in Gurugram, offering dynamic undergraduate and postgraduate programs with advanced corporate training setups.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  },
  {
    "id": "dev-bhoomi-university",
    "name": "Dev Bhoomi Uttarakhand University, Dehradun",
    "location": "Dehradun, Uttarakhand",
    "rating": 7.8,
    "fees": "₹1.3 Lakhs / Year",
    "placements": "5.5 LPA Average",
    "ranking": "#68 in India (UGC)",
    "logo": "dev-bhoomi-university",
    "image": "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&h=400&q=80",
    "category": "Engineering",
    "about": "Dev Bhoomi Uttarakhand University offers practical-based engineering and medical sciences programs in a expansive foothills campus in Dehradun.",
    "infrastructure": [
      "AC Classrooms",
      "Library",
      "Sports Complex"
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
    "gallery": [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80"
    ],
    "reviews": [],
    "faq": []
  }
];

// Parser Helpers
const parseFees = (feeStr: string): number => {
  if (!feeStr || typeof feeStr !== 'string') return 0;
  // Strip currency symbols including ?, ₹, Rs, etc.
  const cleaned = feeStr.replace(/[^\d.]/g, '');
  const val = parseFloat(cleaned);
  if (isNaN(val)) return 0;
  // Handle Lakhs, Lakh, L
  if (/lakh/i.test(feeStr)) return val * 100000;
  if (/cr|crore/i.test(feeStr)) return val * 10000000;
  // If number is small (< 1000) assume it's in Lakhs
  if (val < 1000) return val * 100000;
  return val;
};

const parsePlacement = (placeStr: string): number => {
  const val = parseFloat(placeStr.replace(/[^\d.]/g, ''));
  if (isNaN(val)) return 0;
  if (placeStr.includes('CPA') || placeStr.includes('CR') || placeStr.includes('Cr')) return val * 100;
  return val;
};

const parseRank = (rankStr: string): number => {
  const match = rankStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 999;
};

// Premium Animated Skeleton
const CollegeSkeleton = () => (
  <div className="bg-app-card border border-app-border rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
    <div className="h-48 bg-app-card relative">
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 left-12 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 right-3 w-20 h-6 rounded-full bg-white/10" />
    </div>
    <div className="p-5 flex-1 flex flex-col gap-4">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-6 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-2 h-12 bg-app-card rounded-xl p-2.5" />
      <div className="h-8 bg-white/10 rounded-lg mt-auto" />
    </div>
  </div>
);

// ── Dynamic Location & Course Descriptions ─────────────────────────────────────
const CITY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  'bengaluru': {
    'management': "Bengaluru is usually termed as the \"Silicon Valley of India\" or as an education hub and, more curiously, a hub for management studies. With the growing IT sector, the rich cultural diversity, and sound academic infrastructure, this city has been attracting students from all over India and all across the globe. The top MBA colleges of Bengaluru not only provide education but also prepare students for the ever-changing business world.",
    'engineering': "Bengaluru, the Silicon Valley of India, is the leading hub for technology and engineering studies. With the presence of top tech giants, R&D centers, and startups, the city provides unmatched internship and placement opportunities. Top engineering colleges in Bengaluru offer state-of-the-art labs and industry-aligned curricula.",
    'law': "Bengaluru is home to some of the country's most prestigious legal institutions, including NLSIU. The city provides a vibrant environment for legal studies, with opportunities in corporate law, litigation, and public policy, supported by high-court proximity and thriving corporate headquarters.",
    'design': "Bengaluru's creative ecosystem is powered by its design studios, tech startups, and premium fashion institutes. The city's top design colleges offer cutting-edge learning in UI/UX, product design, and fashion, providing students with direct access to industry leaders and creative showcases."
  },
  'bangalore': {
    'management': "Bengaluru is usually termed as the \"Silicon Valley of India\" or as an education hub and, more curiously, a hub for management studies. With the growing IT sector, the rich cultural diversity, and sound academic infrastructure, this city has been attracting students from all over India and all across the globe. The top MBA colleges of Bengaluru not only provide education but also prepare students for the ever-changing business world.",
    'engineering': "Bengaluru, the Silicon Valley of India, is the leading hub for technology and engineering studies. With the presence of top tech giants, R&D centers, and startups, the city provides unmatched internship and placement opportunities. Top engineering colleges in Bengaluru offer state-of-the-art labs and industry-aligned curricula.",
    'law': "Bengaluru is home to some of the country's most prestigious legal institutions, including NLSIU. The city provides a vibrant environment for legal studies, with opportunities in corporate law, litigation, and public policy, supported by high-court proximity and thriving corporate headquarters.",
    'design': "Bengaluru's creative ecosystem is powered by its design studios, tech startups, and premium fashion institutes. The city's top design colleges offer cutting-edge learning in UI/UX, product design, and fashion, providing students with direct access to industry leaders and creative showcases."
  },
  'pune': {
    'management': "Pune, known as the 'Oxford of the East', is a highly popular hub for MBA studies in India. With a blend of prominent B-schools and a massive industrial/IT hub (Hinjewadi), Pune offers management students excellent corporate exposure and placement opportunities.",
    'engineering': "Pune has long been a premier destination for engineering aspirants. The city boasts some of India's oldest and most prestigious tech institutes, surrounded by automotive, manufacturing, and software industries that recruit fresh talent directly from college campuses.",
    'law': "Pune provides a highly favorable educational environment for law studies. Its top law colleges are renowned for producing legal luminaries, offering students rich experiences through moot courts, legal aid clinics, and internships with top law firms.",
    'design': "Pune's rich cultural heritage combined with its modern startup culture makes it an ideal spot for design education. Students at Pune's top design institutes benefit from a collaborative ecosystem, modern design labs, and frequent cultural events."
  },
  'delhi': {
    'management': "Delhi-NCR is a massive corporate hub offering management students unparalleled exposure to corporate headquarters, government institutions, and consultancies. Top MBA colleges in the capital region focus on strategic leadership, policy alignment, and global networking.",
    'engineering': "Delhi-NCR hosts premier engineering institutions that attract top national talent. The region's vast industrial corridors, IT parks, and tech hubs provide students with extensive research opportunities, projects, and high-paying career options.",
    'law': "As the seat of the Supreme Court, Delhi-NCR is the ultimate destination for legal education. Law students in the capital gain direct exposure to national courts, prominent lawyers, think tanks, and policy-making bodies, making it a hotbed for legal careers.",
    'design': "Delhi-NCR is a center of fashion, media, and creative industries. Top design institutes here offer students exposure to national design exhibitions, fashion weeks, and corporate branding agencies, nurturing their creative potential to the fullest."
  },
  'delhi-ncr': {
    'management': "Delhi-NCR is a massive corporate hub offering management students unparalleled exposure to corporate headquarters, government institutions, and consultancies. Top MBA colleges in the capital region focus on strategic leadership, policy alignment, and global networking.",
    'engineering': "Delhi-NCR hosts premier engineering institutions that attract top national talent. The region's vast industrial corridors, IT parks, and tech hubs provide students with extensive research opportunities, projects, and high-paying career options.",
    'law': "As the seat of the Supreme Court, Delhi-NCR is the ultimate destination for legal education. Law students in the capital gain direct exposure to national courts, prominent lawyers, think tanks, and policy-making bodies, making it a hotbed for legal careers.",
    'design': "Delhi-NCR is a center of fashion, media, and creative industries. Top design institutes here offer students exposure to national design exhibitions, fashion weeks, and corporate branding agencies, nurturing their creative potential to the fullest."
  },
  'mumbai': {
    'management': "Mumbai, the financial capital of India, offers MBA and management students a unique advantage. Studying in Mumbai provides immediate access to major financial institutions, investment banks, corporate headquarters, and stock exchanges, facilitating premier placements.",
    'engineering': "Mumbai's engineering institutions are known for academic excellence and strong industry links. The city's maritime, financial, and tech industries recruit actively, offering tech graduates diverse career pathways.",
    'law': "Mumbai's legal landscape is fast-paced and corporate-heavy. Top law colleges in the city offer students premium exposure to corporate litigation, maritime law, and intellectual property, with internships at India's leading law firms.",
    'design': "Mumbai, the center of Bollywood, media, and high fashion, is a dream destination for design students. The city's design institutes offer unmatched exposure to creative directions, media production, and luxury brand design."
  }
};

const COURSE_DESCRIPTIONS: Record<string, string> = {
  'management': "Management education in India has evolved rapidly to meet the demands of a globalized economy. Top MBA and PGDM colleges across the country offer rigorous academic training, international exposure, and industry internships to groom future leaders and entrepreneurs.",
  'engineering': "Engineering continues to be one of the most sought-after careers in India. Premier technical institutes offer advanced learning in Computer Science, Artificial Intelligence, and core engineering streams, backed by robust research facilities and global placement partnerships.",
  'law': "Legal education in India has been modernized through the establishment of National Law Universities and elite private law schools. These colleges offer integrated LLB and LLM programs focusing on corporate law, human rights, and constitutional studies.",
  'design': "Design education in India is flourishing, with institutions offering specialized courses in fashion, product design, UI/UX, and communication. Students gain hands-on experience through studio workshops, industrial collaborations, and creative portfolios."
};

const CITY_ONLY_DESCRIPTIONS: Record<string, string> = {
  'bengaluru': "Bengaluru, the Silicon Valley of India, is one of the nation's premier educational hubs. The city hosts top-tier institutions across management, engineering, design, and law, drawing students globally to its innovative ecosystem and massive job market.",
  'bangalore': "Bengaluru, the Silicon Valley of India, is one of the nation's premier educational hubs. The city hosts top-tier institutions across management, engineering, design, and law, drawing students globally to its innovative ecosystem and massive job market.",
  'pune': "Pune, known as the 'Oxford of the East', is home to historical and prestigious educational institutions. Its pleasant climate, safe environment, and robust industrial base make it a highly favored destination for students nationwide.",
  'delhi': "Delhi-NCR is a major educational center of India, boasting premium central universities, IITs, NIFT, and leading business schools. The national capital region offers students an unparalleled network of professionals, government institutions, and corporates.",
  'mumbai': "Mumbai, the commercial capital of India, provides students with unique opportunities in corporate engagement, media, finance, and technology. Its colleges are recognized globally for their academic rigor and exceptional career networks."
};

const formatCityDisplayName = (cityKey: string): string => {
  if (cityKey === 'delhi-ncr') return 'Delhi-NCR';
  if (cityKey === 'bangalore' || cityKey === 'bengaluru') return 'Bengaluru';
  return cityKey.charAt(0).toUpperCase() + cityKey.slice(1);
};

const getGenericDescription = (courseKey: string, cityKey: string) => {
  const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                        courseKey === 'engineering' ? 'B-Tech' :
                        courseKey === 'law' ? 'Law' :
                        courseKey === 'design' ? 'Design' : courseKey;
  const cityDisplay = formatCityDisplayName(cityKey);
  return `${cityDisplay} is rapidly emerging as a preferred destination for high-quality higher education, especially for ${courseDisplay} aspirants. The city's top institutions combine excellent academic infrastructure, experienced faculty, and active industry engagement to ensure students are well-prepared for placement opportunities and corporate roles.`;
};

export const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse, isLoading } = useCollegesQuery({ limit: 1000 });
  // Handle both direct array and nested { data: { colleges: [] } } response shapes
  const apiColleges: any[] = 
    Array.isArray(collegesResponse) ? collegesResponse :
    Array.isArray(collegesResponse?.colleges) ? collegesResponse.colleges :
    Array.isArray(collegesResponse?.data?.colleges) ? collegesResponse.data.colleges : [];

  // Merge: API-provided colleges take precedence; static fill the gaps
  const apiIds = new Set(apiColleges.map((c: any) => c.id));
  const collegesList: any[] = apiColleges.length > 0
    ? [...apiColleges, ...STATIC_COLLEGES.filter((c) => !apiIds.has(c.id))]
    : STATIC_COLLEGES;


  // Search/Filter states
  const [nameQuery, setNameQuery] = useState('');
  const [activeSearchName, setActiveSearchName] = useState('');

  const [stateSearch, setStateSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [specSearch, setSpecSearch] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);

  // Advanced filters
  const [maxFees, setMaxFees] = useState<number>(1500000); // Max 15 Lakhs (slider max)
  const [minRank, setMinRank] = useState<string>('all');
  const [minPlacement, setMinPlacement] = useState<string>('all');

  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  const itemsPerPage = 9;

  // Synchronization with URL queries
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    const courseParam = searchParams.get('course');
    const locationParam = searchParams.get('location');

    setIsDescExpanded(false); // Reset expansion on search param change

    if (urlQuery) {
      setNameQuery(urlQuery);
      setActiveSearchName(urlQuery);
    } else {
      setNameQuery('');
      setActiveSearchName('');
    }

    if (courseParam) {
      setSelectedCourses([courseParam]);
    } else {
      setSelectedCourses([]);
    }

    if (locationParam) {
      setSelectedCities([locationParam]);
    } else {
      setSelectedCities([]);
    }

    setCurrentPage(1);
  }, [searchParams]);

  // Trigger loading state on filter change to give premium desktop feedback
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    activeSearchName,
    selectedStates,
    selectedCities,
    selectedCourses,
    selectedSpecs,
    maxFees,
    minRank,
    minPlacement,
    sortBy
  ]);

  // Option lists derived from college data
  const allStates: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[1]).filter(Boolean))
  ).sort() as string[];

  const allCities: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[0]).filter(Boolean))
  ).sort() as string[];

  const allCourses: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.category).filter(Boolean))
  ).sort() as string[];

  const allSpecs = [
    'Computer Science',
    'General Management',
    'General Medicine',
    'Business Analytics',
    'Business Administration',
    'Pediatrics',
    'Artificial Intelligence'
  ];

  // Toggle handlers
  const handleToggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
    setCurrentPage(1);
  };

  const handleToggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
    setCurrentPage(1);
  };

  const handleToggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
    setCurrentPage(1);
  };

  const handleToggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearchName(nameQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setNameQuery('');
    setActiveSearchName('');
    setStateSearch('');
    setSelectedStates([]);
    setCitySearch('');
    setSelectedCities([]);
    setCourseSearch('');
    setSelectedCourses([]);
    setSpecSearch('');
    setSelectedSpecs([]);
    setMaxFees(1500000);
    setMinRank('all');
    setMinPlacement('all');
    setSortBy('rating');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Main Filter Logic
  const filteredColleges = collegesList.filter((college: any) => {
    // 1. Search Name/Query
    if (activeSearchName.trim()) {
      const q = activeSearchName.toLowerCase().trim();
      const nameMatch = college.name.toLowerCase().includes(q);
      const locMatch = college.location.toLowerCase().includes(q);
      const categoryMatch = college.category.toLowerCase().includes(q);
      if (!nameMatch && !locMatch && !categoryMatch) return false;
    }

    // 2. State selection
    if (selectedStates.length > 0) {
      const stateOfCollege = college.location.split(', ')[1];
      if (!selectedStates.includes(stateOfCollege)) return false;
    }

    // 3. City selection
    if (selectedCities.length > 0) {
      const match = selectedCities.some(city => 
        college.location.toLowerCase().includes(city.toLowerCase())
      );
      if (!match) return false;
    }

    // 4. Course selection
    if (selectedCourses.length > 0) {
      const match = selectedCourses.some(selCourse => {
        // Direct category match
        if (college.category.toLowerCase() === selCourse.toLowerCase()) return true;
        
        // Category mapping fallback
        const selLower = selCourse.toLowerCase();
        if (selLower.includes('b.tech') && college.category.toLowerCase().includes('engineering')) return true;
        if ((selLower.includes('mba') || selLower.includes('pgdm') || selLower.includes('bba')) && college.category.toLowerCase().includes('management')) return true;
        if (selLower.includes('mbbs') && college.category.toLowerCase().includes('medicine')) return true;

        // Individual courses list match
        const coursesArr = Array.isArray(college.courses)
          ? college.courses
          : (typeof college.courses === 'string' && college.courses.trim()
            ? college.courses.split(/,|\n/).map((s: string) => ({ name: s.trim() }))
            : []);
        
        return coursesArr.some((c: any) => 
          (c.name || '').toLowerCase().includes(selLower)
        );
      });
      
      if (!match) return false;
    }

    // 5. Specialization selection — safely handle string or array courses
    if (selectedSpecs.length > 0) {
      const coursesArr = Array.isArray(college.courses)
        ? college.courses
        : (typeof college.courses === 'string' && college.courses.trim()
          ? college.courses.split(/,|\n/).map((s: string) => ({ name: s.trim() }))
          : []);
      const hasSpec = coursesArr.some((course: any) =>
        selectedSpecs.some((spec) => (course.name || '').toLowerCase().includes(spec.toLowerCase()))
      );
      if (!hasSpec) return false;
    }

    // 6. Max Fees Slider Filter — skip if fees is 0 (missing data)
    const collegeFee = parseFees(college.fees);
    if (collegeFee > 0 && collegeFee > maxFees) return false;

    // 7. Min Rank Radio Filter
    if (minRank !== 'all') {
      const collegeRank = parseRank(college.ranking);
      const targetRank = parseInt(minRank, 10);
      if (collegeRank > targetRank) return false;
    }

    // 8. Min Average Placement Filter
    if (minPlacement !== 'all') {
      const avgPlacementLPA = parsePlacement(college.placements);
      const targetPlacement = parseInt(minPlacement, 10);
      if (avgPlacementLPA > 0 && avgPlacementLPA < targetPlacement) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'fees_low') {
      return parseFees(a.fees) - parseFees(b.fees);
    }
    if (sortBy === 'fees_high') {
      return parseFees(b.fees) - parseFees(a.fees);
    }
    if (sortBy === 'placement_high') {
      // Use parsed placement averages for comparison
      const aPl = parsePlacement(a.placements);
      const bPl = parsePlacement(b.placements);
      return bPl - aPl;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedColleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedColleges = sortedColleges.slice(startIndex, startIndex + itemsPerPage);

  const formatLakhs = (val: number) => {
    if (val >= 100000) {
      return `${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString()}`;
  };

  // Get dynamic header and description content
  const getBannerContent = () => {
    const course = selectedCourses.length === 1 ? selectedCourses[0] : null;
    const city = selectedCities.length === 1 ? selectedCities[0] : null;

    if (course && city) {
      const courseKey = course.toLowerCase();
      const cityKey = city.toLowerCase();
      const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                            courseKey === 'engineering' ? 'B-Tech' :
                            courseKey === 'law' ? 'Law' :
                            courseKey === 'design' ? 'Design' : course;
      const cityDisplay = formatCityDisplayName(cityKey);
      
      const title = `Top ${courseDisplay} Colleges in ${cityDisplay}`;
      
      let description = '';
      if (CITY_DESCRIPTIONS[cityKey] && CITY_DESCRIPTIONS[cityKey][courseKey]) {
        description = CITY_DESCRIPTIONS[cityKey][courseKey];
      } else {
        description = getGenericDescription(courseKey, cityKey);
      }
      return { title, description };
    }
    
    if (course) {
      const courseKey = course.toLowerCase();
      const courseDisplay = courseKey === 'management' ? 'MBA/PGDM' :
                            courseKey === 'engineering' ? 'B-Tech' :
                            courseKey === 'law' ? 'Law' :
                            courseKey === 'design' ? 'Design' : course;
      const title = `Top ${courseDisplay} Colleges in India`;
      const description = COURSE_DESCRIPTIONS[courseKey] || `Explore the best colleges and universities offering ${courseDisplay} programs in India. Compare rankings, fees, placements, and eligibility criteria.`;
      return { title, description };
    }

    if (city) {
      const cityKey = city.toLowerCase();
      const cityDisplay = formatCityDisplayName(cityKey);
      const title = `Top Colleges in ${cityDisplay}`;
      const description = CITY_ONLY_DESCRIPTIONS[cityKey] || `Discover top-rated colleges and institutions located in ${cityDisplay}. Filter by streams, fees, average packages, and university affiliations to find your perfect fit.`;
      return { title, description };
    }

    return {
      title: "Explore & Filter Colleges",
      description: "Match courses, budgets, exams, and placement packages across India's top-tier institutions. Use the filters to customize your career alignment."
    };
  };

  const { title: bannerTitle, description: bannerDescription } = getBannerContent();
  const isLongDescription = bannerDescription.length > 180;
  const displayedDescription = (isLongDescription && !isDescExpanded)
    ? `${bannerDescription.slice(0, 180)}...`
    : bannerDescription;

  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background Gradients */}
      <div className="gradient-mesh opacity-100 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-8 rounded-3xl glass relative overflow-hidden border border-app-border text-left">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-left flex-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Programs & Campuses
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
              {bannerTitle.split('Colleges').map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="gradient-text-primary">Colleges</span>}
                </span>
              ))}
            </h1>
            <p className="text-sm text-app-muted mt-2 max-w-3xl leading-relaxed">
              {displayedDescription}
            </p>
            {isLongDescription && (
              <div className="mt-4">
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="px-5 py-2 rounded-xl bg-[#FF7A00] hover:bg-[#FF7A00]/90 text-white font-bold text-xs transition-all shadow-[0_4px_12px_rgba(255,122,0,0.2)] active:scale-95 cursor-pointer border-none"
                >
                  {isDescExpanded ? 'Read Less' : 'Read More'}
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-sm transition-all shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar Filters */}
          <aside className={`lg:col-span-3 flex flex-col gap-6 p-6 glass rounded-2xl border border-app-border ${mobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <span className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#FF7A00]" />
                Filters
              </span>
              
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-app-muted hover:text-[#FF7A00] flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Sort Selection */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Sort Options
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-app-card border border-app-border text-xs font-semibold text-white py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-[#FF7A00] cursor-pointer"
                >
                  <option value="rating">Sort: Best Rating</option>
                  <option value="placement_high">Sort: Placements (High)</option>
                  <option value="fees_low">Sort: Fees (Low to High)</option>
                  <option value="fees_high">Sort: Fees (High to Low)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-app-muted pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Search College
              </label>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search name, city..."
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full text-xs pl-3 pr-10 py-2.5 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg text-app-muted hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* MAX FEES SLIDER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF7A00]" />
                  Max Annual Fees
                </label>
                <span className="text-xs font-bold text-[#FF7A00]">
                  {formatLakhs(maxFees)}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={1500000}
                step={10000}
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
                className="w-full accent-[#FF7A00] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-app-muted font-bold">
                <span>Min: ₹2K</span>
                <span>Max: 15 Lakhs</span>
              </div>
            </div>

            {/* MIN RANK RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                National Ranking
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any NIRF Rank' },
                  { value: '10', label: 'Top 10 Institutions' },
                  { value: '25', label: 'Top 25 Institutions' },
                  { value: '50', label: 'Top 50 Institutions' },
                  { value: '100', label: 'Top 100 Institutions' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minRank"
                      checked={minRank === item.value}
                      onChange={() => setMinRank(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* MIN AVERAGE PLACEMENT RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#FF7A00]" />
                Min Placement package
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any Average Package' },
                  { value: '30', label: '30+ LPA Average' },
                  { value: '15', label: '15+ LPA Average' },
                  { value: '10', label: '10+ LPA Average' },
                  { value: '5', label: '5+ LPA Average' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minPlacement"
                      checked={minPlacement === item.value}
                      onChange={() => setMinPlacement(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* STATE FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                State
              </label>
              <input
                type="text"
                placeholder="Filter states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allStates
                  .filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase()))
                  .map((state) => (
                    <label key={state} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => handleToggleState(state)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{state}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* CITY FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                City
              </label>
              <input
                type="text"
                placeholder="Filter cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCities
                  .filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
                  .map((city) => (
                    <label key={city} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleToggleCity(city)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* COURSES FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Course Category
              </label>
              <input
                type="text"
                placeholder="Filter courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCourses
                  .filter((course) => course.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map((course) => (
                    <label key={course} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleToggleCourse(course)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{course}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* SPECIALIZATION FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Specialization
              </label>
              <input
                type="text"
                placeholder="Filter specialization..."
                value={specSearch}
                onChange={(e) => setSpecSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin font-medium">
                {allSpecs
                  .filter((spec) => spec.toLowerCase().includes(specSearch.toLowerCase()))
                  .map((spec) => (
                    <label key={spec} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSpecs.includes(spec)}
                        onChange={() => handleToggleSpec(spec)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
              </div>
            </div>

          </aside>

          {/* RIGHT: Results Catalog */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full text-left">
            
            {/* Header Result Badge */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass border border-app-border w-full">
              <span className="text-xs text-app-muted font-bold">
                Showing <b className="text-white">{sortedColleges.length}</b> premium institutions matching criteria
              </span>
            </div>

            {/* Loading / Results Grid */}
            {loading || isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CollegeSkeleton key={idx} />
                ))}
              </div>
            ) : paginatedColleges.length === 0 ? (
              <div className="py-20 text-center glass border border-app-border rounded-2xl flex flex-col items-center justify-center">
                <SlidersHorizontal className="w-12 h-12 text-app-muted/30 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Matching Colleges</h3>
                <p className="text-app-muted text-sm max-w-sm mb-6">
                  Try adjusting your budget, ranking tier, or package expectations to discover other matches.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#D14B00] px-5 py-3 rounded-xl cursor-pointer shadow-lg shadow-[#FF7A00]/20 border-none transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // 3-Column Catalog Grid
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {paginatedColleges.map((college) => (
                  <ScrollReveal key={college.id} delay={0} duration={0.4}>
                    <CollegeCard college={college} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && !isLoading && (
              <div className="flex items-center justify-between border-t border-app-border pt-6 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        currentPage === idx + 1
                          ? 'bg-[#FF7A00] border-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                          : 'border-app-border bg-app-card text-app-muted hover:text-white hover:border-app-border'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

export default Colleges;
