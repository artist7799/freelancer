import { useState } from 'react';
import { Download, Search, FileText, X, BookOpen, Clock, Calendar, User } from 'lucide-react';
import { blogs } from '../data/blogs';
import { BlogCard } from '../components/cards/BlogCard';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { useGlobalStore } from '../store/useGlobalStore';

export const Resources = () => {
  const addToast = useGlobalStore().addToast;

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const guides = [
    { id: 'admissions', title: 'Comprehensive Admissions Guidebook 2026', size: '4.2 MB PDF', desc: 'Step-by-step counselor overview for seat allotments and counseling forms.' },
    { id: 'cat-formulas', title: 'CAT Quantitative Formulas & Shortcuts', size: '2.8 MB PDF', desc: 'Crucial formulas and quick calculation shortcuts compiled by 100 percentilers.' },
    { id: 'scholarships-dir', title: 'National & Global Scholarships Directory', size: '5.1 MB PDF', desc: 'Full eligibility check criteria and deadlines for over 150 funding aids.' },
    { id: 'ai-roadmap', title: 'Artificial Intelligence & Career Pathways', size: '3.6 MB PDF', desc: 'Curriculum requirements, salary charts, and transition guides for MLOps roles.' }
  ];

  const handleDownload = (id: string, name: string) => {
    setDownloadingId(id);
    addToast(`Initializing download for "${name}"...`, 'info');
    
    // Simulate network delay
    setTimeout(() => {
      setDownloadingId(null);
      addToast(`Download complete! "${name}" saved to your downloads folders.`, 'success');
    }, 1500);
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Title */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Ebooks & Insight Resources
          </h1>
          <p className="text-sm text-app-muted max-w-md">
            Download study guides, preparation tools, and read industry articles written by counseling professionals.
          </p>
        </div>

        {/* Free downloads panel */}
        <section className="mb-14">
          <h2 className="text-xl font-display font-bold text-app-text mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Free Ebooks & Downloads
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <ScrollReveal key={guide.id} delay={0} duration={0.4}>
                <div className="glass p-5 rounded-2xl border-app-border flex items-start gap-4 justify-between h-full group">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-sm text-app-text leading-tight group-hover:text-primary transition-colors">
                      {guide.title}
                    </h3>
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wider mt-0.5">{guide.size}</span>
                    <p className="text-xs text-app-muted mt-2 leading-relaxed">{guide.desc}</p>
                  </div>
                  <button
                    disabled={downloadingId === guide.id}
                    onClick={() => handleDownload(guide.id, guide.title)}
                    className="p-3 rounded-xl bg-white/5 border border-app-border text-app-muted hover:text-white hover:bg-primary hover:border-transparent transition-all flex items-center justify-center flex-shrink-0 disabled:opacity-50"
                  >
                    {downloadingId === guide.id ? (
                      <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Blogs grid */}
        <section className="border-t border-app-border/40 pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-xl font-display font-bold text-app-text flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Latest Articles & Prep Tips
            </h2>
            
            <div className="flex items-center gap-2.5 p-2 rounded-xl glass border-app-border max-w-sm w-full">
              <Search className="w-4.5 h-4.5 text-app-muted ml-1.5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 outline-0 text-xs text-app-text placeholder-app-muted"
              />
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="py-20 text-center glass rounded-2xl border-app-border/40 w-full">
              <p className="text-app-muted text-sm font-semibold">No articles match your query parameters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <ScrollReveal key={blog.id} delay={0} duration={0.4}>
                  <BlogCard blog={blog} onReadMore={(blg) => setSelectedBlog(blg)} />
                </ScrollReveal>
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Blog Article Reader Modal overlay */}
      {selectedBlog && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div
            onClick={() => setSelectedBlog(null)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-app-border bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start gap-4 mb-4 border-b border-app-border pb-4">
              <div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold uppercase tracking-wider">
                  {selectedBlog.category}
                </span>
                <h3 className="font-display font-bold text-2xl text-app-text mt-2 leading-tight">
                  {selectedBlog.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBlog(null)}
                className="p-1 rounded-lg text-app-muted hover:text-app-text hover:bg-white/5 border border-transparent hover:border-app-border"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author info */}
            <div className="flex items-center gap-4 text-xs text-app-muted mb-6">
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-secondary" />
                By {selectedBlog.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-secondary" />
                {selectedBlog.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-secondary" />
                {selectedBlog.readTime}
              </span>
            </div>

            {/* Cover image */}
            <div className="h-60 rounded-xl overflow-hidden mb-6 border border-app-border">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content text */}
            <div className="text-xs sm:text-sm text-app-muted leading-relaxed flex flex-col gap-4">
              <p className="font-medium text-app-text italic">
                {selectedBlog.excerpt}
              </p>
              <p>
                {selectedBlog.content}
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedBlog(null)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-secondary rounded-xl hover:bg-secondary-hover transition-all"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Resources;
