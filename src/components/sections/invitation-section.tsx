
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function InvitationSection() {
  return (
    <section id="invitation" className="w-full max-w-4xl">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-10 md:mb-12 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        You Are Invited!
      </h2>
      <GlassCard className="p-6 md:p-8">
        <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
          Join us for an extraordinary gathering designed to unite over 500 members of the Meetei community across Delhi NCR. This momentous occasion will celebrate our rich cultural heritage and commemorate the 2nd Rising Day of the Delhi Meetei Co-ordinating Committee (DMCC) – a dual celebration of community pride and organizational milestone.
        </p>
        <p className="font-body text-lg text-card-foreground/90 leading-relaxed mt-4">
          We are bringing together leaders, professionals, students, and families to foster connections, share insights, and build a stronger future for our community. Your presence will make this event truly special.
        </p>
      </GlassCard>
    </section>
  );
}
