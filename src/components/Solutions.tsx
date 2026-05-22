import { useEffect, useRef, useState } from 'react';
import { Briefcase, Settings, CheckCircle } from 'lucide-react';

const solutions = [
  {
    icon: Briefcase,
    type: 'Project Based',
    headline: 'Deliver. Transform. Succeed.',
    description:
      'Fixed-scope engagements with defined deliverables and timelines. Ideal for cloud migrations, M365 rollouts, SharePoint portals, and security assessments.',
    features: [
      'Cloud migration assessments & execution',
      'M365 tenant setup & governance',
      'SharePoint intranet development',
      'Security baseline implementations',
      'Exchange Online migrations',
      'Teams deployment & training',
    ],
    cta: 'Start a Project',
    color: '#c41e3a',
    accent: 'border-l-[#c41e3a]',
    bg: 'from-[#c41e3a]/10 to-transparent',
    glow: 'shadow-[#c41e3a]/20',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    icon: Settings,
    type: 'Managed Services',
    headline: 'Monitor. Manage. Optimize.',
    description:
      'Ongoing managed service contracts ensuring your Microsoft environment stays secure, optimized, and always available — with dedicated support.',
    features: [
      '24/7 infrastructure monitoring',
      'Monthly Microsoft patching & updates',
      'Security incident response',
      'Compliance reporting & audits',
      'Proactive cost optimization',
      'Dedicated Customer Success Manager',
    ],
    cta: 'Get Managed Services',
    color: '#3d8b3d',
    accent: 'border-l-[#3d8b3d]',
    bg: 'from-[#3d8b3d]/10 to-transparent',
    glow: 'shadow-[#3d8b3d]/20',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export default function Solutions() {
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
    <section id="solutions" ref={ref} className="py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d0d14]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0078D4]/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#3d8b3d]/10 border border-[#3d8b3d]/20 rounded-full text-sm text-[#3d8b3d] font-medium mb-6">
            Engagement Models
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Choose Your
            <span className="text-[#3d8b3d]"> Engagement</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Whether you need a one-time transformation or ongoing expert management, we have the right model for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions.map((sol, i) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.type}
                className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br ${sol.bg} backdrop-blur-sm transition-all duration-700 hover:border-white/20 hover:shadow-2xl ${sol.glow} ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 200}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sol.image}
                    alt={sol.type}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0d0d14]" />
                  <div className="absolute inset-0 bg-[#0d0d14]/40" />
                  <div
                    className="absolute top-6 left-6 flex items-center gap-3 px-4 py-2 rounded-full text-white font-bold text-sm backdrop-blur-sm"
                    style={{ background: `${sol.color}CC` }}
                  >
                    <Icon size={16} />
                    {sol.type}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-3">{sol.headline}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6">{sol.description}</p>

                  <div className={`border-l-2 ${sol.accent} pl-4 mb-8`}>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {sol.features.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <CheckCircle size={14} className="mt-0.5 flex-shrink-0" style={{ color: sol.color }} />
                          <span className="text-sm text-gray-300">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                    style={{ background: sol.color, boxShadow: `0 4px 24px ${sol.color}40` }}
                  >
                    {sol.cta}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
