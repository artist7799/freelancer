import { useState, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  ArrowLeft
} from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import { useCompareStore } from '../store/useCompareStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { useSavedCollegesStore } from '../store/useSavedCollegesStore';

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

const renderLogo = (logoId: string) => {
  const container = (child: React.ReactNode) => (
    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shadow-2xl border border-app-border shrink-0">
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

export const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { useCollegeQuery } = useColleges();
  const { data: college, isLoading } = useCollegeQuery(id || '');

  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();
  const { saveCollege, unsaveCollege, isSaved } = useSavedCollegesStore();
  const addToast = useGlobalStore().addToast;

  const [activeTab, setActiveTab] = useState('about');
  
  // Review form states
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState('');
  
  // Counselor callback states
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyCourse, setApplyCourse] = useState('');

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
        <p className="text-app-muted mt-2">The requested college ID does not exist in our catalog.</p>
        <Link to="/colleges" className="mt-6 inline-flex items-center gap-2 text-[#FF7A00] font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" /> Return to Catalog
        </Link>
      </div>
    );
  }


  // â”€â”€â”€ Safe field normalizers (backend may return string or array) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const toArray = (val: any): any[] => {
    if (Array.isArray(val)) return val;
    if (typeof val === 'string' && val.trim()) {
      // Try JSON first, then split by comma/newline
      try { const p = JSON.parse(val); if (Array.isArray(p)) return p; } catch {}
      return val.split(/,|\n/).map(s => s.trim()).filter(Boolean);
    }
    return [];
  };

  const safeInfrastructure = toArray(college.infrastructure).length > 0
    ? toArray(college.infrastructure)
    : ['AC Classrooms', 'Central Library', 'Sports Complex', 'Hostels', 'Cafeteria', 'Wi-Fi Campus'];

  const safeCourses = toArray(college.courses).length > 0
    ? toArray(college.courses)
    : [
        { name: `MBA - ${college.category}`, fees: college.fees || 'â‚¹2-5 Lakhs/yr', duration: '2 Years' },
        { name: `B.Tech / B.Sc`, fees: 'â‚¹1.5-3 Lakhs/yr', duration: '4 Years' },
      ];

  const safeReviews: any[] = toArray(college.reviews).filter(r => typeof r === 'object');

  const safeScholarships = toArray(college.scholarships).length > 0
    ? toArray(college.scholarships)
    : ['Merit-Based Scholarship', 'Need-Based Financial Aid', 'Sports Achievement Grant'];

  const safeHostels = toArray(college.hostels).length > 0
    ? toArray(college.hostels)
    : ['Boys Hostel', 'Girls Hostel', 'AC Rooms Available', 'Mess & Cafeteria'];

  const safeFaq: any[] = toArray(college.faq).filter(f => typeof f === 'object' && f.question);

  const safeGallery = toArray(college.gallery).filter(g => typeof g === 'string' && g.startsWith('http'));
  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
    if (!applyName || !applyEmail || !applyCourse) {
      addToast('Please complete all application fields.', 'warning');
      return;
    }
    addToast(`Successfully submitted admission query! Counselor reference ID: CM-${Math.floor(100000 + Math.random() * 900000)}`, 'success');
    setApplyName('');
    setApplyEmail('');
    setApplyCourse('');
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!revName || !revText) {
      addToast('Please input both your name and review content.', 'warning');
      return;
    }
    addToast('Review published successfully!', 'success');
    setRevName('');
    setRevText('');
  };

  const tabs = [
    { id: 'about', label: 'Overview', icon: Building },
    { id: 'courses', label: 'Courses & Fees', icon: BookOpen },
    { id: 'placements', label: 'Placements', icon: TrendingUp },
    { id: 'scholarships', label: 'Scholarships', icon: DollarSign },
    { id: 'hostels', label: 'Hostel info', icon: ShieldCheck },
    { id: 'reviews', label: 'Reviews & Gallery', icon: MessageSquare },
    { id: 'faq', label: 'FAQs', icon: HelpCircle },
  ];



  return (
    <div className="relative pt-24 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background radial effects */}
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-80 left-10 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Cover Image Section */}
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B16] via-transparent to-black/30" />
        
        {/* Back button overlay */}
        <div className="absolute top-6 left-6 z-20">
          <Link to="/colleges" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-app-border text-xs font-bold text-white hover:bg-black/60 transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Catalog
          </Link>
        </div>
      </div>

      {/* Campus Info Header Overlapping Cover */}
      <div className="mx-auto max-w-7xl px-6 relative -mt-24 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Overview & Details */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Title Block */}
            <div className="flex flex-col gap-4 text-left p-6 glass rounded-2xl border border-app-border shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {renderLogo(college.logo || college.id)}
                  <div>
                    <span className="inline-block text-[10px] px-2.5 py-0.5 rounded bg-[#4F46E5]/20 text-[#3B82F6] border border-[#3B82F6]/30 font-black uppercase tracking-wider mb-1">
                      {college.category}
                    </span>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black leading-tight text-white">
                      {college.name}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-app-muted border-t border-app-border pt-4 mt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FF7A00]" />
                  {college.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                  <b className="text-white">{college.rating} CM Rating</b> ({safeReviews.length} Verified Student Reviews)
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-app-card border border-app-border text-white font-bold">
                  <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                  {college.ranking}
                </span>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-1 border-b border-app-border overflow-x-auto pb-0.5 scrollbar-none scroll-smooth">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 focus:outline-none cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#FF7A00] text-[#FF7A00]'
                        : 'border-transparent text-app-muted hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Rendering Content Container */}
            <div className="glass p-6 sm:p-8 rounded-2xl border border-app-border text-left shadow-xl min-h-[300px]">
              
              {/* TAB: OVERVIEW */}
              {activeTab === 'about' && (
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white mb-3 flex items-center gap-2">
                      <Building className="w-5 h-5 text-[#FF7A00]" />
                      About The Institution
                    </h3>
                    <p className="text-sm text-app-muted leading-relaxed font-medium">
                      {college.about}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-display font-bold text-white mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#FF7A00]" />
                      Campus Infrastructure & Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {safeInfrastructure.map((inf: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-app-card border border-app-border text-xs text-app-muted font-bold"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#FF7A00]" />
                          {inf}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: COURSES */}
              {activeTab === 'courses' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#FF7A00]" />
                    Courses Offered & Seats Matrix
                  </h3>
                  <div className="flex flex-col gap-4">
                    {safeCourses.map((course: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-app-card border border-app-border gap-4 hover:border-app-border transition-all text-sm font-medium"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-extrabold text-white text-base">{course.name}</span>
                          <span className="text-xs text-app-muted mt-1">Available Intake Seats: <b className="text-white">{course.seats} Students</b></span>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="flex flex-col sm:text-right">
                            <span className="text-[10px] text-app-muted uppercase font-black tracking-wider">Annual Tuition Fees</span>
                            <span className="font-black text-lg text-[#FF7A00] mt-0.5">{course.fees}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PLACEMENTS */}
              {activeTab === 'placements' && (
                <div className="flex flex-col gap-8">
                  {/* placements summary box */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#10B981]/5 border border-[#10B981]/20">
                      <div>
                        <h4 className="font-bold text-white">Average CTC Package</h4>
                        <p className="text-xs text-app-muted mt-1">Average placement metrics registered across active batches.</p>
                      </div>
                      <div className="text-2xl font-black text-[#10B981] flex items-center gap-1.5 mt-4">
                        <TrendingUp className="w-6 h-6" />
                        {college.placements}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between p-5 rounded-2xl bg-[#FF7A00]/5 border border-[#FF7A00]/20 text-left">
                      <div>
                        <h4 className="font-bold text-white">Highest Package Highlight</h4>
                        <p className="text-xs text-app-muted mt-1">Stellar offers captured in recent engineering and tech placement audits.</p>
                      </div>
                      <div className="text-2xl font-black text-[#FF7A00] flex items-center gap-1.5 mt-4">
                        <Award className="w-6 h-6" />
                        {college.id === 'bennett-university' ? '1.2 CPA' : (college.id === 'sharda-university' ? '1.6 CR' : (college.id === 'iit-bombay' ? '64.5 LPA' : '52.0 LPA'))}
                      </div>
                    </div>
                  </div>

                  {/* SVG placement chart */}
                  <div className="p-5 rounded-2xl bg-app-card border border-app-border text-center">
                    <h4 className="text-sm font-bold text-white mb-4 text-left">Salary Distribution Trends (Previous Batches)</h4>
                    
                    {/* SVG GRAPH */}
                    <div className="w-full h-48 flex items-end justify-between px-6 pt-4 border-b border-l border-app-border relative">
                      <div className="absolute top-0 right-2 text-[9px] text-app-muted font-bold">LPA (Package in Lakhs)</div>
                      
                      {/* Bar 1 */}
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 bg-gradient-to-t from-[#4F46E5] to-[#3B82F6] rounded-t-lg transition-all hover:opacity-80" style={{ height: '40px' }} />
                        <span className="text-[10px] text-app-muted font-bold">2023</span>
                      </div>
                      {/* Bar 2 */}
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 bg-gradient-to-t from-[#4F46E5] to-[#3B82F6] rounded-t-lg transition-all hover:opacity-80" style={{ height: '70px' }} />
                        <span className="text-[10px] text-app-muted font-bold">2024</span>
                      </div>
                      {/* Bar 3 */}
                      <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-12 bg-gradient-to-t from-[#FF7A00] to-[#FF9F43] rounded-t-lg transition-all hover:opacity-80" style={{ height: '110px' }} />
                        <span className="text-[10px] text-app-muted font-bold">2025 (Average)</span>
                      </div>
                    </div>
                  </div>

                  {/* placement Details List */}
                  <div>
                    <h3 className="text-base font-display font-bold text-white mb-4">Top Hiring Partners</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-bold">
                      {college.placementDetails.map((det: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-app-card border border-app-border text-center flex flex-col gap-1 hover:border-app-border transition-colors"
                        >
                          <span className="text-xs text-app-muted">{det.company}</span>
                          <span className="text-sm text-white font-extrabold">{det.package}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SCHOLARSHIPS */}
              {activeTab === 'scholarships' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#FF7A00]" />
                    Scholarships, Grants, and Fee Reductions
                  </h3>
                  <div className="flex flex-col gap-4">
                    {safeScholarships.map((sch: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-app-card border border-app-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-app-border transition-all font-medium"
                      >
                        <div className="flex flex-col text-left">
                          <span className="font-extrabold text-white text-base">{sch.name}</span>
                          <span className="text-xs text-app-muted mt-1.5 leading-relaxed">Criteria eligibility: {sch.criteria}</span>
                        </div>
                        <div className="flex flex-col sm:items-end">
                          <span className="text-[10px] text-app-muted uppercase font-black tracking-wider">Total Scholarship Waiver</span>
                          <span className="font-black text-lg text-[#FF7A00] mt-0.5">{sch.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: HOSTELS */}
              {activeTab === 'hostels' && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-[#FF7A00]" />
                    On-Campus Hostels & Residential Housing
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {safeHostels.map((hos: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-app-card border border-app-border flex flex-col gap-4 hover:border-app-border transition-all font-medium text-left"
                      >
                        <div>
                          <h4 className="font-extrabold text-white text-base">{hos.type}</h4>
                          <span className="text-xs text-app-muted mt-1.5 inline-block bg-app-card px-2.5 py-1 rounded-md border border-app-border">Room Configuration: {hos.sharing}</span>
                        </div>
                        <div className="border-t border-app-border pt-3.5 flex items-center justify-between">
                          <span className="text-xs text-app-muted font-bold">Annual Fees / Charge</span>
                          <span className="font-black text-[#FF7A00] text-sm">{hos.fees}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: REVIEWS & GALLERY */}
              {activeTab === 'reviews' && (
                <div className="flex flex-col gap-8">
                  {/* Gallery */}
                  <div>
                    <h3 className="text-base font-display font-bold text-white mb-4">Life at Campus Gallery</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {safeGallery.map((url: string, idx: number) => (
                        <div key={idx} className="h-32 rounded-2xl overflow-hidden border border-app-border relative group cursor-pointer shadow-lg">
                          <img
                            src={url}
                            alt="campus life snapshot"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews Lists */}
                  <div className="border-t border-app-border pt-6">
                    <h3 className="text-base font-display font-bold text-white mb-4">Verified Student Testimonials</h3>
                    <div className="flex flex-col gap-4">
                      {safeReviews.map((rev: any, idx: number) => (
                        <div key={idx} className="p-5 rounded-2xl bg-app-card border border-app-border flex flex-col gap-3 font-medium hover:border-app-border transition-colors">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-extrabold text-white text-sm">{rev.name}</span>
                            <span className="text-app-muted font-semibold">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < rev.rating ? 'text-[#F59E0B] fill-[#F59E0B]' : 'text-white/10'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-app-muted leading-relaxed italic">
                            "{rev.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review submission Form */}
                  <form onSubmit={handleReviewSubmit} className="border-t border-app-border pt-6 flex flex-col gap-5 text-left font-medium">
                    <div>
                      <h3 className="text-base font-display font-bold text-white">Post Your Experience</h3>
                      <p className="text-xs text-app-muted mt-1">Share your experience to help future aspirants align their college research.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Your Name</label>
                        <input
                          type="text"
                          required
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-colors"
                          placeholder="e.g. Rahul Dev"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Overall Rating</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                        >
                          <option value={5}>5 Stars - Outstanding Campus</option>
                          <option value={4}>4 Stars - Good Program</option>
                          <option value={3}>3 Stars - Average</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Review Narrative</label>
                      <textarea
                        required
                        rows={4}
                        value={revText}
                        onChange={(e) => setRevText(e.target.value)}
                        className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] transition-colors resize-none"
                        placeholder="Write about academics, infrastructure, or hostels..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-3 px-6 self-start rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs shadow-lg shadow-[#FF7A00]/25 transition-all border-none cursor-pointer"
                    >
                      Publish Review
                    </button>
                  </form>
                </div>
              )}

              {/* TAB: FAQs */}
              {activeTab === 'faq' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-display font-bold text-white mb-2 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#FF7A00]" />
                    Frequently Asked Questions (FAQs)
                  </h3>
                  <div className="flex flex-col gap-3 font-medium">
                    {safeFaq.map((fq: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-app-card border border-app-border flex flex-col gap-2 hover:border-app-border transition-colors text-left"
                      >
                        <span className="font-extrabold text-sm text-white flex items-start gap-2">
                          <span className="text-[#FF7A00] font-black">Q.</span>
                          {fq.q}
                        </span>
                        <p className="text-xs sm:text-sm text-app-muted pl-5 leading-relaxed">
                          {fq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT PANEL: Sticky counselor form & CTA actions */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
            
            {/* Quick CTAs Box */}
            <div className="p-5 rounded-2xl glass border border-app-border flex flex-col gap-4 text-left shadow-xl">
              <h3 className="font-display font-bold text-lg text-white">Shortlist & Compare</h3>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={handleCompareClick}
                  className={`py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    comparing
                      ? 'bg-[#FF7A00]/20 border-[#FF7A00]/30 text-[#FF7A00]'
                      : 'border-app-border hover:bg-app-card text-app-muted hover:text-white'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  {comparing ? 'Comparing' : 'Compare'}
                </button>
                
                <button
                  onClick={handleSaveToggle}
                  className={`py-3 rounded-xl border font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    saved
                      ? 'bg-rose-500/20 border-rose-450 text-rose-400'
                      : 'border-app-border hover:bg-app-card text-app-muted hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Saved' : 'Bookmark'}
                </button>
              </div>
            </div>

            {/* Quick Callback Counselor Lead Form */}
            <div className="p-6 rounded-2xl glass border border-app-border flex flex-col gap-4 text-left shadow-xl">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Counseling Callback</h3>
                <p className="text-[11px] text-app-muted mt-1 leading-relaxed">
                  Request a verified callback session with an eligibility and scholarship evaluation counselor.
                </p>
              </div>

              <form onSubmit={handleApplySubmit} className="flex flex-col gap-3.5 text-xs font-semibold">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Aspirant's Name</label>
                  <input
                    type="text"
                    required
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-colors"
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
                    className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-colors"
                    placeholder="email@address.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Target course of study</label>
                  <select
                    required
                    value={applyCourse}
                    onChange={(e) => setApplyCourse(e.target.value)}
                    className="px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors cursor-pointer"
                  >
                    <option value="" className="bg-app-bg">Select Target Course</option>
                    {safeCourses.map((crs: any, i: number) => (
                      <option key={i} value={crs.name} className="bg-app-bg">
                        {crs.name.split(' in ')[1] || crs.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9F43] text-white font-bold text-xs shadow-lg shadow-[#FF7A00]/20 hover:opacity-95 transition-all border-none cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Free Callback</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-app-bg/80 backdrop-blur-md border-t border-app-border flex lg:hidden items-center justify-between gap-4">
        <div className="text-left font-medium">
          <p className="text-[9px] text-app-muted font-bold uppercase tracking-wider">Annual Fees</p>
          <p className="text-base font-black text-[#FF7A00]">{college.fees.split(' ')[0]}</p>
        </div>
        <button
          onClick={() => {
            const form = document.querySelector('form');
            form?.scrollIntoView({ behavior: 'smooth' });
            addToast('Complete the callback request form to receive placement stats.', 'info');
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9F43] text-white text-xs font-bold border-none transition-all cursor-pointer shadow-lg shadow-[#FF7A00]/20"
        >
          Request Callback
        </button>
      </div>
    </div>
  );
};

export default CollegeDetails;
