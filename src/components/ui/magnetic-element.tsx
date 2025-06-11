"use client";

import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  ease?: number;
  maxRotation?: number;
}

export function MagneticElement({
  children,
  className,
  strength = 50,
  ease = 0.2,
  maxRotation = 10,
}: MagneticElementProps) {
  const magneticRef = useRef<HTMLDivElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const magneticElement = magneticRef.current;
    
    if (!magneticElement) return;

    const calculatePosition = (e: MouseEvent) => {
      if (!boundingRef.current || !isHovered) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = boundingRef.current;
      
      // Calculate center point of the element
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      // Calculate cursor distance from center
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      
      // Calculate percentage for rotation (limited by maxRotation)
      const rotateX = -1 * Math.min(maxRotation, Math.max(-maxRotation, distanceY / 10));
      const rotateY = Math.min(maxRotation, Math.max(-maxRotation, distanceX / 10));
      
      // Apply transforms with GSAP
      gsap.to(magneticElement, {
        x: distanceX * strength / 100,
        y: distanceY * strength / 100,
        rotateX: rotateX,
        rotateY: rotateY,
        duration: ease,
        ease: "power2.out"
      });
    };

    const resetPosition = () => {
      if (!magneticElement) return;
      
      gsap.to(magneticElement, {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    const handleMouseEnter = () => {
      boundingRef.current = magneticElement.getBoundingClientRect();
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      resetPosition();
    };
    
    window.addEventListener("mousemove", calculatePosition);
    magneticElement.addEventListener("mouseenter", handleMouseEnter);
    magneticElement.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", calculatePosition);
      magneticElement.removeEventListener("mouseenter", handleMouseEnter);
      magneticElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, ease, maxRotation, isHovered]);

  return (
    <div 
      ref={magneticRef}
      className={cn(
        "transform-gpu transition-transform",
        className
      )}
      style={{ 
        perspective: "1000px"
      }}
    >
      {children}
    </div>
  );
}
