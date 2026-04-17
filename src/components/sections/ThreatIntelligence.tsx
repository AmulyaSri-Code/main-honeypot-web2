
import { Card } from '../ui/Card';
import { Brain, ShieldCheck, Target, Zap } from 'lucide-react';

export const ThreatIntelligence = () => {
  return (
    <section id="intel" className="max-w-7xl mx-auto py-24 px-6 space-y-6 relative border-t border-[#1f2937] mb-24">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
      
      <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          SECTION 05
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Threat Intelligence</h2>
        <p className="text-slate-400 text-lg">ML-driven insights and automated attack classification.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-6 group hover:border-red-500/20 transition-all duration-300">
          <div className="flex items-center gap-3 border-b border-[#1f2937] pb-4">
            <Brain className="w-6 h-6 text-[var(--color-neon-purple)] group-hover:animate-glow-pulse" />
            <h2 className="text-xl font-semibold">AI Predictive Analysis</h2>
            <span className="ml-auto bg-[var(--color-neon-purple)]/20 text-[var(--color-neon-purple)] px-3 py-1 rounded-full text-xs font-bold font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
              NEURAL-SHIELD v2.4
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#0f172a] rounded-lg border border-[#1f2937] hover:border-[var(--color-neon-blue)]/30 transition-all duration-300 group/card">
              <div className="text-sm text-slate-400 mb-1">Predicted Next Target Port</div>
              <div className="text-2xl font-bold text-[var(--color-neon-blue)] font-mono group-hover/card:animate-glow-pulse">22 (SSH)</div>
              <div className="text-xs text-slate-500 mt-2">84% confidence based on current recon sweeping patterns.</div>
            </div>
            <div className="p-4 bg-[#0f172a] rounded-lg border border-[#1f2937] hover:border-yellow-500/30 transition-all duration-300 group/card">
              <div className="text-sm text-slate-400 mb-1">Estimated Attack Volume (Next 1h)</div>
              <div className="text-2xl font-bold text-yellow-500 font-mono group-hover/card:animate-glow-pulse">~4,500 reqs</div>
              <div className="text-xs text-slate-500 mt-2">Expected minor spike from AS4134 (CN).</div>
            </div>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg hover:border-blue-500/40 transition-all duration-300">
            <h3 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 animate-pulse" />
              Automated Countermeasures Active
            </h3>
            <p className="text-sm text-slate-300">
              The system is currently deploying automated tarpits on ports 22 and 3389, slowing down bruteforce 
              attempts by an average of 4.2 seconds per request. 14 IPs have been temporarily null-routed.
            </p>
          </div>
        </Card>

        <Card className="space-y-4 group hover:border-[var(--color-neon-green)]/20 transition-all duration-300">
          <div className="flex items-center gap-2 border-b border-[#1f2937] pb-4 mb-4">
            <Target className="w-5 h-5 text-[var(--color-neon-green)]" />
            <h3 className="font-semibold">Top Threat Actors</h3>
          </div>
          
          {[
            { ip: '185.15.22.x', group: 'Unknown (Proxy)', risk: 'Critical', score: 98 },
            { ip: '45.132.x.x', group: 'Automated Scanner', risk: 'High', score: 85 },
            { ip: '194.26.x.x', group: 'Botnet Node', risk: 'High', score: 82 },
            { ip: '89.248.x.x', group: 'Mass Scanner', risk: 'Medium', score: 64 },
          ].map((actor, i) => (
            <div key={i} className="p-3 bg-[#0f172a] rounded border border-[#1f2937] flex flex-col gap-1 hover:border-red-500/30 transition-all duration-300 group/actor" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-center text-sm">
                <span className="font-mono text-[var(--color-neon-blue)] group-hover/actor:text-[var(--color-neon-green)]">{actor.ip}</span>
                <span className={`text-xs font-bold font-mono ${actor.risk === 'Critical' ? 'text-red-500' : (actor.risk === 'High' ? 'text-orange-500' : 'text-yellow-500')}`}>
                  {actor.score} / 100
                </span>
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {actor.group}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
};
