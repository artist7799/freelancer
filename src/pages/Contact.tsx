import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Compass } from 'lucide-react';
import { useGlobalStore } from '../store/useGlobalStore';

export const Contact = () => {
  const addToast = useGlobalStore().addToast;

  // States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !msg) {
      addToast('Please complete all form parameters', 'warning');
      return;
    }

    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      addToast(`Thank you, ${name}! Your callback request has been logged. Support ID: ${Math.floor(100000 + Math.random() * 900000)}`, 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMsg('');
    }, 1200);
  };

  return (
    <div className="relative pt-28 pb-20 min-h-screen text-left">
      <div className="gradient-mesh" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* Title */}
        <div className="mb-10 flex flex-col gap-2">
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-app-text tracking-tight">
            Talk to our Advisors
          </h1>
          <p className="text-sm text-app-muted max-w-md">
            Need guidance on seat cutoffs or application procedures? Drop us a message, and our counselors will contact you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Contact details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Info lists */}
            <div className="p-6 rounded-2xl glass border-app-border flex flex-col gap-5">
              <h3 className="font-display font-bold text-lg text-app-text">Corporate Office</h3>
              
              <div className="flex flex-col gap-4 text-xs text-app-muted">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-app-border text-primary">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-app-text">Office Address</h4>
                    <p className="mt-1 leading-normal">
                      Aruna-Nand EdTech Services Towers, Sector 4, Outer Ring Road, Bangalore, Karnataka - 560103
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-app-border/40 pt-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-app-border text-secondary">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-app-text">Advisor helpline</h4>
                    <p className="mt-1 font-semibold text-app-text">+91 80 4390 1200 / 1201</p>
                    <p className="text-[10px] mt-0.5">Mon to Sat, 9:00 AM to 6:00 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-app-border/40 pt-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-app-border text-accent">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-app-text">Email Admissions desk</h4>
                    <p className="mt-1 font-semibold text-app-text">admissions@arunanandedtech.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Map Placeholder */}
            <div className="h-64 rounded-2xl border border-app-border bg-[#0B1020] relative overflow-hidden shadow-lg flex items-center justify-center p-4">
              {/* Premium dark coordinate styling */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-primary/10 rounded-full blur-2xl animate-pulse" />
              
              <div className="relative flex flex-col items-center gap-2.5 text-center max-w-xs z-10 select-none">
                <Compass className="w-8 h-8 text-primary animate-spin-slow" />
                <h4 className="font-bold text-sm text-app-text">Map Navigation Coordinates</h4>
                <p className="text-[10px] text-app-muted leading-relaxed">
                  Latitude: 12.9716° N <br /> Longitude: 77.5946° E
                </p>
                <span className="text-[9px] px-2 py-0.5 rounded bg-primary/20 border border-primary/30 text-primary font-bold">
                  Locate office directions
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: submit form */}
          <div className="lg:col-span-7 w-full p-6 rounded-2xl glass border-app-border">
            <h3 className="font-display font-bold text-lg text-app-text mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send Admissions Enquiry
            </h3>
            <p className="text-xs text-app-muted mb-6 leading-relaxed">
              Complete the parameters form to configure callback queues.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-app-muted uppercase">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Sameer Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3.5 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="font-bold text-app-muted uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="sameer@address.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3.5 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-bold text-app-muted uppercase">Mobile Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="px-3.5 py-3 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary"
                />
              </div>

              <div className="flex flex-col gap-1.5 text-left">
                <label className="font-bold text-app-muted uppercase">Admissions message / requirements</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the courses, budget ranges or colleges you are shortlisting..."
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  className="px-3.5 py-3.5 rounded-xl bg-white/5 border border-app-border text-app-text outline-none focus:border-primary resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit callback Request
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Contact;
