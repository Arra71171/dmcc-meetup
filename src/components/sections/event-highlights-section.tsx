
'use client';

import { useRef, useLayoutEffect } from 'react';
import { AnimatedCard } from "@/components/ui/animated-card";
import { AnimatedText } from "@/components/ui/animated-text";
import Image from 'next/image';
import { Users, Music, Drama, Megaphone, Utensils, MessageSquare, Heart, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import guestImage from "@/../public/images/guest.png";

// Define types for the Bento Grid items
interface HighlightItem {
  type: 'item';
  icon: React.ReactNode;
  title: string;
  className: string;
}

interface HighlightImage {
  type: 'image';
  src: string;
  alt: string;
  title: string;
  className: string;
}

type Highlight = HighlightItem | HighlightImage;

const highlights: Highlight[] = [
  {
    type: 'item',
    icon: <Users className="w-8 h-8 text-foreground" />,
    title: "Assembly of the Ereichas",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    type: 'item',
    icon: <Music className="w-8 h-8 text-foreground" />,
    title: "Welcome Song by Hamom Sadananda",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    type: 'image',
    src: guestImage.src,
    alt: 'Hamom Sadananda - Singer, Artist & Social Activist',
    title: 'Special Guest: Hamom Sadananda',
    className: "md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    type: 'item',
    icon: <Drama className="w-8 h-8 text-foreground" />,
    title: "Cultural Performance by Children",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    type: 'item',
    icon: <Megaphone className="w-8 h-8 text-foreground" />,
    title: "Meetei People’s Convention Declaration",
    className: "md:col-span-1 lg:col-span-2",
  },
  {
    type: 'item',
    icon: <Utensils className="w-8 h-8 text-foreground" />,
    title: "Lunch Break (Special Khechree)",
    className: "md:col-span-2 lg:col-span-3",
  },
  {
    type: 'item',
    icon: <MessageSquare className="w-8 h-8 text-foreground" />,
    title: "Discussion on Meetei Yumpham",
    className: "md:col-span-2 lg:col-span-3",
  },
  {
    type: 'item',
    icon: <Heart className="w-8 h-8 text-foreground" />,
    title: "Appreciation for Meetei Ereichashing",
    className: "md:col-span-2 lg:col-span-3",
  },
  {
    type: 'item',
    icon: <Handshake className="w-8 h-8 text-foreground" />,
    title: "Vote of Thanks",
    className: "md:col-span-2 lg:col-span-3",
  },
];

export function EventHighlightsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<HTMLDivElement[]>([]);
  
  gsap.registerPlugin(ScrollTrigger);

  // GSAP animations setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate icons when scrolled into view
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.fromTo(
          icon,
          { scale: 0.5, opacity: 0, rotation: -15 },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: icon,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.1,
          }
        );

        // Hover animations
        const onEnter = () => gsap.to(icon, { rotation: 15, scale: 1.1, duration: 0.4, ease: "power2.out" });
        const onLeave = () => gsap.to(icon, { rotation: 0, scale: 1, duration: 0.4, ease: "power2.out" });

        icon.addEventListener("mouseenter", onEnter);
        icon.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup!
  }, []);
  
  return (
    <section ref={sectionRef} id="highlights" className="w-full px-4 py-20 md:py-28 mx-auto relative bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-secondary to-accent rounded-full blur-3xl"></div>
      </div>
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-border/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary/50"></div>
          <span className="text-foreground text-sm font-medium uppercase tracking-wider">Event Highlights</span>
          <div className="h-px w-12 bg-primary/50"></div>
        </div>
        
        <AnimatedText
          text="Event Activities"
          tag="h2"
          className={cn(
            "text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-10 md:mb-16 tracking-wide",
            "drop-shadow-md"
          )}
          splitType="words"
          delay={0.3}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 auto-rows-[14rem] gap-4">
        {highlights.map((highlight, index) => {
          if (highlight.type === 'image') {
            return (
              <AnimatedCard
                key={highlight.title}
                className={cn("group relative flex flex-col justify-end overflow-hidden", highlight.className)}
                variant="spotlight"
                animationDelay={0.2 + index * 0.1}
                spotlight={true}
              >
                <Image
                  src={highlight.src}
                  alt={highlight.alt}
                  fill
                  className="object-cover object-center w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="relative z-10 p-4 md:p-6">
                  <h3 className="text-2xl font-headline font-semibold text-white drop-shadow-lg">
                    {highlight.title}
                  </h3>
                </div>
              </AnimatedCard>
            );
          }

          return (
            <AnimatedCard
              key={highlight.title}
              className={cn("flex flex-col items-center justify-center text-center p-6", highlight.className)}
              variant="spotlight"
              animationDelay={0.2 + index * 0.1}
              spotlight={true}
            >
              <div className="p-4 rounded-full bg-primary/20 mb-4">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-subtitle font-medium text-foreground">
                {highlight.title}
              </h3>
            </AnimatedCard>
          );
        })}
      </div>
    </div>
  </section>
  );
}
