import React, { useState } from 'react';
import { X, Sparkles, ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../store/useGlobalStore';
import { predictorService } from '../services/predictor.service';

const INDIAN_STATES = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'West Bengal',
  'Telangana', 'Punjab', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Kerala', 'Madhya Pradesh', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Sikkim', 'Tripura', 'Uttarakhand', 'Jammu & Kashmir'
];

const HASHTAGS = [
  '#AIPredictions', '#RankEvaluator', '#SmartAdmission', '#ScholarshipChance',
  '#SeatMatrix2026', '#CounselorCallback', '#TopUniversities'
];


export const CollegePredictor = () => {
  const navigate = useNavigate();
  const addToast = useGlobalStore().addToast;

  const [step, setStep] = useState(1);

  // Step 1: Academic Details
  const [courseCategory, setCourseCategory] = useState('Engineering');
  const [rank, setRank] = useState<number | ''>('');
  const [category, setCategory] = useState('General');
  const [budget, setBudget] = useState<number>(500000); // 5 Lakhs
  const [homeState, setHomeState] = useState('Delhi');

  // Step 2: Contact Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => navigate(-1);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank || isNaN(Number(rank)) || Number(rank) <= 0) {
      addToast('Please enter a valid Entrance Rank.', 'warning');
      return;
    }
    setStep(2);
  };

  const [predictions, setPredictions] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !mobile || !email) {
      addToast('Please complete contact fields.', 'warning');
      return;
    }
    setIsSubmitting(true);
    try {
      let examName = 'cat';
      if (courseCategory === 'Engineering') examName = 'jee-main';
      else if (courseCategory === 'Medicine') examName = 'neet';

      const userRank = Number(rank) || 10000;
      let scorePercentile = 95;
      if (userRank < 100) scorePercentile = 99.9;
      else if (userRank < 500) scorePercentile = 99.5;
      else if (userRank < 1000) scorePercentile = 99.0;
      else if (userRank < 5000) scorePercentile = 97.0;
      else if (userRank < 10000) scorePercentile = 94.0;
      else if (userRank < 20000) scorePercentile = 88.0;
      else if (userRank < 50000) scorePercentile = 75.0;
      else scorePercentile = 60.0;

      const res = await predictorService.predict({
        exam: examName,
        score: scorePercentile,
        category,
        stream: courseCategory,
        preferredState: homeState,
        budget
      });

      if (res && res.data && res.data.predictions) {
        const mapped = res.data.predictions.map((p: any) => ({
          id: p.college.id,
          name: p.college.name,
          location: p.college.location,
          fees: p.college.fees,
          rating: p.college.rating,
          ranking: p.college.ranking,
          chance: p.matchProbability,
          percent: parseInt(p.admissionChance) || 50
        }));
        setPredictions(mapped);
      }
      setStep(3);
      addToast('Predictions generated successfully!', 'success');
    } catch (error: any) {
      const msg = error.response?.data?.message || 'Failed to predict admission chances';
      addToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const matchedColleges = predictions;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-app-bg/90 backdrop-blur-md" />

      {/* Modal card */}
      <div className="relative w-full max-w-4xl bg-app-card border border-app-border rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[550px] z-10 text-left">
        
        {/* LEFT SIDEBAR: Illustrations and tags */}
        <div className="relative flex flex-col justify-between p-8 md:w-5/12 bg-gradient-to-br from-[#1a1040] to-[#0B1020] border-r border-app-border overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF7A00]/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#4F46E5]/10 rounded-full blur-2xl pointer-events-none" />

          {/* Stepper display */}
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FF7A00]/10 text-[#FF7A00] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              AI Admission Engine
            </span>

            <div className="flex flex-col gap-6 mt-4">
              {[
                { step: 1, label: 'Academic Benchmarks', desc: 'Rank, stream, and category selection.' },
                { step: 2, label: 'Candidate Verification', desc: 'Secure callback routing credentials.' },
                { step: 3, label: 'Matched Campus Report', desc: 'Admission chance calculations.' },
              ].map((s) => (
                <div key={s.step} className="flex gap-3 items-start">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                    step >= s.step ? 'bg-[#FF7A00] text-white' : 'bg-app-card text-app-muted border border-app-border'
                  }`}>
                    {s.step}
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${step >= s.step ? 'text-white' : 'text-app-muted'}`}>{s.label}</h4>
                    <p className="text-[10px] text-app-muted/60 mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tag cloud */}
          <div className="relative z-10 flex flex-wrap gap-1.5 mt-8 select-none">
            {HASHTAGS.map((tag, i) => (
              <span key={i} className="text-[10px] font-bold px-2 py-1 rounded-lg bg-app-card text-app-muted border border-app-border">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Dynamic form fields based on stepper */}
        <div className="flex-1 p-8 flex flex-col justify-between relative">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center bg-app-card text-app-muted hover:text-white border border-app-border hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* STEP 1: Academic details */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="flex flex-col gap-5 flex-1 justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-display tracking-tight flex items-center gap-2">
                  Predict My College Admission Chances
                </h2>
                <p className="text-xs text-app-muted mt-1">Configure your score benchmarks to run matching algorithm.</p>
              </div>

              <div className="flex flex-col gap-4 flex-1 justify-center">
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Stream */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Preferred Stream</label>
                    <div className="relative">
                      <select
                        value={courseCategory}
                        onChange={(e) => setCourseCategory(e.target.value)}
                        className="w-full appearance-none px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] cursor-pointer"
                      >
                        <option value="Engineering" className="bg-app-card">Engineering (B.Tech)</option>
                        <option value="Management" className="bg-app-card">Management (MBA)</option>
                        <option value="Medicine" className="bg-app-card">Medicine (MBBS)</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-app-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Rank */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Entrance Exam Rank</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 2500"
                      value={rank}
                      onChange={(e) => setRank(e.target.value === '' ? '' : Number(e.target.value))}
                      className="w-full px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Reservation Category */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Reservation Category</label>
                    <div className="relative">
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full appearance-none px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] cursor-pointer"
                      >
                        <option value="General" className="bg-app-card">General / Unreserved</option>
                        <option value="OBC" className="bg-app-card">OBC (Non-Creamy)</option>
                        <option value="SC" className="bg-app-card">Scheduled Caste (SC)</option>
                        <option value="ST" className="bg-app-card">Scheduled Tribe (ST)</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-app-muted pointer-events-none" />
                    </div>
                  </div>

                  {/* Home State */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Domicile / Home State</label>
                    <div className="relative">
                      <select
                        value={homeState}
                        onChange={(e) => setHomeState(e.target.value)}
                        className="w-full appearance-none px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-white outline-none focus:border-[#FF7A00] cursor-pointer"
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st} className="bg-app-card">{st}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-3.5 w-4 h-4 text-app-muted pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="flex flex-col gap-3 border-t border-app-border pt-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Max Annual Tuition Budget</label>
                    <span className="text-xs font-black text-[#FF7A00]">
                      {budget >= 100000 ? `${(budget / 100000).toFixed(1)} Lakhs / yr` : `₹${budget}`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50000}
                    max={1500000}
                    step={25000}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full accent-[#FF7A00] h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-app-muted font-bold">
                    <span>Min: ₹50K</span>
                    <span>Max: ₹15 Lakhs</span>
                  </div>
                </div>

              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all border-none cursor-pointer shadow-lg shadow-[#FF7A00]/25 mt-4"
              >
                <span>Continue to Callback Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: Candidate details verification */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1 justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-display tracking-tight flex items-center gap-2">
                  Verify Counselor Callback Routing
                </h2>
                <p className="text-xs text-app-muted mt-1">Verify contact credentials to secure your custom score report.</p>
              </div>

              <div className="flex flex-col gap-4 flex-1 justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">First Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Last Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dev"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3.5 rounded-xl border border-app-border text-app-muted hover:text-white hover:bg-app-card font-bold text-xs transition-all cursor-pointer bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-all border-none cursor-pointer shadow-lg shadow-[#FF7A00]/25 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run AI Predictor Lookup</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Results Matched report */}
          {step === 3 && (
            <div className="flex flex-col gap-4 flex-1 justify-between">
              <div>
                <h2 className="text-xl font-black text-white font-display tracking-tight flex items-center gap-2">
                  Your AI Admission Eligibility Report
                </h2>
                <p className="text-xs text-app-muted mt-1">
                  Based on target rank <b className="text-white">#{rank}</b> under <b className="text-white">{category}</b> category:
                </p>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto max-h-72 pr-1 scrollbar-thin">
                {matchedColleges.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-xs text-app-muted">No campuses match your category and budget range. Try starting over with an adjusted tuition fee limit.</p>
                  </div>
                ) : (
                  matchedColleges.map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-app-card border border-app-border hover:border-app-border transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-app-card flex items-center justify-center border border-app-border font-black text-[#FF7A00] text-xs shrink-0">
                          #{i + 1}
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-extrabold text-white truncate">{r.name}</p>
                          <p className="text-[10px] text-app-muted mt-0.5">{r.location} • {r.fees.split(' ')[0]}/yr</p>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className={`inline-block text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                          r.chance === 'High'
                            ? 'bg-[#10B981]/15 text-[#10B981]'
                            : r.chance === 'Medium'
                            ? 'bg-[#F59E0B]/15 text-[#F59E0B]'
                            : 'bg-rose-500/15 text-rose-450'
                        }`}>
                          {r.chance}: {r.percent}%
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-3 mt-4 border-t border-app-border pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setRank('');
                    setFirstName('');
                    setLastName('');
                    setMobile('');
                    setEmail('');
                  }}
                  className="flex-1 py-3.5 rounded-xl border border-app-border text-app-muted hover:text-white hover:bg-app-card font-bold text-xs uppercase cursor-pointer transition-colors bg-transparent"
                >
                  Reset Form
                </button>
                
                <button
                  onClick={() => {
                    addToast('Counselor callback scheduled! We will contact you shortly.', 'success');
                    handleClose();
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase cursor-pointer border-none transition-colors shadow-lg shadow-[#FF7A00]/25"
                >
                  Connect with Counselor
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CollegePredictor;
