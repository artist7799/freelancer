import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGlobalStore } from '../store/useGlobalStore';

export const Contact = () => {
  const addToast = useGlobalStore().addToast;

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation States
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      tempErrors.name = 'Full name is required';
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    const phoneRegex = /^\+?[0-9\s-]{10,14}$/;
    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
      tempErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!subject.trim()) {
      tempErrors.subject = 'Subject is required';
    } else if (subject.trim().length < 4) {
      tempErrors.subject = 'Subject must be at least 4 characters';
    }

    if (!message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSuccess(false);

    if (!validateForm()) {
      addToast('Please fix validation errors before submitting.', 'error');
      return;
    }

    setLoading(true);

    // Simulate submission request
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      addToast(`Thank you, ${name}! Your admissions enquiry has been logged.`, 'success');
      
      // Reset Form
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
      setErrors({});
    }, 1500);
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left overflow-hidden bg-slate-50/30 dark:bg-app-bg text-app-text">
      {/* Background aesthetics */}
      <div className="gradient-mesh opacity-70 absolute inset-0 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#4F46E5]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#F97316]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* ─── HERO HEADER ─── */}
        <motion.div 
          className="mb-12 flex flex-col gap-3.5 max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#F97316]/10 text-[#F97316] self-start uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Admissions Desk
          </span>
          <h1 className="text-3xl md:text-5xl font-display font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Aruna-Nand EdTech Services
          </h1>
          <p className="text-sm md:text-base font-semibold text-slate-500 dark:text-app-muted leading-relaxed">
            Empowering Students Through Education, Guidance & Career Success
          </p>
        </motion.div>

        {/* ─── QUICK CONTACT CARDS ─── */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1: Visit Us */}
          <motion.div 
            variants={itemVariants}
            className="p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-[#F97316]/30 dark:hover:border-[#F97316]/30 transition-all duration-300 group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316] shrink-0 group-hover:scale-110 transition-transform duration-300">
              <MapPin className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wide">Visit Us</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 font-semibold leading-relaxed">
                Jahanveer Complex, Morar, Gwalior
              </p>
            </div>
          </motion.div>

          {/* Card 2: Email Us */}
          <motion.a 
            href="mailto:aryangwl19@gmail.com"
            variants={itemVariants}
            className="p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-[#F97316]/30 dark:hover:border-[#F97316]/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wide">Email Us</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 font-semibold leading-relaxed truncate">
                aryangwl19@gmail.com
              </p>
            </div>
          </motion.a>

          {/* Card 3: Call Us */}
          <motion.a 
            href="tel:+919399086225"
            variants={itemVariants}
            className="p-6 rounded-2xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex items-start gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg hover:border-[#F97316]/30 dark:hover:border-[#F97316]/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-display font-black text-sm text-slate-900 dark:text-white uppercase tracking-wide">Call Us</h3>
              <p className="text-xs text-slate-500 dark:text-slate-450 mt-1 font-semibold leading-relaxed">
                +91 9399086225
              </p>
            </div>
          </motion.a>
        </motion.div>

        {/* ─── MAIN CONTENT: Details (Map) & Form ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Detailed Info + Google Maps */}
          <motion.div 
            className="lg:col-span-5 flex flex-col gap-6 w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Info details */}
            <div className="p-6 rounded-3xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border flex flex-col gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
              <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-wide border-b border-slate-100 dark:border-app-border pb-3">
                Corporate Headquarters
              </h3>
              
              <div className="flex flex-col gap-5 text-xs font-semibold text-slate-500 dark:text-app-muted">
                {/* Office address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-app-bg border border-slate-150 dark:border-app-border text-[#F97316] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wide">Office Address</h4>
                    <p className="mt-1 leading-relaxed">
                      Jahanveer Complex,<br />
                      Infront of Anand Plaza,<br />
                      Singpur Road, Morar,<br />
                      Gwalior, Madhya Pradesh - 474011
                    </p>
                  </div>
                </div>

                {/* Email address */}
                <div className="flex items-start gap-3.5 border-t border-slate-100 dark:border-app-border/40 pt-5">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-app-bg border border-slate-150 dark:border-app-border text-purple-500 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wide">Email Admissions</h4>
                    <a href="mailto:aryangwl19@gmail.com" className="mt-1 block font-bold text-slate-700 dark:text-white hover:text-[#F97316] transition-colors leading-normal">
                      aryangwl19@gmail.com
                    </a>
                  </div>
                </div>

                {/* Helpline */}
                <div className="flex items-start gap-3.5 border-t border-slate-100 dark:border-app-border/40 pt-5">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-app-bg border border-slate-150 dark:border-app-border text-emerald-500 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wide">Contact Number</h4>
                    <a href="tel:+919399086225" className="mt-1 block font-bold text-slate-700 dark:text-white hover:text-[#F97316] transition-colors leading-normal">
                      +91 9399086225
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5 border-t border-slate-100 dark:border-app-border/40 pt-5">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-app-bg border border-slate-150 dark:border-app-border text-blue-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-wide">Business Hours</h4>
                    <p className="mt-1 leading-normal font-bold text-slate-700 dark:text-white">
                      Monday - Saturday
                    </p>
                    <p className="text-[10px] mt-0.5 text-slate-400">9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl border border-slate-200 dark:border-app-border bg-white dark:bg-app-card p-2 shadow-lg overflow-hidden relative group">
              <iframe
                title="Google Map location of Jahanveer Complex Morar Gwalior"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.5298064971207!2d78.2238472!3d26.2119934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c1220a2ecdf3%3A0xe54d8a572a1cf5!2sJahanveer%20Complex%2C%20Singpur%20Road%2C%20Morar%2C%20Gwalior%2C%20Madhya%20Pradesh%20474011!5e0!3m2!1sen!2sin!4v1718872000000!5m2!1sen!2sin"
                className="w-full h-72 border-0 rounded-2xl grayscale dark:grayscale-60 group-hover:grayscale-0 transition-all duration-500 shadow-md"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div 
            className="lg:col-span-7 w-full p-6 md:p-8 rounded-3xl bg-white dark:bg-app-card border border-slate-200 dark:border-app-border shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-wide mb-2 flex items-center gap-2">
              <MessageSquare className="w-5.5 h-5.5 text-[#F97316]" />
              Send Admissions Enquiry
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-semibold leading-relaxed">
              Complete the parameters form to configure callback queues.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-semibold">
              
              {/* Name field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-black text-slate-450 dark:text-app-muted uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  placeholder="Rahul Gwalior"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-bg border text-slate-900 dark:text-white outline-none transition-colors duration-200 focus:border-[#F97316] ${
                    errors.name ? 'border-red-500' : 'border-slate-200 dark:border-app-border'
                  }`}
                />
                {errors.name && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email & Phone fields in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-black text-slate-450 dark:text-app-muted uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    placeholder="rahul@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-bg border text-slate-900 dark:text-white outline-none transition-colors duration-200 focus:border-[#F97316] ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-app-border'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-black text-slate-450 dark:text-app-muted uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-bg border text-slate-900 dark:text-white outline-none transition-colors duration-200 focus:border-[#F97316] ${
                      errors.phone ? 'border-red-500' : 'border-slate-200 dark:border-app-border'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-black text-slate-450 dark:text-app-muted uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  placeholder="Admission Enquiry for MBA 2026"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={`px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-bg border text-slate-900 dark:text-white outline-none transition-colors duration-200 focus:border-[#F97316] ${
                    errors.subject ? 'border-red-500' : 'border-slate-200 dark:border-app-border'
                  }`}
                />
                {errors.subject && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message field */}
              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-black text-slate-450 dark:text-app-muted uppercase tracking-wider">Admissions Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the courses, budget ranges or colleges you are shortlisting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-app-bg border text-slate-900 dark:text-white outline-none focus:border-[#F97316] resize-none transition-colors duration-200 ${
                    errors.message ? 'border-red-500' : 'border-slate-200 dark:border-app-border'
                  }`}
                />
                {errors.message && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Success message box */}
              {isSuccess && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span className="font-bold">Callback request submitted successfully! We will contact you soon.</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer border-none"
              >
                {loading ? (
                  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Submit callback Request
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
