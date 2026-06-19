import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  GitCompare,
  User,
  Bell,
  Clock,
  Sparkles,
  ClipboardList,
  Star,
  ChevronRight,
  BookOpen,
  Award,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import { useAuthStore } from '../store/useAuthStore';
import { useCompareStore } from '../store/useCompareStore';
import { useSavedCollegesStore } from '../store/useSavedCollegesStore';
import { useGlobalStore } from '../store/useGlobalStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { applicationService } from '../services/application.service';
import { CollegeCard } from '../components/cards/CollegeCard';
import { ScrollReveal } from '../components/animations/ScrollReveal';

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
    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-0.5 border border-app-border shrink-0">
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

export const Dashboard = () => {
  const { user, updateUserProfile } = useAuthStore();
  const { compareIds } = useCompareStore();
  const { savedIds } = useSavedCollegesStore();
  const addToast = useGlobalStore().addToast;

  const [activeTab, setActiveTab] = useState<'overview' | 'saved' | 'compare' | 'applications' | 'profile' | 'notifications'>('overview');

  // Local profile inputs
  const [profileName, setProfileName] = useState(user?.fullName || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');
  const [targetExam, setTargetExam] = useState('JEE Mains');
  const [targetRank, setTargetRank] = useState('14,500');
  const [prefCourse, setPrefCourse] = useState('Engineering');
  const [prefState, setPrefState] = useState(user?.state || '');

  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse } = useCollegesQuery({ limit: 1000 });
  const collegesList = collegesResponse?.data?.colleges || [];

  const savedCollegesList = collegesList.filter((c: any) => savedIds.includes(c.id));
  const comparedCollegesList = collegesList.filter((c: any) => compareIds.includes(c.id));

  const queryClient = useQueryClient();
  const isAdmin = user?.role === 'admin';

  const { data: adminStatsResponse } = useQuery({
    queryKey: ['adminStats'],
    queryFn: () => applicationService.getAdminStats(),
    enabled: isAdmin,
  });

  const adminStats = adminStatsResponse?.data?.stats || {
    totalStudents: 0,
    totalColleges: 0,
    totalCourses: 0,
    totalExams: 0,
    totalScholarships: 0,
    totalApplications: 0,
    applicationStatusBreakdown: { pending: 0, submitted: 0, approved: 0, rejected: 0 }
  };

  const { data: allAppsResponse } = useQuery({
    queryKey: ['allApplications'],
    queryFn: () => applicationService.getAllApplications(),
    enabled: isAdmin,
  });

  const rawAllApplications = allAppsResponse?.data?.applications || [];
  const mappedAllApplications = rawAllApplications.map((app: any) => ({
    id: app._id,
    collegeName: app.collegeId?.name || app.collegeId?.collegeName || 'Unknown College',
    courseName: app.courseId?.name || 'Unknown Course',
    studentName: app.userId?.fullName || 'Unknown Student',
    studentEmail: app.userId?.email || '',
    studentPhone: app.userId?.phone || '',
    appliedDate: new Date(app.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    status: app.applicationStatus,
  }));

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      applicationService.updateStatus(id, status),
    onSuccess: () => {
      addToast('Status updated successfully!', 'success');
      queryClient.invalidateQueries({ queryKey: ['adminStats'] });
      queryClient.invalidateQueries({ queryKey: ['allApplications'] });
    },
    onError: (err: any) => {
      addToast(err.response?.data?.message || 'Failed to update status', 'error');
    }
  });

  const handleUpdateStatus = (id: string, status: string) => {
    updateStatusMutation.mutate({ id, status });
  };

  // Load applications from API via React Query
  const { data: myAppsResponse } = useQuery({
    queryKey: ['myApplications'],
    queryFn: () => applicationService.getMyApplications(),
    staleTime: 10 * 1000,
  });

  const rawApplications = myAppsResponse?.data?.applications || [];
  const [withdrawnIds, setWithdrawnIds] = useState<string[]>([]);

  // Map backend application to frontend dashboard format
  const mappedApplications = rawApplications.map((app: any) => {
    let statusText = 'Query Lodged';
    let stepNum = 1;
    if (app.applicationStatus === 'submitted') {
      statusText = 'Under Review';
      stepNum = 2;
    } else if (app.applicationStatus === 'approved') {
      statusText = 'Offer Letter Sent';
      stepNum = 4;
    } else if (app.applicationStatus === 'rejected') {
      statusText = 'Rejected';
      stepNum = 1;
    }

    return {
      id: app._id,
      collegeName: app.collegeId?.name || app.collegeId?.collegeName || 'Unknown College',
      courseName: app.courseId?.name || 'Unknown Course',
      appliedDate: new Date(app.createdAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      status: statusText,
      step: stepNum,
      feePaid: '₹0'
    };
  });

  const applications = mappedApplications.filter((app: any) => !withdrawnIds.includes(app.id));

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

    const success = await updateUserProfile(formData);
    if (success) {
      addToast('Profile image updated successfully!', 'success');
    }
  };

  const notifications = [
    {
      id: 1,
      title: 'Scholarship Match Found!',
      desc: 'You qualify for the Bennett Engineering Excellence Scholarship. Check details.',
      time: '2 hours ago',
      type: 'success',
      unread: true
    },
    {
      id: 2,
      title: 'College Application Update',
      desc: 'Your application for Sharda University is approved. Offer letter generated.',
      time: '1 day ago',
      type: 'info',
      unread: true
    },
    {
      id: 3,
      title: 'Upcoming Entrance Exam Alert',
      desc: 'JEE Mains Phase 2 Registration closes in 3 days. Set your reminder.',
      time: '2 days ago',
      type: 'warning',
      unread: false
    }
  ];

  const dashboardTabs = isAdmin
    ? [
        { id: 'overview', label: 'Admin Overview', icon: ClipboardList },
        { id: 'applications', label: 'Application Manager', icon: BookOpen, badge: mappedAllApplications.length },
        { id: 'profile', label: 'Admin Profile', icon: User }
      ]
    : [
        { id: 'overview', label: 'Dashboard Overview', icon: ClipboardList },
        { id: 'saved', label: 'Saved Campuses', icon: Bookmark, badge: savedIds.length },
        { id: 'compare', label: 'Comparison Basket', icon: GitCompare, badge: compareIds.length },
        { id: 'applications', label: 'My Applications', icon: BookOpen, badge: applications.length },
        { id: 'profile', label: 'Student Profile', icon: User },
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: notifications.filter(n => n.unread).length }
      ];

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', profileName);
    formData.append('email', profileEmail);
    formData.append('phone', profilePhone);
    formData.append('state', prefState);

    const success = await updateUserProfile(formData);
    if (success) {
      addToast('Profile updates saved successfully!', 'success');
    }
  };

  const handleWithdrawApplication = (id: string, name: string) => {
    setWithdrawnIds(prev => [...prev, id]);
    addToast(`Withdrew application query for ${name}.`, 'warning');
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-left">
        
        {/* Profile Header Block */}
        <ScrollReveal>
          <div className="glass p-6 sm:p-8 rounded-3xl border border-app-border bg-gradient-to-tr from-white/[0.01] to-white/[0.03] flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-xl">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#4F46E5] p-1 flex items-center justify-center shadow-lg shadow-[#FF7A00]/25 group">
                <div className="w-full h-full bg-app-bg rounded-full flex items-center justify-center overflow-hidden relative">
                  {user?.profileImage ? (
                    <img src={user.profileImage} alt={profileName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                      {(profileName || 'U').split(' ').filter(Boolean).map((n: string) => n[0]).join('')}
                    </span>
                  )}
                  <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[10px] text-white font-bold cursor-pointer transition-opacity">
                    <span>Upload</span>
                    <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </label>
                </div>
                <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#10B981] border-2 border-[#080B16]" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight flex items-center gap-2 justify-center sm:justify-start">
                  {profileName}
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF7A00]/20 border border-[#FF7A00]/30 text-[9px] font-black uppercase text-[#FF7A00] tracking-wider">
                    <Sparkles className="w-2.5 h-2.5" /> Premium Student
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-app-muted mt-1 font-medium">{profileEmail} • {profilePhone}</p>
                <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                  <span className="px-2.5 py-1 rounded-lg bg-app-card border border-app-border text-[10px] text-app-muted font-bold uppercase tracking-wider">
                    {prefCourse} Focus
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-app-card border border-app-border text-[10px] text-app-muted font-bold uppercase tracking-wider">
                    Target: {targetExam} (Rank: {targetRank})
                  </span>
                </div>
              </div>
            </div>

            {/* Metric counters */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-app-bg/50 backdrop-blur-md p-4 rounded-2xl border border-app-border min-w-full md:min-w-fit shadow-inner">
              <div className="text-center px-2">
                <p className="text-[10px] text-app-muted font-black uppercase tracking-wider">Saved</p>
                <p className="text-2xl font-black text-[#4F46E5] mt-1">{savedIds.length}</p>
              </div>
              <div className="text-center px-4 border-l border-app-border">
                <p className="text-[10px] text-app-muted font-black uppercase tracking-wider">Compare</p>
                <p className="text-2xl font-black text-[#FF7A00] mt-1">{compareIds.length}</p>
              </div>
              <div className="text-center px-2 border-l border-app-border">
                <p className="text-[10px] text-app-muted font-black uppercase tracking-wider">Applied</p>
                <p className="text-2xl font-black text-[#10B981] mt-1">{applications.length}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dashboard Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Menu Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {dashboardTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full py-3.5 px-5 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-app-card border-[#FF7A00]/40 text-[#FF7A00] shadow-sm'
                      : 'bg-app-card border-app-border text-app-muted hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#FF7A00]' : 'text-app-muted'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      activeTab === tab.id ? 'bg-[#FF7A00] text-white' : 'bg-white/10 text-app-muted'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Details Workspace */}
          <div className="lg:col-span-3 flex flex-col gap-6 ">    
                  {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <ScrollReveal>
                {isAdmin ? (
                  /* ADMIN OVERVIEW */
                  <div className="flex flex-col gap-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-5 rounded-2xl bg-app-card border border-app-border text-left">
                        <span className="text-[10px] text-app-muted font-black uppercase tracking-wider">Total Entrance Exams</span>
                        <span className="text-3xl font-black text-white block mt-2">{adminStats.totalExams}</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-app-card border border-app-border text-left">
                        <span className="text-[10px] text-app-muted font-black uppercase tracking-wider">Total Courses Offered</span>
                        <span className="text-3xl font-black text-white block mt-2">{adminStats.totalCourses}</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-app-card border border-app-border text-left">
                        <span className="text-[10px] text-app-muted font-black uppercase tracking-wider">Total Scholarships Scheme</span>
                        <span className="text-3xl font-black text-white block mt-2">{adminStats.totalScholarships}</span>
                      </div>
                    </div>

                    {/* Application Status Breakdowns */}
                    <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4">
                      <h3 className="font-display font-black text-lg text-white">Application Status Breakdown</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-bold">
                        <div className="p-4 rounded-xl bg-app-card border border-app-border">
                          <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Pending Query</span>
                          <span className="text-xl font-black text-slate-300 block mt-1">{adminStats.applicationStatusBreakdown?.pending || 0}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-app-card border border-app-border">
                          <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Under Review</span>
                          <span className="text-xl font-black text-[#FF7A00] block mt-1">{adminStats.applicationStatusBreakdown?.submitted || 0}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-app-card border border-app-border">
                          <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Approved Offers</span>
                          <span className="text-xl font-black text-[#10B981] block mt-1">{adminStats.applicationStatusBreakdown?.approved || 0}</span>
                        </div>
                        <div className="p-4 rounded-xl bg-app-card border border-app-border">
                          <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Rejected/Closed</span>
                          <span className="text-xl font-black text-rose-450 block mt-1">{adminStats.applicationStatusBreakdown?.rejected || 0}</span>
                        </div>
                      </div>
                    </div>

                    {/* Recent Counseling Queries list */}
                    <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-app-border pb-3">
                        <h3 className="font-display font-black text-lg text-white">Recent Counseling Queries</h3>
                        <button onClick={() => setActiveTab('applications')} className="text-xs font-semibold text-[#FF7A00] hover:underline bg-transparent border-none cursor-pointer">
                          View All
                        </button>
                      </div>
                      <div className="flex flex-col gap-3">
                        {mappedAllApplications.slice(0, 4).map((app: any) => (
                          <div key={app.id} className="p-4 rounded-xl bg-app-card border border-app-border flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-semibold">
                            <div className="text-left font-medium">
                              <p className="font-extrabold text-sm text-white">{app.studentName} ({app.collegeName})</p>
                              <p className="text-[11px] text-app-muted mt-1 font-medium">{app.courseName} • Applied: {app.appliedDate}</p>
                            </div>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                app.status === 'approved' ? 'bg-[#10B981]/15 text-[#10B981]' : app.status === 'submitted' ? 'bg-[#FF7A00]/15 text-[#FF7A00]' : (app.status === 'pending' ? 'bg-slate-500/15 text-slate-350' : 'bg-rose-500/15 text-rose-450')
                              }`}>
                                {app.status}
                              </span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'approved')}
                                  className="px-3 py-1 rounded bg-[#10B981] hover:bg-[#10B981]/90 text-white font-bold text-[10px] uppercase border-none cursor-pointer"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleUpdateStatus(app.id, 'rejected')}
                                  className="px-3 py-1 rounded bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] uppercase border-none cursor-pointer"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {mappedAllApplications.length === 0 && (
                          <div className="py-6 text-center text-app-muted font-medium">No counseling queries submitted yet.</div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* STUDENT OVERVIEW */
                  <div className="flex flex-col gap-6">
                    {/* AI Predictor Banner */}
                    <div className="glass p-6 sm:p-8 rounded-3xl border border-app-border bg-gradient-to-r from-[#4F46E5]/10 to-[#FF7A00]/10 relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
                      <div className="relative z-10 flex flex-col gap-1">
                        <h2 className="text-xl sm:text-2xl font-display font-black text-white tracking-tight flex items-center gap-2">
                          Admission Eligibility Readiness
                        </h2>
                        <p className="text-xs text-app-muted max-w-md leading-relaxed">
                          Input your target rank to run counseling match probabilities across 25,000+ courses.
                        </p>
                      </div>
                      <Link
                        to="/college-predictor"
                        className="px-5 py-3 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF7A00]/25 transition-all flex items-center gap-1.5 z-10 shrink-0 self-stretch sm:self-auto text-center justify-center border-none"
                      >
                        Open AI Predictor <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* Analytics Dashboard section with Custom SVG Gauges */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* SVG Gauge card */}
                      <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4 text-center">
                        <h4 className="text-xs font-black text-app-muted uppercase tracking-wider text-left flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-[#FF7A00]" />
                          Admission Profile Readiness
                        </h4>
                        
                        <div className="relative w-36 h-36 mx-auto flex items-center justify-center mt-2">
                          {/* Gauge SVG */}
                          <svg className="w-full h-full transform -rotate-90">
                            <circle cx="72" cy="72" r="60" stroke="rgba(255,255,255,0.03)" strokeWidth="10" fill="transparent" />
                            <circle 
                              cx="72" 
                              cy="72" 
                              r="60" 
                              stroke="url(#gaugeGrad)" 
                              strokeWidth="10" 
                              fill="transparent" 
                              strokeDasharray="376.8" 
                              strokeDashoffset="75.3" 
                              strokeLinecap="round"
                            />
                            <defs>
                              <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4F46E5" />
                                <stop offset="100%" stopColor="#FF7A00" />
                              </linearGradient>
                            </defs>
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className="text-3xl font-black text-white">80%</span>
                            <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider">Ready</span>
                          </div>
                        </div>
                        
                        <p className="text-[11px] text-app-muted leading-relaxed">
                          Complete your entrance examination score card details inside profile to hit 100%.
                        </p>
                      </div>

                      {/* Applications Funnel chart */}
                      <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4 text-left">
                        <h4 className="text-xs font-black text-app-muted uppercase tracking-wider flex items-center gap-1.5">
                          <ClipboardList className="w-4 h-4 text-[#10B981]" />
                          Active Application Funnel
                        </h4>
                        
                        <div className="flex flex-col gap-3 mt-2">
                          {[
                            { stage: 'Submitted Callback Queries', count: applications.length, width: '100%', color: 'bg-[#4F46E5]' },
                            { stage: 'Under Counselor Review', count: applications.filter((a: any) => a.step === 2).length, width: applications.length > 0 ? `${(applications.filter((a: any) => a.step === 2).length / applications.length) * 100}%` : '0%', color: 'bg-[#FF7A00]' },
                            { stage: 'Offer Letters Issued', count: applications.filter((a: any) => a.step === 4).length, width: applications.length > 0 ? `${(applications.filter((a: any) => a.step === 4).length / applications.length) * 100}%` : '0%', color: 'bg-[#10B981]' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-1 text-xs">
                              <div className="flex justify-between font-bold">
                                <span className="text-app-muted">{item.stage}</span>
                                <span className="text-white">{item.count}</span>
                              </div>
                              <div className="w-full h-2 bg-app-card rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Applications Feed */}
                    <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display font-black text-lg text-white">Applications Feed</h3>
                        <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-[#FF7A00] hover:underline flex items-center gap-0.5 bg-transparent border-none cursor-pointer">
                          Manage <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {applications.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {applications.slice(0, 4).map((app: any) => (
                            <div key={app.id} className="p-4 rounded-2xl bg-app-card border border-app-border flex flex-col justify-between min-h-[120px] text-left">
                              <div>
                                <h4 className="font-extrabold text-sm text-white leading-tight">{app.collegeName}</h4>
                                <p className="text-[11px] text-app-muted mt-1">{app.courseName}</p>
                              </div>
                              <div className="flex items-center justify-between text-[10px] font-bold text-app-muted bg-app-card p-2 rounded-xl mt-4">
                                <span>Applied: {app.appliedDate}</span>
                                <span className="text-[#10B981] uppercase tracking-wider">{app.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center text-app-muted text-xs">No active applications.</div>
                      )}
                    </div>

                    {/* Shortlisted Highlights grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Saved */}
                      <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-black text-base text-white flex items-center gap-2">
                            <Bookmark className="w-4 h-4 text-[#FF7A00]" /> Bookmarked
                          </h4>
                          <button onClick={() => setActiveTab('saved')} className="text-xs font-semibold text-[#FF7A00] hover:underline bg-transparent border-none cursor-pointer">
                            View All ({savedIds.length})
                          </button>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          {savedCollegesList.slice(0, 3).map((col: any) => (
                            <Link key={col.id} to={`/colleges/${col.id}`} className="flex items-center gap-3 p-2.5 rounded-xl bg-app-card border border-app-border hover:border-app-border transition-colors">
                              {renderLogo(col.logo || col.id)}
                              <div className="flex-1 min-w-0 text-left">
                                <p className="font-extrabold text-xs text-white truncate">{col.name}</p>
                                <p className="text-[10px] text-app-muted truncate mt-0.5">{col.location}</p>
                              </div>
                            </Link>
                          ))}
                          {savedIds.length === 0 && (
                            <div className="py-6 text-center text-app-muted text-xs font-medium">No saved institutions yet.</div>
                          )}
                        </div>
                      </div>

                      {/* Compare */}
                      <div className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-display font-black text-base text-white flex items-center gap-2">
                            <GitCompare className="w-4 h-4 text-[#4F46E5]" /> Compare List
                          </h4>
                          <Link to="/compare" className="text-xs font-semibold text-[#FF7A00] hover:underline">
                            Compare Sheet ({compareIds.length})
                          </Link>
                        </div>

                        <div className="flex flex-col gap-2.5">
                          {comparedCollegesList.slice(0, 3).map((col: any) => (
                            <div key={col.id} className="flex items-center justify-between p-2.5 rounded-xl bg-app-card border border-app-border">
                              <div className="flex items-center gap-3 min-w-0 text-left">
                                {renderLogo(col.logo || col.id)}
                                <div className="min-w-0">
                                  <p className="font-extrabold text-xs text-white truncate">{col.name}</p>
                                  <p className="text-[10px] text-app-muted truncate mt-0.5">{col.category}</p>
                                </div>
                              </div>
                              <span className="text-xs font-black text-[#F59E0B] flex items-center gap-0.5 shrink-0">
                                <Star className="w-3.5 h-3.5 fill-current" /> {col.rating}
                              </span>
                            </div>
                          ))}
                          {compareIds.length === 0 && (
                            <div className="py-6 text-center text-app-muted text-xs font-medium">No campuses added to compare list.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            )}

            {/* SAVED TAB */}
            {activeTab === 'saved' && (
              <ScrollReveal>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display font-black text-white tracking-tight">Saved Campuses</h2>
                      <p className="text-xs text-app-muted mt-0.5">Campuses you bookmarked while analyzing parameters.</p>
                    </div>
                    <Link to="/colleges" className="py-2.5 px-4 rounded-xl glass border border-app-border text-xs font-bold text-white hover:bg-app-card transition-all text-center">
                      Browse Campuses
                    </Link>
                  </div>

                  {savedCollegesList.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedCollegesList.map((col: any) => (
                        <div key={col.id}>
                          <CollegeCard college={col} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass p-12 rounded-3xl border border-app-border text-center flex flex-col items-center justify-center gap-4">
                      <Bookmark className="w-12 h-12 text-app-muted/30" />
                      <div>
                        <h3 className="font-bold text-base text-white">Bookmarks list is empty</h3>
                        <p className="text-xs text-app-muted mt-1 max-w-sm">Bookmark programs directly from catalog cards to track application releases.</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* COMPARE TAB */}
            {activeTab === 'compare' && (
              <ScrollReveal>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-display font-black text-white tracking-tight">Comparison Basket</h2>
                      <p className="text-xs text-app-muted mt-0.5 font-medium">Campuses currently loaded in comparison dashboard.</p>
                    </div>
                    {compareIds.length > 0 && (
                      <Link to="/compare" className="py-3 px-5 rounded-xl bg-gradient-to-r from-[#FF7A00] to-[#FF9F43] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg shadow-[#FF7A00]/20">
                        Launch Comparison Dashboard <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>

                  {comparedCollegesList.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      {comparedCollegesList.map((col: any) => (
                        <div key={col.id} className="p-5 rounded-2xl bg-app-card border border-app-border flex items-center justify-between">
                          <div className="flex items-center gap-4 min-w-0">
                            {renderLogo(col.logo || col.id)}
                            <div className="min-w-0">
                              <h4 className="font-extrabold text-sm text-white truncate">{col.name}</h4>
                              <p className="text-[11px] text-app-muted truncate mt-1">{col.location}</p>
                            </div>
                          </div>
                          <span className="text-xs font-black text-[#F59E0B] flex items-center gap-0.5 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-current" /> {col.rating}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass p-12 rounded-3xl border border-app-border text-center flex flex-col items-center justify-center gap-4">
                      <GitCompare className="w-12 h-12 text-app-muted/30" />
                      <div>
                        <h3 className="font-bold text-base text-white">Comparison basket is empty</h3>
                        <p className="text-xs text-app-muted mt-1 max-w-sm">Select 'Compare' inside listings to configure dynamic side-by-side charts.</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* APPLICATIONS TAB */}
            {activeTab === 'applications' && (
              <ScrollReveal>
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h2 className="text-2xl font-display font-black text-white tracking-tight">Counselor Routing Applications</h2>
                    <p className="text-xs text-app-muted mt-0.5">Track eligibility callback and scholarship evaluation stages.</p>
                  </div>

                  {applications.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {applications.map((app: any) => (
                        <div key={app.id} className="glass p-6 rounded-3xl border border-app-border flex flex-col gap-6">
                          
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-app-border pb-4">
                            <div>
                              <h3 className="font-display font-black text-base text-white">{app.collegeName}</h3>
                              <p className="text-xs text-app-muted mt-1 font-medium">{app.courseName}</p>
                            </div>
                            <div className="flex gap-2">
                              <span className="px-3 py-1 rounded-full bg-app-card border border-app-border text-[9px] font-bold text-app-muted uppercase">
                                Applied: {app.appliedDate}
                              </span>
                              <span className="px-3 py-1 rounded-full bg-[#10B981]/25 border border-[#10B981]/40 text-[9px] font-black text-[#10B981] uppercase tracking-wider">
                                {app.status}
                              </span>
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                            {[
                              { label: 'Query Lodged', desc: 'Callback Scheduled' },
                              { label: 'Reviewing', desc: 'Counselor Evaluating' },
                              { label: 'Seat check', desc: 'Assessing Eligibility' },
                              { label: 'Offer Issued', desc: 'Offer Sent' }
                            ].map((step, idx) => {
                              const stepNum = idx + 1;
                              const isPast = stepNum < app.step;
                              const isCurrent = stepNum === app.step;
                              return (
                                <div key={idx} className="flex-1 w-full flex sm:flex-col items-center gap-3 font-semibold">
                                  <div className="flex items-center gap-3 sm:w-full">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isPast
                                        ? 'bg-[#10B981] text-white'
                                        : isCurrent
                                          ? 'bg-[#FF7A00] text-white ring-4 ring-[#FF7A00]/20'
                                          : 'bg-app-card border border-app-border text-app-muted'
                                    }`}>
                                      {isPast ? '✓' : stepNum}
                                    </div>
                                    {idx < 3 && (
                                      <div className={`hidden sm:block flex-1 h-0.5 ${
                                        isPast ? 'bg-[#10B981]' : 'bg-app-card'
                                      }`} />
                                    )}
                                  </div>
                                  <div className="text-left sm:text-center mt-0.5">
                                    <p className={`font-bold text-xs ${isCurrent ? 'text-[#FF7A00]' : 'text-white'}`}>{step.label}</p>
                                    <p className="text-[10px] text-app-muted mt-0.5 font-medium">{step.desc}</p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex justify-between items-center border-t border-app-border pt-4 mt-2 text-[10px] font-bold text-app-muted">
                            <span>Application Processing Fee: <b className="text-white">{app.feePaid}</b></span>
                            <button
                              onClick={() => handleWithdrawApplication(app.id, app.collegeName)}
                              className="py-2 px-4 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 text-rose-450 font-bold text-xs transition-colors cursor-pointer bg-transparent"
                            >
                              Withdraw Query
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass p-12 rounded-3xl border border-app-border text-center flex flex-col items-center justify-center gap-4">
                      <BookOpen className="w-12 h-12 text-app-muted/30" />
                      <div>
                        <h3 className="font-bold text-base text-white">No active application queries</h3>
                        <p className="text-xs text-app-muted mt-1 max-w-sm">Submit your query under any college details profile to route eligibility checks here.</p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <ScrollReveal>
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h2 className="text-2xl font-display font-black text-white tracking-tight">Student Profile Details</h2>
                    <p className="text-xs text-app-muted mt-0.5 font-medium font-display">Configure your exam score ranges, streams, and target location preferences.</p>
                  </div>

                  <form onSubmit={handleProfileSave} className="glass p-6 sm:p-8 rounded-3xl border border-app-border flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Student Full Name</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          required
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Phone number</label>
                        <input
                          type="tel"
                          required
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Target Entrance Exam</label>
                        <input
                          type="text"
                          value={targetExam}
                          onChange={(e) => setTargetExam(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Entrance Exam Rank / Percentile</label>
                        <input
                          type="text"
                          value={targetRank}
                          onChange={(e) => setTargetRank(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Preferred Course Focus</label>
                        <input
                          type="text"
                          value={prefCourse}
                          onChange={(e) => setPrefCourse(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Domicile region</label>
                        <input
                          type="text"
                          value={prefState}
                          onChange={(e) => setPrefState(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-app-card border border-app-border text-white outline-none focus:border-[#FF7A00] transition-colors"
                        />
                      </div>

                    </div>

                    <button
                      type="submit"
                      className="py-3 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF7A00]/25 self-start mt-3 cursor-pointer border-none transition-all"
                    >
                      Save Profile Changes
                    </button>
                  </form>
                </div>
              </ScrollReveal>
            )}

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <ScrollReveal>
                <div className="flex flex-col gap-6 text-left">
                  <div>
                    <h2 className="text-2xl font-display font-black text-white tracking-tight">Recent Notices</h2>
                    <p className="text-xs text-app-muted mt-0.5">Critical notifications about scholarships and counseling timelines.</p>
                  </div>

                  <div className="flex flex-col gap-4 text-xs font-semibold">
                    {notifications.map((notice) => (
                      <div
                        key={notice.id}
                        className={`p-5 rounded-2xl border flex items-start gap-4 transition-colors ${
                          notice.unread
                            ? 'bg-app-card border-[#FF7A00]/20 shadow-md'
                            : 'bg-app-card border-app-border'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl shrink-0 ${
                          notice.type === 'success'
                            ? 'bg-[#10B981]/15 text-[#10B981]'
                            : notice.type === 'warning'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                              : 'bg-[#FF7A00]/15 text-[#FF7A00]'
                        }`}>
                          {notice.type === 'success' ? (
                            <Award className="w-5 h-5" />
                          ) : notice.type === 'warning' ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <Bell className="w-5 h-5" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <h4 className="font-extrabold text-sm text-white">{notice.title}</h4>
                            <span className="text-[10px] text-app-muted font-bold whitespace-nowrap">{notice.time}</span>
                          </div>
                          <p className="text-xs text-app-muted mt-1.5 leading-relaxed font-medium">{notice.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
