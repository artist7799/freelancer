import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, RefreshCw, ChevronDown, Award, DollarSign, Briefcase, Search, Sparkles } from 'lucide-react';
import { CollegeCard } from '../components/cards/CollegeCard';
import { useColleges } from '../hooks/useColleges';
import { ScrollReveal } from '../components/animations/ScrollReveal';

// Parser Helpers
const parseFees = (feeStr: string): number => {
  if (!feeStr || typeof feeStr !== 'string') return 0;
  // Strip currency symbols including ?, ₹, Rs, etc.
  const cleaned = feeStr.replace(/[^\d.]/g, '');
  const val = parseFloat(cleaned);
  if (isNaN(val)) return 0;
  // Handle Lakhs, Lakh, L
  if (/lakh/i.test(feeStr)) return val * 100000;
  if (/cr|crore/i.test(feeStr)) return val * 10000000;
  // If number is small (< 1000) assume it's in Lakhs
  if (val < 1000) return val * 100000;
  return val;
};

const parsePlacement = (placeStr: string): number => {
  const val = parseFloat(placeStr.replace(/[^\d.]/g, ''));
  if (isNaN(val)) return 0;
  if (placeStr.includes('CPA') || placeStr.includes('CR') || placeStr.includes('Cr')) return val * 100;
  return val;
};

const parseRank = (rankStr: string): number => {
  const match = rankStr.match(/\d+/);
  return match ? parseInt(match[0], 10) : 999;
};

// Premium Animated Skeleton
const CollegeSkeleton = () => (
  <div className="bg-app-card border border-app-border rounded-2xl overflow-hidden flex flex-col h-full animate-pulse">
    <div className="h-48 bg-app-card relative">
      <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 left-12 w-8 h-8 rounded-full bg-white/10" />
      <div className="absolute top-3 right-3 w-20 h-6 rounded-full bg-white/10" />
    </div>
    <div className="p-5 flex-1 flex flex-col gap-4">
      <div className="h-4 bg-white/10 rounded w-1/4" />
      <div className="h-6 bg-white/10 rounded w-3/4" />
      <div className="h-4 bg-white/10 rounded w-1/2" />
      <div className="grid grid-cols-2 gap-2 h-12 bg-app-card rounded-xl p-2.5" />
      <div className="h-8 bg-white/10 rounded-lg mt-auto" />
    </div>
  </div>
);

export const Colleges = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { useCollegesQuery } = useColleges();
  const { data: collegesResponse, isLoading } = useCollegesQuery({ limit: 1000 });
  // Handle both direct array and nested { data: { colleges: [] } } response shapes
  const collegesList: any[] = 
    Array.isArray(collegesResponse) ? collegesResponse :
    Array.isArray(collegesResponse?.colleges) ? collegesResponse.colleges :
    Array.isArray(collegesResponse?.data?.colleges) ? collegesResponse.data.colleges : [];


  // Search/Filter states
  const [nameQuery, setNameQuery] = useState('');
  const [activeSearchName, setActiveSearchName] = useState('');

  const [stateSearch, setStateSearch] = useState('');
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const [citySearch, setCitySearch] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const [specSearch, setSpecSearch] = useState('');
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);

  // Advanced filters
  const [maxFees, setMaxFees] = useState<number>(1500000); // Max 15 Lakhs (slider max)
  const [minRank, setMinRank] = useState<string>('all');
  const [minPlacement, setMinPlacement] = useState<string>('all');

  const [sortBy, setSortBy] = useState('rating');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const itemsPerPage = 9;

  // Synchronization with URL queries
  useEffect(() => {
    const urlQuery = searchParams.get('search');
    const courseParam = searchParams.get('course');

    if (urlQuery) {
      setNameQuery(urlQuery);
      setActiveSearchName(urlQuery);
    } else {
      setNameQuery('');
      setActiveSearchName('');
    }

    if (courseParam) {
      setSelectedCourses([courseParam]);
    } else {
      setSelectedCourses([]);
    }

    setCurrentPage(1);
  }, [searchParams]);

  // Trigger loading state on filter change to give premium desktop feedback
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [
    activeSearchName,
    selectedStates,
    selectedCities,
    selectedCourses,
    selectedSpecs,
    maxFees,
    minRank,
    minPlacement,
    sortBy
  ]);

  // Option lists derived from college data
  const allStates: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[1]).filter(Boolean))
  ).sort() as string[];

  const allCities: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.location.split(', ')[0]).filter(Boolean))
  ).sort() as string[];

  const allCourses: string[] = Array.from(
    new Set(collegesList.map((c: any) => c.category).filter(Boolean))
  ).sort() as string[];

  const allSpecs = [
    'Computer Science',
    'General Management',
    'General Medicine',
    'Business Analytics',
    'Business Administration',
    'Pediatrics',
    'Artificial Intelligence'
  ];

  // Toggle handlers
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

  const handleToggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
    setCurrentPage(1);
  };

  const handleToggleSpec = (spec: string) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
    setCurrentPage(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSearchName(nameQuery);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setNameQuery('');
    setActiveSearchName('');
    setStateSearch('');
    setSelectedStates([]);
    setCitySearch('');
    setSelectedCities([]);
    setCourseSearch('');
    setSelectedCourses([]);
    setSpecSearch('');
    setSelectedSpecs([]);
    setMaxFees(1500000);
    setMinRank('all');
    setMinPlacement('all');
    setSortBy('rating');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Main Filter Logic
  const filteredColleges = collegesList.filter((college: any) => {
    // 1. Search Name/Query
    if (activeSearchName.trim()) {
      const q = activeSearchName.toLowerCase().trim();
      const nameMatch = college.name.toLowerCase().includes(q);
      const locMatch = college.location.toLowerCase().includes(q);
      const categoryMatch = college.category.toLowerCase().includes(q);
      if (!nameMatch && !locMatch && !categoryMatch) return false;
    }

    // 2. State selection
    if (selectedStates.length > 0) {
      const stateOfCollege = college.location.split(', ')[1];
      if (!selectedStates.includes(stateOfCollege)) return false;
    }

    // 3. City selection
    if (selectedCities.length > 0) {
      const cityOfCollege = college.location.split(', ')[0];
      if (!selectedCities.includes(cityOfCollege)) return false;
    }

    // 4. Course selection
    if (selectedCourses.length > 0) {
      if (!selectedCourses.includes(college.category)) return false;
    }

    // 5. Specialization selection — safely handle string or array courses
    if (selectedSpecs.length > 0) {
      const coursesArr = Array.isArray(college.courses)
        ? college.courses
        : (typeof college.courses === 'string' && college.courses.trim()
          ? college.courses.split(/,|\n/).map((s: string) => ({ name: s.trim() }))
          : []);
      const hasSpec = coursesArr.some((course: any) =>
        selectedSpecs.some((spec) => (course.name || '').toLowerCase().includes(spec.toLowerCase()))
      );
      if (!hasSpec) return false;
    }

    // 6. Max Fees Slider Filter — skip if fees is 0 (missing data)
    const collegeFee = parseFees(college.fees);
    if (collegeFee > 0 && collegeFee > maxFees) return false;

    // 7. Min Rank Radio Filter
    if (minRank !== 'all') {
      const collegeRank = parseRank(college.ranking);
      const targetRank = parseInt(minRank, 10);
      if (collegeRank > targetRank) return false;
    }

    // 8. Min Average Placement Filter
    if (minPlacement !== 'all') {
      const avgPlacementLPA = parsePlacement(college.placements);
      const targetPlacement = parseInt(minPlacement, 10);
      if (avgPlacementLPA > 0 && avgPlacementLPA < targetPlacement) return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    if (sortBy === 'fees_low') {
      return parseFees(a.fees) - parseFees(b.fees);
    }
    if (sortBy === 'fees_high') {
      return parseFees(b.fees) - parseFees(a.fees);
    }
    if (sortBy === 'placement_high') {
      // Use parsed placement averages for comparison
      const aPl = parsePlacement(a.placements);
      const bPl = parsePlacement(b.placements);
      return bPl - aPl;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedColleges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedColleges = sortedColleges.slice(startIndex, startIndex + itemsPerPage);

  const formatLakhs = (val: number) => {
    if (val >= 100000) {
      return `${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString()}`;
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background Gradients */}
      <div className="gradient-mesh opacity-100 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 p-8 rounded-3xl glass relative overflow-hidden border border-app-border">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Verified Programs & Campuses
            </span>
            <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight">
              Explore & Filter <span className="gradient-text-primary">Colleges</span>
            </h1>
            <p className="text-sm text-app-muted mt-2 max-w-xl">
              Match courses, budgets, exams, and placement packages across India's top-tier institutions. Use the filters to customize your career alignment.
            </p>
          </div>
          
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4F46E5]/90 text-white font-bold text-sm transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Sidebar Filters */}
          <aside className={`lg:col-span-3 flex flex-col gap-6 p-6 glass rounded-2xl border border-app-border ${mobileFiltersOpen ? 'block' : 'hidden lg:flex'}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-app-border pb-4">
              <span className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wider">
                <Filter className="w-4 h-4 text-[#FF7A00]" />
                Filters
              </span>
              
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-app-muted hover:text-[#FF7A00] flex items-center gap-1 transition-colors cursor-pointer border-none bg-transparent"
              >
                <RefreshCw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Sort Selection */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Sort Options
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-app-card border border-app-border text-xs font-semibold text-white py-2.5 pl-3 pr-8 rounded-xl outline-none focus:border-[#FF7A00] cursor-pointer"
                >
                  <option value="rating">Sort: Best Rating</option>
                  <option value="placement_high">Sort: Placements (High)</option>
                  <option value="fees_low">Sort: Fees (Low to High)</option>
                  <option value="fees_high">Sort: Fees (High to Low)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-app-muted pointer-events-none" />
              </div>
            </div>

            {/* Search Input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Search College
              </label>
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search name, city..."
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  className="w-full text-xs pl-3 pr-10 py-2.5 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] transition-all font-medium"
                />
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-lg text-app-muted hover:text-white transition-colors cursor-pointer border-none bg-transparent"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* MAX FEES SLIDER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF7A00]" />
                  Max Annual Fees
                </label>
                <span className="text-xs font-bold text-[#FF7A00]">
                  {formatLakhs(maxFees)}
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={1500000}
                step={10000}
                value={maxFees}
                onChange={(e) => setMaxFees(Number(e.target.value))}
                className="w-full accent-[#FF7A00] bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-app-muted font-bold">
                <span>Min: ₹2K</span>
                <span>Max: 15 Lakhs</span>
              </div>
            </div>

            {/* MIN RANK RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#FF7A00]" />
                National Ranking
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any NIRF Rank' },
                  { value: '10', label: 'Top 10 Institutions' },
                  { value: '25', label: 'Top 25 Institutions' },
                  { value: '50', label: 'Top 50 Institutions' },
                  { value: '100', label: 'Top 100 Institutions' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minRank"
                      checked={minRank === item.value}
                      onChange={() => setMinRank(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* MIN AVERAGE PLACEMENT RADIOS */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#FF7A00]" />
                Min Placement package
              </label>
              <div className="flex flex-col gap-2">
                {[
                  { value: 'all', label: 'Any Average Package' },
                  { value: '30', label: '30+ LPA Average' },
                  { value: '15', label: '15+ LPA Average' },
                  { value: '10', label: '10+ LPA Average' },
                  { value: '5', label: '5+ LPA Average' },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2.5 text-xs text-app-muted cursor-pointer hover:text-white transition-colors">
                    <input
                      type="radio"
                      name="minPlacement"
                      checked={minPlacement === item.value}
                      onChange={() => setMinPlacement(item.value)}
                      className="accent-[#FF7A00] w-4 h-4 cursor-pointer"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* STATE FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                State
              </label>
              <input
                type="text"
                placeholder="Filter states..."
                value={stateSearch}
                onChange={(e) => setStateSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allStates
                  .filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase()))
                  .map((state) => (
                    <label key={state} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedStates.includes(state)}
                        onChange={() => handleToggleState(state)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{state}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* CITY FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                City
              </label>
              <input
                type="text"
                placeholder="Filter cities..."
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCities
                  .filter((city) => city.toLowerCase().includes(citySearch.toLowerCase()))
                  .map((city) => (
                    <label key={city} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedCities.includes(city)}
                        onChange={() => handleToggleCity(city)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{city}</span>
                    </label>
                  ))}
              </div>
            </div>

            {/* COURSES FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Course Category
              </label>
              <input
                type="text"
                placeholder="Filter courses..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin">
                {allCourses
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

            {/* SPECIALIZATION FILTER */}
            <div className="flex flex-col gap-3 border-t border-app-border pt-4 text-left">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">
                Specialization
              </label>
              <input
                type="text"
                placeholder="Filter specialization..."
                value={specSearch}
                onChange={(e) => setSpecSearch(e.target.value)}
                className="text-xs px-3 py-2 rounded-xl bg-app-card border border-app-border text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-medium"
              />
              <div className="flex flex-col gap-2 text-xs text-app-muted max-h-36 overflow-y-auto pr-1 scrollbar-thin font-medium">
                {allSpecs
                  .filter((spec) => spec.toLowerCase().includes(specSearch.toLowerCase()))
                  .map((spec) => (
                    <label key={spec} className="flex items-center gap-2.5 cursor-pointer hover:text-white transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedSpecs.includes(spec)}
                        onChange={() => handleToggleSpec(spec)}
                        className="rounded accent-[#FF7A00] w-4 h-4 cursor-pointer bg-app-card border-app-border"
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
              </div>
            </div>

          </aside>

          {/* RIGHT: Results Catalog */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full text-left">
            
            {/* Header Result Badge */}
            <div className="flex items-center justify-between p-4 rounded-2xl glass border border-app-border w-full">
              <span className="text-xs text-app-muted font-bold">
                Showing <b className="text-white">{sortedColleges.length}</b> premium institutions matching criteria
              </span>
            </div>

            {/* Loading / Results Grid */}
            {loading || isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CollegeSkeleton key={idx} />
                ))}
              </div>
            ) : paginatedColleges.length === 0 ? (
              <div className="py-20 text-center glass border border-app-border rounded-2xl flex flex-col items-center justify-center">
                <SlidersHorizontal className="w-12 h-12 text-app-muted/30 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">No Matching Colleges</h3>
                <p className="text-app-muted text-sm max-w-sm mb-6">
                  Try adjusting your budget, ranking tier, or package expectations to discover other matches.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#D14B00] px-5 py-3 rounded-xl cursor-pointer shadow-lg shadow-[#FF7A00]/20 border-none transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // 3-Column Catalog Grid
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
                {paginatedColleges.map((college) => (
                  <ScrollReveal key={college.id} delay={0} duration={0.4}>
                    <CollegeCard college={college} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !loading && !isLoading && (
              <div className="flex items-center justify-between border-t border-app-border pt-6 mt-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-9 h-9 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        currentPage === idx + 1
                          ? 'bg-[#FF7A00] border-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                          : 'border-app-border bg-app-card text-app-muted hover:text-white hover:border-app-border'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2.5 rounded-xl glass border border-app-border hover:bg-app-card text-xs font-bold text-white disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next
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
