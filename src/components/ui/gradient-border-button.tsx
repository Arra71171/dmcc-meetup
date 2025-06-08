
import type React from 'react';
import { cn } from '@/lib/utils';

interface GradientBorderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  asChild?: boolean;
}

export function GradientBorderButton({ children, className, asChild = false, ...props }: GradientBorderButtonProps) {
  const Comp = asChild ? 'span' : 'button'; // Use span if asChild for Radix Slot compatibility

  return (
    <Comp
      className={cn(
        "relative p-0.5 inline-flex items-center justify-center overflow-hidden rounded-lg group",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        className
      )}
      {...props}
    >
      <span className={cn(
        "absolute inset-[-1000%] animate-[spin_2s_linear_infinite]",
        "bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary))_0%,hsl(var(--accent))_50%,hsl(var(--primary))_100%)]",
        "dark:bg-[conic-gradient(from_90deg_at_50%_50%,hsl(var(--primary-foreground))_0%,hsl(var(--accent))_50%,hsl(var(--primary-foreground))_100%)]"
      )} />
      <span className={cn(
        "relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md",
        "px-6 py-3 text-sm font-medium",
        "bg-background text-foreground group-hover:bg-background/80",
        "dark:bg-neutral-900 dark:text-foreground dark:group-hover:bg-neutral-900/80",
        "transition-all duration-200"
      )}>
        {children}
      </span>
    </Comp>
  );
}
