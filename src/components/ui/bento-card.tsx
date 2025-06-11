import { cn } from "@/lib/utils";
import React from "react";

interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className?: string;
  gradient?: "primary" | "secondary" | "none"; 
  animation?: "float" | "pulse" | "none";
  shadow?: "sm" | "md" | "lg" | "none";
  interactive?: boolean;
  children: React.ReactNode;
}

export function BentoCard({
  title,
  className,
  gradient = "none",
  animation = "none",
  shadow = "md",
  interactive = true,
  children,
  ...props
}: BentoCardProps) {
  // Define gradient class based on prop
  const gradientClass = {
    primary: "bg-primary-gradient/10 dark:bg-primary-gradient/5 border-gradient-primary",
    secondary: "bg-secondary-gradient/10 dark:bg-secondary-gradient/5 border-gradient-secondary",
    none: "",
  }[gradient];

  // Define animation class based on prop
  const animationClass = {
    float: "animate-float",
    pulse: "animate-pulse-subtle", 
    none: "",
  }[animation];

  // Define shadow class based on prop
  const shadowClass = {
    sm: "shadow-soft dark:shadow-soft-dark",
    md: "shadow-soft-md dark:shadow-soft-md-dark",
    lg: "shadow-soft-lg dark:shadow-soft-lg-dark",
    none: "",
  }[shadow];

  // Define interactive class if interactive
  const interactiveClass = interactive 
    ? "hover:shadow-soft-lg dark:hover:shadow-soft-lg-dark hover-lift transition-all duration-300 cursor-pointer"
    : "";

  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 backdrop-blur-sm p-5",
        gradientClass,
        shadowClass,
        animationClass,
        interactiveClass,
        className
      )}
      {...props}
    >
      {title && (
        <h3 className="font-heading font-bold text-xl mb-3">
          {gradient !== "none" ? (
            <span className={gradient === "primary" ? "text-primary-gradient" : "text-secondary-gradient"}>
              {title}
            </span>
          ) : (
            title
          )}
        </h3>
      )}
      <div className="relative z-0">{children}</div>
    </div>
  );
}

interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5;
}

export function BentoGrid({
  className,
  children,
  cols = 3,
  ...props
}: BentoGridProps) {
  const colsClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-3 lg:grid-cols-5",
  }[cols];
  
  return (
    <div
      className={cn("grid gap-4 md:gap-6", colsClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}
