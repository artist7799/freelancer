import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, Sun, Moon, LogOut, User } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useCompareStore } from '../../store/useCompareStore';

export const GlassNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [interestOpen, setInterestOpen] = useState(false);
  
  const location = useLocation();
  const { theme, toggleTheme, setSearchModalOpen } = useGlobalStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { compareIds } = useCompareStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setInterestOpen(false);
  }, [location.pathname]);

  const topRibbonLinks = [
    { name: 'Colleges', path: '/colleges' },
    { name: 'Exams', path: '/exams', badge: 'NEW' },
    { name: 'Reviews', path: '/resources' },
    { name: 'News', path: '/resources' },
    { name: 'Apply For Scholarship', path: '/scholarships' },
    { name: 'Events', path: '/contact' },
    { name: 'Blog', path: '/resources' },
    { name: 'Common Application Process', path: '/register' },
    { name: 'Online Courses', path: '/careers' },
    { name: 'College Predictor', path: '/colleges' }
  ];

  const disciplines = [
    { 
      name: 'B.TECH', 
      path: '/colleges?course=Engineering',
      sub: [
        { name: 'IIT Bombay', path: '/colleges/iit-bombay' },
        { name: 'BITS Pilani', path: '/colleges/bits-pilani' },
        { name: 'Browse All B.Tech', path: '/colleges?course=Engineering' }
      ]
    },
    { 
      name: 'MBA', 
      path: '/colleges?course=Management',
      sub: [
        { name: 'IIM Bangalore', path: '/colleges/iim-bangalore' },
        { name: 'Browse All MBA', path: '/colleges?course=Management' }
      ]
    },
    { 
      name: 'MBBS', 
      path: '/colleges?course=Medicine',
      sub: [
        { name: 'AIIMS New Delhi', path: '/colleges/aiims-delhi' },
        { name: 'Browse All MBBS', path: '/colleges?course=Medicine' }
      ]
    },
    { 
      name: 'DESIGN', 
      path: '/colleges?course=Design',
      sub: [
        { name: 'IIT Bombay Design', path: '/colleges/iit-bombay' },
        { name: 'Browse All Design', path: '/colleges?course=Design' }
      ]
    },
    { 
      name: 'LAW', 
      path: '/colleges?course=Law',
      sub: [
        { name: 'NLSIU Bangalore', path: '/colleges/nlsiu-bangalore' },
        { name: 'Browse All Law', path: '/colleges?course=Law' }
      ]
    },
  ];

  const interestsList = [
    { name: 'Engineering & Technology', category: 'Engineering' },
    { name: 'Management & Business', category: 'Management' },
    { name: 'Medical & Healthcare', category: 'Medicine' },
    { name: 'Legal Studies & Law', category: 'Law' },
    { name: 'Commerce & Finance', category: 'Commerce' },
    { name: 'Arts & Design', category: 'Design' }
  ];

  return (
    <>
      {/* 1. TOP NAV RIBBON (Hidden on mobile for viewport space, styled like Career Mantra) */}
      <div className="hidden lg:flex fixed top-0 left-0 right-0 h-9 bg-slate-950 text-white z-55 items-center justify-between px-6 lg:px-12 border-b border-white/5 select-none">
        {/* Left: Ribbon Links */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-1 text-[11px] font-bold tracking-wider">
          {topRibbonLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="hover:text-warning flex items-center gap-1.5 transition-colors uppercase text-slate-300"
            >
              {link.name}
              {link.badge && (
                <span className="bg-warning text-slate-950 text-[8px] font-extrabold px-1.5 py-0.5 rounded animate-pulse shadow-sm">
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        {/* Right: Actions (Compare, Theme, Auth) relocated from main navbar */}
        <div className="flex items-center gap-4 text-xs font-bold">
          
          {/* Comparison floating pill */}
          {compareIds.length > 0 && (
            <Link
              to="/compare"
              className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-accent/20 border border-accent/40 text-accent hover:bg-accent/30 transition-all text-[10px]"
            >
              Compare ({compareIds.length})
            </Link>
          )}

          {/* Theme Switcher icon */}
          <button
            onClick={toggleTheme}
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <span className="text-slate-700">|</span>

          {/* User Auth Info */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-300">Hello, {user?.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                className="text-[10px] text-danger/80 hover:text-danger cursor-pointer transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 text-[10px]">
              <Link to="/login" className="text-slate-400 hover:text-white transition-colors uppercase">
                Login
              </Link>
              <Link to="/register" className="text-warning hover:text-warning/90 transition-colors uppercase">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* 2. MAIN HEADER NAVBAR (Flat & Full-Width, sits flatly below ribbon, exactly like screenshot) */}
      <header 
        className={`fixed left-0 right-0 z-50 transition-all duration-300 pointer-events-auto bg-white dark:bg-[#0B1020] border-b-[5px] border-[#1B254B] dark:border-primary shadow-sm flex items-center ${
          isScrolled 
            ? 'top-0 h-16 shadow-[0_4px_20px_rgba(0,0,0,0.06)]' 
            : 'top-0 lg:top-9 h-16'
        }`}
      >
        <div className="w-full h-full flex items-center justify-between lg:justify-center gap-6 lg:gap-8 xl:gap-14 px-6 lg:px-12">
          
          {/* Left: Brand Logo styled like Career Mantra */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-15 h-8.5 rounded-full bg-[#1B254B] dark:bg-white flex items-center justify-center border border-slate-700/10 shadow-sm select-none">
              {/* Circle on the left enclosing C */}
              <div className="absolute left-[3px] w-6.5 h-6.5 rounded-full border border-white dark:border-[#1B254B] flex items-center justify-center">
                <span className="font-display font-black text-[11px] text-white dark:text-[#1B254B] tracking-tight">
                  C
                </span>
              </div>
              {/* Slanted Slash Divider */}
              <div className="w-[1.5px] h-5 bg-white dark:bg-[#1B254B] transform rotate-[25deg] absolute left-[30px] opacity-80" />
              {/* Letter M on the right */}
              <span className="font-display font-black text-[11px] text-white dark:text-[#1B254B] tracking-tight absolute right-[8px]">
                M
              </span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tight font-display text-[#1B254B] dark:text-white leading-none">
                CAREER MANTRA
              </span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mt-0.5 leading-none">
                Unlock Hidden Potential
              </span>
            </div>
          </Link>

          {/* Right Group: Orange interest button, B.TECH, MBA, MBBS, DESIGN, LAW, and Search Icon */}
          <div className="flex items-center gap-4 lg:gap-8 xl:gap-14">
            
            {/* Choose Your Interest Button (Orange pill style) */}
            <div className="relative shrink-0">
              <button
                onClick={() => setInterestOpen(!interestOpen)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#E06C00] shadow-md shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-200 cursor-pointer animate-none"
              >
                Choose Your Interest
                <span className={`text-[9px] ml-1 transition-transform duration-200 inline-block ${interestOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Interest Menu Dropdown */}
              {interestOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setInterestOpen(false)} />
                  <div className="absolute left-0 mt-2.5 w-60 rounded-xl glass border border-app-border bg-app-bg shadow-2xl p-2.5 z-20 flex flex-col gap-1">
                    <div className="text-[10px] text-app-muted font-bold uppercase tracking-wider px-2.5 pb-2 border-b border-app-border/40 mb-1">
                      Explore Sectors
                    </div>
                    {interestsList.map((interest) => (
                      <Link
                        key={interest.name}
                        to={`/colleges?course=${interest.category}`}
                        onClick={() => setInterestOpen(false)}
                        className="px-3 py-2 text-xs font-semibold rounded-lg text-app-muted hover:text-app-text hover:bg-white/5 transition-all text-left"
                      >
                        {interest.name}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Disciplines list (Horizontal row, hidden on mobile/tablet) */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-6 shrink-0">
              {disciplines.map((disc, idx) => {
                const isOpen = activeDropdown === idx;
                return (
                  <div
                    key={disc.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(idx)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : idx)}
                      className={`py-1.5 text-xs font-black tracking-wide transition-all flex items-center gap-0.5 cursor-pointer uppercase ${
                        isOpen 
                          ? 'text-[#FF7A00]' 
                          : 'text-slate-800 dark:text-slate-200 hover:text-[#FF7A00]'
                      }`}
                    >
                      {disc.name}
                      <span className={`text-[9px] ml-1 transition-transform duration-200 inline-block ${isOpen ? 'rotate-180' : 'text-slate-500 dark:text-slate-400'}`}>▼</span>
                    </button>

                    {/* Submenu Dropdown */}
                    {isOpen && (
                      <div className="absolute left-1/2 -translate-x-1/2 mt-1.5 w-48 rounded-xl glass border border-app-border bg-app-bg shadow-xl p-2 z-20 flex flex-col gap-1">
                        {disc.sub.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.path}
                            onClick={() => setActiveDropdown(null)}
                            className="px-3 py-2 text-xs rounded-lg text-app-muted hover:text-app-text hover:bg-white/5 transition-all text-left font-semibold"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Search Everywhere Magnifying Glass Trigger */}
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-1 rounded-full text-slate-800 dark:text-slate-200 hover:text-[#FF7A00] transition-colors cursor-pointer shrink-0"
              title="Search Everywhere"
            >
              <Search className="w-5.5 h-5.5 stroke-[2.5]" />
            </button>

            {/* Mobile Menu Toggle Button (Visible on mobile/tablet) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Drawer Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[64px] z-40 bg-app-bg/95 backdrop-blur-xl flex flex-col px-6 py-6 border-t border-app-border pointer-events-auto lg:hidden">
            {/* Choose Your Interest (Mobile) */}
            <div className="mb-4">
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider block mb-2 px-1">Interests</span>
              <div className="grid grid-cols-2 gap-2">
                {interestsList.map((interest) => (
                  <Link
                    key={interest.name}
                    to={`/colleges?course=${interest.category}`}
                    className="p-2.5 rounded-xl text-xs font-semibold text-app-text bg-white/5 border border-app-border text-center hover:bg-white/10"
                  >
                    {interest.category}
                  </Link>
                ))}
              </div>
            </div>

            {/* General Navigation Links */}
            <div className="flex flex-col gap-2.5">
              <span className="text-[10px] text-app-muted font-bold uppercase tracking-wider block px-1">Disciplines</span>
              {disciplines.map((disc) => (
                <Link
                  key={disc.name}
                  to={disc.path}
                  className="py-2.5 px-4 rounded-xl text-sm font-bold text-app-muted hover:text-app-text hover:bg-app-card border border-transparent hover:border-app-border"
                >
                  {disc.name} Course Track
                </Link>
              ))}
            </div>

            {/* Bottom Section */}
            <div className="mt-auto border-t border-app-border pt-6 flex flex-col gap-4">
              {isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 px-1">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-app-text">{user?.name}</p>
                      <p className="text-xs text-app-muted">{user?.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full py-3 rounded-xl border border-danger/35 text-danger font-bold hover:bg-danger/5 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    className="py-3 text-center rounded-xl border border-app-border text-app-text font-bold hover:bg-app-card transition-all text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="py-3 text-center rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-95 transition-all text-sm"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default GlassNavbar;
