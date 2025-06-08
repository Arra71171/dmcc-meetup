
import type React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-white/25 dark:bg-neutral-800/30', // Semi-transparent white, dark: semi-transparent dark grey
        'backdrop-blur-[10px]', // 10px backdrop blur
        'rounded-2xl shadow-lg', // 16px radius (rounded-2xl from tailwind config), soft shadow
        'p-6 md:p-8 border border-white/10 dark:border-neutral-700/50', // Subtle border for definition
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
