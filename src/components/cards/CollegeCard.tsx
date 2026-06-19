import { Link } from 'react-router-dom';
import { MapPin, Star, Send, Heart, GitCompare } from 'lucide-react';
import type { College } from '../../types';
import type { MouseEvent } from 'react';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useSavedCollegesStore } from '../../store/useSavedCollegesStore';
import { useCompareStore } from '../../store/useCompareStore';

// SVGs FOR CRISP VECTOR LOGOS
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

const renderLogo = (logoId: string) => {
  const container = (child: React.ReactNode) => (
    <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center p-1 shrink-0 shadow-sm border border-slate-200">
      {child}
    </div>
  );
  switch (logoId) {
    case 'iit-bombay': return container(<IITBLogo />);
    case 'iim-bangalore': return container(<IIMBLogo />);
    case 'aiims-delhi': return container(<AIIMSLogo />);
    case 'kr-mangalam': return container(<KRMULogo />);
    case 'great-lakes': return container(<GreatLakesLogo />);
    case 'vydehi-medical': return container(<VydehiLogo />);
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
    default:
      return container(<JIMSLogo />);
  }
};

interface CollegeCardProps {
  college: College;
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  const addToast = useGlobalStore().addToast;
  const { saveCollege, unsaveCollege, isSaved } = useSavedCollegesStore();
  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();

  const handleApplyClick = (e: MouseEvent) => {
    e.preventDefault();
    addToast(`Successfully initialized admission application for ${college.name}!`, 'success');
  };

  const handleSaveToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSaved(college.id)) {
      unsaveCollege(college.id);
    } else {
      saveCollege(college.id);
    }
  };

  const handleCompareToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing(college.id)) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college.id);
    }
  };

  // Extract numeric packages for display
  const highestPkg = college.id === 'bennett-university' ? '1.2 CPA' : (college.id === 'sharda-university' ? '1.6 CR' : (college.id === 'iit-bombay' ? '64.5 LPA' : '52.0 LPA'));
  const averagePkg = college.placements.split(' ')[0] || '10.0 LPA';

  return (
    <div className="bg-white dark:bg-app-card border border-slate-150 dark:border-app-border rounded-2xl overflow-hidden flex flex-col group h-full hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 relative text-left">
      
      {/* Yellow Admission open banner */}
      <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-slate-900 text-[10px] font-black py-1.5 px-3 flex flex-wrap items-center justify-between gap-1 leading-none shadow-inner select-none">
        <span className="uppercase tracking-wider">MBA Admission Open</span>
        <span className="bg-app-bg/10 px-1.5 py-0.5 rounded font-bold text-[9px]">Batch 2026</span>
        <div className="flex items-center gap-1.5 font-bold">
          <span>{highestPkg} <span className="font-normal opacity-90">Highest</span></span>
          <span className="opacity-40">|</span>
          <span>600+ <span className="font-normal opacity-90">Recruiters</span></span>
          <span className="opacity-40">|</span>
          <span>{averagePkg} <span className="font-normal opacity-90">Avg</span></span>
        </div>
      </div>

      {/* Cover Image & Rating Badge */}
      <div className="relative h-48 overflow-hidden">
        {/* Save Toggle Overlay */}
        <button
          onClick={handleSaveToggle}
          className={`absolute top-3 left-3 z-30 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isSaved(college.id)
              ? 'bg-rose-500/90 border-rose-400 text-white shadow-lg shadow-rose-500/30'
              : 'bg-slate-900/60 border-app-border text-white/90 hover:bg-slate-900/80 hover:text-white'
          } cursor-pointer`}
          title={isSaved(college.id) ? "Unsave College" : "Save College"}
        >
          <Heart className={`w-3.5 h-3.5 ${isSaved(college.id) ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Compare Toggle Overlay */}
        <button
          onClick={handleCompareToggle}
          className={`absolute top-3 left-12 z-30 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isComparing(college.id)
              ? 'bg-primary border-primary-hover text-white shadow-lg shadow-primary/30'
              : 'bg-slate-900/60 border-app-border text-white/90 hover:bg-slate-900/80 hover:text-white'
          } cursor-pointer`}
          title={isComparing(college.id) ? "Remove from Compare" : "Add to Compare"}
        >
          <GitCompare className="w-3.5 h-3.5" />
        </button>

        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-app-border text-xs font-semibold text-white">
          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
          <span>{college.rating} CM Rating</span>
        </div>
        
        {/* Overlapping logo container */}
        <div className="absolute -bottom-7 left-5 z-20">
          {renderLogo(college.logo || college.id)}
        </div>
      </div>

      {/* Info & Metrics */}
      <div className="p-5 pt-9 flex-1 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1 text-[10px] font-black text-[#FF5E14] uppercase tracking-wider mb-1">
            <span className="bg-[#FF5E14]/10 px-2 py-0.5 rounded">
              {college.ranking.split(' in ')[0] || '#1 in India'}
            </span>
          </div>
          
          <h3 className="font-display font-extrabold text-base text-slate-850 dark:text-white leading-tight group-hover:text-[#FF5E14] transition-colors duration-300 text-left line-clamp-1" title={college.name}>
            {college.name}
          </h3>
          
          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-1 text-left">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{college.location}</span>
          </div>
        </div>

        {/* High vs Avg Placement Stat box */}
        <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 dark:bg-app-card rounded-xl border border-slate-100 dark:border-app-border text-xs">
          <div className="flex flex-col text-left">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Highest Package</span>
            <span className="text-[#FF5E14] font-black text-xs sm:text-sm mt-0.5">{highestPkg}</span>
          </div>
          <div className="flex flex-col text-left border-l border-slate-200 dark:border-app-border pl-3">
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Average Package</span>
            <span className="text-slate-800 dark:text-slate-200 font-extrabold text-xs sm:text-sm mt-0.5">{averagePkg}</span>
          </div>
        </div>

        {/* Detailed Course fee list rows */}
        <ul className="flex flex-col gap-1.5 border-t border-slate-100 dark:border-app-border pt-3 mb-2 text-[11px] text-slate-500 dark:text-slate-400">
          {college.courses.slice(0, 2).map((course, i) => (
            <li key={i} className="flex justify-between items-center text-left">
              <span className="font-semibold truncate max-w-[140px]" title={course.name}>
                {course.name.split(' in ')[1] || course.name.split(' (')[0] || course.name}
              </span>
              <span className="font-extrabold text-slate-850 dark:text-slate-200 whitespace-nowrap">
                {course.fees} <span className="font-normal text-slate-400 dark:text-slate-500">(1st Yr Fees)</span>
              </span>
            </li>
          ))}
        </ul>

        {/* Button Actions */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={handleApplyClick}
            className="py-2.5 rounded-lg bg-[#FF5E14] hover:bg-[#D14B00] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-[#FF5E14]/15 active:scale-95 transition-all border-none cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Apply Now</span>
          </button>
          
          <Link
            to={`/colleges/${college.id}`}
            className="py-2.5 rounded-lg border border-slate-250 dark:border-app-border hover:border-slate-350 hover:bg-slate-50 dark:hover:bg-app-card text-center text-xs font-bold text-slate-700 dark:text-slate-200 transition-all active:scale-95 bg-transparent"
          >
            College Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CollegeCard;
