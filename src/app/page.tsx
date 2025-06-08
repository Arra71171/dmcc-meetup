import { HeroSection } from "@/components/sections/hero-section";
import { ImpactMetricsSection } from "@/components/sections/impact-metrics-section";
import { EventHighlightsSection } from "@/components/sections/event-highlights-section";
import { RegistrationTiersSection } from "@/components/sections/registration-tiers-section";
import { CountdownUrgencySection } from "@/components/sections/countdown-urgency-section";
import { TestimonialSliderSection } from "@/components/sections/testimonial-slider-section";
import { PastEventsGallerySection } from "@/components/sections/past-events-gallery-section";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <HeroSection />
      
      <div className="flex flex-col items-center w-full space-y-16 md:space-y-24 lg:space-y-32 py-16 md:py-24 lg:py-32">
        <ImpactMetricsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <EventHighlightsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <CountdownUrgencySection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <RegistrationTiersSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <TestimonialSliderSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <PastEventsGallerySection />
      </div>

      <footer className="w-full py-12 mt-16 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-lora text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DMCC Community. All rights reserved.
          </p>
          <p className="font-lora text-xs text-muted-foreground mt-1">
            An initiative to foster culture, connection, and collaboration.
          </p>
        </div>
      </footer>
    </main>
  );
}
