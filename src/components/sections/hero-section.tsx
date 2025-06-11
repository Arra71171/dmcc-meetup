
'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { AnimatedButton } from "@/components/ui/animated-button";
import { AnimatedText } from "@/components/ui/animated-text";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentCardRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.2, opacity: 0 },
        { scale: 1, opacity: 0.6, duration: 2, ease: "power3.out" }
      );
    }

    if (contentCardRef.current) {
      gsap.fromTo(
        contentCardRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );
    }

    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll('a, button');
      gsap.fromTo(buttons, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.8 });
    }

    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-background"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-accent to-secondary rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>
      
      {/* Background image with overlay */}
      <div ref={imageRef} className="absolute inset-0 -z-10">
        <Image
          src="/images/hero-banner.png"
          alt="Meetei Community Convention & DMCC Foundation 2025"
          fill={true}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-background/70 dark:bg-background/80"></div>
      </div>

      {/* Event date badge */}
      <div className="absolute top-8 right-8 bg-primary text-primary-foreground py-3 px-6 rounded-lg text-base font-bold shadow-lg z-20 flex items-center gap-2 border-2 border-border/30">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>JUNE 15, 2025</span>
      </div>

      {/* Main content grid layout */}
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-screen">
        {/* Left side - cultural motif */}
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-full border-r border-border/20"></div>
          </div>
          <div className="h-1/2 w-px bg-gradient-to-b from-transparent via-foreground/50 to-transparent absolute"></div>
        </div>
        
        {/* Center content */}
        <div className="lg:col-span-3 flex flex-col items-center justify-center py-20 md:py-0">
          <div 
            ref={contentCardRef}
            className="relative z-10 w-full max-w-3xl mx-auto text-center"
          >
            {/* Event name with animated text */}
            <div className="mb-6">
              <div className="inline-block px-4 py-1 bg-primary/20 backdrop-blur-sm text-primary-foreground text-sm font-medium rounded-full mb-4">
                DMCC PRESENTS
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6">
                <AnimatedText
                  text="MEETEI PEOPLE'S"
                  tag="span"
                  className="block text-foreground"
                  splitType="words"
                  staggerValue={0.05}
                  delay={0.5}
                />
                <AnimatedText
                  text="CONVENTION 2025"
                  tag="span"
                  className="block text-foreground"
                  splitType="words"
                  staggerValue={0.05}
                  delay={0.7}
                />
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                <AnimatedText
                  text="2ND RISING DAY OF DMCC"
                  tag="span"
                  className="text-xl sm:text-2xl text-foreground font-medium"
                  splitType="words"
                  staggerValue={0.05}
                  delay={0.9}
                />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
              </div>
            </div>

            {/* Event description */}
            <AnimatedText
              text="Connect with your cultural roots at Delhi's premier Meetei gathering. Join us to celebrate our heritage, strengthen community bonds, and shape our collective future through meaningful dialogue and cultural exchange."
              tag="p"
              className="text-base sm:text-lg text-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
              splitType="lines"
              delay={0.7}
              staggerValue={0.1}
            />

            {/* Registration button */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
                <AnimatedButton
                  asChild={true}
                  variant="default"
                  size="lg"
                  className="w-full max-w-[240px] h-14 text-lg font-medium text-center"
                  glowOnHover
                  disableHoverScale={true}
                  neonBorder={true}
                >
                  <Link href="/#register">
                    Register Now
                  </Link>
                </AnimatedButton>
                <AnimatedButton
                  asChild={true}
                  variant="outline"
                  size="lg"
                  className="w-full max-w-[240px] h-14 text-lg font-medium text-center"
                  glowOnHover
                  disableHoverScale={true}
                  neonBorder={true}
                >
                  <a
                    href="https://www.google.com/maps?q=28.5384,77.1659"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </AnimatedButton>
            </div>
          </div>
        </div>
        
        {/* Right side - cultural motif */}
        <div className="hidden lg:flex lg:col-span-1 items-center justify-center relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="w-full h-full border-l border-border/20"></div>
          </div>
          <div className="h-1/2 w-px bg-gradient-to-b from-transparent via-foreground/50 to-transparent absolute"></div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={chevronRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10 flex flex-col items-center group"
        onClick={() => {
          const nextSection = document.getElementById('features'); 
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: window.innerHeight * 0.9, behavior: 'smooth' });
          }
        }}
      >
        <span className="text-sm text-foreground/70 group-hover:text-foreground transition-colors duration-300 mb-2">Explore More</span>
        <div className="p-2 rounded-full bg-primary/20 backdrop-blur-sm group-hover:bg-primary/30 transition-all duration-300">
          <ChevronDown className="h-6 w-6 text-foreground/80 group-hover:text-foreground transition-colors duration-300" />
        </div>
      </div>
    </section>
  );
}
