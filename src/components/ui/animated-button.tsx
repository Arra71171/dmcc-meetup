'use client';

import React, { useRef, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { buttonHoverAnimation, magneticEffect } from "@/lib/animations";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "gradient";
  size?: "default" | "sm" | "lg" | "icon";
  magnetic?: boolean;
  magneticStrength?: number;
  glowOnHover?: boolean;
  glowColor?: string;
  animateOnLoad?: boolean;
  animationDelay?: number;
  children: React.ReactNode;
  asChild?: boolean;
  disableHoverScale?: boolean;
  neonBorder?: boolean;
  loading?: boolean;
}

export const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      magnetic = false,
      magneticStrength = 0.3,
      glowOnHover = false,
      glowColor = "rgba(255, 196, 196, 0.5)", // Midnight Bloom coral color
      animateOnLoad = false,
      animationDelay = 0,
      children,
      asChild,
      disableHoverScale = false,
      neonBorder = false,
      loading = false,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);
    const cleanupFunctions = useRef<(() => void)[]>([]);

    useEffect(() => {
      if (typeof window === 'undefined') return;

      const button = buttonRef.current;
      if (!button) return;

      try {
        // Initial animation if enabled
        if (animateOnLoad) {
          gsap.fromTo(button,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: animationDelay, ease: "power2.out" }
          );
        }

        // Hover animation
        const hoverCleanup = buttonHoverAnimation(button, disableHoverScale);
        if (hoverCleanup) {
          cleanupFunctions.current.push(hoverCleanup);
        }

        // Magnetic effect
        if (magnetic) {
          const magneticCleanup = magneticEffect(button, magneticStrength);
          if (magneticCleanup) {
            cleanupFunctions.current.push(magneticCleanup);
          }
        }

        // Glow effect
        if (glowOnHover && glowRef.current) {
          const glow = glowRef.current;

          gsap.set(glow, {
            opacity: 0,
            scale: 1,
            backgroundColor: glowColor
          });

          const handleMouseEnter = () => {
            gsap.to(glow, {
              opacity: 0.6,
              scale: 1.3,
              duration: 0.4,
              ease: "power2.out"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(glow, {
              opacity: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out"
            });
          };

          button.addEventListener("mouseenter", handleMouseEnter);
          button.addEventListener("mouseleave", handleMouseLeave);

          cleanupFunctions.current.push(() => {
            button.removeEventListener("mouseenter", handleMouseEnter);
            button.removeEventListener("mouseleave", handleMouseLeave);
          });
        }
      } catch (error) {
        console.warn('AnimatedButton animation setup failed:', error);
      }

      return () => {
        try {
          cleanupFunctions.current.forEach(cleanup => {
            if (typeof cleanup === 'function') {
              cleanup();
            }
          });
          cleanupFunctions.current = [];
        } catch (error) {
          console.warn('AnimatedButton cleanup failed:', error);
        }
      };
    }, [animateOnLoad, animationDelay, magnetic, magneticStrength, glowOnHover, glowColor, disableHoverScale]);

    const commonWrapperClass = "relative group inline-flex";
    const neonBorderStyle = {
      borderRadius: 'inherit',
      background: `conic-gradient(from var(--angle, 0deg), transparent 10%, hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--secondary)), transparent 90%)`,
      animation: 'rotateNeonBorder 3s linear infinite',
      top: '-2px', left: '-2px', right: '-2px', bottom: '-2px',
      filter: 'blur(1px) brightness(1.2)',
      opacity: 0.9
    };

    const Effects = () => (
      <>
        {glowOnHover && (
          <div
            ref={glowRef}
            className="absolute w-full h-full rounded-md -z-10 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 pointer-events-none"
          />
        )}
        {neonBorder && (
          <span 
            className="neon-border-effect absolute inset-0 rounded-md -z-20 pointer-events-none"
            style={neonBorderStyle}
          />
        )}
      </>
    );

    if (variant === "gradient") {
      return (
        <div className={commonWrapperClass}>
          <button
            ref={(el) => {
              buttonRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            className={cn(
              "relative rounded-md font-medium transition-all duration-300 ease-out",
              "bg-gradient-to-r from-primary to-purple-600 hover:from-primary hover:to-purple-500",
              "text-primary-foreground shadow-lg hover:shadow-primary/40",
              {
                "px-6 py-3": size === "default",
                "px-3 py-1.5 text-sm": size === "sm",
                "px-8 py-4 text-lg": size === "lg",
                "h-10 w-10 p-0": size === "icon"
              },
              className
            )}
            disabled={loading || props.disabled}
            {...props}
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <span className="relative z-10">{children}</span>}
          </button>
          <Effects />
        </div>
      );
    }

    return (
      <div className={commonWrapperClass}>
        <Button
          ref={(el) => {
            buttonRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          variant={variant}
          size={size}
          className={cn("relative", className)}
          asChild={asChild}
          disabled={loading || props.disabled}
          {...props}
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : children}
        </Button>
        <Effects />
      </div>
    );
    // TODO: Move @keyframes rotateNeonBorder and @property --angle to a global CSS file 
    // for AnimatedButton's neonBorder effect. Example CSS:
    /*
    @keyframes rotateNeonBorder {
      0% { --angle: 0deg; }
      100% { --angle: 360deg; }
    }
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    .neon-border-effect {
       Ensure this class is defined with appropriate styles in global CSS.
    }
    */
  }
);

AnimatedButton.displayName = "AnimatedButton";
