import { useState, useEffect } from 'react';
import { Calendar, Hourglass, CheckSquare, ChevronRight } from 'lucide-react';
import type { Exam } from '../../types';

interface ExamCardProps {
  exam: Exam;
  onOpenDetails: (exam: Exam) => void;
}

export const ExamCard = ({ exam, onOpenDetails }: ExamCardProps) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(exam.registrationDeadline) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        expired: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [exam.registrationDeadline]);

  return (
    <div className="glass glass-hover rounded-2xl p-5 flex flex-col gap-4 group">
      {/* Category & Status */}
      <div className="flex items-center justify-between">
        <span className="text-xs px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/20 font-bold uppercase tracking-wider">
          {exam.category}
        </span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
          timeLeft.expired ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
        }`}>
          {timeLeft.expired ? 'Registration Closed' : 'Registration Active'}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display font-bold text-xl text-app-text group-hover:text-secondary transition-colors duration-300">
          {exam.name}
        </h3>
        <p className="text-xs text-app-muted mt-1 leading-snug">{exam.fullName}</p>
      </div>

      {/* Countdown Timer */}
      {!timeLeft.expired ? (
        <div className="grid grid-cols-4 gap-2 text-center p-3.5 rounded-xl bg-white/[0.02] border border-app-border">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-app-text tracking-tight">{timeLeft.days}</span>
            <span className="text-[10px] text-app-muted uppercase">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-app-text tracking-tight">{timeLeft.hours}</span>
            <span className="text-[10px] text-app-muted uppercase">Hrs</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-app-text tracking-tight">{timeLeft.minutes}</span>
            <span className="text-[10px] text-app-muted uppercase">Min</span>
          </div>
          <div className="flex flex-col animate-pulse">
            <span className="text-lg font-bold text-secondary tracking-tight">{timeLeft.seconds}</span>
            <span className="text-[10px] text-app-muted uppercase">Sec</span>
          </div>
        </div>
      ) : (
        <div className="py-4 text-center rounded-xl bg-white/[0.01] border border-app-border/40 text-sm text-app-muted font-medium">
          Closed since {new Date(exam.registrationDeadline).toLocaleDateString()}
        </div>
      )}

      {/* Key Dates */}
      <div className="flex flex-col gap-2 text-xs border-y border-app-border/40 py-3 text-app-muted">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            Exam Date
          </span>
          <span className="font-semibold text-app-text">
            {new Date(exam.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Hourglass className="w-3.5 h-3.5 text-secondary" />
            Reg. Deadline
          </span>
          <span className="font-semibold text-app-text">
            {new Date(exam.registrationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Eligibility brief */}
      <div className="flex items-start gap-2 text-xs text-app-muted">
        <CheckSquare className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
        <p className="line-clamp-2">{exam.eligibility}</p>
      </div>

      {/* View syllabus / details button */}
      <button
        onClick={() => onOpenDetails(exam)}
        className="mt-auto py-2.5 rounded-xl border border-app-border group-hover:border-secondary hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-1.5 text-sm font-semibold text-app-muted group-hover:text-app-text"
      >
        View Details & Syllabus
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
};
export default ExamCard;
