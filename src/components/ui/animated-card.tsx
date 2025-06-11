'use client';

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { createScrollAnimation, magneticEffect } from "@/lib/animations";
import { LuminanceCard } from "./luminance-card";

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "gradient" | "spotlight";
  glowColor?: string;
  children?: React.ReactNode;
  animationDelay?: number;
  animateOnScroll?: boolean;
  magnetic?: boolean;
  magneticStrength?: number;
  spotlight?: boolean;
  enableHoverLift?: boolean;
}

export const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      variant = "default",
      glowColor,
      children,
      animationDelay = 0,
      animateOnScroll = true,
      magnetic = false,
      magneticStrength = 0.3,
      spotlight = false,
      enableHoverLift = true,
      ...props
    },
    ref
  ) => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const cleanupFns = useRef<(() => void)[]>([]);

    useEffect(() => {
      const card = cardRef.current;
      if (!card) return;
      
      // Initial reveal animation
      const animation = gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: animationDelay, 
          ease: "power3.out" 
        }
      );
      
      // Scroll trigger animation if enabled
      if (animateOnScroll) {
        const scrollTrigger = createScrollAnimation(card, {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        });
        
        cleanupFns.current.push(() => {
          if (scrollTrigger) scrollTrigger.kill();
        });
      }
      
      // Magnetic effect if enabled
      if (magnetic && card) {
        const cleanup = magneticEffect(card, magneticStrength);
        cleanupFns.current.push(cleanup);
      }
      
      // Spotlight effect
      if (spotlight && spotlightRef.current) {
        const spotlightEl = spotlightRef.current;
        
        gsap.set(spotlightEl, {
          opacity: 0,
          scale: 1,
          backgroundColor: glowColor || 'rgba(255, 255, 255, 0.03)'
        });
        
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          gsap.to(spotlightEl, {
            left: x,
            top: y,
            opacity: 0.07,
            scale: 1.5,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(spotlightEl, {
            opacity: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        };
        
        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
        
        cleanupFns.current.push(() => {
          card.removeEventListener("mousemove", handleMouseMove);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      }

      // Hover lift animation
      if (enableHoverLift) {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -10,
            scale: 1.01,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            duration: 0.4,
            ease: "power2.out"
          });
        };
        
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        
        cleanupFns.current.push(() => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      }

      return () => {
        animation.kill();
        cleanupFns.current.forEach(fn => fn());
        cleanupFns.current = [];
      };
    }, [animationDelay, animateOnScroll, magnetic, magneticStrength, spotlight, enableHoverLift, glowColor]);

    // If using spotlight variant
    if (variant === "spotlight") {
      return (
        <div
          ref={(el) => {
            cardRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            "bg-card/70 backdrop-blur-sm border border-white/10",
            "transition-all duration-300 shadow-xl",
            className
          )}
          {...props}
        >
          <div
            ref={spotlightRef}
            className="absolute w-[300px] h-[300px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
          {children}
        </div>
      );
    }

    // Otherwise use LuminanceCard
    return (
      <LuminanceCard
        ref={(el) => {
          cardRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        variant={variant as "default" | "accent" | "gradient"}
        glowColor={glowColor}
        className={className}
        {...props}
      >
        {children}
      </LuminanceCard>
    );
  }
);
