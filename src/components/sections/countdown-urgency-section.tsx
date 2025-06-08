
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { UrgencyMeter } from "@/components/ui/urgency-meter";
import { GlassCard } from "@/components/ui/glass-card";

export function CountdownUrgencySection() {
  // Event Date: June 15, 2025
  const targetEventDate = new Date("2025-06-15T00:00:00");

  return (
    <section id="countdown" className="w-full max-w-3xl px-4">
      <GlassCard className="flex flex-col items-center space-y-8 p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase text-gradient-theme">
          Don&apos;t Delay - Register Today!
        </h2>
        <p className="text-center font-lora text-lg text-foreground/80 dark:text-foreground/70 -mt-4">
          The countdown has begun. Secure your spot for an event that promises to be historic. Limited seats available!
        </p>
        <CountdownTimer targetDate={targetEventDate} />
        <div className="w-full max-w-md pt-4">
          <UrgencyMeter value={28} /> {/* Calculated from 140 pre-registered / 500 assumed capacity */}
           <p className="text-xs text-muted-foreground mt-1 font-lora text-center">
            140+ participants already pre-registered! Seats are limited to ensure quality engagement. Register early!
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
