import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export const revealAnimation = (element: Element | string, delay: number = 0) => {
  return gsap.fromTo(
    element,
    { 
      y: 50, 
      opacity: 0 
    },
    { 
      y: 0, 
      opacity: 1, 
      duration: 1, 
      delay, 
      ease: "power3.out"
    }
  );
};

export const textRevealAnimation = (element: Element | string) => {
  if (typeof window === 'undefined') return null;

  // Simple text reveal animation without SplitText dependency
  return gsap.fromTo(
    element,
    {
      y: 30,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }
  );
};

export const buttonHoverAnimation = (element: HTMLElement, disableScale: boolean = false) => {
  const timeline = gsap.timeline({ paused: true });
  if (!disableScale) {
    timeline.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
    });
  }

  const handleMouseEnter = () => timeline.play();
  const handleMouseLeave = () => timeline.reverse();

  element.addEventListener("mouseenter", handleMouseEnter);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mouseenter", handleMouseEnter);
    element.removeEventListener("mouseleave", handleMouseLeave);
    timeline.kill();
  };
};

export const createScrollAnimation = (element: string | Element, options = {}) => {
  if (typeof window === 'undefined') return null;
  
  const defaults = {
    trigger: element,
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none none"
  };
  
  return ScrollTrigger.create({
    ...defaults,
    ...options,
    animation: gsap.fromTo(
      element,
      { 
        y: 50, 
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: "power2.out" 
      }
    )
  });
};

export const magneticEffect = (element: HTMLElement, strength = 0.6) => {
  const bounds = element.getBoundingClientRect();
  const centerX = bounds.left + bounds.width / 2;
  const centerY = bounds.top + bounds.height / 2;

  const handleMouseMove = (e: MouseEvent) => {
    const distX = (e.clientX - centerX) * strength;
    const distY = (e.clientY - centerY) * strength;
    
    gsap.to(element, { 
      x: distX, 
      y: distY, 
      duration: 0.6,
      ease: "power2.out" 
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, { 
      x: 0, 
      y: 0, 
      duration: 0.6,
      ease: "elastic.out(1, 0.3)" 
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);
  
  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

export const pageLoadAnimation = () => {
  const timeline = gsap.timeline();
  
  timeline
    .fromTo(
      "header",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(
      "main > *:first-child",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    )
    .fromTo(
      ".animate-on-load",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" },
      "-=0.5"
    );
    
  return timeline;
};
