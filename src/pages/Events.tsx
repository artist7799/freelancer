import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  FileText, 
  X, 
  MessageSquare, 
  Send, 
  ArrowRight, 
  Check, 
  Play, 
  Download,
  GraduationCap, 
  BookOpen, 
  HelpCircle, 
  Briefcase 
} from 'lucide-react';
import { useGlobalStore } from '../store/useGlobalStore';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const Events = () => {
  const addToast = useGlobalStore().addToast;

  // States
  const [isFloatingOpen, setIsFloatingOpen] = useState(true);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regSpecialization, setRegSpecialization] = useState('Marketing');
  const [regYear, setRegYear] = useState('2025');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle registration submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      addToast('Please fill out all registration fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsRegModalOpen(false);
      addToast(`Thank you, ${regName}! Your Conclave entry pass has been registered. Support ID: CM-${Math.floor(100000 + Math.random() * 900000)}`, 'success');
      // Reset form
      setRegName('');
      setRegEmail('');
      setRegPhone('');
    }, 1200);
  };

  // Handle brochure download
  const handleDownloadBrochure = () => {
    addToast('Downloading Conclave Brochure...', 'success');
    // Simulate direct download
    setTimeout(() => {
      addToast('Download completed successfully!', 'success');
    }, 1500);
  };

  // Quick WhatsApp action
  const handleWhatsAppChat = () => {
    addToast('Opening chat with Conclave Admissions Helpdesk...', 'success');
    window.open('https://wa.me/918043901200', '_blank');
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left overflow-hidden bg-slate-50/30 dark:bg-app-bg">
      <div className="gradient-mesh" />

      {/* FLOATING QUICK ACTIONS (Top-Right Overlay) */}
      <div className="fixed top-28 right-6 z-40 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
        <button
          onClick={handleWhatsAppChat}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/35 transition-all duration-300 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat on WhatsApp</span>
        </button>
        <button
          onClick={() => setIsRegModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-black text-white bg-[#F97316] hover:bg-[#EA580C] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-300 cursor-pointer"
        >
          <span>Register Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col gap-12">
        
        {/* HERO SECTION BANNER */}
        <section className="relative rounded-3xl overflow-hidden min-h-[500px] border border-slate-200 dark:border-app-border shadow-2xl flex flex-col justify-end">
          
          {/* Backdrop Image and Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80")`
          }} />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Grid Layout inside Hero */}
          <div className="relative z-10 w-full p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Panel - Hero Info */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">
              <span className="px-3.5 py-1 rounded-full bg-[#F97316]/25 border border-[#F97316]/50 text-[#F97316] text-[10px] font-black tracking-wider uppercase">
                EXCEL & ACHIEVE • 2025 CONCLAVE
              </span>
              
              <h1 className="text-3xl sm:text-5xl font-display font-black text-white leading-tight uppercase tracking-wide">
                Welcome to Aruna-Nand EdTech Services' <br />
                <span className="text-[#F97316] drop-shadow-md">उड़ान MBA Conclave 2k25</span>
              </h1>
              
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Connect directly with premium A++ B-schools, benchmark admissions guidance, secure spot enrollments, and discover executive careers. Participate in exclusive career development tracks.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mt-2">
                <button
                  onClick={() => setIsRegModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase text-white bg-[#F97316] hover:bg-[#EA580C] shadow-md shadow-orange-500/10 hover:shadow-orange-500/25 transition-all duration-200 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Register Now
                </button>
                <button
                  onClick={handleDownloadBrochure}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-black uppercase text-[#F97316] border-2 border-[#F97316] hover:bg-[#F97316] hover:text-white transition-all duration-200 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Right Panel - Milestone Bullets */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "A++ Delegates", desc: "Meet top business leaders", icon: Award },
                  { title: "Spot Admissions", desc: "Immediate profile evaluation", icon: GraduationCap },
                  { title: "10,000+ Students", desc: "Pan India student community", icon: Users },
                  { title: "Conclave Certificates", desc: "Issued to every participant", icon: FileText }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-app-card backdrop-blur-md border border-app-border hover:border-app-border transition-all flex flex-col gap-2.5 text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#F97316]/15 flex items-center justify-center text-[#F97316]">
                      <item.icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-600 dark:text-slate-400 font-medium mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ABOUT CONCLAVE SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: About Info & Stats */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <ScrollReveal delay={0}>
              <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-md flex flex-col gap-5 text-left">
                <span className="text-[10px] font-black text-[#F97316] tracking-wider uppercase leading-none">
                  EVENT HIGHLIGHTS & SUMMARY
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white uppercase tracking-wide">
                  About उड़ान MBA Conclave
                </h2>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  The उड़ान MBA Conclave 2025 by Aruna-Nand EdTech Services is a path-breaking educational symposium designed to bridge the gap between aspiring management professionals and top-tier institutions. Under the theme 'Empowering Future Leaders', the conclave provides a platform for direct interaction, offering insights into curriculum innovations, industry expectations, and global career pathways.
                </p>
                <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-app-border pt-4">
                  Participants will get exclusive access to seminars hosted by seasoned educationists, interactive Mock GD/PI roundtables, live scholarship applications, and educational loans desks from top financial companies. Learn the pathways to top universities, salary metrics, and placement pipelines first-hand.
                </p>
              </div>
            </ScrollReveal>

            {/* JOIN CONCLAVE STATS ROW */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {[
                  { 
                    stat: "100+", 
                    title: "Top Universities", 
                    desc: "Meet representatives from A++ business schools and autonomous universities.",
                    icon: BookOpen,
                    color: "text-purple-500 bg-purple-500/10 border-purple-500/20"
                  },
                  { 
                    stat: "Free", 
                    title: "Student Assistance", 
                    desc: "Complimentary guidance on application essays, GD/PI training, and profiles.",
                    icon: HelpCircle,
                    color: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/20"
                  },
                  { 
                    stat: "Countless", 
                    title: "Opportunities", 
                    desc: "Explore dual degrees, executive courses, global study trips, and packages.",
                    icon: Briefcase,
                    color: "text-accent bg-accent/15 border-accent/30"
                  }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-5 md:p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-sm hover:shadow-md hover:border-slate-350 dark:hover:border-app-border transition-all flex flex-col gap-4 text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border ${item.color}`}>
                        {item.stat}
                      </span>
                      <item.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Key Highlights & Who Can Attend */}
          <div className="lg:col-span-4 flex flex-col gap-6 w-full">
            
            {/* KEY HIGHLIGHTS */}
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-md flex flex-col gap-5 text-left">
                <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-app-border pb-3">
                  <Award className="w-4 h-4 text-[#F97316]" />
                  Key Highlights
                </h3>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                  {[
                    "Meet delegates face-to-face",
                    "100+ Universities & Keynote speakers",
                    "Free GD/PI evaluation sessions",
                    "Leading Banks on spot for education loans",
                    "Aptitude & Scholarship tests participation",
                    "One-on-one professional Counselling sessions"
                  ].map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-semibold leading-normal">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* WHO CAN ATTEND */}
            <ScrollReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-md flex flex-col gap-5 text-left">
                <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 dark:border-app-border pb-3">
                  <Users className="w-4 h-4 text-[#F97316]" />
                  Who Can Attend?
                </h3>
                <ul className="flex flex-col gap-3.5 text-xs text-slate-700 dark:text-slate-300">
                  {[
                    "MBA/PGDM aspirants seeking direct advice",
                    "Freshers & graduates exploring professional fields",
                    "Management Institutions exploring alliances",
                    "Autonomous Universities & B-Schools delegates"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#F97316] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-semibold leading-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

        </section>

      </div>

      {/* CENTER FLOATING CONCLAVE MODAL BOX */}
      {isFloatingOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsFloatingOpen(false)}
            className="fixed inset-0 bg-app-bg/80 backdrop-blur-md" 
          />
          
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg shadow-2xl z-10 overflow-hidden flex flex-col text-left">
            
            {/* Top-Left Red Close Button */}
            <button
              onClick={() => setIsFloatingOpen(false)}
              className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-red-500 hover:bg-red-650 flex items-center justify-center text-white cursor-pointer shadow-lg hover:scale-105 transition-all border-none"
              title="Close popup"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>

            {/* Collage Grid of Award Handovers */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-app-card p-1 h-36">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=300&h=200&q=80" 
                alt="Award handover 1" 
                className="w-full h-full object-cover rounded-tl-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=300&h=200&q=80" 
                alt="Award handover 2" 
                className="w-full h-full object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&h=200&q=80" 
                alt="Award handover 3" 
                className="w-full h-full object-cover rounded-tr-lg"
              />
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 flex flex-col gap-4">
              <span className="text-[9px] font-black text-rose-500 tracking-wider uppercase leading-none">
                EXCLUSIVE OFFER FOR ASPIRANTS
              </span>
              
              <h3 className="font-display font-black text-lg md:text-xl text-[#F97316] leading-tight uppercase">
                Free Scholarship Test worth ₹2 Crore!
              </h3>
              
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Aruna-Nand EdTech Services is conducting an exclusive Scholarship Test worth ₹2 Crore for MBA aspirants. Register now to secure up to 100% tuition fee waiver, instant education loan approvals with zero processing fees, and direct spot admission offers at the conclave.
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  setIsFloatingOpen(false);
                  setIsRegModalOpen(true);
                }}
                className="mt-2 w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:scale-[1.02] transition-all cursor-pointer border-none"
              >
                <Send className="w-3.5 h-3.5 rotate-45" />
                <span>Register now</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* REGISTRATION FORM MODAL */}
      {isRegModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsRegModalOpen(false)}
            className="fixed inset-0 bg-app-bg/70 backdrop-blur-sm" 
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-left flex flex-col gap-5">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-app-border pb-3">
              <div>
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-wide">
                  Conclave Registration
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-0.5 leading-none uppercase">
                  Aruna-Nand EdTech Conclave 2k25 Entry Pass
                </p>
              </div>
              <button
                onClick={() => setIsRegModalOpen(false)}
                className="p-1 rounded bg-slate-100 dark:bg-app-card border border-transparent hover:border-slate-350 dark:hover:border-app-border text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@domain.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99887 76655"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#F97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">MBA Specialization</label>
                  <select
                    value={regSpecialization}
                    onChange={(e) => setRegSpecialization(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#F97316] font-semibold"
                  >
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="HR">HR</option>
                    <option value="Operations">Operations</option>
                    <option value="Analytics">Business Analytics</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Target Year</label>
                  <select
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value)}
                    className="px-3 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#F97316] font-semibold"
                  >
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer border-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Get entry pass</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Events;
