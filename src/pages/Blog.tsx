import React, { useState, useMemo } from 'react';
import { Search, ArrowLeft, Clock, Calendar, Send, Share2, Sparkles, User } from 'lucide-react';
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  categories: string[];
  author: string;
  date: string;
  image?: string;
  star?: boolean;
}
import { useBlogs } from '../hooks/useBlogs';
import { ScrollReveal } from '../components/animations/ScrollReveal';
import { useGlobalStore } from '../store/useGlobalStore';

export const Blog = () => {
  const addToast = useGlobalStore().addToast;
  const { useBlogsQuery } = useBlogs();
  const { data: postsList, isLoading } = useBlogsQuery({ limit: 1000 });
  const finalPosts = (postsList || []) as any[];

  const blogCategories = useMemo(() => {
    return Array.from(new Set(finalPosts.flatMap((p: any) => p.categories || []))).sort() as string[];
  }, [finalPosts]);

  const latestPostTitles = useMemo(() => {
    return finalPosts.slice(0, 5).map(p => p.title);
  }, [finalPosts]);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  const postsPerPage = 4;

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setActivePost(null); // Return to list view
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    setActivePost(null); // Return to list view
  };

  // Filter posts
  const filteredPosts = useMemo(() => {
    return finalPosts.filter((post) => {
      if (selectedCategory && !post.categories.includes(selectedCategory)) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(query);
        const matchesContent = post.content.toLowerCase().includes(query);
        return matchesTitle || matchesExcerpt || matchesContent;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    setIsSubmittingNewsletter(true);
    setTimeout(() => {
      setIsSubmittingNewsletter(false);
      setNewsletterEmail('');
      addToast('Subscribed! Weekly updates scheduled.', 'success');
    }, 1200);
  };

  const handleShare = (title: string) => {
    addToast(`Link to "${title}" copied to clipboard!`, 'success');
  };

  // Extract featured post (first starred post or first post overall)
  const featuredPost = useMemo(() => {
    return finalPosts.find(p => p.star) || finalPosts[0];
  }, [finalPosts]);

  return (
    <div className="relative pt-24 pb-20 min-h-screen bg-app-bg text-app-text">
      <div className="gradient-mesh opacity-80 absolute inset-0 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10 text-left">
        
        {/* Banner Title Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 p-8 rounded-3xl glass border border-app-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4F46E5]/15 text-[#3B82F6] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Counselor Newsroom
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white tracking-tight">
              Careers & Admissions <span className="gradient-text-primary">Blog</span>
            </h1>
            <p className="text-sm text-app-muted mt-2 max-w-xl">
              Stay ahead of JEE limits, scholarship releases, and admission timelines with our curated analytical reviews.
            </p>
          </div>
          
          {/* Search Trigger */}
          <div className="w-full md:max-w-xs flex items-center bg-app-card border border-app-border rounded-xl px-3 py-2.5 relative z-10">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-transparent border-none outline-none text-xs text-slate-900 placeholder-[#94A3B8] font-semibold pr-2"
            />
            <Search className="w-4 h-4 text-app-muted cursor-pointer" />
          </div>
        </div>

        {/* FEATURED BANNER (Only on catalog overview without active filters) */}
        {!activePost && !searchQuery && !selectedCategory && featuredPost && (
          <ScrollReveal>
            <div className="glass rounded-3xl border border-app-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12 shadow-2xl hover:border-app-border transition-all group">
              <div className="lg:col-span-7 h-64 lg:h-96 relative overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-550 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080B16] via-transparent to-transparent" />
              </div>
              
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between items-start text-left">
                <div className="flex flex-col gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF7A00]/10 text-[#FF7A00]">
                    Featured Article
                  </span>
                  
                  <h2 
                    onClick={() => setActivePost(featuredPost)}
                    className="font-display font-black text-xl sm:text-2xl text-slate-900 dark:text-white uppercase leading-tight hover:text-[#FF7A00] cursor-pointer transition-colors"
                  >
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-app-muted font-medium leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="w-full flex items-center justify-between border-t border-app-border pt-4 mt-6 text-[10px] text-app-muted font-bold uppercase tracking-wider">
                  <span className="text-slate-900 dark:text-white font-bold">By {featuredPost.author}</span>
                  <button 
                    onClick={() => setActivePost(featuredPost)}
                    className="text-[#FF7A00] font-black hover:underline cursor-pointer border-none bg-transparent"
                  >
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Feed or Details */}
          <main className="lg:col-span-8 flex flex-col gap-8 w-full">
            
            {activePost ? (
              /* DETAILS VIEW */
              <ScrollReveal>
                <div className="flex flex-col gap-6 text-left p-6 sm:p-8 glass rounded-3xl border border-app-border shadow-2xl">
                  
                  <button
                    onClick={() => setActivePost(null)}
                    className="flex items-center gap-2 text-xs font-black text-[#FF7A00] hover:text-[#FF7A00]/80 uppercase tracking-wider bg-transparent border-none cursor-pointer transition-all self-start"
                  >
                    <ArrowLeft className="w-4 h-4 stroke-[3]" />
                    Back to Articles Feed
                  </button>

                  <div className="flex flex-col gap-4 border-b border-app-border pb-4">
                    <div className="flex flex-wrap gap-2">
                      {activePost.categories.map((cat, idx) => (
                        <span 
                          key={idx} 
                          onClick={() => handleCategorySelect(cat)}
                          className="text-[9px] font-black text-[#FF7A00] hover:text-white uppercase tracking-wider bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-2.5 py-0.5 rounded-full cursor-pointer transition-colors"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-display font-black text-slate-900 dark:text-white uppercase leading-tight">
                      {activePost.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-app-muted font-black uppercase tracking-wider">
                      <span className="text-slate-900 dark:text-white font-bold">By {activePost.author}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {activePost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        5 Min Read
                      </span>
                      <button 
                        onClick={() => handleShare(activePost.title)}
                        className="flex items-center gap-1 hover:text-white cursor-pointer bg-transparent border-none text-app-muted"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </button>
                    </div>
                  </div>

                  {activePost.image && (
                    <div className="rounded-2xl overflow-hidden h-72 w-full bg-slate-900 border border-app-border">
                      <img 
                        src={activePost.image} 
                        alt={activePost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="text-xs sm:text-sm text-app-muted leading-relaxed flex flex-col gap-4 font-semibold">
                    <p className="font-extrabold text-slate-900 dark:text-white text-base leading-relaxed">
                      {activePost.excerpt}
                    </p>
                    <p>
                      {activePost.content}
                    </p>
                    <p>
                      To align with 2026 cutoffs, students must consistently review exam prep materials and secure direct counseling sessions early in the cycle.
                    </p>
                    
                    {/* Author Bio Card */}
                    <div className="flex gap-4 p-5 rounded-2xl bg-app-card border border-app-border text-xs text-app-muted items-center mt-6">
                      <div className="w-12 h-12 rounded-full bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] shrink-0">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white">About the Author: {activePost.author}</h4>
                        <p className="text-[11px] text-app-muted mt-0.5 leading-relaxed font-semibold">
                          Senior Admission counselor and career alignment lead specializing in B.Tech and MBA seat counseling.
                        </p>
                      </div>
                    </div>

                    {/* Admissions Newsletter widget */}
                    <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-[#4F46E5]/10 to-transparent border border-app-border flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-xl">
                      <div className="flex flex-col gap-1">
                        <h4 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wide">
                          Admissions Newsletter
                        </h4>
                        <p className="text-[10px] sm:text-xs text-app-muted leading-relaxed font-semibold">
                          Get cutoffs, eligibility notices, and deadline alerts sent to your inbox.
                        </p>
                      </div>
                      <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full sm:w-auto items-center shrink-0">
                        <input
                          type="email"
                          required
                          placeholder="Your email address"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          className="px-3.5 py-2.5 w-full sm:w-48 rounded-xl bg-app-card border border-app-border text-xs text-slate-900 placeholder-[#94A3B8] outline-none focus:border-[#FF7A00] font-semibold"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingNewsletter}
                          className="p-3 bg-[#FF7A00] hover:bg-[#D14B00] rounded-xl text-white cursor-pointer border-none shadow-lg shadow-[#FF7A00]/25 flex items-center justify-center shrink-0 disabled:opacity-50"
                        >
                          {isSubmittingNewsletter ? (
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          ) : (
                            <Send className="w-4 h-4" />
                          )}
                        </button>
                      </form>
                    </div>

                  </div>

                </div>
              </ScrollReveal>
            ) : (
              /* ARTICLES FEED CATALOG LIST */
              <div className="flex flex-col gap-6 w-full">
                {isLoading ? (
                  <div className="flex flex-col gap-6 w-full">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div key={idx} className="h-44 rounded-2xl border border-app-border bg-app-card/30 animate-pulse" />
                    ))}
                  </div>
                ) : paginatedPosts.length === 0 ? (
                  <div className="py-24 text-center glass border border-app-border rounded-2xl flex flex-col items-center justify-center">
                    <p className="text-app-muted text-sm font-extrabold mb-4">No articles found matching the search criteria.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setSearchQuery('');
                      }}
                      className="text-xs font-bold text-white bg-[#FF7A00] hover:bg-[#D14B00] px-5 py-3 rounded-xl border-none cursor-pointer transition-colors shadow-lg shadow-[#FF7A00]/25"
                    >
                      Clear Search Filters
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6 w-full">
                    {paginatedPosts.map((post) => (
                      <ScrollReveal key={post.id} delay={0} duration={0.4}>
                        <div className="glass p-5 rounded-2xl border border-app-border flex flex-col md:flex-row gap-6 text-left shadow-lg hover:border-app-border transition-colors">
                          
                          {post.image && (
                            <div 
                              onClick={() => setActivePost(post)}
                              className="w-full md:w-52 h-36 overflow-hidden rounded-xl shrink-0 bg-slate-900 border border-app-border cursor-pointer"
                            >
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          )}

                          <div className="flex-1 flex flex-col justify-between text-left font-medium">
                            <div className="flex flex-col gap-2">
                              
                              <div className="flex flex-wrap gap-x-2 gap-y-1">
                                {post.categories.map((cat: string, catIdx: number) => (
                                  <span
                                    key={catIdx}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCategorySelect(cat);
                                    }}
                                    className="text-[9px] font-black text-[#FF7A00] hover:text-white uppercase tracking-wider bg-[#FF7A00]/10 border border-[#FF7A00]/20 px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>

                              <h3 
                                onClick={() => setActivePost(post)}
                                className="font-display font-black text-base md:text-lg text-slate-900 dark:text-white uppercase leading-tight hover:text-[#FF7A00] transition-colors cursor-pointer"
                              >
                                {post.title}
                              </h3>

                              <p className="text-xs text-app-muted font-semibold leading-relaxed line-clamp-2">
                                {post.excerpt}
                              </p>
                            </div>

                            <div className="text-[9px] font-black text-app-muted/65 uppercase tracking-wider mt-4">
                              BY {post.author} • {post.date}
                            </div>

                          </div>
                          
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                )}

                {/* PAGINATION CONTROLS */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-start gap-1.5 mt-4 pt-6 border-t border-app-border">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-[#FF7A00] border-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/20'
                              : 'border-app-border bg-app-card text-app-muted hover:text-white hover:border-app-border'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </main>

          {/* RIGHT: Sidebar Widgets */}
          <aside className="lg:col-span-4 flex flex-col gap-8 text-left">
            
            {/* LATEST TIMELINES */}
            <div className="p-6 rounded-2xl glass border border-app-border flex flex-col gap-4 shadow-xl">
              <h3 className="font-display font-black text-base text-slate-900 dark:text-white uppercase tracking-wider border-b border-app-border pb-3">
                Latest Articles
              </h3>
              <div className="flex flex-col gap-3.5 text-xs font-semibold">
                {latestPostTitles.map((title, idx) => {
                  const matchedPost = finalPosts.find(p => p.title.toLowerCase().startsWith(title.toLowerCase().slice(0, 20)));
                  return (
                    <div key={idx} className="flex gap-2.5 leading-snug items-start">
                      <span className="text-[#FF7A00] font-black select-none mt-0.5">•</span>
                      <button
                        onClick={() => {
                          if (matchedPost) {
                            setActivePost(matchedPost);
                          } else {
                            addToast(`Loading "${title}"...`, 'success');
                          }
                        }}
                        className="text-left font-extrabold text-app-muted hover:text-white bg-transparent border-none cursor-pointer transition-colors"
                      >
                        {title}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOP CATEGORIES */}
            <div className="p-6 rounded-2xl glass border border-app-border flex flex-col gap-4 shadow-xl">
              <h3 className="font-display font-black text-base text-slate-900 dark:text-white uppercase tracking-wider border-b border-app-border pb-3">
                Top Categories
              </h3>
              <div className="flex flex-col gap-2.5 text-xs font-semibold">
                {blogCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`w-full py-1 text-left transition-colors cursor-pointer border-none bg-transparent flex items-center justify-start ${
                      selectedCategory === category
                        ? 'text-[#FF7A00] font-black'
                        : 'text-app-muted hover:text-white'
                    }`}
                  >
                    <span className="mr-2 text-[#FF7A00] font-black">&gt;</span>
                    <span>{category}</span>
                  </button>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default Blog;
