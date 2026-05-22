import { useEffect, useRef, useState } from 'react';
import { MapPin, Award, Users, TrendingUp } from 'lucide-react';

const locations = [
  {
    country: 'India',
    icon: '🇮🇳',
    description: 'Headquartered in India with a strong delivery center serving enterprises across the subcontinent.',
    highlight: 'Primary Delivery Hub',
    color: '#c41e3a',
  },
  {
    country: 'United States',
    icon: '🇺🇸',
    description: 'US presence enabling direct engagement with North American clients and multinational corporations.',
    highlight: 'North America Office',
    color: '#0078D4',
  },
];

const values = [
  { icon: Award, title: 'Certified Expertise', desc: 'Microsoft certified professionals across Azure, M365, and Security domains.' },
  { icon: Users, title: 'Client-First Culture', desc: 'Every engagement is built around your business outcomes, not just technology delivery.' },
  { icon: TrendingUp, title: 'Continuous Innovation', desc: 'We stay ahead of the Microsoft roadmap to bring you the latest capabilities.' },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c41e3a]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3d8b3d]/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c41e3a]/10 border border-[#c41e3a]/20 rounded-full text-sm text-[#c41e3a] font-medium mb-6">
              Who We Are
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Driving Digital
              <br />
              <span className="text-[#c41e3a]">Transformation</span>
              <br />
              <span className="text-gray-400 font-light">Across Continents</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Krizal Technologies is a specialized Microsoft cloud consultancy with deep roots in the Microsoft ecosystem. For over a decade, we've helped enterprises in India and the United States modernize their infrastructure, secure their digital assets, and maximize the value of their Microsoft investments.
            </p>
            <p className="text-gray-400 leading-relaxed mb-10">
              Our team of certified architects, engineers, and consultants brings hands-on experience across Azure, M365, SharePoint, Teams, Exchange, and the full Microsoft Security stack.
            </p>

            <div className="grid gap-4">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[#c41e3a]/10 border border-[#c41e3a]/20 flex items-center justify-center flex-shrink-0 group-hover:bg-[#c41e3a]/20 transition-colors">
                    <Icon size={18} className="text-[#c41e3a]" />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{title}</div>
                    <div className="text-gray-400 text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="space-y-6 mb-10">
              {locations.map((loc) => (
                <div
                  key={loc.country}
                  className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{loc.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-lg font-bold text-white">{loc.country}</h3>
                        <span
                          className="text-xs font-medium px-2.5 py-1 rounded-full"
                          style={{ background: `${loc.color}15`, color: loc.color, border: `1px solid ${loc.color}25` }}
                        >
                          {loc.highlight}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{loc.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 3D logo card */}
            <div
              className="relative bg-gradient-to-br from-[#c41e3a]/15 via-[#0d0d14] to-[#3d8b3d]/15 border border-white/10 rounded-3xl p-8 text-center overflow-hidden"
              style={{ transform: 'perspective(800px) rotateX(2deg)', transformStyle: 'preserve-3d' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <img src="/logo.jpg" alt="Krizal" className="w-24 h-24 object-contain mx-auto mb-4 rounded-2xl bg-white/10 p-2" />
              <div className="text-xl font-black text-white">Krizal Technologies</div>
              <div className="text-sm text-gray-400 mt-1">Microsoft Cloud Solutions Partner</div>
              <div className="mt-4 flex justify-center gap-3">
                {['Azure', 'M365', 'Security'].map((badge) => (
                  <span key={badge} className="text-xs px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
