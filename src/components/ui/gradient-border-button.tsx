
import type React from 'react';
import { cn } from '@/lib/utils';

interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function GradientBorderButton({ children, className, asChild = false, ...props }: GradientBorderButtonProps) {
  const Comp = asChild ? 'span' : 'button';

  return (
    <Comp
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl group overflow-hidden", // rounded-xl for 12px
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "transition-transform duration-200 ease-in-out hover:scale-105 focus:scale-105", // Scale-up on hover/focus
        "font-subtitle uppercase tracking-wider text-sm", // Barlow Medium, Uppercase, tracking
        className
      )}
      {...props}
    >
      {/* Accent Gradient Background - specific for buttons */}
      <span className="absolute inset-0 bg-accent-gradient-button group-hover:opacity-90 transition-opacity duration-200" />
      
      {/* Glass Effect Overlay - subtle */}
      <span className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[3px]" /> 

      {/* Content */}
      <span className={cn(
        "relative inline-flex items-center justify-center h-full w-full",
        "px-6 py-3", 
        "text-card-foreground" // Changed from text-primary-foreground for better contrast
      )}>
        {children}
      </span>
    </Comp>
  );
}
