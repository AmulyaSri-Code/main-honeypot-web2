import { ShieldAlert, Globe, MessageSquare, Terminal, Network } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1f2937] bg-[#050810]/50 backdrop-blur-md mt-24 py-12 relative">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-[var(--color-neon-green)] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 group">
            <div className="relative">
              <ShieldAlert className="text-[var(--color-neon-green)] w-6 h-6 group-hover:animate-glow-pulse" />
              <div className="absolute inset-0 bg-[var(--color-neon-green)]/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h2 className="text-xl font-bold tracking-wider text-white">
              HONEY<span className="text-[var(--color-neon-green)]">POT</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            Next-generation deception grids and threat intelligence infrastructure.
            Detect, track, and classify lateral movements within your protected perimeter.
          </p>
          <div className="flex items-center gap-2 text-xs text-[var(--color-neon-blue)] font-mono">
            <Terminal className="w-3 h-3" />
            <span>SYSTEM STATUS: OPERATIONAL</span>
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-green)] animate-pulse ml-2" />
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Platform</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            {[
              { name: 'Overview', href: '#overview' },
              { name: 'Live Activity Feed', href: '#live' },
              { name: 'Forensics Analytics', href: '#analytics' },
              { name: 'Threat Intelligence', href: '#intel' },
            ].map((item) => (
              <li key={item.name}>
                <a href={item.href} className="hover:text-[var(--color-neon-green)] transition-all duration-300 inline-flex items-center gap-2 group/link">
                  <span className="w-0 group-hover/link:w-2 h-px bg-[var(--color-neon-green)] transition-all duration-300" />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Connect</h3>
          <div className="flex items-center gap-3">
            {[
              { icon: Globe, label: 'Website' },
              { icon: Network, label: 'Network' },
              { icon: MessageSquare, label: 'Discord' },
              { icon: Terminal, label: 'API' },
            ].map((item) => (
              <a 
                key={item.label}
                href="#" 
                className="w-10 h-10 rounded-full bg-[#111827] border border-[#1f2937] flex items-center justify-center text-slate-400 hover:text-white hover:border-[var(--color-neon-blue)] hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all duration-300"
                aria-label={item.label}
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#1f2937] flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {currentYear} Honeypot Cybersecurity. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          {[
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'System Status', href: '#' },
          ].map((item) => (
            <a 
              key={item.name}
              href={item.href} 
              className="hover:text-white transition-colors relative group/policy"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-neon-green)] group-hover/policy:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
