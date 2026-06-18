import { Calendar, DollarSign, Award, ArrowRight } from 'lucide-react';
import type { Scholarship } from '../../types';
import { useGlobalStore } from '../../store/useGlobalStore';

interface ScholarshipCardProps {
  scholarship: Scholarship;
}

export const ScholarshipCard = ({ scholarship }: ScholarshipCardProps) => {
  const addToast = useGlobalStore().addToast;

  const handleApply = () => {
    addToast(`Successfully initialized application for the "${scholarship.name}"!`, 'success');
  };

  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col gap-4 group">
      {/* Provider Name & Type Badge */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-app-muted font-medium uppercase tracking-wider">
          {scholarship.provider}
        </span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold">
          {scholarship.type}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-lg text-app-text group-hover:text-accent transition-colors duration-300">
          {scholarship.name}
        </h3>
      </div>

      {/* Grant Amount Card */}
      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-accent/10 to-transparent border border-accent/20">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent text-white shadow-md shadow-accent/25">
          <DollarSign className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] text-app-muted uppercase font-bold">Scholarship Amount</p>
          <p className="text-base font-bold text-app-text">{scholarship.amount}</p>
        </div>
      </div>

      {/* Eligibility Detail */}
      <div className="flex gap-2 text-xs text-app-muted border-t border-app-border/40 pt-3 flex-1">
        <Award className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
        <p className="leading-snug">{scholarship.eligibility}</p>
      </div>

      {/* Deadline Info & Apply */}
      <div className="flex items-center justify-between mt-auto border-t border-app-border/40 pt-3">
        <div className="flex items-center gap-1.5 text-xs text-app-muted">
          <Calendar className="w-3.5 h-3.5" />
          <span>Deadline: <b>{new Date(scholarship.deadline).toLocaleDateString()}</b></span>
        </div>
        <button
          onClick={handleApply}
          className="flex items-center gap-1 text-xs font-bold text-accent group-hover:translate-x-0.5 transition-transform"
        >
          Apply Now
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
export default ScholarshipCard;
