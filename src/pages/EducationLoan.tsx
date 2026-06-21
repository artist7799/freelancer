import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, BookOpen, Clock, Heart, CheckCircle2, ChevronDown, ChevronUp, FileText, Award, DollarSign, Building } from 'lucide-react';
import { useGlobalStore } from '../store/useGlobalStore';

// Partner Logos mockups
const KuhooLogo = () => (
  <div className="flex items-center gap-1">
    <span className="text-[#0E387A] font-black text-2xl tracking-tight">kuhoo</span>
    <div className="flex flex-col gap-0.5 mt-1 select-none">
      <div className="w-4 h-0.5 bg-yellow-500 rounded" />
      <div className="w-5 h-0.5 bg-yellow-500 rounded" />
      <div className="w-3 h-0.5 bg-yellow-500 rounded" />
    </div>
  </div>
);

const AvanseLogo = () => (
  <div className="flex flex-col items-start leading-none select-none">
    <div className="flex items-baseline gap-0.5">
      <span className="text-[#009E49] font-black text-2xl tracking-tighter">AVANSE</span>
      <span className="text-[7px] text-slate-500 font-extrabold uppercase tracking-wide">Education Loans</span>
    </div>
    <span className="text-[6.5px] text-[#009E49] font-bold uppercase tracking-wider mt-0.5">Aspire Without Boundaries</span>
  </div>
);

const PropelldLogo = () => (
  <div className="flex items-center gap-1.5 select-none">
    <polygon points="5,15 15,5 25,15 15,25" fill="#3B82F6" className="w-5 h-5 shrink-0" />
    <span className="text-slate-900 dark:text-white font-black text-2xl tracking-tight">Propelld</span>
  </div>
);

export const EducationLoan: React.FC = () => {
  const addToast = useGlobalStore().addToast;

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [city, setCity] = useState('');
  const [loanAmount, setLoanAmount] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      addToast('Please complete all form fields.', 'warning');
      return;
    }
    addToast('Loan eligibility request successfully registered! Financial officer will connect shortly.', 'success');
    setName('');
    setEmail('');
    setPhone('');
    setStateVal('');
    setCity('');
    setLoanAmount('');
  };

  // FAQ open state mapping
  const [openFaq, setOpenFaq] = useState<number | null>(0); // First item open by default

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const faqs = [
    {
      q: 'Who can apply for an education loan?',
      a: 'Students pursuing higher education in India or abroad can apply. Parents or guardians can also apply as co-borrowers.'
    },
    {
      q: 'What expenses does the education loan cover?',
      a: 'The loan covers tuition fees, hostel/accommodation fees, examination/library/laboratory charges, book purchases, equipment/instruments, and travel pass charges for studies abroad.'
    },
    {
      q: 'Do I need collateral to get an education loan?',
      a: 'For loans up to ₹7.5 Lakhs, no collateral is required under the Government Guarantee Scheme. Loans above this value may require tangible collateral security.'
    },
    {
      q: 'What is the interest rate for an education loan?',
      a: 'Interest rates typically hover between 8.5% to 12.5% per annum, depending on the academic profile of the student and co-applicant credentials.'
    },
    {
      q: 'How long does it take to get loan approval?',
      a: 'Standard approvals take anywhere from 3 to 7 working days once all necessary academic and financial documents are verified.'
    },
    {
      q: 'When do I start repaying my loan?',
      a: 'Repayments generally begin after the moratorium period, which is the course duration plus 6 to 12 months, or after finding employment (whichever is earlier).'
    },
    {
      q: 'Can I apply for a loan before securing admission?',
      a: 'Yes, pre-admission loan sanctions are offered by partners like Avanse and Kuhoo based on entrance score sheets (CAT, SNAP, JEE).'
    },
    {
      q: 'Are there any tax benefits on education loans?',
      a: 'Yes, interest paid on education loans is fully deductible under Section 80E of the Income Tax Act for up to 8 consecutive years.'
    },
    {
      q: 'Can I get an education loan without a co-applicant?',
      a: 'Almost all Indian lenders require a parents or guardian as a joint co-borrower to evaluate secondary repayment capacity.'
    },
    {
      q: 'How can I apply for an education loan?',
      a: 'Simply fill out our Eligibility Checker form above. Our finance counselors will gather your documents and apply to matching partner banks directly.'
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

      {/* Main content grid */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO HEADER & FORM LAYOUT */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-app-border text-left shadow-2xl flex flex-col lg:flex-row gap-10 items-center justify-between">
          
          {/* Left Text */}
          <div className="flex-1 flex flex-col gap-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F97316]/20 border border-[#F97316]/30 text-[10px] font-bold text-white self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#F97316]" />
              Empowering Education Financially
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black leading-tight text-white uppercase tracking-tight max-w-xl">
              Empower Your Future with the Right <span className="text-[#F97316]">Education Loan</span>
            </h1>
            <h2 className="text-base sm:text-lg font-bold text-slate-300">
              Achieve Your Academic Dreams Without Financial Worries
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium max-w-xl">
              Higher education is the key to unlocking a world of opportunities. Whether you're planning to study in India or abroad, our education loan solutions provide the financial support you need to pursue your dreams without stress.
            </p>
          </div>

          {/* Right form card */}
          <div className="w-full lg:w-[440px] bg-white rounded-2xl p-6 md:p-8 shadow-xl text-slate-800 shrink-0">
            <h3 className="text-lg font-black text-center text-[#F97316] mb-5 uppercase tracking-wide">
              Check Loan Eligibility
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
              <select
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="w-full px-3.5 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:border-[#F97316] transition-colors cursor-pointer"
              >
                <option value="">Select Loan Amount</option>
                <option value="up-to-5">Up to ₹5 Lakhs</option>
                <option value="5-10">₹5 Lakhs - ₹10 Lakhs</option>
                <option value="10-20">₹10 Lakhs - ₹20 Lakhs</option>
                <option value="above-20">Above ₹20 Lakhs</option>
              </select>

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-lg bg-[#E11D48] text-white font-black text-xs tracking-wider uppercase border-none cursor-pointer hover:opacity-95 transition-all shadow-md active:scale-95"
              >
                Register Now
              </button>
            </form>
          </div>

        </div>

        {/* TRUSTED PARTNERS BLOCK */}
        <div className="py-12 border-t border-app-border/40 mt-12 text-center flex flex-col gap-6">
          <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-wider text-[#F97316]">
            Trusted Education Loan Partnered with Leading Banks & Institutions
          </h3>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 p-6 rounded-2xl bg-white/5 dark:bg-app-card border border-app-border select-none">
            <div className="p-4 rounded-xl bg-white flex items-center justify-center shadow">
              <KuhooLogo />
            </div>
            <div className="p-4 rounded-xl bg-white flex items-center justify-center shadow">
              <AvanseLogo />
            </div>
            <div className="p-4 rounded-xl bg-white flex items-center justify-center shadow">
              <PropelldLogo />
            </div>
          </div>
        </div>

        {/* BENEFITS CHIPS */}
        <div className="flex flex-wrap justify-center gap-3.5 pb-8 select-none">
          {['Low-Interest Rates', 'Flexible Repayment Options', 'Quick & Hassle-Free Approval', 'Secured & Unsecured Loans', 'Coverage for All Expenses'].map((ben, i) => (
            <span key={i} className="px-5 py-3 rounded-full bg-app-card border border-app-border text-xs font-black uppercase text-[#94A3B8]">
              {ben}
            </span>
          ))}
        </div>

        {/* WHO CAN APPLY */}
        <div className="py-12 border-t border-app-border/40 text-center flex flex-col gap-8 select-none">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-wider">
            Who Can Apply?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left font-medium text-xs">
            <div className="p-6 rounded-2xl bg-app-card border border-app-border flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center font-black text-white">1</div>
              <p className="text-slate-300 leading-relaxed font-bold text-sm">
                Students pursuing higher education in India or abroad.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-app-card border border-app-border flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center font-black text-white">2</div>
              <p className="text-slate-300 leading-relaxed font-bold text-sm">
                Parents or guardians acting as co-borrowers.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-app-card border border-app-border flex flex-col gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center font-black text-white">3</div>
              <p className="text-slate-300 leading-relaxed font-bold text-sm">
                Professionals looking for education loan refinancing.
              </p>
            </div>
          </div>
        </div>

        {/* FAQS COLLAPSIBLE */}
        <div className="py-12 border-t border-app-border/40 flex flex-col gap-6 text-left max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-display font-black text-white text-center uppercase tracking-wider mb-2">
            Frequently Asked Questions
          </h3>

          <div className="flex flex-col gap-3 font-semibold select-none">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index}
                  className="rounded-xl border border-app-border bg-[#0C1221] overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left text-xs sm:text-sm font-extrabold text-white cursor-pointer bg-[#F97316]/5 hover:bg-[#F97316]/10 transition-colors border-none"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#F97316]" /> : <ChevronDown className="w-4 h-4 text-[#F97316]" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 text-xs sm:text-sm text-app-muted leading-relaxed font-medium bg-[#080B16] border-t border-app-border/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EducationLoan;
