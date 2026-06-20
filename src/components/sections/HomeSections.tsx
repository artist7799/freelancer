import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Building,
  DollarSign,
  Palette,
  TrendingUp,
  Brain,
  ChevronDown,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  HelpCircle,
  Star,
  Search,
  FileText,
  Compass,
  Plane,
  Laptop,
  ChevronRight,
  ChevronLeft,
  Settings,
  Users,
  Coins,
  Gavel,
  Sprout,
  Atom,
  Globe,
  PawPrint,
  PenTool,
  MapPin,
  Trophy,
  Send,
  ExternalLink,
  Calendar,
  X
} from 'lucide-react';

import { ScrollReveal } from '../animations/ScrollReveal';
import { Counter } from '../animations/Counter';

import { CollegeCard } from '../cards/CollegeCard';
import { ExamCard } from '../cards/ExamCard';
import { ScholarshipCard } from '../cards/ScholarshipCard';
import { RoadmapCard } from '../cards/RoadmapCard';
import { BlogCard } from '../cards/BlogCard';

import { colleges } from '../../data/colleges';
import { exams } from '../../data/exams';
import { scholarships } from '../../data/scholarships';
import { careers } from '../../data/careers';
import { useGlobalStore } from '../../store/useGlobalStore';
import { blogs } from '../../data/blogs';

// ==========================================
// SECTION 1: HERO
// ==========================================
// SVGs FOR CRISP UNIVERSITY VECTOR LOGOS IN HERO SHOWCASE
const LPULogoHero = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="5" y="5" width="90" height="90" rx="8" fill="white" />
    <circle cx="50" cy="38" r="22" fill="#F37021" />
    <circle cx="50" cy="38" r="17" fill="white" />
    <path d="M50 25 C45 35 45 42 50 50 C55 42 55 35 50 25 Z" fill="#F37021" />
    <path d="M50 25 C40 30 35 38 42 46 C45 42 48 35 50 25 Z" fill="#231F20" />
    <path d="M50 25 C60 30 65 38 58 46 C55 42 52 35 50 25 Z" fill="#231F20" />
    <text x="50" y="72" fill="#231F20" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">LOVELY</text>
    <text x="50" y="80" fill="#231F20" fontSize="6.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">UNIVERSITY</text>
  </svg>
);

const BITSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <rect x="10" y="10" width="80" height="80" rx="8" fill="#0A369D" />
    <circle cx="50" cy="42" r="18" fill="white" />
    <path d="M50 30 C46 36 46 44 50 52 C54 44 54 36 50 30 Z" fill="#E74C3C" />
    <text x="50" y="75" fill="white" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">BITS PILANI</text>
  </svg>
);

const NMIMSLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="42" r="34" fill="#A8201A" />
    <text x="50" y="50" fill="white" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="serif">NMIMS</text>
    <text x="50" y="66" fill="#FFD700" fontSize="7.5" fontWeight="700" textAnchor="middle" fontFamily="sans-serif">MUMBAI</text>
  </svg>
);

const SIULogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="45" r="34" fill="#E31B23" />
    <circle cx="50" cy="45" r="26" fill="white" />
    <circle cx="50" cy="45" r="20" fill="#E31B23" />
    <text x="50" y="51" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">SIU</text>
    <text x="50" y="86" fill="#E31B23" fontSize="6.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SYMBIOSIS</text>
  </svg>
);

const MITWPLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#1B254B" />
    <circle cx="50" cy="50" r="34" fill="white" />
    <text x="50" y="58" fill="#1B254B" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MIT</text>
  </svg>
);

const IITBLogoHero = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0F2C59" />
    <circle cx="50" cy="50" r="24" fill="none" stroke="white" strokeWidth="4" />
    <path d="M50 35 L50 65 M35 50 L65 50" stroke="white" strokeWidth="4" />
    <text x="50" y="80" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIT BOMBAY</text>
  </svg>
);

const ShardaLogoHero = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="42" fill="#0072CE" />
    <circle cx="50" cy="50" r="32" fill="white" />
    <text x="50" y="56" fill="#0072CE" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">SHARDA</text>
  </svg>
);

const renderHeroLogo = (logoType: string) => {
  switch (logoType) {
    case 'mit-wpu':
      return <MITWPLogo />;
    case 'iit-bombay':
      return <IITBLogoHero />;
    case 'sharda-university':
      return <ShardaLogoHero />;
    case 'bits-pilani':
      return <BITSLogo />;
    case 'nmims-mumbai':
      return <NMIMSLogo />;
    case 'lpu-punjab':
      return <LPULogoHero />;
    case 'symbiosis-pune':
      return <SIULogo />;
    default:
      return null;
  }
};

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    title: 'Admissions Open 2026 Batch',
    uniInitials: 'MIT',
    uniName: 'MIT World Peace University',
    logoType: 'mit-wpu',
    stats: [
      { key: '16.3 LPA', desc: 'Average CTC for top 100 placements' },
      { key: '51.0 LPA', desc: 'Highest package offered this year' },
      { key: '1600+', desc: 'Offers generated during campus drive' },
      { key: '200+', desc: 'Global academic partners' }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    title: 'Admission Conclave Live',
    uniInitials: 'IITB',
    uniName: 'Indian Institute of Technology Bombay',
    logoType: 'iit-bombay',
    stats: [
      { key: '21.8 LPA', desc: 'Average CTC for engineering graduates' },
      { key: '1.68 Cr', desc: 'Highest international package offered' },
      { key: '350+', desc: 'Top global tech recruiters on campus' },
      { key: 'Top 100', desc: 'Ranked globally for engineering education' }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    title: 'Premium Campus Placements',
    uniInitials: 'SU',
    uniName: 'Sharda University Noida',
    logoType: 'sharda-university',
    stats: [
      { key: '12.5 LPA', desc: 'Highest package offered in engineering/management' },
      { key: '150+', desc: 'MNCs and Fortune 500 recruiters visiting' },
      { key: '80%+', desc: 'Scholarships offered on merit basis' },
      { key: '4500+', desc: 'Placed students across diverse streams' }
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=1200&q=80',
    title: 'Admissions & Scholarships Open',
    uniInitials: 'BITS',
    uniName: 'Birla Institute of Technology & Science Pilani',
    logoType: 'bits-pilani',
    stats: [
      { key: '30.37 LPA', desc: 'Average CTC for Computer Science' },
      { key: '60.75 LPA', desc: 'Highest domestic salary package offered' },
      { key: '100%', desc: 'Placement rate for eligible candidates' },
      { key: '400+', desc: 'Pre-placement offers (PPOs) received' }
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1527891751199-7225231a68dd?auto=format&fit=crop&w=1200&q=80',
    title: 'MBA & Law Enrollment Live',
    uniInitials: 'NMIMS',
    uniName: 'NMIMS Deemed-to-be-University Mumbai',
    logoType: 'nmims-mumbai',
    stats: [
      { key: '23.07 LPA', desc: 'Average CTC for Core MBA programs' },
      { key: '67.80 LPA', desc: 'Highest domestic package in placements' },
      { key: '160+', desc: 'Premium recruiters and consulting giants' },
      { key: '35%+', desc: 'Students receiving pre-placement offers' }
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1607237138185-eedd996c5c0c?auto=format&fit=crop&w=1200&q=80',
    title: 'Admission Open Batch 2026 Batch',
    uniInitials: 'LPU',
    uniName: 'Lovely Professional University Punjab',
    logoType: 'lpu-punjab',
    stats: [
      { key: '400+', desc: 'Recruiters of IITs/IIMs/NITs also hire from LPU' },
      { key: '₹ 10.23 Lac', desc: 'Average salary of top 25% placed students' },
      { key: '6000+', desc: 'Offers from Fortune 500 companies' },
      { key: '2225+', desc: 'Recruiters hired LPU students' }
    ]
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1519789144558-d3b67f371721?auto=format&fit=crop&w=1200&q=80',
    title: 'Symbiosis SET/SNAP Registrations',
    uniInitials: 'SIU',
    uniName: 'Symbiosis International University Pune',
    logoType: 'symbiosis-pune',
    stats: [
      { key: '20.5 LPA', desc: 'Average CTC for MBA batch' },
      { key: '39.0 LPA', desc: 'Highest salary package offered' },
      { key: '100+', desc: 'Corporate partners for internships' },
      { key: '250+', desc: 'Offers made by marquee recruiters' }
    ]
  }
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

export const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right-to-left (next), -1 for left-to-right (prev)
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, isHovered]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handleDotClick = (idx: number) => {
    if (idx === currentSlide) return;
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/colleges');
    }
  };

  return (
    <section className="relative min-h-[580px] w-full bg-app-bg overflow-hidden flex flex-col lg:flex-row pt-24 lg:pt-28">
      {/* LEFT PANEL: Branding & Localised Search (Deep blue theme) */}
      <div className="w-full lg:w-5/12 bg-gradient-to-br from-[#121A3E] via-[#0B122D] to-[#050A1A] p-8 md:p-12 lg:p-16 flex flex-col justify-center items-start text-left gap-6 relative z-20">
        
        {/* Slant clipping backdrop skew line on desktop */}
        <div className="hidden lg:block absolute inset-y-0 right-[-40px] w-20 bg-[#0B122D] transform skew-x-[-8deg] z-10 pointer-events-none border-r-4 border-[#FF7A00]" />

        <div className="relative z-20 flex flex-col gap-5 w-full">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 text-[10px] font-bold text-white self-start animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A00]" />
            <span>Admission Counselling 2026</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-black leading-[1.1] text-white uppercase tracking-tight max-w-md"
          >
            Explore <span className="text-[#FF7A00]">Colleges</span> <br />That Fit You Best!
          </motion.h1>

          {/* Search Box */}
          <motion.form
            onSubmit={handleSearchSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full max-w-sm flex items-center bg-white border border-slate-200 rounded-full shadow-md overflow-hidden p-1.5 gap-1"
          >
            <div className="flex-1 flex items-center pl-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search Colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-450 px-3 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#FF7A00] hover:bg-[#E06C00] cursor-pointer border-none shadow-md transition-all active:scale-95"
            >
              Search
            </button>
          </motion.form>

          {/* Quick Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-300 dark:text-slate-455 select-none mt-2"
          >
            {[
              { label: 'MBA',    cat: 'Management' },
              { label: 'B.Tech', cat: 'Engineering' },
              { label: 'BBA',    cat: 'Management' },
              { label: 'B.Sc',   cat: 'Science' },
              { label: 'M.Sc',   cat: 'Science' },
              { label: 'MBBS',   cat: 'Medicine' }
            ].map((tag, idx) => (
              <span key={tag.label} className="flex items-center gap-2">
                {idx > 0 && <span className="text-slate-605">|</span>}
                <Link
                  to={`/colleges?course=${tag.cat}`}
                  className="hover:text-[#FF7A00] transition-colors"
                >
                  {tag.label}
                </Link>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* RIGHT PANEL: University Showcase Image (Campus photo & overlays) */}
      <div 
        className="w-full lg:w-7/12 relative min-h-[440px] lg:min-h-0 bg-slate-900 z-10 overflow-hidden group/hero"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Link
              to={`/colleges/${HERO_SLIDES[currentSlide].logoType}`}
              className="block w-full h-full cursor-pointer relative z-10"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].uniName}
                className="w-full h-full object-cover brightness-[0.75] opacity-95"
              />

              {/* Featured Partner Card - Top Right */}
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3.5 py-2.5 rounded-xl shadow-lg border border-slate-100 dark:border-app-border flex items-center gap-3 z-20">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0 p-0.5 border border-slate-100 dark:border-slate-800">
                  {renderHeroLogo(HERO_SLIDES[currentSlide].logoType)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[7.5px] text-slate-450 dark:text-slate-500 font-black uppercase tracking-wider leading-none">Featured Partner</span>
                  <span className="text-[10px] font-black text-slate-800 dark:text-white leading-tight uppercase mt-1 max-w-[140px] truncate" title={HERO_SLIDES[currentSlide].uniName}>
                    {HERO_SLIDES[currentSlide].uniName}
                  </span>
                </div>
              </div>

              {/* Title & Stats Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end pb-20 pt-6 px-6 z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/15">
                {/* University Slide Title */}
                <h2 className="text-xl sm:text-2xl md:text-3.5xl font-display font-black text-white uppercase tracking-wider text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-6 select-none">
                  {HERO_SLIDES[currentSlide].title}
                </h2>

                {/* 4 Stats Cards Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 max-w-3xl mx-auto w-full">
                  {HERO_SLIDES[currentSlide].stats.map((stat, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="bg-white/95 dark:bg-slate-900/95 p-3 rounded-lg shadow-xl border border-slate-100 dark:border-app-border flex flex-col items-center justify-center text-center gap-1.5 transition-transform hover:scale-[1.02] duration-200 select-none min-h-[75px]"
                    >
                      <span className="text-[11px] sm:text-[13px] md:text-sm lg:text-base font-black text-slate-805 dark:text-white">
                        {stat.key}
                      </span>
                      <hr className="w-8 border-t border-slate-200 dark:border-slate-850" />
                      <span className="text-[7.5px] sm:text-[8.5px] md:text-[9.5px] font-extrabold text-slate-600 dark:text-slate-400 leading-snug">
                        {stat.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Arrow Buttons overlay */}
        <button 
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-[#FF7A00] text-white flex items-center justify-center border border-white/10 hover:border-transparent opacity-0 group-hover/hero:opacity-100 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/60 hover:bg-[#FF7A00] text-white flex items-center justify-center border border-white/10 hover:border-transparent opacity-0 group-hover/hero:opacity-100 transition-all duration-300 shadow-lg cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicator dots */}
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2.5 z-20">
          {HERO_SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === index 
                  ? 'w-6 bg-[#FF7A00]' 
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Top Recruiters strip at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 dark:bg-app-bg/95 border-t border-slate-200 dark:border-app-border py-3 px-6 flex flex-col md:flex-row items-center justify-between gap-3 z-20">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Top Recruiters
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-[9px] font-extrabold text-slate-705 dark:text-slate-300 uppercase tracking-wider">
            <span>Amazon</span>
            <span className="text-slate-350 dark:text-slate-750 font-light">|</span>
            <span>HCL</span>
            <span className="text-slate-350 dark:text-slate-750 font-light">|</span>
            <span>Infosys</span>
            <span className="text-slate-350 dark:text-slate-750 font-light">|</span>
            <span>IBM</span>
            <span className="text-slate-350 dark:text-slate-750 font-light">|</span>
            <span>KPMG</span>
            <span className="text-slate-350 dark:text-slate-750 font-light">|</span>
            <span>Accenture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 2: TRUST STATS
// ==========================================
export const TrustStats = () => {
  return (
    <section className="relative py-12 md:py-16 bg-app-bg/20 border-y border-app-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
          <ScrollReveal delay={0}>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-4xl font-display font-black text-white tracking-tight">
                <Counter value={25000} suffix="+" />
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Verified Colleges</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-4xl font-display font-black text-[#4F46E5] tracking-tight">
                <Counter value={1500} suffix="+" />
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Available Scholarships</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-4xl font-display font-black text-[#7C3AED] tracking-tight">
                <Counter value={500} suffix="+" />
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Entrance Exams</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-1.5">
              <span className="text-3xl md:text-4xl font-display font-black text-[#10B981] tracking-tight">
                <Counter value={1} suffix="M+" />
              </span>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Guided Students</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 3: POPULAR DESTINATIONS
// ==========================================
export const PopularDestinations = () => {
  const cities = [
    { name: 'Pune', image: 'https://images.unsplash.com/photo-1601999109332-542b18dbec57?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Hyderabad', image: 'https://images.unsplash.com/photo-1605001011156-cbf0b0f67a51?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Kolkata', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1626292357129-d870e632d47e?auto=format&fit=crop&w=300&h=300&q=80' },
    { name: 'Dehradun', image: 'https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?auto=format&fit=crop&w=300&h=300&q=80' }
  ];

  const ugCourses = ['B.Tech', 'BBA', 'BCA', 'B.Com', 'BA', 'B.Sc'];
  const pgCourses = ['MBA', 'PGDM', 'MCA', 'M.Com', 'M.Sc', 'MBBS'];

  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (
    <>
      <section className="py-16 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold text-app-text tracking-tight uppercase">
            Choose Your Favourite <span className="text-[#FF7A00]">City</span>
          </h2>
          <p className="text-sm text-app-muted max-w-lg">
            Filter premier universities based on corporate headquarters and industrial zones.
          </p>
        </div>

        {/* Circular cities listing row */}
        <div className="flex items-center justify-start lg:justify-center gap-6 md:gap-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar w-full">
          {cities.map((city, idx) => (
            <div key={city.name} className="snap-start flex-shrink-0 flex flex-col items-center gap-3">
              <ScrollReveal delay={idx * 0.05} duration={0.4}>
                <button
                  onClick={() => setSelectedCity(city.name)}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#FF7A00] hover:border-[#E06C00] bg-slate-900 shadow-md hover:shadow-lg hover:shadow-orange-500/10 hover:scale-[1.06] transition-all duration-300 cursor-pointer flex items-center justify-center group"
                >
                  {/* Circular City Image */}
                  <motion.img
                    src={city.image}
                    alt={city.name}
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="w-full h-full object-cover brightness-[0.75] group-hover:brightness-[0.6] transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors" />
                </button>
              </ScrollReveal>
              <span className="font-display font-black text-xs text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                {city.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITY COURSE SELECTION MODAL ── */}
      {selectedCity && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedCity(null)}
          />

          {/* Modal card */}
          <div className="relative w-full max-w-lg bg-white dark:bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl z-10 border border-slate-200 dark:border-app-border">

            {/* Orange header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[#FF7A00]">
              <h3 className="text-sm font-black text-white tracking-wide">
                Choose Your Favourite Course ({selectedCity})
              </h3>
              <button
                onClick={() => setSelectedCity(null)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white cursor-pointer border-none transition-all"
              >
                <X className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col gap-5">

              {/* UG Courses */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">UG Courses</p>
                <div className="flex flex-wrap gap-2.5">
                  {ugCourses.map(course => (
                    <Link
                      key={course}
                      to={`/colleges?location=${encodeURIComponent(selectedCity)}&course=${encodeURIComponent(course)}`}
                      onClick={() => setSelectedCity(null)}
                      className="px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-white/15 text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide hover:border-[#FF7A00] hover:text-[#FF7A00] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all cursor-pointer"
                    >
                      {course}
                    </Link>
                  ))}
                </div>
              </div>

              {/* PG Courses */}
              <div className="flex flex-col gap-3">
                <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">PG Courses</p>
                <div className="flex flex-wrap gap-2.5">
                  {pgCourses.map(course => (
                    <Link
                      key={course}
                      to={`/colleges?location=${encodeURIComponent(selectedCity)}&course=${encodeURIComponent(course)}`}
                      onClick={() => setSelectedCity(null)}
                      className="px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-white/15 text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-wide hover:border-[#FF7A00] hover:text-[#FF7A00] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all cursor-pointer"
                    >
                      {course}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};


// ==========================================
// SECTION 3.5: STUDENT HELP DESK
// ==========================================
export const StudentHelpDesk = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const items = [
    {
      title: 'Common Application Process',
      desc: 'Apply Multiple Colleges Using ...',
      icon: <FileText className="w-5 h-5 text-white" />,
      path: '/common-application'
    },
    {
      title: 'Scholarship Test',
      desc: 'Get upto 100% UG & PG',
      extra: 'Scholarship',
      icon: <Award className="w-5 h-5 text-white animate-pulse" />,
      path: '/scholarships'
    },
    {
      title: 'Campus Rockstar',
      desc: 'Earn More, Shine Brighter ...',
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      path: '/resources'
    },
    {
      title: 'College Predictor',
      desc: 'Your personalized guide to ...',
      icon: <Search className="w-5 h-5 text-white" />,
      path: '/college-predictor'
    },
    {
      title: 'Education Loan',
      desc: 'Empowering Dreams, Fueling ...',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      path: '/education-loan'
    },
    {
      title: 'Re-Admissions',
      desc: 'College readmission services ...',
      icon: <Building className="w-5 h-5 text-white" />,
      path: '/re-admission'
    }
  ];

  return (
    <section className="py-12 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-2 mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-app-text tracking-tight">
          Student's <span className="text-warning">Help Desk</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item, idx) => {
          const isActive = hoveredIdx === idx;
          return (
            <ScrollReveal key={item.title} delay={idx * 0.05}>
              <Link
                to={item.path}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`p-5 px-7 rounded-[2.5rem] border flex items-center gap-4 hover:shadow-lg transition-all duration-300 group h-full ${
                  isActive
                    ? 'bg-black border-transparent shadow-xl scale-[1.01]'
                    : 'glass border-app-border bg-white dark:bg-app-card'
                }`}
              >
                {/* Icon container */}
                <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 shadow-md transition-all duration-300 ${
                  isActive ? 'bg-white/10' : 'bg-[#1B254B] dark:bg-slate-800'
                }`}>
                  <div className="text-white">{item.icon}</div>
                </div>
                
                {/* Text info */}
                <div className="flex flex-col text-left flex-1">
                  <span className={`font-display font-black text-sm md:text-base leading-tight transition-colors duration-200 ${
                    isActive ? 'text-[#FF7A00]' : 'text-[#1B254B] dark:text-white group-hover:text-primary'
                  }`}>
                    {item.title}
                  </span>
                  
                  {item.desc && (
                    <span className={`text-[10px] sm:text-xs font-semibold mt-0.5 leading-normal transition-colors duration-200 ${
                      isActive ? 'text-white/95' : 'text-slate-400 dark:text-slate-500'
                    }`}>
                      {item.desc}
                    </span>
                  )}
                  
                  {item.extra && (
                    <span className={`text-[10px] sm:text-xs font-black mt-0.5 leading-none transition-colors duration-200 ${
                      isActive ? 'text-[#FF7A00]' : 'text-[#FF7A00]'
                    }`}>
                      {item.extra}
                    </span>
                  )}

                  <span className={`text-xs font-bold mt-2.5 flex items-center gap-1 leading-none transition-colors duration-200 ${
                    isActive ? 'text-white hover:underline' : 'text-[#FF7A00] group-hover:text-[#E06C00]'
                  }`}>
                    Register Now <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// SECTION 4: FEATURED COLLEGES
// ==========================================
export const FeaturedColleges = () => {
  return (
    <section className="py-20 bg-app-card border-y border-app-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
              Featured Institutions
            </h2>
            <p className="text-sm text-app-muted max-w-md">
              Top universities and colleges rated highly for placement rates, faculty excellence, and student environment.
            </p>
          </div>
          <Link
            to="/colleges"
            className="self-start md:self-auto py-2.5 px-5 rounded-xl border border-app-border hover:border-primary hover:text-primary transition-all font-semibold text-sm flex items-center gap-1.5"
          >
            Browse All Colleges
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.slice(0, 3).map((college, idx) => (
            <ScrollReveal key={college.id} delay={idx * 0.1}>
              <CollegeCard college={college} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ==========================================
// SECTION 5: FIND BEST COLLEGE/UNIVERSITIES (Top Courses Rebuilt)
// ==========================================
const ToothIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5 text-white">
    <path d="M12 2C9 2 7 4 7 7.5c0 3 1.5 4.5 2 6 .5 1 .5 2-.5 3.5-1.2 1.8-.7 3 1.5 3h4c2.2 0 2.7-1.2 1.5-3-1-1.5-1-2.5-.5-3.5.5-1.5 2-3 2-6C17 4 15 2 12 2z" />
  </svg>
);

export const TopCourses = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const courses = [
    { name: 'Engineering', icon: <Settings className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Engineering' },
    { name: 'Management', icon: <Users className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Management' },
    { name: 'Commerce', icon: <Coins className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Commerce' },
    { name: 'Law', icon: <Gavel className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Law' },
    { name: 'Arts', icon: <Palette className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Arts' },
    { name: 'Architecture', icon: <Compass className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Architecture' },
    { name: 'Dental', icon: <ToothIcon />, path: '/colleges?course=Medicine' },
    { name: 'Agriculture', icon: <Sprout className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Agriculture' },
    { name: 'Design', icon: <Layers className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Design' },
    { name: 'Hotel-Management', icon: <Users className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Management' },
    { name: 'Science', icon: <Atom className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Science' },
    { name: 'Travel', icon: <Globe className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Management' },
    { name: 'Veterinary-Science', icon: <PawPrint className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Medicine' },
    { name: 'Aviation', icon: <Plane className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Engineering' },
    { name: 'Computer', icon: <Laptop className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Engineering' },
    { name: 'Animation', icon: <PenTool className="w-4.5 h-4.5 text-white" />, path: '/colleges?course=Design' }
  ];

  return (
    <section className="w-full bg-[#F8F9FA] dark:bg-[#080C16] py-16 border-y border-slate-100 dark:border-slate-800/10">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <h2 className="text-3xl md:text-[2.25rem] font-display font-extrabold text-[#1B254B] dark:text-white tracking-tight">
            Find Best <span className="text-[#FF8F00]">College/Universities</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-7xl mx-auto">
          {courses.map((course, idx) => {
            const isActive = hoveredIdx === idx;
            return (
              <ScrollReveal key={course.name} delay={idx * 0.02} duration={0.4}>
                <Link
                  to={course.path}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className={`p-3.5 px-5 rounded-full border flex items-center justify-between gap-3 shadow-[0_8px_30px_rgba(0,0,0,0.02)] transition-all duration-300 group w-full ${
                    isActive
                      ? 'bg-black border-transparent scale-[1.01] shadow-lg'
                      : 'bg-white dark:bg-app-card border-slate-100 dark:border-app-border'
                  }`}
                >
                  {/* Left Group */}
                  <div className="flex items-center gap-3 min-w-0">
                    {/* Icon Circle */}
                    <div className="w-9 h-9 rounded-full bg-[#0F2C59] flex items-center justify-center shrink-0 shadow-sm">
                      {course.icon}
                    </div>
                    {/* Label */}
                    <span className={`font-display font-semibold text-sm leading-none truncate transition-colors ${
                      isActive ? 'text-white' : 'text-[#1B254B] dark:text-white'
                    }`}>
                      {course.name}
                    </span>
                  </div>

                  {/* Right Arrow */}
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#FF8F00]' : 'text-slate-400 dark:text-slate-500'
                  }`} />
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// ==========================================
// SECTION 5.5: BEST PLACEMENT WISE UNIVERSITIES
// ==========================================
export const PlacementUniversities = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();

  const universities = [
    {
      id: 'vidyashilp-university',
      name: 'Vidyashilp University (VU), Bangalore',
      location: 'Adity, Karnataka',
      rating: '8.8 /10',
      placement: '45 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'graphic-era',
      name: 'Graphic Era (Deemed To Be University)',
      courses: 'MBA',
      location: 'Dehra, Uttarakhand',
      rating: '8.3 /10',
      placement: '47.88 LPA',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'iibs-bangalore',
      name: 'International Institute of Business Studies (IIBS)',
      courses: 'MBA',
      location: 'Benga, Karnataka',
      rating: '8.8 /10',
      placement: '47 LPA',
      logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'bennett-university',
      name: 'Bennett University, Greater Noida',
      courses: 'MBA',
      location: 'Great, Uttar Pradesh',
      rating: '8.7 /10',
      placement: '1.2 CR',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'sanjay-ghodawat-university',
      name: 'Sanjay Ghodawat University',
      location: 'Kolha, Maharashtra',
      rating: '7.8 /10',
      placement: '15 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'xlri-jamshedpur',
      name: 'Xavier School of Management',
      courses: 'PGDM',
      location: 'Jamsh, Jharkhand',
      rating: '8.9 /10',
      placement: '1.1 CR',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'alliance-university',
      name: 'Alliance University Bangalore',
      courses: 'MBA',
      location: 'Benga, Karnataka',
      rating: '8 /10',
      placement: '60.1 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'lpu-punjab',
      name: 'Lovely Professional University',
      location: 'Jalan, Punjab',
      rating: '8.2 /10',
      placement: '2.5 CR',
      logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'cgc-landran',
      name: 'Chandigarh Group of Colleges (CGC)',
      courses: 'MBA',
      location: 'Chand, Punjab',
      rating: '8.5 /10',
      placement: '53 LPA',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'its-management',
      name: 'I.T.S School of Management',
      courses: 'MBA',
      location: 'Ghazi, Uttar Pradesh',
      rating: '8 /10',
      placement: '30.86 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'poddar-college',
      name: 'Poddar International College, Jaipur',
      courses: 'MBA',
      location: 'Jaipu, Rajasthan',
      rating: '9.2 /10',
      placement: '24 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'its-professional-studies',
      name: 'ITS College Of Professional Studies',
      location: 'Noida, Uttar Pradesh',
      rating: '9.1 /10',
      placement: '10 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'amity-university-noida',
      name: 'Amity University, Noida',
      courses: 'MBA',
      location: 'Noida, Uttar Pradesh',
      rating: '9.5 /10',
      placement: '62 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'amity-university-mumbai',
      name: 'Amity University Mumbai',
      courses: 'MBA',
      location: 'Mumba, Maharashtra',
      rating: '8.9 /10',
      placement: '44 LPA',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'medhavi-university',
      name: 'Medhavi Skills University, Sikkim',
      courses: 'MBA',
      location: 'Namch, Sikkim',
      rating: '8 /10',
      placement: '10 LPA',
      logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'kiet-university',
      name: 'KIET Deemed To Be University',
      courses: 'MBA',
      location: 'Ghazi, Uttar Pradesh',
      rating: '8.9 /10',
      placement: '90 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'sage-university',
      name: 'SAGE University Indore',
      courses: 'MBA',
      location: 'Indor, Madhya Pradesh',
      rating: '9 /10',
      placement: '30 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'accman-business-school',
      name: 'ACCMAN Business School',
      location: 'Great, Uttar Pradesh',
      rating: '8.6 /10',
      placement: '18 LPA',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'kr-mangalam',
      name: 'K R Mangalam University, (KRMU)',
      courses: 'MBA',
      location: 'Gurga, Haryana',
      rating: '8 /10',
      placement: '56.6 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'pimpri-chinchwad-university',
      name: 'Pimpri Chinchwad University (PCU)',
      courses: 'MBA',
      location: 'Pune, Maharashtra',
      rating: '9.1 /10',
      placement: '61 LPA',
      logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    }
  ];

  const handleApplyNow = (univName: string) => {
    addToast(`Initiated Application Form for ${univName}! Redirecting to registration page...`, 'success');
    navigate('/register');
  };

  const handlePlacementDetails = (slug: string) => {
    navigate(`/colleges/${slug}`);
  };

  return (
    <section className="py-16 w-full bg-[#F8F9FA] dark:bg-[#080C16] border-y border-slate-100 dark:border-slate-800/10">
      <div className="max-w-7xl mx-auto px-6 overflow-hidden">
        {/* Centered Heading */}
        <div className="flex flex-col items-center text-center gap-2 mb-10">
          <h2 className="text-3xl md:text-[2.25rem] font-display font-extrabold text-[#1B254B] dark:text-white tracking-tight">
            Best Placement Wise <span className="text-[#FF8F00]">Universities</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {universities.map((univ, idx) => (
            <ScrollReveal key={univ.name} delay={idx * 0.05} duration={0.4}>
              <div className="bg-white dark:bg-app-card border border-slate-100 dark:border-app-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex overflow-hidden hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-full">
                
                {/* Placement Badge on the left */}
                <Link to={`/colleges/${univ.id}`} className="w-[110px] sm:w-[130px] shrink-0 bg-[#223150] text-center p-3 flex flex-col justify-center items-center gap-1.5 hover:opacity-90 transition-opacity">
                  <span className="text-xl sm:text-2xl font-black text-[#FFB200] leading-none tracking-tight">
                    {univ.placement}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider leading-snug max-w-[80px]">
                    Highest Placement
                  </span>
                </Link>

                {/* Details and Actions container */}
                <div className="flex-1 p-3.5 sm:p-5 flex items-center justify-between gap-4 min-w-0">
                  
                  {/* Left: Logo & Text info */}
                  <Link to={`/colleges/${univ.id}`} className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1 group hover:no-underline">
                    
                    {/* Logo container */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 border border-slate-100 rounded-lg overflow-hidden flex items-center justify-center bg-white p-1">
                      <img
                        src={univ.logo}
                        alt={`${univ.name} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col text-left min-w-0 gap-0.5 sm:gap-1">
                      <span className="hover:underline text-[#1B254B] dark:text-white block truncate">
                        <h3 className="font-display font-bold text-sm sm:text-base truncate" title={univ.name}>
                          {univ.name}
                        </h3>
                      </span>
                      
                      {univ.courses && (
                        <p className="text-[11px] sm:text-xs text-slate-550 dark:text-slate-400 font-semibold leading-none">
                          Courses: <span className="text-slate-700 dark:text-slate-300">{univ.courses}</span>
                        </p>
                      )}

                      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 leading-none">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{univ.location}</span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] sm:text-xs text-amber-500 font-bold leading-none mt-0.5">
                        <Star className="w-3.5 h-3.5 text-warning fill-warning shrink-0" />
                        <span>{univ.rating}</span>
                      </div>

                    </div>
                  </Link>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 shrink-0 w-[110px] sm:w-[130px]">
                    
                    <button
                      onClick={() => handleApplyNow(univ.name)}
                      className="border border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white text-xs font-bold py-2 px-2.5 rounded-lg text-center cursor-pointer transition-all duration-300 leading-none"
                    >
                      Apply Now
                    </button>

                    <button
                      onClick={() => handlePlacementDetails(univ.id)}
                      className="bg-[#FF5E14] text-white hover:bg-[#E04D0F] text-xs font-bold py-2 px-2.5 rounded-lg text-center cursor-pointer transition-colors leading-none"
                    >
                      Placement details
                    </button>

                  </div>

                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Centered View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/colleges"
            className="bg-[#2C3E5B] dark:bg-slate-800 text-[#FFB200] hover:bg-[#1E2C42] hover:scale-[1.02] active:scale-[0.98] px-10 py-3.5 rounded-xl font-bold text-sm shadow-[0_10px_25px_rgba(44,62,91,0.25)] dark:shadow-none transition-all duration-300 cursor-pointer text-center leading-none"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
};

const getSlugForUniv = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('alliance')) return 'alliance-university';
  if (n.includes('sharda')) return 'sharda-university';
  if (n.includes('lpu') || n.includes('lovely')) return 'lpu-punjab';
  if (n.includes('amity')) return 'amity-university-noida';
  if (n.includes('chandigarh')) return 'chandigarh-university';
  if (n.includes('bennett')) return 'bennett-university';
  if (n.includes('jagan') || n.includes('jims')) return 'jims-delhi';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// ==========================================
// ==========================================
// SECTION 5.7: ADMISSION BANNERS MARQUEE (Applications Open)
// ==========================================
export const AdmissionBanners = () => {
  const banners = [
    {
      univ: 'Alliance University',
      bgColor: 'bg-[#6B2326]',
      highest: '60.1 LPA',
      recruiters: '600+',
      average: '8.5 LPA',
      companies: ['Capgemini', 'Deloitte', 'Infosys', 'KPMG'],
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80',
    },
    {
      univ: 'Sharda University',
      bgColor: 'bg-[#1E40AF]',
      highest: '1.6 CR',
      recruiters: '600+',
      average: '7 LPA',
      companies: ['Deloitte', 'Amazon', 'TechM', 'HDFC'],
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=400&q=80',
    },
    {
      univ: 'LPU University',
      bgColor: 'bg-[#C2410C]',
      highest: '3 CR',
      recruiters: '1100+',
      average: '8.2 LPA',
      companies: ['Google', 'Microsoft', 'Amazon', 'Cognizant'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80',
    },
    {
      univ: 'Amity University',
      bgColor: 'bg-[#1E293B]',
      highest: '62 LPA',
      recruiters: '800+',
      average: '9.5 LPA',
      companies: ['Accenture', 'Wipro', 'TCS', 'HCL'],
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=400&q=80',
    },
    {
      univ: 'Chandigarh University',
      bgColor: 'bg-[#991B1B]',
      highest: '54.75 LPA',
      recruiters: '900+',
      average: '8 LPA',
      companies: ['IBM', 'Deloitte', 'Intel', 'Amazon'],
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80',
    }
  ];

  // Duplicate set to make horizontal loop infinite
  const doubledBanners = [...banners, ...banners, ...banners];

  return (
    <section className="py-12 w-full bg-white dark:bg-app-bg/20 border-b border-slate-100 dark:border-slate-800/10 overflow-hidden relative flex flex-col gap-8">
      {/* Styles for continuous smooth CSS marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.333%, 0, 0); }
        }
        .animate-marquee-scroll {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Marquee Track Container */}
      <div className="w-full overflow-hidden flex relative z-10 py-2">
        <div className="flex gap-6 animate-marquee-scroll shrink-0 whitespace-nowrap">
          {doubledBanners.map((banner, idx) => (
            <Link
              key={idx}
              to={`/colleges/${getSlugForUniv(banner.univ)}`}
              className="relative flex w-[420px] sm:w-[480px] h-[135px] sm:h-[145px] shrink-0 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-app-card border border-slate-100 dark:border-app-border select-none hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
            >
              {/* Left sloped panel */}
              <div className={`w-[68%] h-full ${banner.bgColor} text-white p-3 pr-8 flex flex-col justify-between [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] z-10 relative`}>
                
                {/* Header text */}
                <div className="text-left">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white">
                    MBA/PGDM ADMISSION OPEN
                  </span>
                  <div className="border-b border-app-border my-1 w-full" />
                </div>

                {/* Stats Panel */}
                <div className="grid grid-cols-3 text-center gap-1.5 my-auto">
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black text-[#FFB200] leading-none tracking-tight">
                      {banner.highest}
                    </span>
                    <span className="text-[7px] font-bold text-white/95 leading-tight uppercase tracking-wide mt-0.5">
                      Highest Placement
                    </span>
                  </div>
                  
                  <div className="flex flex-col border-x border-app-border px-1">
                    <span className="text-xs sm:text-sm font-black text-white leading-none tracking-tight">
                      {banner.recruiters}
                    </span>
                    <span className="text-[7px] font-bold text-white/95 leading-tight uppercase tracking-wide mt-0.5">
                      Top Recruiters
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-black text-white leading-none tracking-tight">
                      {banner.average}
                    </span>
                    <span className="text-[7px] font-bold text-white/95 leading-tight uppercase tracking-wide mt-0.5">
                      Average Placement
                    </span>
                  </div>
                </div>

                {/* Recruiters Footer logos */}
                <div className="flex items-center gap-1.5 justify-start mt-1.5 overflow-hidden">
                  {banner.companies.map((co, cIdx) => (
                    <div
                      key={cIdx}
                      className="bg-white text-slate-800 text-[8px] font-extrabold py-0.5 px-1.5 rounded shadow-sm border border-slate-100 flex items-center justify-center font-sans shrink-0 leading-none h-[18px]"
                    >
                      {co}
                    </div>
                  ))}
                </div>

              </div>

              {/* Right absolute panel with slanted background crop */}
              <div className="absolute inset-y-0 right-0 w-[38%] h-full z-0 overflow-hidden bg-slate-900">
                <img
                  src={banner.image}
                  alt={banner.univ}
                  className="w-full h-full object-cover brightness-[0.95]"
                  loading="lazy"
                />
                
                {/* Floating Uni Name Badge */}
                <div className="absolute top-2 right-2 bg-white/95 dark:bg-app-bg/90 py-0.5 px-1.5 rounded-md text-[8px] font-black text-[#1B254B] dark:text-white border border-slate-100 shadow-sm leading-none">
                  {banner.univ}
                </div>
              </div>

            </Link>
          ))}
        </div>
      </div>

      {/* Centered Heading */}
      <div className="flex flex-col items-center text-center gap-2 px-6">
        <h2 className="text-3xl md:text-[2.25rem] font-display font-extrabold text-[#1B254B] dark:text-white tracking-tight">
          Applications Open For <span className="text-[#FF8F00]">Universities 2026 Batch</span>
        </h2>
      </div>
    </section>
  );
};

// ==========================================
// MOCKUP UNIVERSITY CARDS SECTION
// ==========================================
const BennettLogo = () => (
  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Red Shield */}
      <path d="M50 5 C75 5 85 15 85 45 C85 75 50 95 50 95 C50 95 15 75 15 45 C15 15 25 5 50 5 Z" fill="#B32025" />
      {/* Gold Inner Shield border */}
      <path d="M50 10 C70 10 78 18 78 45 C78 70 50 88 50 88 C50 88 22 70 22 45 C22 18 30 10 50 10 Z" fill="none" stroke="#FFD700" strokeWidth="3" />
      {/* Book/Crest icon in center */}
      <path d="M35 50 L50 35 L65 50 L50 65 Z" fill="#FFD700" />
      <path d="M35 50 H65 M50 35 V65" stroke="#B32025" strokeWidth="2" />
      {/* Text or initials */}
      <text x="50" y="80" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">BENNETT</text>
    </svg>
  </div>
);

const CULogo = () => (
  <div className="w-12 h-12 bg-[#1A1A1A] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-800">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Blue / Red Outer Ring */}
      <circle cx="50" cy="50" r="40" fill="#0C1B33" stroke="#FF5E14" strokeWidth="3" />
      {/* Gear/Sunburst in center */}
      <circle cx="50" cy="50" r="22" fill="#E63946" />
      {/* Cog teeth/spokes */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <rect
          key={angle}
          x="46"
          y="22"
          width="8"
          height="12"
          fill="#E63946"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="14" fill="#0C1B33" />
      <circle cx="50" cy="50" r="8" fill="#FFB200" />
      {/* Initials */}
      <text x="50" y="54" fill="white" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">CU</text>
    </svg>
  </div>
);

const JIMSLogo = () => (
  <div className="w-12 h-12 bg-[#034DA2] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-[#023e82]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* jims text */}
      <text x="50" y="45" fill="white" fontSize="30" fontWeight="900" fontStyle="italic" textAnchor="middle" fontFamily="monospace, sans-serif">jims</text>
      {/* divider */}
      <line x1="15" y1="60" x2="85" y2="60" stroke="white" strokeWidth="3" />
      {/* tiny subtext */}
      <text x="50" y="78" fill="white" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ROHINI</text>
    </svg>
  </div>
);

const AllianceLogo = () => (
  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Green Background Circle */}
      <circle cx="50" cy="50" r="45" fill="#1B4D3E" />
      {/* Gold Crown */}
      <path d="M30 65 L35 45 L50 55 L65 45 L70 65 Z" fill="#FFD700" />
      <circle cx="30" cy="40" r="3" fill="#FFD700" />
      <circle cx="50" cy="50" r="3" fill="#FFD700" />
      <circle cx="70" cy="40" r="3" fill="#FFD700" />
      {/* Banner with initials */}
      <text x="50" y="80" fill="white" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">AU</text>
    </svg>
  </div>
);

const LPULogo = () => (
  <div className="w-12 h-12 bg-[#FF7A00] rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-orange-600">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="4" />
      {/* Star */}
      <polygon points="50,15 63,38 90,38 68,54 77,80 50,65 23,80 32,54 10,38 37,38" fill="white" />
      {/* Text */}
      <text x="50" y="58" fill="#FF7A00" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">LPU</text>
    </svg>
  </div>
);

export const FeaturedCollegesMockup = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const mockupColleges = [
    {
      name: 'Bennett University, Greater Noida...',
      fullName: 'Bennett University, Greater Noida',
      location: 'Greater Noida,Uttar Pradesh',
      rank: 'B.Tech 52 out of 246 Top Private Colleges in India 2023',
      highestPackage: 'Highest Package - 1.2 CR',
      course: 'Course: MBA|PGDM',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'bennett'
    },
    {
      name: 'Chandigarh University, Chandigarh ...',
      fullName: 'Chandigarh University, Chandigarh',
      location: ',Chandigarh',
      rank: 'Ranked 41 for Overall by Indiatoday Ranking',
      highestPackage: 'Highest Package - 1.7 CR',
      course: 'Course: MBA|PGDM',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'chandigarh'
    },
    {
      name: 'Jagan Institute of Management Studies Ne...',
      fullName: 'Jagan Institute of Management Studies (JIMS), Rohini, Delhi',
      location: 'Delhi-NCR,Delhi',
      rank: 'Ranked 64 For MBA By India Today 2023',
      highestPackage: 'Highest Package - 22 LPA',
      course: 'Course: MBA|PGDM',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'jims'
    },
    {
      name: 'Alliance University, Bangalore ...',
      fullName: 'Alliance University, Bangalore',
      location: 'Bangalore,Karnataka',
      rank: 'Ranked 39 for MBA by NIRF 2023',
      highestPackage: 'Highest Package - 60.1 LPA',
      course: 'Course: MBA|PGDM',
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'alliance'
    },
    {
      name: 'Lovely Professional University, Punjab ...',
      fullName: 'Lovely Professional University (LPU), Punjab',
      location: 'Jalandhar,Punjab',
      rank: 'Ranked 32 for MBA by NIRF 2023',
      highestPackage: 'Highest Package - 2.5 CR',
      course: 'Course: MBA|PGDM',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'lpu'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIdx = mockupColleges.length - visibleCards;
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [visibleCards, mockupColleges.length]);

  const handleApplyNow = (univName: string) => {
    addToast(`Initiated Application Form for ${univName}! Redirecting to registration page...`, 'success');
    navigate('/register');
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mockupColleges.length - visibleCards));
  };

  const handleNext = () => {
    const maxIdx = mockupColleges.length - visibleCards;
    setCurrentIndex((prev) => (prev < maxIdx ? prev + 1 : 0));
  };

  const renderLogo = (type: string) => {
    switch (type) {
      case 'bennett':
        return <BennettLogo />;
      case 'chandigarh':
        return <CULogo />;
      case 'jims':
        return <JIMSLogo />;
      case 'alliance':
        return <AllianceLogo />;
      case 'lpu':
        return <LPULogo />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 w-full bg-[#F8F9FA] dark:bg-[#080C16] border-b border-slate-100 dark:border-slate-800/10 relative overflow-hidden group/section">
      <div className="max-w-7xl mx-auto px-6 relative">
        
        {/* Navigation Buttons (Left/Right Arrows) */}
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20 opacity-0 group-hover/section:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Outer Viewport */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translate3d(-${(currentIndex * 100) / mockupColleges.length}%, 0, 0)`,
              width: `${(mockupColleges.length / visibleCards) * 100}%`
            }}
          >
            {mockupColleges.map((college, idx) => (
              <div
                key={idx}
                className="shrink-0 px-3 md:px-4"
                style={{ width: `${100 / mockupColleges.length}%` }}
              >
                <div className="bg-white dark:bg-app-card border border-slate-100 dark:border-app-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:scale-[1.002] transition-all duration-300 overflow-hidden flex flex-col h-full group">
                  
                  <Link to={`/colleges/${getSlugForUniv(college.logoType)}`} className="flex flex-col flex-1 group hover:no-underline text-inherit cursor-pointer">
                    {/* Image Container with Zoom effect */}
                    <div className="relative w-full h-[185px] sm:h-[205px] overflow-hidden">
                      <img
                        src={college.image}
                        alt={college.fullName}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Subtle Top Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Dark Blue Mid-Banner */}
                    <div className="bg-[#344E68] py-3 px-4 flex items-center gap-3">
                      {renderLogo(college.logoType)}
                      <h3
                        className="text-white font-bold text-xs sm:text-[13px] leading-snug flex-1 truncate text-left"
                        title={college.fullName}
                      >
                        {college.name}
                      </h3>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex flex-col justify-between flex-1 gap-3.5 bg-white dark:bg-app-card">
                      
                      {/* Info details */}
                      <div className="flex flex-col gap-2.5">
                        
                        {/* Location */}
                        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-app-border pb-2.5 text-left">
                          <MapPin className="w-4 h-4 text-[#FF5E14] shrink-0" />
                          <span className="text-[#FF5E14] font-bold text-xs sm:text-[13px] tracking-wide">
                            {college.location}
                          </span>
                        </div>

                        {/* Rank */}
                        <div className="flex items-start gap-2 border-b border-slate-100 dark:border-app-border pb-2.5 text-left">
                          <Trophy className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          <span className="text-slate-650 dark:text-slate-350 font-bold text-xs sm:text-[13px] leading-snug">
                            {college.rank}
                          </span>
                        </div>

                        {/* Highest Package */}
                        <div className="border-b border-slate-100 dark:border-app-border pb-2.5 text-left">
                          <span className="text-[#1B254B] dark:text-white font-extrabold text-xs sm:text-[13px]">
                            {college.highestPackage}
                          </span>
                        </div>

                        {/* Course */}
                        <div className="border-b border-slate-100 dark:border-app-border pb-2.5 text-left">
                          <span className="text-slate-750 dark:text-slate-300 font-bold text-xs sm:text-[13px]">
                            {college.course}
                          </span>
                        </div>

                      </div>
                    </div>
                  </Link>

                  {/* Apply Now Action (kept outside link to prevent nested links/buttons) */}
                  <div className="text-center pb-5 bg-white dark:bg-app-card">
                    <Link
                      to={`/colleges/${getSlugForUniv(college.logoType)}`}
                      className="text-[#FF5E14] hover:text-[#D14B00] font-black text-xs sm:text-sm tracking-wide transition-all hover:scale-105 inline-block cursor-pointer hover:no-underline"
                    >
                      Apply Now &gt;&gt;
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile indicators dots */}
        <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
          {Array.from({ length: mockupColleges.length - visibleCards + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? 'bg-[#FF5E14] w-4' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

// ==========================================
// STUDENT CHOICE COLLEGES SECTION
// ==========================================
const IIMLogo = () => (
  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Black Ring */}
      <circle cx="50" cy="50" r="43" fill="none" stroke="black" strokeWidth="4" />
      {/* Inner design (circular decorative text pattern style) */}
      <circle cx="50" cy="50" r="30" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 2" />
      {/* Centered hands or crest icon */}
      <path d="M50 28 L62 48 H38 Z" fill="black" />
      <path d="M50 72 L38 52 H62 Z" fill="black" />
      <circle cx="50" cy="50" r="6" fill="black" />
      <text x="50" y="88" fill="black" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIMK</text>
    </svg>
  </div>
);

const SIBMLogo = () => (
  <div className="w-12 h-12 bg-[#B32025] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-[#9b1b1f]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Inner white shape */}
      <rect x="18" y="18" width="64" height="64" rx="8" fill="white" />
      {/* Red crest letters */}
      <text x="50" y="44" fill="#B32025" fontSize="22" fontWeight="950" textAnchor="middle" fontFamily="sans-serif">SIBM</text>
      {/* subtext */}
      <text x="50" y="60" fill="#B32025" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PUNE</text>
      <line x1="28" y1="70" x2="72" y2="70" stroke="#B32025" strokeWidth="2" />
    </svg>
  </div>
);

const GraphicEraLogo = () => (
  <div className="w-12 h-12 bg-[#B8292F] rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-[#9e2025]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Circular Gold Seal style */}
      <circle cx="50" cy="50" r="42" fill="white" stroke="#E5A93C" strokeWidth="3" />
      {/* Inner Logo Symbol */}
      <path d="M50 20 L75 42 L65 75 L35 75 L25 42 Z" fill="#B8292F" />
      <circle cx="50" cy="48" r="12" fill="white" />
      {/* Flame in center */}
      <path d="M50 40 C55 40 58 46 50 56 C42 46 45 40 50 40 Z" fill="#E5A93C" />
    </svg>
  </div>
);

const XLRILogo = () => (
  <div className="w-12 h-12 bg-[#0C2340] rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-800">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M50 8 C72 8 82 18 82 45 C82 72 50 92 50 92 C50 92 18 72 18 45 C18 18 28 8 50 8 Z" fill="#0C2340" />
      <path d="M50 14 C68 14 76 22 76 45 C76 68 50 85 50 85 C50 85 24 68 24 45 C24 22 32 14 50 14 Z" fill="none" stroke="white" strokeWidth="2" />
      {/* XLRI Text */}
      <text x="50" y="46" fill="white" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">XLRI</text>
      <line x1="32" y1="56" x2="68" y2="56" stroke="white" strokeWidth="2" />
      <text x="50" y="72" fill="#E5A93C" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">JAMSHEDPUR</text>
    </svg>
  </div>
);

const MDILogo = () => (
  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Red and Blue shape */}
      <rect x="15" y="15" width="70" height="70" rx="6" fill="#0B3C5D" />
      <path d="M15 15 L85 15 L85 45 L15 65 Z" fill="#D9534F" />
      {/* Initials */}
      <text x="50" y="55" fill="white" fontSize="26" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">MDI</text>
      <text x="50" y="78" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GURGAON</text>
    </svg>
  </div>
);

export const StudentChoiceColleges = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const mockupColleges = [
    {
      name: 'Indian Institute of Manag...',
      fullName: 'Indian Institute of Management (IIM), Kolkata',
      location: 'Kolkata, West Bengal',
      rank: 6,
      rating: '8.6',
      highCTC: '1.15 CR',
      avgCTC: '35.07 LPA',
      course: 'MBA|PGDM',
      fees: '25 Lakhs',
      image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'iim'
    },
    {
      name: 'Symbiosis Institute of B...',
      fullName: 'Symbiosis Institute of Business Management (SIBM), Pune',
      location: 'Pune, Maharashtra',
      rank: 7,
      rating: '8.8',
      highCTC: '35.05 LPA',
      avgCTC: '26.77 LPA',
      course: 'MBA|PGDM',
      fees: '23.5 Lakhs',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'sibm'
    },
    {
      name: 'Graphic Era University, D...',
      fullName: 'Graphic Era University, Dehradun',
      location: 'Dehradun, Uttarakhand',
      rank: 8,
      rating: '8.4',
      highCTC: '40 LPA',
      avgCTC: '6 LPA',
      course: 'MBA|PGDM',
      fees: '8 Lakhs',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'graphicera'
    },
    {
      name: 'Xavier School of Manag...',
      fullName: 'Xavier School of Management (XLRI), Jamshedpur',
      location: 'Jamshedpur, Jharkhand',
      rank: 9,
      rating: '8.9',
      highCTC: '1.1 CR',
      avgCTC: '32.7 LPA',
      course: 'MBA|PGDM',
      fees: '26.8 Lakhs',
      image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'xlri'
    },
    {
      name: 'Management Development I...',
      fullName: 'Management Development Institute (MDI), Gurgaon',
      location: 'Gurgaon, Haryana',
      rank: 10,
      rating: '8.7',
      highCTC: '60 LPA',
      avgCTC: '26.6 LPA',
      course: 'MBA|PGDM',
      fees: '24.9 Lakhs',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
      logoType: 'mdi'
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIdx = mockupColleges.length - visibleCards;
        return prev >= maxIdx ? 0 : prev + 1;
      });
    }, 10000); // 10 seconds auto-sliding
    return () => clearInterval(interval);
  }, [visibleCards, mockupColleges.length]);

  const getChoiceSlug = (logoType: string): string => {
    switch (logoType) {
      case 'iim': return 'iim-bangalore';
      case 'sibm': return 'symbiosis-pune';
      case 'graphicera': return 'graphic-era';
      case 'xlri': return 'xlri-jamshedpur';
      case 'mdi': return 'mdi-gurgaon';
      default: return logoType;
    }
  };

  const handleApplyNow = (univName: string) => {
    addToast(`Initiated Application Form for ${univName}! Redirecting to registration page...`, 'success');
    navigate('/register');
  };

  const handleCollegeDetails = (univName: string) => {
    addToast(`Opening detailed specifications for ${univName}...`, 'info');
    navigate('/colleges');
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mockupColleges.length - visibleCards));
  };

  const handleNext = () => {
    const maxIdx = mockupColleges.length - visibleCards;
    setCurrentIndex((prev) => (prev < maxIdx ? prev + 1 : 0));
  };

  const renderLogo = (type: string) => {
    switch (type) {
      case 'iim':
        return <IIMLogo />;
      case 'sibm':
        return <SIBMLogo />;
      case 'graphicera':
        return <GraphicEraLogo />;
      case 'xlri':
        return <XLRILogo />;
      case 'mdi':
        return <MDILogo />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 w-full bg-white dark:bg-app-bg/20 border-b border-slate-100 dark:border-slate-800/10 relative overflow-hidden group/section-choice">
      <div className="max-w-7xl mx-auto px-6 relative flex flex-col gap-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-3xl md:text-[2.25rem] font-display font-extrabold text-[#1B254B] dark:text-white tracking-tight">
            Student Choice <span className="text-[#FF8F00]">Colleges</span>
          </h2>
        </div>

        <div className="relative w-full">
          {/* Navigation Buttons (Left/Right Arrows) */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 z-20 opacity-0 group-hover/section-choice:opacity-100 transition-opacity duration-300 hidden sm:block">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute top-1/2 -right-2 -translate-y-1/2 z-20 opacity-0 group-hover/section-choice:opacity-100 transition-opacity duration-300 hidden sm:block">
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-center justify-center shadow-md hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer text-slate-700 dark:text-slate-200"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Carousel Outer Viewport */}
          <div className="overflow-hidden w-full">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                transform: `translate3d(-${(currentIndex * 100) / mockupColleges.length}%, 0, 0)`,
                width: `${(mockupColleges.length / visibleCards) * 100}%`
              }}
            >
              {mockupColleges.map((college, idx) => (
                <div
                  key={idx}
                  className="shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / mockupColleges.length}%` }}
                >
                  <div className="bg-white dark:bg-app-card border border-slate-100 dark:border-app-border rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)] hover:scale-[1.002] transition-all duration-300 overflow-hidden flex flex-col h-full group">
                    
                    <Link to={`/colleges/${getChoiceSlug(college.logoType)}`} className="flex flex-col flex-1 hover:no-underline text-inherit cursor-pointer">
                      {/* Top Image + Rank Badge + Logo Wrapper */}
                      <div className="relative w-full h-[185px] sm:h-[205px]">
                        {/* Visual Image container with crop */}
                        <div className="w-full h-full overflow-hidden rounded-t-2xl">
                          <img
                            src={college.image}
                            alt={college.fullName}
                            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                            loading="lazy"
                          />
                          {/* Subtle Top Image Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                        </div>

                        {/* Rank Badge */}
                        <div className="absolute top-3 right-3 bg-[#FF5E14] text-white text-[11px] font-black py-1.5 px-3.5 rounded-full shadow-sm z-10 leading-none">
                          Rank: {college.rank}
                        </div>

                        {/* Overlapping Logo */}
                        <div className="absolute left-4 -bottom-5 z-20">
                          {renderLogo(college.logoType)}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 pt-7 flex flex-col justify-between flex-1 gap-3.5 bg-white dark:bg-app-card">
                        
                        <div className="flex flex-col gap-3 text-left">
                          
                          {/* Title and rating */}
                          <div className="flex items-start justify-between gap-3 text-left">
                            <h3 
                              className="font-display font-extrabold text-sm sm:text-base text-slate-800 dark:text-white uppercase leading-tight truncate flex-1" 
                              title={college.fullName}
                            >
                              {college.name}
                            </h3>
                            <div className="flex flex-col items-end shrink-0 text-right">
                              <div className="flex items-center gap-0.5 text-xs font-black text-amber-500">
                                <span className="text-[#FF5E14]">★</span>
                                <span className="text-slate-800 dark:text-white">{college.rating}</span>
                                <span className="text-slate-450 font-bold ml-0.5">CM</span>
                              </div>
                              <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 leading-none mt-0.5">Rating</span>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-center gap-1.5 text-left text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{college.location}</span>
                          </div>

                          {/* High and Avg CTC */}
                          <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-100 dark:border-app-border pt-3">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none">High CTC</span>
                              <span className="text-slate-850 dark:text-white font-extrabold text-xs sm:text-[13px]">{college.highCTC}</span>
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none">Avg CTC</span>
                              <span className="text-slate-850 dark:text-white font-extrabold text-xs sm:text-[13px]">{college.avgCTC}</span>
                            </div>
                          </div>

                          {/* Course and Fees */}
                          <div className="grid grid-cols-2 gap-4 text-left border-b border-slate-100 dark:border-app-border pb-3">
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Course:</span>
                              <span className="text-[#FF5E14] font-black text-[11px] sm:text-xs leading-none">{college.course}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">Fees:</span>
                              <span className="text-slate-700 dark:text-slate-300 font-extrabold text-[11px] sm:text-xs leading-none">{college.fees}</span>
                            </div>
                          </div>

                        </div>

                      </div>
                    </Link>

                    {/* Action buttons (outside to avoid nested interactive elements) */}
                    <div className="px-5 pb-5 bg-white dark:bg-app-card">
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <Link
                          to={`/colleges/${getChoiceSlug(college.logoType)}`}
                          className="bg-[#FF5E14] hover:bg-[#D14B00] text-white font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-300 border border-transparent leading-none hover:no-underline"
                        >
                          <Send className="w-3.5 h-3.5 transform -rotate-45" />
                          <span>Apply Now</span>
                        </Link>
                        
                        <Link
                          to={`/colleges/${getChoiceSlug(college.logoType)}`}
                          className="bg-white dark:bg-transparent border border-slate-350 dark:border-app-border hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-app-card text-slate-800 dark:text-slate-200 font-black text-xs py-2.5 px-3 rounded-xl text-center cursor-pointer transition-all duration-300 leading-none hover:no-underline flex items-center justify-center"
                        >
                          College Details
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile indicators dots */}
          <div className="flex justify-center gap-1.5 mt-6 sm:hidden">
            {Array.from({ length: mockupColleges.length - visibleCards + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'bg-[#FF5E14] w-4' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-2">
          <Link
            to="/colleges"
            className="bg-[#2C3E5B] dark:bg-slate-800 text-white hover:bg-[#1E2C42] hover:scale-[1.02] active:scale-[0.98] px-10 py-3.5 rounded-xl font-bold text-sm shadow-[0_10px_25px_rgba(44,62,91,0.2)] dark:shadow-none transition-all duration-300 cursor-pointer text-center leading-none"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// TOP COLLEGES / UNIVERSITIES SECTION
// ==========================================
const DMSIITDLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1.5 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#0F2C59" strokeWidth="4" />
      <text x="50" y="45" fill="#FF5E14" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">dms</text>
      {/* Small decorative shield underneath */}
      <path d="M40 55 L50 65 L60 55 Z" fill="#0F2C59" />
      <text x="50" y="80" fill="#0F2C59" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">IIT DELHI</text>
    </svg>
  </div>
);

const ShardaLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Lotus petals */}
      <path d="M50 20 C60 40 85 45 50 85 C15 45 40 40 50 20 Z" fill="#0072CE" opacity="0.8" />
      <path d="M50 35 C65 50 90 55 50 85 C10 55 35 50 50 35 Z" fill="#EAAA00" opacity="0.8" />
      <path d="M50 50 C70 60 85 70 50 85 C15 70 30 60 50 50 Z" fill="#E31B23" opacity="0.8" />
      {/* Stem or water lines */}
      <line x1="20" y1="85" x2="80" y2="85" stroke="#0072CE" strokeWidth="3" />
      <text x="50" y="96" fill="#0072CE" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">SHARDA</text>
    </svg>
  </div>
);

const IIMALogo = () => (
  <div className="w-14 h-14 bg-[#0A1A30] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-[#081526]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="none" stroke="white" strokeWidth="3" />
      {/* Shield with Jali pattern */}
      <path d="M30 45 C30 25 50 15 50 15 C50 15 70 25 70 45 C70 70 50 85 50 85 C50 85 30 70 30 45 Z" fill="white" />
      <text x="50" y="52" fill="#0A1A30" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">IIMA</text>
      {/* Subtext */}
      <text x="50" y="68" fill="#E5A93C" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">AHMEDABAD</text>
    </svg>
  </div>
);

const KRMULogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Shield logo */}
      <path d="M25 20 L50 10 L75 20 L75 55 C75 75 50 90 50 90 C50 90 25 75 25 55 Z" fill="#005B94" />
      {/* Inner white shield */}
      <path d="M30 24 L50 15 L70 24 L70 53 C70 70 50 83 50 83 C50 83 30 70 30 53 Z" fill="white" />
      {/* Book and star symbol */}
      <path d="M40 38 H60 V48 H40 Z" fill="#D9534F" />
      <polygon points="50,22 53,29 60,29 55,34 57,41 50,37 43,41 45,34 40,29 47,29" fill="#EAAA00" />
      {/* letters KRMU */}
      <text x="50" y="70" fill="#005B94" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">KRMU</text>
    </svg>
  </div>
);

const FMSLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Eagle wings wings vector representation */}
      <path d="M20 40 C35 30 50 45 50 45 C50 45 65 30 80 40 C70 55 50 75 50 75 C50 75 30 55 20 40 Z" fill="black" />
      <circle cx="50" cy="40" r="8" fill="black" />
      {/* FMS Text */}
      <text x="50" y="88" fill="black" fontSize="16" fontWeight="black" textAnchor="middle" fontFamily="serif">FMS</text>
    </svg>
  </div>
);

export const TopCollegesList = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();

  const getTopSlug = (logoType: string): string => {
    switch (logoType) {
      case 'dms': return 'dms-iit-delhi';
      case 'krmu': return 'kr-mangalam';
      case 'sharda': return 'sharda-university';
      case 'fms': return 'fms-delhi';
      case 'iima': return 'iim-ahmedabad';
      default: return logoType;
    }
  };

  const handleApplyNow = (univName: string) => {
    addToast(`Initiated Application Form for ${univName}! Redirecting to registration page...`, 'success');
    navigate('/register');
  };

  const handleKnowMore = (univName: string) => {
    addToast(`Opening comprehensive profile info for ${univName}...`, 'info');
    navigate('/colleges');
  };

  const collegesData = [
    {
      name: 'Department Of Management Studi...',
      fullName: 'Department Of Management Studies (DMS IIT Delhi), Delhi',
      courses: 'Courses: MBA....',
      location: 'Delhi, Delhi',
      rating: '8.7 /10',
      highestPlacement: '40.11 LPA',
      logoType: 'dms',
    },
    {
      name: 'K R Mangalam University, (KRMU...',
      fullName: 'K R Mangalam University, (KRMU), Gurgaon',
      courses: 'Courses: MBA....',
      location: 'Gurga, Haryana',
      rating: '8 /10',
      highestPlacement: '56.6 LPA',
      logoType: 'krmu',
    },
    {
      name: 'Sharda University Greater Noid...',
      fullName: 'Sharda University, Greater Noida',
      courses: 'Courses: MBA....',
      location: 'Noida, Uttar Pradesh',
      rating: '8.8 /10',
      highestPlacement: '1.6 CR',
      logoType: 'sharda',
    },
    {
      name: 'FMS Delhi: Faculty of Manageme...',
      fullName: 'FMS Delhi: Faculty of Management Studies, Delhi',
      courses: 'Courses: MBA....',
      location: 'Delhi, Delhi',
      rating: '8.9 /10',
      highestPlacement: '1.23 CR',
      logoType: 'fms',
    },
    {
      name: 'Indian Institute of Management...',
      fullName: 'Indian Institute of Management (IIMA), Ahmedabad',
      courses: '',
      location: 'Ahmed, Gujarat',
      rating: '9.1 /10',
      highestPlacement: '1.46 CR',
      logoType: 'iima',
    }
  ];

  const renderLogo = (type: string) => {
    switch (type) {
      case 'dms':
        return <DMSIITDLogo />;
      case 'sharda':
        return <ShardaLogo />;
      case 'iima':
        return <IIMALogo />;
      case 'krmu':
        return <KRMULogo />;
      case 'fms':
        return <FMSLogo />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 w-full bg-[#F8F9FA] dark:bg-[#080C16] border-b border-slate-100 dark:border-slate-800/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2">
          <h2 className="text-3xl md:text-[2.25rem] font-display font-extrabold text-[#1B254B] dark:text-white tracking-tight">
            Top <span className="text-[#FF8F00]">Colleges / Universities</span>
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto w-full">
          {collegesData.map((college, idx) => (
            <ScrollReveal key={idx} delay={idx * 0.05}>
              <div className="bg-white dark:bg-app-card border border-slate-150 dark:border-app-border rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.05)] hover:scale-[1.002] transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 group">
                
                <Link to={`/colleges/${getTopSlug(college.logoType)}`} className="flex flex-col sm:flex-row items-center gap-4 flex-1 min-w-0 w-full hover:no-underline text-inherit cursor-pointer">
                  {/* Left section: Logo + Details */}
                  <div className="flex items-start gap-4 flex-1 min-w-0 w-full">
                    
                    {/* Logo Container with hover animation */}
                    <div className="overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105 shrink-0">
                      {renderLogo(college.logoType)}
                    </div>

                    {/* Text specs */}
                    <div className="flex flex-col gap-1 text-left min-w-0 flex-1">
                      <h3 
                        className="font-display font-extrabold text-sm sm:text-base text-slate-850 dark:text-white leading-tight truncate" 
                        title={college.fullName}
                      >
                        {college.name}
                      </h3>
                      
                      {college.courses && (
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                          {college.courses}
                        </span>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mt-0.5">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{college.location}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                          <span className="text-[#FF5E14]">★</span>
                          <span className="text-slate-700 dark:text-slate-300">{college.rating}</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Center/Right section: Highest Placement stats */}
                  <div className="flex flex-col justify-center text-center sm:text-right md:text-center px-1 sm:px-3 shrink-0">
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase leading-none">Highest Placement</span>
                    <span className="text-[#FF5E14] font-black text-sm sm:text-base mt-1.5 leading-none">
                      {college.highestPlacement}
                    </span>
                  </div>
                </Link>

                {/* Far Right actions */}
                <div className="flex flex-col gap-2 shrink-0 w-full sm:w-[130px]">
                  <Link
                    to={`/colleges/${getTopSlug(college.logoType)}`}
                    className="border border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white text-xs font-black py-2 px-2.5 rounded-lg text-center cursor-pointer transition-all duration-300 leading-none bg-transparent hover:no-underline h-8 flex items-center justify-center"
                  >
                    Apply Now
                  </Link>
                  <Link
                    to={`/colleges/${getTopSlug(college.logoType)}`}
                    className="bg-[#FF5E14] text-white hover:bg-[#D14B00] text-xs font-black py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer transition-colors leading-none border-none group-hover:scale-[1.01] hover:no-underline h-8"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Know more</span>
                  </Link>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Center View All Button */}
        <div className="flex justify-center mt-2">
          <Link
            to="/colleges"
            className="bg-[#2C3E5B] dark:bg-slate-800 text-white hover:bg-[#1E2C42] hover:scale-[1.02] active:scale-[0.98] px-10 py-3.5 rounded-xl font-bold text-sm shadow-[0_10px_25px_rgba(44,62,91,0.2)] dark:shadow-none transition-all duration-300 cursor-pointer text-center leading-none"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// VECTOR LOGOS FOR PLACEMENT VERIFIED & EXAMS
// ==========================================
const GLBajajLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 20 L50 5 L80 20 L80 60 C80 80 50 95 50 95 C50 95 20 80 20 60 Z" fill="#003566" />
      <path d="M25 24 L50 11 L75 24 L75 58 C75 75 50 88 50 88 C50 88 25 75 25 58 Z" fill="#FFD166" />
      <path d="M30 28 L50 17 L70 28 L70 56 C70 70 50 81 50 81 C50 81 30 70 30 56 Z" fill="#003566" />
      <text x="50" y="52" fill="#FFD166" fontSize="14" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GLB</text>
      <text x="50" y="66" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">ESTD 1997</text>
    </svg>
  </div>
);

const PVGraphicEraLogo = () => (
  <div className="w-14 h-14 bg-[#0F4C81] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-[#0F4C81]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="white" />
      <path d="M35 30 H65 V42 H47 V50 H60 V62 H47 V70 H35 Z" fill="#0F4C81" />
      <path d="M55 50 H65 V70 H55 Z" fill="#E67E22" />
      <text x="50" y="24" fill="#0F4C81" fontSize="9" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">GEU</text>
    </svg>
  </div>
);

const JLULogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="15" y="15" width="70" height="70" rx="10" fill="#0056B3" />
      <circle cx="50" cy="45" r="20" fill="none" stroke="#FFC107" strokeWidth="4" />
      <path d="M40 65 L50 75 L60 65" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" />
      <text x="50" y="50" fill="white" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">JLU</text>
    </svg>
  </div>
);

const PVBennettLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <rect x="10" y="10" width="80" height="80" rx="8" fill="#A8201A" />
      <rect x="15" y="15" width="70" height="70" rx="5" fill="white" />
      <path d="M35 30 H55 C65 30 65 42 55 42 H35 Z" fill="#A8201A" />
      <path d="M35 42 H58 C68 42 68 55 58 55 H35 Z" fill="#A8201A" />
      <rect x="35" y="30" width="10" height="40" fill="#A8201A" />
      <circle cx="70" cy="30" r="4" fill="#FFC107" />
    </svg>
  </div>
);

const PVCULogo = () => (
  <div className="w-14 h-14 bg-[#1B4D3E] rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-[#153B30]">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="none" stroke="#D4AF37" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="white" />
      <path d="M35 35 C40 30 50 30 55 35 C60 40 60 50 55 55 C50 60 40 60 35 55 Z" fill="none" stroke="#1B4D3E" strokeWidth="4" />
      <path d="M45 45 C48 42 52 42 55 45 C58 48 58 52 55 55" fill="none" stroke="#D4AF37" strokeWidth="3" />
      <text x="50" y="80" fill="#1B4D3E" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">CU</text>
    </svg>
  </div>
);

const NMATLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 70 L40 30 L60 70" stroke="#7F8C8D" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M40 30 L60 70 L80 30" stroke="#E74C3C" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <text x="50" y="90" fill="#2C3E50" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">NMAT</text>
    </svg>
  </div>
);

const CMATLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <circle cx="50" cy="50" r="42" fill="#E74C3C" />
      <text x="50" y="58" fill="white" fontSize="24" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">C</text>
      <text x="50" y="85" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">CMAT</text>
    </svg>
  </div>
);

const ATMALogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M20 75 L50 20 L80 75 Z" fill="none" stroke="#2980B9" strokeWidth="6" />
      <path d="M35 55 H65" stroke="#E67E22" strokeWidth="5" />
      <text x="50" y="92" fill="#2C3E50" fontSize="11" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">ATMA</text>
    </svg>
  </div>
);

const CATLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M30 15 L70 15 L85 45 L50 85 L15 45 Z" fill="#2C3E50" />
      <path d="M35 20 L65 20 L77 45 L50 78 L23 45 Z" fill="#F1C40F" />
      <text x="50" y="48" fill="#2C3E50" fontSize="18" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">CAT</text>
    </svg>
  </div>
);

const XATLogo = () => (
  <div className="w-14 h-14 bg-white rounded-md flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path d="M25 25 L75 75 M75 25 L25 75" stroke="#E74C3C" strokeWidth="10" strokeLinecap="round" />
      <path d="M50 25 L50 75" stroke="#2980B9" strokeWidth="4" />
      <text x="50" y="92" fill="#2C3E50" fontSize="12" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">XAT</text>
    </svg>
  </div>
);

// DATASETS
const placementColleges = [
  {
    id: 'gl-bajaj',
    name: 'GL Bajaj Institute of Technology and Management',
    shortName: 'GL Bajaj',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 7.8,
    rank: 11,
    highCtc: '53.58 LPA',
    avgCtc: '28.83 LPA',
    fees: '₹6.6 Lakhs',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=600&h=400&q=80',
    logo: GLBajajLogo
  },
  {
    id: 'graphic-era',
    name: 'Graphic Era University',
    shortName: 'Graphic Era',
    location: 'Dehradun, Uttarakhand',
    rating: 8.4,
    rank: 12,
    highCtc: '40.00 LPA',
    avgCtc: '6.00 LPA',
    fees: '₹4.21 Lakhs',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&h=400&q=80',
    logo: PVGraphicEraLogo
  },
  {
    id: 'jlu-bhopal',
    name: 'Jagran Lakecity University',
    shortName: 'JLU Bhopal',
    location: 'Bhopal, Madhya Pradesh',
    rating: 8.0,
    rank: 13,
    highCtc: '24.00 LPA',
    avgCtc: '4.50 LPA',
    fees: '₹1.6 Lakhs',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&h=400&q=80',
    logo: JLULogo
  },
  {
    id: 'bennett-university',
    name: 'Bennett University',
    shortName: 'Bennett',
    location: 'Greater Noida, Uttar Pradesh',
    rating: 8.2,
    rank: 14,
    highCtc: '1.2 CPA',
    avgCtc: '7.99 LPA',
    fees: '₹5.7 Lakhs',
    image: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=600&h=400&q=80',
    logo: PVBennettLogo
  },
  {
    id: 'chandigarh-university',
    name: 'Chandigarh University',
    shortName: 'CU',
    location: 'Mohali, Punjab',
    rating: 8.1,
    rank: 15,
    highCtc: '54.75 LPA',
    avgCtc: '9.50 LPA',
    fees: '₹2.5 Lakhs',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?auto=format&fit=crop&w=600&h=400&q=80',
    logo: PVCULogo
  }
];

const upcomingExams = [
  {
    id: 'nmat-2025',
    name: 'NMAT 2025',
    logo: NMATLogo,
    appDate: 'Aug 1 - Oct 10, 2025',
    examDate: 'Oct 14 - Dec 20, 2025',
    resultDate: 'February 2026'
  },
  {
    id: 'cmat-2025',
    name: 'CMAT 2025',
    logo: CMATLogo,
    appDate: 'Feb 10 - Mar 15, 2025',
    examDate: 'May 2025',
    resultDate: 'June 2025'
  },
  {
    id: 'atma-2025',
    name: 'ATMA 2025',
    logo: ATMALogo,
    appDate: 'Dec 15 - Feb 11, 2025',
    examDate: 'February 22, 2025',
    resultDate: 'March 2025'
  },
  {
    id: 'cat-2025',
    name: 'CAT 2025',
    logo: CATLogo,
    appDate: 'Aug 2 - Sep 20, 2025',
    examDate: 'November 23, 2025',
    resultDate: 'January 2026'
  },
  {
    id: 'xat-2025',
    name: 'XAT 2025',
    logo: XATLogo,
    appDate: 'July 15 - Nov 30, 2025',
    examDate: 'January 5, 2025',
    resultDate: 'January 20, 2025'
  }
];

// ==========================================
// SECTION 5.1: PLACEMENT VERIFIED COLLEGES CAROUSEL
// ==========================================
export const PlacementVerifiedColleges = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleApplyNow = (univName: string) => {
    addToast(`Initiated Application Form for ${univName}! Redirecting to registration page...`, 'success');
    navigate('/register');
  };

  const handleKnowMore = (univName: string) => {
    addToast(`Opening comprehensive profile info for ${univName}...`, 'info');
    navigate('/colleges');
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, 5 - visibleCards);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-slate-50/50 dark:bg-app-card border-y border-app-border group/carousel relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
              Placement verified <span className="text-[#FF5E14]">Colleges</span>
            </h2>
            <p className="text-sm text-app-muted max-w-lg">
              Explore elite colleges with high return on investment and verified outstanding placement records.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden w-full">
          {/* Arrow Buttons overlay */}
          <button 
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-[#FF5E14] text-white flex items-center justify-center border border-app-border opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-[#FF5E14] text-white flex items-center justify-center border border-app-border opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Track */}
          <div className="overflow-hidden w-full px-1 py-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${(currentIndex * 100) / 5}%)`,
                width: `${(5 / visibleCards) * 100}%` 
              }}
            >
              {placementColleges.map((college) => {
                const LogoComponent = college.logo;
                return (
                  <div 
                    key={college.id} 
                    className="px-3 shrink-0"
                    style={{ width: `${100 / 5}%` }}
                  >
                    {/* College Card */}
                    <div className="bg-white dark:bg-app-card border border-slate-150 dark:border-app-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-350 relative flex flex-col h-full group">
                      
                      <Link to={`/colleges/${college.id}`} className="flex flex-col flex-1 hover:no-underline text-inherit cursor-pointer">
                        {/* Image container */}
                        <div className="relative overflow-hidden h-48 w-full rounded-t-2xl">
                          <img 
                            src={college.image} 
                            alt={college.name} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                          />
                          {/* Placement Verified stamp */}
                          <div className="absolute top-3 right-3 z-10 bg-emerald-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(16,185,129,0.3)] border border-emerald-400/30 flex items-center justify-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            Placement Verified
                          </div>
                          
                          {/* Overlapping logo container */}
                          <div className="absolute -bottom-7 left-5 z-20">
                            <LogoComponent />
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-5 pt-9 flex flex-col justify-between flex-1 text-left">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black text-[#FF5E14] uppercase tracking-wider bg-[#FF5E14]/10 px-2 py-0.5 rounded">
                                Rank #{college.rank}
                              </span>
                              <div className="flex items-center gap-1 text-xs font-black text-amber-500">
                                <span>★</span>
                                <span className="text-slate-700 dark:text-slate-300">{college.rating} / 10</span>
                              </div>
                            </div>
                            
                            <h3 className="font-display font-extrabold text-base text-slate-850 dark:text-white leading-tight mb-1 group-hover:text-[#FF5E14] transition-colors text-left line-clamp-1" title={college.name}>
                              {college.shortName}
                            </h3>
                            
                            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1 mb-4 text-left">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              {college.location}
                            </p>

                            {/* Placement Stats Grid */}
                            <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 dark:bg-app-card rounded-xl border border-slate-100 dark:border-app-border mb-4">
                              <div className="flex flex-col text-left">
                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Highest Package</span>
                                <span className="text-[#FF5E14] font-black text-xs sm:text-sm mt-0.5">{college.highCtc}</span>
                              </div>
                              <div className="flex flex-col text-left border-l border-slate-200 dark:border-app-border pl-3">
                                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Average Package</span>
                                <span className="text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm mt-0.5">{college.avgCtc}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs mb-5">
                              <span className="text-slate-400 dark:text-slate-500">Course Fees:</span>
                              <span className="font-extrabold text-slate-800 dark:text-slate-200">{college.fees}</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Action Buttons */}
                      <div className="px-5 pb-5 bg-white dark:bg-app-card">
                        <div className="flex items-center gap-2 mt-auto">
                          <Link
                            to={`/colleges/${college.id}`}
                            className="flex-1 bg-[#FF5E14] hover:bg-[#D14B00] text-white text-xs font-bold py-2.5 px-3 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors border-none shadow-[0_4px_10px_rgba(255,94,20,0.15)] active:scale-95 hover:no-underline text-center"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Apply Now</span>
                          </Link>
                          <Link
                            to={`/colleges/${college.id}`}
                            className="flex-1 border border-slate-250 dark:border-app-border hover:border-slate-350 hover:bg-slate-50 dark:hover:bg-app-card text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-3 rounded-lg text-center cursor-pointer transition-all active:scale-95 bg-transparent hover:no-underline flex items-center justify-center"
                          >
                            Details
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/colleges')}
            className="bg-[#2C3E5B] dark:bg-slate-800 text-white hover:bg-[#1E2C42] hover:scale-[1.02] active:scale-[0.98] px-10 py-3.5 rounded-xl font-bold text-sm shadow-[0_10px_25px_rgba(44,62,91,0.2)] dark:shadow-none transition-all duration-300 cursor-pointer text-center leading-none border-none"
          >
            View All
          </button>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// SECTION 5.2: UPCOMING EXAMS CAROUSEL
// ==========================================
export const UpcomingExamsCarousel = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const handleReadMore = (examId: string, examName: string) => {
    addToast(`Loading exam guides and updates for ${examName}...`, 'info');
    navigate(`/exams/${examId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, 5 - visibleCards);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 10000);
    return () => clearInterval(timer);
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-app-card border-b border-app-border group/carousel relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
              Upcoming <span className="text-[#FF5E14]">Exams</span>
            </h2>
            <p className="text-sm text-app-muted max-w-lg">
              Stay ahead of critical dates, deadlines, and results for key national management entrance tests.
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden w-full">
          {/* Arrow Buttons overlay */}
          <button 
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-[#FF5E14] text-white flex items-center justify-center border border-app-border opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-slate-900/85 hover:bg-[#FF5E14] text-white flex items-center justify-center border border-app-border opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Track */}
          <div className="overflow-hidden w-full px-1 py-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${(currentIndex * 100) / 5}%)`,
                width: `${(5 / visibleCards) * 100}%` 
              }}
            >
              {upcomingExams.map((exam) => {
                const LogoComponent = exam.logo;
                return (
                  <div 
                    key={exam.id} 
                    className="px-3 shrink-0"
                    style={{ width: `${100 / 5}%` }}
                  >
                    {/* Exam Card */}
                    <div className="bg-white dark:bg-app-card border border-slate-150 dark:border-app-border rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-full group">
                      
                      <Link to={`/exams/${exam.id}`} className="flex flex-col flex-1 hover:no-underline text-inherit cursor-pointer">
                        {/* Header */}
                        <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-slate-100 dark:border-app-border w-full">
                          <LogoComponent />
                          <div className="text-left">
                            <h3 className="font-display font-extrabold text-lg text-slate-850 dark:text-white leading-tight group-hover:text-[#FF5E14] transition-colors">
                              {exam.name}
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                              Management Entrance
                            </span>
                          </div>
                        </div>

                        {/* Calendar Body */}
                        <div className="flex flex-col gap-4 text-left mb-6 w-full">
                          {/* Application Date */}
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FF5E14]/10 flex items-center justify-center text-[#FF5E14] shrink-0 mt-0.5">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-[#FF5E14] uppercase tracking-wider">
                                Application Date
                              </span>
                              <span className="text-sm font-extrabold text-slate-850 dark:text-white mt-0.5">
                                {exam.appDate}
                              </span>
                            </div>
                          </div>

                          {/* Examination Date */}
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FF5E14]/10 flex items-center justify-center text-[#FF5E14] shrink-0 mt-0.5">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-[#FF5E14] uppercase tracking-wider">
                                Examination Date
                              </span>
                              <span className="text-sm font-extrabold text-slate-850 dark:text-white mt-0.5">
                                {exam.examDate}
                              </span>
                            </div>
                          </div>

                          {/* Result */}
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#FF5E14]/10 flex items-center justify-center text-[#FF5E14] shrink-0 mt-0.5">
                              <Calendar className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[10px] font-black text-[#FF5E14] uppercase tracking-wider">
                                Result
                              </span>
                              <span className="text-sm font-extrabold text-slate-850 dark:text-white mt-0.5">
                                {exam.resultDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Footer Trigger Link */}
                      <div className="flex justify-center pt-3 border-t border-slate-100 dark:border-app-border">
                        <Link
                          to={`/exams/${exam.id}`}
                          className="text-xs font-black text-[#FF5E14] hover:text-[#D14B00] flex items-center gap-1 hover:gap-2 transition-all cursor-pointer hover:no-underline"
                        >
                          Read More &gt;&gt;
                        </Link>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// ==========================================
// SECTION 6: SCHOLARSHIPS
// ==========================================
export const ScholarshipsList = () => {
  return (
    <section className="py-20 bg-app-card border-y border-app-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
              Active Scholarship Opportunities
            </h2>
            <p className="text-sm text-app-muted max-w-md">
              Apply to active collegiate grants and funding platforms to cover your academic fee cycles.
            </p>
          </div>
          <Link
            to="/scholarships"
            className="self-start md:self-auto py-2.5 px-5 rounded-xl border border-app-border hover:border-accent hover:text-accent transition-all font-semibold text-sm flex items-center gap-1.5"
          >
            Explore Scholarships
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scholarships.slice(0, 3).map((scholarship, idx) => (
            <ScrollReveal key={scholarship.id} delay={idx * 0.1}>
              <ScholarshipCard scholarship={scholarship} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 7: UPCOMING EXAMS
// ==========================================
export const ExamsTimeline = () => {
  const [selectedExam, setSelectedExam] = useState<typeof exams[0] | null>(null);

  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col items-center text-center gap-3.5 mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
          Upcoming Registration Milestones
        </h2>
        <p className="text-sm text-app-muted max-w-md">
          Track registration deadlines and exam dates for leading entrance tests in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {exams.slice(0, 3).map((exam, idx) => (
          <ScrollReveal key={exam.id} delay={idx * 0.1}>
            <ExamCard exam={exam} onOpenDetails={(ex) => setSelectedExam(ex)} />
          </ScrollReveal>
        ))}
      </div>

      {/* Exam Details Modal overlay */}
      <AnimatePresence>
        {selectedExam && (
          <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExam(null)}
              className="fixed inset-0 bg-app-bg/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg rounded-2xl border border-app-border bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold uppercase tracking-wider">
                    {selectedExam.category}
                  </span>
                  <h3 className="font-display font-bold text-2xl text-app-text mt-2">
                    {selectedExam.name}
                  </h3>
                  <p className="text-xs text-app-muted">{selectedExam.fullName}</p>
                </div>
                <button
                  onClick={() => setSelectedExam(null)}
                  className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-app-card border border-transparent hover:border-app-border"
                >
                  Close
                </button>
              </div>

              <div className="flex flex-col gap-4 text-sm mt-6">
                <div>
                  <h4 className="font-bold text-app-text text-xs uppercase text-secondary tracking-wider mb-1">Description</h4>
                  <p className="text-app-muted text-xs leading-relaxed">{selectedExam.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-app-border pt-4">
                  <div>
                    <h4 className="font-bold text-app-text text-xs uppercase tracking-wider mb-1">Exam Difficulty</h4>
                    <span className="text-xs font-semibold text-danger">{selectedExam.difficulty}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-app-text text-xs uppercase tracking-wider mb-1">Format/Pattern</h4>
                    <span className="text-xs text-app-muted line-clamp-1">{selectedExam.pattern}</span>
                  </div>
                </div>

                <div className="border-t border-app-border pt-4">
                  <h4 className="font-bold text-app-text text-xs uppercase text-secondary tracking-wider mb-2">Detailed Syllabus</h4>
                  <ul className="flex flex-col gap-1.5 text-xs text-app-muted pl-4 list-disc">
                    {selectedExam.syllabus.map((syll, i) => (
                      <li key={i}>{syll}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setSelectedExam(null)}
                  className="px-5 py-2.5 text-sm font-bold text-white bg-secondary rounded-xl hover:bg-secondary-hover transition-all"
                >
                  Acknowledge Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ==========================================
// SECTION 8: STUDENT SERVICES
// ==========================================
export const StudentServices = () => {
  const addToast = useGlobalStore().addToast;
  
  const services = [
    { title: 'College Predictor', desc: 'Predict likely college matches using your entrance exam raw percentiles.', action: 'Launch Predictor', icon: <Layers className="w-5 h-5 text-primary" /> },
    { title: 'Rank Predictor', desc: 'Input exam scores to estimate overall state & nation level rankings.', action: 'Estimate Rank', icon: <TrendingUp className="w-5 h-5 text-secondary" /> },
    { title: 'Loan Assistance', desc: 'Secure collateral-free educational bank loans from our tied-up partners.', action: 'Explore Loans', icon: <DollarSign className="w-5 h-5 text-success" /> },
    { title: 'Admission Guidance', desc: 'Get direct consultation on application filling and seat locking phases.', action: 'Talk to Expert', icon: <ShieldCheck className="w-5 h-5 text-warning" /> },
    { title: 'Career Counseling', desc: 'Connect 1-on-1 with industry practitioners on modern role transitions.', action: 'Book Mentorship', icon: <Brain className="w-5 h-5 text-accent" /> },
    { title: 'Scholarship Guidance', desc: 'Formulate eligibility checklists for private international grant programs.', action: 'View Assistance', icon: <Award className="w-5 h-5 text-secondary" /> }
  ];

  const handleLaunchService = (name: string) => {
    addToast(`${name} simulation launched! Input parameters inside details forms.`, 'info');
  };

  return (
    <section className="py-20 bg-app-card border-y border-app-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3.5 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
            Premium Student Services
          </h2>
          <p className="text-sm text-app-muted max-w-md">
            Interactive portals and direct channels designed to simplify collegiate planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((serv, idx) => (
            <ScrollReveal key={serv.title} delay={idx * 0.05} duration={0.5}>
              <div className="glass glass-hover p-6 rounded-2xl text-left border border-app-border flex flex-col gap-4 group h-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-app-card flex items-center justify-center border border-app-border">
                    {serv.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-app-text">{serv.title}</h3>
                </div>
                <p className="text-xs text-app-muted leading-relaxed flex-1">{serv.desc}</p>
                <button
                  onClick={() => handleLaunchService(serv.title)}
                  className="py-2 px-4 rounded-xl bg-app-card group-hover:bg-primary group-hover:text-white border border-app-border group-hover:border-transparent text-xs font-semibold text-app-muted transition-all self-start"
                >
                  {serv.action}
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 9: CAREER ROADMAPS
// ==========================================
export const CareerRoadmapsSection = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
            Personalized Career Roadmaps
          </h2>
          <p className="text-sm text-app-muted max-w-md">
            Explore step-by-step skill timelines, average salaries, and market trends for in-demand specializations.
          </p>
        </div>
        <Link
          to="/careers"
          className="self-start md:self-auto py-2.5 px-5 rounded-xl border border-app-border hover:border-primary hover:text-primary transition-all font-semibold text-sm flex items-center gap-1.5"
        >
          Explore All Careers
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careers.slice(0, 3).map((road, idx) => (
          <ScrollReveal key={road.id} delay={idx * 0.1}>
            <RoadmapCard roadmap={road} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// SECTION 10: SUCCESS STORIES
// ==========================================
export const TestimonialsCarousel = () => {
  const reviews = [
    { name: 'Sameer Sen', college: 'IIT Bombay (B.Tech CSE)', review: 'Aruna-Nand EdTech Services helped me locate specific merit-based financial aids. Their detailed exam timeline kept me on track for registrations.', rating: 5, photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'Ankita Murthy', college: 'IIM Bangalore (MBA)', review: 'The side-by-side college comparison dashboard was crucial in analyzing ROI across executive programs. Highly helpful tool!', rating: 5, photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'Dr. Nikhil K', college: 'AIIMS New Delhi (MBBS)', review: 'Finding medical college cutoffs, syllabus structures, and registration portals is notoriously tedious. Aruna-Nand EdTech Services combines everything.', rating: 4.8, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80' },
    { name: 'Pranav Rao', college: 'NLSIU Bangalore (B.A. LL.B)', review: 'I used the Career Roadmap to analyze paths in corporate law versus legal aid clinic positions. The skill breakdown is spot on.', rating: 5, photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80' }
  ];

  return (
    <section className="py-20 bg-app-card border-y border-app-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3.5 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
            Admitted Student Success Stories
          </h2>
          <p className="text-sm text-app-muted max-w-md">
            Hear from our platform users who secured seats at leading universities and charted their dream careers.
          </p>
        </div>

        {/* Dynamic sliding track */}
        <div className="flex gap-6 overflow-x-auto pb-4 pt-2 snap-x snap-mandatory no-scrollbar">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-80 md:w-96 snap-start glass p-6 rounded-2xl flex flex-col gap-4 text-left border border-app-border/70 shadow-lg"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(rev.rating) ? 'text-warning fill-warning' : 'text-app-border'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-app-muted italic leading-relaxed">"{rev.review}"</p>
              
              <div className="flex items-center gap-3 border-t border-app-border/40 pt-4 mt-auto">
                <img
                  src={rev.photo}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover border border-app-border"
                />
                <div>
                  <p className="font-semibold text-sm text-app-text">{rev.name}</p>
                  <p className="text-[10px] text-primary font-medium">{rev.college}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 11: BLOGS
// ==========================================
export const BlogsSection = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="text-left flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-app-text tracking-tight">
            Latest Academic Insights
          </h2>
          <p className="text-sm text-app-muted max-w-md">
            Read professional guidelines, study hacks, and admission cutoff analysis from leading educators.
          </p>
        </div>
        <Link
          to="/resources"
          className="self-start md:self-auto py-2.5 px-5 rounded-xl border border-app-border hover:border-secondary hover:text-secondary transition-all font-semibold text-sm flex items-center gap-1.5"
        >
          View Resources Portal
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.slice(0, 3).map((blog, idx) => (
          <ScrollReveal key={blog.id} delay={idx * 0.1}>
            <BlogCard blog={blog} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

// ==========================================
// SECTION 12: FAQ
// ==========================================
export const FAQSection = () => {
  const faqs = [
    { q: 'How does the College Predictor compute results?', a: 'Our calculator matches input test scores (JEE, CAT, etc.) against previous year cutoff ranks and counselling databases, factoring in category weightings.' },
    { q: 'Can I shortlist and compare multiple colleges at once?', a: 'Yes! You can click the "Compare" button on any college card. You can add up to 3 colleges and click the Compare icon in the floating header for a detailed spec sheet.' },
    { q: 'Are all scholarships listed on the platform free to apply?', a: 'Yes. Aruna-Nand EdTech Services gathers public datasets and coordinates application routes completely free. Specific scholarship providers may require application essays or records.' },
    { q: 'How do I schedule a direct session with a career mentor?', a: 'Go to our "Student Services" section on the home page or contact our support team. We schedule 30-minute introductory calls with certified counsellors and alumni.' }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-app-card border-y border-app-border">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-col items-center text-center gap-3.5 mb-12">
          <HelpCircle className="w-8 h-8 text-secondary" />
          <h2 className="text-3xl font-display font-bold text-app-text tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-app-muted">
            Got queries? Find instant answers about our platforms, tools, and counseling.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="glass rounded-2xl overflow-hidden border border-app-border">
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-app-text hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-app-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="p-5 pt-0 text-xs text-app-muted leading-relaxed border-t border-app-border/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ==========================================
// SECTION 13: CTA (CALL TO ACTION)
// ==========================================
export const CTA = () => {
  const addToast = useGlobalStore().addToast;

  const handleTalkToExpert = () => {
    addToast('Direct expert counseling request logged! Our executive will call you within 24 hours.', 'success');
  };

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      {/* Background glow overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6 relative z-10 text-center">
        <ScrollReveal>
          <div className="glass p-8 md:p-12 rounded-3xl border-app-border flex flex-col items-center gap-6 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-white/[0.01] to-white/[0.03]">
            {/* Corner styling glows */}
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/20 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-accent/20 rounded-full blur-xl pointer-events-none" />

            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight text-app-text leading-tight max-w-2xl">
              Ready To Start Your Academic{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Journey?
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-app-muted max-w-lg leading-relaxed">
              Join thousands of students selecting elite universities, funding paths, and skill milestones with Aruna-Nand EdTech Services today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 w-full mt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all"
              >
                Create Free Account
              </Link>
              <button
                onClick={handleTalkToExpert}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-app-card border border-app-border hover:bg-app-card transition-all text-sm font-bold text-app-text"
              >
                Talk To Expert Counselor
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

import { Activity } from 'lucide-react';

export const DisciplinesSection = () => {
  const navigate = useNavigate();
  const addToast = useGlobalStore().addToast;

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

  const closeLead = (collegesRoute?: string) => {
    setLeadModal(null);
    resetLead();
    if (collegesRoute) navigate(collegesRoute);
  };

  const disciplines = [
    { name: 'B.Tech', label: 'Engineering', desc: 'IITs, NITs, and top private universities across India', icon: <Settings className="w-8 h-8 text-[#FF7A00]" />, route: '/colleges?course=Engineering' },
    { name: 'MBA', label: 'Management', desc: 'IIMs, XLRI, and elite business management schools', icon: <TrendingUp className="w-8 h-8 text-[#FF7A00]" />, route: '/colleges?course=Management' },
    { name: 'MBBS', label: 'Medicine', desc: 'AIIMS, JIPMER, and top medical colleges', icon: <Activity className="w-8 h-8 text-[#FF7A00]" />, route: '/colleges?course=Medicine' },
    { name: 'Design', label: 'Design & Arts', desc: 'NID, NIFT, and top creative design schools', icon: <Palette className="w-8 h-8 text-[#FF7A00]" />, route: '/colleges?course=Design' },
    { name: 'Law', label: 'Legal Studies', desc: 'NLUs and premier corporate law academies', icon: <Gavel className="w-8 h-8 text-[#FF7A00]" />, route: '/colleges?course=Law' }
  ];

  const INDIAN_STATES_LIST = [
    'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'West Bengal'
  ];

  const CITIES_LIST: Record<string, string[]> = {
    'Delhi': ['New Delhi', 'Noida', 'Ghaziabad'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Noida'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur'],
  };

  return (
    <section className="py-20 bg-app-card border-y border-app-border text-left relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center gap-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-black text-app-text tracking-tight">
            Top Study <span className="text-[#FF7A00]">Disciplines</span>
          </h2>
          <p className="text-sm text-app-muted max-w-lg">
            Select a pathway to capture exclusive counseling resources, fee details, and cutoff predictions.
          </p>
        </div>

        {/* 5-Column/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {disciplines.map((disc, idx) => (
            <ScrollReveal key={disc.name} delay={idx * 0.05} duration={0.4}>
              <div
                onClick={() => setLeadModal({ label: disc.name, course: disc.label })}
                className="glass p-6 rounded-2xl border-app-border hover:border-[#FF7A00] hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full cursor-pointer group"
              >
                <div className="flex flex-col gap-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900/50 dark:bg-app-card border border-app-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {disc.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-app-text group-hover:text-[#FF7A00] transition-colors uppercase tracking-wide">
                      {disc.name}
                    </h3>
                    <p className="text-[11px] text-app-muted mt-1 leading-relaxed font-semibold">
                      {disc.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-black text-[#FF7A00] uppercase tracking-wider">
                  <span>Register Path</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── DISCIPLINE LEAD CAPTURE MODAL ── */}
      <AnimatePresence>
        {leadModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-app-bg/80 backdrop-blur-md" onClick={() => closeLead(disciplines.find(d => d.name === leadModal.label)?.route)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0F172A] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 border border-slate-200 dark:border-app-border text-left"
            >
              {/* Left panel — tags */}
              <div className="relative md:w-5/12 bg-gradient-to-br from-orange-50 to-amber-100 dark:from-[#1a1040] dark:to-[#0F172A] p-8 flex flex-col justify-between overflow-hidden shrink-0">
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#FF7A00]/20 blur-2xl" />
                <div className="flex flex-col gap-2 relative z-10 mt-2 text-xs font-black uppercase text-slate-650 dark:text-slate-350 tracking-wider">
                  {['#Fast Track', '#Scholarships', '#Top Placements', '#Expert Guidance'].map((tag, i) => (
                    <span key={i} className="block select-none" style={{ paddingLeft: `${(i % 3) * 12}px` }}>{tag}</span>
                  ))}
                </div>
                {/* Rocket svg */}
                <div className="relative z-10 flex justify-center mt-6">
                  <svg viewBox="0 0 160 180" className="w-28 h-28 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="80" cy="75" rx="20" ry="48" fill="#FF7A00"/>
                    <ellipse cx="80" cy="75" rx="14" ry="42" fill="#FFA040"/>
                    <ellipse cx="80" cy="32" rx="12" ry="14" fill="#FF5500"/>
                    <circle cx="80" cy="68" r="8" fill="white" opacity="0.9"/>
                    <circle cx="80" cy="68" r="5" fill="#1B254B"/>
                    <path d="M60 105 L52 128 L72 115 Z" fill="#FF5500"/>
                    <path d="M100 105 L108 128 L88 115 Z" fill="#FF5500"/>
                    <ellipse cx="80" cy="135" rx="9" ry="17" fill="#FFD700" opacity="0.9"/>
                  </svg>
                </div>
              </div>

              {/* Right panel — form */}
              <div className="flex-1 p-7 md:p-8 flex flex-col gap-4 relative">
                <button
                  onClick={() => closeLead(disciplines.find(d => d.name === leadModal.label)?.route)}
                  className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer border-none transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {!leadDone ? (
                  <>
                    <div>
                      <h2 className="text-base font-black text-[#FF7A00] tracking-tight uppercase leading-snug">
                        Apply for Top {leadModal.label} Colleges
                      </h2>
                      <p className="text-[10px] text-slate-400 mt-1">Get custom counselor callbacks and eligibility assessments.</p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!leadFirst || !leadMobile || !leadEmail || !leadState || !leadCity) {
                          addToast('Please fill all required parameters.', 'warning');
                          return;
                        }
                        setLeadSubmitting(true);
                        setTimeout(() => {
                          setLeadSubmitting(false);
                          setLeadDone(true);
                        }, 1400);
                      }}
                      className="flex flex-col gap-3 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <input required type="text" placeholder="First Name" value={leadFirst} onChange={e => setLeadFirst(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors" />
                        <input type="text" placeholder="Last Name" value={leadLast} onChange={e => setLeadLast(e.target.value)}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors" />
                      </div>
                      <input required type="tel" placeholder="Mobile Number" value={leadMobile} onChange={e => setLeadMobile(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors" />
                      <input required type="email" placeholder="Email Address" value={leadEmail} onChange={e => setLeadEmail(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors" />
                      <div className="relative">
                        <select required value={leadState} onChange={e => { setLeadState(e.target.value); setLeadCity(''); }}
                          className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer">
                          <option value="">Select State</option>
                          {INDIAN_STATES_LIST.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select required value={leadCity} onChange={e => setLeadCity(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-app-border bg-slate-50 dark:bg-app-card text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer">
                          <option value="">Select City</option>
                          {(CITIES_LIST[leadState] || []).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                      </div>
                      <button type="submit" disabled={leadSubmitting}
                        className="w-full py-3 mt-1.5 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer border-none disabled:opacity-60">
                        {leadSubmitting ? <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : 'Register Now'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center">
                      <ShieldCheck className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Counseling Registered!</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">An expert counselor will reach out within 24 hours with top recommendations.</p>
                    <button
                      onClick={() => closeLead(disciplines.find(d => d.name === leadModal.label)?.route)}
                      className="mt-2 px-6 py-2.5 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-black text-xs uppercase shadow-md transition-all cursor-pointer border-none"
                    >
                      Explore Colleges
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;
