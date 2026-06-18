import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CollegeCard } from '../components/cards/CollegeCard';
import { colleges } from '../data/colleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [feeFilter, setFeeFilter] = useState('all');
  const [placementFilter, setPlacementFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync state with URL params on mount/change
  useEffect(() => {
    const locParam = searchParams.get('location');
    const courseParam = searchParams.get('course');

    if (locParam) {
      // Normalize 'Delhi NCR' match
      const queryLoc = locParam === 'Delhi' ? 'Delhi NCR' : locParam;
      setSelectedLocations([queryLoc]);
    } else {
      setSelectedLocations([]);
    }

    if (courseParam) {
      setSelectedCourses([courseParam]);
    } else {
      setSelectedCourses([]);
    }
    
    setSearchQuery('');
    setCurrentPage(1);
  }, [searchParams]);

  // Handle toggles
  const toggleLocation = (loc: string) => {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    );
    setCurrentPage(1);
  };

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLocations([]);
    setSelectedCourses([]);
    setFeeFilter('all');
    setPlacementFilter('all');
    setRatingFilter('all');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Filter computation logic
  const filteredColleges = colleges.filter((college) => {
    // Search query match
    const query = searchQuery.toLowerCase().trim();
    if (query && !college.name.toLowerCase().includes(query) && !college.location.toLowerCase().includes(query)) {
      return false;
    }

    // Location match
    if (selectedLocations.length > 0) {
      const match = selectedLocations.some((loc) => college.location.includes(loc));
      if (!match) return false;
    }

    // Course match
    if (selectedCourses.length > 0) {
      if (!selectedCourses.includes(college.category)) return false;
    }

    // Fees match
    // Values: e.g. "₹2.2 Lakhs / Year", "₹1,628 / Year"
    if (feeFilter !== 'all') {
      const feeNum = parseFloat(college.fees.replace(/[^\d.]/g, ''));
      const isLakhs = college.fees.includes('Lakh');
      const annualFee = isLakhs ? feeNum * 100000 : feeNum;

      if (feeFilter === 'low' && annualFee > 100000) return false;
      if (feeFilter === 'mid' && (annualFee < 100000 || annualFee > 300000)) return false;
      if (feeFilter === 'high' && annualFee < 300000) return false;
    }

    // Placements match
    // Values: e.g. "₹21.8 LPA Average"
    if (placementFilter !== 'all') {
      const placementVal = parseFloat(college.placements.replace(/[^\d.]/g, ''));
      if (placementFilter === '20' && placementVal < 20) return false;
      if (placementFilter === '15' && placementVal < 15) return false;
      if (placementFilter === '10' && placementVal < 10) return false;
    }

    // Rating match
    if (ratingFilter !== 'all') {
      const ratingVal = parseFloat(ratingFilter);
      if (college.rating < ratingVal) return false;
    }

    return true;
  });

  // Pagination bounds
  const totalPages = Math.ceil(filteredColleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedColleges = filteredColleges.slice(startIndex, startIndex + itemsPerPage);

  const locationsList = ['Bangalore', 'Hyderabad', 'Pune', 'Mumbai', 'Delhi NCR', 'Rajasthan'];
  const coursesList = ['Engineering', 'Management', 'Medicine', 'Law', 'Commerce'];

  return (
    <div className="relative pt-28 pb-20 min-h-screen">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Title */}
        <div className="text-left mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Discover Elite Colleges
          </h1>
          <p className="text-sm text-app-muted max-w-md">
            Compare tuition metrics, rating logs, and corporate placement files across {colleges.length} premium institutes.
          </p>
        </div>

        {/* Search & Grid configuration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar Filters */}
          <aside className="lg:col-span-3 flex flex-col gap-5 p-5 rounded-2xl glass border-app-border">
            <div className="flex items-center justify-between border-b border-app-border/40 pb-3">
              <span className="text-sm font-bold text-app-text flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-primary" />
                Filter Catalog
              </span>
              <button
                onClick={handleClearFilters}
                className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Filter by Category */}
            <div className="flex flex-col gap-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-app-muted">Course Category</h4>
              <div className="flex flex-col gap-1.5 text-xs text-app-muted">
                {coursesList.map((course) => (
                  <label key={course} className="flex items-center gap-2 cursor-pointer hover:text-app-text transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCourses.includes(course)}
                      onChange={() => toggleCourse(course)}
                      className="rounded border-app-border bg-transparent text-primary focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <span>{course}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Location */}
            <div className="flex flex-col gap-2.5 border-t border-app-border/40 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-app-muted">Locations</h4>
              <div className="flex flex-col gap-1.5 text-xs text-app-muted">
                {locationsList.map((loc) => (
                  <label key={loc} className="flex items-center gap-2 cursor-pointer hover:text-app-text transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                      className="rounded border-app-border bg-transparent text-primary focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <span>{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter by Fees */}
            <div className="flex flex-col gap-2.5 border-t border-app-border/40 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-app-muted">Annual Tuition Fee</h4>
              <div className="flex flex-col gap-2 text-xs text-app-muted">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fees"
                    checked={feeFilter === 'all'}
                    onChange={() => setFeeFilter('all')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>All Bracket Prices</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fees"
                    checked={feeFilter === 'low'}
                    onChange={() => setFeeFilter('low')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Under ₹1.0 Lakh / Yr</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fees"
                    checked={feeFilter === 'mid'}
                    onChange={() => setFeeFilter('mid')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>₹1.0L - ₹3.0L / Yr</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="fees"
                    checked={feeFilter === 'high'}
                    onChange={() => setFeeFilter('high')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above ₹3.0L / Yr</span>
                </label>
              </div>
            </div>

            {/* Filter by Placements */}
            <div className="flex flex-col gap-2.5 border-t border-app-border/40 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-app-muted">Avg placements Package</h4>
              <div className="flex flex-col gap-2 text-xs text-app-muted">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="placements"
                    checked={placementFilter === 'all'}
                    onChange={() => setPlacementFilter('all')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Any Average Package</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="placements"
                    checked={placementFilter === '20'}
                    onChange={() => setPlacementFilter('20')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above ₹20 LPA</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="placements"
                    checked={placementFilter === '15'}
                    onChange={() => setPlacementFilter('15')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above ₹15 LPA</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="placements"
                    checked={placementFilter === '10'}
                    onChange={() => setPlacementFilter('10')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above ₹10 LPA</span>
                </label>
              </div>
            </div>

            {/* Filter by Rating */}
            <div className="flex flex-col gap-2.5 border-t border-app-border/40 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-app-muted">Minimum Rating</h4>
              <div className="flex flex-col gap-2 text-xs text-app-muted">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === 'all'}
                    onChange={() => setRatingFilter('all')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Show All Ratings</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === '4.8'}
                    onChange={() => setRatingFilter('4.8')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above 4.8 Stars</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={ratingFilter === '4.5'}
                    onChange={() => setRatingFilter('4.5')}
                    className="text-primary bg-transparent focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Above 4.5 Stars</span>
                </label>
              </div>
            </div>
          </aside>

          {/* RIGHT: Results Catalog */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full">
            {/* Search inputs bar */}
            <div className="flex items-center gap-3 p-2.5 rounded-2xl glass border-app-border w-full">
              <div className="flex items-center gap-2 flex-1 pl-2">
                <Search className="w-5 h-5 text-app-muted" />
                <input
                  type="text"
                  placeholder="Query names or locations..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 bg-transparent border-0 outline-0 text-sm text-app-text placeholder-app-muted"
                />
              </div>
              <span className="hidden sm:inline text-xs text-app-muted font-semibold bg-white/5 px-3 py-1.5 rounded-lg border border-app-border whitespace-nowrap">
                {filteredColleges.length} Institutions Found
              </span>
            </div>

            {/* Empty check */}
            {paginatedColleges.length === 0 ? (
              <div className="py-20 text-center glass rounded-2xl border-app-border/40">
                <SlidersHorizontal className="w-10 h-10 text-app-muted/30 mx-auto mb-3" />
                <p className="text-app-muted text-sm font-semibold">No colleges match your active filters.</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-xs font-bold text-white bg-primary px-4 py-2 rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {paginatedColleges.map((college) => (
                  <ScrollReveal key={college.id} delay={0} duration={0.4}>
                    <CollegeCard college={college} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-app-border/40 pt-6 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2 rounded-xl bg-app-card border border-app-border hover:bg-app-card-hover text-xs font-bold text-app-text disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  Previous Page
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-8 h-8 text-xs font-bold rounded-lg border transition-all ${
                        currentPage === idx + 1
                          ? 'bg-primary border-primary text-white'
                          : 'border-app-border bg-app-card text-app-muted hover:text-app-text'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2 rounded-xl bg-app-card border border-app-border hover:bg-app-card-hover text-xs font-bold text-app-text disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  Next Page
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
export default Colleges;
