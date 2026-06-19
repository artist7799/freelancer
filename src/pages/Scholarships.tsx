import { useState, useEffect, useRef, useCallback } from 'react';
import { User, Mail, Phone, MapPin, Lock, ChevronDown, Award, Star, BookOpen, Building, GraduationCap, Users, Shield, Plus, Minus, ChevronLeft, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { useGlobalStore } from '../store/useGlobalStore';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { useScholarships } from '../hooks/useScholarships';
import { ScholarshipCard } from '../components/cards/ScholarshipCard';

// Custom inline SVG logos for sponsor institutions
const SponsorLogo = ({ id }: { id: string }) => {
  switch (id) {
    case 'accurate':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="40" height="40" rx="6" fill="#1E3A8A" />
          <path d="M15 35 L25 15 L35 35 Z" fill="white" />
          <circle cx="25" cy="27" r="3" fill="#F59E0B" />
          <text x="55" y="25" fill="#F8FAFC" fontSize="11" fontWeight="900" fontFamily="Outfit">ACCURATE</text>
          <text x="55" y="36" fill="#94A3B8" fontSize="7" fontWeight="bold" fontFamily="Outfit">GROUP OF INSTITUTIONS</text>
        </svg>
      );
    case 'iilm':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 H30 V40 H10 Z" fill="#991B1B" />
          <circle cx="35" cy="25" r="5" fill="#F59E0B" />
          <text x="48" y="25" fill="#991B1B" fontSize="13" fontWeight="950" fontFamily="Outfit">IILM</text>
          <text x="48" y="37" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="Outfit">UNIVERSITY</text>
        </svg>
      );
    case 'alliance':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="18" fill="#080B16" stroke="#1E3A8A" strokeWidth="2" />
          <path d="M20 30 L25 18 L30 30 Z" fill="#1E3A8A" />
          <text x="50" y="24" fill="#3B82F6" fontSize="11" fontWeight="900" fontFamily="Outfit">ALLIANCE</text>
          <text x="50" y="35" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="Outfit">UNIVERSITY</text>
        </svg>
      );
    case 'dpu':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 C15 5, 35 5, 40 10 C45 15, 45 35, 40 40 C35 45, 15 45, 10 40 Z" fill="#991B1B" opacity="0.15" />
          <text x="15" y="32" fill="#991B1B" fontSize="24" fontWeight="950" fontFamily="Outfit" letterSpacing="2">DPU</text>
        </svg>
      );
    case 'bennett':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="10" width="30" height="30" rx="4" fill="#0369A1" />
          <path d="M12 25 L18 17 L24 25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <text x="42" y="24" fill="#F8FAFC" fontSize="11" fontWeight="900" fontFamily="Outfit">BENNETT</text>
          <text x="42" y="35" fill="#0369A1" fontSize="8" fontWeight="black" fontFamily="Outfit">UNIVERSITY</text>
        </svg>
      );
    case 'graphic':
      return (
        <svg className="h-10 w-auto max-w-[140px]" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="18" fill="#BE123C" />
          <circle cx="25" cy="25" r="12" fill="#080B16" />
          <circle cx="25" cy="25" r="6" fill="#BE123C" />
          <text x="50" y="24" fill="#BE123C" fontSize="10" fontWeight="900" fontFamily="Outfit">Graphic Era</text>
          <text x="50" y="35" fill="#94A3B8" fontSize="8" fontWeight="bold" fontFamily="Outfit">UNIVERSITY</text>
        </svg>
      );
    default:
      return null;
  }
};

export const Scholarships = () => {
  const addToast = useGlobalStore().addToast;
  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);
  const { useScholarshipsQuery } = useScholarships();
  const { data: scholarshipsList = [] } = useScholarshipsQuery({ limit: 100 });

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    state: '',
    city: '',
    password: ''
  });

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [reviewSlide, setReviewSlide] = useState(0);
  const reviewTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.mobile || !formData.state || !formData.city || !formData.password) {
      addToast('Please complete all registration parameters.', 'warning');
      return;
    }
    
    const success = await register(
      formData.fullName,
      formData.email,
      formData.mobile,
      formData.password
    );

    if (success) {
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        state: '',
        city: '',
        password: ''
      });
      navigate('/register');
    }
  };

  const statesList = ['Delhi', 'Maharashtra', 'Karnataka', 'West Bengal', 'Uttar Pradesh', 'Madhya Pradesh', 'Tamil Nadu', 'Rajasthan'];
  const citiesList: Record<string, string[]> = {
    'Delhi': ['Delhi', 'Dwarka', 'Rohini'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
    'Karnataka': ['Bangalore', 'Mysore', 'Harihar'],
    'West Bengal': ['Kolkata', 'Bhubaneswar', 'Howrah'],
    'Uttar Pradesh': ['Noida', 'Greater Noida', 'Lucknow'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur']
  };

  const currentCities = formData.state ? citiesList[formData.state] || [] : [];

  const studentReviews = [
    {
      id: 'rev-1',
      name: 'Divya Shaha',
      college: 'Presidency university, Bangalore',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
      text: 'Thanks to Aruna-Nand EdTech Services, which is famous for its relevance, the extensive B.Tech Training and coaching is easy to grasp. From poor academic results to top aptitude gurus in India, Aruna-Nand EdTech Services knows how to improve things. It contains all the guiding principles required to complete your B.Tech successfully.'
    },
    {
      id: 'rev-2',
      name: 'Jitesh Naidu',
      college: 'Kirloskar Institute, Harihar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
      text: 'Every class Aruna-Nand EdTech Services conduct is packed with good material, engaging stories, interesting events, and tremendous positive energy. No MBA question escapes their structured mock analysis and counseling sessions. The guides are extremely thorough and helpful.'
    },
    {
      id: 'rev-3',
      name: 'Kalpana Singh',
      college: 'CUTM, Bhubaneswar',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
      text: "I'm happy I picked the Aruna-Nand EdTech Services to learn and understand about my B.Tech since every mentor member offers their students great attention in both the academic and extracurricular areas. Their feedback mechanisms are top-notch and highly detailed."
    },
    {
      id: 'rev-4',
      name: 'Uday Gosavi',
      college: 'Lexicon MILE, Pune',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
      text: 'MBA is a temple of real knowledge. The counselors take the task of molding the mind with complete dedication. Highly recommend Aruna-Nand EdTech Services to anyone looking to make a compassionate career transition and score high scholarships.'
    },
    {
      id: 'rev-5',
      name: 'Arpita Adhikary',
      college: 'Student, RGVP university Bhopal',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80',
      text: 'The scholarship test helped me secure admission into one of the top engineering universities in Bhopal with a full waiver. The mock tests and preparation materials provided by Aruna-Nand EdTech Services were key to my scoring success.'
    }
  ];

  const totalReviews = studentReviews.length;
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleReviewsCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleReviewsCount(2);
      } else {
        setVisibleReviewsCount(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxReviewIdx = Math.max(0, totalReviews - visibleReviewsCount);

  const stopReviewSlide = useCallback(() => {
    if (reviewTimer.current) {
      clearInterval(reviewTimer.current);
    }
  }, []);

  const startReviewSlide = useCallback(() => {
    stopReviewSlide();
    reviewTimer.current = setInterval(() => {
      setReviewSlide((prev) => (prev >= maxReviewIdx ? 0 : prev + 1));
    }, 10000);
  }, [maxReviewIdx, stopReviewSlide]);

  useEffect(() => {
    startReviewSlide();
    return () => stopReviewSlide();
  }, [visibleReviewsCount, maxReviewIdx, startReviewSlide, stopReviewSlide]);

  const handleNextReview = () => {
    stopReviewSlide();
    setReviewSlide((prev) => (prev >= maxReviewIdx ? 0 : prev + 1));
    startReviewSlide();
  };

  const handlePrevReview = () => {
    stopReviewSlide();
    setReviewSlide((prev) => (prev === 0 ? maxReviewIdx : prev - 1));
    startReviewSlide();
  };

  const toggleReviewExpand = (id: string) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      q: 'How to register National Scholarship Test?',
      a: 'You can register by filling out the online registration form on this page. Provide your full name, email, mobile number, state, city, and select a secure password. Then click the Register Now button to book your exam slot.'
    },
    {
      q: 'Who can enroll for the test?',
      a: 'All students pursuing or planning to pursue undergraduate (UG) or postgraduate (PG) degrees in engineering, management, commerce, arts, law, or design from recognized universities across India are eligible to enroll.'
    },
    {
      q: 'How many attempts for exam?',
      a: 'To ensure equal opportunities and absolute transparency, each candidate is allowed only one attempt for the scholarship test per academic session.'
    },
    {
      q: 'Where you will get certificate?',
      a: 'Upon completing the scholarship test online, a verified digital merit certificate along with a section-wise analytical performance report will be generated and sent directly to your registered email address.'
    },
    {
      q: 'How to redeem scholarship?',
      a: "The scholarship amount you win will be automatically adjusted with your first-year tuition fees at the time of college admission during Aruna-Nand EdTech Services' Common Application Process."
    }
  ];

  return (
    <div className="relative pt-24 pb-20 min-h-screen bg-app-bg text-app-text">
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. TOP WELCOME TEST SERIES BANNER */}
      <section className="relative w-full min-h-[460px] overflow-hidden flex items-center py-10 border-b border-app-border text-left z-10">
        <div className="mx-auto max-w-7xl px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Heading and Bullets */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] self-start">
              <Sparkles className="w-3.5 h-3.5" />
              National Scholarship Scheme
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black leading-tight uppercase text-white">
              Aruna-Nand EdTech Services Scholarship Test Series
            </h1>
            <p className="text-xs md:text-sm text-app-muted leading-relaxed max-w-2xl font-semibold">
              Attempt the UG & PG Program Scholarship Test Online. Build your career with up to 100% tuition fee waivers from verified universities in India.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-4 text-[10px] sm:text-xs font-black uppercase text-white tracking-wider">
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 border-2 border-[#FF7A00] rounded-sm shrink-0 mt-1" />
                <span>Based on latest exam pattern</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 border-2 border-[#FF7A00] rounded-sm shrink-0 mt-1" />
                <span>Fresh questions created by expert faculty</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 border-2 border-[#FF7A00] rounded-sm shrink-0 mt-1" />
                <span>Detailed Performance Analysis</span>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-2.5 h-2.5 border-2 border-[#FF7A00] rounded-sm shrink-0 mt-1" />
                <span>Trusted by 25,000+ Students.</span>
              </div>
            </div>
          </div>

          {/* Right: Registration Box */}
          <div className="lg:col-span-5 w-full max-w-md glass rounded-3xl shadow-2xl border border-app-border overflow-hidden shrink-0 self-center">
            <div className="bg-[#FF7A00] text-white py-4 text-center font-display font-black text-sm uppercase tracking-widest">
              Registration
            </div>

            <form onSubmit={handleRegisterSubmit} className="p-6 flex flex-col gap-4">
              
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <User className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 font-semibold"
                  required
                />
              </div>

              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Mail className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 font-semibold"
                  required
                />
              </div>

              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Phone className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <input
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 font-semibold"
                  required
                />
              </div>

              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <MapPin className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 appearance-none pr-8 cursor-pointer font-semibold"
                  required
                >
                  <option value="" disabled className="bg-app-card">Select State</option>
                  {statesList.map((st) => (
                    <option key={st} value={st} className="bg-app-card">{st}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-app-muted absolute right-3 pointer-events-none" />
              </div>

              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <MapPin className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 appearance-none pr-8 cursor-pointer font-semibold"
                  required
                  disabled={!formData.state}
                >
                  <option value="" disabled className="bg-app-card">Select City</option>
                  {currentCities.map((ct) => (
                    <option key={ct} value={ct} className="bg-app-card">{ct}</option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-app-muted absolute right-3 pointer-events-none" />
              </div>

              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Lock className="w-4 h-4 text-app-muted ml-2 shrink-0" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3 py-2.5 font-semibold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF7A00] hover:bg-[#D14B00] text-white text-xs font-black uppercase py-3.5 rounded-xl mt-2 transition-all shadow-lg shadow-[#FF7A00]/25 cursor-pointer border-none"
              >
                Register Now
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* 2. SPONSOR COLLEGES LOGO BAR */}
      <section className="bg-app-card border-b border-app-border py-6">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {['accurate', 'iilm', 'alliance', 'dpu', 'bennett', 'graphic'].map((colId) => (
              <div key={colId} className="bg-app-card rounded-xl px-4 py-2 flex items-center justify-center border border-app-border shrink-0 hover:scale-105 transition-transform duration-300">
                <SponsorLogo id={colId} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FOUR CORE FEATURE CARDS */}
      <section className="py-12 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 glass border border-app-border rounded-2xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-sm text-white uppercase leading-snug">
                2Cr+ Scholarships
              </h3>
            </div>

            <div className="p-6 glass border border-app-border rounded-2xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <Star className="w-6 h-6 fill-[#FF7A00]" />
              </div>
              <h3 className="font-display font-extrabold text-sm text-white uppercase leading-snug">
                Secure Top Ranks & Waivers
              </h3>
            </div>

            <div className="p-6 glass border border-app-border rounded-2xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-sm text-white uppercase leading-snug">
                Up to 100% MBA Fee Waivers
              </h3>
            </div>

            <div className="p-6 glass border border-app-border rounded-2xl shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00]">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-display font-extrabold text-sm text-white uppercase leading-snug">
                Admissions in Top Colleges
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* Dynamic Active Scholarships List Section */}
      <section className="py-12 bg-transparent">
        <div className="mx-auto max-w-7xl px-6 w-full text-center">
          <h2 className="text-2xl font-display font-black text-white mb-8 uppercase tracking-wider">
            Available Institutional Schemes
          </h2>
          {scholarshipsList.length === 0 ? (
            <p className="text-xs text-app-muted font-bold">No active scholarship programs found in directory.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {scholarshipsList.map((scholarship: any) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. "How to register?" STEP PROCESS */}
      <section className="py-12 bg-app-card border-y border-app-border">
        <div className="mx-auto max-w-7xl px-6 w-full text-center">
          <h2 className="text-2xl font-display font-black text-white mb-10 uppercase tracking-wider">
            How to register?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {[
              { step: 1, label: 'Basic Details', icon: User, desc: 'Fill out candidate parameters.' },
              { step: 2, label: 'Select Your Exam', icon: BookOpen, desc: 'Target study stream details.' },
              { step: 3, label: 'Complete Test', icon: Shield, desc: 'Attempt online MCQ sheets.' },
              { step: 4, label: 'Get Scholarship', icon: GraduationCap, desc: 'Waiver automatically adjusted.' }
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="flex flex-col items-center gap-3 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] flex items-center justify-center font-display font-black text-lg border border-[#FF7A00]/20 shadow-sm">
                    {s.step}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-app-card flex items-center justify-center text-app-muted border border-app-border mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mt-1 uppercase">{s.label}</h4>
                  <p className="text-[11px] text-app-muted leading-relaxed font-semibold">{s.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. "Our Milestones" SECTION */}
      <section className="py-12 bg-transparent">
        <div className="mx-auto max-w-5xl px-6 w-full">
          <div className="bg-[#0b0f1d] border border-app-border rounded-3xl p-8 md:p-10 shadow-xl text-white grid grid-cols-2 md:grid-cols-4 gap-6 text-center select-none">
            
            <div className="flex flex-col items-center gap-1 border-r border-app-border last:border-0">
              <Users className="w-6 h-6 text-[#FF7A00] mb-1.5" />
              <span className="text-2xl md:text-3xl font-display font-black tracking-tight">10000+</span>
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider mt-1">Students</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-r border-app-border last:border-0">
              <Award className="w-6 h-6 text-[#FF7A00] mb-1.5" />
              <span className="text-2xl md:text-3xl font-display font-black tracking-tight">2 Crore+</span>
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider mt-1">Scholarship</span>
            </div>

            <div className="flex flex-col items-center gap-1 border-r border-app-border last:border-0 md:border-r">
              <Building className="w-6 h-6 text-[#FF7A00] mb-1.5" />
              <span className="text-2xl md:text-3xl font-display font-black tracking-tight">1000+</span>
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider mt-1">University</span>
            </div>

            <div className="flex flex-col items-center gap-1 last:border-0 border-none">
              <Calendar className="w-6 h-6 text-[#FF7A00] mb-1.5" />
              <span className="text-2xl md:text-3xl font-display font-black tracking-tight">12+ Years</span>
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider mt-1">In Education</span>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Past Conclave Event */}
      <section className="py-12 bg-transparent border-t border-app-border">
        <div className="mx-auto max-w-7xl px-6 w-full text-center">
          <h2 className="text-2xl font-display font-black text-white mb-8 uppercase tracking-wider">
            Past Conclave Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-app-border h-64 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="conclave event 1" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-app-border h-64 bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="conclave event 2" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Student Reviews Carousel */}
      <section className="py-12 bg-transparent border-t border-app-border">
        <div className="mx-auto max-w-7xl px-6 w-full text-center relative">
          <h2 className="text-2xl font-display font-black text-white mb-2 uppercase tracking-wider">
            Student Reviews
          </h2>
          
          <div className="flex items-center justify-center gap-0.5 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FF7A00] stroke-[#FF7A00]" />
            ))}
          </div>

          <div 
            className="overflow-hidden w-full relative py-4"
            onMouseEnter={stopReviewSlide}
            onMouseLeave={startReviewSlide}
          >
            <div 
              className="flex transition-transform duration-700 ease-out gap-6"
              style={{
                width: `${(totalReviews * 100) / visibleReviewsCount}%`,
                transform: `translateX(-${(reviewSlide * 100) / totalReviews}%)`
              }}
            >
              {studentReviews.map((rev) => {
                const isExpanded = expandedReviews.includes(rev.id);
                return (
                  <div 
                    key={rev.id}
                    className="glass border border-app-border rounded-3xl p-6 shadow-xl flex flex-col justify-between text-left self-start"
                    style={{ width: `calc(${100 / totalReviews}% - 16px)` }}
                  >
                    <div>
                      <div className="flex items-center gap-0.5 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#FF7A00] stroke-[#FF7A00]" />
                        ))}
                      </div>

                      <p className="text-xs text-app-muted leading-relaxed font-semibold transition-all duration-300">
                        {isExpanded ? rev.text : `${rev.text.slice(0, 160)}...`}
                      </p>
                      
                      <button
                        onClick={() => toggleReviewExpand(rev.id)}
                        className="text-[11px] font-black text-[#FF7A00] hover:text-[#E06C00] uppercase mt-2.5 cursor-pointer bg-transparent border-none p-0 inline-block"
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3.5 border-t border-app-border pt-4 mt-5">
                      <img 
                        src={rev.avatar} 
                        alt="student" 
                        className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm border border-app-border" 
                      />
                      <div className="min-w-0">
                        <h4 className="font-display font-extrabold text-xs text-white leading-tight uppercase truncate">
                          {rev.name}
                        </h4>
                        <p className="text-[10px] text-app-muted font-bold leading-tight mt-0.5 truncate uppercase">
                          {rev.college}
                        </p>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {maxReviewIdx > 0 && (
              <>
                <button
                  onClick={handlePrevReview}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer border-none z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextReview}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer border-none z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION MENU */}
      <section className="py-12 bg-transparent border-t border-app-border">
        <div className="mx-auto max-w-4xl px-6 w-full text-center">
          <h2 className="text-2xl font-display font-black text-white mb-10 uppercase tracking-wider">
            FAQ
          </h2>
          
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="glass border border-app-border rounded-2xl overflow-hidden shadow-xl text-left"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-white font-display font-bold text-xs uppercase tracking-wide cursor-pointer bg-transparent border-none outline-none"
                  >
                    <span className="flex items-center gap-3">
                      {isOpen ? <Minus className="w-4 h-4 text-[#FF7A00] shrink-0" /> : <Plus className="w-4 h-4 text-[#FF7A00] shrink-0" />}
                      {faq.q}
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-app-border text-xs text-app-muted leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Scholarships;
