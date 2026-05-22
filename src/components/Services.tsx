import { useEffect, useRef, useState } from 'react';
import { Cloud, Shield, Mail, Users, Share2, Settings, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: Cloud,
    title: 'Azure Cloud',
    description: 'End-to-end Azure architecture, migration, and optimization. From IaaS to PaaS and serverless workloads.',
    tags: ['Migration', 'Architecture', 'Cost Optimization'],
    color: '#0078D4',
    bg: 'from-[#0078D4]/20 to-[#0078D4]/5',
    border: 'border-[#0078D4]/30',
  },
  {
    icon: Users,
    title: 'Microsoft 365',
    description: 'Full M365 deployment, licensing, and governance. Empower your workforce with modern collaboration tools.',
    tags: ['Deployment', 'Governance', 'Training'],
    color: '#c41e3a',
    bg: 'from-[#c41e3a]/20 to-[#c41e3a]/5',
    border: 'border-[#c41e3a]/30',
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Zero Trust implementation, Microsoft Defender, Purview compliance, and identity protection solutions.',
    tags: ['Zero Trust', 'Defender', 'Purview'],
    color: '#3d8b3d',
    bg: 'from-[#3d8b3d]/20 to-[#3d8b3d]/5',
    border: 'border-[#3d8b3d]/30',
  },
  {
    icon: Share2,
    title: 'SharePoint Solutions',
    description: 'Custom SharePoint intranet portals, workflow automation, and document management systems.',
    tags: ['Intranet', 'Workflows', 'DMS'],
    color: '#0078D4',
    bg: 'from-[#0078D4]/20 to-[#0078D4]/5',
    border: 'border-[#0078D4]/30',
  },
  {
    icon: Users,
    title: 'Microsoft Teams',
    description: 'Teams governance, custom app development, meeting room solutions, and voice integration.',
    tags: ['Governance', 'Custom Apps', 'Voice'],
    color: '#c41e3a',
    bg: 'from-[#c41e3a]/20 to-[#c41e3a]/5',
    border: 'border-[#c41e3a]/30',
  },
  {
    icon: Mail,
    title: 'Exchange Solutions',
    description: 'Exchange Online migration, hybrid deployments, mail security, and archiving implementations.',
    tags: ['Migration', 'Hybrid', 'Security'],
    color: '#3d8b3d',
    bg: 'from-[#3d8b3d]/20 to-[#3d8b3d]/5',
    border: 'border-[#3d8b3d]/30',
  },
];

function ServiceCard({ service, index, visible }: { service: typeof services[0]; index: number; visible: boolean }) {
  const Icon = service.icon;
  return (
    <div
      className={`group relative bg-gradient-to-br ${service.bg} border ${service.border} rounded-2xl p-6 hover:scale-[1.02] transition-all duration-500 cursor-pointer overflow-hidden ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: `${service.color}20`, border: `1px solid ${service.color}30` }}
      >
        <Icon size={22} style={{ color: service.color }} />
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium px-2.5 py-1 rounded-full"
            style={{ background: `${service.color}15`, color: service.color, border: `1px solid ${service.color}25` }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: service.color }}>
        Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

export default function Services() {
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
    <section id="services" ref={ref} className="py-28 relative">
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#c41e3a]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#0078D4]/8 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#c41e3a]/10 border border-[#c41e3a]/20 rounded-full text-sm text-[#c41e3a] font-medium mb-6">
            Our Expertise
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Microsoft Stack
            <span className="text-[#c41e3a]"> Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive cloud solutions built on the Microsoft ecosystem, delivered by certified experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
