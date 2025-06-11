
import type React from 'react';
import { cn } from '@/lib/utils';

interface RainbowBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  asChild?: boolean;
}

export function RainbowBorderButton({ children, icon, className, asChild = false, ...props }: RainbowBorderButtonProps) {
  const Comp = asChild ? 'span' : 'button';

  return (
    <Comp
      className={cn(
        "relative p-0.5 inline-flex items-center justify-center rounded-lg group max-w-xs", // Added max-w-xs
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background", // Use theme colors
        className
      )}
      {...props}
    >
      <span className={cn(
        "absolute inset-0 rounded-lg",
        "bg-midnight-bloom-gradient group-hover:opacity-90 transition-opacity"
      )} />
      <span className={cn(
        "relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[7px]", // Slightly smaller inner radius
        "px-6 py-3 text-sm font-medium",
        "bg-card text-card-foreground group-hover:bg-card/90", // Use theme colors
        "transition-all duration-200"
      )}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </Comp>
  );
}
