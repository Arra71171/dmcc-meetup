"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

interface LuminanceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "gradient" | "midnight-bloom";
  glowColor?: string;
  glowRadius?: number;
  glowIntensity?: number;
  interactive?: boolean;
  children?: React.ReactNode;
}

export const LuminanceCard = React.forwardRef<HTMLDivElement, LuminanceCardProps>(
  (
    {
      className,
      variant = "default",
      glowColor = "hsl(var(--primary) / 0.5)", // Use Midnight Bloom primary color
      glowRadius = 100,
      glowIntensity = 0.6,
      interactive = true,
      children,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);
    const tl = useRef<gsap.core.Timeline | null>(null);

    // Set up GSAP animations
    useEffect(() => {
      const card = cardRef.current;
      const glow = glowRef.current;
      
      if (!card || !glow || !interactive) return;

      // Resolve CSS variable for glowColor
      const computedGlowColor = getComputedStyle(card).getPropertyValue('--primary').trim();
      const finalGlowColor = computedGlowColor ? `hsl(${computedGlowColor} / 0.5)` : glowColor;

      gsap.set(glow, {
        opacity: 0,
        scale: 1,
        backgroundColor: finalGlowColor
      });
      
      // Create ambient glow animation
      tl.current = gsap.timeline({ repeat: -1, yoyo: true });
      tl.current.to(glow, {
        opacity: glowIntensity * 0.4,
        scale: 1.05,
        duration: 2,
        ease: "sine.inOut"
      });
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Move glow to follow mouse
        gsap.to(glow, {
          left: x,
          top: y,
          opacity: glowIntensity,
          scale: 1.1,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto"
        });
      };
      
      const handleMouseEnter = () => {
        if (tl.current) tl.current.pause();
        
        gsap.to(glow, {
          opacity: glowIntensity,
          scale: 1.15,
          duration: 0.4,
          ease: "power2.out"
        });
        
        // Subtle card scale
        gsap.to(card, {
          scale: 1.01,
          duration: 0.4,
          ease: "power2.out"
        });
      };
      
      const handleMouseLeave = () => {
        if (tl.current) tl.current.play();
        
        gsap.to(glow, {
          opacity: glowIntensity * 0.4,
          scale: 1,
          left: "50%",
          top: "50%",
          duration: 0.8,
          ease: "power2.out"
        });
        
        // Reset card scale
        gsap.to(card, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      };
      
      if (interactive) {
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      }
      
      return () => {
        if (interactive) {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        }
        if (tl.current) tl.current.kill();
      };
    }, [glowColor, glowRadius, glowIntensity, interactive]);

    const getCardStyles = () => {
      switch (variant) {
        case "accent":
          return "bg-card/80 border border-accent/20 backdrop-blur-sm";
        case "gradient":
          return "bg-gradient-to-br from-background/90 to-primary/5 backdrop-blur-md border border-primary/10";
        case "midnight-bloom":
          return "glass-card bg-midnight-bloom-gradient/10 border border-primary/20";
        default:
          return "bg-card/80 border border-border/40 backdrop-blur-sm";
      }
    };

    return (
      <div
        ref={(el) => {
          cardRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn(
          "relative rounded-2xl overflow-hidden",
          "shadow-xl shadow-black/5",
          "transition-all duration-300 ease-out transform",
          getCardStyles(),
          interactive && "hover:shadow-2xl hover:shadow-primary/10 dark:hover:shadow-primary/5",
          interactive && "hover:border-primary/30 dark:hover:border-primary/20",
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          ref={glowRef}
          style={{
            width: `${glowRadius * 2}px`,
            height: `${glowRadius * 2}px`,
            top: "50%",
            left: "50%"
          }}
          className="absolute rounded-full pointer-events-none blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    );
  }
);

LuminanceCard.displayName = "LuminanceCard";
