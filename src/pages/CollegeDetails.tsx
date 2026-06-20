import { useState, type FormEvent, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Star,
  Building,
  TrendingUp,
  BookOpen,
  DollarSign,
  Layers,
  Heart,
  ShieldCheck,
  Send,
  HelpCircle,
  MessageSquare,
  Award,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Bell,
  CheckCircle,
  ChevronRight,
  Map,
  FileText,
  GraduationCap,
  Coffee,
  Laptop,
  Dumbbell,
  Home,
  FlaskConical,
  HeartPulse,
  Trophy,
  PlayCircle,
  Users
} from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import { useCompareStore } from '../store/useCompareStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { useSavedCollegesStore } from '../store/useSavedCollegesStore';
import { STATIC_COLLEGES } from './Colleges';

// Crisp Vector Logos
const IITBLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0F2C59" />
    <path d="M50 18 L78 35 L78 65 L50 82 L22 65 L22 35 Z" fill="white" opacity="0.15" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeWidth="4" />
    <path d="M50 35 L50 65 M35 50 L65 50" stroke="white" strokeWidth="4" />
    <text x="50" y="80" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIT BOMBAY</text>
  </svg>
);

const IIMBLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="8" fill="#800000" />
    <rect x="22" y="22" width="56" height="56" rx="4" fill="white" />
    <text x="50" y="55" fill="#800000" fontSize="20" fontWeight="black" textAnchor="middle" fontFamily="serif">IIMB</text>
    <text x="50" y="70" fill="#FFD700" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BANGALORE</text>
  </svg>
);

const AIIMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0A369D" />
    <path d="M35 30 H65 V45 C65 58 50 72 50 72 C50 72 35 58 35 45 Z" fill="white" />
    <rect x="46" y="38" width="8" height="20" fill="#E74C3C" />
    <rect x="40" y="44" width="20" height="8" fill="#E74C3C" />
    <text x="50" y="88" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AIIMS DELHI</text>
  </svg>
);

const KRMULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M25 20 L50 10 L75 20 L75 55 C75 75 50 90 50 90 C50 90 25 75 25 55 Z" fill="#005B94" />
    <path d="M30 24 L50 15 L70 24 L70 53 C70 70 50 83 50 83 C50 83 30 70 30 53 Z" fill="white" />
    <text x="50" y="65" fill="#005B94" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">KRMU</text>
  </svg>
);

const GreatLakesLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#1B4D3E" />
    <path d="M25 50 C25 35 50 25 50 25 C50 25 75 35 75 50 C75 65 50 75 50 75 C50 75 25 65 25 50 Z" fill="white" opacity="0.2" />
    <circle cx="50" cy="50" r="16" fill="white" />
    <text x="50" y="55" fill="#1B4D3E" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GL</text>
    <text x="50" y="86" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GREAT LAKES</text>
  </svg>
);

const VydehiLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#E67E22" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <path d="M50 28 L68 42 L60 68 L40 68 L32 42 Z" fill="#E67E22" opacity="0.3" />
    <text x="50" y="56" fill="#E67E22" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="serif">V</text>
    <text x="50" y="85" fill="#2C3E50" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">VYDEHI</text>
  </svg>
);

const JIMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="12" y="12" width="76" height="76" rx="6" fill="#0A2540" />
    <text x="50" y="54" fill="white" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">JIMS</text>
    <text x="50" y="74" fill="#00D4B2" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ESTD 1993</text>
  </svg>
);

const AccurateLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="10" fill="#2980B9" />
    <polygon points="50,25 65,40 55,40 55,65 45,65 45,40 35,40" fill="white" />
    <text x="50" y="80" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ACCURATE</text>
  </svg>
);

const AmityLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#F1C40F" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <path d="M50 25 C65 25 65 45 50 45 C35 45 35 25 50 25 Z" fill="#F1C40F" opacity="0.5" />
    <text x="50" y="62" fill="#2C3E50" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">AMITY</text>
  </svg>
);

const GLBajajLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 20 L50 5 L80 20 L80 60 C80 80 50 95 50 95 C50 95 20 80 20 60 Z" fill="#003566" />
    <path d="M25 24 L50 11 L75 24 L75 58 C75 75 50 88 50 88 C50 88 25 75 25 58 Z" fill="#FFD166" />
    <path d="M30 28 L50 17 L70 28 L70 56 C70 70 50 81 50 81 C50 81 30 70 30 56 Z" fill="#003566" />
    <text x="50" y="52" fill="#FFD166" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GLB</text>
  </svg>
);

const BennettLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="10" y="10" width="80" height="80" rx="8" fill="#A8201A" />
    <rect x="15" y="15" width="70" height="70" rx="5" fill="white" />
    <path d="M35 30 H55 C65 30 65 42 55 42 H35 Z" fill="#A8201A" />
    <path d="M35 42 H58 C68 42 68 55 58 55 H35 Z" fill="#A8201A" />
    <rect x="35" y="30" width="10" height="40" fill="#A8201A" />
    <circle cx="70" cy="30" r="4" fill="#FFC107" />
  </svg>
);

const LloydLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#2C3E50" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <text x="50" y="58" fill="#2C3E50" fontSize="18" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">L</text>
    <text x="50" y="80" fill="#2980B9" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">LLOYD</text>
  </svg>
);

const MangalmayLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="12" y="12" width="76" height="76" rx="6" fill="#8E44AD" />
    <text x="50" y="54" fill="white" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="serif">M</text>
    <text x="50" y="74" fill="#F1C40F" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">MIMT</text>
  </svg>
);

const ShardaLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M50 20 C60 40 85 45 50 85 C15 45 40 40 50 20 Z" fill="#0072CE" opacity="0.8" />
    <path d="M50 35 C65 50 90 55 50 85 C10 55 35 50 50 35 Z" fill="#EAAA00" opacity="0.8" />
    <path d="M50 50 C70 60 85 70 50 85 C15 70 30 60 50 50 Z" fill="#E31B23" opacity="0.8" />
    <text x="50" y="96" fill="#0072CE" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">SHARDA</text>
  </svg>
);

const MITWPULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#E60000" />
    <polygon points="50,15 75,32 75,68 50,85 25,68 25,32" fill="white" opacity="0.2" />
    <text x="50" y="47" fill="white" fontSize="22" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">MIT</text>
    <text x="50" y="67" fill="#FFD700" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">WPU</text>
  </svg>
);

const LPULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="35" fill="#FF5500" />
    <text x="50" y="58" fill="white" fontSize="26" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">LPU</text>
  </svg>
);

const SIBMLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="18" y="18" width="64" height="64" rx="8" fill="#B32025" />
    <rect x="24" y="24" width="52" height="52" rx="6" fill="white" />
    <text x="50" y="50" fill="#B32025" fontSize="20" fontWeight="950" textAnchor="middle" fontFamily="sans-serif">SIBM</text>
    <text x="50" y="66" fill="#B32025" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PUNE</text>
  </svg>
);

const GraphicEraLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#B8292F" />
    <circle cx="50" cy="50" r="35" fill="white" stroke="#E5A93C" strokeWidth="2" />
    <path d="M50 25 L70 42 L62 68 L38 68 L30 42 Z" fill="#B8292F" />
    <circle cx="50" cy="48" r="10" fill="white" />
    <path d="M50 40 C55 40 58 46 50 56 C42 46 45 40 50 40 Z" fill="#E5A93C" />
  </svg>
);

const MDILogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="6" fill="#0B3C5D" />
    <path d="M15 15 L85 15 L85 45 L15 65 Z" fill="#D9534F" />
    <text x="50" y="55" fill="white" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MDI</text>
    <text x="50" y="78" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GURGAON</text>
  </svg>
);

const DMSIITDLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="none" stroke="#0F2C59" strokeWidth="4" />
    <text x="50" y="45" fill="#FF5E14" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">dms</text>
    <path d="M40 55 L50 65 L60 55 Z" fill="#0F2C59" />
    <text x="50" y="80" fill="#0F2C59" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIT DELHI</text>
  </svg>
);

const IIMALogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0A1A30" />
    <path d="M30 45 C30 25 50 15 50 15 C50 15 70 25 70 45 C70 70 50 85 50 85 C50 85 30 70 30 45 Z" fill="white" />
    <text x="50" y="52" fill="#0A1A30" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">IIMA</text>
    <text x="50" y="68" fill="#E5A93C" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AHMEDABAD</text>
  </svg>
);

const FMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <path d="M20 40 C35 30 50 45 50 45 C50 45 65 30 80 40 C70 55 50 75 50 75 C50 75 30 55 20 40 Z" fill="black" />
    <circle cx="50" cy="40" r="8" fill="black" />
    <text x="50" y="88" fill="black" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="serif">FMS</text>
  </svg>
);

const JLULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="15" y="15" width="70" height="70" rx="10" fill="#0056B3" />
    <circle cx="50" cy="45" r="20" fill="none" stroke="#FFC107" strokeWidth="4" />
    <path d="M40 65 L50 75 L60 65" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
    <text x="50" y="50" fill="white" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">JLU</text>
  </svg>
);

const CULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#1B4D3E" />
    <circle cx="50" cy="50" r="35" fill="white" />
    <text x="50" y="58" fill="#1B4D3E" fontSize="22" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">CU</text>
  </svg>
);

const renderLogo = (logoId: string) => {
  const container = (child: React.ReactNode) => (
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl border border-app-border shrink-0">
      {child}
    </div>
  );
  if (logoId && (logoId.startsWith('http') || logoId.includes('.') || logoId.startsWith('/'))) {
    return container(<img src={logoId} alt="logo" className="w-full h-full object-contain" />);
  }
  switch (logoId) {
    case 'iit-bombay': return container(<IITBLogo />);
    case 'iim-bangalore': return container(<IIMBLogo />);
    case 'aiims-delhi': return container(<AIIMSLogo />);
    case 'kr-mangalam': return container(<KRMULogo />);
    case 'great-lakes': return container(<GreatLakesLogo />);
    case 'vydehi-medical': return container(<VydehiLogo />);
    case 'mit-wpu': return container(<MITWPULogo />);
    case 'lpu-punjab': return container(<LPULogo />);
    case 'symbiosis-pune': return container(<SIBMLogo />);
    case 'graphic-era': return container(<GraphicEraLogo />);
    case 'mdi-gurgaon': return container(<MDILogo />);
    case 'dms-iit-delhi': return container(<DMSIITDLogo />);
    case 'iim-ahmedabad': return container(<IIMALogo />);
    case 'fms-delhi': return container(<FMSLogo />);
    case 'jlu-bhopal': return container(<JLULogo />);
    case 'chandigarh-university': return container(<CULogo />);
    case 'jims-delhi':
    case 'jims-gn':
      return container(<JIMSLogo />);
    case 'accurate-group': return container(<AccurateLogo />);
    case 'amity-university': return container(<AmityLogo />);
    case 'gl-bajaj': return container(<GLBajajLogo />);
    case 'bennett-university': return container(<BennettLogo />);
    case 'lloyd-school': return container(<LloydLogo />);
    case 'mangalmay-institute': return container(<MangalmayLogo />);
    case 'sharda-university': return container(<ShardaLogo />);
    default: {
      const initials = (logoId || '')
        .split('-')
        .map(w => w[0])
        .join('')
        .toUpperCase()
        .substring(0, 4) || 'COL';
      return container(
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="12" y="12" width="76" height="76" rx="12" fill="#0A369D" />
          <text x="50" y="58" fill="white" fontSize="22" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">{initials}</text>
        </svg>
      );
    }
  }
};

import { type MockUni, MOCK_UNIVERSITY_MAP } from '../data/mockUniversities';


const REAL_COLLEGE_HIGHLIGHTS_OVERRIDE: Record<string, any> = {
  'dit-university-dehradun': {
    establishedYear: 2013,
    collegeType: 'Private University',
    accreditation: 'NAAC Grade A, UGC & AICTE Approved',
    rankingCustom: 'Ranked #81 in Pharmacy by NIRF 2024, Diamond Rated by QS I-GAUGE',
    averagePackage: '₹6.0 LPA',
    highestPackage: '₹58 LPA',
    totalOffers: 1250,
    companyVisiting: 250,
    aboutText: 'DIT University (DITU), Dehradun, is a flagship private university of the Unison Group. Nestled in the scenic foothills of Mussoorie, the university is highly regarded for its NAAC Grade A accreditation, strong B.Tech CSE placements, and industry-oriented academic curriculum.',
    rankingsListCustom: [
      'Accredited with prestigious NAAC Grade A in Uttarakhand',
      'Ranked 81st in Pharmacy category by NIRF 2024',
      'Ranked in the 1001-1200 band globally by Times Higher Education (THE) World Rankings 2025',
      'Awarded Diamond Subject Rating by QS I-GAUGE for academic quality'
    ],
    whyChooseList: [
      'NAAC Grade A certified institution ensuring high standards of technical education',
      'Excellent placement record with a peak highest package of ₹58 LPA and average of ₹6.0 LPA',
      'Scenic 21-acre campus in Dehradun foothills providing a peaceful learning environment',
      'Industry partnerships with Oracle, AWS, and Cisco for cutting-edge digital training',
      'Well-stocked central library with over 1.2 Lakh print and online journals',
      'Vibrant campus culture with international student chapters, technical clubs, and annual festivals'
    ],
    coursesList: [
      { name: 'B.Tech in Computer Science & Engineering', fees: '₹2.1 Lakhs / Year', seats: 240, eligibility: '10+2 with 60% in PCM + JEE Main' },
      { name: 'B.Arch (Bachelor of Architecture)', fees: '₹2.4 Lakhs / Year', seats: 60, eligibility: '10+2 with 50% + NATA Qualified' },
      { name: 'MBA (Business Analytics, HR, Marketing)', fees: '₹2.2 Lakhs / Year', seats: 120, eligibility: 'Graduation with 50% + CAT/MAT/CMAT' },
      { name: 'Bachelor of Pharmacy (B.Pharm)', fees: '₹1.6 Lakhs / Year', seats: 100, eligibility: '10+2 with 50% in PCB/PCM' }
    ],
    infrastructureList: ['Smart Classrooms', 'Central Library', 'Advanced Computing Labs', 'Sports Complex', 'Separate Hostels', 'Air-Conditioned Auditorium', '24/7 Infirmary'],
    placementDetailsList: [
      { company: 'Amazon', package: '₹38.0 LPA' },
      { company: 'Microsoft', package: '₹44.0 LPA' },
      { company: 'Deloitte', package: '₹8.5 LPA' },
      { company: 'Cognizant', package: '₹6.0 LPA' }
    ],
    scholarshipsList: [
      { name: 'Uttarakhand Domicile Discount', criteria: 'Uttarakhand Permanent Residents', amount: '26% Tuition Fee Waiver' },
      { name: 'Merit-Based Scholarship', criteria: 'JEE Rank < 20000 or Class 12 Marks > 95%', amount: '50% to 100% Tuition Waiver' }
    ],
    hostelsList: [
      { type: 'AC Boys Hostel (Twin Sharing)', sharing: 'Twin sharing rooms with attached mess', fees: '₹1.25 Lakhs / Year' },
      { type: 'AC Girls Hostel (Twin Sharing)', sharing: 'Twin sharing rooms with premium safety', fees: '₹1.25 Lakhs / Year' }
    ],
    faqList: [
      { q: 'What are the top recruiters at DIT University?', a: 'Amazon, Microsoft, Cognizant, Infosys, and Deloitte are the regular top recruiters.' },
      { q: 'Is transport service available for day scholars?', a: 'Yes, a dedicated fleet of buses covers all major routes across Dehradun.' }
    ],
    admissionProcessTextCustom: 'Admission to DIT University is based on merit in national entrance exams like JEE Main, NATA, GATE, CAT, or qualifying exams (Class 12 / Graduation). Eligible candidates undergo counseling and a personal interview for final seat allotment.',
    scholarshipTextCustom: 'DIT University offers extensive scholarships, including a 26% tuition fee rebate for Uttarakhand domicile students, merit scholarships based on Class 12 board marks or JEE Main ranks (up to 100% waiver), and special concessions for ward of defense personnel.',
    placementTextCustom: 'DIT University placements have consistently been outstanding. The highest salary package reached up to ₹58 LPA, and the average salary package lies between ₹5.5 LPA and ₹6.0 LPA, with top companies like Amazon, Microsoft, and Commvault participating.'
  },
  'avantika-university-ujjain': {
    establishedYear: 2017,
    collegeType: 'Private Design University',
    accreditation: 'UGC Recognized, promoted by MIT Group Pune',
    rankingCustom: '#12 in Design (Private Universities in India) by IIRF',
    averagePackage: '₹8.2 LPA',
    highestPackage: '₹20 LPA',
    totalOffers: 450,
    companyVisiting: 120,
    aboutText: 'Avantika University, Ujjain, is India’s first design-centered university, promoted by the legendary MAEER’s MIT Group of Institutions, Pune. Established in 2017, the university runs a distinctive, student-centric academic model focusing on Design, Technology, and Management education through experiential learning.',
    rankingsListCustom: [
      'Ranked #12 among Top Private Design Universities in India by IIRF',
      'Recognized as India\'s First Design-Centered University by UGC',
      'Awarded Diamond Band in Campus Life and Green Sustainability initiatives',
      'Ranked #63 in Private Multi-Disciplinary Universities by India Today'
    ],
    whyChooseList: [
      'Pioneering Design-centered education model integrated across all Engineering & Management streams',
      'Mentorship and pedigree of the MIT Group of Institutions, Pune',
      'High placement packages with average package of ₹8.2 LPA and top placements in UI/UX',
      'Beautiful 60-acre green campus in Ujjain designed with creative design studios',
      'Excellent infrastructure featuring high-end Apple Mac Labs for design students',
      'Industry projects, internships, and workshops led by global design practitioners'
    ],
    coursesList: [
      { name: 'B.Des in User Experience (UX) Design', fees: '₹3.5 Lakhs / Year', seats: 60, eligibility: '10+2 with 50% + MIT DAT / UCEED Score' },
      { name: 'B.Des in Product Design', fees: '₹3.1 Lakhs / Year', seats: 60, eligibility: '10+2 with 50% + MIT DAT / UCEED Score' },
      { name: 'B.Tech in Computer Science & Engineering', fees: '₹2.2 Lakhs / Year', seats: 120, eligibility: '10+2 with 50% in PCM + JEE Main' },
      { name: 'MBA in Finance & Marketing', fees: '₹1.8 Lakhs / Year', seats: 90, eligibility: 'Graduation with 50% + CAT/MAT/XAT' }
    ],
    infrastructureList: ['Design Studios', 'Apple Mac Labs', 'Blended Classrooms', 'Sports Complex', 'Separate Hostels', 'Amphitheater', 'Fitness Center'],
    placementDetailsList: [
      { company: 'Microsoft India', package: '₹20.0 LPA' },
      { company: 'Tata Motors', package: '₹8.5 LPA' },
      { company: 'Infosys', package: '₹6.5 LPA' },
      { company: 'Capgemini', package: '₹7.0 LPA' }
    ],
    scholarshipsList: [
      { name: 'MIT Design Scholarship', criteria: 'DAT Rank < 200 or Class 12 Marks > 92%', amount: '50% Tuition Waiver' },
      { name: 'MP Domicile Scholarship', criteria: 'Scheduled Tribe/Caste residents of MP', amount: 'Up to 100% Tuition Waiver' }
    ],
    hostelsList: [
      { type: 'Aavaas Boys Hostel (Twin Sharing)', sharing: 'Twin-sharing design-styled hostel rooms', fees: '₹1.3 Lakhs / Year' },
      { type: 'Aavaas Girls Hostel (Twin Sharing)', sharing: 'Twin-sharing design-styled hostel rooms', fees: '₹1.3 Lakhs / Year' }
    ],
    faqList: [
      { q: 'What is unique about Avantika University?', a: 'It is India\'s first design-centered university, meaning design thinking is integrated into Engineering and Business courses.' },
      { q: 'Are placements available for design branches?', a: 'Yes, there are excellent placements, especially in UX/UI design, with companies like Microsoft, Google, and design firms recruiting.' }
    ],
    admissionProcessTextCustom: 'Admission to Avantika University design programs requires clearing the MIT Design Aptitude Test (DAT) or national tests like UCEED/NID. Engineering and management admissions are based on JEE Main, CAT, or local entrance scores followed by a design-thinking assessment interview.',
    scholarshipTextCustom: 'Avantika University offers various scholarships including the MIT Design Scholarship for top scorers in DAT/UCEED, MP Domicile scholarships for SC/ST/OBC category candidates, and merit-cum-means financial assistance for deserving students.',
    placementTextCustom: 'Avantika University placements are managed by a highly active career services cell. The highest placement package stands at ₹20 LPA, with an average package of ₹8.2 LPA. Key hiring sectors include UI/UX design, Product design, and Software development.'
  },
  'amity-university-mohali': {
    establishedYear: 2021,
    collegeType: 'Private University',
    accreditation: 'NAAC Grade A, UGC Recognized, WASC (USA) & QAA (UK) Accredited',
    rankingCustom: 'Top 3% Universities globally (Amity Group), #18 in Private B-Schools',
    averagePackage: '₹7.8 LPA',
    highestPackage: '₹20 LPA',
    totalOffers: 950,
    companyVisiting: 200,
    aboutText: 'Amity University, Mohali (also known as Amity University Punjab), is a state-of-the-art campus established in 2021 by the Amity Education Group. Spanning 40 acres in the IT/Knowledge Park of Mohali, the campus is built to international standards and offers top-tier education with NAAC A and global accreditations like WASC.',
    rankingsListCustom: [
      'Accredited with an outstanding NAAC A Grade within its initial operational cycles',
      'Amity Education Group is ranked among the Top 3% Universities globally by QS & THE',
      'Ranked #18 for Private Business Schools in North India by IIRF',
      'Internationally accredited by WASC (USA) and QAA (UK) for global degrees'
    ],
    whyChooseList: [
      'Globally benchmarked 40-acre smart campus located in the Mohali IT hub',
      'Degrees internationally recognized through WASC (USA) and QAA (UK) accreditations',
      'Industry-aligned curriculum with global exposure and semester-abroad options',
      'Strong placements with top MNCs recruiting, recording an average package of ₹7.8 LPA',
      'State-of-the-art research labs, 650-seater auditorium, and modern sports complexes',
      'Direct entry and extensive scholarship programs for high-achieving board scorers'
    ],
    coursesList: [
      { name: 'MBA in Business Analytics', fees: '₹2.8 Lakhs / Year', seats: 120, eligibility: 'Graduation with 50% + CAT/MAT/AMCAT' },
      { name: 'B.Tech in Computer Science & Engineering', fees: '₹2.2 Lakhs / Year', seats: 180, eligibility: '10+2 with 60% in PCM' },
      { name: 'BBA in International Business', fees: '₹2.0 Lakhs / Year', seats: 120, eligibility: '10+2 with 50% in any stream' },
      { name: 'LL.B. (Integrated Law Honors)', fees: '₹1.8 Lakhs / Year', seats: 90, eligibility: '10+2 with 50% + CLAT Score' }
    ],
    infrastructureList: ['Smart Classrooms', 'State-of-the-art Labs', '650-seater Auditorium', 'Cafeteria', 'AC Hostels', 'Sports Courts', 'Medical Center'],
    placementDetailsList: [
      { company: 'Amazon', package: '₹20.0 LPA' },
      { company: 'Deloitte', package: '₹8.5 LPA' },
      { company: 'Wipro', package: '₹6.5 LPA' },
      { company: 'HDFC Bank', package: '₹7.0 LPA' }
    ],
    scholarshipsList: [
      { name: 'Amity Direct Entry Scholarship', criteria: 'Class 12 Marks > 93%', amount: '100% Tuition Fee Waiver' },
      { name: 'Sports Scholarship', criteria: 'State or National level sports achievers', amount: '25% to 50% Tuition Waiver' }
    ],
    hostelsList: [
      { type: 'Premium AC Single Room', sharing: 'Single-sharing AC room with attached modern bath', fees: '₹1.5 Lakhs / Year' },
      { type: 'AC Twin Sharing Hostel', sharing: 'Twin-sharing AC room with attached modern bath', fees: '₹1.1 Lakhs / Year' }
    ],
    faqList: [
      { q: 'Does Amity Mohali offer global study options?', a: 'Yes, students can opt for study-abroad programs at other Amity campuses in London, Dubai, or Singapore.' },
      { q: 'What international accreditations does it hold?', a: 'The university holds global accreditations from WASC (USA) and QAA (UK).' }
    ],
    admissionProcessTextCustom: 'Admission to Amity University Mohali is based on qualifying exam scores followed by an English language test and a personal interview. For technical courses, national test scores like JEE Main are prioritized.',
    scholarshipTextCustom: 'Amity Mohali offers up to 100% scholarship to students scoring 95% and above in Class 12. There are also structured scholarships for sports achievements, defense personnel, and siblings of existing students.',
    placementTextCustom: 'Amity Mohali placements benefit from the centralized placement cell of Amity Group. The highest package stands at ₹20 LPA, with an average salary package ranging from ₹7.5 LPA to ₹8.0 LPA.'
  },
  'iim-bangalore': {
    establishedYear: 1973,
    collegeType: 'Public Business School (Institute of National Importance)',
    accreditation: 'EQUIS Accredited, AACSB Accredited, AMBA Accredited',
    rankingCustom: 'Ranked #2 in Management by NIRF 2024, EQUIS Accredited',
    averagePackage: '₹35.31 LPA',
    highestPackage: '1.15 CR',
    totalOffers: 606,
    companyVisiting: 150,
    aboutText: 'The Indian Institute of Management Bangalore (IIMB) is a leading public business school established in 1973. It is recognized as an Institute of National Importance. Located in India’s high-tech capital, IIMB is EQUIS-accredited and consistently ranked among the top business schools in Central and South Asia. The 100-acre oasis campus is famous for its all-stone architecture and lush green canopy.',
    rankingsListCustom: [
      'Ranked #2 in NIRF Management Ranking 2024 in India',
      'Accredited by EFMD Quality Improvement System (EQUIS) for global standard business education',
      'Ranked #1 in Central & South Asia by Eduniversal B-School rankings',
      'Ranked #32 globally in Financial Times (FT) Global MBA Ranking 2024'
    ],
    whyChooseList: [
      'Institute of National Importance with elite global reputation and powerful alumni network',
      'Located in Bengaluru — the Silicon Valley of India, offering unmatched corporate connect',
      'Industry-leading placement statistics with 100% placements and a ₹35.31 LPA average package',
      'World-class faculty comprising globally cited research scholars and industry experts',
      'Stunning 100-acre green canopy campus with unique granite stone architecture',
      'EQUIS and AACSB accreditations ensuring worldwide validity of your MBA degree'
    ],
    coursesList: [
      { name: 'PGP (Post Graduate Programme in Management)', fees: '₹24.5 Lakhs / 2 Years', seats: 480, eligibility: 'Graduation with 50% + high CAT Percentile' },
      { name: 'EPGP (Executive Post Graduate Programme)', fees: '₹31.0 Lakhs / Year', seats: 75, eligibility: 'Graduation + 5 years Work Exp + GMAT/GRE' },
      { name: 'PGPEM (PGP in Enterprise Management)', fees: '₹20.1 Lakhs / 2 Years', seats: 80, eligibility: 'Working Professionals with 4+ years Exp' },
      { name: 'PhD in Management', fees: 'Full Fellowship (100% Waiver)', seats: 30, eligibility: 'Master\'s degree + CAT/GMAT/GRE + Interview' }
    ],
    infrastructureList: ['All-stone Campus', 'Central Library', 'Computer Center', 'Sports Complex', 'Lush Green Gardens', 'Executive Hostels', 'Auditorium'],
    placementDetailsList: [
      { company: 'McKinsey & Company', package: '₹36.0 LPA' },
      { company: 'Boston Consulting Group', package: '₹36.0 LPA' },
      { company: 'Brain & Company', package: '₹35.0 LPA' },
      { company: 'Goldman Sachs', package: '₹32.0 LPA' }
    ],
    scholarshipsList: [
      { name: 'IIMB Financial Aid', criteria: 'Family annual income below 8.0 LPA', amount: 'Up to 100% Tuition Fee Waiver' },
      { name: 'Aditya Birla Scholarship', criteria: 'Academic toppers of first year', amount: '₹1.75 Lakhs / Year' }
    ],
    hostelsList: [
      { type: 'Single Occupancy Student Room', sharing: 'Single room with common bath & high speed internet', fees: 'Included in Tuition Fee' },
      { type: 'EPGP Hostel Room', sharing: 'Premium single AC room for executive programs', fees: 'Included in EPGP Fee' }
    ],
    faqList: [
      { q: 'How is admission to MBA program at IIMB decided?', a: 'Admission is highly competitive and is based on a high CAT percentile, academic history, work experience, and personal interview.' },
      { q: 'Is financial assistance available at IIMB?', a: 'Yes, financial aid is provided to all deserving candidates whose family income is below 8 LPA, covering up to 100% of the fees.' }
    ],
    admissionProcessTextCustom: 'Admission to IIM Bangalore is based on a rigorous multi-stage selection process starting with the Common Admission Test (CAT) or GMAT/GRE for international students. Shortlisted candidates are evaluated based on written capability, academic performance, work experience, and a personal interview.',
    scholarshipTextCustom: 'IIM Bangalore provides financial aid to PGP students based on family income and assets. Several corporate and alumni-funded merit scholarships are also awarded, including the Aditya Birla Scholarship and Citi Women Leader Award.',
    placementTextCustom: 'IIM Bangalore holds an exemplary record of 100% placements. The average salary package is ₹35.31 LPA, with elite strategy consulting, private equity, investment banking, and tech leadership recruiters visiting the campus.'
  }
};

export const getMockCollege = (idOrSlug: string) => {
  const staticCol = STATIC_COLLEGES.find((c: any) => c.id === idOrSlug);
  return staticCol || null;
};

export const CollegeDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { useCollegeQuery } = useColleges();
  const { data: dbCollege, isLoading: isDbLoading } = useCollegeQuery(id || '');
  const KNOWN_MOCK_IDS = new Set([
    'iilm-university-greater-noida',
    'sushant-university-gurugram',
    'haridwar-university-roorkee',
    'future-university-bareilly',
    'sanskriti-university-mathura',
    'sanskriti-university-bareilly',
    'amity-university-mohali',
    'sage-university-indore',
    'sage-university-bhopal',
    'avantika-university-ujjain',
    'kk-modi-university-durg',
    'medhavi-skills-university-sikkim',
    'mohan-babu-university-tirupati',
    'amity-university-hyderabad',
    'rayat-bahra-university-shimla',
    'rayat-bahra-university-mohali',
    'rajasthan-university',
    'don-bosco-university',
    'dit-university-dehradun',
    'kr-mangalam-university',
    'dev-bhoomi-university'
  ]);
  const isMockSlug = id ? (KNOWN_MOCK_IDS.has(id) || STATIC_COLLEGES.some((c: any) => c.id === id)) : false;

  const collegeRaw = dbCollege || (isMockSlug ? getMockCollege(id || '') : undefined);

  const college = useMemo(() => {
    if (!collegeRaw) return undefined;
    const overrides = REAL_COLLEGE_HIGHLIGHTS_OVERRIDE[collegeRaw.id || ''] || REAL_COLLEGE_HIGHLIGHTS_OVERRIDE[id || ''];
    if (overrides) {
      return {
        ...collegeRaw,
        ...overrides,
        courses: overrides.coursesList || collegeRaw.courses,
        placementDetails: overrides.placementDetailsList || collegeRaw.placementDetails,
        scholarships: overrides.scholarshipsList || collegeRaw.scholarships,
        hostels: overrides.hostelsList || collegeRaw.hostels,
        faq: overrides.faqList || collegeRaw.faq,
        infrastructure: overrides.infrastructureList || collegeRaw.infrastructure,
        rankingsList: overrides.rankingsListCustom || collegeRaw.rankingsList,
        about: overrides.aboutText || collegeRaw.about,
        admissionProcessText: overrides.admissionProcessTextCustom || collegeRaw.admissionProcessText,
        scholarshipText: overrides.scholarshipTextCustom || collegeRaw.scholarshipText,
        placementText: overrides.placementTextCustom || collegeRaw.placementText,
        ranking: overrides.rankingCustom || collegeRaw.ranking,
        establishedYear: overrides.establishedYear || collegeRaw.establishedYear,
        accreditation: overrides.accreditation || collegeRaw.accreditation,
        averagePackage: overrides.averagePackage || collegeRaw.averagePackage,
        highestPackage: overrides.highestPackage || collegeRaw.highestPackage,
        totalOffers: overrides.totalOffers || collegeRaw.totalOffers,
        companyVisiting: overrides.companyVisiting || collegeRaw.companyVisiting,
        highestInternationalPackage: overrides.highestInternationalPackage || collegeRaw.highestInternationalPackage,
        phone: overrides.phone || collegeRaw.phone
      };
    }
    return collegeRaw;
  }, [collegeRaw, id]);

  const isLoading = isDbLoading && !college;

  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();
  const { saveCollege, unsaveCollege, isSaved } = useSavedCollegesStore();
  const addToast = useGlobalStore().addToast;

  const [activeTab, setActiveTab] = useState('info');
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);
  
  // Expand states for INFO sub-sections
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const [highlightsExpanded, setHighlightsExpanded] = useState(false);
  const [admissionExpanded, setAdmissionExpanded] = useState(false);
  const [scholarshipExpanded, setScholarshipExpanded] = useState(false);
  const [placementExpanded, setPlacementExpanded] = useState(false);
  
  // Review form states
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState('');

  // Bottom review area ref
  const reviewSectionRef = useRef<HTMLDivElement>(null);
  
  // Lead Callbacks Form
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyCourse, setApplyCourse] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-36 pb-20 text-center min-h-screen bg-app-bg text-app-text flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-[#FF7A00] border-t-transparent animate-spin" />
        <p className="text-xs text-app-muted font-bold tracking-wider uppercase">Loading Campus Profile...</p>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="pt-36 pb-20 text-center min-h-screen bg-app-bg text-app-text">
        <h2 className="text-2xl font-bold font-display">College Not Found</h2>
        <p className="text-app-muted mt-2">The requested college identifier "{id}" does not exist in our catalog.</p>
        <Link to="/colleges" className="mt-6 inline-flex items-center gap-2 text-[#FF7A00] font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }

  const handleDownloadBrochure = () => {
    if (!college) return;
    
    const courseLines = (college.courses || []).map((c: any) => {
      if (typeof c === 'object') {
        return `- ${c.name}\n  Fees: ${c.fees || 'N/A'}\n  Seats: ${c.seats || 'N/A'}`;
      }
      return `- ${c}`;
    }).join('\n\n');

    const content = [
      "========================================================================",
      `                      ${college.name.toUpperCase()}`,
      "                              CAMPUS PROFILE & OVERVIEW",
      "========================================================================",
      `Established:    ${college.establishedYear || 'N/A'}`,
      `Accreditation:  ${college.accreditation || 'N/A'}`,
      `Location:       ${college.location || 'N/A'}`,
      `CM Rating:      ${college.rating ? college.rating + "/10" : 'N/A'}`,
      `Ranking:        ${college.ranking || 'N/A'}`,
      `Average Fees:   ${college.fees || 'N/A'}`,
      "",
      "------------------------------------------------------------------------",
      "CAMPUS OVERVIEW",
      "------------------------------------------------------------------------",
      college.about || 'No description available.',
      "",
      "------------------------------------------------------------------------",
      "KEY STATS & PLACEMENTS",
      "------------------------------------------------------------------------",
      `Highest Package:  ${college.highestPackage || 'N/A'}`,
      `Average Package:  ${college.averagePackage || 'N/A'}`,
      `Total Offers:     ${college.totalOffers || 'N/A'}`,
      `Companies Visited: ${college.companyVisiting || 'N/A'}`,
      "",
      "------------------------------------------------------------------------",
      "COURSES OFFERED",
      "------------------------------------------------------------------------",
      courseLines || 'Please contact admissions for the full list of courses.',
      "",
      "------------------------------------------------------------------------",
      "CONTACT DETAILS",
      "------------------------------------------------------------------------",
      `Phone:          ${college.phone || '+91 7773045555'}`,
      `Email:          ${college.email || ('admissions@' + college.id + '.edu.in')}`,
      `Address:        ${college.address || (college.name + ' Campus, India')}`,
      "",
      "========================================================================",
      "            Generated via Aruna-Nand EdTech Admissions Directory",
      "========================================================================"
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${college.name.replace(/[^a-zA-Z0-9]/g, '_')}_Brochure.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addToast('Brochure download initialized.', 'success');
  };

  // Safe field normalizers
  const toArray = (val: any): any[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) {
      try { const p = JSON.parse(val); if (Array.isArray(p)) return p; } catch {}
      return val.split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  const defaultImportantDates = [
    { event: 'Application Form Release', date: 'January 2026' },
    { event: 'Last Date to Apply', date: 'June 2026' },
    { event: 'Entrance Test / Interview', date: 'June - July 2026' },
    { event: 'Admission Confirmation', date: 'July 2026' },
    { event: 'Academic Session Commencement', date: 'August 2026' },
    { event: 'Scholarship Application Deadline', date: 'July 2026' },
    { event: 'Hostel Registration', date: 'July - August 2026' }
  ];

  const defaultVideos = [
    { title: `Campus Tour of ${college.name}`, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: `Think Excellence. Think ${college.name}`, url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
  ];

  const ratingsCategories = {
    academics: 8.9,
    faculty: 9.2,
    infrastructure: 8.3,
    placement: 8.6,
    socialLife: 8.4,
    accommodation: 9.1
  };

  const getFacilityIcon = (facility: string) => {
    const f = facility.toLowerCase();
    if (f.includes('auditorium')) return <Building className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('cafeteria') || f.includes('canteen')) return <Coffee className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('computer') || f.includes('lab')) return <Laptop className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('gym')) return <Dumbbell className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('hostel') || f.includes('residential')) return <Home className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('laboratory')) return <FlaskConical className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('library')) return <BookOpen className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('medical') || f.includes('emergency') || f.includes('health')) return <HeartPulse className="w-4 h-4 text-[#FF7A00]" />;
    if (f.includes('sport') || f.includes('court') || f.includes('play')) return <Trophy className="w-4 h-4 text-[#FF7A00]" />;
    return <CheckCircle className="w-4 h-4 text-[#FF7A00]" />;
  };

  const safeInfrastructure = toArray(college.infrastructure).length > 0
    ? toArray(college.infrastructure)
    : ['AC Classrooms', 'Central Library', 'Sports Complex', 'Hostels', 'Cafeteria', 'Wi-Fi Campus', 'Robotics Center', 'Moot Court'];

  const safeCourses = toArray(college.courses).length > 0
    ? toArray(college.courses)
    : [
        { name: 'B.Tech in Computer Science & Engineering', fees: '₹3.5 Lakhs / Year', seats: 240 },
        { name: 'MBA (General Management)', fees: '₹4.8 Lakhs / Year', seats: 180 },
        { name: 'BBA in International Business', fees: '₹2.8 Lakhs / Year', seats: 120 }
      ];

  const safeReviews: any[] = toArray(college.reviews).filter(r => typeof r === 'object');
  const safeScholarships = toArray(college.scholarships).length > 0
    ? college.scholarships
    : [
        { name: 'Merit Scholarship Plan', criteria: 'Boards > 95%', amount: '100% Tuition Waiver' },
        { name: 'Need-based Financial Assistance', criteria: 'Annual income < 6LPA', amount: '50% Waiver' }
      ];

  const safeHostels = toArray(college.hostels).length > 0
    ? college.hostels
    : [
        { type: 'AC Boys Hostel', sharing: 'Twin sharing', fees: '₹1.5 Lakhs / Year' },
        { type: 'AC Girls Hostel', sharing: 'Twin sharing', fees: '₹1.5 Lakhs / Year' }
      ];

  const safeFaq: any[] = toArray(college.faq).length > 0
    ? college.faq
    : [
        { q: 'What is the admission criteria?', a: 'Admissions are based on merit index of national level entrance exams followed by counselling.' },
        { q: 'Is there a transport service available?', a: 'Yes, full transport coverage is offered across the NCR and city regions.' }
      ];

  const safeGallery = toArray(college.gallery).length > 0
    ? toArray(college.gallery).filter(g => typeof g === 'string')
    : [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=600&h=400&q=80'
      ];

  const comparing = isComparing(college.id);
  const saved = isSaved(college.id);

  const handleCompareClick = () => {
    if (comparing) {
      removeFromCompare(college.id);
      addToast(`Removed ${college.name} from comparison list.`, 'info');
    } else {
      addToCompare(college.id);
      addToast(`Added ${college.name} to comparison list.`, 'success');
    }
  };

  const handleSaveToggle = () => {
    if (saved) {
      unsaveCollege(college.id);
      addToast(`Removed ${college.name} from saved bookmarks.`, 'info');
    } else {
      saveCollege(college.id);
      addToast(`Successfully saved ${college.name} to bookmarks!`, 'success');
    }
  };

  const handleApplySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyEmail) {
      addToast('Please complete name and email fields.', 'warning');
      return;
    }
    addToast(`Successfully submitted admission lead. Counselor reference: CM-${Math.floor(100000 + Math.random() * 900000)}`, 'success');
    setApplyName('');
    setApplyEmail('');
    setApplyCourse('');
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!revName || !revText) {
      addToast('Please input both your name and review text.', 'warning');
      return;
    }
    addToast('Review published successfully! Thank you for your feedback.', 'success');
    setRevName('');
    setRevText('');
  };

  const scrollToReview = () => {
    setActiveTab('review');
    setTimeout(() => {
      reviewSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const tabs = [
    { id: 'info', label: 'INFO', icon: Building },
    { id: 'courses', label: 'COURSES & FEES', icon: BookOpen },
    { id: 'admission', label: 'ADMISSION-2026', icon: FileText },
    { id: 'placements', label: 'PLACEMENTS', icon: TrendingUp },
    { id: 'review', label: 'REVIEW', icon: MessageSquare },
    { id: 'gallery', label: 'GALLERY', icon: Award },
    { id: 'scholarship', label: 'SCHOLARSHIP', icon: DollarSign },
    { id: 'hostel', label: 'HOSTEL', icon: ShieldCheck }
  ];

  // Placements KPI blocks values (screenshot 2 data fallback if fields don't exist)
  const kpiAverage = college.averagePackage || '7 LPA';
  const kpiTotalOffers = college.totalOffers || 2214;
  const kpiCompanies = college.companyVisiting || 235;
  const kpiHighestDomestic = college.highestPackage || '51.36 LPA';
  const kpiHighestIntl = college.highestInternationalPackage || '37.26 LPA';
  const kpiPlaced = college.placementPercentage ? `${college.placementPercentage}%` : '75%';

  // Recruiter logo labels
  const recruiters = [
    'Flipkart', 'Infosys', 'Cybage Software', 'Credit Suisse', 'Cognizant',
    'Amazon', 'Kotak Mahindra Bank', 'TATA Motors', 'KPMG', 'IBM',
    'Aditya Birla Group', 'Deloitte', 'Tech Mahindra', 'Capgemini', 'Microsoft',
    'Whirlpool', 'Accenture', 'Wipro', 'HDFC Bank', 'TCS'
  ];

  // Top Universities widget (screenshot 2/3 data)
  const topUniversities = [
    { name: 'IILM University, Greater Noida', rating: '8.2/10', location: 'Uttar Pradesh Greater Noida' },
    { name: 'Sushant University, Gurugram', rating: '8/10', location: 'Haryana Gurugram' },
    { name: 'Amity University, Mohali', rating: '8.3/10', location: 'Punjab Mohali' }
  ];

  // Top courses dynamic widget
  const topCourses = [
    'MBA in Pune', 'M.tech in Pune', 'BBA in Pune', 'MCA in Pune', 'BCA in Pune',
    'B.Com in Pune', 'B.tech in Pune', 'Ph.D in Pune', 'B.DES in Pune', 'PGDM in Pune'
  ];

  // Live Application Form list (screenshot 4/5 data)
  const liveApps = [
    { name: 'DIT University, Dehradun', location: 'Dehradun, Uttarakhand' },
    { name: 'K.R. Mangalam University, Gurugram', location: 'Gurugram, Haryana' },
    { name: 'SAGE University, Indore', location: 'Indore, Madhya Pradesh' },
    { name: 'Avantika University, Ujjain', location: 'Ujjain, Madhya Pradesh' },
    { name: 'Mohan Babu University, Tirupati', location: 'Tirupati, Andhra Pradesh' },
    { name: 'Dev Bhoomi Uttarakhand University, Dehradun', location: 'Dehradun, Uttarakhand' },
    { name: 'Sanskriti University, Mathura', location: 'Mathura, Uttar Pradesh' }
  ];

  return (
    <div className="relative pt-16 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background patterns */}
      <div className="gradient-mesh opacity-40 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF7A00]/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Career Mantra Styled Subheader Navigation (Top links layout matching Image 2) */}
      <div className="w-full bg-[#121E31] border-b border-app-border text-[11px] font-bold py-2 px-6 overflow-x-auto whitespace-nowrap text-left z-20 flex gap-6 text-[#94A3B8]">
        <Link to="/colleges" className="hover:text-white uppercase tracking-wider text-[#FF7A00]">Colleges</Link>
        <Link to="/exams" className="hover:text-white uppercase tracking-wider">Exams</Link>
        <Link to="/reviews" className="hover:text-white uppercase tracking-wider">Reviews</Link>
        <Link to="/news" className="hover:text-white uppercase tracking-wider">News</Link>
        <Link to="/scholarships" className="hover:text-white uppercase tracking-wider">Apply for Scholarship</Link>
        <Link to="/events" className="hover:text-white uppercase tracking-wider">Events</Link>
        <Link to="/blog" className="hover:text-white uppercase tracking-wider">Blog</Link>
        <Link to="/common-application" className="hover:text-white uppercase tracking-wider">Common Application Process</Link>
        <Link to="/online-courses" className="hover:text-white uppercase tracking-wider">Online Courses</Link>
        <Link to="/college-predictor" className="hover:text-white uppercase tracking-wider">College Predictor</Link>
      </div>

      {/* Main Cover Banner */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={college.image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80'}
          alt={college.name}
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B16] via-transparent to-black/35" />
        
        {/* Back button */}
        <div className="absolute top-6 left-6 z-10">
          <Link to="/colleges" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-app-border text-[11px] font-bold text-white hover:bg-black/60 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
        </div>
      </div>

      {/* College Info Overlap Header */}
      <div className="mx-auto max-w-7xl px-6 relative -mt-20 z-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Header Info Box */}
          <div className="lg:col-span-12 flex flex-col md:flex-row gap-6 p-6 glass rounded-2xl border border-app-border shadow-2xl justify-between items-center bg-app-card/95">
            <div className="flex items-center gap-5 text-left w-full md:w-auto">
              {renderLogo(college.logo || college.id)}
              <div>
                <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-[#FF7A00]/20 text-[#FF7A00] border border-[#FF7A00]/30 font-black uppercase tracking-wider mb-1.5">
                  {college.category}
                </span>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black leading-tight text-app-text uppercase tracking-tight">
                  {college.name}
                </h1>
                <p className="text-xs text-app-muted mt-1 leading-relaxed max-w-2xl font-medium">
                  {college.about.substring(0, 160)}...
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-app-muted mt-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A00]" />
                    {college.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                    <b className="text-app-text font-bold">{college.rating}/10 CM Rating</b>
                  </span>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-app-card border border-app-border text-[10px] text-app-text font-bold">
                    {college.ranking}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions Header Buttons */}
            <div className="flex flex-wrap md:flex-col gap-2.5 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-app-border pt-4 md:pt-0 md:pl-6 text-xs justify-center md:justify-start">
              <button
                onClick={() => navigate(`/common-application?collegeId=${college.id}`)}
                className="flex-1 md:w-44 py-3 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-bold tracking-wider hover:opacity-95 transition-all cursor-pointer border-none shadow-md"
              >
                Apply Now
              </button>
              <button
                onClick={() => navigate('/scholarships')}
                className="flex-1 md:w-44 py-3 rounded-xl border border-[#FF7A00]/50 hover:bg-[#FF7A00]/10 text-app-text font-bold tracking-wider transition-all cursor-pointer bg-transparent"
              >
                Scholarship eligibility
              </button>
              <p className="text-[10px] text-rose-500 font-extrabold tracking-wide uppercase mt-1 w-full text-center md:text-left">
                ⚠️ Hurry Up before Admission Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Outer Grid for tabs and content */}
      <div className="mx-auto max-w-7xl px-6">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 border-b border-app-border overflow-x-auto pb-0.5 scrollbar-none scroll-smooth mb-6 select-none justify-start lg:justify-between w-full">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-5 text-[11px] font-black border-b-2 whitespace-nowrap transition-all flex items-center gap-2 focus:outline-none cursor-pointer tracking-wider ${
                  activeTab === tab.id
                    ? 'border-[#FF7A00] text-[#FF7A00]'
                    : 'border-transparent text-app-muted hover:text-[#FF7A00]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Outer 12-column Page Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: Tab Content */}
          <div className="lg:col-span-8 flex flex-col gap-8 text-left">
            
            {/* Active Tab Panel */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-app-border bg-app-card/95 shadow-xl min-h-[360px]">
              
              {/* TAB 1: INFO */}
              {activeTab === 'info' && (
                <div className="flex flex-col gap-8 text-left">
                  
                  {/* About the University Section */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-app-border/40 pb-2">
                      <div className="w-6 h-6 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center shrink-0">
                        ✔
                      </div>
                      <h3 className="text-base font-display font-extrabold text-app-text uppercase tracking-wider">
                        {college.name.split(',')[0]} Verified Profile
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                      {aboutExpanded
                        ? college.about
                        : `${college.about.substring(0, 240)}...`}
                    </p>
                    <button
                      onClick={() => setAboutExpanded(!aboutExpanded)}
                      className="text-xs text-[#FF7A00] font-black uppercase tracking-wider hover:underline text-left cursor-pointer bg-transparent border-none mt-1"
                    >
                      {aboutExpanded ? 'Read Less <<' : 'Read More >>'}
                    </button>
                  </div>

                  {/* Highlights Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Highlights
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-app-card border border-app-border rounded-xl flex flex-col justify-center text-left">
                        <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider">Est. Year</span>
                        <span className="text-sm font-black text-app-text mt-0.5">{college.establishedYear || 2021}</span>
                      </div>
                      <div className="p-3 bg-app-card border border-app-border rounded-xl flex flex-col justify-center text-left">
                        <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider">College Type</span>
                        <span className="text-sm font-black text-app-text mt-0.5">{college.collegeType || 'Private'}</span>
                      </div>
                      <div className="p-3 bg-app-card border border-app-border rounded-xl flex flex-col justify-center text-left col-span-2">
                        <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider">Accreditation</span>
                        <span className="text-xs font-black text-app-text mt-0.5 truncate" title={college.accreditation}>{college.accreditation || 'AICTE, UGC'}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                      Highlights Details Establishment Year {college.establishedYear || 2021} College Type {college.collegeType || 'Private'} · {college.accreditation || 'AICTE, UGC Approved'} · Located in {college.location}...
                    </p>
                    <button
                      onClick={() => setHighlightsExpanded(!highlightsExpanded)}
                      className="text-xs text-[#FF7A00] font-black uppercase tracking-wider hover:underline text-left cursor-pointer bg-transparent border-none"
                    >
                      {highlightsExpanded ? 'Read Less <<' : 'Read More >>'}
                    </button>

                    {/* Expanded Highlights: Rich college info */}
                    {highlightsExpanded && (
                      <div className="flex flex-col gap-6 mt-3 border-t border-app-border pt-5">

                        {/* Overview */}
                        <p className="text-sm text-app-text leading-7 font-medium">
                          {college.about || `${college.name} is a leading institution of higher education located in ${college.location}, dedicated to providing world-class academic programs and a vibrant campus experience. The university is known for its state-of-the-art infrastructure, experienced faculty, strong industry linkages, and excellent placement record.`}
                        </p>

                        {/* Key Facts Grid */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#FF7A00] rounded-full inline-block" />
                            Key Facts &amp; Figures
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              { label: 'Established', value: String(college.establishedYear || 2021) },
                              { label: 'College Type', value: college.collegeType || 'Private University' },
                              { label: 'Location', value: college.location },
                              { label: 'Accreditation', value: college.accreditation || 'AICTE, UGC' },
                              { label: 'Annual Fees', value: college.fees || '₹4.5 Lakhs / Year' },
                              { label: 'NIRF Ranking', value: college.ranking || '#Top 150 (NIRF 2025)' },
                              { label: 'Avg. Package', value: college.averagePackage || '8.5 LPA' },
                              { label: 'Highest Package', value: college.highestPackage || '45 LPA' },
                              { label: 'CM Rating', value: `${college.rating}/10` },
                            ].map((item, idx) => (
                              <div key={idx} className="flex flex-col gap-1 p-3 rounded-xl bg-app-card border border-app-border">
                                <span className="text-[10px] font-bold text-[#FF7A00] uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-extrabold text-app-text leading-snug">{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Academic Programs */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#FF7A00] rounded-full inline-block" />
                            Academic Programs Offered
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(toArray(college.courses).length > 0
                              ? toArray(college.courses).map((c: any) => typeof c === 'object' ? c.name : c)
                              : ['B.Tech (CSE, ECE, ME, CE)', 'MBA (Marketing, Finance, HR)', 'BBA / BCA', 'MCA / M.Tech', 'B.Sc / M.Sc', 'Law (LLB / LLM)', 'Ph.D Programs']
                            ).slice(0, 8).map((prog: string, idx: number) => (
                              <span key={idx} className="px-3 py-1.5 rounded-lg bg-app-card border border-app-border text-xs font-bold text-app-text">
                                {prog}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Notable Achievements */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#FF7A00] rounded-full inline-block" />
                            Notable Achievements &amp; Rankings
                          </h4>
                          <div className="flex flex-col gap-2.5">
                            {(college.rankingsList || [
                              `Ranked among Top 200 Universities in India by NIRF 2025`,
                              `Accredited by ${college.accreditation || 'AICTE & UGC'} — ensuring quality standards`,
                              `${college.companyVisiting || '200'}+ companies participated in campus placements`,
                              `Highest package of ${college.highestPackage || '45 LPA'} recorded in 2025 placements`,
                              `International MoUs with 50+ global universities for student exchange`
                            ]).map((item: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-3 bg-app-card border border-app-border rounded-lg px-3 py-2.5">
                                <span className="text-[#10B981] font-black shrink-0 text-sm mt-0.5">✔</span>
                                <span className="text-sm text-app-text font-medium leading-snug">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Infrastructure */}
                        <div className="flex flex-col gap-3">
                          <h4 className="text-sm font-black text-[#FF7A00] uppercase tracking-wider flex items-center gap-2">
                            <span className="w-1 h-4 bg-[#FF7A00] rounded-full inline-block" />
                            Infrastructure &amp; Campus Facilities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {safeInfrastructure.map((facility: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-app-card border border-app-border text-xs text-app-text font-bold">
                                {getFacilityIcon(facility)}
                                <span>{facility}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Why Choose */}
                        <div className="flex flex-col gap-3 p-5 rounded-xl bg-[#FF7A00]/8 border border-[#FF7A00]/30">
                          <h4 className="text-sm font-black text-[#FF7A00] uppercase tracking-wider">
                            Why Choose {college.name.split(',')[0]}?
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {(college.whyChooseList || [
                              `Established in ${college.establishedYear || 2021} with ${new Date().getFullYear() - (college.establishedYear || 2021)}+ years of academic excellence`,
                              `Located in ${college.city || college.location.split(',')[0]} — a thriving educational & industrial hub`,
                              `Average placement package of ${college.averagePackage || '8.5 LPA'} with top MNCs recruiting on campus`,
                              `${college.accreditation || 'AICTE & UGC'} approved — ensuring nationally recognized degrees`,
                              `Comprehensive scholarship programs for merit & need-based students`,
                              `Vibrant campus life with 100+ clubs, fests, sports, and cultural events`
                            ]).map((reason: string, idx: number) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <span className="text-[#FF7A00] font-black shrink-0 text-base leading-snug">→</span>
                                <span className="text-sm text-app-text font-medium leading-snug">{reason}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}
                  </div>

                  {/* Important Dates Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Important Dates
                    </h3>
                    <div className="overflow-x-auto border border-app-border rounded-xl">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-app-card border-b border-app-border font-black text-app-muted uppercase tracking-wider">
                            <th className="p-3">Event</th>
                            <th className="p-3">Tentative Dates</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-app-border/40 font-semibold text-app-text">
                          {(college.importantDates || defaultImportantDates).map((d: any, idx: number) => (
                            <tr key={idx} className="hover:bg-app-card/30">
                              <td className="p-3 font-bold text-app-text">{d.event}</td>
                              <td className="p-3 text-app-muted">{d.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <span className="text-[10px] text-app-muted italic font-semibold">*Refer to official notifications for exact dates.</span>
                  </div>

                  {/* Admission Process Section */}
                  <div className="flex flex-col gap-3 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Admission Process
                    </h3>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                      {admissionExpanded
                        ? (college.admissionProcessText || `Admission to ${college.name} is offered for undergraduate and postgraduate programs across multiple disciplines. The selection criteria include national/state level entrance test scores followed by written capability tests and personal interview rounds conducted dynamically online.`)
                        : `${(college.admissionProcessText || `Admission to ${college.name} is offered for undergraduate and postgraduate programs...`).substring(0, 150)}...`}
                    </p>
                    <button
                      onClick={() => setAdmissionExpanded(!admissionExpanded)}
                      className="text-xs text-[#FF7A00] font-black uppercase tracking-wider hover:underline text-left cursor-pointer bg-transparent border-none mt-1"
                    >
                      {admissionExpanded ? 'Read Less <<' : 'Read More >>'}
                    </button>
                  </div>

                  {/* Scholarship Section */}
                  <div className="flex flex-col gap-3 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Scholarship
                    </h3>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                      {scholarshipExpanded
                        ? (college.scholarshipText || `Merit-based scholarships are available for students securing top positions in local boards or competitive indices. Need-cum-merit grants are also reviewed to support lower-income students, providing up to 100% tuition waivers for qualifying individuals.`)
                        : `${(college.scholarshipText || `Scholarships are available at ${college.name} on need-cum-merit basis for eligible students...`).substring(0, 150)}...`}
                    </p>
                    <button
                      onClick={() => setScholarshipExpanded(!scholarshipExpanded)}
                      className="text-xs text-[#FF7A00] font-black uppercase tracking-wider hover:underline text-left cursor-pointer bg-transparent border-none mt-1"
                    >
                      {scholarshipExpanded ? 'Read Less <<' : 'Read More >>'}
                    </button>
                  </div>

                  {/* Placements Section */}
                  <div className="flex flex-col gap-3 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Placements
                    </h3>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                      {placementExpanded
                        ? (college.placementText || `Placements are stellar with average packages around 8.5 LPA and highest package packages hitting up to 45 LPA. Top recruiters include Consulting, IT/ITES, BFSI, and core design industries, recruiting over 90% of students annually.`)
                        : `${(college.placementText || `Placement Details: Highest Package offered is Rs. ${college.highestPackage || '45 LPA'} and Average Package is Rs. ${college.averagePackage || '8.5 LPA'}...`).substring(0, 150)}...`}
                    </p>
                    <button
                      onClick={() => setPlacementExpanded(!placementExpanded)}
                      className="text-xs text-[#FF7A00] font-black uppercase tracking-wider hover:underline text-left cursor-pointer bg-transparent border-none mt-1"
                    >
                      {placementExpanded ? 'Read Less <<' : 'Read More >>'}
                    </button>
                  </div>

                  {/* Rankings Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Rankings
                    </h3>
                    <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-app-text select-none">
                      {(college.rankingsList || [
                        'Ranked 106 for Overall by Indiatoday 2022',
                        'Ranked 102 for Overall by Timesofindia 2021',
                        'Ranked 98 for Overall by IIRF 2020',
                        'Ranked 105 for Overall by Indiatoday 2019'
                      ]).map((rankStr: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-[#FF7A00] font-black">✔</span>
                          <span>{rankStr}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Courses & Fees Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Courses & Fees
                    </h3>
                    <div className="overflow-x-auto border border-app-border rounded-xl">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-app-card border-b border-app-border font-black text-app-muted uppercase tracking-wider">
                            <th className="p-3">Course</th>
                            <th className="p-3">1st Year Fees</th>
                            <th className="p-3">Eligibility</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-app-border/40 font-semibold text-app-text">
                          {safeCourses.slice(0, 3).map((c: any, idx: number) => (
                            <tr key={idx} className="hover:bg-app-card/30">
                              <td className="p-3 font-bold text-app-text">{c.name.split(' ')[0]}</td>
                              <td className="p-3 font-black text-[#FF7A00]">{c.fees}</td>
                              <td className="p-3 text-app-muted">{c.eligibility || '10+2 with 50%'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="px-4 py-2 rounded-lg bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black text-[10px] uppercase tracking-wider cursor-pointer border-none self-start transition-all shadow-md"
                    >
                      View All &gt;&gt;
                    </button>
                  </div>

                  {/* Gallery Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Gallery
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {safeGallery.slice(0, 4).map((url: string, idx: number) => (
                        <div key={idx} className="h-24 sm:h-28 rounded-xl overflow-hidden border border-app-border relative group shadow-md select-none">
                          <img
                            src={url}
                            alt="campus life snapshot"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setActiveTab('gallery')}
                      className="px-4 py-2 rounded-lg bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black text-[10px] uppercase tracking-wider cursor-pointer border-none self-start transition-all shadow-md"
                    >
                      View All &gt;&gt;
                    </button>
                  </div>

                  {/* Videos Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Videos
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {(college.videos || defaultVideos).map((vid: any, idx: number) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedVideoUrl(vid.url)}
                          className="flex flex-col gap-2 cursor-pointer group"
                        >
                          <div className="relative aspect-video rounded-xl overflow-hidden border border-app-border shadow-lg">
                            <img
                              src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80`}
                              alt={vid.title}
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300 filter brightness-90"
                            />
                            {/* Red Play Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                              <PlayCircle className="w-12 h-12 text-[#EF4444] fill-[#EF4444] group-hover:scale-110 transition-transform shadow-2xl" />
                            </div>
                          </div>
                          <span className="text-xs font-black text-app-muted text-left truncate group-hover:text-app-text transition-colors" title={vid.title}>
                            {vid.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Facilities Section */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Facilities
                    </h3>
                    <div className="flex flex-wrap gap-2.5">
                      {safeInfrastructure.map((facility: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-app-card border border-app-border text-[10px] text-app-text font-extrabold uppercase tracking-wider shadow-sm hover:border-[#FF7A00]/40 transition-colors select-none"
                        >
                          {getFacilityIcon(facility)}
                          <span>{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ratings & Reviews Category Circle Metrics */}
                  <div className="flex flex-col gap-4 border-t border-app-border/45 pt-6">
                    <h3 className="text-base font-display font-black text-app-text uppercase tracking-wider">
                      {college.name} Ratings & Reviews
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 select-none">
                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).academics}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Academics</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).faculty}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Faculty</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).infrastructure}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Infra</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).placement}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Placement</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).socialLife}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Social</span>
                      </div>

                      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-app-card border border-app-border text-center gap-1.5 hover:border-[#FF7A00]/30 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-[#121E31] border border-[#FF7A00] flex items-center justify-center font-black text-white text-xs shadow-md">
                          {(college.ratingsCategories || ratingsCategories).accommodation}
                        </div>
                        <span className="text-[9px] text-app-muted font-black tracking-wider uppercase">Hostel</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: COURSES & FEES */}
              {activeTab === 'courses' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-app-text mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <BookOpen className="w-5 h-5 text-[#FF7A00]" />
                    Courses Offered & Seat Intake
                  </h3>
                  <div className="flex flex-col gap-4">
                    {safeCourses.map((course: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-xl bg-app-card border border-app-border gap-4 text-sm font-medium"
                      >
                        <div className="flex flex-col">
                          <span className="font-extrabold text-app-text text-base leading-snug">{course.name}</span>
                          <span className="text-xs text-app-muted mt-1 flex items-center gap-1.5">
                            Available seats: <b className="text-app-text font-bold">{course.seats || 120} Seats</b>
                          </span>
                        </div>
                        <div className="flex items-center gap-6 shrink-0">
                          <div className="flex flex-col sm:text-right">
                            <span className="text-[10px] text-app-muted uppercase font-black tracking-wider">Annual Fees</span>
                            <span className="font-black text-lg text-[#FF7A00] mt-0.5">{course.fees}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: ADMISSION */}
              {activeTab === 'admission' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-app-text mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <FileText className="w-5 h-5 text-[#FF7A00]" />
                    Admission Counseling Callback Form
                  </h3>
                  
                  <div className="p-5 rounded-2xl bg-app-card border border-app-border">
                    <p className="text-xs text-app-muted mb-4 leading-relaxed font-semibold">
                      Submit details below. A designated admissions officer will contact you within 24 hours to clarify SNAP/JEE exam eligibility cutoffs and scholarship allocations.
                    </p>

                    <form onSubmit={handleApplySubmit} className="flex flex-col gap-4 text-xs font-semibold">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Full Name</label>
                          <input
                            type="text"
                            required
                            value={applyName}
                            onChange={(e) => setApplyName(e.target.value)}
                            className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text placeholder-slate-500 outline-none focus:border-[#FF7A00] transition-colors"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Email Address</label>
                          <input
                            type="email"
                            required
                            value={applyEmail}
                            onChange={(e) => setApplyEmail(e.target.value)}
                            className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text placeholder-slate-500 outline-none focus:border-[#FF7A00] transition-colors"
                            placeholder="example@gmail.com"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Preferred Course</label>
                        <select
                          value={applyCourse}
                          onChange={(e) => setApplyCourse(e.target.value)}
                          className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                        >
                          <option value="">Select a Program</option>
                          {safeCourses.map((crs: any, i: number) => (
                            <option key={i} value={crs.name} className="bg-app-card text-app-text">
                              {crs.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="py-3 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-bold text-xs shadow-lg shadow-[#FF7A00]/25 transition-all border-none cursor-pointer flex items-center justify-center gap-2 self-start"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Request Free Callback</span>
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* TAB 4: PLACEMENTS */}
              {activeTab === 'placements' && (
                <div className="flex flex-col gap-8">
                  {/* KPI Statistical Blocks Grid - Matches Image 2 layout */}
                  <div>
                    <h3 className="text-lg font-display font-bold text-app-text mb-4 uppercase tracking-wider">
                      {college.name} Placements
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {/* KPI 1 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Average Package</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiAverage}</span>
                      </div>
                      
                      {/* KPI 2 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <Award className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Total Offers</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiTotalOffers}</span>
                      </div>

                      {/* KPI 3 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <Building className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Companies Visiting</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiCompanies}</span>
                      </div>

                      {/* KPI 4 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Highest Package Offered</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiHighestDomestic}</span>
                      </div>

                      {/* KPI 5 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <Award className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Highest International Package</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiHighestIntl}</span>
                      </div>

                      {/* KPI 6 */}
                      <div className="bg-[#FF7A00]/5 border border-[#FF7A00]/20 p-4 rounded-xl flex flex-col justify-center items-center text-center gap-1">
                        <CheckCircle className="w-5 h-5 text-[#FF7A00]" />
                        <span className="text-[10px] text-app-muted font-black tracking-wider uppercase">Student Placed</span>
                        <span className="text-lg font-black text-[#FF7A00]">{kpiPlaced}</span>
                      </div>
                    </div>
                  </div>

                  {/* Graphical trend chart illustration */}
                  <div className="p-5 rounded-2xl bg-app-card border border-app-border text-center">
                    <h4 className="text-xs font-black uppercase text-app-text mb-4 text-left tracking-wider">Salary Distribution Trends (Previous Batches)</h4>
                    <div className="w-full h-40 flex items-end justify-between px-6 pt-4 border-b border-l border-app-border relative select-none">
                      <div className="absolute top-0 right-2 text-[9px] text-app-muted font-extrabold">LPA (Package in Lakhs)</div>
                      
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-8 bg-slate-700/60 rounded-t-lg transition-all hover:bg-[#FF7A00] duration-300" style={{ height: '35%' }} />
                        <span className="text-[9px] text-app-muted font-bold">2023</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-8 bg-slate-700/60 rounded-t-lg transition-all hover:bg-[#FF7A00] duration-300" style={{ height: '55%' }} />
                        <span className="text-[9px] text-app-muted font-bold">2024</span>
                      </div>
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="w-8 bg-gradient-to-t from-[#FF7A00] to-[#FF9F43] rounded-t-lg transition-all hover:opacity-90" style={{ height: '80%' }} />
                        <span className="text-[9px] text-app-text font-extrabold">2025 (Avg)</span>
                      </div>
                    </div>
                  </div>

                  {/* Recruiters Logo Grid - Matches Image 3 layout */}
                  <div>
                    <h3 className="text-base font-display font-bold text-app-text mb-4 uppercase tracking-wider">
                      {college.name} Recruiters
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-none">
                      {recruiters.map((recName, index) => (
                        <div 
                          key={index}
                          className="p-3.5 rounded-xl border border-app-border bg-app-card text-center flex flex-col justify-center items-center hover:border-[#FF7A00]/50 hover:bg-[#FF7A00]/5 transition-all text-xs font-black text-app-text"
                        >
                          <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center font-extrabold text-[10px] mb-1.5 uppercase">
                            {recName.substring(0, 2)}
                          </div>
                          <span>{recName}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEW */}
              {activeTab === 'review' && (
                <div className="flex flex-col gap-8" ref={reviewSectionRef}>
                  {/* Review narrative list */}
                  <div>
                    <h3 className="text-base font-display font-bold text-app-text mb-4 uppercase tracking-wider">Verified Student Testimonials</h3>
                    <div className="flex flex-col gap-4">
                      {safeReviews.length > 0 ? (
                        safeReviews.map((rev: any, idx: number) => (
                          <div key={idx} className="p-5 rounded-2xl bg-app-card border border-app-border flex flex-col gap-3">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="font-extrabold text-app-text text-sm">{rev.name}</span>
                              <span className="text-app-muted">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < rev.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-slate-700'
                                  }`}
                                />
                              ))}
                            </div>
                            <p className="text-xs sm:text-sm text-app-muted leading-relaxed italic">
                              "{rev.text}"
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-app-muted font-bold py-4">No reviews posted yet. Be the first to publish a review!</p>
                      )}
                    </div>
                  </div>

                  {/* Review form block */}
                  <form onSubmit={handleReviewSubmit} className="border-t border-app-border pt-6 flex flex-col gap-4">
                    <div>
                      <h3 className="text-base font-display font-bold text-app-text uppercase tracking-wider">Write A Review</h3>
                      <p className="text-xs text-app-muted mt-1 leading-relaxed">Share your verified student experiences to earn rewards and assist fellow aspirants.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text placeholder-slate-500 outline-none focus:border-[#FF7A00] transition-colors"
                          placeholder="e.g. Rahul Dev"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Rating</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                        >
                          <option value={5}>5 Stars - Excellent Academics</option>
                          <option value={4}>4 Stars - Good Campus</option>
                          <option value={3}>3 Stars - Average</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 text-xs font-semibold">
                      <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Share your review...</label>
                      <textarea
                        required
                        rows={4}
                        value={revText}
                        onChange={(e) => setRevText(e.target.value)}
                        className="px-3.5 py-3 rounded-xl bg-app-bg border border-app-border text-app-text placeholder-slate-500 outline-none focus:border-[#FF7A00] transition-colors resize-none"
                        placeholder="Write comments about courses, placements, or campus amenities..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-bold text-xs shadow-lg shadow-[#FF7A00]/25 transition-all border-none cursor-pointer self-start"
                    >
                      Add Comment / Review
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 6: GALLERY */}
              {activeTab === 'gallery' && (
                <div>
                  <h3 className="text-lg font-display font-bold text-app-text mb-4 uppercase tracking-wide">Campus Life Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {safeGallery.map((url, idx) => (
                      <div key={idx} className="h-32 rounded-xl overflow-hidden border border-app-border relative group shadow-md select-none">
                        <img
                          src={url}
                          alt="campus snapshots"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: SCHOLARSHIP */}
              {activeTab === 'scholarship' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-app-text mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <DollarSign className="w-5 h-5 text-[#FF7A00]" />
                    Scholarships & Financial Grants
                  </h3>
                  <div className="flex flex-col gap-4">
                    {safeScholarships.map((sch: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-app-card border border-app-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-medium"
                      >
                        <div className="flex flex-col">
                          <span className="font-extrabold text-app-text text-base">{sch.name}</span>
                          <span className="text-xs text-app-muted mt-1 leading-relaxed">Eligibility: {sch.criteria}</span>
                        </div>
                        <div className="flex flex-col sm:items-end shrink-0">
                          <span className="text-[10px] text-app-muted uppercase font-black tracking-wider">Waiver Amount</span>
                          <span className="font-black text-lg text-[#FF7A00] mt-0.5">{sch.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: HOSTEL */}
              {activeTab === 'hostel' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-app-text mb-2 flex items-center gap-2 uppercase tracking-wide">
                    <Building className="w-5 h-5 text-[#FF7A00]" />
                    Hostels & Residential Accommodations
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {safeHostels.map((hos: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-app-card border border-app-border flex flex-col gap-4 text-left font-medium"
                      >
                        <div>
                          <h4 className="font-extrabold text-app-text text-base leading-snug">{hos.type}</h4>
                          <span className="text-xs text-[#FF7A00] mt-1 inline-block bg-[#FF7A00]/10 border border-[#FF7A00]/25 px-2.5 py-0.5 rounded-md font-bold">
                            Configuration: {hos.sharing}
                          </span>
                        </div>
                        <div className="border-t border-app-border pt-3.5 flex items-center justify-between text-xs">
                          <span className="text-app-muted font-bold">Annual Charges</span>
                          <span className="font-black text-[#FF7A00] text-sm">{hos.fees}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Address block with buttons & Maps - Matches Image 3 layout */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-app-border bg-app-card/95 shadow-xl text-left">
              <h3 className="text-lg font-display font-black text-app-text mb-5 flex items-center gap-2 uppercase tracking-wider">
                <Map className="w-5 h-5 text-[#FF7A00]" />
                {college.name} Address
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Left col address details */}
                <div className="flex flex-col gap-4">
                  <p className="text-xs sm:text-sm text-app-muted leading-relaxed font-semibold">
                    {college.address || "S.No.124, Paud Road, Kothrud Pune - 411038 Maharashtra, India"}
                  </p>
                  
                  <a 
                    href={`tel:${college.phone || '+91 7773045555'}`}
                    className="text-xs sm:text-sm text-[#FF7A00] font-black hover:underline"
                  >
                    📞 {college.phone || '+91 7773045555'}
                  </a>

                  {/* Address Actions Buttons */}
                  <div className="flex flex-col gap-2.5 mt-2">
                    <button 
                      onClick={() => addToast('Contact address sent to your email.', 'success')}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-bold text-xs border-none cursor-pointer shadow-md tracking-wider uppercase transition-all"
                    >
                      Get Email Contact
                    </button>
                    <button 
                      onClick={() => addToast('SMS directions pushed to your phone.', 'success')}
                      className="py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-bold text-xs border-none cursor-pointer shadow-md tracking-wider uppercase transition-all"
                    >
                      Get SMS Contact
                    </button>
                    <a 
                      href="https://wa.me/917773045555" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-lg text-center flex items-center justify-center gap-1.5 border-none tracking-wider uppercase transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                      Chat With Us
                    </a>
                  </div>
                </div>

                {/* Right col Google Map Embed using dynamic search query */}
                <div className="h-60 rounded-xl overflow-hidden border border-app-border relative shadow-lg">
                  <iframe
                    title="College Location Map"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(college.name)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Live Application Form 2025 - Matches Image 4 layout */}
            <div className="glass p-6 md:p-8 rounded-2xl border border-app-border bg-app-card/95 shadow-xl text-left select-none">
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-base sm:text-lg font-display font-black text-app-text uppercase tracking-wider">Live Application</h3>
                <span className="px-2 py-0.5 rounded bg-[#FF7A00] text-white font-black text-[9px] uppercase tracking-wider">Form 2025</span>
              </div>

              <div className="flex flex-col divide-y divide-app-border/40">
                {liveApps.map((app, index) => (
                  <div key={index} className="py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-semibold">
                    <div className="flex items-center gap-3.5 text-left">
                      <div className="w-10 h-10 bg-app-bg rounded-lg flex items-center justify-center font-extrabold text-[10px] text-app-text select-none border border-app-border">
                        {app.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] text-[#FF7A00] font-black uppercase tracking-wider">Applications Open for All Courses 2024</span>
                        <span className="text-app-text font-extrabold text-sm max-w-md sm:truncate" title={app.name}>{app.name}</span>
                        <span className="text-[10px] text-app-muted mt-0.5 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#FF7A00]" />
                          {app.location}
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/common-application?collegeId=${app.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}&name=${encodeURIComponent(app.name)}&location=${encodeURIComponent(app.location)}`)}
                      className="py-2.5 px-5 rounded-lg bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-black text-[10px] tracking-wider uppercase border-none cursor-pointer transition-all self-start sm:self-auto shrink-0 shadow-md"
                    >
                      Apply Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: Sticky Widgets sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-20 text-left">
            
            {/* Quick Actions Card */}
            <div className="p-5 rounded-2xl glass border border-app-border bg-app-card/95 flex flex-col gap-3 shadow-xl">
              <button 
                onClick={() => navigate(`/common-application?collegeId=${college.id}`)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-black tracking-wider hover:opacity-95 transition-all cursor-pointer border-none shadow-md uppercase text-xs"
              >
                Apply Now
              </button>
              <button 
                onClick={handleDownloadBrochure}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-black tracking-wider hover:opacity-95 transition-all cursor-pointer border-none shadow-md uppercase text-xs"
              >
                Download Brochure
              </button>
            </div>

            {/* ₹500* Write a Review Banner Widget - Matches Image 2 layout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-app-card to-app-bg border border-app-border flex flex-col justify-between items-start gap-4 shadow-xl select-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF7A00]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#FF7A00]/20 transition-colors" />
              <div>
                <span className="text-2xl font-black text-[#FF7A00]">₹500*</span>
                <h4 className="font-extrabold text-app-text text-xs mt-1.5 uppercase tracking-wide">Write a Review of For This College</h4>
                <p className="text-[10px] text-app-muted leading-snug mt-1">Earn cashback rewards and guidelines points on approved submissions.</p>
              </div>
              <button 
                onClick={scrollToReview}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white font-black text-[10px] border-none cursor-pointer tracking-wider uppercase transition-all shadow-md active:scale-95"
              >
                Write a Review
              </button>
            </div>

            {/* Notifications panel widget - Matches Image 2 layout */}
            <div className="p-5 rounded-2xl glass border border-[#FF7A00]/20 bg-app-card/95 flex flex-col gap-4 shadow-xl select-none">
              <h3 className="font-display font-black text-app-text text-sm flex items-center gap-2 uppercase tracking-wider pb-2 border-b border-app-border/40">
                <Bell className="w-4 h-4 text-[#FF7A00]" />
                Notifications
              </h3>
              
              <div className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-extrabold text-app-text hover:text-[#FF7A00] cursor-pointer">Aruna-Nand EdTech Campus Rockstar</span>
                  <div className="flex items-center justify-between text-[9px] text-app-muted font-bold mt-0.5">
                    <span>🕒 01/03/2025</span>
                    <span className="text-[#FF7A00] hover:underline cursor-pointer">Read more</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-extrabold text-app-text hover:text-[#FF7A00] cursor-pointer">Graphic Era University Placement Statics</span>
                  <div className="flex items-center justify-between text-[9px] text-app-muted font-bold mt-0.5">
                    <span>🕒 01/02/2025</span>
                    <span className="text-[#FF7A00] hover:underline cursor-pointer">Read more</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-extrabold text-app-text hover:text-[#FF7A00] cursor-pointer">Pimpri Chinchwad University Admissions Open</span>
                  <div className="flex items-center justify-between text-[9px] text-app-muted font-bold mt-0.5">
                    <span>🕒 01/01/2025</span>
                    <span className="text-[#FF7A00] hover:underline cursor-pointer">Read more</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => addToast('No further notifications found.', 'info')}
                className="text-[10px] text-[#FF7A00] font-black uppercase tracking-wider border-none bg-transparent hover:underline cursor-pointer flex items-center justify-between mt-1 text-left w-full"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Top University widget - Matches Image 3 layout */}
            <div className="p-5 rounded-2xl glass border border-app-border bg-app-card/95 flex flex-col gap-4 shadow-xl select-none">
              <h3 className="font-display font-black text-app-text text-sm flex items-center gap-2 uppercase tracking-wider pb-2 border-b border-app-border/40">
                <Award className="w-4 h-4 text-[#FF7A00]" />
                Top University
              </h3>
              
              <div className="flex flex-col gap-4">
                {topUniversities.map((uni, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-app-bg flex items-center justify-center font-black text-[9px] text-app-text border border-app-border">
                        {uni.name.substring(0, 2)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-extrabold text-app-text leading-snug">{uni.name}</span>
                        <span className="text-[9px] text-app-muted">{uni.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 gap-1 text-[10px]">
                      <span className="text-[#FF7A00] font-black">{uni.rating}</span>
                      <button 
                        onClick={() => addToast(`Navigating to ${uni.name} details.`, 'info')}
                        className="text-[9px] text-[#FF7A00] hover:underline bg-transparent border-none cursor-pointer font-black"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => addToast('Showing all top universities.', 'info')}
                className="text-[10px] text-[#FF7A00] font-black uppercase tracking-wider border-none bg-transparent hover:underline cursor-pointer flex items-center justify-between mt-1 text-left w-full"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Top Courses in Location widget - Matches Image 3 layout */}
            <div className="p-5 rounded-2xl glass border border-app-border bg-app-card/95 flex flex-col gap-3.5 shadow-xl select-none">
              <h3 className="font-display font-black text-app-text text-sm flex items-center gap-2 uppercase tracking-wider pb-2 border-b border-app-border/40">
                <MapPin className="w-4 h-4 text-[#FF7A00]" />
                Top Courses in {college.city || 'Pune'}
              </h3>
              
              <div className="flex flex-col divide-y divide-app-border/30 max-h-80 overflow-y-auto scrollbar-none">
                {topCourses.map((crsName, idx) => (
                  <div 
                    key={idx} 
                    className="py-2.5 flex justify-between items-center text-xs font-semibold text-app-text hover:text-[#FF7A00] cursor-pointer transition-colors"
                    onClick={() => addToast(`Searching ${crsName} programs.`, 'info')}
                  >
                    <span>{crsName}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-app-muted" />
                  </div>
                ))}
              </div>
            </div>

            {/* Students Also Visited Colleges widget - Matches Image 4 layout */}
            <div className="p-5 rounded-2xl glass border border-app-border bg-app-card/95 flex flex-col gap-4 shadow-xl select-none">
              <h3 className="font-display font-black text-app-text text-sm flex items-center gap-2 uppercase tracking-wider pb-2 border-b border-app-border/40">
                <Layers className="w-4 h-4 text-[#FF7A00]" />
                Students Also Visited
              </h3>
              
              <div className="flex flex-col gap-3.5">
                {liveApps.map((uni, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs font-semibold">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-app-bg flex items-center justify-center font-black text-[9px] text-app-text border border-app-border">
                        {uni.name.substring(0, 2)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-extrabold text-app-text leading-snug truncate max-w-[150px]">{uni.name}</span>
                        <span className="text-[9px] text-app-muted">{uni.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-app-bg/85 backdrop-blur-md border-t border-app-border flex lg:hidden items-center justify-between gap-4 select-none">
        <div className="text-left font-medium">
          <p className="text-[9px] text-app-muted font-bold uppercase tracking-wider">Tuition Fees</p>
          <p className="text-base font-black text-[#FF7A00]">{college.fees.split(' ')[0]}</p>
        </div>
        <button
          onClick={() => {
            setActiveTab('admission');
            window.scrollTo({ top: 400, behavior: 'smooth' });
            addToast('Please complete the counseling request form.', 'info');
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#E06C00] text-white text-xs font-bold border-none transition-all cursor-pointer shadow-lg shadow-[#FF7A00]/20"
        >
          Request Callback
        </button>
      </div>
      {/* Lightbox Video Modal overlay */}
      {selectedVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden border border-app-border shadow-2xl">
            <button 
              onClick={() => setSelectedVideoUrl(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold text-sm hover:bg-black border border-white/20 transition-all cursor-pointer"
            >
              ✕
            </button>
            <iframe
              src={selectedVideoUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDetails;
