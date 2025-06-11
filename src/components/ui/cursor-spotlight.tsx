"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CursorSpotlightProps {
  color?: string;
  size?: number;
  blur?: number;
  opacity?: number;
}

export function CursorSpotlight({
  color = "rgba(255, 196, 196, 0.4)", // Midnight Bloom coral color with opacity
  size = 200,
  blur = 100,
  opacity = 0.6,
}: CursorSpotlightProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create the cursor spotlight effect
  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;

    const spotlight = cursorRef.current;
    if (!spotlight) return;

    // Set initial styles
    gsap.set(spotlight, {
      width: size,
      height: size,
      background: color,
      filter: `blur(${blur}px)`,
      opacity: 0,
      x: -size / 2,
      y: -size / 2,
    });

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Animate the main spotlight
      gsap.to(spotlight, {
        x: x - size / 2,
        y: y - size / 2,
        opacity: opacity,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Hide cursor when leaving the page
    const handleMouseLeave = () => {
      gsap.to(spotlight, {
        opacity: 0,
        duration: 0.3,
      });
    };

    // Show cursor when entering the page
    const handleMouseEnter = () => {
      gsap.to(spotlight, {
        opacity: opacity,
        duration: 0.3,
      });
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Clean up
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isClient, color, size, blur, opacity]);

  if (!isClient) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed rounded-full pointer-events-none mix-blend-screen hidden md:block"
      style={{ zIndex: 99 }}
    />
  );
}
