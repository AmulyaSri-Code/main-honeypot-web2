import { useEffect, useState, useRef, useCallback } from 'react';
import { Card } from './ui/Card';
import { generateMockAttack } from '../services/mockData';

const INITIAL_LOGS = [
  '> INITIALIZING HONEYPOT KERNEL v3.4.1...',
  '> BINDING TO PORTS 22, 80, 443, 8080, 3389...',
  '> AWAITING INCOMING CONNECTIONS...',
];

export const TerminalLog = () => {
  const [logs, setLogs] = useState<string[]>(INITIAL_LOGS);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback(() => {
    const attack = generateMockAttack();
    const time = new Date().toISOString().split('T')[1].substring(0, 12);
    
    const newLog = `[${time}] INTRUSION DETECTED: ${attack.ip} -> PTY:${attack.port} [${attack.type}] - GEO: ${attack.location}`;
    
    setLogs((prev) => [...prev.slice(-49), newLog]);
  }, []);

  useEffect(() => {
    const interval = setInterval(addLog, 2500);
    return () => clearInterval(interval);
  }, [addLog]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card className="bg-[#050810]/90 border-[#1f2937] font-mono text-sm">
      <div className="flex items-center gap-2 mb-4 border-b border-[#1f2937] pb-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-slate-500 text-xs ml-2">root@honeypot:~#</span>
      </div>
      
      <div 
        ref={scrollRef}
        className="h-[300px] overflow-y-auto w-full text-[var(--color-neon-green)] flex flex-col gap-1"
      >
        {logs.map((log, i) => (
          <div key={i} className="whitespace-pre-wrap word-break">
            {log}
          </div>
        ))}
        {/* Blinking cursor */}
        <div className="animate-pulse w-2 h-4 bg-[var(--color-neon-green)] mt-1"></div>
      </div>
    </Card>
  );
};
