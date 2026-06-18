import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Phone, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';

export const Register = () => {
  const navigate = useNavigate();
  const { register, verifyOtp, isVerifyingOtp, tempRegData } = useAuthStore();
  const addToast = useGlobalStore().addToast;

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneVal, setPhoneVal] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');

  // Password strength meter states
  const [strength, setStrength] = useState({ label: 'Weak', color: 'bg-danger', percent: 25 });

  useEffect(() => {
    // Basic password strength computation
    if (!password) {
      setStrength({ label: 'Empty', color: 'bg-white/10', percent: 0 });
      return;
    }
    const len = password.length;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (len < 6) {
      setStrength({ label: 'Too Short', color: 'bg-danger', percent: 25 });
    } else if (len >= 6 && (!hasNumber || !hasSpecial)) {
      setStrength({ label: 'Fair', color: 'bg-warning', percent: 50 });
    } else if (len >= 8 && hasNumber && hasSpecial) {
      setStrength({ label: 'Strong', color: 'bg-success', percent: 100 });
    } else {
      setStrength({ label: 'Medium', color: 'bg-accent', percent: 75 });
    }
  }, [password]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phoneVal || !password) {
      addToast('Please complete all fields', 'warning');
      return;
    }
    if (password.length < 6) {
      addToast('Password must be at least 6 characters', 'warning');
      return;
    }
    
    // Trigger register flow (activates OTP modal)
    register(name, email, phoneVal);
  };

  const handleOtpSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    const success = verifyOtp(otpCode);
    if (success) {
      // Trigger success confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
      // Redirect home
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-md px-6 w-full relative z-10">
        <div className="glass p-8 rounded-3xl border-app-border flex flex-col gap-6 shadow-2xl text-left bg-gradient-to-tr from-white/[0.01] to-white/[0.03]">
          
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display font-extrabold text-2xl text-app-text tracking-tight">
              Create Account
            </h2>
            <p className="text-xs text-app-muted">
              Get matched to top colleges, scholarships, and career roadmap checklists.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-app-muted uppercase">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-app-muted uppercase">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  required
                  placeholder="name@address.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-app-muted uppercase">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-app-muted uppercase">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>

              {/* Password strength meter bar */}
              {password && (
                <div className="flex flex-col gap-1.5 mt-2">
                  <div className="flex justify-between items-center text-[10px] text-app-muted">
                    <span>Password Strength</span>
                    <span className="font-bold">{strength.label}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
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
              className="py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4.5 h-4.5" />
              Register Account
            </button>
          </form>

          {/* Login redirection */}
          <div className="border-t border-app-border/40 pt-5 text-center text-[11px] text-app-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </div>

      {/* OTP Verification Modal Popup */}
      {isVerifyingOtp && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md" />
          <div className="relative w-full max-w-sm rounded-2xl border border-app-border bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10 text-center flex flex-col gap-5">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-primary border border-primary/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <div>
              <h3 className="font-display font-bold text-xl text-app-text">OTP Verification</h3>
              <p className="text-xs text-app-muted mt-1.5 leading-relaxed">
                Enter the 6-digit confirmation code sent to <b className="text-app-text">{tempRegData?.email}</b>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  required
                  placeholder="Enter OTP (type 123456)"
                  value={otpCode}
                  maxLength={6}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-white/5 border border-app-border text-center text-sm font-bold text-app-text outline-none focus:border-primary tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm"
              >
                Confirm Code
              </button>

              <button
                type="button"
                onClick={() => addToast('OTP resent!', 'info')}
                className="text-[10px] font-semibold text-app-muted hover:text-app-text self-center hover:underline"
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
export default Register;
