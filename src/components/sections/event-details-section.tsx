
'use client';

import { GlassCard } from "@/components/ui/glass-card";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownTimer } from '@/components/ui/countdown-timer';

export function EventDetailsSection() {
  const eventDate = new Date('2025-06-15T10:00:00');

  return (
    <section id="event-details" className="w-full px-4 py-20 md:py-28 mx-auto relative bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/3 right-1/3 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1/2 h-1/2 bg-gradient-to-tr from-secondary to-accent rounded-full blur-3xl"></div>
      </div>
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-border/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary/50"></div>
          <span className="text-foreground text-sm font-medium uppercase tracking-wider">Mark Your Calendar</span>
          <div className="h-px w-12 bg-primary/50"></div>
        </div>
        
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-10 md:mb-16 tracking-wide",
          "drop-shadow-md"
          )}>
          Event Details
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
        <GlassCard className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-card/80 border border-border hover:border-primary/20 transition-all duration-300">
          <CalendarDays className="w-10 h-10 text-foreground mb-4" />
          <h3 className="text-xl md:text-2xl font-subtitle font-medium mb-2 text-foreground drop-shadow-md">Date</h3>
          <p className="font-body text-base md:text-lg text-card-foreground">Sunday, June 15th, 2025</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-card/80 border border-border hover:border-primary/20 transition-all duration-300">
          <Clock className="w-10 h-10 text-foreground mb-4" />
          <h3 className="text-xl md:text-2xl font-subtitle font-medium mb-2 text-foreground drop-shadow-md">Time</h3>
          <p className="font-body text-base md:text-lg text-card-foreground">10:00 AM - 6:00 PM</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6 backdrop-blur-sm bg-card/80 border border-border hover:border-primary/20 transition-all duration-300">
          <MapPin className="w-10 h-10 text-foreground mb-4" />
          <h3 className="text-xl md:text-2xl font-subtitle font-medium mb-2 text-foreground drop-shadow-md">Venue</h3>
          <p className="font-body text-base md:text-lg text-card-foreground">JNU Convention Center</p>
          <p className="font-body text-base text-muted-foreground">New Delhi</p>
        </GlassCard>
      </div>
      <GlassCard className="mt-12 md:mt-16 p-6 text-center backdrop-blur-sm bg-card/80 border border-border hover:border-primary/20 transition-all duration-300">
        <h3 className="text-xl md:text-2xl font-subtitle font-medium mb-4 text-foreground drop-shadow-md">
          Don&apos;t Miss Out!
        </h3>
        <div className="flex justify-center">
            <CountdownTimer targetDate={eventDate} />
        </div>
        <p className="font-body text-base text-muted-foreground mt-4">
          Secure your place for this landmark community event.
        </p>
      </GlassCard>
      </div>
    </section>
  );
}
