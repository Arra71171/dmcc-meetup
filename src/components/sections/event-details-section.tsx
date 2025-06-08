
import { GlassCard } from "@/components/ui/glass-card";
import { CalendarDays, Clock, MapPin } from "lucide-react";

export function EventDetailsSection() {
  return (
    <section id="event-details" className="w-full max-w-4xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        Event Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        <GlassCard className="flex flex-col items-center text-center p-6">
          <CalendarDays className="w-12 h-12 text-accent dark:text-accent-foreground mb-4" />
          <h3 className="text-2xl font-semibold font-headline mb-2">Date</h3>
          <p className="font-lora text-lg text-foreground">Sunday, June 15th, 2025</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6">
          <Clock className="w-12 h-12 text-accent dark:text-accent-foreground mb-4" />
          <h3 className="text-2xl font-semibold font-headline mb-2">Time</h3>
          <p className="font-lora text-lg text-foreground">10:00 AM - 6:00 PM</p>
        </GlassCard>
        <GlassCard className="flex flex-col items-center text-center p-6">
          <MapPin className="w-12 h-12 text-accent dark:text-accent-foreground mb-4" />
          <h3 className="text-2xl font-semibold font-headline mb-2">Venue</h3>
          <p className="font-lora text-lg text-foreground">JNU Convention Center</p>
          <p className="font-lora text-md text-muted-foreground">New Delhi</p>
        </GlassCard>
      </div>
    </section>
  );
}
