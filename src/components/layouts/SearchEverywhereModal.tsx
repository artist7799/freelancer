import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, School, GraduationCap, FileText, ArrowRight } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';
import { colleges } from '../../data/colleges';
import { exams } from '../../data/exams';
import { scholarships } from '../../data/scholarships';
import { blogs } from '../../data/blogs';

export const SearchEverywhereModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen } = useGlobalStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(!searchModalOpen);
      }
      if (e.key === 'Escape') {
        setSearchModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  // Search indexing
  const normalizedQuery = query.toLowerCase().trim();
  const filteredColleges = normalizedQuery
    ? colleges.filter(
        (c) =>
          c.name.toLowerCase().includes(normalizedQuery) ||
          c.location.toLowerCase().includes(normalizedQuery) ||
          c.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredExams = normalizedQuery
    ? exams.filter(
        (e) =>
          e.name.toLowerCase().includes(normalizedQuery) ||
          e.fullName.toLowerCase().includes(normalizedQuery) ||
          e.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredScholarships = normalizedQuery
    ? scholarships.filter(
        (s) =>
          s.name.toLowerCase().includes(normalizedQuery) ||
          s.provider.toLowerCase().includes(normalizedQuery) ||
          s.type.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const filteredBlogs = normalizedQuery
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(normalizedQuery) ||
          b.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults =
    filteredColleges.length +
    filteredExams.length +
    filteredScholarships.length +
    filteredBlogs.length;

  const handleSelect = (path: string) => {
    setSearchModalOpen(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 pointer-events-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSearchModalOpen(false)}
          className="fixed inset-0 bg-app-bg/65 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-app-border bg-app-bg shadow-2xl flex flex-col max-h-[75vh]"
        >
          {/* Header Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-app-border">
            <Search className="w-5 h-5 text-app-muted" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search colleges, exams, scholarships, roadmaps..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-0 text-app-text placeholder-app-muted text-base"
            />
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-semibold rounded bg-app-card border border-app-border text-app-muted">
              ESC
            </kbd>
            <button
              onClick={() => setSearchModalOpen(false)}
              className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-app-card"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {query.length === 0 ? (
              <div className="text-center py-10">
                <Search className="w-8 h-8 text-app-muted/40 mx-auto mb-3" />
                <p className="text-app-muted text-sm font-medium">
                  Type to start searching across the system
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-app-card border border-app-border text-app-muted">
                    "IILM University"
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-app-card border border-app-border text-app-muted">
                    "JEE Advanced"
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-app-card border border-app-border text-app-muted">
                    "Aditya Birla"
                  </span>
                </div>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-10">
                <p className="text-app-muted text-sm">
                  No results found for "<span className="text-app-text font-semibold">{query}</span>"
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {/* Colleges section */}
                {filteredColleges.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-primary tracking-wider uppercase mb-2 flex items-center gap-1.5 px-2">
                      <School className="w-3.5 h-3.5" />
                      Colleges ({filteredColleges.length})
                    </h3>
                    <div className="flex flex-col gap-1">
                      {filteredColleges.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => handleSelect(`/colleges/${c.id}`)}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-app-card light:hover:bg-slate-100 transition-all text-left w-full group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-app-text group-hover:text-primary transition-all">
                              {c.name}
                            </p>
                            <p className="text-xs text-app-muted">{c.location} • {c.category}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-app-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exams section */}
                {filteredExams.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-secondary tracking-wider uppercase mb-2 flex items-center gap-1.5 px-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Upcoming Exams ({filteredExams.length})
                    </h3>
                    <div className="flex flex-col gap-1">
                      {filteredExams.map((e) => (
                        <button
                          key={e.id}
                          onClick={() => handleSelect('/exams')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-app-card light:hover:bg-slate-100 transition-all text-left w-full group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-app-text group-hover:text-secondary transition-all">
                              {e.name}
                            </p>
                            <p className="text-xs text-app-muted">{e.fullName} • {e.category}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-app-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scholarships section */}
                {filteredScholarships.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-accent tracking-wider uppercase mb-2 flex items-center gap-1.5 px-2">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Scholarships ({filteredScholarships.length})
                    </h3>
                    <div className="flex flex-col gap-1">
                      {filteredScholarships.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => handleSelect('/scholarships')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-app-card light:hover:bg-slate-100 transition-all text-left w-full group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-app-text group-hover:text-accent transition-all">
                              {s.name}
                            </p>
                            <p className="text-xs text-app-muted">{s.amount} • {s.provider}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-app-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Blogs / Resources section */}
                {filteredBlogs.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-success tracking-wider uppercase mb-2 flex items-center gap-1.5 px-2">
                      <FileText className="w-3.5 h-3.5" />
                      Resources & Blogs ({filteredBlogs.length})
                    </h3>
                    <div className="flex flex-col gap-1">
                      {filteredBlogs.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => handleSelect('/resources')}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-app-card light:hover:bg-slate-100 transition-all text-left w-full group"
                        >
                          <div>
                            <p className="text-sm font-semibold text-app-text group-hover:text-success transition-all">
                              {b.title}
                            </p>
                            <p className="text-xs text-app-muted">{b.category} • {b.readTime}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-app-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Guide */}
          <div className="p-3 bg-app-card border-t border-app-border flex items-center justify-between text-xs text-app-muted">
            <div className="flex gap-4">
              <span>↑↓ to navigate</span>
              <span>↵ to select</span>
            </div>
            <span>Search Everywhere Modal</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default SearchEverywhereModal;
