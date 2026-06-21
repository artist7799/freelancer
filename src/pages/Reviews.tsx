import { useState } from 'react';
import { Search, X, Star, MapPin, Award, BookOpen, MessageSquare } from 'lucide-react';
import { useColleges } from '../hooks/useColleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import type { CollegeReview } from '../types';
import { reviews as staticReviews } from '../data/reviews';

export const Reviews = () => {
  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse } = useCollegesQuery({ limit: 1000 });
  const collegesList = collegesResponse?.data?.colleges || [];

  const dbReviews = collegesList.flatMap((col: any) => 
    (col.reviews || []).map((rev: any) => ({
      id: `${col.id}-${rev.name}`,
      collegeName: col.name,
      studentName: rev.name,
      course: col.category,
      state: col.location.split(', ')[1] || '',
      city: col.location.split(', ')[0] || '',
      rating: rev.rating || 5,
      campusLife: rev.text || '',
      internships: 'Good internship opportunities provided in local corporate groups.',
      placements: 'Verified hiring packages from campus partners.'
    }))
  );

  const reviews = [...dbReviews, ...staticReviews];

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [stateSearch, setStateSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Modal active review
  const [activeReview, setActiveReview] = useState<CollegeReview | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Options derived from reviews data
  const allStates: string[] = Array.from(new Set(reviews.map((r: any) => r.state).filter(Boolean))).sort() as string[];
  const allCities: string[] = Array.from(new Set(reviews.map((r: any) => r.city).filter(Boolean))).sort() as string[];

  // Avatar helper matching mockup ("Sardar" -> "SA", "SU" -> "SU", "Lakshmi" -> "LA")
  const getCollegeInitials = (name: string) => {
    const clean = name.replace(/[^a-zA-Z\s]/g, '').trim();
    return clean.slice(0, 2).toUpperCase();
  };

  const handleToggleState = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
    setCurrentPage(1);
  };

  const handleToggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
    setCurrentPage(1);
  };

  const handleToggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
    setCurrentPage(1);
  };

  // Main Filter Logic
  const filteredReviews = reviews.filter((review: any) => {
    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const nameMatch =
        review.collegeName.toLowerCase().includes(q) ||
        review.studentName.toLowerCase().includes(q) ||
        review.course.toLowerCase().includes(q) ||
        review.campusLife.toLowerCase().includes(q);
      if (!nameMatch) return false;
    }

    // 2. States Selection
    if (selectedStates.length > 0) {
      if (!selectedStates.includes(review.state)) return false;
    }

    // 3. Cities Selection
    if (selectedCities.length > 0) {
      if (!selectedCities.includes(review.city)) return false;
    }

    // 4. Rating Selection
    if (selectedRatings.length > 0) {
      if (!selectedRatings.includes(review.rating)) return false;
    }

    return true;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage);

  const topReviews = [...reviews].filter((r: any) => r.rating === 5).slice(0, 4);

  return (
    <div className="relative pt-16 min-h-screen bg-slate-50/30 dark:bg-app-bg">
      
      {/* 1. TOP BANNER SEARCH CONTAINER */}
      <section className="relative w-full h-80 bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-center px-6 border-b border-slate-800">
        {/* Background building wallpaper overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 opacity-90" />
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M70 60c-2 0-3 1-4 2v4c0 1-1 2-2 2h-4c-1 0-2-1-2-2v-4c-1-1-2-2-4-2h-4c-1 0-2-1-2-2v-4c0-1 1-2 2-2h4c2 0 3-1 4-2v-4c0-1 1-2 2-2h4c1 0 2 1 2 2v4c1 1 2 2 4 2h4c1 0 2 1 2 2v4c0 1-1 2-2 2h-4z' fill='%2394a3b8' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />

        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-6 mt-6">
          <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-wider drop-shadow-md">
            College Reviews
          </h1>
          
          <div className="w-full max-w-3xl flex bg-white rounded-full shadow-xl overflow-hidden p-1 gap-1 border border-slate-200">
            <div className="flex-1 flex items-center pl-4">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search reviews by college name, course or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-transparent border-0 outline-none text-sm text-slate-800 placeholder-slate-400 px-3.5 py-3 font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CATALOG CONTENT */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Filters Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6 text-left">
            
            {/* FIND STATE */}
            <div className="p-6 bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl shadow-md flex flex-col gap-3">
              <span className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                FIND STATE
              </span>
              <input
                type="text"
                placeholder="Search State"
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#F97316]"
              />
              <div className="flex flex-col gap-2.5 text-xs text-slate-650 dark:text-slate-400 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                {allStates
                  .filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase()))
                  .map((state) => (
                    <label key={state} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => handleToggleState(state)}
                        className="rounded border-slate-350 dark:border-app-border bg-transparent text-[#F97316] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                      />
                      <span>{state}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* FIND CITY */}
            <div className="p-6 bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl shadow-md flex flex-col gap-3">
              <span className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#F97316]" />
                FIND CITY
              </span>
              <input
                type="text"
                placeholder="Search City"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-lg bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border text-slate-800 dark:text-white placeholder-slate-400 outline-none focus:border-[#F97316]"
              />
              <div className="flex flex-col gap-2.5 text-xs text-slate-650 dark:text-slate-400 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                {allCities
                  .filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
                  .map((city) => (
                    <label key={city} className="flex items-center gap-2.5 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleToggleCity(city)}
                        className="rounded border-slate-350 dark:border-app-border bg-transparent text-[#F97316] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* RATING FILTER */}
            <div className="p-6 bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl shadow-md flex flex-col gap-3.5">
              <span className="text-xs font-black text-slate-850 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Star className="w-4 h-4 fill-[#F97316] stroke-[#F97316]" />
                Rating
              </span>
              <div className="flex flex-col gap-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <label key={stars} className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(stars)}
                      onChange={() => handleToggleRating(stars)}
                      className="rounded border-slate-350 dark:border-app-border bg-transparent text-[#F97316] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < stars
                              ? 'fill-[#F97316] stroke-[#F97316]'
                              : 'fill-slate-200 dark:fill-white/10 stroke-slate-300 dark:stroke-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </label>
                ))}
              </div>
            </div>

          </aside>

          {/* CENTER: Reviews List Cards */}
          <main className="lg:col-span-6 flex flex-col gap-6 w-full text-left">
            {paginatedReviews.length === 0 ? (
              <div className="py-24 text-center bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl">
                <MessageSquare className="w-12 h-12 text-slate-300 dark:text-white/10 mx-auto mb-3" />
                <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">No reviews found matching the filters.</p>
                <button
                  onClick={() => {
                    setSelectedStates([]);
                    setSelectedCities([]);
                    setSelectedRatings([]);
                    setSearchQuery('');
                  }}
                  className="mt-4 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] px-5 py-2.5 rounded-lg border-none cursor-pointer transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6 w-full">
                {paginatedReviews.map((review: any) => {
                  const initials = getCollegeInitials(review.collegeName);
                  return (
                    <ScrollReveal key={review.id} delay={0} duration={0.4}>
                      <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group">
                        
                        {/* Upper Header Row: initials circular avatar + college/student details */}
                        <div className="flex gap-4 items-start w-full">
                          <div className="w-12 h-12 bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400 rounded-full flex items-center justify-center shrink-0 font-display font-black text-sm select-none border border-purple-500/25">
                            {initials}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-display font-extrabold text-sm text-slate-800 dark:text-white leading-tight uppercase truncate">
                              {review.collegeName}
                            </h3>
                            <p className="text-xs text-[#F97316] dark:text-[#F97316] font-black mt-1 leading-none flex items-center gap-1.5">
                              <span>{review.studentName}</span>
                              <span className="inline-flex items-center justify-center w-3.5 h-3.5 bg-success rounded-full text-white text-[8px] font-bold" title="Verified Student">✓</span>
                              <span className="text-slate-400 dark:text-slate-500 font-medium ml-1">{review.course}</span>
                            </p>
                          </div>

                          {/* Star Rating badges */}
                          <div className="flex items-center gap-0.5 shrink-0 bg-slate-50 dark:bg-app-card border border-slate-100 dark:border-app-border px-2 py-1 rounded-lg">
                            <Star className="w-3.5 h-3.5 fill-[#F97316] stroke-[#F97316]" />
                            <span className="text-[10px] font-black text-slate-750 dark:text-slate-200 mt-0.5">{review.rating}.0</span>
                          </div>
                        </div>

                        {/* Mid Section: Review details parameter rows */}
                        <div className="flex flex-col gap-3.5 mt-5 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-app-border pt-4">
                          <p className="leading-relaxed">
                            <b className="text-slate-800 dark:text-slate-200 font-bold block mb-1">Campus Life :</b>
                            {review.campusLife}
                          </p>
                          <p className="leading-relaxed">
                            <b className="text-slate-800 dark:text-slate-200 font-bold block mb-1">Internships Opportunities :</b>
                            {review.internships}
                          </p>
                          <p className="leading-relaxed">
                            <b className="text-slate-800 dark:text-slate-200 font-bold block mb-1">Placement Experience :</b>
                            {review.placements}
                          </p>
                        </div>

                        {/* Bottom-right Read More trigger link */}
                        <div className="flex justify-end mt-4 border-t border-slate-100 dark:border-app-border pt-3">
                          <button
                            onClick={() => setActiveReview(review)}
                            className="text-xs font-black text-[#F97316] hover:text-[#EA580C] uppercase tracking-wider bg-transparent border-none cursor-pointer flex items-center gap-1 transition-colors"
                          >
                            Read More
                          </button>
                        </div>

                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            )}

            {/* Centered Prev / Next pagination controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4 border-t border-slate-200 dark:border-app-border pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-app-card border border-slate-200 dark:border-app-border hover:bg-slate-50 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase select-none">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-app-card border border-slate-200 dark:border-app-border hover:bg-slate-50 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>

          {/* RIGHT: Top Reviews Sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-6 text-left sticky top-24">
            <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl shadow-md overflow-hidden">
              {/* Header Box in Orange */}
              <div className="bg-[#F97316] text-white px-5 py-4 font-display font-black text-sm uppercase tracking-wider flex items-center gap-2">
                <Award className="w-5 h-5" />
                Top Reviews
              </div>
              
              {/* List body */}
              <div className="p-4 flex flex-col gap-4">
                {topReviews.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setActiveReview(r)}
                    className="flex flex-col gap-1.5 p-3 rounded-lg bg-slate-50 dark:bg-app-card hover:bg-slate-100 dark:hover:bg-white/10 text-left border border-transparent transition-all w-full cursor-pointer"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display font-extrabold text-[10px] text-slate-800 dark:text-white uppercase truncate flex-1 pr-2">
                        {r.collegeName}
                      </span>
                      <div className="flex items-center shrink-0">
                        <Star className="w-3 h-3 fill-[#F97316] stroke-[#F97316]" />
                        <span className="text-[9px] font-black text-slate-600 dark:text-slate-300 ml-0.5">{r.rating}.0</span>
                      </div>
                    </div>
                    
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold leading-none uppercase">
                      By {r.studentName}
                    </p>
                    
                    <p className="text-[11px] text-slate-500 dark:text-slate-450 line-clamp-2 leading-snug">
                      "{r.campusLife}"
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* 3. INTERACTIVE REVIEW DETAILS POPUP MODAL */}
      {activeReview && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveReview(null)}
            className="fixed inset-0 bg-app-bg/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-left">
            
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-5 border-b border-slate-100 dark:border-app-border pb-4">
              <div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F97316]/10 border border-[#F97316]/25 text-[#F97316] font-black uppercase tracking-wider">
                  Rating {activeReview.rating}.0 / 5.0
                </span>
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-2.5 uppercase leading-tight">
                  {activeReview.collegeName}
                </h3>
                <p className="text-xs text-[#F97316] font-black mt-1 uppercase">
                  {activeReview.studentName} <span className="text-slate-450 dark:text-slate-500 font-bold ml-1">{activeReview.course}</span>
                </p>
              </div>
              <button
                onClick={() => setActiveReview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-app-card border border-transparent transition-all cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Full text review details */}
            <div className="flex flex-col gap-5 text-sm text-slate-600 dark:text-slate-400">
              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#F97316]" />
                  Campus Life
                </h4>
                <p className="leading-relaxed bg-slate-50 dark:bg-app-card p-4 rounded-xl border border-slate-100 dark:border-app-border">
                  {activeReview.campusLife}
                </p>
              </div>

              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#F97316]" />
                  Internships Opportunities
                </h4>
                <p className="leading-relaxed bg-slate-50 dark:bg-app-card p-4 rounded-xl border border-slate-100 dark:border-app-border">
                  {activeReview.internships}
                </p>
              </div>

              <div>
                <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-wider text-xs mb-2 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-[#F97316]" />
                  Placement Experience
                </h4>
                <p className="leading-relaxed bg-slate-50 dark:bg-app-card p-4 rounded-xl border border-slate-100 dark:border-app-border">
                  {activeReview.placements}
                </p>
              </div>
            </div>

            {/* Close button */}
            <div className="mt-8 flex justify-end border-t border-slate-100 dark:border-app-border pt-4">
              <button
                onClick={() => setActiveReview(null)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-all border-none cursor-pointer"
              >
                Close Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Reviews;
