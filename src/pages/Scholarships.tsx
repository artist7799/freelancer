import { useState, type FormEvent } from 'react';
import { Search, Award, Calculator } from 'lucide-react';
import { scholarships } from '../data/scholarships';
import { ScholarshipCard } from '../components/cards/ScholarshipCard';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { useGlobalStore } from '../store/useGlobalStore';

export const Scholarships = () => {
  const addToast = useGlobalStore().addToast;

  // Search & filter states
  const [query, setQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  
  // Eligibility Calculator states
  const [income, setIncome] = useState('');
  const [grade, setGrade] = useState('');
  const [gender, setGender] = useState('all');
  const [eligibleList, setEligibleList] = useState<typeof scholarships | null>(null);

  const types = ['Merit-Based', 'Need-cum-Merit', 'Women in STEM', 'Crisis Assistance', 'Study Abroad (Need-Based)'];

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredScholarships = scholarships.filter((s) => {
    const qMatch =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.provider.toLowerCase().includes(query.toLowerCase());

    const tMatch = selectedTypes.length === 0 || selectedTypes.includes(s.type);

    return qMatch && tMatch;
  });

  const handleCalculateEligibility = (e: FormEvent) => {
    e.preventDefault();
    if (!income || !grade) {
      addToast('Please complete grade and income calculations parameters first', 'warning');
      return;
    }

    const incomeVal = parseFloat(income);
    const gradeVal = parseFloat(grade);

    // Compute matches
    const matches = scholarships.filter((s) => {
      // Rule logic matches
      if (s.id === 'loreal-science' && gender !== 'female') return false;
      if (s.id === 'reliance-foundation' && incomeVal > 15) return false;
      if (s.id === 'sitaram-jindal' && incomeVal > 3.5) return false; // simulated limit
      if (s.id === 'aditya-birla' && gradeVal < 90) return false;
      return true;
    });

    setEligibleList(matches);
    addToast(`Calculation complete! Found ${matches.length} matching scholarships.`, 'success');
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Title */}
        <div className="text-left mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Scholarships catalog
          </h1>
          <p className="text-sm text-app-muted max-w-md">
            Locate merit-based, need-based, and crisis support awards to fund your college tuition fees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Filters & Calculator */}
          <aside className="lg:col-span-4 flex flex-col gap-6 w-full text-left">
            {/* Filter by Type */}
            <div className="p-5 rounded-2xl glass border-app-border flex flex-col gap-4">
              <h3 className="text-sm font-bold text-app-text flex items-center gap-1.5 border-b border-app-border/40 pb-2.5">
                Filter by Type
              </h3>
              <div className="flex flex-col gap-2 text-xs text-app-muted">
                {types.map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-app-text">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => toggleType(type)}
                      className="rounded border-app-border bg-transparent text-accent focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Eligibility calculator widget */}
            <div className="p-5 rounded-2xl glass border-app-border flex flex-col gap-4">
              <h3 className="text-sm font-bold text-app-text flex items-center gap-2 border-b border-app-border/40 pb-2.5">
                <Calculator className="w-4 h-4 text-accent" />
                Eligibility Calculator
              </h3>
              <form onSubmit={handleCalculateEligibility} className="flex flex-col gap-3 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Annual Family Income (Lakhs)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 5"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Academic Grades (10+2 % / GPA)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 88"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-accent"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="px-3.5 py-2 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-accent"
                  >
                    <option value="all">All Genders</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 mt-2 rounded-xl bg-accent text-white font-bold hover:opacity-95 shadow-md shadow-accent/25"
                >
                  Match Scholarships
                </button>
              </form>

              {/* Calculator Output */}
              {eligibleList && (
                <div className="mt-2 border-t border-app-border/40 pt-4 flex flex-col gap-2.5">
                  <h4 className="font-bold text-app-text text-[11px] uppercase">Matching Awards ({eligibleList.length})</h4>
                  {eligibleList.length === 0 ? (
                    <p className="text-[11px] text-app-muted">No specific matches. Adjust parameters or search public lists.</p>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1 no-scrollbar">
                      {eligibleList.map((sch) => (
                        <div key={sch.id} className="p-2 rounded-lg bg-accent/5 border border-accent/25 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-app-text truncate max-w-[150px]">{sch.name}</span>
                          <span className="text-accent font-bold">{sch.amount.split(' ')[0]}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>

          {/* RIGHT: Results Listing */}
          <main className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
            <div className="flex items-center gap-3 p-2.5 rounded-2xl glass border-app-border">
              <Search className="w-5 h-5 text-app-muted ml-2" />
              <input
                type="text"
                placeholder="Search scholarship name or provider..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-0 text-sm text-app-text placeholder-app-muted"
              />
            </div>

            {filteredScholarships.length === 0 ? (
              <div className="py-20 text-center glass rounded-2xl border-app-border/40 w-full">
                <Award className="w-10 h-10 text-app-muted/30 mx-auto mb-3" />
                <p className="text-app-muted text-sm font-semibold">No scholarships match your active query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {filteredScholarships.map((sch) => (
                  <ScrollReveal key={sch.id} delay={0} duration={0.4}>
                    <ScholarshipCard scholarship={sch} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};
export default Scholarships;
