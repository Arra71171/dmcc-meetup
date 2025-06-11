'use client';

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedTextProps {
  text: string;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  animateOnScroll?: boolean;
  splitType?: 'chars' | 'words' | 'lines';
  staggerValue?: number;
  delay?: number;
  once?: boolean;
  children?: React.ReactNode;
}

export function AnimatedText({
  text,
  tag = "h2",
  className,
  animateOnScroll = true,
  splitType = "lines", // Default to lines to avoid SplitText issues
  staggerValue = 0.02,
  delay = 0,
  once = true,
  children
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !textRef.current) return;
    if (once && hasAnimated.current) return;

    const el = textRef.current;

    try {
      if (!animateOnScroll) {
        // Animate immediately with delay - simple animation without text splitting
        const tl = gsap.timeline({ delay });

        tl.fromTo(
          el,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }
        );

        hasAnimated.current = true;
      } else {
        // Use ScrollTrigger for scroll-based animation
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
            once
          }
        });

        tl.fromTo(
          el,
          {
            y: 20,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay,
            ease: "power2.out"
          }
        );

        hasAnimated.current = true;
      }
    } catch (error) {
      console.warn('AnimatedText animation failed:', error);
      // Fallback: just show the text without animation
      if (el) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    }

    return () => {
      // cleanup if needed
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === el) {
          trigger.kill();
        }
      });
    };
  }, [isClient, text, animateOnScroll, splitType, staggerValue, delay, once]);
  
  // Dynamically create the correct tag element
  const Tag = tag as React.ElementType;

  // If the tag is a Fragment, we can't apply a ref or className for animation.
  // Fallback to a 'span' which is a neutral, animatable element.
  const RenderTag = Tag === React.Fragment ? 'span' : Tag;

  if (!isClient) {
    // On the server, we don't need the ref.
    return (
      <RenderTag className={className}>
        {text || children}
      </RenderTag>
    );
  }

  // On the client, attach the ref for GSAP animations.
  return (
    <RenderTag ref={textRef} className={className}>
      {text || children}
    </RenderTag>
  );
}
