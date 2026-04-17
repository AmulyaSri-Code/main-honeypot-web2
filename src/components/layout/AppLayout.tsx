import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <Navbar />
      <main className="flex-1 relative w-full pt-24 overflow-x-hidden">
        {/* Decorative background glow */}
        <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-[var(--color-neon-blue)]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="fixed bottom-0 right-1/4 w-[800px] h-[800px] bg-[var(--color-neon-purple)]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
        
        <div className="relative z-10 w-full min-h-screen flex flex-col">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};
