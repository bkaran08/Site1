import { Cloud, Shield, Mail, Users, Share2, Linkedin, Twitter, Globe } from 'lucide-react';

const footerLinks = {
  Services: [
    'Azure Cloud',
    'Microsoft 365',
    'Security & Compliance',
    'SharePoint Solutions',
    'Teams & Exchange',
  ],
  Solutions: [
    'Project Based',
    'Managed Services',
    'Cloud Migration',
    'Digital Transformation',
  ],
  Company: [
    'About Us',
    'Our Team',
    'Careers',
    'Contact',
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#070709] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.jpg" alt="Krizal Technologies" className="h-10 w-10 object-contain rounded-lg" />
              <div>
                <span className="text-lg font-bold text-white">Krizal</span>
                <span className="text-lg font-bold text-[#c41e3a]"> Technologies</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Microsoft Cloud Solutions Partner specializing in Azure, M365, Security, SharePoint, Teams, and Exchange for enterprises in India and the US.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Globe, href: '#', label: 'Website' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-white/5 hover:bg-[#c41e3a]/20 border border-white/10 hover:border-[#c41e3a]/30 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                  aria-label={label}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-500 hover:text-gray-300 text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; {new Date().getFullYear()} Krizal Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a key={item} href="#" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
