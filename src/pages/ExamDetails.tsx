import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft, Calendar, BookOpen, FileText, Download, CheckCircle, Bell,
  ChevronRight, User, Mail, Phone, MapPin, Clock, Award, TrendingUp,
  AlertCircle, BarChart2, ListChecks, HelpCircle, Send, Sparkles, GraduationCap
} from 'lucide-react';
import { useExams } from '../hooks/useExams';
import { useGlobalStore } from '../store/useGlobalStore';
import type { Exam } from '../types';
import { exams as staticExamsData } from '../data/exams';

// ── Mock exam details to supplement the API when offline ─────────────────────
const MOCK_EXAM_MAP: Record<string, Partial<Exam> & { slug: string; conductingBody?: string; applicationStartDate?: string; applicationEndDate?: string; eligibility: string; pattern: string; }> = {
  'nmat-2025': {
    id: 'nmat-2025', slug: 'nmat-2025',
    name: 'NMAT 2025', fullName: 'NMAT by GMAC',
    description: 'NMAT by GMAC is a premier management entrance exam accepted by NMIMS and over 50 top B-Schools across India, Nepal, and South Africa. It offers multiple attempts to maximise your score.',
    eligibility: 'Graduate in any discipline with minimum 50% marks from a recognized university.',
    applicationStartDate: 'Aug 1, 2025',
    applicationEndDate: 'Oct 10, 2025',
    date: '2025-10-14',
    resultDate: '2026-02-10',
    conductingBody: 'Graduate Management Admission Council (GMAC)',
    category: 'Management',
    mode: 'online',
    difficulty: 'Medium to Hard',
    syllabus: ['Language Skills', 'Quantitative Skills', 'Logical Reasoning'],
    pattern: '108 questions in 120 minutes. 3 sections: Language Skills (36 Qs, 28 min), Quantitative Skills (36 Qs, 52 min), Logical Reasoning (36 Qs, 40 min). No negative marking.',
    courses: ['MBA', 'PGDM'],
    registrationDeadline: '2025-10-10',
  },
  'cmat-2025': {
    id: 'cmat-2025', slug: 'cmat-2025',
    name: 'CMAT 2025', fullName: 'Common Management Admission Test',
    description: 'CMAT is a national-level entrance exam conducted by NTA for admission to MBA & PGDM programs in AICTE-approved colleges across India. Over 1,700 institutes accept CMAT scores.',
    eligibility: 'Graduate with minimum 50% marks (45% for SC/ST/PwD) from a recognized university.',
    applicationStartDate: 'Feb 10, 2025',
    applicationEndDate: 'Mar 15, 2025',
    date: '2025-05-25',
    resultDate: '2025-06-15',
    conductingBody: 'National Testing Agency (NTA)',
    category: 'Management',
    mode: 'online',
    difficulty: 'Medium',
    syllabus: ['Quantitative Techniques & Data Interpretation', 'Logical Reasoning', 'Language Comprehension', 'General Awareness', 'Innovation & Entrepreneurship'],
    pattern: '100 questions in 180 minutes. Sections: QT & DI (25), LR (25), Language (25), GK (25). +4 for correct, -1 for wrong.',
    courses: ['MBA', 'PGDM'],
    registrationDeadline: '2025-03-15',
  },
  'atma-2025': {
    id: 'atma-2025', slug: 'atma-2025',
    name: 'ATMA 2025', fullName: 'AIMS Test for Management Admissions',
    description: 'ATMA is a national-level management entrance exam conducted by AIMS for admissions to MBA, PGDM and other postgraduate management programs. Multiple test dates in a year offer flexibility.',
    eligibility: 'Graduation with minimum 50% marks from a recognized university.',
    applicationStartDate: 'Dec 15, 2024',
    applicationEndDate: 'Feb 11, 2025',
    date: '2025-02-22',
    resultDate: '2025-03-10',
    conductingBody: 'Association of Indian Management Schools (AIMS)',
    category: 'Management',
    mode: 'online',
    difficulty: 'Medium',
    syllabus: ['Analytical Reasoning Skills', 'Quantitative Skills', 'Verbal Skills'],
    pattern: '180 MCQ questions in 180 minutes. 6 sub-sections of 30 questions each. No negative marking.',
    courses: ['MBA', 'PGDM'],
    registrationDeadline: '2025-02-11',
  },
  'cat-2025': {
    id: 'cat-2025', slug: 'cat-2025',
    name: 'CAT 2025', fullName: 'Common Admission Test',
    description: 'Conducted annually by the IIMs on a rotational basis, CAT is the primary gateway to India\'s top business schools. It assesses quantitative, logical, and verbal capacity and is widely regarded as one of the most competitive management exams in the world.',
    eligibility: 'Bachelor\'s Degree with minimum 50% marks or equivalent CGPA (45% for SC/ST/PwD).',
    applicationStartDate: 'Aug 2, 2025',
    applicationEndDate: 'Sep 20, 2025',
    date: '2025-11-30',
    resultDate: '2026-01-05',
    conductingBody: 'Indian Institutes of Management (IIMs)',
    category: 'Management',
    mode: 'online',
    difficulty: 'Hard',
    syllabus: ['Verbal Ability & Reading Comprehension (VARC)', 'Data Interpretation & Logical Reasoning (DILR)', 'Quantitative Ability (QA)'],
    pattern: '3 sections of 40 minutes each (120 min total). ~66 questions. Mix of MCQs and TITA (Type In The Answer). -1 for wrong MCQ, no penalty for TITA.',
    courses: ['MBA', 'PGDM'],
    registrationDeadline: '2025-09-20',
  },
  'xat-2025': {
    id: 'xat-2025', slug: 'xat-2025',
    name: 'XAT 2025', fullName: 'Xavier Aptitude Test',
    description: 'Conducted by XLRI Jamshedpur, XAT is accepted by over 160 management institutes across India. It uniquely tests decision-making alongside verbal ability and quantitative skills, assessing the candidate\'s holistic business judgment.',
    eligibility: 'Bachelor\'s Degree of 3 years in any discipline from a recognized university. No minimum percentage requirement.',
    applicationStartDate: 'Jul 15, 2024',
    applicationEndDate: 'Nov 30, 2024',
    date: '2025-01-05',
    resultDate: '2025-01-20',
    conductingBody: 'XLRI Jamshedpur',
    category: 'Management',
    mode: 'online',
    difficulty: 'Hard',
    syllabus: ['Decision Making', 'Verbal & Logical Ability', 'Quantitative Ability & Data Interpretation', 'General Knowledge (GK Essay)'],
    pattern: 'Part 1: 75 questions in 165 minutes (DM, VALR, QADI). Part 2: GK & Essay in 25 minutes. -0.25 for wrong answers; extra penalty for unattempted in DM section.',
    courses: ['MBA', 'PGDM', 'BM'],
    registrationDeadline: '2024-11-30',
  },
};

// The fallback list of upcoming exams for sidebar
const SIDEBAR_UPCOMING = [
  { name: 'NMAT 2025', id: 'nmat-2025', dates: 'Oct 14 – Dec 20, 2025' },
  { name: 'CMAT 2025', id: 'cmat-2025', dates: 'May 2025' },
  { name: 'ATMA 2025', id: 'atma-2025', dates: 'Feb 22, 2025' },
  { name: 'CAT 2025', id: 'cat-2025', dates: 'Nov 30, 2025' },
  { name: 'XAT 2025', id: 'xat-2025', dates: 'Jan 5, 2025' },
];

// Sub-nav tabs for exam guide
const EXAM_TABS = [
  'Overview', 'Exam Dates', 'Pattern', 'Syllabus',
  'Preparation Tips', 'Centers', 'Question Paper', 'Admit Card',
  'Cut Off', 'Application Form', 'Results', 'Latest Updates'
];

// Content sections index for sticky sidebar
const CONTENT_INDEX = [
  'Main Dates', 'Main Notification', 'Main Registration',
  'Main Eligibility', 'Main Admit Card', 'Main Exam Pattern',
  'Main Syllabus', 'Main Preparation Tips', 'Main Question Papers',
  'Main Cut off', 'Frequently Asked Questions'
];

const getDaysLeft = (dateStr: string): string => {
  const diff = new Date(dateStr).getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? `${days} Days Left` : 'Exam Concluded';
};

export const ExamDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { useExamQuery } = useExams();
  const { data: dbExam, isLoading } = useExamQuery(id || '');
  const addToast = useGlobalStore().addToast;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'Overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', mobile: '', email: '', state: '', city: '' });
  const [indexOpen, setIndexOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Merge: prefer DB record, fall back to static mock or static exams dataset
  const cleanId = id ? id.replace(/-(2025|2026)$/, '') : '';
  const mockData = id 
    ? (MOCK_EXAM_MAP[id] || (cleanId ? MOCK_EXAM_MAP[`${cleanId}-2025`] : undefined)) 
    : undefined;
  const staticData = id 
    ? (staticExamsData.find(e => e.id === id) || (cleanId ? staticExamsData.find(e => e.id === cleanId) : undefined)) 
    : undefined;
  const exam: any = dbExam 
    ? dbExam 
    : (staticData || mockData) 
      ? { ...staticData, ...mockData } 
      : null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && EXAM_TABS.includes(tab)) {
      setActiveTab(tab);
    }

    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'alerts') {
      const el = document.getElementById('alerts-form');
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    }
  }, [searchParams, id]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', tab);
    setSearchParams(newParams);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.mobile) {
      addToast('Please enter your mobile number and email to register for alerts.', 'warning');
      return;
    }
    addToast(`✓ Exam alerts registered for ${exam?.name}! You'll receive updates on ${formData.email}`, 'success');
    setFormData({ firstName: '', lastName: '', mobile: '', email: '', state: '', city: '' });
  };

  if (isLoading && !mockData) {
    return (
      <div className="pt-36 pb-20 min-h-screen bg-app-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full border-4 border-[#FF7A00] border-t-transparent animate-spin mx-auto mb-5" />
          <p className="text-app-muted text-sm font-semibold">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="pt-36 pb-20 min-h-screen bg-app-bg text-app-text flex flex-col items-center justify-center gap-4 text-center px-6">
        <GraduationCap className="w-16 h-16 text-app-muted/30" />
        <h2 className="text-2xl font-bold font-display">Exam Not Found</h2>
        <p className="text-app-muted text-sm max-w-sm">The requested exam "{id}" does not exist in our catalog.</p>
        <Link to="/exams" className="mt-4 inline-flex items-center gap-2 text-[#FF7A00] font-bold hover:underline text-sm">
          <ArrowLeft className="w-4 h-4" /> Return to Exams Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text pt-20 pb-16">
      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="bg-app-card border-b border-app-border py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-app-muted font-semibold">
          <Link to="/" className="hover:text-[#FF7A00] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/exams" className="hover:text-[#FF7A00] transition-colors">Exams</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-white">{exam.name}</span>
        </div>
      </div>

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-app-border py-10 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,122,0,0.12),transparent_70%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/exams" className="inline-flex items-center gap-1.5 text-xs text-app-muted hover:text-white font-bold mb-5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Exams
          </Link>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-[#FF7A00]/15 text-[#FF7A00] text-[10px] font-black uppercase tracking-wider border border-[#FF7A00]/20">
                  {exam.category || 'Management'} Entrance
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${exam.mode === 'online' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                  {exam.mode || 'Online'}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-app-muted text-[10px] font-black uppercase tracking-wider border border-white/10">
                  {exam.difficulty || 'Medium'} Difficulty
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-black text-white leading-tight mb-2">
                {exam.name}{' '}
                <span className="text-[#FF7A00]">Complete Guide</span>
              </h1>
              <p className="text-sm text-app-muted font-semibold mb-1">{exam.fullName}</p>
              {exam.conductingBody && (
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                  Conducted by: <span className="text-slate-400 font-semibold">{exam.conductingBody}</span>
                </p>
              )}
            </div>

            {/* Countdown pill */}
            <div className="shrink-0 flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md min-w-[140px] text-center shadow-xl">
              <Calendar className="w-6 h-6 text-[#FF7A00] mb-2" />
              <span className="text-[10px] font-black text-app-muted uppercase tracking-wider mb-1">Exam Date</span>
              <span className="text-sm font-extrabold text-white leading-tight">{exam.date?.replace(/-/g, '.')}</span>
              <span className="text-[10px] text-[#FF7A00] font-black mt-2 px-2 py-0.5 rounded-full bg-[#FF7A00]/10">
                {getDaysLeft(exam.date)}
              </span>
            </div>
          </div>

          {/* Quick Date Stats Row */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Application Start', value: exam.applicationStartDate || 'TBD', icon: Calendar },
              { label: 'Application End', value: exam.applicationEndDate || exam.registrationDeadline?.replace(/-/g, '.') || 'TBD', icon: Clock },
              { label: 'Exam Date', value: exam.date?.replace(/-/g, '.') || 'TBD', icon: FileText },
              { label: 'Result Date', value: exam.resultDate?.replace(/-/g, '.') || 'TBD', icon: Award },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                <item.icon className="w-4 h-4 text-[#FF7A00] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-black text-app-muted uppercase tracking-wider block">{item.label}</span>
                  <span className="text-xs font-extrabold text-white mt-0.5 block">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ─────────────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-app-card border-b border-app-border shadow-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-none">
            {EXAM_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`py-3.5 px-4 text-[11px] font-bold whitespace-nowrap border-b-2 transition-all cursor-pointer shrink-0 ${
                  activeTab === tab
                    ? 'border-[#FF7A00] text-[#FF7A00] bg-[#FF7A00]/5'
                    : 'border-transparent text-app-muted hover:text-white hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content Area ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ── LEFT MAIN ───────────────────────────────────────────── */}
          <div ref={contentRef} className="lg:col-span-8 flex flex-col gap-6">

            {/* Show List of Contents */}
            <div className="rounded-2xl border border-app-border bg-app-card overflow-hidden">
              <button
                onClick={() => setIndexOpen(!indexOpen)}
                className="w-full flex items-center justify-between p-4 text-sm font-black text-white hover:bg-white/5 transition-colors cursor-pointer border-none bg-transparent text-left"
              >
                <span className="flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-[#FF7A00]" />
                  Show List of Contents
                </span>
                <ChevronRight className={`w-4 h-4 text-app-muted transition-transform ${indexOpen ? 'rotate-90' : ''}`} />
              </button>
              {indexOpen && (
                <div className="border-t border-app-border px-4 pb-4">
                  <ol className="flex flex-col gap-2 mt-3">
                    {CONTENT_INDEX.map((item, idx) => (
                      <li key={item} className="flex items-center gap-3 text-xs text-app-muted hover:text-[#FF7A00] transition-colors cursor-pointer">
                        <span className="w-5 h-5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center text-[9px] font-black shrink-0">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF7A00]" />
                {exam.name} – Overview
              </h2>
              <p className="text-sm text-app-muted leading-relaxed">{exam.description}</p>

              {/* Key highlights grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                {[
                  { label: 'Conducting Body', value: exam.conductingBody || 'NTA', icon: Award },
                  { label: 'Exam Mode', value: exam.mode?.charAt(0).toUpperCase() + exam.mode?.slice(1) || 'Online', icon: TrendingUp },
                  { label: 'Difficulty Level', value: exam.difficulty || 'Medium', icon: BarChart2 },
                  { label: 'Eligibility', value: exam.eligibility?.split('.')[0] + '.', icon: GraduationCap },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-app-border">
                    <div className="w-8 h-8 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[#FF7A00]" />
                    </div>
                    <div>
                      <span className="text-[9px] font-black text-app-muted uppercase tracking-wider block">{item.label}</span>
                      <span className="text-xs font-extrabold text-white mt-0.5 block">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Eligibility Criteria
              </h2>
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-sm text-app-muted leading-relaxed">
                {exam.eligibility}
              </div>
            </div>

            {/* Exam Pattern */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF7A00]" />
                Exam Pattern
              </h2>
              <p className="text-sm text-app-muted leading-relaxed mb-4">{exam.pattern}</p>

              {/* Pattern highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Total Sections', value: exam.syllabus?.length?.toString() || '3' },
                  { label: 'Marking Scheme', value: '+4 / -1' },
                  { label: 'Test Duration', value: '3 Hours' },
                  { label: 'Question Type', value: 'MCQ + TITA' },
                  { label: 'Medium', value: 'English' },
                  { label: 'Valid For', value: '1 Year' },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl bg-white/[0.02] border border-app-border text-center">
                    <span className="text-[9px] font-black text-app-muted uppercase tracking-wider block mb-1">{item.label}</span>
                    <span className="text-sm font-extrabold text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syllabus */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <ListChecks className="w-4 h-4 text-[#FF7A00]" />
                Syllabus Breakdown
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(exam.syllabus || []).map((sub: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-app-border text-xs text-white font-bold">
                    <div className="w-6 h-6 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center shrink-0 text-[#FF7A00] font-black text-[10px]">
                      {i + 1}
                    </div>
                    {sub}
                  </div>
                ))}
              </div>
            </div>

            {/* Preparation Tips */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FF7A00]" />
                Preparation Tips
              </h2>
              <ul className="flex flex-col gap-3">
                {[
                  'Start with a complete mock test to identify your weak areas.',
                  `Focus heavily on ${exam.syllabus?.[0] || 'Verbal Ability'} – it requires consistent daily practice.`,
                  'Take at least 15–20 full-length mock tests before the actual exam.',
                  'Review official previous-year question papers to understand the pattern.',
                  'Time-box each section during mocks to simulate real exam pressure.',
                  'Join study groups or online forums to discuss strategies with peers.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-app-muted leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Dates */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#FF7A00]" />
                Important Dates
              </h2>
              <div className="flex flex-col gap-0 rounded-xl overflow-hidden border border-app-border">
                {[
                  { event: 'Application Form Release', date: exam.applicationStartDate || 'TBD' },
                  { event: 'Last Date to Apply (without late fee)', date: exam.applicationEndDate || exam.registrationDeadline?.replace(/-/g, '.') || 'TBD' },
                  { event: 'Admit Card Release', date: '2 Weeks Before Exam' },
                  { event: 'Examination Date', date: exam.date?.replace(/-/g, '.') || 'TBD' },
                  { event: 'Result / Score Card', date: exam.resultDate?.replace(/-/g, '.') || 'TBD' },
                  { event: 'Counselling / Admission Process', date: 'After Results' },
                ].map((row, i) => (
                  <div key={row.event} className={`flex items-center justify-between px-4 py-3.5 text-xs font-semibold ${i % 2 === 0 ? 'bg-white/[0.02]' : 'bg-transparent'} border-b border-app-border last:border-b-0`}>
                    <span className="text-app-muted flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A00] shrink-0" />
                      {row.event}
                    </span>
                    <span className="text-white font-extrabold ml-4 text-right whitespace-nowrap">{row.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-app-border bg-app-card p-6">
              <h2 className="text-base font-display font-extrabold text-white mb-4 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#FF7A00]" />
                Frequently Asked Questions
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { q: `What is the eligibility for ${exam.name}?`, a: exam.eligibility },
                  { q: 'How many times can I appear for this exam?', a: 'Candidates can attempt this exam once per academic year, or as per the conducting body\'s guidelines.' },
                  { q: 'Is there a negative marking scheme?', a: 'Yes, most management entrance exams follow a -1 or -0.25 penalty for incorrect answers. Please check the official notification for latest updates.' },
                  { q: 'Which colleges accept these scores?', a: `${exam.name} scores are accepted by top management institutes across India. Visit our Colleges page and filter by the appropriate exam.` },
                ].map((faq, i) => (
                  <details key={i} className="group rounded-xl border border-app-border bg-white/[0.02] overflow-hidden">
                    <summary className="flex items-center justify-between px-4 py-3.5 text-sm font-bold text-white cursor-pointer hover:bg-white/5 transition-colors list-none">
                      <span className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center text-[9px] font-black shrink-0">Q</span>
                        {faq.q}
                      </span>
                      <ChevronRight className="w-4 h-4 text-app-muted group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <div className="px-4 pb-4 pt-1 text-sm text-app-muted leading-relaxed border-t border-app-border">
                      <span className="text-[#FF7A00] font-bold mr-2">A:</span>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Get Exam Alerts Form */}
            <div id="alerts-form" className="rounded-2xl border border-[#FF7A00]/20 bg-gradient-to-br from-[#FF7A00]/5 to-transparent p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent" />
              <h2 className="text-base font-display font-extrabold text-white mb-1 flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#FF7A00]" />
                Get {exam.name} Alerts
              </h2>
              <p className="text-xs text-app-muted mb-5">
                Register to receive instant notifications for important dates, results, admit cards and more.
              </p>
              <form onSubmit={handleAlertSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'firstName', placeholder: 'First Name', icon: User },
                  { name: 'lastName', placeholder: 'Last Name', icon: User },
                  { name: 'mobile', placeholder: 'Mobile Number', icon: Phone },
                  { name: 'email', placeholder: 'E-mail Address', icon: Mail },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <field.icon className="w-4 h-4 text-app-muted absolute left-3 top-3.5 pointer-events-none" />
                    <input
                      name={field.name}
                      type={field.name === 'email' ? 'email' : field.name === 'mobile' ? 'tel' : 'text'}
                      placeholder={field.placeholder}
                      value={(formData as any)[field.name]}
                      onChange={handleFormChange}
                      className="w-full pl-9 pr-3 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white placeholder-app-muted outline-none focus:border-[#FF7A00] transition-all font-medium"
                    />
                  </div>
                ))}
                <div className="relative">
                  <MapPin className="w-4 h-4 text-app-muted absolute left-3 top-3.5 pointer-events-none" />
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] transition-all appearance-none font-medium cursor-pointer"
                  >
                    <option value="">Select State</option>
                    {['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Gujarat', 'Rajasthan', 'West Bengal', 'Madhya Pradesh', 'Punjab'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-app-muted absolute left-3 top-3.5 pointer-events-none" />
                  <input
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="w-full pl-9 pr-3 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white placeholder-app-muted outline-none focus:border-[#FF7A00] transition-all font-medium"
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF7A00]/25 border-none cursor-pointer active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    Register Now – Get Free Alerts
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ────────────────────────────────────────── */}
          <div className="lg:col-span-4 flex flex-col gap-5 sticky top-[120px]">

            {/* CTA Buttons */}
            <div className="rounded-2xl border border-app-border bg-app-card p-5 flex flex-col gap-3">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1">Quick Actions</h3>
              <Link
                to="/common-application"
                className="w-full py-3 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#FF7A00]/20 border-none cursor-pointer active:scale-[0.98] hover:no-underline"
              >
                <Send className="w-4 h-4" />
                Apply Now
              </Link>
              <button
                onClick={() => addToast('Downloading question papers... Check your downloads!', 'success')}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-app-border text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#FF7A00]" />
                Download Question Paper
              </button>
              <Link
                to="/college-predictor"
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-app-border text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer hover:no-underline"
              >
                <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
                Predict My College
              </Link>
            </div>

            {/* Alert Info */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-white mb-0.5">Stay Updated!</p>
                <p className="text-[11px] text-app-muted leading-relaxed">
                  Exam dates are subject to change. Always verify from the official website of {exam.conductingBody || 'the conducting body'}.
                </p>
              </div>
            </div>

            {/* Other Upcoming Exams */}
            <div className="rounded-2xl border border-app-border bg-app-card p-5">
              <h3 className="text-xs font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#FF7A00]" />
                Other Upcoming Exams
              </h3>
              <div className="flex flex-col gap-2">
                {SIDEBAR_UPCOMING.filter(e => e.id !== id).map((e) => (
                  <Link
                    key={e.id}
                    to={`/exams/${e.id}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-app-border hover:border-[#FF7A00]/30 hover:bg-[#FF7A00]/5 transition-all cursor-pointer group hover:no-underline"
                  >
                    <div>
                      <span className="text-xs font-extrabold text-white group-hover:text-[#FF7A00] transition-colors block">{e.name}</span>
                      <span className="text-[10px] text-app-muted">{e.dates}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-app-muted group-hover:text-[#FF7A00] transition-colors shrink-0" />
                  </Link>
                ))}
              </div>
              <Link
                to="/exams"
                className="mt-3 w-full py-2.5 rounded-xl border border-app-border text-xs font-bold text-app-muted hover:text-[#FF7A00] hover:border-[#FF7A00]/30 transition-all cursor-pointer text-center block hover:no-underline"
              >
                View All Exams →
              </Link>
            </div>

            {/* Promo Conclave Widget */}
            <div className="rounded-2xl overflow-hidden border border-[#FF7A00]/20 relative">
              <div className="bg-gradient-to-br from-[#FF7A00] to-[#D14B00] p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-wider">Career Conclave 2025</span>
                </div>
                <h4 className="font-display font-black text-base mb-1 leading-tight">India's Largest MBA Admission Fair</h4>
                <p className="text-xs text-orange-100 leading-relaxed mb-4">
                  Meet 150+ top B-schools, get counselling & apply — all in one day.
                </p>
                <Link
                  to="/events"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#FF7A00] font-black text-xs cursor-pointer transition-all hover:bg-orange-50 hover:no-underline"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Register Free
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
