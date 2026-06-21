import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { useGlobalStore } from '../../store/useGlobalStore';

const popularSearchesData = [
  "Top MBA/PGDM Colleges in Pune",
  "Top MBA/PGDM Colleges in Bangalore",
  "Top MBA/PGDM Colleges in Indore",
  "Top MBA Colleges in Delhi-NCR",
  "Top MBA Colleges in Mumbai",
  "Top MBA Colleges in Bhopal",
  "Top MBA Colleges in Bhubaneswar",
  "Top MBA Colleges in Jaipur",
  "Top MBA Colleges in Coimbatore",
  "Top MBA Colleges in Lucknow",
  "Top MBA Colleges in Hyderabad",
  "Top MBA Colleges in Rajkot",
  "Top MBA Colleges in Guntur",
  "Top MBA Colleges in Chandigarh",
  "Top MBA Colleges in Surat",
  "Top MBA Colleges in Jabalpur",
  "Top MBA Colleges in Chennai",
  "Top MBA Colleges in Kolkata",
  "Top B-Tech Colleges in Pune",
  "Top B-Tech Colleges in Mumbai",
  "Top B-Tech Colleges in Bhopal",
  "Top B-Tech Colleges in Rajkot",
  "Top B-Tech Colleges in Indore",
  "Top B-Tech Colleges in Bhubaneswar",
  "Top B-Tech Colleges in Nagpur",
  "Top B-Tech Colleges in Bengaluru",
  "Top B-Tech Colleges in Delhi",
  "Top B-Tech Colleges in Hyderabad",
  "Top B-Tech Colleges in Thane",
  "Top B-Tech Colleges in Surat",
  "Top B-Tech Colleges in Chennai",
  "Top B-Tech Colleges in Kolkata",
  "Top B-Tech Colleges in Lucknow",
  "Top B-Tech Colleges in Chandigarh",
  "Top Law Colleges in Pune",
  "Top Law Colleges in Mumbai",
  "Top Law Colleges in Indore",
  "Top Law Colleges in Chennai",
  "Top Law Colleges in Hyderabad",
  "Top Law Colleges in Rajkot",
  "Top Law Colleges in Kolkata",
  "Top Law Colleges in Surat",
  "Top Law Colleges in Chandigarh",
  "Top Law Colleges in Lucknow",
  "Top Law Colleges in Bengaluru",
  "Top Design Colleges in Pune",
  "Top Design Colleges in Mumbai",
  "Top Design Colleges in Indore",
  "Top Design Colleges in Chennai",
  "Top Design Colleges in Rajkot",
  "Top Design Colleges in Kolkata",
  "Top Design Colleges in Surat",
  "Top Design Colleges in Chandigarh",
  "Top Design Colleges in Lucknow",
  "Top Design Colleges in Bengaluru"
];

const PopularSearches = () => {
  const navigate = useNavigate();
  const addToast = useGlobalStore().addToast;

  const handleSearchClick = (searchQuery: string) => {
    addToast(`Filtering catalog for "${searchQuery}"...`, 'info');
    
    let course = '';
    if (searchQuery.includes('MBA') || searchQuery.includes('Management')) {
      course = 'Management';
    } else if (searchQuery.includes('B-Tech') || searchQuery.includes('Engineering')) {
      course = 'Engineering';
    } else if (searchQuery.includes('Law')) {
      course = 'Law';
    } else if (searchQuery.includes('Design')) {
      course = 'Design';
    }

    let location = '';
    const cities = [
      'Pune', 'Bangalore', 'Indore', 'Delhi', 'Mumbai', 'Bhopal', 'Bhubaneswar',
      'Jaipur', 'Coimbatore', 'Lucknow', 'Hyderabad', 'Rajkot', 'Guntur',
      'Chandigarh', 'Surat', 'Jabalpur', 'Chennai', 'Kolkata', 'Bengaluru',
      'Thane', 'Nagpur'
    ];
    for (const city of cities) {
      if (searchQuery.toLowerCase().includes(city.toLowerCase())) {
        location = city;
        break;
      }
    }

    const params = new URLSearchParams();
    if (course) params.set('course', course);
    if (location) {
      if (location === 'Bengaluru' || location === 'Bangalore') {
        params.set('location', 'Bangalore');
      } else if (location === 'Delhi') {
        // Handle Delhi/Delhi-NCR
        params.set('location', 'Delhi');
      } else {
        params.set('location', location);
      }
    }
    
    // Fallback if no course or location match
    if (!course && !location) {
      params.set('search', searchQuery);
    }
    
    navigate(`/colleges?${params.toString()}`);
  };

  return (
    <div className="bg-slate-50/50 dark:bg-app-card border-t border-app-border py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-app-text tracking-tight mb-8 text-slate-850 dark:text-white">
          Popular <span className="text-[#F97316]">Searches</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-2.5 max-w-6xl mx-auto">
          {popularSearchesData.map((search, idx) => (
            <button
              key={idx}
              onClick={() => handleSearchClick(search)}
              className="text-xs text-slate-600 dark:text-slate-300 hover:text-white bg-white dark:bg-transparent hover:bg-[#F97316] dark:hover:bg-[#F97316] border border-slate-200 dark:border-app-border hover:border-transparent dark:hover:border-transparent px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:-translate-y-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-md hover:shadow-orange-500/10 active:scale-95"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Footer = () => {
  const addToast = useGlobalStore().addToast;

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    if (email) {
      addToast('Thank you for subscribing to our newsletter!', 'success');
      (e.target as HTMLFormElement).reset();
    }
  };

  const footerSections = [
    {
      title: "TOP COLLEGES",
      links: [
        { label: "Engineering", path: "/colleges?course=Engineering" },
        { label: "Law", path: "/colleges?course=Law" },
        { label: "Commerce", path: "/colleges?course=Commerce" },
        { label: "Management", path: "/colleges?course=Management" },
        { label: "Arts", path: "/colleges?course=Arts" },
        { label: "Computer", path: "/colleges?course=Computer" },
        { label: "Abroad Education", path: "/colleges" }
      ]
    },
    {
      title: "TOP EXAMS",
      links: [
        { label: "Management Exams", path: "/exams?stream=Management" },
        { label: "Medical Exams", path: "/exams?stream=Dental" },
        { label: "Pharmacy Exams", path: "/exams?search=Pharmacy" },
        { label: "Engineering Exams", path: "/exams?stream=Engineering" },
        { label: "Law Exams", path: "/exams?stream=Law" },
        { label: "Commerce Exam", path: "/exams?stream=Commerce" },
        { label: "Online Exam", path: "/exams?mode=Online" }
      ]
    },
    {
      title: "STUDENT HELPDESK 1",
      links: [
        { label: "Common Application", path: "/common-application" },
        { label: "Education Loan", path: "/education-loan" },
        { label: "Expert Guidance", path: "/contact" },
        { label: "Scholarships", path: "/scholarships" },
        { label: "Rank Predictor", path: "/college-predictor" },
        { label: "Re-Admission", path: "/re-admission" }
      ]
    },
    {
      title: "STUDENT HELPDESK 2",
      links: [
        { label: "Career Profiling", path: "/careers" },
        { label: "Compare College", path: "/compare" },
        { label: "College Predictor", path: "/college-predictor" }
      ]
    },
    {
      title: "LATEST UPDATES",
      links: [
        { label: "MBA admissions", path: "/colleges?course=Management" },
        { label: "Blog", path: "/blog" },
        { label: "Terms & Conditions", path: "/resources" },
        { label: "Events", path: "/events" },
        { label: "Privacy Policy", path: "/resources" },
        { label: "Refund Policy", path: "/resources" }
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Popular Searches tag cloud */}
      <PopularSearches />

      {/* Redesigned Footer Section */}
      <footer className="bg-slate-950 text-slate-200 border-t border-slate-800 relative overflow-hidden py-16 px-6">
        {/* Background Glows */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-primary/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-[#7C3AED]/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left pb-12 border-b border-slate-800">
            {/* Left Column: Brand & Contact Info */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-[#7C3AED] shadow-lg shadow-primary/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-extrabold tracking-wider font-display text-white uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  ARUNA-NAND EDTECH
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Empowering students through education guidance, college comparison, and streamlined admissions. Join thousands of students making smarter career decisions today.
              </p>

              {/* Newsletter Form */}
              <div className="flex flex-col gap-3 mt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Subscribe to our newsletter</h4>
                <p className="text-xs text-slate-400">Get the latest college admission updates and career guidance directly in your inbox.</p>
                <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email address"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-500"
                  />
                  <button type="submit" className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95 cursor-pointer">
                    Subscribe
                  </button>
                </form>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 mt-2">
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-accent hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-md"
                  aria-label="Facebook"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-accent hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-md"
                  aria-label="Twitter"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-accent hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-md"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 hover:border-accent hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 shadow-md"
                  aria-label="Instagram"
                >
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583 0.07-4.849 0.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            {/* Right Column: Links lists */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-8 w-full">
              {footerSections.map((section, idx) => (
                <div key={idx} className="flex flex-col gap-4">
                  <h3 className="text-xs font-bold tracking-wider text-white uppercase font-display border-b border-slate-800 pb-2">
                    {section.title}
                  </h3>
                  <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          to={link.path} 
                          className="hover:text-accent transition-colors duration-200"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details Row */}
          <div className="py-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800 text-xs text-slate-400">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-1">Our Campus Office</h5>
                <p className="leading-relaxed">
                  Jahanveer Complex, Infront of Anand Plaza,<br />
                  Singpur Road, Morar, Gwalior, MP - 474011
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-1">General Enquiries</h5>
                <a href="mailto:aryangwl19@gmail.com" className="hover:text-white transition-colors block">
                  aryangwl19@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-1">Call Helpline</h5>
                <a href="tel:+919399086225" className="hover:text-white transition-colors block font-semibold">
                  +91 9399086225
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-white mb-1">Working Hours</h5>
                <p className="leading-relaxed">
                  Mon - Sat: 9:00 AM - 6:00 PM<br />
                  Sunday Closed
                </p>
              </div>
            </div>
          </div>

          {/* Bottom copyright row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-500 text-center sm:text-left font-medium">
              &copy; {new Date().getFullYear()} Aruna-Nand EdTech Services. All rights reserved. Built for future learning.
            </p>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 border border-slate-800 hover:border-accent hover:bg-slate-800 text-accent transition-all duration-300 cursor-pointer shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
