import { useState, useEffect, useRef, useCallback } from 'react';
import { X, Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { breakingNews, allNews, trendingNews, type NewsItem } from '../data/news';
import { ScrollReveal } from '../components/animations/ScrollReveal';

export const News = () => {
  // States
  const [currentPage, setCurrentPage] = useState(1);
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);

  // Breaking News Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = breakingNews.length;
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Dynamic visible cards based on window size
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleSlides(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleSlides(2); // Tablet
      } else {
        setVisibleSlides(3); // Desktop
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto slide ticker every 10 seconds (10000ms)
  const maxSlideIndex = Math.max(0, totalSlides - visibleSlides);

  const stopAutoSlide = useCallback(() => {
    if (slideTimer.current) {
      clearInterval(slideTimer.current);
    }
  }, []);

  const startAutoSlide = useCallback(() => {
    stopAutoSlide();
    slideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    }, 10000);
  }, [maxSlideIndex, stopAutoSlide]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [visibleSlides, maxSlideIndex, startAutoSlide, stopAutoSlide]);

  const handleNextSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev >= maxSlideIndex ? 0 : prev + 1));
    startAutoSlide();
  };

  const handlePrevSlide = () => {
    stopAutoSlide();
    setCurrentSlide((prev) => (prev === 0 ? maxSlideIndex : prev - 1));
    startAutoSlide();
  };

  // Pagination for All News
  const itemsPerPage = 5;
  const totalPages = Math.ceil(allNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAllNews = allNews.slice(startIndex, startIndex + itemsPerPage);

  const handleSocialShare = (platform: string, title: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this news: ${title}`);
    let shareUrl = '';
    
    if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative pt-24 pb-20 min-h-screen bg-slate-50/30 dark:bg-app-bg">
      <div className="gradient-mesh opacity-30 pointer-events-none" />

      {/* 1. TOP BREAKING NEWS AUTO-SLIDER BAR (Exactly like screenshot) */}
      <section className="mx-auto max-w-7xl px-4 md:px-6 mb-8 mt-4 relative z-10">
        <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-3 flex flex-col md:flex-row items-center gap-3 shadow-md w-full">
          
          {/* Breaking News Burgundy Badge */}
          <div className="bg-[#9F1239] dark:bg-primary text-white text-xs font-black uppercase px-4 py-2.5 rounded-lg shrink-0 select-none tracking-widest flex items-center shadow-md animate-pulse">
            Breaking News
          </div>

          {/* Carousel Viewport Container */}
          <div 
            className="flex-1 w-full overflow-hidden relative"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            <div 
              className="flex transition-transform duration-700 ease-out gap-4"
              style={{
                width: `${(totalSlides * 100) / visibleSlides}%`,
                transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`
              }}
            >
              {breakingNews.map((bn) => (
                <div 
                  key={bn.id}
                  onClick={() => setActiveArticle(bn)}
                  className="flex bg-slate-50 dark:bg-app-card border border-slate-200 dark:border-app-border rounded-lg p-2.5 gap-3 items-center hover:bg-slate-100 dark:hover:bg-white/10 transition-all cursor-pointer select-none"
                  style={{ width: `calc(${100 / totalSlides}% - 12px)` }}
                >
                  <img 
                    src={bn.image} 
                    alt="breaking" 
                    className="w-16 h-14 rounded object-cover shrink-0" 
                  />
                  <div className="min-w-0 text-left">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase leading-none mb-1.5">
                      {bn.date}
                    </p>
                    <h4 className="text-[11px] font-black text-slate-800 dark:text-white leading-snug line-clamp-2 uppercase">
                      {bn.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Slide Arrows Overlay */}
            {maxSlideIndex > 0 && (
              <>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer border-none z-10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 cursor-pointer border-none z-10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

        </div>
      </section>

      {/* 2. MAIN LAYOUT GRID: Left (All News Feed) vs Right (Trending News Sidebar) */}
      <div className="mx-auto max-w-7xl px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: All News Feed Column */}
          <main className="lg:col-span-8 flex flex-col gap-6 w-full text-left">
            
            {/* Title Header */}
            <div className="border-b border-slate-200 dark:border-app-border pb-3">
              <h2 className="text-2xl font-display font-extrabold text-slate-800 dark:text-white uppercase tracking-wide">
                All News
              </h2>
            </div>

            {/* List Feed Cards */}
            <div className="flex flex-col gap-6 w-full">
              {paginatedAllNews.map((item) => (
                <ScrollReveal key={item.id} delay={0} duration={0.4}>
                  <div className="bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-6 relative group">
                    
                    {/* Left side: Square image */}
                    <div className="w-full md:w-56 h-40 rounded-lg overflow-hidden shrink-0 border border-slate-100 dark:border-app-border relative">
                      <img 
                        src={item.image} 
                        alt="all news" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>

                    {/* Right side: News contents */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex flex-col gap-2">
                        
                        {/* Red Category badge */}
                        {item.category && (
                          <span className="self-start text-[9px] font-black uppercase text-white bg-[#CC1F29] px-2.5 py-0.5 rounded shadow-sm tracking-wider">
                            {item.category}
                          </span>
                        )}

                        <h3 className="font-display font-extrabold text-base text-slate-850 dark:text-white leading-snug group-hover:text-[#F97316] transition-colors duration-300 uppercase">
                          {item.title}
                        </h3>

                        {/* Author & Timestamp row */}
                        <div className="flex items-center gap-3.5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-0.5">
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            {item.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.date}
                          </span>
                        </div>

                        <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed mt-2 line-clamp-2 font-medium">
                          {item.excerpt}
                          <button
                            onClick={() => setActiveArticle(item)}
                            className="text-[#F97316] hover:text-[#EA580C] font-black underline ml-1 cursor-pointer bg-transparent border-none p-0 text-xs inline-block"
                          >
                            Read More...
                          </button>
                        </p>
                      </div>

                      {/* Bottom row: Sharing cluster */}
                      <div className="flex items-center gap-3 border-t border-slate-100 dark:border-app-border pt-3.5 mt-4 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        <span className="select-none">Share News:</span>
                        
                        {/* Circular Share Anchors */}
                        <button
                          onClick={() => handleSocialShare('facebook', item.title)}
                          className="w-7 h-7 rounded-full bg-slate-50 hover:bg-primary hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                        </button>
                        <button
                          onClick={() => handleSocialShare('twitter', item.title)}
                          className="w-7 h-7 rounded-full bg-slate-50 hover:bg-secondary hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                        </button>
                        <button
                          onClick={() => handleSocialShare('whatsapp', item.title)}
                          className="w-7 h-7 rounded-full bg-slate-50 hover:bg-emerald-500 hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.592 2.052 14.113.996 11.954.996c-5.441 0-9.863 4.374-9.868 9.803-.001 1.77.476 3.5 1.378 5.061l-.97 3.543 3.563-.959zm12.724-6.262c-.224-.112-1.32-.652-1.524-.727-.205-.075-.354-.112-.502.112-.149.224-.577.727-.708.877-.13.15-.26.168-.485.056-.224-.112-.947-.349-1.802-1.113-.667-.595-1.117-1.33-1.248-1.554-.13-.224-.014-.346.098-.458.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374.075-.15.037-.281-.018-.393-.056-.112-.502-1.21-.688-1.66-.182-.439-.366-.379-.502-.385l-.428-.008c-.149 0-.393.056-.597.28-.205.225-.783.766-.783 1.87 0 1.103.8 2.167.912 2.318.112.15 1.574 2.41 3.815 3.38.533.23 1.01.38 1.356.49.537.17 1.025.147 1.411.089.43-.064 1.32-.538 1.506-1.059.186-.52.186-.966.131-1.059-.056-.094-.205-.15-.43-.262z"/></svg>
                        </button>
                      </div>

                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-4 border-t border-slate-200 dark:border-app-border pt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((c) => Math.max(c - 1, 1))}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-app-card border border-slate-200 dark:border-app-border hover:bg-slate-50 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase select-none">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((c) => Math.min(c + 1, totalPages))}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-app-card border border-slate-200 dark:border-app-border hover:bg-slate-50 dark:hover:bg-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}

          </main>

          {/* RIGHT: Trending News Sidebar Column */}
          <aside className="lg:col-span-4 flex flex-col gap-6 text-left sticky top-24">
            
            {/* Header with thin orange divider underneath */}
            <div className="pb-3 text-left">
              <h3 className="text-xl font-display font-extrabold text-slate-800 dark:text-white uppercase tracking-wider">
                Trending News
              </h3>
              <div className="w-full h-[2.5px] bg-[#F97316] mt-2 rounded" />
            </div>

            {/* Trending Items List */}
            <div className="flex flex-col gap-4 bg-white dark:bg-app-card border border-slate-200 dark:border-app-border rounded-xl p-4 shadow-md">
              {trendingNews.map((tn) => (
                <button
                  key={tn.id}
                  onClick={() => setActiveArticle(tn)}
                  className="flex p-3 rounded-lg bg-slate-50 dark:bg-app-card hover:bg-slate-100 dark:hover:bg-white/10 text-left border border-transparent transition-all w-full gap-3 cursor-pointer items-start"
                >
                  <img 
                    src={tn.image} 
                    alt="trending" 
                    className="w-16 h-12 rounded object-cover shrink-0" 
                  />
                  
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <h4 className="font-display font-extrabold text-[11px] text-slate-800 dark:text-white leading-snug line-clamp-2 uppercase">
                      {tn.title}
                    </h4>
                    <div className="flex items-center justify-between w-full mt-1.5 text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                      <span>{tn.date.split(' ')[0]}</span>
                      <span className="text-[#F97316] font-black underline">Read more..</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </aside>

        </div>
      </div>

      {/* 3. DETAILED NEWS ARTICLE MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
          <div
            onClick={() => setActiveArticle(null)}
            className="fixed inset-0 bg-app-bg/70 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-bg p-6 md:p-8 overflow-hidden shadow-2xl z-10 max-h-[85vh] overflow-y-auto text-left">
            
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-5 border-b border-slate-100 dark:border-app-border pb-4">
              <div>
                {activeArticle.category && (
                  <span className="text-[9px] px-2.5 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                )}
                <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white mt-2.5 uppercase leading-tight">
                  {activeArticle.title}
                </h3>
                <div className="flex items-center gap-4 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    By {activeArticle.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeArticle.date}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-650 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-app-card border border-transparent transition-all cursor-pointer"
              >
                <X className="w-5.5 h-5.5" />
              </button>
            </div>

            {/* Cover image */}
            <div className="w-full h-64 rounded-xl overflow-hidden mb-6 border border-slate-200 dark:border-app-border">
              <img 
                src={activeArticle.image} 
                alt="article cover" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Article content */}
            <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex flex-col gap-4">
              <p className="font-bold text-slate-800 dark:text-slate-200 italic bg-slate-50 dark:bg-app-card p-4 rounded-xl border border-slate-150 dark:border-app-border">
                {activeArticle.excerpt}
              </p>
              <p className="px-1 text-slate-700 dark:text-slate-300">
                {activeArticle.content}
              </p>
            </div>

            {/* Bottom share action & close button */}
            <div className="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-app-border pt-4">
              
              {/* Share links */}
              <div className="flex items-center gap-2.5 text-slate-400 dark:text-slate-500 text-[10px]">
                <span className="font-black select-none">Share:</span>
                <button
                  onClick={() => handleSocialShare('facebook', activeArticle.title)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-primary hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                </button>
                <button
                  onClick={() => handleSocialShare('twitter', activeArticle.title)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-secondary hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </button>
                <button
                  onClick={() => handleSocialShare('whatsapp', activeArticle.title)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-emerald-500 hover:text-white dark:bg-app-card text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all border border-slate-200 dark:border-app-border cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.592 2.052 14.113.996 11.954.996c-5.441 0-9.863 4.374-9.868 9.803-.001 1.77.476 3.5 1.378 5.061l-.97 3.543 3.563-.959zm12.724-6.262c-.224-.112-1.32-.652-1.524-.727-.205-.075-.354-.112-.502.112-.149.224-.577.727-.708.877-.13.15-.26.168-.485.056-.224-.112-.947-.349-1.802-1.113-.667-.595-1.117-1.33-1.248-1.554-.13-.224-.014-.346.098-.458.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374.075-.15.037-.281-.018-.393-.056-.112-.502-1.21-.688-1.66-.182-.439-.366-.379-.502-.385l-.428-.008c-.149 0-.393.056-.597.28-.205.225-.783.766-.783 1.87 0 1.103.8 2.167.912 2.318.112.15 1.574 2.41 3.815 3.38.533.23 1.01.38 1.356.49.537.17 1.025.147 1.411.089.43-.064 1.32-.538 1.506-1.059.186-.52.186-.966.131-1.059-.056-.094-.205-.15-.43-.262z"/></svg>
                </button>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#F97316] hover:bg-[#EA580C] rounded-xl transition-all border-none cursor-pointer"
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

export default News;
