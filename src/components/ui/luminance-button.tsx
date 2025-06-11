"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { Button, type ButtonProps } from "@/components/ui/button";

interface LuminanceButtonProps extends ButtonProps {
  glowColor?: string;
  glowIntensity?: number;
  trackMouse?: boolean;
  pulseEffect?: boolean;
}

export const LuminanceButton = React.forwardRef<HTMLButtonElement, LuminanceButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      glowColor = "hsl(var(--primary) / 0.5)", // Use Midnight Bloom primary color
      glowIntensity = 0.7,
      trackMouse = true,
      pulseEffect = false,
      ...props
    },
    ref
  ) => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const glowRef = useRef<HTMLDivElement | null>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
      const button = buttonRef.current;
      const glow = glowRef.current;
      
      if (!button || !glow) return;
      
      // Create initial glow animation
      gsap.set(glow, {
        opacity: 0,
        scale: 1.2,
        backgroundColor: glowColor
      });
      
      // Pulse animation when enabled
      let pulseAnim: gsap.core.Timeline | null = null;
      
      if (pulseEffect) {
        pulseAnim = gsap.timeline({
          repeat: -1, 
          yoyo: true,
          paused: true
        });
        
        pulseAnim.to(glow, {
          scale: 1.4,
          opacity: glowIntensity * 0.7,
          duration: 1.5,
          ease: "sine.inOut"
        });
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!trackMouse || !isHovering) return;
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gsap.to(glow, {
          left: x,
          top: y,
          opacity: glowIntensity,
          duration: 0.4,
          ease: "power1.out"
        });
      };
      
      const handleMouseEnter = () => {
        setIsHovering(true);
        
        gsap.to(glow, {
          scale: 1.8,
          opacity: glowIntensity,
          duration: 0.4,
          ease: "power1.out"
        });
        
        if (pulseAnim) pulseAnim.play();
      };
      
      const handleMouseLeave = () => {
        setIsHovering(false);
        
        gsap.to(glow, {
          scale: 1.2,
          opacity: 0,
          duration: 0.6,
          ease: "power1.out"
        });
        
        if (pulseAnim) pulseAnim.pause();
      };
      
      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);
      button.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("mousemove", handleMouseMove);
        if (pulseAnim) pulseAnim.kill();
      };
    }, [glowColor, glowIntensity, trackMouse, pulseEffect, isHovering]);

    return (
      <Button
        ref={(el) => {
          buttonRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className={cn(
          "relative overflow-hidden transition-all bg-gradient-to-r from-primary to-secondary",
          "hover:shadow-lg hover:shadow-primary/25",
          "midnight-bloom-glow-hover",
          className
        )}
        variant={variant}
        size={size}
        {...props}
      >
        <div className="relative z-10">{children}</div>
        <div
          ref={glowRef}
          className="absolute w-20 h-20 rounded-full pointer-events-none blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: "50%",
            left: "50%"
          }}
        />
      </Button>
    );
  }
);

LuminanceButton.displayName = "LuminanceButton";
