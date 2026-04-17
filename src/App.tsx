import { AppLayout } from './components/layout/AppLayout';
import { HeroSection } from './components/HeroSection';
import { Dashboard } from './components/sections/Dashboard';
import { RealTimeAnalysis } from './components/sections/RealTimeAnalysis';
import { Analytics } from './components/sections/Analytics';
import { AttackLogs } from './components/sections/AttackLogs';
import { ThreatIntelligence } from './components/sections/ThreatIntelligence';
import { Breaches } from './components/sections/Breaches';

function App() {
  return (
    <AppLayout>
      <HeroSection />
      <Breaches />
      <Dashboard />
      <RealTimeAnalysis />
      <Analytics />
      <AttackLogs />
      <ThreatIntelligence />
    </AppLayout>
  );
}

export default App;
