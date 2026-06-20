import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, LogOut, User, ChevronDown, CheckCircle, GitCompare, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCompareStore } from '../../store/useCompareStore';

const INDIAN_STATES_NAV = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Chandigarh','Puducherry','Ladakh','Jammu & Kashmir'
];

const NAV_CITIES: Record<string, string[]> = {
  'Delhi': ['New Delhi','Dwarka','Rohini','Noida','Ghaziabad'],
  'Maharashtra': ['Mumbai','Pune','Nagpur','Nashik','Thane'],
  'Karnataka': ['Bangalore','Mysore','Hubli','Mangalore'],
  'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Salem'],
  'Uttar Pradesh': ['Lucknow','Kanpur','Agra','Varanasi','Noida'],
  'Rajasthan': ['Jaipur','Jodhpur','Udaipur','Kota'],
  'Gujarat': ['Ahmedabad','Surat','Vadodara','Rajkot'],
  'West Bengal': ['Kolkata','Howrah','Durgapur','Siliguri'],
};

const QUICK_LINKS = [
  { label: 'Campus Rockstar',            path: '/events' },
  { label: 'Common Application Process', path: '/common-application' },
  { label: 'Scholarship Test',           path: '/scholarships' },
  { label: 'Education Loan',             path: '/resources' },
  { label: 'College Predictor',          path: '/college-predictor' },
  { label: 'Re-Admission',               path: '/colleges' },
];

const DISC_DATA: Record<string, {
  megaTitle: string; modalTitle: string; modalSubtitle: string;
  collegesRoute: string;
  cities: string[]; states: string[];
  featured: { name: string; location: string; logo: string }[];
}> = {
  'B.TECH': {
    megaTitle: 'TOP B.TECH COLLEGES IN INDIA',
    modalTitle: 'Check Top B.Tech Colleges in',
    modalSubtitle: 'Get admission in the best engineering colleges across India.',
    collegesRoute: '/colleges?course=Engineering',
    cities: [
      'Top B.Tech Colleges in Jaipur','Top B.Tech Colleges in Thane','Top B.Tech Colleges in Andhra Pradesh',
      'Top B.Tech Colleges in Lucknow','Top B.Tech Colleges in Hyderabad','Top B.Tech Colleges in Haryana',
      'Top B.Tech Colleges in Bhopal','Top B.Tech Colleges in Rajkot','Top B.Tech Colleges in Punjab',
      'Top B.Tech Colleges in Coimbatore','Top B.Tech Colleges in Surat','Top B.Tech Colleges in Tamil Nadu',
      'Top B.Tech Colleges in Bhubaneswar','Top B.Tech Colleges in Chennai','Top B.Tech Colleges in Chandigarh',
      'Top B.Tech Colleges in Nagpur','Top B.Tech Colleges in Guntur','Top B.Tech Colleges in Telangana',
      'Top B.Tech Colleges in Bangalore','Top B.Tech Colleges in Jabalpur','Top B.Tech Colleges in Uttar Pradesh',
      'Top B.Tech Colleges in Indore','Top B.Tech Colleges in Kolkata',
      'Top B.Tech Colleges in Pune','Top B.Tech Colleges in Delhi-NCR',
    ],
    states: [
      'Top B.Tech Colleges in Andhra Pradesh','Top B.Tech Colleges in Delhi','Top B.Tech Colleges in Haryana',
      'Top B.Tech Colleges in Karnataka','Top B.Tech Colleges in Maharashtra','Top B.Tech Colleges in Punjab',
      'Top B.Tech Colleges in Rajasthan','Top B.Tech Colleges in Tamil Nadu','Top B.Tech Colleges in Telangana','Top B.Tech Colleges in Uttar Pradesh',
    ],
    featured: [{ name: 'Bennett University, Greater Noida', location: 'Greater Noida, Uttar Pradesh', logo: 'BU' }],
  },
  'MBA': {
    megaTitle: 'TOP MBA COLLEGES IN INDIA',
    modalTitle: 'Check Top MBA /PGDM Colleges in',
    modalSubtitle: 'Avail MBA/PGDM Scholarship upto 5 Lacs.',
    collegesRoute: '/colleges?course=Management',
    cities: [
      'Top MBA Colleges in Indore','Top MBA Colleges in Hyderabad','Top MBA Colleges in Andhra Pradesh',
      'Top MBA Colleges in Delhi-NCR','Top MBA Colleges in Rajkot','Top MBA Colleges in Maharashtra',
      'Top MBA Colleges in Pune','Top MBA Colleges in Surat','Top MBA Colleges in Punjab',
      'Top MBA Colleges in Bangalore','Top MBA Colleges in Chennai','Top MBA Colleges in Telangana',
      'Top MBA Colleges in Jaipur','Top MBA Colleges in Chandigarh','Top MBA Colleges in Guntur',
      'Top MBA Colleges in Lucknow','Top MBA Colleges in Bhopal','Top MBA Colleges in Jabalpur',
      'Top MBA Colleges in Mumbai','Top MBA Colleges in Kolkata','Top MBA Colleges in Coimbatore',
      'Top MBA Colleges in Bhubaneswar',
    ],
    states: [
      'Top MBA Colleges in Andhra Pradesh','Top MBA Colleges in Delhi','Top MBA Colleges in Haryana',
      'Top MBA Colleges in Karnataka','Top MBA Colleges in Maharashtra','Top MBA Colleges in Punjab',
      'Top MBA Colleges in Rajasthan','Top MBA Colleges in Tamil Nadu','Top MBA Colleges in Telangana','Top MBA Colleges in Uttar Pradesh',
    ],
    featured: [{ name: 'Alliance University, Bangalore', location: 'Bangalore, Karnataka', logo: 'AU' }],
  },
  'MBBS': {
    megaTitle: 'TOP MBBS COLLEGES IN INDIA',
    modalTitle: 'Check Top MBBS Colleges in',
    modalSubtitle: 'Find the best MBBS colleges with top facilities & placements.',
    collegesRoute: '/colleges?course=Medicine',
    cities: [
      'Top MBBS Colleges in Indore','Top MBBS Colleges in Thane','Top MBBS Colleges in Andhra Pradesh',
      'Top MBBS Colleges in Delhi-NCR','Top MBBS Colleges in Hyderabad','Top MBBS Colleges in Maharashtra',
      'Top MBBS Colleges in Pune','Top MBBS Colleges in Rajkot','Top MBBS Colleges in Surat',
      'Top MBBS Colleges in Bangalore','Top MBBS Colleges in Chennai','Top MBBS Colleges in Punjab',
      'Top MBBS Colleges in Jaipur','Top MBBS Colleges in Chandigarh','Top MBBS Colleges in Guntur',
      'Top MBBS Colleges in Lucknow','Top MBBS Colleges in Bhopal','Top MBBS Colleges in Jabalpur',
      'Top MBBS Colleges in Coimbatore','Top MBBS Colleges in Bhubaneswar','Top MBBS Colleges in Kolkata',
    ],
    states: [
      'Top MBBS Colleges in Andhra Pradesh','Top MBBS Colleges in Delhi','Top MBBS Colleges in Haryana',
      'Top MBBS Colleges in Karnataka','Top MBBS Colleges in Maharashtra','Top MBBS Colleges in Punjab',
      'Top MBBS Colleges in Rajasthan','Top MBBS Colleges in Tamil Nadu','Top MBBS Colleges in Telangana','Top MBBS Colleges in Uttar Pradesh',
    ],
    featured: [{ name: 'MIT World Peace University, Pune', location: 'Pune, Maharashtra', logo: 'MIT' }],
  },
  'DESIGN': {
    megaTitle: 'TOP DESIGN COLLEGES IN INDIA',
    modalTitle: 'Check Top Design Colleges in',
    modalSubtitle: 'Get admission in top design & creative arts colleges.',
    collegesRoute: '/colleges?course=Design',
    cities: [
      'Top Design Colleges in Indore','Top Design Colleges in Thane','Top Design Colleges in Andhra Pradesh',
      'Top Design Colleges in Delhi-NCR','Top Design Colleges in Hyderabad','Top Design Colleges in Maharashtra',
      'Top Design Colleges in Pune','Top Design Colleges in Rajkot','Top Design Colleges in Surat',
      'Top Design Colleges in Bangalore','Top Design Colleges in Chennai','Top Design Colleges in Punjab',
      'Top Design Colleges in Jaipur','Top Design Colleges in Chandigarh','Top Design Colleges in Guntur',
      'Top Design Colleges in Lucknow','Top Design Colleges in Bhopal','Top Design Colleges in Jabalpur',
      'Top Design Colleges in Coimbatore','Top Design Colleges in Bhubaneswar','Top Design Colleges in Kolkata',
      'Top Design Colleges in Mumbai',
    ],
    states: [
      'Top Design Colleges in Andhra Pradesh','Top Design Colleges in Delhi','Top Design Colleges in Maharashtra',
      'Top Design Colleges in Karnataka','Top Design Colleges in Tamil Nadu','Top Design Colleges in Punjab',
      'Top Design Colleges in Rajasthan','Top Design Colleges in Telangana','Top Design Colleges in Uttar Pradesh',
    ],
    featured: [
      { name: 'Shadan Women College of Engineering & Technology, Hyderabad', location: 'Suryapet, Telangana', logo: 'SW' },
      { name: 'Swamy Vivekananda Medical College, Namakkal', location: 'Namakkal, Tamil Nadu', logo: 'SV' },
      { name: 'Mepco Schlenk Engineering College, Sivakasi', location: 'Sethur, Tamil Nadu', logo: 'MS' },
    ],
  },
  'LAW': {
    megaTitle: 'TOP LAW COLLEGES IN INDIA',
    modalTitle: 'Check Top Law Colleges in',
    modalSubtitle: 'Find top law colleges with best placements across India.',
    collegesRoute: '/colleges?course=Law',
    cities: [
      'Top Law Colleges in Indore','Top Law Colleges in Thane','Top Law Colleges in Andhra Pradesh',
      'Top Law Colleges in Delhi-NCR','Top Law Colleges in Hyderabad','Top Law Colleges in Maharashtra',
      'Top Law Colleges in Pune','Top Law Colleges in Rajkot','Top Law Colleges in Surat',
      'Top Law Colleges in Bangalore','Top Law Colleges in Chennai','Top Law Colleges in Punjab',
      'Top Law Colleges in Jaipur','Top Law Colleges in Chandigarh','Top Law Colleges in Kolkata',
    ],
    states: [
      'Top Law Colleges in Andhra Pradesh','Top Law Colleges in Delhi','Top Law Colleges in Haryana',
      'Top Law Colleges in Karnataka','Top Law Colleges in Maharashtra','Top Law Colleges in Punjab',
      'Top Law Colleges in Rajasthan','Top Law Colleges in Tamil Nadu','Top Law Colleges in Uttar Pradesh',
    ],
    featured: [{ name: 'National Law University, Delhi', location: 'New Delhi, Delhi', logo: 'NLU' }],
  },
};

export const GlassNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [interestOpen, setInterestOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Lead capture modal for B.TECH click
  const [leadModal, setLeadModal] = useState<{ label: string; course: string } | null>(null);
  const [leadFirst, setLeadFirst] = useState('');
  const [leadLast, setLeadLast] = useState('');
  const [leadMobile, setLeadMobile] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadState, setLeadState] = useState('');
  const [leadCity, setLeadCity] = useState('');
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadDone, setLeadDone] = useState(false);

  const resetLead = () => {
    setLeadFirst(''); setLeadLast(''); setLeadMobile('');
    setLeadEmail(''); setLeadState(''); setLeadCity('');
    setLeadSubmitting(false); setLeadDone(false);
  };

  const location = useLocation();
  const navigate = useNavigate();
  const { setSearchModalOpen, addToast } = useGlobalStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { compareIds } = useCompareStore();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // Close lead modal and navigate to the discipline's colleges page
  const closeLead = (collegesRoute?: string) => {
    setLeadModal(null);
    resetLead();
    if (collegesRoute) navigate(collegesRoute);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setInterestOpen(false);
    // Recalculate ribbon scroll after navigation
    setTimeout(checkScroll, 100);
  }, [location.pathname]);

  const topRibbonLinks = [
    { name: 'Colleges', path: '/colleges' },
    { name: 'Exams', path: '/exams', badge: 'NEW' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'News', path: '/news' },
    { name: 'Apply For Scholarship', path: '/scholarships' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Common Application Process', path: '/common-application' },
    { name: 'Online Courses', path: '/online-courses' },
    { name: 'College Predictor', path: '/college-predictor' }
  ];

  const disciplines = [
    { 
      name: 'B.TECH', 
      path: '/colleges?course=Engineering',
      sub: [
        { name: 'IIT Bombay', path: '/colleges/iit-bombay' },
        { name: 'BITS Pilani', path: '/colleges/bits-pilani' },
        { name: 'Browse All B.Tech', path: '/colleges?course=Engineering' }
      ]
    },
    { 
      name: 'MBA', 
      path: '/colleges?course=Management',
      sub: [
        { name: 'IIM Bangalore', path: '/colleges/iim-bangalore' },
        { name: 'Browse All MBA', path: '/colleges?course=Management' }
      ]
    },
    { 
      name: 'MBBS', 
      path: '/colleges?course=Medicine',
      sub: [
        { name: 'AIIMS New Delhi', path: '/colleges/aiims-delhi' },
        { name: 'Browse All MBBS', path: '/colleges?course=Medicine' }
      ]
    },
    { 
      name: 'DESIGN', 
      path: '/colleges?course=Design',
      sub: [
        { name: 'IIT Bombay Design', path: '/colleges/iit-bombay' },
        { name: 'Browse All Design', path: '/colleges?course=Design' }
      ]
    },
    { 
      name: 'LAW', 
      path: '/colleges?course=Law',
      sub: [
        { name: 'NLSIU Bangalore', path: '/colleges/nlsiu-bangalore' },
        { name: 'Browse All Law', path: '/colleges?course=Law' }
      ]
    },
  ];

  const interestsList = [
    { name: 'Engineering & Technology', category: 'Engineering' },
    { name: 'Management & Business', category: 'Management' },
    { name: 'Medical & Healthcare', category: 'Medicine' },
    { name: 'Legal Studies & Law', category: 'Law' },
    { name: 'Commerce & Finance', category: 'Commerce' },
    { name: 'Arts & Design', category: 'Design' }
  ];

  return (
    <>
      {/* 1. TOP NAV RIBBON (Hidden on mobile for viewport space, styled with a horizontal scroll carousel and black background) */}
      <div className="hidden lg:flex fixed top-0 left-0 right-0 h-9 bg-black text-slate-300 z-55 items-center justify-between px-6 lg:px-12 border-b border-slate-900 select-none">
        
        {/* Left: Ribbon Links (with custom scroll buttons) */}
        <div className="relative flex-1 flex items-center max-w-[calc(100%-250px)] pr-8 pl-1">
          {showLeftArrow && (
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 text-[10px] font-black tracking-wider w-full scroll-smooth"
          >
            {topRibbonLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="hover:text-[#FF7A00] dark:hover:text-[#FF7A00] flex items-center gap-1.5 transition-colors uppercase text-slate-300 dark:text-slate-350 shrink-0 font-extrabold"
              >
                {link.name}
                {link.badge && (
                  <span className="bg-[#FF7A00] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded animate-pulse shadow-sm">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {showRightArrow && (
            <button
              onClick={handleScrollRight}
              className="absolute right-6 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-800 text-white flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: Actions (Compare, Auth) */}
        <div className="flex items-center gap-4 text-[10px] font-black tracking-wider shrink-0 text-slate-300">
          
          {/* Comparison floating pill */}
          {compareIds.length > 0 && (
            <Link
              to="/compare"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30 transition-all text-[9px]"
            >
              Compare ({compareIds.length})
            </Link>
          )}

        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR (Flat & Full-Width, sits flatly below ribbon, exactly like screenshot) */}
      <header 
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pointer-events-auto bg-white dark:bg-app-bg border-b-[5px] border-[#1B254B] dark:border-primary shadow-sm flex items-center ${
          isScrolled 
            ? 'top-0 h-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' 
            : 'top-0 lg:top-9 h-16'
        }`}
      >
        <div className="w-full h-full flex items-center justify-between lg:justify-center gap-6 lg:gap-8 xl:gap-14 px-6 lg:px-12">
          
          {/* Left: Brand Logo styled like Aruna-Nand EdTech */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-full bg-[#1B254B] dark:bg-white flex items-center justify-center border border-slate-700/10 shadow-sm select-none shrink-0">
              <span className="font-display font-black text-xs text-white dark:text-[#1B254B] tracking-tight">
                AN
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tight font-display text-[#1B254B] dark:text-white leading-none uppercase">
                ARUNA-NAND EDTECH
              </span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-1 leading-none">
                Empowering Students
              </span>
            </div>
          </Link>

          {/* Right Group: Orange interest button, B.TECH, MBA, MBBS, DESIGN, LAW, and Search Icon */}
          <div className="flex items-center gap-4 lg:gap-8 xl:gap-14">
            

            {/* Choose Your Interest Button (Orange pill style) */}
            <div className="relative shrink-0">
              <button
                onClick={() => setInterestOpen(!interestOpen)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer animate-none"
              >
                Choose Your Interest
                <span className={`text-[9px] ml-1 transition-transform duration-200 inline-block ${interestOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* ── COURSE SELECTION MODAL ── */}
              {interestOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                    onClick={() => setInterestOpen(false)}
                  />

                  {/* Modal card — centered on screen */}
                  <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-app-border">

                    {/* Orange header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-[#FF7A00]">
                      <h3 className="text-sm font-black text-white tracking-wide uppercase">
                        Select Goal Courses &amp; City
                      </h3>
                      <button
                        onClick={() => setInterestOpen(false)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer border-none transition-all"
                      >
                        <X className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col gap-4">
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        Find Out Best{' '}
                        <span className="text-[#FF7A00] font-black underline underline-offset-2">
                          Colleges/ Universities
                        </span>
                      </p>

                      {/* Course pill grid */}
                      <div className="grid grid-cols-4 gap-2.5">
                        {[
                          { label: 'MBA/PGDM',  cat: 'Management' },
                          { label: 'BBA',        cat: 'Management' },
                          { label: 'M.Sc',       cat: 'Science' },
                          { label: 'B.Tech',     cat: 'Engineering' },
                          { label: 'BA',         cat: 'Arts' },
                          { label: 'MA',         cat: 'Arts' },
                          { label: 'B.Com',      cat: 'Commerce' },
                          { label: 'B.Sc',       cat: 'Science' },
                          { label: 'BCA',        cat: 'Computer' },
                          { label: 'MCA',        cat: 'Computer' },
                          { label: 'FPM',        cat: 'Management' },
                          { label: 'EFPM',       cat: 'Management' },
                          { label: 'MDP',        cat: 'Management' },
                          { label: 'BAMS',       cat: 'Medicine' },
                          { label: 'MBBS',       cat: 'Medicine' },
                          { label: 'BHMS',       cat: 'Medicine' },
                          { label: 'BDS',        cat: 'Medicine' },
                        ].map(({ label, cat }) => (
                          <Link
                            key={label}
                            to={`/colleges?course=${cat}`}
                            onClick={() => setInterestOpen(false)}
                            className="flex items-center justify-center px-3 py-2.5 rounded-lg border-2 border-slate-200 dark:border-app-border text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide hover:border-[#FF7A00] hover:text-[#FF7A00] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all cursor-pointer text-center"
                          >
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Disciplines list (Horizontal row, hidden on mobile/tablet) */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
              {disciplines.map((disc, idx) => {
                const isOpen = activeDropdown === idx;
                const megaData = DISC_DATA[disc.name];
                return (
                  <div
                    key={disc.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(idx)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => {
                        setActiveDropdown(null);
                        if (megaData) setLeadModal({ label: disc.name, course: disc.name });
                      }}
                      className={`py-1.5 text-xs font-black tracking-wide transition-all flex items-center gap-0.5 cursor-pointer uppercase ${
                        isOpen
                          ? 'text-[#FF7A00]'
                          : 'text-slate-800 dark:text-slate-200 hover:text-[#FF7A00]'
                      }`}
                    >
                      {disc.name}
                      <span className={`text-[9px] ml-1 transition-transform duration-200 inline-block ${isOpen ? 'rotate-180' : 'text-slate-500 dark:text-slate-400'}`}>▼</span>
                    </button>

                    {/* GENERIC MEGA DROPDOWN on hover — all disciplines */}
                    <AnimatePresence>
                      {megaData && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className="fixed left-0 right-0 z-[55] bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-app-border shadow-2xl text-left"
                          style={{ top: isScrolled ? '64px' : '100px' }}
                        >
                          <div className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-12 gap-6">

                            {/* Left quick links */}
                            <div className="col-span-2 flex flex-col gap-1 border-r border-slate-100 dark:border-app-border pr-4">
                              {QUICK_LINKS.map(item => (
                                <Link key={item.label} to={item.path} onClick={() => setActiveDropdown(null)}
                                  className="py-2 px-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-[#FF7A00] hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-lg transition-all">
                                  {item.label}
                                </Link>
                              ))}
                            </div>

                            {/* Middle — top cities */}
                            <div className="col-span-7 flex flex-col gap-3">
                              <div className="border-b border-slate-100 dark:border-app-border pb-2">
                                <Link to={megaData.collegesRoute} onClick={() => setActiveDropdown(null)}
                                  className="text-[11px] font-black text-[#FF7A00] uppercase tracking-wider hover:underline">
                                  {megaData.megaTitle} ›
                                </Link>
                              </div>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TOP CITIES</p>
                              <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                                {megaData.cities.map(city => (
                                  <Link key={city} to={megaData.collegesRoute} onClick={() => setActiveDropdown(null)}
                                    className="py-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#FF7A00] transition-colors truncate">
                                    {city}
                                  </Link>
                                ))}
                              </div>

                              {/* Featured colleges strip */}
                              <div className="mt-2 pt-2 border-t border-slate-100 dark:border-app-border">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">FEATURED {disc.name} COLLEGES IN INDIA</p>
                                <div className="flex flex-wrap gap-3">
                                  {megaData.featured.map(col => (
                                    <Link key={col.name} to={megaData.collegesRoute} onClick={() => setActiveDropdown(null)}
                                      className="flex items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-500/10 p-1.5 rounded-lg transition-all">
                                      <div className="w-7 h-7 rounded-full bg-[#1B254B] flex items-center justify-center text-white text-[7px] font-black shrink-0">{col.logo}</div>
                                      <div>
                                        <p className="text-[10px] font-bold text-slate-800 dark:text-white max-w-[140px] truncate">{col.name}</p>
                                        <p className="text-[9px] text-slate-400">{col.location}</p>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Right — top states */}
                            <div className="col-span-3 flex flex-col gap-2 border-l border-slate-100 dark:border-app-border pl-4">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">TOP STATES</p>
                              <div className="flex flex-col gap-0.5">
                                {megaData.states.map(state => (
                                  <Link key={state} to={megaData.collegesRoute} onClick={() => setActiveDropdown(null)}
                                    className="py-1 text-[10px] font-medium text-slate-600 dark:text-slate-400 hover:text-[#FF7A00] transition-colors">
                                    {state}
                                  </Link>
                                ))}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Fallback: small dropdown for any discipline without megaData */}
                    <AnimatePresence>
                      {!megaData && isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-48 rounded-xl glass border border-app-border bg-app-bg shadow-xl p-2 z-20 flex flex-col gap-1 text-left"
                        >
                          {disc.sub.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={() => setActiveDropdown(null)}
                              className="px-3 py-2 text-xs rounded-lg text-app-muted hover:text-app-text hover:bg-app-card transition-all text-left font-semibold"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Search Everywhere Magnifying Glass Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1 rounded-full text-slate-800 dark:text-slate-200 hover:text-[#FF7A00] transition-colors cursor-pointer shrink-0"
              title="Search Everywhere"
            >
              <Search className="w-5.5 h-5.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Toggle Button (Visible on mobile/tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-app-card rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[64px] z-40 bg-app-bg/95 backdrop-blur-xl flex flex-col px-6 py-6 border-t border-app-border pointer-events-auto lg:hidden">
            {/* Choose Your Interest (Mobile) */}
            <div className="mb-4">
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider block mb-2 px-1">Interests</span>
              <div className="grid grid-cols-2 gap-2">
                {interestsList.map((interest) => (
                  <Link
                    key={interest.name}
                    to={`/colleges?course=${interest.category}`}
                    className="p-2.5 rounded-xl text-xs font-semibold text-app-text bg-app-card border border-app-border text-center hover:bg-white/10"
                  >
                    {interest.category}
                  </Link>
                ))}
              </div>
            </div>

            {/* General Navigation Links */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider block px-1">Disciplines</span>
              {disciplines.map((disc) => (
                <Link
                  key={disc.name}
                  to={disc.path}
                  className="py-2.5 px-4 rounded-xl text-sm font-bold text-app-muted hover:text-app-text hover:bg-app-card border border-transparent hover:border-app-border"
                >
                  {disc.name} Course Track
                </Link>
              ))}
            </div>


          </div>
        )}
      </header>

      {/* ── DISCIPLINE LEAD CAPTURE MODAL ── */}
      {leadModal && (() => {
        const modalMegaData = DISC_DATA[leadModal.label];
        return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          {/* Backdrop — click navigates to discipline colleges */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => closeLead(modalMegaData?.collegesRoute)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 border border-slate-200 dark:border-app-border">

            {/* Left panel — hashtags + rocket */}
            <div className="relative md:w-5/12 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-[#1a1040] dark:to-[#0F172A] p-7 flex flex-col justify-between overflow-hidden">
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#FF7A00]/20 blur-2xl" />
              <div className="flex flex-col gap-2 relative z-10 mt-2">
                {['#Hasslefree','#Affordability','#Flexibility','#Easy Emi Options','#Global Opportunities'].map((tag, i) => (
                  <span key={i} className="text-sm font-bold text-slate-600 dark:text-slate-300 select-none" style={{ paddingLeft: `${(i % 3) * 14}px` }}>{tag}</span>
                ))}
              </div>
              {/* Rocket SVG */}
              <div className="relative z-10 flex justify-center mt-4">
                <svg viewBox="0 0 160 180" className="w-32 h-32 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="80" cy="75" rx="20" ry="48" fill="#FF7A00"/>
                  <ellipse cx="80" cy="75" rx="14" ry="42" fill="#FFA040"/>
                  <ellipse cx="80" cy="32" rx="12" ry="14" fill="#FF5500"/>
                  <circle cx="80" cy="68" r="8" fill="white" opacity="0.9"/>
                  <circle cx="80" cy="68" r="5" fill="#1B254B"/>
                  <path d="M60 105 L52 128 L72 115 Z" fill="#FF5500"/>
                  <path d="M100 105 L108 128 L88 115 Z" fill="#FF5500"/>
                  <ellipse cx="80" cy="135" rx="9" ry="17" fill="#FFD700" opacity="0.9"/>
                  <ellipse cx="80" cy="142" rx="6" ry="11" fill="#FF7A00" opacity="0.8"/>
                  <circle cx="28" cy="44" r="2" fill="#FFD700"/>
                  <circle cx="132" cy="36" r="2" fill="#FFD700"/>
                  <circle cx="22" cy="95" r="1.5" fill="#FFD700"/>
                  <circle cx="138" cy="88" r="1.5" fill="#FFD700"/>
                </svg>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 p-6 md:p-8 flex flex-col gap-4 relative">
              {/* X button — closes modal AND navigates to top colleges for this discipline */}
              <button
                onClick={() => closeLead(modalMegaData?.collegesRoute)}
                title={`View Top ${leadModal.label} Colleges`}
                className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer border-none transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {!leadDone ? (
                <>
                  <div>
                    <h2 className="text-base font-black text-[#FF7A00] tracking-tight leading-snug">
                      {modalMegaData?.modalTitle || `Check Top ${leadModal.label} Colleges in`}
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-0.5">{modalMegaData?.modalSubtitle || 'Fill in your details to get personalised college recommendations'}</p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!leadFirst || !leadMobile || !leadEmail || !leadState || !leadCity) {
                        addToast('Please fill all required fields.', 'warning');
                        return;
                      }
                      setLeadSubmitting(true);
                      setTimeout(() => { setLeadSubmitting(false); setLeadDone(true); }, 1400);
                    }}
                    className="flex flex-col gap-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <input required type="text" placeholder="Enter Your First Name" value={leadFirst} onChange={e => setLeadFirst(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#FF7A00] transition-colors" />
                      <input type="text" placeholder="Enter Your Last Name" value={leadLast} onChange={e => setLeadLast(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#FF7A00] transition-colors" />
                    </div>
                    <input required type="tel" placeholder="Enter Your Mobile Number" value={leadMobile} onChange={e => setLeadMobile(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#FF7A00] transition-colors" />
                    <input required type="email" placeholder="Enter Your E-mail" value={leadEmail} onChange={e => setLeadEmail(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-[#FF7A00] transition-colors" />
                    <div className="relative">
                      <select required value={leadState} onChange={e => { setLeadState(e.target.value); setLeadCity(''); }}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer">
                        <option value="">Select State</option>
                        {INDIAN_STATES_NAV.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative">
                      <select required value={leadCity} onChange={e => setLeadCity(e.target.value)}
                        className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-sm text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer">
                        <option value="">Select City</option>
                        {(NAV_CITIES[leadState] || []).map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <button type="submit" disabled={leadSubmitting}
                      className="w-full py-3 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black text-sm uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer border-none disabled:opacity-60">
                      {leadSubmitting
                        ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        : 'Register Now'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">You're Registered!</h3>
                  <p className="text-xs text-slate-500 max-w-xs">Our counselor will contact you within 24 hours with the best {leadModal.label} colleges matching your profile.</p>
                  <Link
                    to={modalMegaData?.collegesRoute || '/colleges'}
                    onClick={() => { setLeadModal(null); resetLead(); }}
                    className="mt-2 px-6 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black text-xs uppercase shadow-md transition-all"
                  >
                    Explore {leadModal.label} Colleges
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        );
      })()}
    </>
  );
};

export default GlassNavbar;
