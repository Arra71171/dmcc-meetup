
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center text-center py-24 md:py-32 lg:py-48 px-4 overflow-hidden min-h-[calc(100vh-4rem)]"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase font-headline tracking-tight !leading-tight">
          <span className="block text-gradient-theme">MEETEI PEOPLE&apos;S</span>
          <span className="block text-gradient-theme">CONVENTION, DELHI 2025</span>
          <span className="block text-xl md:text-2xl lg:text-3xl font-medium text-gray-300 dark:text-gray-400 mt-3 normal-case tracking-normal">
            Cum 2nd Rising Day of DMCC
          </span>
        </h1>
        <p className="mt-4 text-lg md:text-xl font-medium font-body text-gray-200 dark:text-gray-300 max-w-2xl mx-auto">
          Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow
        </p>
        
        <Link href="/#registration-form">
          <GradientBorderButton asChild className="mt-10 text-lg px-8 py-4 font-headline">
            Join Our Community Gathering
          </GradientBorderButton>
        </Link>
      </div>
    </section>
  );
}

