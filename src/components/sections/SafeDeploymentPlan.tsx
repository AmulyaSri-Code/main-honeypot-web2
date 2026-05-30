import { CheckCircle2, LockKeyhole, Network, Server, ShieldAlert } from 'lucide-react';
import { Card } from '../ui/Card';

const deploymentSteps = [
  {
    title: 'Public website layer',
    description: 'Deploy this React/Vite frontend to Vercel, Netlify, Cloudflare Pages, or your personal website host.',
    icon: Network,
  },
  {
    title: 'Private honeypot backend',
    description: 'Run real sensors on a VPS or controlled server; do not expose the admin dashboard directly to the internet.',
    icon: Server,
  },
  {
    title: 'Safe summary API',
    description: 'Expose only sanitized aggregate metrics such as counts, risk levels, categories, and anonymized geography.',
    icon: ShieldAlert,
  },
  {
    title: 'Locked admin access',
    description: 'Keep raw logs, captured credentials, payloads, and operator controls behind VPN, IP allowlists, or strong auth.',
    icon: LockKeyhole,
  },
];

export const SafeDeploymentPlan = () => {
  return (
    <section id="deployment" className="max-w-7xl mx-auto py-20 px-6 relative">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-purple)]/50 to-transparent" />

      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-neon-purple)] bg-[var(--color-neon-purple)]/10 border border-[var(--color-neon-purple)]/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
          DEPLOYMENT MODEL
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Safe honeypot deployment for a personal website</h2>
        <p className="text-slate-400 text-lg leading-8">
          The public site should be a showcase and sanitized telemetry layer. Real sensors, private dashboards,
          raw attacker payloads, and credentials belong on isolated infrastructure behind strict access controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deploymentSteps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="relative overflow-hidden border border-[#1f2937] hover:border-[var(--color-neon-purple)]/40 transition-all duration-300 group">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-[var(--color-neon-purple)]/10 rounded-full blur-2xl group-hover:bg-[var(--color-neon-purple)]/20 transition-colors" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[var(--color-neon-purple)]/10 border border-[var(--color-neon-purple)]/30 flex items-center justify-center text-[var(--color-neon-purple)]">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-6">{step.description}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8 border border-amber-500/30 bg-amber-500/5">
        <div className="flex flex-col md:flex-row gap-4 md:items-start">
          <CheckCircle2 className="w-6 h-6 text-amber-300 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Recommended first launch</h3>
            <p className="text-slate-300 leading-7">
              Deploy this frontend publicly first for views and indexing. Then connect a future
              <code className="mx-1 px-2 py-1 rounded bg-black/30 text-[var(--color-neon-purple)]">/public/summary</code>
              endpoint when the real honeypot backend is running safely on a VPS.
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
};
