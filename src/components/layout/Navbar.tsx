import { ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Breaches', href: '#breaches' },
  { name: 'Overview', href: '#overview' },
  { name: 'Live Feed', href: '#live' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Deploy', href: '#deployment' },
  { name: 'Intel', href: '#intel' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-50 transition-all duration-300",
      scrolled ? "bg-[#050810]/90 backdrop-blur-md border-b border-[#1f2937]/50 py-3" : "bg-transparent py-5"
    )}>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-green)]/30 to-transparent opacity-0 transition-opacity duration-300" style={{ opacity: scrolled ? 1 : 0 }} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative">
            <ShieldAlert className="text-[var(--color-neon-green)] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute inset-0 bg-[var(--color-neon-green)]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <h1 className="text-xl font-bold tracking-wider text-white">
            HONEY<span className="text-[var(--color-neon-green)]">POT</span>
          </h1>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-[var(--color-neon-blue)] transition-all duration-300 relative group/item"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--color-neon-blue)] group-hover/item:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#live" className="hidden sm:inline-flex px-5 py-2.5 rounded-full text-sm font-bold border border-[var(--color-neon-green)]/50 text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/5 hover:bg-[var(--color-neon-green)] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(57,255,20,0.4)]">
            <span className="relative flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Live Monitoring
            </span>
          </a>
        </div>
      </div>
    </nav>
  );
};
