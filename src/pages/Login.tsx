import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useGlobalStore } from '../store/useGlobalStore';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const addToast = useGlobalStore().addToast;

  // States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

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
      navigate('/');
    }
  };

  const handleGoogleLogin = () => {
    addToast('Google login simulated! Setting up demo user sessions...', 'info');
    setTimeout(() => {
      // Simulate login
      login('student.demo@gmail.com', 'demopass123');
      navigate('/');
    }, 800);
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-md px-6 w-full relative z-10">
        <div className="glass p-8 rounded-3xl border-app-border flex flex-col gap-6 shadow-2xl text-left bg-gradient-to-tr from-white/[0.01] to-white/[0.03]">
          
          {/* Header */}
          <div className="flex flex-col gap-1.5">
            <h2 className="font-display font-extrabold text-2xl text-app-text tracking-tight">
              Sign In to Career Mantra
            </h2>
            <p className="text-xs text-app-muted">
              Access college shortlists, checklists, and advisor callback queues.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-app-muted uppercase">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-app-muted" />
                <input
                  type="email"
                  required
                  placeholder="student.demo@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-app-muted uppercase">Password</label>
                <a href="#" className="text-[10px] font-semibold text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
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
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-app-muted my-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="rounded border-app-border bg-transparent text-primary focus:ring-0 w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Social login */}
          <div className="flex flex-col gap-3.5 border-t border-app-border/40 pt-5">
            <button
              onClick={handleGoogleLogin}
              className="py-3 rounded-xl border border-app-border bg-white/5 text-app-text hover:bg-app-card hover:text-app-text transition-all font-semibold text-xs flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            <p className="text-[11px] text-app-muted text-center">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Login;
