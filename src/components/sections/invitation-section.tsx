
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function InvitationSection() {
  return (
    <section id="invitation" className="w-full max-w-4xl">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-10 md:mb-12 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        An Invitation to Connect
      </h2>
      <GlassCard className="p-6 md:p-8">
        <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
          We warmly invite you to be part of this extraordinary gathering that brings together over 500 members of the Meetei community across Delhi NCR. This momentous occasion celebrates both our cultural heritage and commemorates the 2nd Rising Day of the Delhi Meetei Co-ordinating Committee (DMCC) - a dual celebration of community pride and organizational milestone.
        </p>
      </GlassCard>
    </section>
  );
}
