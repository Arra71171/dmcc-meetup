
'use client';

import { GlassCard } from "@/components/ui/glass-card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function EventDetailsSection() {
  return (
    <section id="event-details" className="w-full max-w-4xl px-4">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-10 md:mb-16 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        Event Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <GlassCard className="flex flex-col items-center text-center p-6">
          <CalendarDays className="w-10 h-10 text-accent mb-4" />
          <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-card-foreground", "text-glass-shadow")}>Date</h3>
          <p className="font-body text-lg text-card-foreground/80">Sunday, June 15th, 2025</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6">
          <Clock className="w-10 h-10 text-accent mb-4" />
          <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-card-foreground", "text-glass-shadow")}>Time</h3>
          <p className="font-body text-lg text-card-foreground/80">10:00 AM - 6:00 PM</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6">
          <MapPin className="w-10 h-10 text-accent mb-4" />
          <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-card-foreground", "text-glass-shadow")}>Venue</h3>
          <p className="font-body text-lg text-card-foreground/80">JNU Convention Center</p>
          <p className="font-body text-base text-muted-foreground">New Delhi</p>
        </GlassCard>
      </div>
      <GlassCard className="mt-12 md:mt-16 p-6 text-center">
        <p className="font-body text-xl text-card-foreground/90">
          This event concluded on <span className="font-semibold text-accent">Sunday, June 15th, 2025</span>.
        </p>
        <p className="font-body text-base text-muted-foreground mt-2">
          We thank everyone who participated and contributed to its success.
        </p>
      </GlassCard>
    </section>
  );
}
