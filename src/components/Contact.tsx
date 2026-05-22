import { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@krizaltech.com', href: 'mailto:info@krizaltech.com' },
  { icon: Phone, label: 'Phone', value: '+1 (800) KRIZAL-1', href: 'tel:+18005749251' },
  { icon: MapPin, label: 'Offices', value: 'India & United States', href: '#about' },
];

const services = ['Azure Cloud', 'Microsoft 365', 'Security & Compliance', 'SharePoint', 'Teams', 'Exchange', 'Managed Services', 'Other'];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_submissions').insert([form]);
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', company: '', service: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d14]" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-[#c41e3a]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#3d8b3d]/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c41e3a]/10 border border-[#c41e3a]/20 rounded-full text-sm text-[#c41e3a] font-medium mb-6">
            Let's Talk
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Start Your Cloud
            <span className="text-[#c41e3a]"> Journey</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Ready to transform your Microsoft environment? Our experts are here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className={`lg:col-span-2 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="space-y-5 mb-10">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#c41e3a]/30 hover:bg-[#c41e3a]/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#c41e3a]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c41e3a]/20 transition-colors">
                    <Icon size={18} className="text-[#c41e3a]" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-white font-medium text-sm">{value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-gradient-to-br from-[#c41e3a]/15 to-[#3d8b3d]/10 border border-white/10 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-3">Response Time</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                We respond to all inquiries within <span className="text-[#3d8b3d] font-semibold">24 business hours</span>. For urgent needs, our managed service clients get priority 24/7 support.
              </p>
            </div>
          </div>

          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-[#3d8b3d]/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-[#3d8b3d]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-gray-400">We'll get back to you within 24 business hours.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c41e3a]/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c41e3a]/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Company</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c41e3a]/50 focus:bg-white/8 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Service Interest</label>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c41e3a]/50 focus:bg-white/8 transition-all appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="">Select a service</option>
                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Tell us about your project or challenge..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#c41e3a]/50 focus:bg-white/8 transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                      <AlertCircle size={16} />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#c41e3a] hover:bg-[#a01830] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/40 hover:scale-[1.01]"
                  >
                    {status === 'loading' ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
