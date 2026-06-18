import { Link } from 'react-router-dom';
import { DollarSign, Flame, Award, ChevronRight } from 'lucide-react';
import type { CareerRoadmap } from '../../types';

interface RoadmapCardProps {
  roadmap: CareerRoadmap;
}

export const RoadmapCard = ({ roadmap }: RoadmapCardProps) => {
  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col gap-4 group">
      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-xl text-app-text group-hover:text-primary transition-colors duration-300">
          {roadmap.title}
        </h3>
        <p className="text-xs text-app-muted line-clamp-2 mt-1 leading-snug">
          {roadmap.description}
        </p>
      </div>

      {/* Salary & Demand Metrics */}
      <div className="grid grid-cols-2 gap-3.5 border-y border-app-border/40 py-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <DollarSign className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-app-muted uppercase">Salary Scale</span>
            <span className="text-xs font-bold text-app-text">{roadmap.salary.split(' ')[0]} - {roadmap.salary.split(' - ')[1]?.split(' ')[0]} LPA</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
            <Flame className="w-4.5 h-4.5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-app-muted uppercase">Demand</span>
            <span className="text-xs font-bold text-app-text">{roadmap.demand.split(' ')[0]}</span>
          </div>
        </div>
      </div>

      {/* Primary Skills Chips */}
      <div>
        <span className="text-[10px] text-app-muted uppercase font-bold flex items-center gap-1 mb-2">
          <Award className="w-3.5 h-3.5 text-primary" />
          Key Skillsets
        </span>
        <div className="flex flex-wrap gap-1.5">
          {roadmap.skills.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-app-border text-app-muted font-medium"
            >
              {skill}
            </span>
          ))}
          {roadmap.skills.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary font-bold">
              +{roadmap.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Action Route to Careers Detail Page */}
      <Link
        to="/careers"
        className="mt-auto py-2.5 rounded-xl bg-app-card hover:bg-primary hover:text-white border border-app-border hover:border-transparent text-center text-xs font-semibold text-app-muted hover:text-app-text transition-all flex items-center justify-center gap-1 group/btn"
      >
        Explore Roadmap
        <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
      </Link>
    </div>
  );
};
export default RoadmapCard;
