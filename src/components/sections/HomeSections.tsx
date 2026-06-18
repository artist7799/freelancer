import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
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
  Settings,
  Users,
  Coins,
  Gavel,
  Sprout,
  Atom,
  Globe,
  PawPrint,
  PenTool,
  MapPin
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
export const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const bannerImages = [
    'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&h=600&q=80', // College campus
    'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&h=600&q=80', // Campus building
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&h=600&q=80'  // Campus life
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIdx((prev) => (prev + 1) % bannerImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTagClick = (tag: string) => {
    const categoryMap: { [key: string]: string } = {
      'B.Tech': 'Engineering',
      'MBA': 'Management',
      'MBBS': 'Medicine',
      'BBA': 'Management',
      'B.Sc': 'Commerce',
      'M.Sc': 'Commerce'
    };
    const category = categoryMap[tag] || '';
    if (category) {
      navigate(`/colleges?course=${category}`);
    } else {
      navigate(`/colleges`);
    }
  };

  return (
    <section className="relative pt-24 pb-8 overflow-hidden w-full bg-app-bg">
      {/* Full Width Slanted Panel Grid Container */}
      <div className="relative w-full overflow-hidden bg-app-card flex flex-col lg:block min-h-[500px] lg:h-[500px]">
        
        {/* Left Slanted Panel: Navy/Indigo gradient */}
        <div className="relative lg:absolute lg:inset-y-0 lg:left-0 w-full lg:w-[50%] z-10 py-12 lg:py-0 px-6 sm:px-12 lg:pl-16 lg:pr-28 lg:[clip-path:polygon(0_0,100%_0,84%_100%,0_100%)] bg-gradient-to-br from-[#0e173e] via-[#101b4c] to-[#0a1130] flex flex-col justify-center min-h-[420px] lg:min-h-0">
          {/* Content Container */}
          <div className="relative z-10 flex flex-col gap-6 max-w-md">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warning/10 border border-warning/20 text-[10px] sm:text-xs font-bold text-warning w-fit"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Admission Open Batch 2026 Batch</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-white leading-[1.1]"
            >
              Explore{' '}
              <span className="text-warning text-glow">
                Colleges
              </span>{' '}
              That Fit You Best!
            </motion.h1>

            {/* Form Search Bar */}
            <motion.form
              onSubmit={handleSearchSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full mt-2"
            >
              <input
                type="text"
                placeholder="Search Colleges..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-14 py-4 rounded-xl bg-slate-950/80 border border-white/10 focus:border-warning/50 text-white placeholder-slate-400 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-warning/20 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-warning hover:bg-warning/90 transition-all text-slate-950 cursor-pointer shadow-md"
              >
                <Search className="w-4.5 h-4.5" />
              </button>
            </motion.form>

            {/* Quick Degree Search Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold text-warning/90 mt-1"
            >
              {['MBA', 'B.Tech', 'BBA', 'B.Sc', 'M.Sc', 'MBBS'].map((tag, idx, arr) => (
                <div key={tag} className="flex items-center gap-2">
                  <span 
                    onClick={() => handleTagClick(tag)}
                    className="hover:text-warning hover:underline cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                  {idx < arr.length - 1 && <span className="text-slate-500 font-medium">|</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Panel: Campus Image Slider */}
        <div className="relative lg:absolute lg:inset-y-0 lg:right-0 w-full lg:w-[62%] h-[380px] lg:h-full z-0 overflow-hidden bg-slate-950">
          {/* Layered sliding pictures with fade-in CSS transitions */}
          <div className="absolute inset-0 z-0">
            {bannerImages.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt="Elite Campus"
                className={`absolute inset-0 w-full h-full object-cover brightness-[0.7] select-none transition-opacity duration-1000 ease-in-out ${
                  idx === currentImgIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              />
            ))}
          </div>

          {/* University Logo Floating Badge */}
          <div className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-xl flex items-center gap-2 max-w-[200px] shadow-lg">
             <div className="w-8 h-8 rounded-lg bg-warning flex items-center justify-center font-black text-slate-950 text-xs">
               LPU
             </div>
             <div className="flex flex-col text-left">
               <span className="text-[10px] font-black text-white leading-tight">Lovely Professional University</span>
               <span className="text-[8px] font-bold text-warning">Admissions Batch 2026</span>
             </div>
          </div>

          {/* Bottom Dark Gradient Shadow for text contrast */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-10 pointer-events-none" />

          {/* Admissions Open Text & Bottom Stats Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col items-center gap-3">
            
            {/* Admissions Open Text */}
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white text-center tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] select-none">
              Admissions Open 2026 Batch
            </h3>

            {/* Red Stats Bar */}
            <div className="w-full bg-[#CC1F29] border-[3px] border-[#FFB200] grid grid-cols-2 md:grid-cols-4 shadow-2xl overflow-hidden rounded-sm">
              {[
                { count: '1.7 CR', label: 'INTERNATIONAL', border: 'border-r border-b md:border-b-0 border-dashed border-white/30' },
                { count: '54.75 LPA', label: 'NATIONAL', border: 'border-b md:border-r md:border-b-0 border-dashed border-white/30' },
                { count: '9000+', label: 'PLACEMENT OFFERS', border: 'border-r border-dashed border-white/30' },
                { count: '900+', label: 'COMPANY VISITED FOR RECRUITMENT', border: '' }
              ].map((stat, idx) => (
                <div key={idx} className={`p-3 sm:p-4 flex flex-col items-center justify-center text-center ${stat.border}`}>
                  <span className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight font-display">
                    {stat.count}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white tracking-wider mt-1.5 uppercase leading-snug max-w-[150px]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
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
    <section className="relative py-12 md:py-16 bg-white/[0.01] border-y border-app-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center">
          <ScrollReveal delay={0}>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-app-text tracking-tight">
                <Counter value={5000} suffix="+" />
              </span>
              <span className="text-xs md:text-sm text-app-muted font-medium">Verified Colleges</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-primary tracking-tight">
                <Counter value={2} suffix="M+" />
              </span>
              <span className="text-xs md:text-sm text-app-muted font-medium">Active Students</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-secondary tracking-tight">
                <Counter value={10000} suffix="+" />
              </span>
              <span className="text-xs md:text-sm text-app-muted font-medium">Available Scholarships</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-1">
              <span className="text-3xl md:text-4xl font-display font-extrabold text-accent tracking-tight">
                <Counter value={95} suffix="%" />
              </span>
              <span className="text-xs md:text-sm text-app-muted font-medium">Admissions Success Rate</span>
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

  return (
    <section className="py-16 max-w-7xl mx-auto px-6 overflow-hidden">
      <div className="flex flex-col items-center text-center gap-2 mb-10">
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-app-text tracking-tight">
          Choose Your Favourite <span className="text-warning">City</span>
        </h2>
        <p className="text-sm text-app-muted max-w-lg">
          Filter premier universities based on corporate headquarters and industrial zones.
        </p>
      </div>

      {/* Horizontal scrolling circular avatars container */}
      <div className="flex items-center justify-start lg:justify-center gap-6 md:gap-8 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory no-scrollbar w-full">
        {cities.map((city, idx) => (
          <div key={city.name} className="snap-start flex-shrink-0">
            <ScrollReveal delay={idx * 0.05} duration={0.4}>
              <Link
                to={`/colleges?location=${encodeURIComponent(city.name)}`}
                className="flex flex-col items-center gap-3 group focus:outline-none"
              >
                {/* Image Circle Container with Orange Border */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[3px] border-warning hover:border-warning-hover transition-all duration-300 p-0.5 shadow-md shadow-warning/10 hover:shadow-warning/35">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                    <motion.img
                      src={city.image}
                      alt={city.name}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>

                {/* City Label */}
                <span className="font-display font-bold text-xs sm:text-sm text-app-text group-hover:text-warning transition-colors tracking-wide">
                  {city.name}
                </span>
              </Link>
            </ScrollReveal>
          </div>
        ))}
      </div>
    </section>
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
      path: '/register'
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
      path: '/colleges'
    },
    {
      title: 'Education Loan',
      desc: 'Empowering Dreams, Fueling ...',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      path: '/careers'
    },
    {
      title: 'Re-Admissions',
      desc: 'College readmission services ...',
      icon: <Building className="w-5 h-5 text-white" />,
      path: '/contact'
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
                    : 'glass border-app-border bg-white dark:bg-white/[0.02]'
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
    <section className="py-20 bg-white/[0.01] border-y border-app-border">
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
                      : 'bg-white dark:bg-[#111A36] border-slate-100 dark:border-white/5'
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
      id: 'vidyashilp',
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
      id: 'iibs',
      name: 'International Institute of Business Studies (IIBS)',
      courses: 'MBA',
      location: 'Benga, Karnataka',
      rating: '8.8 /10',
      placement: '47 LPA',
      logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'bennett',
      name: 'Bennett University, Greater Noida',
      courses: 'MBA',
      location: 'Great, Uttar Pradesh',
      rating: '8.7 /10',
      placement: '1.2 CR',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'sanjay-ghodawat',
      name: 'Sanjay Ghodawat University',
      location: 'Kolha, Maharashtra',
      rating: '7.8 /10',
      placement: '15 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'xlri',
      name: 'Xavier School of Management',
      courses: 'PGDM',
      location: 'Jamsh, Jharkhand',
      rating: '8.9 /10',
      placement: '1.1 CR',
      logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'alliance',
      name: 'Alliance University Bangalore',
      courses: 'MBA',
      location: 'Benga, Karnataka',
      rating: '8 /10',
      placement: '60.1 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'lpu',
      name: 'Lovely Professional University',
      location: 'Jalan, Punjab',
      rating: '8.2 /10',
      placement: '2.5 CR',
      logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'cgc',
      name: 'Chandigarh Group of Colleges (CGC)',
      courses: 'MBA',
      location: 'Chand, Punjab',
      rating: '8.5 /10',
      placement: '53 LPA',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'its',
      name: 'I.T.S School of Management',
      courses: 'MBA',
      location: 'Ghazi, Uttar Pradesh',
      rating: '8 /10',
      placement: '30.86 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'poddar',
      name: 'Poddar International College, Jaipur',
      courses: 'MBA',
      location: 'Jaipu, Rajasthan',
      rating: '9.2 /10',
      placement: '24 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'its-professional',
      name: 'ITS College Of Professional Studies',
      location: 'Noida, Uttar Pradesh',
      rating: '9.1 /10',
      placement: '10 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'amity-noida',
      name: 'Amity University, Noida',
      courses: 'MBA',
      location: 'Noida, Uttar Pradesh',
      rating: '9.5 /10',
      placement: '62 LPA',
      logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'amity-mumbai',
      name: 'Amity University Mumbai',
      courses: 'MBA',
      location: 'Mumba, Maharashtra',
      rating: '8.9 /10',
      placement: '44 LPA',
      logo: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'medhavi',
      name: 'Medhavi Skills University, Sikkim',
      courses: 'MBA',
      location: 'Namch, Sikkim',
      rating: '8 /10',
      placement: '10 LPA',
      logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'kiet',
      name: 'KIET Deemed To Be University',
      courses: 'MBA',
      location: 'Ghazi, Uttar Pradesh',
      rating: '8.9 /10',
      placement: '90 LPA',
      logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'sage',
      name: 'SAGE University Indore',
      courses: 'MBA',
      location: 'Indor, Madhya Pradesh',
      rating: '9 /10',
      placement: '30 LPA',
      logo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=120&h=120&q=80',
    },
    {
      id: 'accman',
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
      id: 'pcu',
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

  const handlePlacementDetails = (univName: string) => {
    addToast(`Opening comprehensive placement report and salary history for ${univName}...`, 'info');
    navigate('/colleges');
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
              <div className="bg-white dark:bg-[#111A36] border border-slate-100 dark:border-white/5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.02)] flex overflow-hidden hover:shadow-lg hover:scale-[1.005] transition-all duration-300 h-full">
                
                {/* Placement Badge on the left */}
                <div className="w-[110px] sm:w-[130px] shrink-0 bg-[#223150] text-center p-3 flex flex-col justify-center items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-[#FFB200] leading-none tracking-tight">
                    {univ.placement}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider leading-snug max-w-[80px]">
                    Highest Placement
                  </span>
                </div>

                {/* Details and Actions container */}
                <div className="flex-1 p-3.5 sm:p-5 flex items-center justify-between gap-4 min-w-0">
                  
                  {/* Left: Logo & Text info */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    
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
                      <h3 className="font-display font-bold text-sm sm:text-base text-[#1B254B] dark:text-white truncate" title={univ.name}>
                        {univ.name}
                      </h3>
                      
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
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 shrink-0 w-[110px] sm:w-[130px]">
                    
                    <button
                      onClick={() => handleApplyNow(univ.name)}
                      className="border border-[#FF5E14] text-[#FF5E14] hover:bg-[#FF5E14] hover:text-white text-xs font-bold py-2 px-2.5 rounded-lg text-center cursor-pointer transition-all duration-300 leading-none"
                    >
                      Apply Now
                    </button>

                    <button
                      onClick={() => handlePlacementDetails(univ.name)}
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
    <section className="py-12 w-full bg-white dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800/10 overflow-hidden relative flex flex-col gap-8">
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
            <div
              key={idx}
              className="relative flex w-[420px] sm:w-[480px] h-[135px] sm:h-[145px] shrink-0 rounded-2xl overflow-hidden shadow-md bg-white dark:bg-[#111A36] border border-slate-100 dark:border-white/5 select-none"
            >
              {/* Left sloped panel */}
              <div className={`w-[68%] h-full ${banner.bgColor} text-white p-3 pr-8 flex flex-col justify-between [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] z-10 relative`}>
                
                {/* Header text */}
                <div className="text-left">
                  <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white">
                    MBA/PGDM ADMISSION OPEN
                  </span>
                  <div className="border-b border-white/20 my-1 w-full" />
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
                  
                  <div className="flex flex-col border-x border-white/20 px-1">
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
                <div className="absolute top-2 right-2 bg-white/95 dark:bg-slate-950/90 py-0.5 px-1.5 rounded-md text-[8px] font-black text-[#1B254B] dark:text-white border border-slate-100 shadow-sm leading-none">
                  {banner.univ}
                </div>
              </div>

            </div>
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
// SECTION 6: SCHOLARSHIPS
// ==========================================
export const ScholarshipsList = () => {
  return (
    <section className="py-20 bg-white/[0.01] border-y border-app-border">
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
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
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
                  className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-white/5 border border-transparent hover:border-app-border"
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
    <section className="py-20 bg-white/[0.01] border-y border-app-border">
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
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-app-border">
                    {serv.icon}
                  </div>
                  <h3 className="font-display font-bold text-base text-app-text">{serv.title}</h3>
                </div>
                <p className="text-xs text-app-muted leading-relaxed flex-1">{serv.desc}</p>
                <button
                  onClick={() => handleLaunchService(serv.title)}
                  className="py-2 px-4 rounded-xl bg-white/5 group-hover:bg-primary group-hover:text-white border border-app-border group-hover:border-transparent text-xs font-semibold text-app-muted transition-all self-start"
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
    <section className="py-20 bg-white/[0.01] border-y border-app-border overflow-hidden">
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
    <section className="py-20 bg-white/[0.01] border-y border-app-border">
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
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 border border-app-border hover:bg-app-card transition-all text-sm font-bold text-app-text"
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
export default Hero;
