import { useState } from 'react';
import { Search, X, Calendar, BookOpen, Clock, FileText, Download, CheckCircle, ChevronDown, RefreshCw, Sparkles } from 'lucide-react';
import { useExams } from '../hooks/useExams';
import { ExamCard } from '../components/cards/ExamCard';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import type { Exam } from '../types';
import { useGlobalStore } from '../store/useGlobalStore';

export const Exams = () => {
  const addToast = useGlobalStore().addToast;
  const { useExamsQuery } = useExams();
  const { data: examsList, isLoading } = useExamsQuery({ limit: 1000 });
  const finalExams = examsList || [];

  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');

  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);

  const [sortBy, setSortBy] = useState('name');
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [activeModalTab, setActiveModalTab] = useState('Overview');

  const streamsList = [
    'Engineering',
    'Management',
    'Commerce',
    'Law',
    'Arts',
    'Architecture',
    'Dental',
    'Agriculture',
    'Design'
  ];

  const coursesList = [
    'Allied',
    'B.A.',
    'B.Sc.',
    'BBA',
    'B.Com',
    'B.Ed',
    'B.Tech',
    'BCA',
    'BDS',
    'MBA'
  ];

  const modesList = [
    'Online',
    'Offline',
    'ONLINE & OFFLINE BOTH'
  ];

  const handleToggleStream = (stream: string) => {
    setSelectedStreams((prev) =>
      prev.includes(stream) ? prev.filter((s) => s !== stream) : [...prev, stream]
    );
  };

  const handleToggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleToggleMode = (mode: string) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const handleResetFilters = () => {
    setSearchInput('');
    setQuery('');
    setSelectedStreams([]);
    setCourseSearch('');
    setSelectedCourses([]);
    setSelectedModes([]);
    setSortBy('name');
  };

  // Filter & Sort Logic
  const filteredExams = finalExams.filter((exam: any) => {
    if (query.trim()) {
      const q = query.toLowerCase();
      const matches =
        exam.name.toLowerCase().includes(q) || exam.fullName.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (selectedStreams.length > 0) {
      const matchesStream = selectedStreams.some(
        (s) => s.toLowerCase() === exam.category.toLowerCase()
      );
      if (!matchesStream) return false;
    }

    if (selectedCourses.length > 0) {
      if (!exam.courses || !selectedCourses.some((c) => exam.courses?.includes(c))) {
        return false;
      }
    }

    if (selectedModes.length > 0) {
      const hasOnline = selectedModes.includes('Online');
      const hasOffline = selectedModes.includes('Offline');
      const hasBoth = selectedModes.includes('ONLINE & OFFLINE BOTH');

      let matchesMode = false;
      if (hasBoth && exam.mode === 'both') matchesMode = true;
      if (hasOnline && (exam.mode === 'online' || exam.mode === 'both')) matchesMode = true;
      if (hasOffline && (exam.mode === 'offline' || exam.mode === 'both')) matchesMode = true;

      if (!matchesMode) return false;
    }

    return true;
  });

  const sortedExams = [...filteredExams].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'examDate') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    if (sortBy === 'applicationDate') {
      return new Date(a.registrationDeadline).getTime() - new Date(b.registrationDeadline).getTime();
    }
    return 0;
  });

  const handleOpenDetails = (exam: Exam, activeTab?: string) => {
    setSelectedExam(exam);
    setActiveModalTab(activeTab || 'Overview');
  };

  // Dynamic Days Left Helper
  const getDaysLeft = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} Days Left` : 'Exam Concluded';
  };

  return (
    <div className="relative pt-24 pb-20 min-h-screen bg-app-bg text-app-text">
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-left">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 p-8 rounded-3xl glass border border-app-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A00]/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              National Timelines 2026
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
              Entrance <span className="gradient-text-primary">Exams</span>
            </h1>
            <p className="text-sm text-app-muted mt-2 max-w-xl">
              Track deadlines, modes of study, syllabus parameters, and download sample papers for major national exams.
            </p>
          </div>
          
          <form onSubmit={handleSearchSubmit} className="w-full md:max-w-md flex bg-app-card border border-app-border rounded-xl overflow-hidden p-1 gap-1 relative z-10">
            <div className="flex-1 flex items-center pl-3">
              <Search className="w-4 h-4 text-app-muted shrink-0" />
              <input
                type="text"
                placeholder="Search CAT, JEE, NEET..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-transparent border-0 outline-none text-xs text-slate-900 placeholder-[#94A3B8] px-3.5 py-3 font-semibold"
              />
            </div>
            <button
              type="submit"
              className="bg-[#FF7A00] hover:bg-[#D14B00] text-white text-xs font-bold uppercase px-6 py-3 rounded-lg transition-all cursor-pointer border-none shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Real Countdown Section for major exams */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="h-24 rounded-2xl border border-app-border bg-app-card/30 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {finalExams.slice(0, 3).map((ex: any) => (
              <div key={ex.id} className="p-5 rounded-2xl glass border border-app-border bg-gradient-to-tr from-white/[0.01] to-white/[0.03] flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[9px] font-black uppercase text-app-muted tracking-wider">Exam Countdown</span>
                  <h4 className="font-extrabold text-sm text-white mt-1 leading-tight">{ex.name}</h4>
                  <p className="text-[10px] text-app-muted mt-0.5">{ex.fullName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block text-[10px] px-3 py-1 rounded-full bg-[#FF7A00]/25 text-[#FF7A00] font-black tracking-wider uppercase">
                    {getDaysLeft(ex.date)}
                  </span>
                  <p className="text-[9px] text-app-muted mt-1.5 font-bold">Exam: {ex.date.replace(/-/g, '.')}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6 p-6 glass rounded-2xl border border-app-border shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <span className="text-xs font-black text-white flex items-center gap-2 uppercase tracking-wider">
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-app-muted hover:text-[#FF7A00] flex items-center gap-1 bg-transparent border-none cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* STREAM FILTER */}
            <div className="flex flex-col gap-3 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Stream Category
              </label>
              <div className="flex flex-col gap-2.5 text-xs text-app-muted max-h-48 overflow-y-auto pr-1 scrollbar-thin font-medium">
                {streamsList.map((stream) => (
                  <label key={stream} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedStreams.includes(stream)}
                      onChange={() => handleToggleStream(stream)}
                      className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                    />
                    <span>{stream}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* COURSES FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Target Courses
              </label>
              <input
                type="text"
                placeholder="Filter courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2.5 text-xs text-app-muted max-h-48 overflow-y-auto pr-1 scrollbar-thin font-medium mt-1">
                {coursesList
                  .filter((course) => course.toLowerCase().includes(courseSearch.toLowerCase()))
                  .map((course) => (
                    <label key={course} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleToggleCourse(course)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{course}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* MODE FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Exam Mode
              </label>
              <div className="flex flex-col gap-2.5 text-xs text-app-muted font-medium">
                {modesList.map((mode) => (
                  <label key={mode} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedModes.includes(mode)}
                      onChange={() => handleToggleMode(mode)}
                      className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                    />
                    <span className="uppercase">{mode}</span>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* RIGHT: Results Catalog */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full">
            
            {/* Top Bar Sort Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 glass border border-app-border rounded-2xl w-full">
              <span className="text-xs text-app-muted font-bold">
                Showing <b className="text-white">{sortedExams.length}</b> entrance exams matching filters
              </span>

              {/* Sort selector */}
              <div className="relative flex items-center gap-2 self-end sm:self-auto shrink-0">
                <span className="text-[10px] font-black text-app-muted uppercase tracking-wider">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-app-card border border-app-border text-xs font-semibold text-white py-2 pl-3 pr-8 rounded-xl outline-none focus:border-[#FF7A00] cursor-pointer"
                  >
                    <option value="name">Exam Name</option>
                    <option value="examDate">Exam Date</option>
                    <option value="applicationDate">Application Date</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-2.5 top-2.5 text-app-muted pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Grid list */}
            {isLoading ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="h-44 rounded-2xl border border-app-border bg-app-card/30 animate-pulse" />
                ))}
              </div>
            ) : sortedExams.length === 0 ? (
              <div className="py-24 text-center glass border border-app-border rounded-2xl flex flex-col items-center justify-center">
                <BookOpen className="w-12 h-12 text-app-muted/30 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Matching Exams</h3>
                <p className="text-app-muted text-sm max-w-sm mb-6">
                  Try adjusting filters or categories to discover matching entrance cycles.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#D14B00] px-5 py-3 rounded-xl border-none cursor-pointer transition-colors shadow-lg shadow-[#FF7A00]/25"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
                {sortedExams.map((exam) => (
                  <ScrollReveal key={exam.id} delay={0} duration={0.4}>
                    <ExamCard exam={exam} onOpenDetails={handleOpenDetails} />
                  </ScrollReveal>
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* DETAILED TIMELINE DIALOG MODAL */}
      {selectedExam && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedExam(null)}
            className="fixed inset-0 bg-app-bg/85 backdrop-blur-md"
          />

          <div className="relative w-full max-w-2xl rounded-3xl border border-app-border bg-app-card p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-left font-medium">
            
            <button
              onClick={() => setSelectedExam(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-app-card text-app-muted hover:text-white border border-app-border hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-app-card rounded-2xl border border-app-border shrink-0 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-[#FF7A00]" />
              </div>
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FF7A00]/10 text-[#FF7A00] font-black uppercase tracking-wider">
                  Exam Profile
                </span>
                <h3 className="text-xl md:text-2xl font-display font-black text-white mt-1 leading-tight">
                  {selectedExam.name} Details
                </h3>
                <p className="text-xs text-app-muted mt-0.5">{selectedExam.fullName}</p>
              </div>
            </div>

            {/* Modal Tabs */}
            <div className="flex gap-1 border-b border-app-border overflow-x-auto pb-0.5 mb-6 scrollbar-none">
              {['Overview', 'Exam Date', 'Syllabus', 'Sample Papers'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveModalTab(tab)}
                  className={`py-2.5 px-4 text-xs font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    activeModalTab === tab
                      ? 'border-[#FF7A00] text-[#FF7A00]'
                      : 'border-transparent text-app-muted hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Modal Tab Content */}
            <div className="space-y-4 text-xs sm:text-sm text-app-muted leading-relaxed">
              {activeModalTab === 'Overview' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-extrabold text-white mb-1.5 text-sm flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#FF7A00]" /> Description</h4>
                    <p>{selectedExam.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div className="p-4 rounded-xl bg-app-card border border-app-border">
                      <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Difficulty level</span>
                      <span className="text-sm font-extrabold text-white block mt-1">{selectedExam.difficulty}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-app-card border border-app-border">
                      <span className="text-[10px] text-app-muted font-black uppercase tracking-wider block">Mode of examination</span>
                      <span className="text-sm font-extrabold text-white block mt-1 capitalize">{selectedExam.mode || 'online'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'Exam Date' && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-white mb-2 text-sm flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#FF7A00]" /> Registration & Exam Deadlines</h4>
                  <div className="flex flex-col gap-3">
                    {[
                      { label: 'Registration Deadline', date: selectedExam.registrationDeadline, active: true },
                      { label: 'Examination Date', date: selectedExam.date, active: true },
                      { label: 'Result Announcement Date', date: selectedExam.resultDate || 'TBD', active: false }
                    ].map((step, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-app-card border border-app-border">
                        <span className="font-bold text-white">{step.label}</span>
                        <span className="text-xs text-app-muted font-extrabold">{step.date.replace(/-/g, '.')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'Syllabus' && (
                <div className="space-y-4">
                  <h4 className="font-extrabold text-white mb-2 text-sm flex items-center gap-1.5"><FileText className="w-4 h-4 text-[#FF7A00]" /> Syllabus Subject Weightages</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedExam.syllabus.map((sub, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 rounded-xl bg-app-card border border-app-border text-xs text-white font-extrabold"
                      >
                        <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                        {sub}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalTab === 'Sample Papers' && (
                <div className="space-y-5 text-center py-6">
                  <div className="w-12 h-12 bg-app-card rounded-full flex items-center justify-center mx-auto border border-app-border mb-2">
                    <Download className="w-6 h-6 text-[#FF7A00]" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">Download Free Mock Sample Papers</h4>
                    <p className="text-xs text-app-muted max-w-sm mx-auto mt-1 leading-relaxed">
                      Prepare with Aruna-Nand EdTech Services' analyzed exam papers based on the 2026 registration guidelines.
                    </p>
                  </div>
                  <button
                    onClick={() => addToast('Mock papers successfully compiled. Check your downloads directory!', 'success')}
                    className="py-3 px-6 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF7A00]/25 transition-all border-none cursor-pointer"
                  >
                    Download PDF Papers
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Exams;
