import { useState, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Star,
  Building,
  TrendingUp,
  BookOpen,
  DollarSign,
  Layers,
  CheckCircle2,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { colleges } from '../data/colleges';
import { useCompareStore } from '../store/useCompareStore';
import { useGlobalStore } from '../store/useGlobalStore';

export const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const college = colleges.find((c) => c.id === id);

  const { addToCompare, removeFromCompare, isComparing } = useCompareStore();
  const addToast = useGlobalStore().addToast;

  const [activeTab, setActiveTab] = useState('about');
  
  // Custom review inputs
  const [revName, setRevName] = useState('');
  const [revRating, setRevRating] = useState(5);
  const [revText, setRevText] = useState('');
  
  // Application form inputs
  const [applyName, setApplyName] = useState('');
  const [applyEmail, setApplyEmail] = useState('');
  const [applyCourse, setApplyCourse] = useState('');

  if (!college) {
    return (
      <div className="pt-36 pb-20 text-center">
        <h2 className="text-2xl font-bold text-app-text">College Not Found</h2>
        <p className="text-app-muted mt-2">The requested college ID does not exist in our catalog.</p>
        <Link to="/colleges" className="mt-4 inline-block text-primary hover:underline">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const comparing = isComparing(college.id);

  const handleCompareClick = () => {
    if (comparing) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college.id);
    }
  };

  const handleApplySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!applyName || !applyEmail || !applyCourse) {
      addToast('Please complete all application form fields', 'warning');
      return;
    }
    addToast(`Congratulations! Applied to ${college.name} for ${applyCourse}. Application ID: ${Math.floor(100000 + Math.random() * 900000)}`, 'success');
    setApplyName('');
    setApplyEmail('');
    setApplyCourse('');
  };

  const handleReviewSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!revName || !revText) {
      addToast('Please input both your name and review details', 'warning');
      return;
    }
    college.reviews.unshift({
      name: revName,
      rating: revRating,
      text: revText,
      date: new Date().toISOString().split('T')[0],
    });
    addToast('Review submitted successfully!', 'success');
    setRevName('');
    setRevText('');
  };

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'courses', label: 'Courses & Fees' },
    { id: 'placements', label: 'Placements' },
    { id: 'scholarships', label: 'Scholarships' },
    { id: 'hostels', label: 'Hostel' },
    { id: 'reviews', label: 'Reviews & Gallery' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="relative pt-24 pb-20">
      <div className="gradient-mesh" />

      {/* Hero Banner Header */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover brightness-[0.55]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-app-bg via-transparent to-transparent" />
      </div>

      {/* Main Info Frame */}
      <div className="mx-auto max-w-7xl px-6 relative -mt-20 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: main Details Panel */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* College Title Header */}
            <div className="flex flex-col gap-4 text-left">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs px-2.5 py-0.5 rounded bg-primary text-white font-bold uppercase tracking-wider">
                  {college.category}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-app-border text-app-muted font-semibold">
                  {college.ranking}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-app-text leading-tight">
                {college.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-app-muted">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  {college.location}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-warning fill-warning" />
                  <b className="text-app-text">{college.rating}</b> ({college.reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="flex items-center gap-1 border-b border-app-border/40 overflow-x-auto pb-0.5 no-scrollbar scroll-smooth">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all focus:outline-none ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-app-muted hover:text-app-text'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Rendering Content */}
            <div className="glass p-6 rounded-2xl border-app-border text-left">
              
              {/* TAB: ABOUT */}
              {activeTab === 'about' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-app-text mb-2 flex items-center gap-2">
                      <Building className="w-5 h-5 text-primary" />
                      About The Institution
                    </h3>
                    <p className="text-xs sm:text-sm text-app-muted leading-relaxed">{college.about}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-app-text mb-3 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      Infrastructure & Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {college.infrastructure.map((inf, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-app-border/40 text-xs text-app-muted font-medium"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {inf}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: COURSES */}
              {activeTab === 'courses' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-app-text mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    Courses Offered & Seats
                  </h3>
                  <div className="flex flex-col gap-3">
                    {college.courses.map((course, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-app-border gap-3 text-sm"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-app-text">{course.name}</span>
                          <span className="text-xs text-app-muted mt-0.5">Available Seats: {course.seats}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col sm:text-right">
                            <span className="text-xs text-app-muted uppercase font-bold">Annual Tuition</span>
                            <span className="font-bold text-primary">{course.fees}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PLACEMENTS */}
              {activeTab === 'placements' && (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-success/5 border border-success/20">
                    <div>
                      <h4 className="font-bold text-app-text">Placement Overview</h4>
                      <p className="text-xs text-app-muted mt-0.5">Active connections with leading multinationals globally.</p>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className="text-xs text-app-muted font-bold">Average Placement</span>
                      <span className="text-lg font-bold text-success flex items-center gap-1">
                        <TrendingUp className="w-5 h-5" />
                        {college.placements}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-app-text mb-3">Top Recruiting Companies</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {college.placementDetails.map((det, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white/[0.02] border border-app-border text-center flex flex-col gap-1.5"
                        >
                          <span className="text-xs text-app-muted font-bold">{det.company}</span>
                          <span className="text-sm font-bold text-app-text">{det.package}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SCHOLARSHIPS */}
              {activeTab === 'scholarships' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-app-text mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Internal Scholarships & Fee Aids
                  </h3>
                  <div className="flex flex-col gap-3">
                    {college.scholarships.map((sch, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-app-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
                      >
                        <div className="flex flex-col">
                          <span className="font-semibold text-app-text">{sch.name}</span>
                          <span className="text-xs text-app-muted mt-1">Eligibility: {sch.criteria}</span>
                        </div>
                        <div className="flex flex-col sm:items-end">
                          <span className="text-xs text-app-muted uppercase font-bold">Waiver / Award</span>
                          <span className="font-bold text-primary">{sch.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: HOSTELS */}
              {activeTab === 'hostels' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-app-text mb-2 flex items-center gap-2">
                    <Building className="w-5 h-5 text-primary" />
                    Hostel & Residential Facilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {college.hostels.map((hos, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-app-border flex flex-col gap-3 text-sm"
                      >
                        <div>
                          <h4 className="font-semibold text-app-text">{hos.type}</h4>
                          <span className="text-xs text-app-muted mt-1 inline-block">Room Sharing: {hos.sharing}</span>
                        </div>
                        <div className="border-t border-app-border/40 pt-2 flex items-center justify-between">
                          <span className="text-xs text-app-muted font-bold">Fees / Charges</span>
                          <span className="font-bold text-primary">{hos.fees}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: REVIEWS & GALLERY */}
              {activeTab === 'reviews' && (
                <div className="flex flex-col gap-8">
                  {/* Gallery Grid */}
                  <div>
                    <h3 className="text-base font-bold text-app-text mb-3">Campus Gallery</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {college.gallery.map((url, idx) => (
                        <div key={idx} className="h-28 rounded-xl overflow-hidden border border-app-border">
                          <img
                            src={url}
                            alt="campus"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviews lists */}
                  <div className="border-t border-app-border/40 pt-6">
                    <h3 className="text-base font-bold text-app-text mb-4">Student Reviews</h3>
                    <div className="flex flex-col gap-4">
                      {college.reviews.map((rev, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-app-border flex flex-col gap-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-app-text">{rev.name}</span>
                            <span className="text-app-muted">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? 'text-warning fill-warning' : 'text-app-border'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-app-muted leading-relaxed">{rev.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add Review form */}
                  <form onSubmit={handleReviewSubmit} className="border-t border-app-border/40 pt-6 flex flex-col gap-4">
                    <h3 className="text-base font-bold text-app-text">Share Your Review</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-app-muted uppercase">Your Name</label>
                        <input
                          type="text"
                          required
                          value={revName}
                          onChange={(e) => setRevName(e.target.value)}
                          className="px-3.5 py-2 rounded-xl bg-white/5 border border-app-border text-xs text-app-text outline-none focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold text-app-muted uppercase">Rating</label>
                        <select
                          value={revRating}
                          onChange={(e) => setRevRating(Number(e.target.value))}
                          className="px-3.5 py-2 rounded-xl bg-white/5 border border-app-border text-xs text-app-text outline-none focus:border-primary"
                        >
                          <option value={5}>5 Stars (Excellent)</option>
                          <option value={4}>4 Stars (Good)</option>
                          <option value={3}>3 Stars (Average)</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-app-muted uppercase">Review Details</label>
                      <textarea
                        required
                        rows={3}
                        value={revText}
                        onChange={(e) => setRevText(e.target.value)}
                        className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-app-border text-xs text-app-text outline-none focus:border-primary resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2.5 px-5 self-start rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all"
                    >
                      Post Review
                    </button>
                  </form>
                </div>
              )}

              {/* TAB: FAQ */}
              {activeTab === 'faq' && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-bold text-app-text mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary" />
                    Frequently Asked Questions
                  </h3>
                  <div className="flex flex-col gap-3">
                    {college.faq.map((fq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-white/[0.02] border border-app-border flex flex-col gap-1.5"
                      >
                        <span className="font-semibold text-sm text-app-text">{fq.q}</span>
                        <p className="text-xs text-app-muted leading-relaxed">{fq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* RIGHT: sticky sidebar Apply Form */}
          <div className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-24">
            {/* Quick Actions Panel */}
            <div className="p-5 rounded-2xl glass border-app-border flex flex-col gap-4 text-left">
              <h3 className="font-display font-bold text-lg text-app-text">Admission Actions</h3>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={handleCompareClick}
                  className={`py-2.5 rounded-xl border font-bold transition-all flex items-center justify-center gap-1.5 ${
                    comparing
                      ? 'bg-accent/15 border-accent/30 text-accent'
                      : 'border-app-border hover:bg-white/5 text-app-muted hover:text-app-text'
                  }`}
                >
                  {comparing ? <CheckCircle2 className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                  {comparing ? 'Shortlisted' : 'Compare'}
                </button>
                
                <button
                  onClick={() => addToast('Shortlisted to bookmarks list!', 'success')}
                  className="py-2.5 rounded-xl border border-app-border hover:bg-white/5 text-app-muted hover:text-app-text font-bold transition-all flex items-center justify-center gap-1"
                >
                  <Heart className="w-4 h-4" />
                  Bookmark
                </button>
              </div>
            </div>

            {/* Live Application Form Widget */}
            <div className="p-5 rounded-2xl glass border-app-border flex flex-col gap-4 text-left">
              <div>
                <h3 className="font-display font-bold text-lg text-app-text">Apply For Seats</h3>
                <p className="text-[11px] text-app-muted mt-0.5">Submit details to request eligibility counselor callback.</p>
              </div>

              <form onSubmit={handleApplySubmit} className="flex flex-col gap-3 text-xs">
                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Student Name</label>
                  <input
                    type="text"
                    required
                    value={applyName}
                    onChange={(e) => setApplyName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={applyEmail}
                    onChange={(e) => setApplyEmail(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                    placeholder="email@address.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-bold text-app-muted uppercase">Target Course</label>
                  <select
                    required
                    value={applyCourse}
                    onChange={(e) => setApplyCourse(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                  >
                    <option value="">Choose Course</option>
                    {college.courses.map((crs, i) => (
                      <option key={i} value={crs.name}>
                        {crs.name.split(' in ')[1] || crs.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Apply trigger for mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 p-4 bg-app-bg/85 backdrop-blur-md border-t border-app-border flex lg:hidden items-center justify-between gap-4">
        <div className="text-left">
          <p className="text-[10px] text-app-muted font-semibold uppercase">Annual Fees</p>
          <p className="text-sm font-bold text-primary">{college.fees.split(' ')[0]}</p>
        </div>
        <button
          onClick={() => {
            const form = document.querySelector('form');
            form?.scrollIntoView({ behavior: 'smooth' });
            addToast('Complete application details in the sidebar form!', 'info');
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};
export default CollegeDetails;
