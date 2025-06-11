
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
        "relative inline-flex items-center justify-center rounded-xl group", // Removed overflow-hidden
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "transition-all duration-300 ease-in-out hover:scale-105 focus:scale-105",
        "font-subtitle uppercase tracking-wider text-sm",
        // Add glowing border effect via shadow
        "shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/50",
        className
      )}
      {...props}
    >
      {/* Wrapper to clip the inner gradient and glass effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {/* Accent Gradient Background */}
        <span className="absolute inset-0 bg-accent-gradient-button group-hover:opacity-90 transition-opacity duration-200" />
        
        {/* Glass Effect Overlay */}
        <span className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[3px]" /> 
      </div>

      {/* Content */}
      <span className={cn(
        "relative inline-flex items-center justify-center h-full w-full",
        "px-6 py-3", 
        "text-card-foreground"
      )}>
        {children}
      </span>
    </Comp>
  );
}
