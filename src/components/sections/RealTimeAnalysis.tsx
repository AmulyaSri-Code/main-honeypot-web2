import { TerminalLog } from '../TerminalLog';
import { Card } from '../ui/Card';
import { Activity, ShieldAlert, Cpu } from 'lucide-react';

export const RealTimeAnalysis = () => {
  return (
    <section id="live" className="max-w-7xl mx-auto py-24 px-6 space-y-6 relative border-t border-[#1f2937]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-red)]/50 to-transparent" />
      
      <div className="flex justify-between items-start mb-8">
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-neon-purple)] bg-[var(--color-neon-purple)]/10 border border-[var(--color-neon-purple)]/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
            SECTION 02
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Real-Time Monitor</h2>
          <p className="text-slate-400 text-lg">Live incoming attack feed from active honey nodes.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-full border border-red-500/30 animate-pulse-glow">
          <Activity className="w-4 h-4" />
          <span className="text-sm font-bold font-mono tracking-wider">DEFCON 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TerminalLog />
        </div>
        
        <div className="space-y-6">
          <Card className="group hover:border-[var(--color-neon-blue)]/30 transition-all duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
              <Cpu className="w-5 h-5 text-[var(--color-neon-blue)] group-hover:animate-glow-pulse" />
              Node Resources
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">CPU Usage</span>
                  <span className="text-white font-mono">78%</span>
                </div>
                <div className="w-full bg-[#1f2937] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[var(--color-neon-blue)] to-[var(--color-neon-purple)] h-full w-[78%] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Memory</span>
                  <span className="text-white font-mono">4.2 / 8 GB</span>
                </div>
                <div className="w-full bg-[#1f2937] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-red)] h-full w-[52%] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-400">Network I/O</span>
                  <span className="text-white font-mono">142 MB/s</span>
                </div>
                <div className="w-full bg-[#1f2937] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-[var(--color-neon-green)] to-[var(--color-neon-blue)] h-full w-[90%] rounded-full relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-red-500/5 border-red-500/20 group hover:border-red-500/40 transition-all duration-300">
            <h3 className="font-semibold text-lg flex items-center gap-2 mb-4 text-red-400">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              Recent Alerts
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[#0f172a] rounded border border-red-500/10 text-sm hover:border-red-500/30 transition-colors">
                <span className="text-red-400 font-bold">CRITICAL:</span> Mass SYN flood detected on node-eu-west
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  2 mins ago
                </div>
              </div>
              <div className="p-3 bg-[#0f172a] rounded border border-yellow-500/10 text-sm hover:border-yellow-500/30 transition-colors">
                <span className="text-yellow-400 font-bold">WARN:</span> Unusual SSH auth rate from 185.15.x.x
                <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                  14 mins ago
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
