import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Cloud, Shield, Globe } from 'lucide-react';

const floatingCards = [
  { icon: Cloud, label: 'Azure Cloud', color: '#0078D4', delay: '0s' },
  { icon: Shield, label: 'Zero Trust Security', color: '#c41e3a', delay: '1.5s' },
  { icon: Globe, label: 'M365 Solutions', color: '#3d8b3d', delay: '3s' },
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(196, 30, 58, ${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(196, 30, 58, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#c41e3a]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#3d8b3d]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0078D4]/5 rounded-full blur-3xl" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#3d8b3d] rounded-full animate-pulse" />
              Trusted Microsoft Cloud Partner — India & USA
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
              <span className="text-white">Powering Your</span>
              <br />
              <span className="text-[#c41e3a]">Cloud</span>
              <span className="text-white"> Future</span>
              <br />
              <span
                className="text-transparent"
                style={{
                  WebkitTextStroke: '1px rgba(255,255,255,0.3)',
                }}
              >
                with Microsoft
              </span>
            </h1>

            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-lg">
              Expert Azure, M365, Security & Compliance solutions tailored for enterprises. From project-based delivery to fully managed services.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="group flex items-center gap-2 px-8 py-4 bg-[#c41e3a] hover:bg-[#a01830] text-white font-bold rounded-xl transition-all duration-300 shadow-xl shadow-[#c41e3a]/30 hover:shadow-[#c41e3a]/50 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                <Play size={16} className="text-[#3d8b3d]" />
                Explore Services
              </a>
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="relative">
              {/* 3D-style central card */}
              <div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-8 shadow-2xl"
                style={{
                  transform: 'perspective(1000px) rotateY(-5deg) rotateX(2deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#c41e3a]/10 via-transparent to-[#3d8b3d]/10" />
                <div className="relative z-10">
                  <img src="/logo.jpg" alt="Krizal Technologies" className="w-20 h-20 object-contain mb-6 rounded-xl bg-white/10 p-2" />
                  <h3 className="text-2xl font-bold text-white mb-2">Krizal Technologies</h3>
                  <p className="text-gray-400 text-sm mb-6">Microsoft Gold Partner Solutions</p>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {['Azure Cloud', 'Microsoft 365', 'SharePoint', 'Teams & Exchange'].map((item) => (
                      <div key={item} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                        <span className="w-1.5 h-1.5 bg-[#c41e3a] rounded-full flex-shrink-0" />
                        <span className="text-xs text-gray-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#c41e3a]">200+</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-[#3d8b3d]">50+</div>
                      <div className="text-xs text-gray-400">Clients</div>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">10+</div>
                      <div className="text-xs text-gray-400">Years</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              {floatingCards.map(({ icon: Icon, label, color, delay }, i) => (
                <div
                  key={label}
                  className="absolute flex items-center gap-2 bg-[#0d0d14]/90 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 shadow-lg"
                  style={{
                    animation: `float 4s ease-in-out infinite`,
                    animationDelay: delay,
                    ...(i === 0 && { top: '-20px', right: '20px' }),
                    ...(i === 1 && { bottom: '60px', left: '-30px' }),
                    ...(i === 2 && { bottom: '-15px', right: '40px' }),
                  }}
                >
                  <Icon size={14} style={{ color }} />
                  <span className="text-xs font-semibold text-gray-200">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-gray-500 to-transparent" />
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
