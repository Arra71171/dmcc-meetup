"use client";

import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useSmoothScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Create Lenis instance with current API options
    // Note: Lenis types might be outdated, but these are the current options
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothWheel: true,
      smoothTouch: false,
    } as any);

    setLenis(lenisInstance);

    // Connect GSAP ScrollTrigger with Lenis
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Update ScrollTrigger when Lenis scrolls
    lenisInstance.on("scroll", ScrollTrigger.update);

    return () => {
      lenisInstance.destroy();
      gsap.ticker.remove((time) => {
        lenisInstance.raf(time * 1000);
      });
    };
  }, []);

  return lenis;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useSmoothScroll();
  return <>{children}</>;
}

// Create scroll reveal animation
export function useScrollReveal() {
  useEffect(() => {
    // Animate elements when they enter viewport
    const revealElements = document.querySelectorAll(".reveal-element");
    
    revealElements.forEach((element) => {
      gsap.fromTo(
        element,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}

// Component that reveals its children with scrolling
export function RevealOnScroll({ 
  children, 
  className,
  delay = 0 
}: { 
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        { 
          y: 30, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          delay: delay + (index * 0.1),
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          }
        }
      );
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [delay]);

  return (
    <div className={`scroll-reveal ${className || ''}`}>
      {children}
    </div>
  );
}
