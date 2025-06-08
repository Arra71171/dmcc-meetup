
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactMetricsSection } from "@/components/sections/impact-metrics-section";
import { EventHighlightsSection } from "@/components/sections/event-highlights-section";
import { RegistrationTiersSection } from "@/components/sections/registration-tiers-section";
import { RegistrationFormSection } from "@/components/sections/registration-form-section";
import { EventDetailsSection } from "@/components/sections/event-details-section";
import { ClosingRemarksSection } from "@/components/sections/closing-remarks-section";
import { Separator } from "@/components/ui/separator";
import { InvitationSection } from "@/components/sections/invitation-section";
import { GlassCard } from "@/components/ui/glass-card";


export default function Home() {
  return (
    <main className="w-full"> 
      <HeroSection />
      <ImpactMetricsSection />
      
      <div className="flex flex-col items-center w-full space-y-16 md:space-y-24 lg:space-y-32 py-16 md:py-24 lg:py-32 px-4">
        <InvitationSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-border/50 h-0.5" />
        <EventHighlightsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-border/50 h-0.5" />
        <EventDetailsSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-border/50 h-0.5" />
        <RegistrationTiersSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-border/50 h-0.5" />
        <RegistrationFormSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-border/50 h-0.5" />
        <ClosingRemarksSection />
      </div>

      <footer className="w-full py-12 mt-16 border-t border-border">
        <div className="container mx-auto px-4">
          <GlassCard className="max-w-3xl mx-auto p-6 md:p-8 text-center">
            <p className="font-body text-sm text-card-foreground/80">
              © 2025 Delhi Meetei Coordinating Committee. All rights reserved.
            </p>
            <p className="font-body text-xs text-muted-foreground mt-3">
              Organized with care by the DMCC Team
            </p>
          </GlassCard>
        </div>
      </footer>
    </main>
  );
}
