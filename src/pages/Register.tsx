import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';

export const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOtp, isVerifyingOtp, tempRegData, resendOtp } = useAuthStore();
  const addToast = useGlobalStore().addToast;

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  // Password strength meter states
  const [strength, setStrength] = useState({ label: 'Empty', color: 'bg-white/10', percent: 0 });

  useEffect(() => {
    if (!password) {
      setStrength({ label: 'Empty', color: 'bg-white/10', percent: 0 });
      return;
    }
    const len = password.length;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (len < 6) {
      setStrength({ label: 'Weak', color: 'bg-rose-500', percent: 25 });
    } else if (len >= 6 && (!hasNumber || !hasSpecial)) {
      setStrength({ label: 'Fair', color: 'bg-amber-500', percent: 50 });
    } else if (len >= 8 && hasNumber && hasSpecial) {
      setStrength({ label: 'Strong', color: 'bg-[#10B981]', percent: 100 });
    } else {
      setStrength({ label: 'Medium', color: 'bg-[#3B82F6]', percent: 75 });
    }
  }, [password]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneVal || !password) {
      addToast('Please complete all fields', 'warning');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters', 'warning');
      return;
    }
    
    await register(name, email, phoneVal, password);
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) {
      return;
    }

    setOtpLoading(true);
    const success = await verifyOtp(otpCode);
    setOtpLoading(false);
    if (success) {
      confetti({
         particleCount: 120,
         spread: 80,
         origin: { y: 0.6 }
      });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text flex flex-col md:flex-row overflow-hidden">
      
      {/* ─── LEFT PANEL: Progressive Milestones ─── */}
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#1a1040] to-[#0B1020] p-12 flex-col justify-between relative overflow-hidden border-r border-app-border">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FF7A00]/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Brand */}
        <div className="relative z-10 text-left select-none">
          <span className="text-xl font-black tracking-tighter text-white block">
            ARUNA-NAND EDTECH
          </span>
          <span className="text-[7px] text-app-muted font-bold uppercase tracking-widest block mt-0.5">
            CHOICE • KINDLE • PORTAL
          </span>
        </div>

        {/* Stepper timeline */}
        <div className="relative z-10 text-left space-y-6 my-auto">
          {[
            { step: 1, label: 'Profile Setup', desc: 'Secure name and email coordinates.' },
            { step: 2, label: 'Email Checkpoint', desc: 'Verify secure 6-digit confirmation pin.' },
            { step: 3, label: 'Unlock Dashboard', desc: 'Gain credentials to eligibility engines.' }
          ].map((s) => (
            <div key={s.step} className="flex gap-4 items-start font-medium">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                (isVerifyingOtp && s.step === 2) || (!isVerifyingOtp && s.step === 1)
                  ? 'bg-[#FF7A00] text-white ring-4 ring-[#FF7A00]/25'
                  : isVerifyingOtp && s.step === 1
                  ? 'bg-[#10B981] text-white'
                  : 'bg-app-card text-app-muted border border-app-border'
              }`}>
                {isVerifyingOtp && s.step === 1 ? '✓' : s.step}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-white">{s.label}</h4>
                <p className="text-[11px] text-app-muted mt-0.5 leading-normal">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 text-left text-[11px] text-app-muted font-bold">
          © 2026 Aruna-Nand EdTech Services.
        </div>
      </div>

      {/* ─── RIGHT PANEL: Registration Form ─── */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="absolute inset-0 bg-app-bg pointer-events-none" />
        
        <div className="w-full max-w-md p-8 rounded-3xl glass border border-app-border flex flex-col gap-6 shadow-2xl relative z-10 text-left">
          
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF7A00]/10 text-[#FF7A00] self-start mb-2">
              <Sparkles className="w-3 h-3" /> New Candidate
            </span>
            <h2 className="font-display font-black text-2xl text-white tracking-tight">
              Create Your Account
            </h2>
            <p className="text-xs text-app-muted font-semibold">
              Get matched to top colleges, scholarships, and timeline countdowns.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Candidate Full Name</label>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <User className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="text"
                  required
                  autoComplete="off"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Mail className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  required
                  autoComplete="off"
                  placeholder="name@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Mobile Number</label>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Phone className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="tel"
                  required
                  autoComplete="off"
                  placeholder="+91 98765 43210"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Password</label>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Lock className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  required
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>

              {/* Password strength meter bar */}
              {password && (
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between items-center text-[10px] text-app-muted">
                    <span>Password Security</span>
                    <span className="font-bold">{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-app-card overflow-hidden">
                    <div
                      className={`h-full ${strength.color} rounded-full transition-all duration-300`}
                      style={{ width: `${strength.percent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF7A00]/25 transition-all flex items-center justify-center gap-1.5 border-none cursor-pointer mt-2"
            >
              <Sparkles className="w-4.5 h-4.5" />
              <span>Verify & Register</span>
            </button>
          </form>

          <div className="border-t border-app-border pt-5 text-center text-[11px] text-app-muted font-bold">
            Already have an account?{' '}
            <Link to="/login" className="text-[#FF7A00] hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>

      {/* OTP Verification Modal Popup */}
      {isVerifyingOtp && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-app-bg/85 backdrop-blur-md" />
          <div className="relative w-full max-w-sm rounded-3xl border border-app-border bg-app-card p-6 md:p-8 overflow-hidden shadow-2xl z-10 text-center flex flex-col gap-5">
            <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center mx-auto text-[#FF7A00] border border-[#FF7A00]/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-black text-xl text-white">OTP Verification</h3>
              <p className="text-xs text-app-muted mt-1.5 leading-relaxed font-semibold">
                Enter the confirmation code sent to <b className="text-white">{tempRegData?.email}</b>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter OTP (type 123456)"
                  value={otpCode}
                  maxLength={6}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="px-4 py-3.5 rounded-xl bg-app-card border border-app-border text-center text-sm font-black text-white outline-none focus:border-[#FF7A00] tracking-widest font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={otpLoading}
                className="py-3.5 rounded-xl bg-[#FF7A00] hover:bg-[#D14B00] text-white font-bold text-xs uppercase border-none cursor-pointer transition-colors shadow-lg shadow-[#FF7A00]/25 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {otpLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : 'Confirm Code'}
              </button>

              <button
                type="button"
                onClick={resendOtp}
                className="text-[10px] font-bold text-app-muted hover:text-white self-center hover:underline bg-transparent border-none cursor-pointer"
              >
                Resend Verification Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
