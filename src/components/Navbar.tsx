import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  scrollY: number;
}

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ scrollY }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isScrolled = scrollY > 60;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a0a0f]/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <img
              src="/logo.jpg"
              alt="Krizal Technologies"
              className="h-12 w-12 object-contain rounded-lg"
            />
            <div>
              <span className="text-xl font-bold text-white tracking-tight">Krizal</span>
              <span className="text-xl font-bold text-[#c41e3a] tracking-tight"> Technologies</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#c41e3a] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2.5 bg-[#c41e3a] hover:bg-[#a01830] text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#c41e3a]/20 hover:shadow-[#c41e3a]/40"
            >
              Get Started
            </a>
          </div>

          <button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0d0d14]/98 backdrop-blur-md border-t border-white/5 px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block text-gray-300 hover:text-white font-medium py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="block w-full text-center px-5 py-3 bg-[#c41e3a] hover:bg-[#a01830] text-white font-semibold rounded-lg transition-all duration-200 mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}
