import { Bell, ExternalLink } from 'lucide-react';
import type { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
  onOpenDetails: (exam: Exam, activeTab?: string) => void;
}

// Logo helper for rendering custom vector SVGs for exams
const ExamLogo = ({ id }: { id: string }) => {
  switch (id) {
    case 'atma':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
          <path d="M20 40 L30 18 L40 40 Z" fill="#0284C7" />
          <circle cx="30" cy="32" r="5" fill="#F59E0B" />
          <text x="30" y="52" fill="#0369A1" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Outfit">ATMA</text>
        </svg>
      );
    case 'cuet-pg':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <path d="M18 24 C24 16, 36 16, 42 24 C36 32, 24 32, 18 24 Z" fill="#059669" opacity="0.8" />
          <circle cx="30" cy="27" r="8" fill="#3B82F6" />
          <text x="30" y="50" fill="#065F46" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CUET PG</text>
        </svg>
      );
    case 'ibsat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="56" height="56" rx="10" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
          <rect x="15" y="12" width="12" height="12" fill="#EA580C" rx="2" />
          <rect x="33" y="12" width="12" height="12" fill="#0284C7" rx="2" />
          <rect x="15" y="30" width="12" height="12" fill="#0284C7" rx="2" />
          <rect x="33" y="30" width="12" height="12" fill="#EA580C" rx="2" />
          <text x="30" y="52" fill="#1E293B" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Outfit">IBSAT</text>
        </svg>
      );
    case 'cat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2" />
          <path d="M15 35 C20 20, 40 20, 45 35" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
          <path d="M22 28 A3 3 0 1 1 16 28 A3 3 0 1 1 22 28 Z" fill="#2563EB" />
          <path d="M44 28 A3 3 0 1 1 38 28 A3 3 0 1 1 44 28 Z" fill="#2563EB" />
          <text x="30" y="50" fill="#1E3A8A" fontSize="10" fontWeight="950" textAnchor="middle" fontFamily="Outfit">CAT</text>
        </svg>
      );
    case 'npat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 H50 V34 C50 44, 30 54, 30 54 C30 54, 10 44, 10 34 Z" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
          <path d="M20 20 L30 14 L40 20 V34 C40 40, 30 46, 30 46 C30 46, 20 40, 20 34 Z" fill="#0D9488" opacity="0.15" />
          <text x="30" y="32" fill="#0F766E" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NMIMS</text>
          <text x="30" y="44" fill="#0F766E" fontSize="8" fontWeight="800" textAnchor="middle" fontFamily="Outfit">NPAT</text>
        </svg>
      );
    case 'pu-cet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <path d="M22 20 H38 V36 C38 40, 30 44, 30 44 C30 44, 22 40, 22 36 Z" fill="#DC2626" />
          <path d="M26 26 L30 22 L34 26" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="32" r="3" fill="white" />
          <text x="30" y="52" fill="#991B1B" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">PU CET</text>
        </svg>
      );
    case 'wbjee':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
          <path d="M30 15 L45 25 V40 L30 50 L15 40 V25 Z" stroke="#16A34A" strokeWidth="1.5" />
          <circle cx="30" cy="32.5" r="7" fill="#EAB308" />
          <text x="30" y="51" fill="#14532D" fontSize="7" fontWeight="950" textAnchor="middle" fontFamily="Outfit">WBJEE</text>
        </svg>
      );
    case 'clat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
          <path d="M20 22 H40" stroke="#7C3AED" strokeWidth="2" />
          <path d="M30 22 V42" stroke="#7C3AED" strokeWidth="2" />
          {/* Scale left */}
          <path d="M22 22 L20 32 H28 L26 22 Z" fill="#7C3AED" opacity="0.3" />
          <path d="M18 32 H30" stroke="#7C3AED" strokeWidth="1.5" />
          {/* Scale right */}
          <path d="M38 22 L36 32 H44 L42 22 Z" fill="#7C3AED" opacity="0.3" />
          <path d="M34 32 H46" stroke="#7C3AED" strokeWidth="1.5" />
          <text x="30" y="51" fill="#5B21B6" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CLAT</text>
        </svg>
      );
    case 'mat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#ECFDF5" stroke="#059669" strokeWidth="2" />
          <rect x="18" y="16" width="24" height="24" rx="3" fill="#059669" />
          <circle cx="30" cy="28" r="6" fill="#F59E0B" />
          <text x="30" y="51" fill="#065F46" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Outfit">MAT</text>
        </svg>
      );
    case 'xat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12 H48 V38 L30 52 L12 38 Z" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M30 18 L34 26 L43 27 L36 33 L38 42 L30 37 L22 42 L24 33 L17 27 L26 26 Z" fill="#1D4ED8" />
          <text x="30" y="51" fill="#1E3A8A" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">XAT EXAM</text>
        </svg>
      );
    case 'cmat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          <circle cx="24" cy="25" r="9" stroke="#3B82F6" strokeWidth="2" fill="none" />
          <circle cx="36" cy="25" r="9" stroke="#EA580C" strokeWidth="2" fill="none" />
          <text x="30" y="49" fill="#78350F" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CMAT</text>
        </svg>
      );
    case 'snap':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
          <path d="M20 22 C22 18, 38 18, 40 22 C35 34, 25 34, 20 22 Z" fill="#9333EA" />
          <path d="M30 22 L30 40" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
          <text x="30" y="51" fill="#581C87" fontSize="9" fontWeight="950" textAnchor="middle" fontFamily="Outfit">SNAP</text>
        </svg>
      );
    default:
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F1F5F9" stroke="#475569" strokeWidth="2" />
          <text x="30" y="35" fill="#475569" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="Outfit">EXAM</text>
        </svg>
      );
  }
};

const formatDate = (dateStr: string) => {
  return dateStr.replace(/-/g, '.');
};

export const ExamCard = ({ exam, onOpenDetails }: ExamCardProps) => {
  const modeLabel = exam.mode === 'both' ? 'online & offline both' : exam.mode || 'online';

  return (
    <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group relative text-left">
      
      {/* Upper Grid Area: Left Logo + Right Title / Action Buttons */}
      <div className="flex gap-4 items-start w-full">
        {/* Left Side: Logo & Status pill */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="w-16 h-16 bg-slate-50 dark:bg-app-card rounded-xl border border-slate-100 dark:border-app-border flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300">
            <ExamLogo id={exam.id} />
          </div>
          {/* Status pill (online / offline / both) */}
          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border tracking-wider text-center w-full select-none ${
            exam.mode === 'offline'
              ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
              : exam.mode === 'both'
              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
              : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
          }`}>
            {modeLabel}
          </span>
        </div>

        {/* Right Side: Title & Action Buttons */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          <div>
            <h3 className="font-display font-extrabold text-lg text-slate-850 dark:text-white leading-tight truncate group-hover:text-[#FF7A00] transition-colors duration-300">
              {exam.name}
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold leading-normal mt-0.5 line-clamp-1">
              {exam.fullName}
            </p>
          </div>

          {/* Side-by-side orange Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onOpenDetails(exam, 'Overview')}
              className="flex items-center gap-1.5 bg-[#FF7A00] hover:bg-[#E06C00] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-orange-500/10 cursor-pointer border-none"
            >
              <Bell className="w-3.5 h-3.5" />
              Exam Alerts
            </button>
            <a
              href="https://arunanandedtech.org/register"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-[#FF7A00] hover:bg-[#E06C00] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-orange-500/10 cursor-pointer border-none"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Register Now
            </a>
          </div>
        </div>
      </div>

      {/* Center Row: Three Statistics Columns (Dates) */}
      <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-app-border pt-4 mt-4 text-center">
        <div className="flex flex-col text-left pl-1">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Application Date
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
            {formatDate(exam.registrationDeadline)}
          </span>
        </div>
        <div className="flex flex-col text-left pl-1 border-l border-slate-150 dark:border-app-border">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Examination Date
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
            {formatDate(exam.date)}
          </span>
        </div>
        <div className="flex flex-col text-left pl-1 border-l border-slate-150 dark:border-app-border">
          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Result
          </span>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
            {exam.resultDate ? formatDate(exam.resultDate) : 'TBD'}
          </span>
        </div>
      </div>

      {/* Bottom Row: Inline Tabs Navigation links */}
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-app-border pt-3.5 mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
        <button
          onClick={() => onOpenDetails(exam, 'Overview')}
          className="hover:text-[#FF7A00] transition-colors cursor-pointer"
        >
          Overview
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => onOpenDetails(exam, 'Exam Date')}
          className="hover:text-[#FF7A00] transition-colors cursor-pointer"
        >
          Exam Date
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => onOpenDetails(exam, 'Syllabus')}
          className="hover:text-[#FF7A00] transition-colors cursor-pointer"
        >
          Syllabus
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => onOpenDetails(exam, 'Sample Papers')}
          className="hover:text-[#FF7A00] transition-colors cursor-pointer"
        >
          Sample Papers
        </button>
      </div>

    </div>
  );
};

export default ExamCard;
