import { subMinutes } from 'date-fns';

export interface AttackLog {
  id: string;
  ip: string;
  location: string;
  lat: number;
  lng: number;
  type: string;
  port: number;
  timestamp: string;
  riskScore: 'Low' | 'Medium' | 'High';
}

const generateIp = () => `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;

const locations = [
  { name: 'Beijing, CN', lat: 39.9042, lng: 116.4074 },
  { name: 'Moscow, RU', lat: 55.7558, lng: 37.6173 },
  { name: 'New York, US', lat: 40.7128, lng: -74.0060 },
  { name: 'London, UK', lat: 51.5074, lng: -0.1278 },
  { name: 'Pyongyang, KP', lat: 39.0392, lng: 125.7625 },
  { name: 'Tehran, IR', lat: 35.6892, lng: 51.3890 },
  { name: 'Sao Paulo, BR', lat: -23.5505, lng: -46.6333 },
];

const attackTypes = ['SSH Brute Force', 'DDoS', 'SQL Injection', 'Port Scan', 'Malware Drop', 'Web Exploit'];
const ports = [22, 80, 443, 8080, 23, 3389];

export const generateMockAttack = (minutesAgo = 0): AttackLog => {
  const loc = locations[Math.floor(Math.random() * locations.length)];
  const type = attackTypes[Math.floor(Math.random() * attackTypes.length)];
  const risk = Math.random() > 0.8 ? 'High' : (Math.random() > 0.4 ? 'Medium' : 'Low');

  return {
    id: Math.random().toString(36).substring(2, 9),
    ip: generateIp(),
    location: loc.name,
    lat: loc.lat + (Math.random() * 2 - 1), // slight jitter
    lng: loc.lng + (Math.random() * 2 - 1),
    type,
    port: ports[Math.floor(Math.random() * ports.length)],
    timestamp: subMinutes(new Date(), minutesAgo).toISOString(),
    riskScore: risk,
  };
};

export const getInitialLogs = (count = 50): AttackLog[] => {
  return Array.from({ length: count }, () => generateMockAttack(Math.floor(Math.random() * 60 * 24))); // Last 24 hours
};

export const getAttackTimelineData = () => {
  const data = [];
  for (let i = 24; i >= 0; i--) {
    data.push({
      time: i === 0 ? 'Now' : `-${i}h`,
      'SSH Brute Force': Math.floor(Math.random() * 50) + 10,
      'DDoS': Math.floor(Math.random() * 20),
      'Port Scan': Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

export const getPortDistributionData = () => {
  return ports.map(port => ({
    port: port.toString(),
    attacks: Math.floor(Math.random() * 500) + 50,
  })).sort((a, b) => b.attacks - a.attacks);
};

export const getAttackTypesData = () => {
  return attackTypes.map(type => ({
    name: type,
    value: Math.floor(Math.random() * 1000) + 100,
  }));
};
