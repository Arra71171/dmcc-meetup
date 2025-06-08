
import { RainbowBorderButton } from "@/components/ui/rainbow-border-button"; // Changed import
import { GlassCard } from "@/components/ui/glass-card";
import Link from 'next/link';

const tiers = [
  {
    name: "Professional",
    price: "₹500",
    description: "Working professionals and general attendees",
    cta: "Register as Professional",
  },
  {
    name: "Student",
    price: "₹300",
    description: "Students with valid ID",
    cta: "Register as Student",
  },
  {
    name: "Family",
    price: "₹800",
    description: "Two adults and children under 16",
    cta: "Get Family Pass",
  },
];

export function RegistrationTiersSection() {
  return (
    <section id="register" className="w-full max-w-6xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-4 text-gradient-theme">
        Registration Information
      </h2>
      <h3 className="text-2xl font-semibold text-center font-headline mb-10 md:mb-12 text-foreground/80">
        Registration Categories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {tiers.map((tier) => (
          <GlassCard key={tier.name} className="flex flex-col p-6 md:p-8 h-full">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-center text-foreground">{tier.name}</h3>
             <p className="text-4xl md:text-5xl font-bold font-headline text-center my-4 text-accent dark:text-accent">{tier.price}</p>
            <p className="font-lora text-foreground text-center mb-6 flex-grow">
              {tier.description}
            </p>
            <Link href="/#registration-form" passHref>
              <RainbowBorderButton asChild className="w-full mt-auto font-headline text-base py-3 px-6">
                {tier.cta}
              </RainbowBorderButton>
            </Link>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
