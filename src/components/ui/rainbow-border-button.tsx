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
        "focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-neutral-900", // Adjusted focus ring
        className
      )}
      {...props}
    >
      <span className={cn(
        "absolute inset-0 rounded-lg",
        "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 group-hover:opacity-90 transition-opacity"
      )} />
      <span className={cn(
        "relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[7px]", // Slightly smaller inner radius
        "px-6 py-3 text-sm font-medium",
        "bg-neutral-800 text-white group-hover:bg-neutral-700", // Darker background, lighter text
        "transition-all duration-200"
      )}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </span>
    </Comp>
  );
}
