import { Link } from 'react-router-dom';
import { Trash2, Star, ShieldCheck, Compass, Plus } from 'lucide-react';
import { useCompareStore } from '../store/useCompareStore';
import { colleges } from '../data/colleges';

export const Compare = () => {
  const { compareIds, removeFromCompare, clearCompare } = useCompareStore();

  const selectedColleges = colleges.filter((c) => compareIds.includes(c.id));

  // Determine best placements
  const getBestPlacementIndex = () => {
    let maxPl = 0;
    let bestIdx = -1;
    selectedColleges.forEach((col, idx) => {
      const val = parseFloat(col.placements.replace(/[^\d.]/g, ''));
      if (val > maxPl) {
        maxPl = val;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  // Determine highest rating
  const getBestRatingIndex = () => {
    let maxRt = 0;
    let bestIdx = -1;
    selectedColleges.forEach((col, idx) => {
      if (col.rating > maxRt) {
        maxRt = col.rating;
        bestIdx = idx;
      }
    });
    return bestIdx;
  };

  const bestPlacementIdx = getBestPlacementIndex();
  const bestRatingIdx = getBestRatingIndex();

  if (selectedColleges.length === 0) {
    return (
      <div className="relative pt-36 pb-20 min-h-[80vh] flex items-center justify-center">
        <div className="gradient-mesh" />
        <div className="max-w-md px-6 text-center relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-app-border flex items-center justify-center text-app-muted">
            <Compass className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-app-text">Comparison Grid Empty</h2>
          <p className="text-xs text-app-muted leading-relaxed">
            You haven't added any colleges to compare. Browse colleges and select "Compare" to check metrics side-by-side.
          </p>
          <Link
            to="/colleges"
            className="mt-2 py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs shadow-lg shadow-primary/20"
          >
            Browse Colleges Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pt-28 pb-20 min-h-screen">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        {/* Title & Clear Action */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 text-left">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
              Compare Institutions
            </h1>
            <p className="text-sm text-app-muted">
              Analyze parameters of up to 3 institutions side-by-side to make the right choice.
            </p>
          </div>
          <button
            onClick={clearCompare}
            className="self-start sm:self-auto py-2.5 px-4 rounded-xl border border-danger/30 hover:bg-danger/10 text-danger text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Comparison List
          </button>
        </div>

        {/* Side-by-side comparison tables */}
        <div className="overflow-x-auto pb-6 rounded-2xl border border-app-border bg-app-bg/50 backdrop-blur-md">
          <div className="min-w-[700px] grid grid-cols-12 gap-0 text-xs">
            {/* Headers row */}
            <div className="col-span-3 p-5 border-r border-app-border font-bold uppercase tracking-wider text-app-muted bg-white/[0.01] flex items-center">
              Parameters
            </div>
            
            {Array.from({ length: 3 }).map((_, idx) => {
              const col = selectedColleges[idx];
              return (
                <div
                  key={idx}
                  className={`col-span-3 p-5 border-r last:border-r-0 border-app-border text-center flex flex-col items-center justify-center gap-4 min-h-[200px] ${
                    col ? 'bg-white/[0.02]' : 'bg-transparent text-app-muted/30 border-dashed border-app-border/40'
                  }`}
                >
                  {col ? (
                    <div className="relative w-full flex flex-col items-center gap-3">
                      {/* Delete icon */}
                      <button
                        onClick={() => removeFromCompare(col.id)}
                        className="absolute top-0 right-0 p-1.5 rounded-lg bg-danger/10 hover:bg-danger/25 text-danger"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <img
                        src={col.logo}
                        alt="logo"
                        className="w-12 h-12 rounded-xl object-cover border border-app-border"
                      />
                      <div>
                        <h3 className="font-bold text-sm text-app-text leading-tight line-clamp-1">{col.name}</h3>
                        <p className="text-[10px] text-app-muted mt-0.5">{col.location}</p>
                      </div>
                    </div>
                  ) : (
                    <Link
                      to="/colleges"
                      className="flex flex-col items-center gap-2 text-app-muted hover:text-app-text transition-colors py-8"
                    >
                      <div className="w-10 h-10 rounded-full border border-dashed border-app-border flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-[10px] uppercase">Add College</span>
                    </Link>
                  )}
                </div>
              );
            })}

            {/* Parameter Rows */}
            {/* ROW 1: CATEGORY */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                Category
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-4 border-r last:border-r-0 border-app-border text-center text-app-muted font-medium">
                    {col ? col.category : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 2: FEES */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                Annual Fees
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-4 border-r last:border-r-0 border-app-border text-center font-bold text-app-text">
                    {col ? col.fees.split(' ')[0] : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 3: PLACEMENTS */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                Average Placements
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                const isBest = idx === bestPlacementIdx;
                return (
                  <div
                    key={idx}
                    className={`col-span-3 p-4 border-r last:border-r-0 border-app-border text-center font-bold ${
                      col
                        ? isBest
                          ? 'bg-success/5 text-success border-success/10'
                          : 'text-app-text'
                        : 'text-app-muted'
                    }`}
                  >
                    {col ? (
                      <span className="flex items-center justify-center gap-1">
                        {col.placements.split(' ')[0]}
                        {isBest && <ShieldCheck className="w-3.5 h-3.5 text-success fill-success/10" />}
                      </span>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 4: RANKING */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                National Ranking
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-4 border-r last:border-r-0 border-app-border text-center text-app-muted font-medium">
                    {col ? col.ranking.split(' (')[0] : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 5: INFRASTRUCTURE */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01] flex items-center">
                Infrastructure
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-4 border-r last:border-r-0 border-app-border text-center flex flex-wrap gap-1 justify-center items-center">
                    {col
                      ? col.infrastructure.slice(0, 3).map((inf, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-app-border text-[10px] text-app-muted">
                            {inf}
                          </span>
                        ))
                      : '-'}
                  </div>
                );
              })}
            </div>

            {/* ROW 6: RATING */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                Rating Score
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                const isBest = idx === bestRatingIdx;
                return (
                  <div
                    key={idx}
                    className={`col-span-3 p-4 border-r last:border-r-0 border-app-border text-center font-bold ${
                      col
                        ? isBest
                          ? 'bg-warning/5 text-warning'
                          : 'text-app-text'
                        : 'text-app-muted'
                    }`}
                  >
                    {col ? (
                      <span className="flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        {col.rating}
                      </span>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

            {/* ROW 7: ACTION */}
            <div className="col-span-12 grid grid-cols-12 border-t border-app-border">
              <div className="col-span-3 p-4 border-r border-app-border font-bold text-app-text bg-white/[0.01]">
                Action link
              </div>
              {Array.from({ length: 3 }).map((_, idx) => {
                const col = selectedColleges[idx];
                return (
                  <div key={idx} className="col-span-3 p-4 border-r last:border-r-0 border-app-border text-center flex justify-center items-center">
                    {col ? (
                      <Link
                        to={`/colleges/${col.id}`}
                        className="px-4 py-1.5 rounded-lg bg-primary text-white font-semibold text-[10px] hover:bg-primary-hover"
                      >
                        View Full Profile
                      </Link>
                    ) : (
                      '-'
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Compare;
