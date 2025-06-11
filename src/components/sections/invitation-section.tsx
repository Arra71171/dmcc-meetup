'use client';

import { useRef, useLayoutEffect } from 'react';
import { Users, Sparkles, Ticket } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function InvitationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.bento-card');
      if (cards.length === 0) return;

      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-foreground" />,
      title: 'Celebrate Heritage',
      description:
        'Commemorate the 2nd Rising Day of the DMCC and celebrate our rich cultural heritage and community pride.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-accent" />,
      title: 'Build Connections',
      description:
        'Join leaders, professionals, and families to foster connections, share insights, and build a stronger future together.',
    },
  ];

  return (
    <section ref={sectionRef} id="invitation" className="py-24 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Main Invitation Card (spans 2 columns) */}
          <div className="bento-card p-8 flex flex-col justify-center">
            <p className="font-semibold text-foreground uppercase tracking-widest">
              An Invitation
            </p>
            <h2 className="mt-2 text-4xl md:text-5xl font-bold font-headline text-foreground tracking-tight">
              Join a Landmark Celebration
            </h2>
            <p className="mt-6 text-base sm:text-lg text-foreground/80 max-w-2xl">
              Join an extraordinary gathering designed to unite the Meetei community across Delhi NCR. Your presence will make this event truly special.
            </p>
            <Link href="/#register">
              <button className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors w-fit">
                <Ticket size={20} />
                Register Now
              </button>
            </Link>
          </div>

          {/* Video Player */}
          <div className="bento-card overflow-hidden rounded-2xl flex justify-center items-center bg-black/50 p-0">
            <video
              className="w-auto h-full max-h-[500px] object-contain"
              src="/videos/DMCC.mp4"
              controls
              playsInline
            />
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bento-card glass-card p-8 flex flex-col items-start gap-4 h-full">
              <div className={`flex-shrink-0 p-3 rounded-full ${feature.title === 'Celebrate Heritage' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-base text-foreground/80 mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
