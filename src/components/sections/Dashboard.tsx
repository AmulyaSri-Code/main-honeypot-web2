import { useState } from 'react';
import { Card } from '../ui/Card';
import { Shield, Activity, Users, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAttackTimelineData, getInitialLogs, type AttackLog } from '../../services/mockData';

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  colorClass: string;
  trend: string;
  glowClass: string;
}

const StatCard = ({ title, value, icon: Icon, colorClass, trend, glowClass }: StatCardProps) => (
  <Card className="flex flex-col justify-between h-32 relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 border border-[#1f2937] hover:border-[var(--color-neon-blue)]/30">
    <div className={`absolute -right-6 -top-6 opacity-5 group-hover:opacity-15 transition-all duration-500 ${glowClass}`}>
      <Icon className="w-40 h-40" />
    </div>
    <div className="flex justify-between items-start z-10">
      <p className="text-slate-400 font-medium">{title}</p>
      <div className={`p-2.5 rounded-lg bg-[#111827]/80 border border-white/5 ${colorClass} group-hover:animate-glow-pulse`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="z-10">
      <h3 className={`text-3xl font-bold ${colorClass}`}>{value}</h3>
      <p className="text-sm text-slate-500 mt-1">{trend}</p>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--color-neon-green)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </Card>
);

export const Dashboard = () => {
  const [timelineData] = useState(() => getAttackTimelineData());
  const [logs] = useState<AttackLog[]>(() => getInitialLogs(20));

  return (
    <section id="overview" className="max-w-7xl mx-auto py-20 px-6 space-y-6 relative">
      {/* Animated glow bar */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-neon-green)]/50 to-transparent" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-neon-blue)] bg-[var(--color-neon-blue)]/10 border border-[var(--color-neon-blue)]/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-neon-blue)] animate-pulse" />
            SECTION 01
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Threat Overview</h2>
          <p className="text-slate-400 text-lg">Global honeypot cluster status and realtime metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Attacks" 
          value="142,394" 
          icon={Shield} 
          colorClass="text-[var(--color-neon-blue)]"
          trend="+12% from yesterday"
          glowClass="text-[var(--color-neon-blue)]"
        />
        <StatCard 
          title="Active Connections" 
          value="892" 
          icon={Activity} 
          colorClass="text-[var(--color-neon-green)]"
          trend="42 new in last minute"
          glowClass="text-[var(--color-neon-green)]"
        />
        <StatCard 
          title="Unique IPs" 
          value="12,043" 
          icon={Users} 
          colorClass="text-[var(--color-neon-purple)]"
          trend="+3% from yesterday"
          glowClass="text-[var(--color-neon-purple)]"
        />
        <StatCard 
          title="High Risk Events" 
          value="54" 
          icon={AlertTriangle} 
          colorClass="text-red-500"
          trend="Requires attention"
          glowClass="text-red-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[450px] p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#1f2937]">
            <h3 className="font-semibold text-lg">Global Attack Origins</h3>
          </div>
          <div className="flex-1 bg-[#0f172a] relative z-0">
            <MapContainer 
              center={[20, 0]} 
              zoom={2} 
              style={{ height: '100%', width: '100%', background: '#0f172a' }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              />
              {logs.map((log) => (
                <CircleMarker
                  key={log.id}
                  center={[log.lat, log.lng]}
                  radius={log.riskScore === 'High' ? 6 : (log.riskScore === 'Medium' ? 4 : 3)}
                  fillColor={log.riskScore === 'High' ? '#ef4444' : (log.riskScore === 'Medium' ? '#eab308' : '#39ff14')}
                  color="transparent"
                  fillOpacity={0.7}
                >
                  <Popup className="bg-[#111827] text-white border-0">
                    <div className="p-1">
                      <p className="font-bold">{log.ip}</p>
                      <p className="text-sm text-slate-400">{log.type}</p>
                      <p className="text-xs mt-1 text-[var(--color-neon-green)]">{log.location}</p>
                    </div>
                  </Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </Card>

        <Card className="h-[450px] flex flex-col">
          <h3 className="font-semibold text-lg mb-6">Attack Timeline (24h)</h3>
          <div className="flex-1 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="colorSsh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-neon-blue)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-neon-blue)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPort" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-neon-green)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-neon-green)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="SSH Brute Force" stroke="var(--color-neon-blue)" fillOpacity={1} fill="url(#colorSsh)" />
                <Area type="monotone" dataKey="Port Scan" stroke="var(--color-neon-green)" fillOpacity={1} fill="url(#colorPort)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </section>
  );
};
