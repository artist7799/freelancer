import { Link } from 'react-router-dom';
import { Trash2, Star, ShieldCheck, Compass, Plus, Sparkles, TrendingUp, DollarSign } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';
import { useColleges } from '../hooks/useColleges';

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
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md border border-app-border shrink-0">
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

// Parsing Helpers
const parseFees = (feeStr: string): number => {
  const val = parseFloat(feeStr.replace(/[^\d.]/g, ''));
  if (isNaN(val)) return 0;
  if (feeStr.includes('Lakh')) return val * 100000;
  return val;
};

const parsePlacement = (placeStr: string): number => {
  const val = parseFloat(placeStr.replace(/[^\d.]/g, ''));
  if (isNaN(val)) return 0;
  if (placeStr.includes('CPA') || placeStr.includes('CR') || placeStr.includes('Cr')) return val * 100;
  return val;
};

export const Compare = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();
  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse } = useCollegesQuery({ limit: 1000 });
  const collegesList = collegesResponse?.data?.colleges || [];

  const selectedColleges = collegesList.filter((c: any) => compareIds.includes(c.id));

  // Determine best placements
  const getBestPlacementIndex = () => {
    let maxPl = 0;
    let bestIdx = -1;
    selectedColleges.forEach((col: any, idx: number) => {
      const val = parsePlacement(col.placements);
      if (val > maxPl) {
        maxPl = val;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  // Determine highest rating
  const getBestRatingIndex = () => {
    let maxRt = 0;
    let bestIdx = -1;
    selectedColleges.forEach((col: any, idx: number) => {
      if (col.rating > maxRt) {
        maxRt = col.rating;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  const bestPlacementIdx = getBestPlacementIndex();
  const bestRatingIdx = getBestRatingIndex();

  if (selectedColleges.length === 0) {
    return (
      <div className="relative pt-36 pb-20 min-h-screen flex items-center justify-center bg-app-bg text-app-text">
        <div className="gradient-mesh opacity-80" />
        <div className="max-w-md px-6 text-center relative z-10 flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-app-card border border-app-border flex items-center justify-center text-app-muted shadow-2xl">
            <Compass className="w-8 h-8 text-[#FF7A00]" />
          </div>
          <h2 className="text-2xl font-bold font-display text-white">Comparison Dashboard Empty</h2>
          <p className="text-xs text-app-muted leading-relaxed">
            You haven't selected any campuses to compare. Browse our college catalog listings and click "Compare" to overlay placement packages and fee charts side-by-side.
          </p>
          <Link
            to="/colleges"
            className="mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9F43] text-white font-bold text-xs shadow-lg shadow-[#FF7A00]/20"
          >
            Browse Colleges Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Graph Data Configurations
  const maxTuitionFee = Math.max(...selectedColleges.map((c: any) => parseFees(c.fees)), 100000);
  const maxAveragePlacement = Math.max(...selectedColleges.map((c: any) => parsePlacement(c.placements)), 5);

  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      <div className="gradient-mesh opacity-80" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-left">
        {/* Title & Clear Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] self-start">
              <Sparkles className="w-3.5 h-3.5" />
              Side-by-Side Analysis
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
              Compare <span className="gradient-text-primary">Campuses</span>
            </h1>
            <p className="text-sm text-app-muted">
              Analyze placement packages, annual tuition fees, and ratings side-by-side (Up to 3 campuses).
            </p>
          </div>
          
          <button
            onClick={clearCompare}
            className="self-start sm:self-auto py-3 px-5 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 text-rose-450 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-transparent"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Comparison List
          </button>
        </div>

        {/* Comparison Grid Table */}
        <div className="overflow-x-auto pb-4 rounded-3xl border border-app-border glass shadow-2xl">
          <div className="min-w-[800px] grid grid-cols-12 gap-0 text-xs font-medium">
            
            {/* Headers cell */}
            <div className="col-span-3 p-6 border-r border-app-border font-bold uppercase tracking-wider text-app-muted bg-app-card flex items-center">
              Parameters
            </div>
            
            {Array.from({ length: 3 }).map((_, idx) => {
              const col = selectedColleges[idx];
              return (
                <div
                  key={idx}
                  className={`col-span-3 p-6 border-r last:border-r-0 border-app-border text-center flex flex-col items-center justify-center gap-4 min-h-[220px] ${
                    col ? 'bg-app-card' : 'bg-transparent text-app-muted/20 border-dashed border-app-border'
                  }`}
                >
                  {col ? (
                    <div className="relative w-full flex flex-col items-center gap-3">
                      {/* Delete icon */}
                      <button
                        onClick={() => removeFromCompare(col.id)}
                        className="absolute top-0 right-0 p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-none cursor-pointer"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {renderLogo(col.logo || col.id)}
                      <div>
                        <h3 className="font-extrabold text-sm text-white leading-tight line-clamp-1">{col.name}</h3>
                        <p className="text-[10px] text-app-muted mt-1">{col.location}</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/colleges"
                      className="flex flex-col items-center gap-2.5 text-app-muted hover:text-white transition-colors py-10"
                    >
                      <div className="w-11 h-11 rounded-full border border-dashed border-app-border flex items-center justify-center bg-app-card">
                        <Plus className="w-5 h-5 text-[#FF7A00]" />
                      </div>
                      <span className="font-bold text-[10px] uppercase tracking-wider">Add College</span>
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Parameter Rows */}
            {/* ROW 1: CATEGORY */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                Category Focus
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-5 border-r last:border-r-0 border-app-border text-center text-app-muted font-semibold">
                    {col ? col.category : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 2: FEES */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                Annual Fees (approx)
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-5 border-r last:border-r-0 border-app-border text-center font-extrabold text-[#FF7A00] text-sm">
                    {col ? col.fees.split(' ')[0] : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 3: PLACEMENTS */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                Average Placements
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                const isBest = idx === bestPlacementIdx;
                return (
                  <div
                    key={idx}
                    className={`col-span-3 p-5 border-r last:border-r-0 border-app-border text-center font-extrabold text-sm ${
                      col
                        ? isBest
                          ? 'bg-[#10B981]/5 text-[#10B981] border-[#10B981]/10'
                          : 'text-white'
                        : 'text-app-muted'
                    }`}
                  >
                    {col ? (
                      <span className="flex items-center justify-center gap-1.5">
                        {col.placements.split(' ')[0]}
                        {isBest && <ShieldCheck className="w-4 h-4 text-[#10B981] fill-[#10B981]/15" />}
                      </span>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 4: RANKING */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                National Ranking Tier
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-5 border-r last:border-r-0 border-app-border text-center text-app-muted font-bold">
                    {col ? col.ranking.split(' (')[0] : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 5: INFRASTRUCTURE */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card flex items-center">
                Infrastructure
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-5 border-r last:border-r-0 border-app-border text-center flex flex-wrap gap-1.5 justify-center items-center">
                    {col
                      ? col.infrastructure.slice(0, 3).map((inf: any, i: number) => (
                          <span key={i} className="px-2.5 py-1 rounded-md bg-app-card border border-app-border text-[10px] text-app-muted font-semibold">
                            {inf}
                          </span>
                        ))
                      : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 6: RATING */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                Student Rating Score
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                const isBest = idx === bestRatingIdx;
                return (
                  <div
                    key={idx}
                    className={`col-span-3 p-5 border-r last:border-r-0 border-app-border text-center font-extrabold text-sm ${
                      col
                        ? isBest
                          ? 'bg-[#F59E0B]/5 text-[#F59E0B]'
                          : 'text-white'
                        : 'text-app-muted'
                    }`}
                  >
                    {col ? (
                      <span className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-current text-[#F59E0B]" />
                        {col.rating}
                      </span>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 7: ACTION */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-5 border-r border-app-border font-extrabold text-white bg-app-card">
                Quick Action Link
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-5 border-r last:border-r-0 border-app-border text-center flex justify-center items-center">
                    {col ? (
                      <Link
                        to={`/colleges/${col.id}`}
                        className="px-5 py-2.5 rounded-xl bg-[#FF7A00] text-white font-bold text-[10px] hover:bg-[#D14B00] transition-colors shadow-lg shadow-[#FF7A00]/10"
                      >
                        View Details Profile
                      </Link>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Detailed SVG Analytics Charts */}
        {selectedColleges.length >= 2 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            
            {/* Chart 1: Tuition Fees Bar Comparison */}
            <div className="p-6 rounded-3xl glass border border-app-border shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <DollarSign className="w-5 h-5 text-[#FF7A00]" />
                <h3 className="text-base font-display font-bold text-white">Annual Tuition Fee Comparison</h3>
              </div>
              
              <div className="h-64 flex items-end justify-around border-b border-l border-app-border pb-4 px-6 relative">
                {selectedColleges.map((col: any, idx: number) => {
                  const fee = parseFees(col.fees);
                  const pct = (fee / maxTuitionFee) * 160; // Max height ~160px
                  return (
                    <div key={idx} className="flex flex-col items-center gap-3 w-1/4">
                      <div className="text-[10px] font-bold text-[#FF7A00]">
                        {col.fees.split(' ')[0]}
                      </div>
                      <div 
                        className="w-12 bg-gradient-to-t from-[#4F46E5] to-[#3B82F6] rounded-t-lg transition-all duration-500 hover:opacity-85 shadow-lg shadow-[#4F46E5]/10"
                        style={{ height: `${Math.max(pct, 15)}px` }}
                      />
                      <span className="text-[10px] text-app-muted font-bold truncate max-w-[120px] text-center" title={col.name}>
                        {col.name.split(' (')[0].split(', ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chart 2: Average Placements Packages */}
            <div className="p-6 rounded-3xl glass border border-app-border shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
                <h3 className="text-base font-display font-bold text-white">Average Placement Package (LPA)</h3>
              </div>

              <div className="h-64 flex items-end justify-around border-b border-l border-app-border pb-4 px-6 relative">
                {selectedColleges.map((col: any, idx: number) => {
                  const pl = parsePlacement(col.placements);
                  const pct = (pl / maxAveragePlacement) * 160; // Max height ~160px
                  return (
                    <div key={idx} className="flex flex-col items-center gap-3 w-1/4">
                      <div className="text-[10px] font-bold text-[#10B981]">
                        {col.placements.split(' ')[0]}
                      </div>
                      <div 
                        className="w-12 bg-gradient-to-t from-[#10B981] to-[#059669] rounded-t-lg transition-all duration-500 hover:opacity-85 shadow-lg shadow-[#10B981]/10"
                        style={{ height: `${Math.max(pct, 15)}px` }}
                      />
                      <span className="text-[10px] text-app-muted font-bold truncate max-w-[120px] text-center" title={col.name}>
                        {col.name.split(' (')[0].split(', ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ) : (
          <div className="mt-8 p-5 rounded-2xl bg-app-card border border-dashed border-app-border text-center text-xs text-app-muted font-bold">
            💡 Add at least one more college to trigger tuition fee and average package SVG graphs.
          </div>
        )}

      </div>
    </div>
  );
};

export default Compare;
