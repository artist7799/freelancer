import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check, X, Send, Award, GraduationCap, Clock } from 'lucide-react';
import { capColleges, capCourses, capSpecializations } from '../data/capColleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { useGlobalStore } from '../store/useGlobalStore';
import { applicationService } from '../services/application.service';

export const CommonApplication = () => {
  const addToast = useGlobalStore().addToast;

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  
  // Courses Filters
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  
  // Specialization Filters
  const [specializationSearch, setSpecializationSearch] = useState('');
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);

  // Submission Form Modal
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState("12th Pass");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle selection
  const handleToggleCollege = (collegeId: string) => {
    setSelectedColleges((prev) =>
      prev.includes(collegeId) ? prev.filter((id) => id !== collegeId) : [...prev, collegeId]
    );
  };

  // Toggle course checkmark
  const handleToggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  // Toggle specialization checkmark
  const handleToggleSpecialization = (specialization: string) => {
    setSelectedSpecializations((prev) =>
      prev.includes(specialization) ? prev.filter((s) => s !== specialization) : [...prev, specialization]
    );
  };

  // Filter colleges
  const filteredColleges = useMemo(() => {
    return capColleges.filter((college) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (!college.name.toLowerCase().includes(q) && !college.location.toLowerCase().includes(q)) {
          return false;
        }
      }

      // 2. Selected Courses Checkboxes
      if (selectedCourses.length > 0) {
        const hasMatchingCourse = college.courses.some((course) => selectedCourses.includes(course));
        if (!hasMatchingCourse) return false;
      }

      // 3. Selected Specializations Checkboxes
      if (selectedSpecializations.length > 0) {
        const hasMatchingSpecialization = college.specializations.some((spec) => selectedSpecializations.includes(spec));
        if (!hasMatchingSpecialization) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCourses, selectedSpecializations]);

  // Click Next trigger
  const handleNextClick = () => {
    if (selectedColleges.length === 0) {
      addToast('Please select at least one College/University to proceed.', 'warning');
      return;
    }
    setIsSubmitModalOpen(true);
  };

  // Submit common form details
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      addToast('Please complete all application details.', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      for (const colId of selectedColleges) {
        const col = capColleges.find(c => c.id === colId);
        const courseName = col?.courses[0] || 'General';
        await applicationService.submitApplication(colId, courseName);
      }
      setIsSubmitting(false);
      setIsSubmitModalOpen(false);
      setSelectedColleges([]); // Reset
      addToast(`Applications successfully submitted via CAP! Registration ID: CAP-${Math.floor(100000 + Math.random() * 900000)}`, 'success');
      // Reset form
      setFullName('');
      setEmail('');
      setPhone('');
    } catch (err: any) {
      setIsSubmitting(false);
      const msg = err.response?.data?.message || 'Failed to submit common application';
      addToast(msg, 'error');
    }
  };

  // Calculate total fee of selected colleges
  const totalFees = useMemo(() => {
    return capColleges
      .filter((college) => selectedColleges.includes(college.id))
      .reduce((sum, college) => sum + college.fees, 0);
  }, [selectedColleges]);

  return (
    <div className="relative pt-28 pb-24 min-h-screen text-left bg-slate-50/30 dark:bg-app-bg text-slate-800 dark:text-slate-100">
      <div className="gradient-mesh" />

      {/* VIEWPORT-WIDE NEXT BUTTON STICKY FOOTER */}
      <div 
        onClick={handleNextClick}
        className="fixed bottom-0 left-0 right-0 h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold flex items-center justify-center cursor-pointer z-40 transition-colors tracking-widest uppercase text-sm border-t border-emerald-500/20"
      >
        <span>Next</span>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 flex flex-col gap-8">
        
        {/* TOP BRAND INFO & COLLAGE GRAPHIC ROW */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-200 dark:border-app-border pb-8">
          
          {/* Left Panel: Description and search */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 text-left">
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Common Application Process
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-semibold">
              A Common Application Process ( CAP ) is a standardized form that allows applicants to apply to multiple institutions, programs, or services using a single application. It simplifies the application process by reducing the need to fill out multiple forms for different Colleges/Universities.
            </p>

            {/* SEARCH COLLEGES BAR */}
            <div className="w-full max-w-md flex items-center bg-white dark:bg-app-card border border-slate-250 dark:border-app-border rounded-xl shadow-md px-4 py-3 mt-2 gap-2 focus-within:border-emerald-650 transition-all">
              <input
                type="text"
                placeholder="SEARCH COLLEGES"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none text-xs text-slate-800 dark:text-white placeholder-slate-450 font-black uppercase tracking-wider"
              />
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
            </div>
          </div>

          {/* Right Panel: Academic Student Graphic Overlay */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[220px]">
            {/* Main background photo */}
            <div className="relative w-72 h-44 rounded-2xl overflow-hidden shadow-xl border border-app-border bg-slate-900">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Graduate collage student background" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            </div>

            {/* Overlaid Student in graduation gown cutout representation */}
            <div className="absolute -top-12 right-12 w-32 h-44 z-10 overflow-hidden hidden sm:block">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=200&q=80" 
                alt="Grad student cutout" 
                className="w-full h-full object-cover rounded-xl border border-app-border shadow-2xl"
              />
            </div>

            {/* Floating Overlays Matching Mockup Badges exactly */}
            <div className="absolute -top-6 left-6 z-20 px-3 py-1.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase shadow-lg tracking-wider border border-rose-500/20 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>PAN India Colleges & Universities</span>
            </div>

            <div className="absolute bottom-6 left-2 z-20 px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase shadow-lg tracking-wider border border-rose-500/20 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Save Money & Time</span>
            </div>

            <div className="absolute bottom-1 right-2 z-20 px-3.5 py-1.5 rounded-full bg-rose-600 text-white text-[9px] font-black uppercase shadow-lg tracking-wider border border-rose-500/20 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Hussle Free Process</span>
            </div>
          </div>

        </section>

        {/* BOTTOM SECTION: Sidebar Filters + Colleges Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS */}
          <aside className="lg:col-span-3 flex flex-col gap-6 text-left">
            
            {/* COURSES FILTER PANEL */}
            <div className="p-5 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-sm flex flex-col gap-4">
              <h3 className="font-display font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-app-border pb-2.5 flex items-center justify-between">
                <span>Courses</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </h3>

              {/* Course Search */}
              <input
                type="text"
                placeholder="Search Course"
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-semibold"
              />

              {/* Course Checkboxes List */}
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar text-xs">
                {capCourses
                  .filter((course) => course.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map((course) => (
                    <label key={course} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-950 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleToggleCourse(course)}
                        className="rounded border-slate-350 dark:border-app-border bg-transparent text-emerald-650 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-650 dark:text-slate-300">{course}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* SPECIALIZATION FILTER PANEL */}
            <div className="p-5 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-sm flex flex-col gap-4">
              <h3 className="font-display font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-app-border pb-2.5 flex items-center justify-between">
                <span>Specilization</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </h3>

              {/* Specialization Search */}
              <input
                type="text"
                placeholder="Search Specilization"
                value={specializationSearch}
                onChange={(e) => setSpecializationSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-emerald-600 font-semibold"
              />

              {/* Specialization Checkboxes List */}
              <div className="flex flex-col gap-2.5 max-h-48 overflow-y-auto pr-1 no-scrollbar text-xs">
                {capSpecializations
                  .filter((spec) => spec.toLowerCase().includes(specializationSearch.toLowerCase()))
                  .map((spec) => (
                    <label key={spec} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-950 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSpecializations.includes(spec)}
                        onChange={() => handleToggleSpecialization(spec)}
                        className="rounded border-slate-350 dark:border-app-border bg-transparent text-emerald-650 focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                      />
                      <span className="font-semibold text-slate-650 dark:text-slate-300">{spec}</span>
                    </label>
                  ))}
              </div>
            </div>

          </aside>

          {/* RIGHT GRID: COLLEGES LIST CARDS */}
          <main className="lg:col-span-9 w-full">
            {filteredColleges.length === 0 ? (
              <div className="py-24 text-center bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-2xl shadow-sm">
                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">No Colleges/Universities found matching the filters.</p>
                <button
                  onClick={() => {
                    setSelectedCourses([]);
                    setSelectedSpecializations([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 text-xs font-black text-white bg-[#FF7A00] hover:bg-[#E06C00] px-5 py-2.5 rounded-lg border-none cursor-pointer transition-all uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {filteredColleges.map((college) => {
                  const isSelected = selectedColleges.includes(college.id);
                  return (
                    <ScrollReveal key={college.id} delay={0} duration={0.4}>
                      <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                        
                        {/* College image with absolute bottom translucent black banner carrying college name overlay */}
                        <div className="relative h-44 w-full bg-slate-900 overflow-hidden shrink-0">
                          <img 
                            src={college.image} 
                            alt={college.name} 
                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                          
                          {/* Translucent Banner Overlay matching screenshot exactly */}
                          <div className="absolute bottom-0 left-0 right-0 bg-app-bg/75 p-2 flex items-center justify-center text-center">
                            <span className="text-[10px] font-black text-white leading-tight uppercase line-clamp-2">
                              {college.name}
                            </span>
                          </div>
                        </div>

                        {/* Mid Section Card parameters */}
                        <div className="p-4 flex flex-col gap-3 text-left text-xs font-semibold text-slate-655 dark:text-slate-350">
                          <div className="flex justify-between items-center border-b border-slate-100 dark:border-app-border pb-2">
                            <span>Application Fees:</span>
                            <span className="text-slate-900 dark:text-white font-black text-sm">
                              {college.fees === 0 ? '₹ 0' : `₹ ${college.fees}`}
                            </span>
                          </div>

                          <div className="flex justify-between items-start pt-1 gap-2">
                            <span className="shrink-0">Course:</span>
                            <span className="text-slate-900 dark:text-white font-bold text-right truncate">
                              {college.courses.join(' | ') || '--'}
                            </span>
                          </div>
                        </div>

                        {/* Orange Select Action button */}
                        <div className="p-4 pt-0">
                          <button
                            onClick={() => handleToggleCollege(college.id)}
                            className={`w-full py-2.5 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1 cursor-pointer transition-all border-none ${
                              isSelected
                                ? 'bg-slate-800 text-white hover:bg-slate-900 dark:bg-white/10 dark:text-white dark:hover:bg-white/15'
                                : 'bg-[#FF7A00] text-white hover:bg-[#E06C00] shadow-md shadow-orange-500/10'
                            }`}
                          >
                            {isSelected ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                                <span>Selected</span>
                              </>
                            ) : (
                              <span>Select</span>
                            )}
                          </button>
                        </div>

                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}
          </main>

        </section>

      </div>

      {/* COMMON APPLICATION SUBMISSION FORM MODAL */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div 
            onClick={() => setIsSubmitModalOpen(false)}
            className="fixed inset-0 bg-app-bg/70 backdrop-blur-sm" 
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg p-6 md:p-8 shadow-2xl z-10 overflow-hidden text-left flex flex-col gap-5">
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-app-border pb-3">
              <div>
                <h3 className="font-display font-extrabold text-base md:text-lg text-slate-900 dark:text-white uppercase tracking-wide">
                  Common Application (CAP)
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-450 font-bold mt-0.5 leading-none uppercase">
                  Standardized Admissions form
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded bg-slate-100 dark:bg-app-card border border-transparent hover:border-slate-350 dark:hover:border-app-border text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              
              {/* List of Selected Colleges */}
              <div className="bg-slate-50 dark:bg-app-card p-4 rounded-xl border border-slate-200 dark:border-app-border">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-wide block mb-2">Selected Colleges ({selectedColleges.length})</span>
                <div className="flex flex-col gap-2 max-h-24 overflow-y-auto pr-1 no-scrollbar text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  {capColleges
                    .filter((college) => selectedColleges.includes(college.id))
                    .map((college) => (
                      <div key={college.id} className="flex justify-between gap-4 leading-tight">
                        <span className="truncate flex-1">{college.name}</span>
                        <span className="shrink-0 text-slate-500">{college.fees === 0 ? '₹ 0' : `₹ ${college.fees}`}</span>
                      </div>
                    ))}
                </div>
                <div className="border-t border-slate-200 dark:border-app-border pt-2.5 mt-2.5 flex justify-between items-center text-xs font-black">
                  <span>TOTAL APPLICATION FEE:</span>
                  <span className="text-[#FF7A00] text-sm">₹ {totalFees}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder=" राहुल वर्मा / Rahul Verma"
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

              <div className="flex flex-col gap-1.5">
                <label className="text-slate-500 dark:text-slate-400 uppercase tracking-wide">Highest Qualification</label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="px-3 py-3 rounded-xl bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-900 dark:text-white outline-none focus:border-[#FF7A00] font-semibold"
                >
                  <option value="12th Pass">12th Pass / Equivalent</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree / PG</option>
                </select>
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
                    <span>Submit Common Application</span>
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

export default CommonApplication;
