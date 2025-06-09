
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Ticket, Users, Sparkles } from "lucide-react";

export function InvitationSection() {
  return (
    <section id="invitation" className="w-full max-w-5xl px-4 py-16 md:py-24 mx-auto">
      <h2 className={cn(
        "text-4xl md:text-5xl font-headline font-semibold text-center uppercase mb-12 md:mb-16 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        You Are Invited!
      </h2>
      <GlassCard className="p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <Ticket className="w-16 h-16 text-accent mb-6" />
          
          <p className="font-subtitle text-xl md:text-2xl text-card-foreground/95 mb-8 leading-snug max-w-3xl">
            Join us for an extraordinary gathering designed to unite over <span className="font-bold text-accent">500 members</span> of the Meetei community across Delhi NCR.
          </p>
          
          <div className="space-y-8 font-body text-lg text-card-foreground/85 leading-relaxed max-w-3xl">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="p-3 rounded-full bg-primary/10 inline-flex">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <p className="flex-1">
                This momentous occasion will celebrate our <span className="font-semibold text-primary">rich cultural heritage</span> and commemorate the <span className="font-semibold text-primary">2nd Rising Day of the Delhi Meetei Co-ordinating Committee (DMCC)</span> – a dual celebration of community pride and organizational milestone.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-3 sm:space-y-0 sm:space-x-4">
               <div className="p-3 rounded-full bg-accent/10 inline-flex">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <p className="flex-1">
                We are bringing together leaders, professionals, students, and families to <span className="font-semibold">foster connections, share insights, and build a stronger future</span> for our community. Your presence will make this event truly special.
              </p>
            </div>
          </div>

          <p className="mt-10 font-subtitle text-xl text-primary font-medium">
            Be part of this landmark community celebration!
          </p>
        </div>
      </GlassCard>
    </section>
  );
}
