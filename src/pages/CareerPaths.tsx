import { useState } from 'react';
import { DollarSign, Flame, CheckSquare, ListTodo, Info } from 'lucide-react';
import { careers } from '../data/careers';
import { useGlobalStore } from '../store/useGlobalStore';

export const CareerPaths = () => {
  const addToast = useGlobalStore().addToast;
  
  const [activeId, setActiveId] = useState(careers[0]?.id || 'software-engineering');
  const activeRoadmap = careers.find((c) => c.id === activeId);

  // States to keep track of completed skills across all careers
  const [completedSkills, setCompletedSkills] = useState<{ [key: string]: boolean }>({});

  const toggleSkill = (skill: string) => {
    setCompletedSkills((prev) => {
      const next = { ...prev, [skill]: !prev[skill] };
      const totalRoadmapSkills = activeRoadmap?.steps.reduce((acc, step) => acc + step.skills.length, 0) || 1;
      const completedInRoadmap = activeRoadmap?.steps.reduce((acc, step) => 
        acc + step.skills.filter((sk) => next[sk]).length, 0
      ) || 0;
      
      const pct = Math.floor((completedInRoadmap / totalRoadmapSkills) * 100);
      if (pct === 100 && next[skill]) {
        addToast(`Incredible! You are 100% prepared for a career in ${activeRoadmap?.title}!`, 'success');
      }
      return next;
    });
  };

  if (!activeRoadmap) return null;

  // Compute stats for current roadmap
  const allSkills = activeRoadmap.steps.flatMap((s) => s.skills);
  const totalSkillsCount = allSkills.length;
  const completedSkillsCount = allSkills.filter((s) => completedSkills[s]).length;
  const readinessPercent = Math.floor((completedSkillsCount / (totalSkillsCount || 1)) * 100);

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Title */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Interactive Career Explorer
          </h1>
          <p className="text-sm text-app-muted max-w-lg">
            Track phase-wise technical milestones, check off completed skill logs, and check your "Career Readiness Index" dynamically.
          </p>
        </div>

        {/* Career Selector & Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: selector sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-2.5 p-4 rounded-2xl glass border-app-border w-full">
            <h3 className="text-xs font-bold uppercase tracking-wider text-app-muted px-2 mb-2 flex items-center gap-1.5">
              <ListTodo className="w-4 h-4 text-primary" />
              Choose Career Path
            </h3>
            {careers.map((road) => (
              <button
                key={road.id}
                onClick={() => {
                  setActiveId(road.id);
                }}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-left transition-all ${
                  activeId === road.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-app-muted hover:text-app-text hover:bg-white/5'
                }`}
              >
                {road.title}
              </button>
            ))}
          </aside>

          {/* RIGHT: Detailed Roadmap timeline */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full">
            
            {/* Career Metrics and Readiness Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl glass border-app-border items-center">
              <div className="md:col-span-8 flex flex-col gap-3">
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-wider self-start">
                  Active roadmap
                </span>
                <h2 className="font-display font-bold text-2xl text-app-text">{activeRoadmap.title}</h2>
                <p className="text-xs text-app-muted leading-relaxed">{activeRoadmap.description}</p>
                
                <div className="flex flex-wrap gap-4 mt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-app-text font-semibold">
                    <DollarSign className="w-4.5 h-4.5 text-success" />
                    <span>Avg Salary: <b className="text-success">{activeRoadmap.salary}</b></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-app-text font-semibold">
                    <Flame className="w-4.5 h-4.5 text-accent animate-pulse" />
                    <span>Demand: <b className="text-accent">{activeRoadmap.demand}</b></span>
                  </div>
                </div>
              </div>

              {/* Progress gauge dial */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-app-border text-center gap-3">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.04)" strokeWidth="6" fill="transparent" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="var(--color-primary)"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={251.2}
                      strokeDashoffset={251.2 - (251.2 * readinessPercent) / 100}
                      className="transition-all duration-500 ease-out"
                    />
                  </svg>
                  <span className="absolute text-xl font-bold text-app-text font-display">{readinessPercent}%</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-app-text uppercase">Career Readiness</h4>
                  <p className="text-[10px] text-app-muted mt-0.5">{completedSkillsCount} of {totalSkillsCount} skills cleared</p>
                </div>
              </div>
            </div>

            {/* Steps Timeline Grid */}
            <div className="flex flex-col gap-6 relative pl-6 md:pl-8 border-l border-app-border/40 ml-2 pt-2 pb-2">
              {activeRoadmap.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col gap-3">
                  {/* Circle step milestone indicator */}
                  <div className="absolute -left-[37px] md:-left-[45px] top-1.5 w-7 h-7 rounded-full bg-app-bg border-2 border-primary flex items-center justify-center text-[10px] font-extrabold text-primary shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                    {idx + 1}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-app-text">{step.title}</h3>
                    <p className="text-xs text-app-muted mt-0.5 leading-relaxed">{step.description}</p>
                  </div>

                  {/* Skills checks */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {step.skills.map((skill) => {
                      const completed = completedSkills[skill];
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                            completed
                              ? 'bg-primary/15 border-primary/40 text-primary font-bold shadow-md shadow-primary/5'
                              : 'bg-white/5 border-app-border hover:border-app-border-hover text-app-muted hover:text-app-text'
                          }`}
                        >
                          <CheckSquare className={`w-3.5 h-3.5 ${completed ? 'text-primary fill-primary/10' : ''}`} />
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Roadmap disclaimer guide */}
            <div className="flex gap-2.5 p-4 rounded-xl bg-white/[0.01] border border-app-border/40 text-xs text-app-muted leading-relaxed">
              <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
              <p>
                <b>How this works:</b> Checking off skills will advance your "Career Readiness Index" indicator. Clear key milestones across all phases to complete the pipeline.
              </p>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
};
export default CareerPaths;
