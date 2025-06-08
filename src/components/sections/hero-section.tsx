
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full flex flex-col items-center justify-center text-center pt-10 md:pt-12 lg:pt-16 pb-20 md:pb-24 lg:pb-32 px-4 overflow-hidden min-h-[calc(100vh-5rem)]" // Adjusted min-h for new header height
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-semibold tracking-tight !leading-tight uppercase">
          <span className="block text-gradient-theme">MEETEI PEOPLE&apos;S</span>
          <span className="block text-gradient-theme">CONVENTION, DELHI 2025</span>
          <span className="block text-2xl md:text-3xl font-subtitle font-medium text-foreground/70 mt-4 normal-case tracking-normal">
            Cum 2nd Rising Day of DMCC
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-body text-foreground/80 max-w-2xl mx-auto leading-relaxed">
          Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow
        </p>
        
        <Link href="/#registration-form" passHref>
          <GradientBorderButton asChild className="mt-10 text-base px-8 py-4">
            Join Our Community Gathering
          </GradientBorderButton>
        </Link>
      </div>
    </section>
  );
}
