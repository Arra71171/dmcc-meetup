
import type React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn('glass-card', 'p-6 md:p-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
