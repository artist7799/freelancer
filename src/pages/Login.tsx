import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';
import confetti from 'canvas-confetti';

export const Login = () => {
  const navigate = useNavigate();
  const { login, verifyOtp, resendOtp, isVerifyingOtp, tempRegData } = useAuthStore();
  const addToast = useGlobalStore().addToast;

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please complete email and password parameters', 'warning');
      return;
    }

    setLoading(true);
    const success = await login(email, password);
    setLoading(false);

    if (success) {
      if (remember) {
        localStorage.setItem('saved_user_email', email);
      }
      navigate('/dashboard');
    }
  };

  const handleOtpSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!otpCode || otpCode.length < 6) return;
    setOtpLoading(true);
    const success = await verifyOtp(otpCode);
    setOtpLoading(false);
    if (success) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setTimeout(() => { navigate('/dashboard'); }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    addToast('Google login simulated successfully!', 'info');
    setTimeout(() => {
      login('student.demo@gmail.com', 'demopass123');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-text flex flex-col md:flex-row overflow-hidden">
      
      {/* ─── LEFT PANEL: Visual Brand Intro ─── */}
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-br from-[#4A0E17] to-[#1A050A] p-12 flex-col justify-between relative overflow-hidden border-r border-app-border">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#9F1239]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#F97316]/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Brand */}
        <div className="relative z-10 text-left select-none">
          <span className="text-xl font-black tracking-tighter text-white block">
            ARUNA-NAND EDTECH
          </span>
          <span className="text-[7px] text-app-muted font-bold uppercase tracking-widest block mt-0.5">
            CHOICE • KINDLE • PORTAL
          </span>
        </div>

        {/* Floating Rocket Illustration */}
        <div className="relative z-10 flex justify-center py-6">
          <svg viewBox="0 0 180 200" className="w-48 h-48 drop-shadow-2xl animate-float" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="90" cy="85" rx="22" ry="55" fill="#F97316"/>
            <ellipse cx="90" cy="85" rx="16" ry="48" fill="#FFA040"/>
            <ellipse cx="90" cy="35" rx="14" ry="16" fill="#FF5500"/>
            <circle cx="90" cy="78" r="9" fill="white" opacity="0.9"/>
            <circle cx="90" cy="78" r="6" fill="#881337"/>
            <path d="M68 118 L60 145 L80 130 Z" fill="#FF5500"/>
            <path d="M112 118 L120 145 L100 130 Z" fill="#FF5500"/>
            <ellipse cx="90" cy="150" rx="10" ry="20" fill="#FFD700" opacity="0.9"/>
            <ellipse cx="90" cy="158" rx="7" ry="13" fill="#F97316" opacity="0.8"/>
            <circle cx="32" cy="50" r="2" fill="#FFD700"/>
            <circle cx="148" cy="40" r="2" fill="#FFD700"/>
            <circle cx="25" cy="110" r="1.5" fill="#FFD700"/>
            <circle cx="155" cy="100" r="1.5" fill="#FFD700"/>
          </svg>
        </div>

        {/* Feature list */}
        <div className="relative z-10 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-[#F97316] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-sm text-white">SaaS-Grade Target Tracking</h4>
              <p className="text-[11px] text-app-muted leading-relaxed mt-0.5">Shortlist up to 25K colleges and trace verified applications dynamically.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Frosted Glass Form ─── */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-12 relative z-10">
        <div className="absolute inset-0 bg-app-bg pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-[#F97316]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-3xl glass border border-app-border flex flex-col gap-6 shadow-2xl relative z-10 text-left">
          
          <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F97316]/10 text-[#F97316] self-start mb-2">
              <Sparkles className="w-3 h-3" /> Candidate Portal
            </span>
            <h2 className="font-display font-black text-2xl text-white tracking-tight">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-app-muted font-semibold">
              Manage eligibility predictor tests and counseling callbacks.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Mail className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  required
                  placeholder="student.demo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-app-muted uppercase tracking-wider">Password</label>
                <a href="#" className="text-[10px] font-bold text-[#F97316] hover:underline">
                  Forgot Password?
                </a>
              </div>
              <div className="relative flex items-center border border-app-border rounded-xl p-1 bg-app-card">
                <Lock className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-transparent border-none outline-none text-xs text-white placeholder-[#94A3B8]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-app-muted my-1 font-bold">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded border-app-border bg-transparent text-[#F97316] focus:ring-0 w-4 h-4 cursor-pointer"
                />
                <span>Remember Email</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#F97316]/25 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 border-none cursor-pointer mt-2"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="flex flex-col gap-4 border-t border-app-border pt-5 text-center font-bold">
            <button
              onClick={handleGoogleLogin}
              className="py-3 rounded-xl border border-app-border bg-app-card text-white hover:bg-white/10 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer font-bold"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </button>

            <p className="text-[11px] text-app-muted font-bold">
              New to Aruna-Nand EdTech Services?{' '}
              <Link to="/register" className="text-[#F97316] hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* OTP Verification Modal — shown when login detects unverified account */}
      {isVerifyingOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-md" />
          <div className="relative w-full max-w-sm rounded-3xl border border-app-border bg-app-card p-6 md:p-8 shadow-2xl z-10 text-center flex flex-col gap-5">
            <div className="w-12 h-12 rounded-full bg-[#F97316]/10 flex items-center justify-center mx-auto text-[#F97316] border border-[#F97316]/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-black text-xl text-white">Verify Your Email</h3>
              <p className="text-xs text-app-muted mt-1.5 leading-relaxed font-semibold">
                Enter the OTP sent to <b className="text-white">{tempRegData?.email || email}</b>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              <input
                type="text"
                required
                placeholder="Enter 6-digit OTP"
                value={otpCode}
                maxLength={6}
                onChange={(e) => setOtpCode(e.target.value)}
                className="px-4 py-3.5 rounded-xl bg-app-card border border-app-border text-center text-sm font-black text-white outline-none focus:border-[#F97316] tracking-widest"
              />

              <button
                type="submit"
                disabled={otpLoading}
                className="py-3.5 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs uppercase border-none cursor-pointer transition-colors shadow-lg shadow-[#F97316]/25 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {otpLoading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : 'Confirm OTP'}
              </button>

              <button
                type="button"
                onClick={resendOtp}
                className="text-[10px] font-bold text-app-muted hover:text-white self-center hover:underline bg-transparent border-none cursor-pointer"
              >
                Resend Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
