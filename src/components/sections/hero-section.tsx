import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative w-full flex flex-col items-center justify-center text-center py-24 md:py-32 lg:py-48 px-4 overflow-hidden min-h-[calc(100vh-4rem)]" // Adjusted min-height for header
    >
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Community Event Background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="opacity-10 dark:opacity-5" // Reduced opacity for darker effect
        data-ai-hint="abstract community celebration"
      />
      <div className="absolute inset-0 bg-black/70 dark:bg-black/80 z-0" /> {/* Dark overlay */}
      
      <div className="relative z-10 max-w-4xl mx-auto"> {/* Increased max-width */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase font-headline tracking-tight !leading-tight">
          <span className="block text-gradient-theme">MEETEI PEOPLE&apos;S</span>
          <span className="block text-gradient-theme">CONVENTION, DELHI 2025</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl font-medium font-body text-foreground/80 dark:text-foreground/70 max-w-2xl mx-auto">
          Uniting Heritage, Empowering Future
        </p>
        <p className="mt-8 text-base md:text-lg font-lora text-foreground/70 dark:text-foreground/60 max-w-3xl mx-auto">
          Join us for the Meetei People&apos;s Convention, Delhi 2025, a landmark gathering on our 2nd Rising Day. This event, set for June 15, 2025, at JNU Convention Center, celebrates our rich heritage and charts a course for a vibrant future. Be part of a historic moment for community empowerment and cultural renaissance in the nation&apos;s capital.
        </p>
        <GradientBorderButton className="mt-10 text-lg px-8 py-4 font-headline">
          SECURE YOUR PLACE IN HISTORY
        </GradientBorderButton>
      </div>
    </section>
  );
}
