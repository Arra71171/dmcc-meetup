
import { GlassCard } from "@/components/ui/glass-card";

export function InvitationSection() {
  return (
    <section id="invitation" className="w-full max-w-4xl">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-12 text-gradient-theme">
        An Invitation to Connect
      </h2>
      <GlassCard className="p-6 md:p-8">
        <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed mb-4">
          We are pleased to invite you to join us for the inaugural Meetei People&apos;s Convention, Delhi 2025, an event that marks our first step in bringing together the Meetei community in the National Capital Region. This gathering also celebrates the 2nd Rising Day of the Delhi Meetei Coordinating Committee (DMCC), as we reflect on our journey and look ahead with hope.
        </p>
        <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed">
          As we organize this convention for the first time, we do so with genuine enthusiasm to create a meaningful space where our community can come together, share experiences, and strengthen the bonds that connect us to our roots and to each other. We recognize that this is our beginning, and we are committed to learning and growing together through this experience.
        </p>
      </GlassCard>
    </section>
  );
}
