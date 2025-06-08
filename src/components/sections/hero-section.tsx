import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";

export function HeroSection() {
  return (
    <section 
      id="hero" 
      className="relative w-full flex flex-col items-center justify-center text-center py-20 md:py-32 lg:py-40 px-4 overflow-hidden min-h-[70vh] md:min-h-[80vh]"
    >
      {/* Optional: Full-width background image or keep it clean with gradient */}
      {/* 
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Community Event Background"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="opacity-30 dark:opacity-20"
        data-ai-hint="abstract community celebration"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background dark:via-background/70 dark:to-background" />
      */}

      <div className="relative z-10 max-w-3xl">
        <GlassCard className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase font-headline tracking-tight">
            DMCC Community Gala
          </h1>
          <p className="mt-4 text-lg md:text-xl font-medium font-body text-foreground/80 dark:text-foreground/70">
            Celebrating Unity, Heritage, and Future Aspirations
          </p>
          <p className="mt-6 text-base md:text-lg font-lora text-foreground/90 dark:text-foreground/80 max-w-xl mx-auto">
            Join us for an unforgettable experience, weaving together the rich tapestry of our culture with inspiring visions for tomorrow. An event by the community, for the community.
          </p>
          <Button size="lg" className="mt-8 text-lg px-8 py-6 font-headline">
            Secure Your Place in History
          </Button>
        </GlassCard>
      </div>
    </section>
  );
}
