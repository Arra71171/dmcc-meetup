
'use client';

import { motion } from 'framer-motion';
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import Link from "next/link";
import { cn } from '@/lib/utils';
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center text-center py-20 md:py-28 lg:py-32 px-4 overflow-hidden min-h-[calc(100vh-5rem)]"
    >
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Abstract background for DMCC Convention hero section"
        layout="fill"
        objectFit="cover"
        className="-z-20 opacity-25 dark:opacity-15"
        data-ai-hint="abstract gradient purple orange"
        priority
      />
      
      <div className="relative z-10 flex flex-col items-center w-full">
        <GlassCard className="w-full max-w-3xl md:max-w-4xl lg:max-w-5xl p-6 py-8 md:p-10 md:py-12 text-center">
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
            <span className="block text-gradient-theme">Meetei People&apos;s Convention</span>
            <span className="block text-gradient-theme">Delhi 2025</span>
            <span className={cn(
              "block text-2xl md:text-3xl font-subtitle font-medium text-foreground/70 mt-4 normal-case tracking-normal",
              "text-glass-shadow"
              )}>
              Cum 2nd Rising Day of DMCC
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl font-body text-card-foreground/90 max-w-2xl mx-auto leading-relaxed"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.4 }}
            variants={fadeInVariants}
          >
            Celebrating Heritage • Building Unity • Shaping Tomorrow
          </motion.p>
          <motion.p
            className="mt-4 text-base md:text-lg font-body text-card-foreground/80 max-w-xl mx-auto"
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.5 }}
            variants={fadeInVariants}
          >
            Sunday, June 15th, 2025 | JNU Convention Center, New Delhi <br /> 10:00 AM - 6:00 PM
          </motion.p>
          
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, delay: 0.6 }}
            variants={fadeInVariants}
            className="mt-8"
          >
            <Link href="/#registration-form">
              <GradientBorderButton className="text-base px-8 py-4">
                Join Our Vibrant Community Celebration
              </GradientBorderButton>
            </Link>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
}
