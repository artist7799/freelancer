import { useState } from 'react';
import { DollarSign, Flame, CheckSquare, ListTodo, Info, Sparkles } from 'lucide-react';
import { careers } from '../data/careers';
import { useGlobalStore } from '../store/useGlobalStore';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const CareerPaths = () => {
  const addToast = useGlobalStore().addToast;
  
  const [activeId, setActiveId] = useState(careers[0]?.id || 'software-engineering');
  const activeRoadmap = careers.find((c) => c.id === activeId);

  // Completed skills tracker
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
        addToast(`Outstanding! You are 100% prepared for a career in ${activeRoadmap?.title}!`, 'success');
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
    <div className="relative pt-28 pb-20 min-h-screen bg-app-bg text-app-text">
      {/* Background Gradients */}
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10 text-left">
        
        {/* Title */}
        <div className="mb-12 p-8 rounded-3xl glass border border-app-border relative overflow-hidden flex flex-col gap-2">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent pointer-events-none" />
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] self-start mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Learning Roadmaps
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight">
            Career <span className="gradient-text-primary">Explorer</span>
          </h1>
          <p className="text-sm text-app-muted max-w-lg mt-1">
            Track technical milestones, check off completed skill logs, and check your "Career Readiness Index" dynamically.
          </p>
        </div>

        {/* Career Selector & Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: selector sidebar */}
          <aside className="lg:col-span-3 flex flex-col gap-2.5 p-4 rounded-2xl glass border border-app-border w-full shadow-2xl">
            <h3 className="text-xs font-black uppercase tracking-wider text-app-muted px-2.5 mb-2 flex items-center gap-2">
              <ListTodo className="w-4 h-4 text-[#FF7A00]" />
              Choose Career Path
            </h3>
            {careers.map((road) => (
              <button
                key={road.id}
                onClick={() => {
                  setActiveId(road.id);
                }}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold text-left transition-all cursor-pointer ${
                  activeId === road.id
                    ? 'bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25'
                    : 'text-app-muted hover:text-white hover:bg-app-card'
                }`}
              >
                {road.title}
              </button>
            ))}
          </aside>

          {/* RIGHT: Detailed Roadmap timeline */}
          <main className="lg:col-span-9 flex flex-col gap-6 w-full">
            
            {/* Career Metrics and Readiness Dashboard */}
            <ScrollReveal>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 rounded-2xl glass border border-app-border items-center shadow-xl">
                <div className="md:col-span-8 flex flex-col gap-3">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#4F46E5]/20 text-[#3B82F6] border border-[#3B82F6]/30 font-black uppercase tracking-wider self-start">
                    Active Roadmap path
                  </span>
                  <h2 className="font-display font-black text-2xl text-white">{activeRoadmap.title}</h2>
                  <p className="text-xs text-app-muted leading-relaxed font-semibold">{activeRoadmap.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-2 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-white">
                      <DollarSign className="w-4 h-4 text-[#10B981]" />
                      <span>Avg Salary: <b className="text-[#10B981]">{activeRoadmap.salary}</b></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white">
                      <Flame className="w-4 h-4 text-[#FF7A00]" />
                      <span>Demand: <b className="text-[#FF7A00]">{activeRoadmap.demand}</b></span>
                    </div>
                  </div>
                </div>

                {/* Progress gauge dial */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-app-card border border-app-border text-center gap-3 shadow-inner">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.03)" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="url(#progressGrad)"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * readinessPercent) / 100}
                        className="transition-all duration-500 ease-out"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4F46E5" />
                          <stop offset="100%" stopColor="#FF7A00" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute text-xl font-black text-white font-display">{readinessPercent}%</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">Career Readiness</h4>
                    <p className="text-[10px] text-app-muted mt-1 font-bold">{completedSkillsCount} of {totalSkillsCount} skills cleared</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Steps Timeline Grid */}
            <div className="flex flex-col gap-8 relative pl-6 md:pl-10 border-l border-app-border ml-4 pt-2 pb-2">
              {activeRoadmap.steps.map((step, idx) => (
                <div key={idx} className="relative flex flex-col gap-3">
                  {/* Circle step milestone indicator */}
                  <div className="absolute -left-[39px] md:-left-[53px] top-1.5 w-8 h-8 rounded-full bg-app-bg border-2 border-[#FF7A00] flex items-center justify-center text-xs font-black text-[#FF7A00] shadow-lg shadow-[#FF7A00]/20">
                    {idx + 1}
                  </div>

                  <div>
                    <h3 className="font-display font-black text-base text-white flex items-center gap-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-app-muted mt-1 leading-relaxed font-semibold">{step.description}</p>
                  </div>

                  {/* Skills checks */}
                  <div className="flex flex-wrap gap-2.5 mt-1.5">
                    {step.skills.map((skill) => {
                      const completed = completedSkills[skill];
                      return (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-transparent ${
                            completed
                              ? 'bg-[#FF7A00]/20 border-[#FF7A00]/40 text-[#FF7A00] shadow-md shadow-[#FF7A00]/5'
                              : 'border-app-border hover:border-app-border text-app-muted hover:text-white'
                          }`}
                        >
                          <CheckSquare className={`w-4 h-4 ${completed ? 'text-[#FF7A00] fill-[#FF7A00]/10' : 'text-app-muted'}`} />
                          <span>{skill}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="flex gap-3 p-5 rounded-2xl bg-app-card border border-app-border text-xs text-app-muted leading-relaxed font-semibold">
              <Info className="w-5 h-5 text-[#FF7A00] shrink-0" />
              <p>
                <b>Guide:</b> Clearing technical skills increases your profile readiness percentage. Work through each step from fundamentals to deployment metrics to master this career path.
              </p>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
};

export default CareerPaths;
