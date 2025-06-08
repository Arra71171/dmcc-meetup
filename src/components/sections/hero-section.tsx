
'use client';

import { motion } from 'framer-motion';
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import Link from "next/link";
import { cn } from '@/lib/utils';
import { CountdownTimer } from '@/components/ui/countdown-timer';

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  const eventDate = new Date('2025-06-15T10:00:00'); // June 15th, 2025, 10:00 AM

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center text-center pt-10 md:pt-12 lg:pt-16 pb-12 md:pb-16 lg:pb-20 px-4 overflow-hidden min-h-[calc(100vh-5rem)]" // Adjusted min-h & padding
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl font-headline font-semibold tracking-tight !leading-tight uppercase",
            "text-glass-shadow"
          )}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.2 }}
          variants={fadeInVariants}
        >
          <span className="block text-gradient-theme">MEETEI PEOPLE&apos;S</span>
          <span className="block text-gradient-theme">CONVENTION, DELHI 2025</span>
          <span className={cn(
            "block text-2xl md:text-3xl font-subtitle font-medium text-foreground/70 mt-4 normal-case tracking-normal",
            "text-glass-shadow"
            )}>
            Cum 2nd Rising Day of DMCC
          </span>
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl font-body text-foreground/80 max-w-2xl mx-auto leading-relaxed"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.4 }} // Staggered delay
          variants={fadeInVariants}
        >
          Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow
        </motion.p>
        
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.6 }}
          variants={fadeInVariants}
          className="mt-8" // Apply margin here to the motion div
        >
          <Link href="/#registration-form">
            <GradientBorderButton className="text-base px-8 py-4">
              Join Our Community Gathering
            </GradientBorderButton>
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, delay: 0.8 }}
          variants={fadeInVariants}
          className="mt-12 md:mt-16 flex justify-center"
        >
          <CountdownTimer targetDate={eventDate} />
        </motion.div>
      </div>
    </section>
  );
}
