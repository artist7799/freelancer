import React, { useState, useMemo } from 'react';
import { X, Send, Award, GraduationCap, Clock, Star, HelpCircle } from 'lucide-react';
import { onlineCourses, onlineCourseCategories, onlineTestimonials, onlineFaqs } from '../data/onlineCourses';
import type { OnlineCourse } from '../data/onlineCourses';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { useGlobalStore } from '../store/useGlobalStore';

export const OnlineCourses = () => {
  const addToast = useGlobalStore().addToast;

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Interactive modal admissions form
  const [selectedProgram, setSelectedProgram] = useState<OnlineCourse | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // FAQ accordion active state
  const [activeFaqIdx, setActiveFaqIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaqIdx((prev) => (prev === idx ? null : idx));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter courses
  const filteredCourses = useMemo(() => {
    return onlineCourses.filter((course) => {
      // 1. Category Filter
      if (selectedCategory && course.category !== selectedCategory) {
        return false;
      }
      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesUni = course.university.toLowerCase().includes(q);
        const matchesDegree = course.degree.toLowerCase().includes(q);
        const matchesCategory = course.category.toLowerCase().includes(q);
        return matchesUni || matchesDegree || matchesCategory;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Syllabus download trigger
  const handleDownloadSyllabus = (degree: string) => {
    addToast(`Downloading syllabus for "${degree}"...`, 'success');
    setTimeout(() => {
      addToast(`Syllabus downloaded successfully!`, 'success');
    }, 1200);
  };

  // Admissions form submission
  const handleAdmissionsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      addToast('Please complete all form fields.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedProgram(null); // Close modal
      addToast(`Registration logged! Direct admissions counselor will call you. ID: ADM-${Math.floor(100000 + Math.random() * 900000)}`, 'success');
      setFullName('');
      setEmail('');
      setPhone('');
    }, 1500);
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left bg-slate-50/30 dark:bg-app-bg text-slate-800 dark:text-slate-100 font-sans">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col gap-14">
        
        {/* HERO SEARCH BANNER SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left panel info */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 text-left">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
              Anywhere Access Easy Learning
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
              The Best <span className="text-[#FF7A00]">Platform</span> For <br />
              Enhancing Skills
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed font-semibold">
              Working collaboratively to ensure every student achieves academically, socially, and emotionally. Explore our accredited degree programs.
            </p>

            {/* Local Search Input box */}
            <div className="w-full max-w-md flex items-center bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-full shadow-md overflow-hidden p-1.5 gap-1 mt-2">
              <input
                type="text"
                placeholder="Search course or university..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full bg-transparent border-0 outline-none text-xs text-slate-800 dark:text-white placeholder-slate-450 px-4 font-bold"
              />
              <button 
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-[#FF7A00] hover:bg-[#E06C00] cursor-pointer border-none shadow-md"
              >
                Search
              </button>
            </div>
          </div>

          {/* Right panel graphic */}
          <div className="lg:col-span-5 relative w-full h-56 rounded-2xl overflow-hidden border border-slate-200 dark:border-app-border shadow-xl bg-app-bg">
            <img 
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&h=400&q=80" 
              alt="enhancing skills student graphic representation" 
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-[#FF7A00]/95 text-white font-black text-[9px] uppercase px-3 py-1 rounded shadow-lg">
              Online Learning
            </div>
          </div>

        </section>

        {/* THREE SERVICES CARDS ROW */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            { title: "Professional Certifications", desc: "Gain recognized validation in corporate specialties.", icon: Award },
            { title: "Expert Instructors", desc: "Learn directly from active industry captains and top academics.", icon: GraduationCap },
            { title: "Flexible Schedule", desc: "Balance coursework at your pace with full-time professional schedules.", icon: Clock }
          ].map((srv, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-app-card border border-slate-250 dark:border-app-border shadow-sm hover:shadow-md transition-all flex items-start gap-4 text-left"
            >
              <div className="p-3 rounded-xl bg-[#FF7A00]/10 text-[#FF7A00] shrink-0">
                <srv.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="font-display font-extrabold text-xs text-slate-800 dark:text-white uppercase tracking-wide">
                  {srv.title}
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed mt-0.5">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* KNOWLEDGE PARTNERS LOGO BAR */}
        <section className="border-t border-b border-slate-200 dark:border-app-border py-6 text-center select-none">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">
            Our Knowledge Partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-80 dark:opacity-70 text-slate-800 dark:text-white font-display font-black text-xs uppercase tracking-wider">
            <span>Manipal University</span>
            <span>Amity University</span>
            <span>Lovely Professional University</span>
            <span>Symbiosis University</span>
            <span>D.Y. Patil Vidyapeeth</span>
            <span>GLA University</span>
          </div>
        </section>

        {/* ACCREDITATIONS DEEP PURPLE BANNER */}
        <section className="p-8 md:p-12 rounded-3xl bg-[#1D0047] text-white text-center border border-app-border shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#3a0b80]/50 to-[#1d0047] opacity-80" />
          
          <div className="relative z-10 flex flex-col gap-4 max-w-3xl items-center">
            <span className="px-3 py-1 rounded bg-rose-600/30 border border-rose-500/40 text-rose-300 text-[9px] font-black tracking-widest uppercase">
              100% REGULATED
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-wide leading-tight">
              Our Programs are Accredited
            </h2>
            <p className="text-xs text-purple-200 max-w-xl font-medium leading-relaxed">
              Best-in-class content by leading faculty and industry leaders in the form of videos, cases and projects, assignments and live sessions.
            </p>

            {/* Grid display labels of accrediting bodies */}
            <div className="flex flex-wrap justify-center gap-6 mt-4 font-display font-black text-[10px] text-purple-300 uppercase tracking-widest">
              <span className="border border-purple-500/30 px-3.5 py-1.5 rounded-lg bg-purple-950/20">UGC-DEB APPROVED</span>
              <span className="border border-purple-500/30 px-3.5 py-1.5 rounded-lg bg-purple-950/20">NAAC A++ RATED</span>
              <span className="border border-purple-500/30 px-3.5 py-1.5 rounded-lg bg-purple-950/20">AICTE COMPLIANT</span>
              <span className="border border-purple-500/30 px-3.5 py-1.5 rounded-lg bg-purple-950/20">WES COMPATIBLE</span>
            </div>
          </div>
        </section>

        {/* EXPLORE ONLINE COURSES CATEGORY TABS */}
        <section className="flex flex-col gap-6 text-center">
          <h3 className="font-display font-black text-lg text-[#0F172A] dark:text-white uppercase tracking-tight">
            Explore Online Courses
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto text-[9px] font-extrabold uppercase tracking-wide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
                selectedCategory === null
                  ? 'bg-[#FF7A00] text-white border-transparent'
                  : 'bg-app-card text-slate-650 dark:text-slate-400 border-slate-200 dark:border-app-border hover:border-slate-350 dark:hover:border-app-border'
              }`}
            >
              All Courses
            </button>
            {onlineCourseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#FF7A00] text-white border-transparent'
                    : 'bg-app-card text-slate-650 dark:text-slate-400 border-slate-200 dark:border-app-border hover:border-slate-350 dark:hover:border-app-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* EXPLORE COLLEGES DEGREE GRID */}
        <section className="flex flex-col gap-8 text-center">
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">
            Explore colleges
          </h3>
          {filteredCourses.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-2xl shadow-sm">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">No online courses found matching the filters.</p>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery('');
                }}
                className="mt-4 text-xs font-black text-white bg-[#FF7A00] hover:bg-[#E06C00] px-5 py-2.5 rounded-lg border-none cursor-pointer transition-all uppercase tracking-wider"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredCourses.map((course, idx) => {
                const accentColors = [
                  '#FF7A00','#6366F1','#10B981','#F59E0B','#EC4899','#3B82F6',
                  '#8B5CF6','#14B8A6','#EF4444','#F97316','#06B6D4','#84CC16'
                ];
                const accent = accentColors[idx % accentColors.length];
                const stars = parseFloat(course.rating);
                return (
                  <ScrollReveal key={course.id} delay={0} duration={0.4}>
                    <div
                      className="group relative flex flex-col bg-white dark:bg-app-card rounded-2xl overflow-hidden border border-slate-200 dark:border-app-border shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                      style={{ borderTop: `3px solid ${accent}` }}
                    >
                      {/* Image with proper overlay */}
                      <div className="relative h-44 w-full overflow-hidden bg-slate-900 shrink-0">
                        <img
                          src={course.image}
                          alt={course.university}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Category badge — bottom left over image */}
                        <div
                          className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full text-[8px] font-black uppercase tracking-wider text-white shadow-lg"
                          style={{ backgroundColor: accent }}
                        >
                          {course.category}
                        </div>

                        {/* Duration pill — bottom right over image */}
                        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-[8px] font-bold text-white">
                          <Clock className="w-3 h-3" />
                          {course.duration.split('|')[0].trim()}
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5 flex flex-col gap-3 flex-1">

                        {/* Logo badge + Rating row */}
                        <div className="flex items-center justify-between">
                          <div
                            className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-white shadow"
                            style={{ backgroundColor: accent }}
                          >
                            {course.logo}
                          </div>
                          <div className="flex items-center gap-1">
                            {[1,2,3,4,5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 transition-colors ${s <= Math.round(stars) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-300 dark:text-slate-600'}`}
                              />
                            ))}
                            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 ml-1">{course.rating}</span>
                          </div>
                        </div>

                        {/* University name */}
                        <h4 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {course.university}
                        </h4>

                        {/* Degree name */}
                        <p className="text-[11px] font-black uppercase tracking-wide" style={{ color: accent }}>
                          {course.degree}
                        </p>

                        {/* Divider */}
                        <div className="border-t border-slate-100 dark:border-app-border mt-auto pt-3 flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                          <span>UGC-DEB Approved</span>
                          <span className="text-green-500 font-black">● Online</span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="px-5 pb-5 grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => setSelectedProgram(course)}
                          className="py-2.5 rounded-xl text-[10px] font-black uppercase text-white shadow-md hover:opacity-90 transition-all border-none cursor-pointer text-center"
                          style={{ backgroundColor: accent }}
                        >
                          Apply Now
                        </button>
                        <button
                          onClick={() => handleDownloadSyllabus(course.degree)}
                          className="py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-opacity-10 transition-all border cursor-pointer text-center bg-transparent"
                          style={{ color: accent, borderColor: accent }}
                        >
                          Brochure
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          )}
        </section>

        {/* OUR TOP RECRUITERS HIRE BAR */}
        <section className="border-t border-b border-slate-200 dark:border-app-border py-6 text-center select-none">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">
            Our Top Recruiters
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-14 opacity-75 dark:opacity-65 text-slate-700 dark:text-white font-display font-black text-xs uppercase tracking-wider">
            <span>Google</span>
            <span>Microsoft</span>
            <span>Deloitte</span>
            <span>Amazon</span>
            <span>Accenture</span>
            <span>IBM</span>
            <span>Capgemini</span>
            <span>Cognizant</span>
          </div>
        </section>

        {/* STUDENT TESTIMONIALS VIEW */}
        <section className="flex flex-col gap-6 text-center">
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">
            Student Testimonials
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {onlineTestimonials.map((t) => (
              <div 
                key={t.id}
                className="p-5 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-rose-600/10 text-rose-600 flex items-center justify-center font-black text-xs select-none">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase">{t.name}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold italic">
                  "{t.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-200 dark:border-app-border pt-10 text-left">
          
          {/* Left panel layout image/decor */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <h3 className="font-display font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight leading-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-semibold max-w-xs">
              Need answers on accreditations, credit logs, exam schedules, or fee waivers? Inspect our quick guides.
            </p>
            {/* Visual FAQ illustration representation */}
            <div className="h-44 w-full rounded-2xl bg-app-bg border border-app-border shadow-lg flex items-center justify-center p-4 relative overflow-hidden mt-2 select-none">
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <HelpCircle className="w-12 h-12 text-[#FF7A00] animate-bounce" />
            </div>
          </div>

          {/* Right panel accordions list */}
          <div className="lg:col-span-8 flex flex-col gap-3.5 w-full">
            {onlineFaqs.map((faq, idx) => {
              const isOpen = activeFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-card overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-5 py-4 text-left font-bold text-xs uppercase flex justify-between items-center text-slate-900 dark:text-white transition-colors cursor-pointer bg-transparent border-none"
                  >
                    <span>+ {faq.q}</span>
                    <span className="text-slate-400 ml-4 shrink-0 font-extrabold">{isOpen ? '▼' : '▲'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-app-border text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </section>

      </div>

      {/* ADMISSIONS FORM MODAL POPUP */}
      {selectedProgram && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            onClick={() => setSelectedProgram(null)}
            className="fixed inset-0 bg-app-bg/70 backdrop-blur-sm" 
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-left flex flex-col gap-5">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-app-border pb-3">
              <div>
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-wide">
                  Course Enquiry
                </h3>
                <p className="text-[10px] text-[#FF7A00] font-black mt-0.5 leading-none uppercase">
                  {selectedProgram.university}
                </p>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-1 rounded bg-slate-100 dark:bg-app-card border border-transparent hover:border-slate-350 dark:hover:border-app-border text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-app-card rounded-xl border border-slate-200 dark:border-app-border text-xs font-semibold text-slate-650 dark:text-slate-300">
              <p><b>Degree:</b> {selectedProgram.degree}</p>
              <p className="mt-1"><b>Duration:</b> {selectedProgram.duration}</p>
              <p className="mt-1"><b>Accredited:</b> UGC-DEB, NAAC A++ Approved</p>
            </div>

            <form onSubmit={handleAdmissionsSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Rahul Verma"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#FF7A00]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99887 76655"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#FF7A00]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#E06C00] text-white font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all cursor-pointer border-none disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit & Request Callback</span>
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

export default OnlineCourses;
