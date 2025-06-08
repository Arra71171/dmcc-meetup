
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactMetricsSection } from "@/components/sections/impact-metrics-section";
import { EventHighlightsSection } from "@/components/sections/event-highlights-section";
import { RegistrationTiersSection } from "@/components/sections/registration-tiers-section";
import { RegistrationFormSection } from "@/components/sections/registration-form-section";
import { EventDetailsSection } from "@/components/sections/event-details-section";
import { ClosingRemarksSection } from "@/components/sections/closing-remarks-section";
import { Separator } from "@/components/ui/separator";


export default function Home() {
  return (
    <main className="w-full"> 
      <HeroSection />
      <ImpactMetricsSection />
      
      <div className="flex flex-col items-center w-full space-y-16 md:space-y-24 lg:space-y-32 py-16 md:py-24 lg:py-32 px-4">
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <EventHighlightsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <EventDetailsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <RegistrationTiersSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <RegistrationFormSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <ClosingRemarksSection />
      </div>

      <footer className="w-full py-12 mt-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-lora text-sm text-muted-foreground">
            © 2025 Delhi Meetei Coordinating Committee. All rights reserved.
          </p>
          <p className="font-lora text-xs text-muted-foreground mt-3">
            Organized with care by the DMCC Team
          </p>
        </div>
      </footer>
    </main>
  );
}
