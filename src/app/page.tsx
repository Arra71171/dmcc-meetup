
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactMetricsSection } from "@/components/sections/impact-metrics-section";
import { EventHighlightsSection } from "@/components/sections/event-highlights-section";
import { RegistrationTiersSection } from "@/components/sections/registration-tiers-section";
import { CountdownUrgencySection } from "@/components/sections/countdown-urgency-section";
import { TestimonialSliderSection } from "@/components/sections/testimonial-slider-section";

import { FaqSection } from "@/components/sections/faq-section";
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
        <CountdownUrgencySection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <RegistrationTiersSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <TestimonialSliderSection />
        <Separator className="my-8 md:my-12 max-w-sm md:max-w-md mx-auto bg-foreground/10 dark:bg-foreground/5 h-0.5" />
        <FaqSection />
      </div>

      <footer className="w-full py-12 mt-16 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="font-lora text-sm text-gray-300 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Delhi Meetei Coordinating Committee (DMCC). All rights reserved.
          </p>
          <p className="font-lora text-xs text-gray-300 dark:text-gray-400 mt-2">
            Venue: JNU Convention Center, New Delhi | Date: Sunday, June 15, 2025 | Time: 10:00 AM - 6:00 PM
          </p>
          <div className="mt-4 font-lora text-xs text-gray-300 dark:text-gray-400 space-y-1">
            <p>Contact: <a href="mailto:dmcc.office11@gmail.com" className="text-accent dark:text-accent hover:underline">dmcc.office11@gmail.com</a> | Phone: <a href="tel:+919717921812" className="text-accent dark:text-accent hover:underline">+91 9717921812</a></p>
            <p>Payment: UPI ID: radheoinam@oksbi (Screenshot upload recommended for verification)</p>
            <p>Response Time: 24-48 hours during business days</p>
          </div>
          <p className="font-lora text-xs text-gray-300 dark:text-gray-400 mt-3">
            An initiative to foster culture, connection, and collaboration.
          </p>
        </div>
      </footer>
    </main>
  );
}

