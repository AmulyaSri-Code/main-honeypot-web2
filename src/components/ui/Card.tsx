import React from 'react';
import { cn } from '../../lib/utils';

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "glass-panel rounded-xl border border-white/5 bg-slate-900/40 text-slate-100 p-6 shadow-2xl relative overflow-hidden",
        "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";
