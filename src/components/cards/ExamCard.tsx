import { Bell, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
  onOpenDetails?: (exam: Exam, activeTab?: string) => void;
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
    case 'jee-main':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
          <path d="M20 40 L30 18 L40 40 Z" fill="#3B82F6" />
          <polygon points="30,22 33,28 39,28 34,32 36,38 30,34 24,38 26,32 21,28 27,28" fill="#F59E0B" />
          <text x="30" y="51" fill="#1E40AF" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">JEE MAIN</text>
        </svg>
      );
    case 'jee-advanced':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EEF2F6" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M18 20 H42 V38 C42 44, 30 50, 30 50 C30 50, 18 44, 18 38 Z" fill="#1E3A8A" opacity="0.1" />
          <path d="M20 40 L30 20 L40 40 Z" fill="#1E3A8A" />
          <path d="M24 40 L30 28 L36 40 Z" fill="#F59E0B" />
          <text x="30" y="51" fill="#1E3A8A" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Outfit">JEE ADV</text>
        </svg>
      );
    case 'gate':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
          <path d="M18 25 L30 18 L42 25 L30 32 Z" fill="#4F46E5" />
          <path d="M22 28 V38 C22 42, 38 42, 38 38 V28" stroke="#4F46E5" strokeWidth="2" fill="none" />
          <rect x="37" y="24" width="2" height="12" fill="#F59E0B" />
          <circle cx="38" cy="36" r="2" fill="#F59E0B" />
          <text x="30" y="51" fill="#3730A3" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">GATE</text>
        </svg>
      );
    case 'bitsat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="2" />
          <path d="M30 15 L42 27 L30 39 L18 27 Z" fill="#8B5CF6" opacity="0.2" />
          <polygon points="30,18 38,27 30,36 22,27" fill="#8B5CF6" />
          <circle cx="30" cy="27" r="4" fill="#F59E0B" />
          <text x="30" y="51" fill="#5B21B6" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">BITSAT</text>
        </svg>
      );
    case 'srmjeee':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
          <path d="M30 16 C35 24, 42 28, 42 34 C42 40, 36 44, 30 44 C24 44, 18 40, 18 34 C18 28, 25 24, 30 16 Z" fill="#0D9488" opacity="0.2" />
          <path d="M30 22 C33 28, 38 30, 38 34 C38 38, 34 40, 30 40 C26 40, 22 38, 22 34 C22 30, 27 28, 30 22 Z" fill="#0D9488" />
          <text x="30" y="51" fill="#0F766E" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">SRMJEEE</text>
        </svg>
      );
    case 'ipu-cet-bca':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
          <rect x="18" y="20" width="24" height="16" rx="2" fill="#10B981" opacity="0.2" stroke="#10B981" strokeWidth="1.5" />
          <path d="M26 36 L24 42 H36 L34 36" stroke="#10B981" strokeWidth="2" />
          <path d="M23 25 H37" stroke="#10B981" strokeWidth="1.5" />
          <text x="30" y="51" fill="#065F46" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Outfit">IPU BCA</text>
        </svg>
      );
    case 'nimcet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2" />
          <circle cx="30" cy="22" r="4" fill="#F43F5E" />
          <circle cx="22" cy="34" r="4" fill="#F43F5E" />
          <circle cx="38" cy="34" r="4" fill="#F43F5E" />
          <line x1="30" y1="22" x2="22" y2="34" stroke="#F43F5E" strokeWidth="2" />
          <line x1="30" y1="22" x2="38" y2="34" stroke="#F43F5E" strokeWidth="2" />
          <line x1="22" y1="34" x2="38" y2="34" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="30" y="51" fill="#9F1239" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NIMCET</text>
        </svg>
      );
    case 'christ-bca':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
          <path d="M18 20 H42 V38 C42 44, 30 50, 30 50 C30 50, 18 44, 18 38 Z" stroke="#7C3AED" strokeWidth="2" fill="#7C3AED" opacity="0.15" />
          <path d="M25 28 L30 25 L35 28 V38 L30 42 L25 38 Z" fill="#7C3AED" />
          <circle cx="30" cy="33" r="3" fill="#F59E0B" />
          <text x="30" y="51" fill="#5B21B6" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CHRIST</text>
        </svg>
      );
    case 'ca-foundation':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <path d="M18 22 H42" stroke="#D97706" strokeWidth="2" />
          <path d="M30 22 V42" stroke="#D97706" strokeWidth="2" />
          <path d="M22 42 H38" stroke="#D97706" strokeWidth="2" />
          <path d="M20 32 C25 32, 28 28, 28 25" stroke="#D97706" strokeWidth="1.5" />
          <path d="M40 32 C35 32, 32 28, 32 25" stroke="#D97706" strokeWidth="1.5" />
          <text x="30" y="51" fill="#78350F" fontSize="8.5" fontWeight="950" textAnchor="middle" fontFamily="Outfit">CA FD</text>
        </svg>
      );
    case 'cseet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
          <polygon points="30,15 34,22 42,22 36,28 38,36 30,31 22,36 24,28 18,22 26,22" fill="#EA580C" opacity="0.25" />
          <path d="M20 25 H40 V35 H20 Z" fill="#EA580C" />
          <circle cx="30" cy="30" r="3" fill="#FFFBEB" />
          <text x="30" y="51" fill="#9A3412" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CSEET</text>
        </svg>
      );
    case 'cma-foundation':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FAF7F5" stroke="#854D0E" strokeWidth="2" />
          <rect x="20" y="18" width="20" height="24" rx="2" fill="#854D0E" opacity="0.15" stroke="#854D0E" strokeWidth="1.5" />
          <line x1="24" y1="24" x2="36" y2="24" stroke="#854D0E" strokeWidth="1.5" />
          <line x1="24" y1="30" x2="36" y2="30" stroke="#854D0E" strokeWidth="1.5" />
          <line x1="24" y1="36" x2="36" y2="36" stroke="#854D0E" strokeWidth="1.5" />
          <text x="30" y="51" fill="#713F12" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">CMA FD</text>
        </svg>
      );
    case 'cuet-ug-commerce':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDFA" stroke="#0D9488" strokeWidth="2" />
          <rect x="18" y="24" width="6" height="16" fill="#0D9488" />
          <rect x="27" y="18" width="6" height="22" fill="#0D9488" />
          <rect x="36" y="28" width="6" height="12" fill="#0D9488" />
          <path d="M15 40 H45" stroke="#F59E0B" strokeWidth="2" />
          <text x="30" y="51" fill="#0F766E" fontSize="7" fontWeight="950" textAnchor="middle" fontFamily="Outfit">CUET COM</text>
        </svg>
      );
    case 'ailet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F5F3FF" stroke="#7C3AED" strokeWidth="2" />
          <rect x="22" y="18" width="16" height="24" fill="#7C3AED" opacity="0.2" />
          <line x1="26" y1="18" x2="26" y2="42" stroke="#7C3AED" strokeWidth="2" />
          <line x1="34" y1="18" x2="34" y2="42" stroke="#7C3AED" strokeWidth="2" />
          <line x1="18" y1="42" x2="42" y2="42" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="18" x2="40" y2="18" stroke="#7C3AED" strokeWidth="2" />
          <text x="30" y="51" fill="#5B21B6" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">AILET</text>
        </svg>
      );
    case 'lsat-india':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FAF5FF" stroke="#8B5CF6" strokeWidth="2" />
          <circle cx="30" cy="30" r="20" stroke="#8B5CF6" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M22 25 L38 35" stroke="#8B5CF6" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M38 25 L22 35" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
          <text x="30" y="51" fill="#5B21B6" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">LSAT IND</text>
        </svg>
      );
    case 'mhcet-law':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EFF6FF" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M20 20 H40 V35 C40 42, 30 48, 30 48 C30 48, 20 42, 20 35 Z" fill="#1D4ED8" opacity="0.15" />
          <path d="M26 26 L30 22 L34 26" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="22" x2="30" y2="38" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="30" cy="32" r="3" fill="#F59E0B" />
          <text x="30" y="51" fill="#1E3A8A" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">MH LAW</text>
        </svg>
      );
    case 'slat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
          <circle cx="30" cy="27" r="10" stroke="#9333EA" strokeWidth="2" fill="#9333EA" opacity="0.1" />
          <path d="M30 12 V18" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M30 36 V42" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M15 27 H21" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <path d="M39 27 H45" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
          <text x="30" y="51" fill="#581C87" fontSize="8" fontWeight="950" textAnchor="middle" fontFamily="Outfit">SLAT</text>
        </svg>
      );
    case 'cuet-ug-arts':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
          <path d="M22 35 C22 25, 38 25, 38 35 Z" fill="#D97706" opacity="0.2" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="26" cy="27" r="3" fill="#3B82F6" />
          <circle cx="34" cy="27" r="3" fill="#10B981" />
          <circle cx="30" cy="33" r="3" fill="#EC4899" />
          <text x="30" y="51" fill="#78350F" fontSize="7" fontWeight="950" textAnchor="middle" fontFamily="Outfit">CUET ART</text>
        </svg>
      );
    case 'tissnet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
          <path d="M30 18 C30 18, 38 24, 38 32 C38 38, 34 42, 30 42 C26 42, 22 38, 22 32 C22 24, 30 18, 30 18 Z" fill="#16A34A" opacity="0.2" />
          <path d="M30 24 V42" stroke="#16A34A" strokeWidth="2" />
          <path d="M26 30 C30 30, 32 28, 34 26" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="30" y="51" fill="#14532D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">TISSNET</text>
        </svg>
      );
    case 'pubdet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
          <rect x="22" y="20" width="16" height="20" fill="#475569" opacity="0.2" />
          <line x1="30" y1="20" x2="30" y2="40" stroke="#475569" strokeWidth="2" />
          <line x1="22" y1="28" x2="38" y2="28" stroke="#475569" strokeWidth="1.5" />
          <text x="30" y="51" fill="#334155" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">PUBDET</text>
        </svg>
      );
    case 'hsee':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
          <circle cx="30" cy="27" r="11" stroke="#DC2626" strokeWidth="2" fill="#DC2626" opacity="0.15" />
          <line x1="19" y1="27" x2="41" y2="27" stroke="#DC2626" strokeWidth="1.5" />
          <line x1="30" y1="16" x2="30" y2="38" stroke="#DC2626" strokeWidth="1.5" />
          <text x="30" y="51" fill="#991B1B" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">HSEE</text>
        </svg>
      );
    case 'rie-cee':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
          <path d="M18 24 L30 16 L42 24 L30 32 Z" fill="#DB2777" />
          <path d="M22 27 V38 C22 41, 38 41, 38 38 V27" stroke="#DB2777" strokeWidth="2" fill="none" />
          <circle cx="30" cy="27" r="4" fill="#F59E0B" />
          <text x="30" y="51" fill="#9D174D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">RIE CEE</text>
        </svg>
      );
    case 'du-bed':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF5F5" stroke="#9B1C1C" strokeWidth="2" />
          <path d="M18 20 H42 V38 C42 44, 30 50, 30 50 C30 50, 18 44, 18 38 Z" fill="#9B1C1C" opacity="0.15" />
          <polygon points="30,22 34,31 43,31 36,37 38,46 30,41 22,46 24,37 17,31 26,31" fill="#9B1C1C" />
          <text x="30" y="51" fill="#7F1D1D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">DU B.ED</text>
        </svg>
      );
    case 'bhu-bed':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFFDF0" stroke="#B45309" strokeWidth="2" />
          <path d="M30 18 C33 24, 38 27, 38 33 C38 38, 34 40, 30 40 C26 40, 22 38, 22 33 C22 27, 27 24, 30 18 Z" fill="#B45309" opacity="0.15" />
          <path d="M30 25 C32 29, 35 31, 35 34 C35 37, 32 38, 30 38 C28 38, 25 37, 25 34 C25 31, 28 29, 30 25 Z" fill="#B45309" />
          <text x="30" y="51" fill="#78350F" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Outfit">BHU B.ED</text>
        </svg>
      );
    case 'nata':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0F9FF" stroke="#0369A1" strokeWidth="2" />
          <path d="M18 42 L30 18 L42 42" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="24" y1="34" x2="36" y2="34" stroke="#0369A1" strokeWidth="2" />
          <circle cx="30" cy="18" r="3" fill="#F59E0B" />
          <text x="30" y="51" fill="#075985" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NATA</text>
        </svg>
      );
    case 'jee-main-paper2':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          <rect x="18" y="24" width="24" height="12" fill="#0F172A" opacity="0.1" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="24" y1="24" x2="24" y2="36" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="30" y1="24" x2="30" y2="36" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="36" y1="24" x2="36" y2="36" stroke="#0F172A" strokeWidth="1.5" />
          <text x="30" y="51" fill="#0F172A" fontSize="6.5" fontWeight="950" textAnchor="middle" fontFamily="Outfit">JEE B.ARCH</text>
        </svg>
      );
    case 'aat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
          <polygon points="18,42 30,18 42,42" stroke="#4F46E5" strokeWidth="2" fill="#4F46E5" opacity="0.15" />
          <path d="M22 36 L30 20 L38 36 Z" fill="#4F46E5" />
          <text x="30" y="51" fill="#3730A3" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">AAT</text>
        </svg>
      );
    case 'neet-mds':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#ECFEFF" stroke="#0891B2" strokeWidth="2" />
          <rect x="27" y="16" width="6" height="28" rx="3" fill="#0891B2" />
          <rect x="16" y="27" width="28" height="6" rx="3" fill="#0891B2" />
          <circle cx="30" cy="30" r="8" fill="#ECFEFF" stroke="#F59E0B" strokeWidth="2" />
          <text x="30" y="51" fill="#0E7490" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NEET MDS</text>
        </svg>
      );
    case 'neet-ug-dental':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#EFF6FF" stroke="#059669" strokeWidth="2" />
          <rect x="28" y="15" width="4" height="30" fill="#059669" />
          <rect x="15" y="28" width="30" height="4" fill="#059669" />
          <circle cx="30" cy="30" r="10" fill="#EFF6FF" opacity="0.3" />
          <circle cx="30" cy="30" r="4" fill="#F59E0B" />
          <text x="30" y="51" fill="#065F46" fontSize="7" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NEET BDS</text>
        </svg>
      );
    case 'aiims-dental':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FEF2F2" stroke="#991B1B" strokeWidth="2" />
          <path d="M20 20 H40 V35 C40 42, 30 48, 30 48 C30 48, 20 42, 20 35 Z" fill="#991B1B" opacity="0.15" />
          <rect x="28" y="20" width="4" height="20" fill="#991B1B" />
          <rect x="20" y="28" width="20" height="4" fill="#991B1B" />
          <text x="30" y="51" fill="#7F1D1D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">AIIMS</text>
        </svg>
      );
    case 'jipmer-dental':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDF4" stroke="#0284C7" strokeWidth="2" />
          <rect x="28" y="16" width="4" height="28" fill="#0284C7" />
          <rect x="16" y="28" width="28" height="4" fill="#0284C7" />
          <path d="M22 22 L38 38" stroke="#F59E0B" strokeWidth="2" />
          <text x="30" y="51" fill="#0369A1" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">JIPMER</text>
        </svg>
      );
    case 'icar-aieea':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDF4" stroke="#15803D" strokeWidth="2" />
          <path d="M24 35 C24 28, 30 25, 30 20 C30 25, 36 28, 36 35 Z" fill="#15803D" opacity="0.25" />
          <path d="M30 15 V42" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="30" cy="22" r="3" fill="#F59E0B" />
          <circle cx="30" cy="30" r="3" fill="#F59E0B" />
          <text x="30" y="51" fill="#14532D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">ICAR</text>
        </svg>
      );
    case 'mp-pat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F2FBF2" stroke="#16A34A" strokeWidth="2" />
          <path d="M30 18 C30 18, 36 24, 36 32 C36 38, 30 42, 30 42 C30 42, 24 38, 24 32 C24 24, 30 18, 30 18 Z" fill="#16A34A" opacity="0.2" />
          <circle cx="30" cy="32" r="5" fill="#F59E0B" />
          <text x="30" y="51" fill="#14532D" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">MP PAT</text>
        </svg>
      );
    case 'upcatet':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#ECFDF5" stroke="#047857" strokeWidth="2" />
          <path d="M30 15 C33 22, 38 25, 38 33 C38 38, 34 40, 30 40 C26 40, 22 38, 22 33 C22 25, 27 22, 30 15 Z" fill="#047857" opacity="0.2" />
          <path d="M30 25 V40" stroke="#047857" strokeWidth="2" />
          <circle cx="30" cy="22" r="3" fill="#F59E0B" />
          <text x="30" y="51" fill="#064E3B" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Outfit">UPCATET</text>
        </svg>
      );
    case 'bihar-ugeac-agri':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#F0FDF4" stroke="#059669" strokeWidth="2" />
          <path d="M22 36 C22 28, 30 25, 30 20 C30 25, 38 28, 38 36 Z" fill="#059669" opacity="0.2" stroke="#059669" strokeWidth="1.5" />
          <circle cx="30" cy="25" r="4" fill="#F59E0B" />
          <text x="30" y="51" fill="#064E3B" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">BCECE</text>
        </svg>
      );
    case 'uceed':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF1F2" stroke="#E11D48" strokeWidth="2" />
          <rect x="22" y="22" width="16" height="16" stroke="#E11D48" strokeWidth="2" fill="#E11D48" opacity="0.15" />
          <line x1="22" y1="22" x2="38" y2="38" stroke="#E11D48" strokeWidth="1.5" />
          <line x1="38" y1="22" x2="22" y2="38" stroke="#E11D48" strokeWidth="1.5" />
          <text x="30" y="51" fill="#881337" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">UCEED</text>
        </svg>
      );
    case 'nid-dat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FDF2F8" stroke="#DB2777" strokeWidth="2" />
          <circle cx="25" cy="25" r="8" stroke="#DB2777" strokeWidth="1.5" fill="none" />
          <circle cx="35" cy="33" r="8" stroke="#DB2777" strokeWidth="1.5" fill="none" />
          <line x1="25" y1="25" x2="35" y2="33" stroke="#F59E0B" strokeWidth="2" />
          <text x="30" y="51" fill="#9D174D" fontSize="7.5" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NID DAT</text>
        </svg>
      );
    case 'nift-gcat':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF5F5" stroke="#E11D48" strokeWidth="2" />
          <path d="M22 24 L30 18 L38 24 L30 40 Z" fill="#E11D48" opacity="0.15" stroke="#E11D48" strokeWidth="1.5" />
          <line x1="30" y1="18" x2="30" y2="42" stroke="#E11D48" strokeWidth="2.5" />
          <circle cx="30" cy="30" r="3.5" fill="#F59E0B" />
          <text x="30" y="51" fill="#900C3F" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">NIFT</text>
        </svg>
      );
    case 'seed-design':
      return (
        <svg className="w-14 h-14" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="30" r="28" fill="#FFF7ED" stroke="#F97316" strokeWidth="2" />
          <path d="M30 14 L34 24 L44 24 L36 30 L39 40 L30 34 L21 40 L24 30 L16 24 L26 24 Z" fill="#F97316" opacity="0.25" />
          <circle cx="30" cy="27" r="4.5" fill="#F97316" />
          <text x="30" y="51" fill="#7C2D12" fontSize="8" fontWeight="900" textAnchor="middle" fontFamily="Outfit">SEED</text>
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

export const ExamCard = ({ exam }: ExamCardProps) => {
  const navigate = useNavigate();
  const modeLabel = exam.mode === 'both' ? 'online & offline both' : exam.mode || 'online';

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent redirecting if the user clicked an interactive button or anchor
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    navigate(`/exams/${exam.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-5 md:p-6 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group relative text-left cursor-pointer"
    >
      
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
            <h3 className="font-display font-extrabold text-lg text-slate-850 dark:text-white leading-tight truncate group-hover:text-[#F97316] transition-colors duration-300">
              {exam.name}
            </h3>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold leading-normal mt-0.5 line-clamp-1">
              {exam.fullName}
            </p>
          </div>

          {/* Side-by-side orange Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => navigate(`/exams/${exam.id}?scrollTo=alerts`)}
              className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-orange-500/10 cursor-pointer border-none"
            >
              <Bell className="w-3.5 h-3.5" />
              Exam Alerts
            </button>
            <button
              onClick={() => navigate(`/exams/${exam.id}?tab=Application+Form`)}
              className="flex items-center gap-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-orange-500/10 cursor-pointer border-none"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Register Now
            </button>
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
          onClick={() => navigate(`/exams/${exam.id}?tab=Overview`)}
          className="hover:text-[#F97316] transition-colors cursor-pointer bg-transparent border-none p-0 uppercase font-bold text-[10px]"
        >
          Overview
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => navigate(`/exams/${exam.id}?tab=Exam+Dates`)}
          className="hover:text-[#F97316] transition-colors cursor-pointer bg-transparent border-none p-0 uppercase font-bold text-[10px]"
        >
          Exam Date
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => navigate(`/exams/${exam.id}?tab=Syllabus`)}
          className="hover:text-[#F97316] transition-colors cursor-pointer bg-transparent border-none p-0 uppercase font-bold text-[10px]"
        >
          Syllabus
        </button>
        <span className="text-slate-200 dark:text-white/5 select-none">|</span>
        <button
          onClick={() => navigate(`/exams/${exam.id}?tab=Question+Paper`)}
          className="hover:text-[#F97316] transition-colors cursor-pointer bg-transparent border-none p-0 uppercase font-bold text-[10px]"
        >
          Sample Papers
        </button>
      </div>

    </div>
  );
};

export default ExamCard;
