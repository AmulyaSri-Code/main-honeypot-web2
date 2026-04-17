import { useState } from 'react';
import { Card } from '../ui/Card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { getPortDistributionData, getAttackTypesData } from '../../services/mockData';

const COLORS = ['#b026ff', '#39ff14', '#00f3ff', '#ff003c', '#eab308', '#f97316'];

export const Analytics = () => {
  const [portData] = useState(getPortDistributionData);
  const [typeData] = useState(getAttackTypesData);

  return (
    <section id="analytics" className="max-w-7xl mx-auto py-24 px-6 space-y-6 relative border-t border-[#1f2937]">
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-purple)]/30 to-transparent" />
      
      <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '100ms' }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-neon-green)] bg-[var(--color-neon-green)]/10 border border-[var(--color-neon-green)]/20 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-green)] animate-pulse" />
          SECTION 03
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">Analytics</h2>
        <p className="text-slate-400 text-lg">Deep dive into attack vectors and target distributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-[400px] flex flex-col group hover:border-[var(--color-neon-purple)]/30 transition-all duration-300">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />
            Targeted Ports Distribution
          </h3>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={portData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="port" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: '#1f2937', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#eab308' }}
                />
                <Bar dataKey="attacks" fill="var(--color-neon-purple)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="h-[400px] flex flex-col group hover:border-[var(--color-neon-purple)]/30 transition-all duration-300">
          <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-neon-blue)] animate-pulse" />
            Attack Types Breakdown
          </h3>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};
