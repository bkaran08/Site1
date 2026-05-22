import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered', color: '#c41e3a' },
  { value: 50, suffix: '+', label: 'Enterprise Clients', color: '#3d8b3d' },
  { value: 10, suffix: '+', label: 'Years of Expertise', color: '#0078D4' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', color: '#c41e3a' },
];

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, active]);
  return count;
}

function StatItem({ value, suffix, label, color, active }: typeof stats[0] & { active: boolean }) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="text-center group">
      <div
        className="text-5xl lg:text-6xl font-black mb-2 transition-transform duration-300 group-hover:scale-110"
        style={{ color }}
      >
        {count}{suffix}
      </div>
      <div className="text-gray-400 font-medium text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a]/5 via-transparent to-[#3d8b3d]/5" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c41e3a]/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#3d8b3d]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat) => (
            <StatItem key={stat.label} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
