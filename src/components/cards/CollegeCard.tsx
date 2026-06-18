import { Link } from 'react-router-dom';
import { MapPin, Star, Award, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import type { College } from '../../types';
import type { MouseEvent } from 'react';
import { useCompareStore } from '../../store/useCompareStore';
import { useGlobalStore } from '../../store/useGlobalStore';

interface CollegeCardProps {
  college: College;
}

export const CollegeCard = ({ college }: CollegeCardProps) => {
  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();
  const addToast = useGlobalStore().addToast;
  
  const comparing = isComparing(college.id);

  const handleCompareClick = (e: MouseEvent) => {
    e.preventDefault();
    if (comparing) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college.id);
    }
  };

  const handleApplyClick = (e: MouseEvent) => {
    e.preventDefault();
    addToast(`Successfully initialized admission application for ${college.name}!`, 'success');
  };

  return (
    <div className="glass glass-hover rounded-2xl overflow-hidden flex flex-col group h-full">
      {/* Cover Image & Ranking Badge */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-white">
          <Star className="w-3.5 h-3.5 text-warning fill-warning" />
          <span>{college.rating}</span>
        </div>
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-primary/95 text-xs font-bold text-white uppercase tracking-wider">
          {college.category}
        </div>
      </div>

      {/* Info & Metrics */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-app-muted mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{college.location}</span>
          </div>
          <h3 className="font-display font-bold text-lg text-app-text leading-tight group-hover:text-primary transition-colors duration-300">
            {college.name}
          </h3>
        </div>

        {/* Detailed parameters */}
        <div className="grid grid-cols-2 gap-3.5 p-3 rounded-xl bg-white/[0.02] dark:bg-white/[0.01] border border-app-border text-xs">
          <div className="flex flex-col gap-0.5">
            <span className="text-app-muted">Annual Fees</span>
            <span className="font-semibold text-app-text">{college.fees}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-app-muted">Average Package</span>
            <span className="font-semibold text-success flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {college.placements.split(' ')[0]}
            </span>
          </div>
          <div className="flex col-span-2 items-center gap-1.5 border-t border-app-border/40 pt-2 text-app-muted">
            <Award className="w-4 h-4 text-secondary" />
            <span className="font-medium text-app-text">{college.ranking}</span>
          </div>
        </div>

        {/* Button Actions */}
        <div className="mt-auto pt-2 grid grid-cols-2 gap-2">
          <Link
            to={`/colleges/${college.id}`}
            className="col-span-2 py-2.5 rounded-xl bg-app-card hover:bg-app-card-hover border border-app-border text-center text-sm font-semibold text-app-text transition-all"
          >
            View Details
          </Link>
          
          <button
            onClick={handleCompareClick}
            className={`py-2 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${
              comparing
                ? 'bg-accent/10 border-accent/30 text-accent'
                : 'border-app-border hover:bg-app-card hover:text-app-text text-app-muted'
            }`}
          >
            {comparing ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Comparing
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5" />
                Compare
              </>
            )}
          </button>
          
          <button
            onClick={handleApplyClick}
            className="py-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs hover:opacity-95 shadow-sm shadow-primary/10 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default CollegeCard;
