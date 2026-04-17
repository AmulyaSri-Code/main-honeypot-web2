import { Card } from '../ui/Card';
import { AlertTriangle, TrendingDown, Database, DollarSign, Users, Globe, ArrowRight, CheckCircle, XCircle, Lock, Skull } from 'lucide-react';

const TOP_ATTACKS = [
  {
    rank: 1,
    name: 'SQL Injection',
    description: 'Injecting malicious SQL code into web forms to access databases',
    percentage: 65,
    icon: Database,
  },
  {
    rank: 2,
    name: 'Cross-Site Scripting (XSS)',
    description: 'Injecting malicious scripts into web pages viewed by users',
    percentage: 58,
    icon: Globe,
  },
  {
    rank: 3,
    name: 'Distributed Denial of Service (DDoS)',
    description: 'Overwhelming servers with traffic to render services unavailable',
    percentage: 52,
    icon: TrendingDown,
  },
  {
    rank: 4,
    name: 'Credential Stuffing',
    description: 'Using stolen login credentials to gain unauthorized access',
    percentage: 45,
    icon: Lock,
  },
  {
    rank: 5,
    name: 'Zero-Day Exploits',
    description: 'Exploiting previously unknown vulnerabilities before patches exist',
    percentage: 38,
    icon: Skull,
  },
];

const BREACH_DATA = [
  {
    company: 'Equifax',
    year: 2017,
    records: '147M',
    cost: '$700M',
    type: 'Credit Bureau Breach',
    location: 'USA',
    icon: Database,
    color: 'text-red-500',
  },
  {
    company: 'Marriott',
    year: 2018,
    records: '383M',
    cost: '$124M',
    type: 'Hotel Chain Breach',
    location: 'UK',
    icon: Database,
    color: 'text-orange-500',
  },
  {
    company: 'Yahoo',
    year: 2013,
    records: '3B',
    cost: '$350M',
    type: 'Email Provider',
    location: 'USA',
    icon: Database,
    color: 'text-yellow-500',
  },
  {
    company: 'SolarWinds',
    year: 2020,
    records: '18K+',
    cost: '$90M+',
    type: 'Supply Chain Attack',
    location: 'USA',
    icon: Database,
    color: 'text-purple-500',
  },
];

const STATS = [
  { label: 'Global Data Breaches (2023)', value: '3,205', icon: Database, trend: '+78% from 2022', color: 'text-red-500' },
  { label: 'Records Exposed', value: '353M', icon: Users, trend: 'Average 2.5M per breach', color: 'text-orange-500' },
  { label: 'Average Cost per Breach', value: '$4.45M', icon: DollarSign, trend: 'Highest ever recorded', color: 'text-yellow-500' },
  { label: 'Global Losses', value: '$4.45T', icon: TrendingDown, trend: 'Projected 2024', color: 'text-red-500' },
];

export const Breaches = () => {
  return (
    <section id="breaches" className="max-w-7xl mx-auto py-24 px-6 space-y-6 relative border-t border-[#1f2937]">
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-effect pointer-events-none" />
      
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-full">
          <AlertTriangle className="w-3 h-3" />
          THE COST OF INACTION
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Billions Lost.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            Millions Exposed.
          </span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Without proactive deception technology, organizations face devastating consequences. 
          These breaches could have been prevented with honeypot infrastructure.
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map((stat) => (
          <Card 
            key={stat.label}
            className="text-center py-8 group hover:border-red-500/30 transition-all duration-300"
          >
            <div className={`inline-flex p-3 rounded-full bg-red-500/10 mb-4 ${stat.color || 'text-red-500'}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className={`text-3xl md:text-4xl font-bold mb-1 ${stat.color || 'text-white'}`}>
              {stat.value}
            </div>
            <div className="text-sm text-slate-400">{stat.label}</div>
            <div className="text-xs text-slate-500 mt-2">{stat.trend}</div>
          </Card>
        ))}
      </div>

      {/* Major Breaches */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-[var(--color-neon-red)]" />
          Notable Data Breaches (Without Honeypot Protection)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BREACH_DATA.map((breach) => (
            <Card 
              key={breach.company}
              className="group hover:scale-[1.02] transition-all duration-300 border-[#1f2937] hover:border-red-500/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-lg bg-red-500/10 ${breach.color}`}>
                  <breach.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-slate-500">{breach.year}</span>
              </div>
              
              <h4 className="text-lg font-bold text-white mb-1">{breach.company}</h4>
              <p className="text-sm text-slate-400 mb-4">{breach.type}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#1f2937]">
                <div>
                  <div className="text-xs text-slate-500">Records Lost</div>
                  <div className="text-lg font-bold font-mono text-red-400">{breach.records}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Cost</div>
                  <div className="text-lg font-bold font-mono text-red-400">{breach.cost}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-slate-500 mt-4">
                <Globe className="w-3 h-3" />
                {breach.location}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Top 5 Website Attacks */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
          <Skull className="w-5 h-5 text-[var(--color-neon-red)]" />
          Top 5 Website Attacks (How Honeypot Stops Each)
        </h3>
        <div className="space-y-4">
          {TOP_ATTACKS.map((attack) => (
            <Card 
              key={attack.rank}
              className="group hover:border-red-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xl">
                  #{attack.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-lg font-bold text-white">{attack.name}</h4>
                    <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{attack.percentage}% of attacks</span>
                  </div>
                  <p className="text-sm text-slate-400">{attack.description}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#1f2937] flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span>Without Honeypot: <span className="text-red-400">Vulnerable</span></span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-[var(--color-neon-green)]" />
                  <span>With Honeypot: <span className="text-[var(--color-neon-green)]">Protected</span></span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-red-900/20 via-orange-900/10 to-yellow-900/20 border-red-500/20 p-8 md:p-12 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Don't Become the Next Headline
        </h3>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Deploy Honeypot deception grids today and detect attackers before they breach your perimeter. 
          Early detection saves millions.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#overview"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] group"
          >
            <AlertTriangle className="w-5 h-5" />
            View Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#intel"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold border border-orange-500/30 bg-orange-500/5 text-orange-400 hover:bg-orange-500/15 transition-all duration-300"
          >
            View Threat Intelligence
          </a>
        </div>
      </Card>
    </section>
  );
};