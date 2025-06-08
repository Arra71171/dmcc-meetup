import type React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'bg-white/[.25] dark:bg-black/[.35]', // Light: white overlay 25% opacity, Dark: black overlay 35% opacity
        'backdrop-blur-[20px]', // 20px backdrop blur
        'rounded-xl shadow-xl p-6 md:p-8', // Rounded corners, shadow, padding
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
