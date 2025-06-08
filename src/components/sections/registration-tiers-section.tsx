
import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import { GlassCard } from "@/components/ui/glass-card";
import { UrgencyMeter } from "@/components/ui/urgency-meter";
import Link from 'next/link';
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Professional",
    price: "₹500",
    description: "Working professionals and general attendees",
    cta: "Register as Professional",
    urgency: 60,
    urgencyNote: "Spots are filling steadily!"
  },
  {
    name: "Student",
    price: "₹300",
    description: "Students with valid ID",
    cta: "Register as Student",
    urgency: 40,
    urgencyNote: "Good availability for students."
  },
  {
    name: "Family",
    price: "₹800",
    description: "Two adults and children under 16",
    cta: "Get Family Pass",
    urgency: 75,
    urgencyNote: "Family passes are popular!"
  },
];

export function RegistrationTiersSection() {
  return (
    <section id="register" className="w-full max-w-6xl px-4">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-4 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        Registration Information
      </h2>
      <h3 className={cn(
        "text-2xl font-subtitle font-medium text-center mb-10 md:mb-12 text-foreground/80",
        "text-glass-shadow"
        )}>
        Registration Categories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {tiers.map((tier) => (
          <GlassCard key={tier.name} className="flex flex-col p-6 md:p-8 h-full">
            <h3 className={cn("text-2xl md:text-3xl font-subtitle font-medium text-center text-card-foreground", "text-glass-shadow")}>{tier.name}</h3>
             <p className="text-4xl md:text-5xl font-headline font-semibold text-center my-4 text-accent">{tier.price}</p>
            <p className="font-body text-card-foreground/80 text-center mb-6 text-sm leading-relaxed">
              {tier.description}
            </p>
            <div className="my-4">
              <UrgencyMeter value={tier.urgency} />
              <p className="text-xs text-center mt-2 font-body text-muted-foreground">{tier.urgencyNote}</p>
            </div>
            <Link href="/#registration-form" passHref className="mt-auto">
              <GradientBorderButton asChild className="w-full text-sm py-3 px-6">
                {tier.cta}
              </GradientBorderButton>
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
