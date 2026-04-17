import { ShieldAlert, Terminal, ArrowRight, Cpu, ChevronDown } from 'lucide-react';
import { ParticleBackground } from './ui/ParticleBackground';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      
      <ParticleBackground />
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-neon-purple)]/20 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-neon-pink)]/20 rounded-full blur-[128px] animate-float-delay" />

      {/* Animated grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.02)_1px,transparent_1px)] [background-size:50px_50px] [transform:perspective(500px)_rotateX(60deg)] [transform-origin:top] opacity-30 -z-10 animate-grid-move" />

      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-neon-purple)]/50 bg-[var(--color-neon-purple)]/10 text-[var(--color-neon-purple)] text-sm font-medium mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-neon-purple)] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-neon-purple)]"></span>
        </span>
        <Cpu className="w-4 h-4" />
        Honeypot Systems Online & Active
      </div>

      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white max-w-4xl mb-6 animate-fade-in-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        Deceive. Detect. <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-neon-purple)] via-[var(--color-neon-pink)] to-[var(--color-neon-purple)]">
          Defend Your Network.
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
        Deploy state-of-the-art cyber deception grids. Monitor attackers in real-time, 
        gather critical threat intelligence, and predict the next strike before it happens.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
        <a 
          href="#live" 
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-white text-black hover:bg-slate-200 transition-all duration-300 flex items-center justify-center gap-2 group hover-glow hover:scale-105"
        >
          <Terminal className="w-5 h-5" />
          View Live Activity
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
        <a 
          href="#overview" 
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold border border-[var(--color-neon-purple)]/40 bg-[var(--color-neon-purple)]/5 hover:bg-[var(--color-neon-purple)]/15 transition-all duration-300 flex items-center justify-center gap-2 group text-white border-glow hover:border-[var(--color-neon-purple)]"
        >
          <ShieldAlert className="w-5 h-5 text-[var(--color-neon-purple)]" />
          Explore Dashboard
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
        <a href="#breaches" className="flex flex-col items-center gap-2 text-slate-500 hover:text-[var(--color-neon-green)] transition-colors group">
          <span className="text-xs font-mono">SCROLL TO EXPLORE</span>
          <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </a>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-[var(--color-neon-green)]/20 animate-fade-in-up opacity-0 hidden md:block" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
        <div className="absolute -bottom-8 -left-8 text-[var(--color-neon-green)]/30 font-mono text-xs">SYS.01</div>
      </div>
      <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-[var(--color-neon-blue)]/20 animate-fade-in-up opacity-0 hidden md:block" style={{ animationDelay: '700ms', animationFillMode: 'forwards' }}>
        <div className="absolute -top-8 -right-8 text-[var(--color-neon-blue)]/30 font-mono text-xs">STATUS:OK</div>
      </div>

    </section>
  );
};
