'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { Users, Feather, Accessibility, Megaphone, Target, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ImpactMetricsSection() { // This is the "About DMCC" section
  const sectionRef = useRef<HTMLElement>(null);
  const iconRefs = useRef<(SVGSVGElement | null)[]>([]);

  // GSAP animations setup
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate icons when scrolled into view
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.fromTo(
          icon,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: index * 0.1,
          }
        );
      });

      // Hover animations
      const hoverIcons = iconRefs.current.filter(icon => icon);
      hoverIcons.forEach(icon => {
        const parent = icon?.parentElement;
        if (!parent) return;

        const onEnter = () => gsap.to(icon, { scale: 1.2, rotation: 10, duration: 0.3, ease: 'back.out(1.7)' });
        const onLeave = () => gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' });

        parent.addEventListener('mouseenter', onEnter);
        parent.addEventListener('mouseleave', onLeave);
      });

    }, sectionRef); // Scope the context to the section

    return () => ctx.revert(); // Cleanup function for all animations and triggers in context
  }, []);

  const coreValues = [
    {
      icon: Users,
      title: "Unity",
      description: "Building collective strength through community connection."
    },
    {
      icon: Feather,
      title: "Cultural Pride",
      description: "Preserving and celebrating our unique heritage."
    },
    {
      icon: Accessibility,
      title: "Inclusivity",
      description: "Creating welcoming spaces for all community members."
    },
    {
      icon: Megaphone,
      title: "Advocacy",
      description: "Promoting peaceful coexistence and community rights."
    }
  ];

  return (
    <section ref={sectionRef} id="about-dmcc" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-foreground">About DMCC</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to know about our community
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Discover our mission, vision, and the core values that drive our community forward to create a vibrant, inclusive, and supportive environment for all.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Mission Card */}
            <div className="lg:col-span-1 glass-card p-8">
              <div className="flex items-center gap-x-4 mb-4">
                <Target ref={(el: SVGSVGElement | null) => { if(el) iconRefs.current[0] = el; }} size={32} className="text-foreground" />
                <h3 className="text-2xl font-semibold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground">
                To foster a vibrant and inclusive community by providing a platform for connection, collaboration, and growth.
              </p>
            </div>

            {/* Vision Card */}
            <div className="lg:col-span-2 glass-card p-8">
              <div className="flex items-center gap-x-4 mb-4">
                <Eye ref={(el: SVGSVGElement | null) => { if(el) iconRefs.current[1] = el; }} size={32} className="text-foreground" />
                <h3 className="text-2xl font-semibold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground">
                To be the leading community for developers and creatives, renowned for our supportive environment, impactful initiatives, and commitment to continuous learning.
              </p>
            </div>

            {/* Core Values Cards */}
            {coreValues.map((value, index) => (
              <div key={value.title} className="glass-card p-8">
                <div className="flex items-center gap-x-4 mb-4">
                  <value.icon ref={(el: SVGSVGElement | null) => { if(el) iconRefs.current[index + 2] = el; }} size={32} className="text-foreground" />
                  <h4 className="text-xl font-semibold text-foreground">{value.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}