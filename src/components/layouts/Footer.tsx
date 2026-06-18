import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const addToast = useGlobalStore().addToast;

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast('Thank you for subscribing! Stay tuned for updates.', 'success');
    setEmail('');
  };

  return (
    <footer className="border-t border-app-border bg-app-bg relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo Section */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary">
                <Sparkles className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight font-display text-app-text">
                Aruna-Nand EdTech Services
              </span>
            </Link>
            <p className="text-sm text-app-muted max-w-xs">
              Empowering students globally to discover, evaluate, and secure their dream education and career roadmaps.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a href="#" className="p-2 rounded-lg bg-app-card hover:bg-app-card-hover border border-app-border text-app-muted hover:text-app-text transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-app-card hover:bg-app-card-hover border border-app-border text-app-muted hover:text-app-text transition-all" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" className="p-2 rounded-lg bg-app-card hover:bg-app-card-hover border border-app-border text-app-muted hover:text-app-text transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Categories */}
          <div>
            <h3 className="text-sm font-semibold text-app-text mb-4">Colleges</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/colleges" className="text-app-muted hover:text-primary transition-all">Engineering</Link></li>
              <li><Link to="/colleges" className="text-app-muted hover:text-primary transition-all">Management</Link></li>
              <li><Link to="/colleges" className="text-app-muted hover:text-primary transition-all">Medicine</Link></li>
              <li><Link to="/colleges" className="text-app-muted hover:text-primary transition-all">Law Institutes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-app-text mb-4">Exams & Aid</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/exams" className="text-app-muted hover:text-primary transition-all">JEE Advanced</Link></li>
              <li><Link to="/exams" className="text-app-muted hover:text-primary transition-all">CAT Exam</Link></li>
              <li><Link to="/scholarships" className="text-app-muted hover:text-primary transition-all">Private Grants</Link></li>
              <li><Link to="/scholarships" className="text-app-muted hover:text-primary transition-all">STEM Scholarships</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-app-text mb-4">Resources</h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li><Link to="/resources" className="text-app-muted hover:text-primary transition-all">Updates Blog</Link></li>
              <li><Link to="/careers" className="text-app-muted hover:text-primary transition-all">Career roadmaps</Link></li>
              <li><Link to="/resources" className="text-app-muted hover:text-primary transition-all">Guides & Ebooks</Link></li>
              <li><Link to="/contact" className="text-app-muted hover:text-primary transition-all">Support Desk</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1 min-w-[200px]">
            <h3 className="text-sm font-semibold text-app-text mb-4">Newsletter</h3>
            <p className="text-xs text-app-muted mb-3">Subscribe to get alert updates on registrations & cutoffs.</p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl bg-app-card border border-app-border text-app-text placeholder-app-muted focus:outline-none focus:border-primary transition-all"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover transition-all"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-app-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-app-muted">
            &copy; {new Date().getFullYear()} Aruna-Nand EdTech Services Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-app-muted">
            <a href="#" className="hover:text-app-text">Privacy Policy</a>
            <a href="#" className="hover:text-app-text">Terms of Service</a>
            <a href="#" className="hover:text-app-text">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
