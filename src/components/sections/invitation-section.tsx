
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function InvitationSection() {
  return (
    <section id="invitation" className="w-full max-w-4xl">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-10 md:mb-12 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        A Look Back at Our Connection
      </h2>
      <GlassCard className="p-6 md:p-8">
        <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
          We were delighted to host this extraordinary gathering, which brought together over 500 members of the Meetei community across Delhi NCR. This momentous occasion celebrated both our cultural heritage and commemorated the 2nd Rising Day of the Delhi Meetei Co-ordinating Committee (DMCC) - a dual celebration of community pride and organizational milestone. Thank you for being a part of it!
        </p>
      </GlassCard>
    </section>
  );
}
