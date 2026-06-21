import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ClipboardCheck, ArrowRight, Award, DollarSign, Building } from 'lucide-react';
import { useGlobalStore } from '../store/useGlobalStore';

export const ReAdmission: React.FC = () => {
  const addToast = useGlobalStore().addToast;

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [city, setCity] = useState('');
  const [existingCollege, setExistingCollege] = useState('');
  const [newCollege, setNewCollege] = useState('');
  const [course, setCourse] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      addToast('Please complete name, email and phone fields.', 'warning');
      return;
    }
    addToast('Re-admission inquiry registered! Academic counselor will contact you shortly.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setStateVal('');
    setCity('');
    setExistingCollege('');
    setNewCollege('');
    setCourse('');
  };

  const reviews = [
    {
      text: "I'm glad I chose Aruna-Nand EdTech to learn about my MBA since every mentor gave their students their undivided attention in academic and extracurricular areas. They provided us with efficient...",
      name: "Arpita Adhikary",
      role: "Student, RGPV university Bhopal"
    },
    {
      text: "Thanks to Aruna-Nand EdTech, which is famous for its relevance, the extensive MBA Training and coaching is easy to grasp. From poor academic results to top aptitude...",
      name: "Divya Shaha",
      role: "Presidency university, Bangalore"
    },
    {
      text: "Every class Aruna-Nand EdTech conduct is packed with good material, engaging stories, interesting events, and tremendous positive energy. No MBA question escapes...",
      name: "Jitesh Naidu",
      role: "Kirloskar Institute, Harihar"
    },
    {
      text: "I'm happy I picked the Aruna-Nand EdTech to learn and understand about my MBA since every mentor member offers their students great attention in both the academic and extracurricular...",
      name: "Kalpana Singh",
      role: "CUTM, Bhubaneswar"
    }
  ];

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text pt-24 pb-20">
      {/* Subheader banner */}
      <div className="w-full bg-[#121E31] border-b border-app-border text-[11px] font-bold py-2 px-6 overflow-x-auto whitespace-nowrap text-left z-20 flex gap-6 text-[#94A3B8] mb-8 select-none">
        <Link to="/colleges" className="hover:text-white uppercase tracking-wider">Colleges</Link>
        <Link to="/exams" className="hover:text-white uppercase tracking-wider">Exams</Link>
        <Link to="/reviews" className="hover:text-white uppercase tracking-wider">Reviews</Link>
        <Link to="/news" className="hover:text-white uppercase tracking-wider">News</Link>
        <Link to="/scholarships" className="hover:text-white uppercase tracking-wider">Apply for Scholarship</Link>
        <Link to="/events" className="hover:text-white uppercase tracking-wider">Events</Link>
        <Link to="/blog" className="hover:text-white uppercase tracking-wider">Blog</Link>
        <Link to="/common-application" className="hover:text-white uppercase tracking-wider">Common Application Process</Link>
        <Link to="/online-courses" className="hover:text-white uppercase tracking-wider">Online Courses</Link>
        <Link to="/college-predictor" className="hover:text-white uppercase tracking-wider">College Predictor</Link>
      </div>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO TITLE & REGISTER FORM BLOCK */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-app-border text-left shadow-2xl flex flex-col lg:flex-row gap-10 items-center justify-between">
          
          {/* Left info description */}
          <div className="flex-1 flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/30 text-[10px] font-bold text-white self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              Resume Your Learning Journey
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-white uppercase tracking-tight max-w-xl">
              Welcome to <span className="text-[#F97316]">Aruna-Nand EdTech...</span>
            </h1>
            <h2 className="text-base sm:text-lg font-bold text-slate-300">
              Re-admission Process
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-extrabold leading-relaxed max-w-xl">
              Don't let a temporary setback stand in the way of your future. Apply for readmission.
            </p>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed font-medium max-w-xl">
              With Aruna-Nand EdTech, students can get the support they need to get back on track and achieve their academic and career goals. Candidates are provided the facility to rejoin and complete their respective courses/programmes within the given time.
            </p>
          </div>

          {/* Right form block */}
          <div className="w-full lg:w-[440px] bg-white rounded-2xl p-6 md:p-8 shadow-xl text-slate-800 shrink-0">
            <h3 className="text-lg font-black text-center text-[#F97316] mb-5 uppercase tracking-wide">
              Register
            </h3>

            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3.5 text-xs font-semibold">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Mobile No"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="text"
                value={stateVal}
                onChange={(e) => setStateVal(e.target.value)}
                placeholder="Enter Your state"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter Your City"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="text"
                value={existingCollege}
                onChange={(e) => setExistingCollege(e.target.value)}
                placeholder="Existing college"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <input
                type="text"
                value={newCollege}
                onChange={(e) => setNewCollege(e.target.value)}
                placeholder="New College"
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-450 outline-none focus:border-[#F97316] transition-colors"
              />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:border-[#F97316] transition-colors cursor-pointer"
              >
                <option value="">Select Course</option>
                <option value="mba">MBA</option>
                <option value="btech">B.Tech</option>
                <option value="bba">BBA</option>
                <option value="mca">MCA</option>
                <option value="bca">BCA</option>
                <option value="mbbs">MBBS</option>
              </select>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-lg bg-[#F97316] text-white font-black text-xs tracking-wider uppercase border-none cursor-pointer hover:bg-[#EA580C] transition-all shadow-md active:scale-95"
              >
                Register
              </button>
            </form>
          </div>

        </div>

        {/* STUDENT REVIEWS HEADER & LISTING SECTION */}
        <div className="py-16 border-t border-app-border/40 mt-12 text-center flex flex-col gap-10">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider">
            Students Reviews
          </h3>
          
          {/* Reviews grid column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {reviews.map((rev, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-app-card border border-app-border flex flex-col gap-4 shadow-lg hover:border-[#F97316]/50 transition-all font-medium text-xs text-app-muted"
              >
                {/* Gold Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                  ))}
                </div>

                <p className="leading-relaxed italic flex-1">
                  "{rev.text}"
                </p>

                <button 
                  onClick={() => addToast('Full review details opened.', 'info')}
                  className="text-[10px] text-[#F97316] font-black uppercase hover:underline cursor-pointer border-none bg-transparent self-start py-1"
                >
                  Read more
                </button>

                {/* Author footer */}
                <div className="border-t border-app-border/30 pt-3.5 flex flex-col gap-0.5">
                  <span className="font-extrabold text-white text-sm">{rev.name}</span>
                  <span className="text-[10px] text-slate-500 font-bold">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReAdmission;
