import { useState } from 'react';
import { Card } from '../ui/Card';
import { Search, Filter } from 'lucide-react';
import { getInitialLogs, type AttackLog } from '../../services/mockData';

export const AttackLogs = () => {
  const [logs] = useState<AttackLog[]>(() => getInitialLogs(50));
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => 
    log.ip.includes(search) || 
    log.type.toLowerCase().includes(search.toLowerCase()) ||
    log.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="logs" className="max-w-7xl mx-auto py-24 px-6 space-y-6 relative border-t border-[#1f2937]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-blue)]/30 to-transparent" />
      
      <div className="flex justify-between items-start mb-8">
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-neon-purple)] bg-[var(--color-neon-purple)]/10 border border-[var(--color-neon-purple)]/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
            SECTION 04
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Attack Logs</h2>
          <p className="text-slate-400 text-lg">Historical records of targeted intrusions.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[#1f2937] flex gap-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search IP, Location, or Threat Type..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#1f2937] rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors"
            />
          </div>
          <button className="px-4 py-2 bg-[#0f172a] border border-[#1f2937] rounded-lg text-slate-300 hover:text-white hover:border-slate-500 flex items-center gap-2 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f172a]/50 text-slate-400 text-sm">
                <th className="px-6 py-4 font-medium">TIMESTAMP</th>
                <th className="px-6 py-4 font-medium">IP ADDRESS</th>
                <th className="px-6 py-4 font-medium">LOCATION</th>
                <th className="px-6 py-4 font-medium">THREAT TYPE</th>
                <th className="px-6 py-4 font-medium">PORT</th>
                <th className="px-6 py-4 font-medium">RISK SCORE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#1f2937]/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300 text-sm">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono text-[var(--color-neon-blue)] group">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {log.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-300">
                    {log.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-slate-400 font-mono">
                    {log.port}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      log.riskScore === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                      log.riskScore === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                      'bg-green-500/10 text-green-500 border border-green-500/20'
                    }`}>
                      {log.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No attacks found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </section>
  );
};
