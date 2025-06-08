import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle2 } from "lucide-react";

const tiers = [
  {
    name: "Professional",
    price: "$199",
    features: [
      "Full Access to All Sessions",
      "Networking Dinner Invitation",
      "Exclusive Workshop Materials",
      "Welcome Kit",
    ],
    cta: "Register as Professional",
  },
  {
    name: "Student",
    price: "$99",
    features: [
      "Full Access to All Sessions",
      "Dedicated Student Workshops",
      "Digital Resource Pack",
      "Community Forum Access",
    ],
    disclaimer: "Valid student ID required.",
    cta: "Register as Student",
  },
  {
    name: "Family Pass",
    price: "$349",
    description: "(2 Adults + 2 Children)",
    features: [
      "Full Access for 2 Adults",
      "Access to Kids Zone for 2 Children",
      "Family-Friendly Activities",
      "Special Family Welcome Pack",
    ],
    cta: "Get Family Pass",
  },
];

export function RegistrationTiersSection() {
  return (
    <section id="register" className="w-full max-w-6xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16">
        Join The Celebration
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
        {tiers.map((tier) => (
          <GlassCard key={tier.name} className="flex flex-col p-6 md:p-8 h-full">
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-center">{tier.name}</h3>
            {tier.description && <p className="text-sm text-center font-body text-muted-foreground mb-2">{tier.description}</p>}
            <p className="text-4xl md:text-5xl font-bold font-headline text-center my-4 text-accent dark:text-accent-foreground">{tier.price}</p>
            <ul className="space-y-2 my-6 flex-grow">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start font-lora">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            {tier.disclaimer && <p className="text-xs font-lora text-muted-foreground text-center mt-4 mb-2">{tier.disclaimer}</p>}
            <Button size="lg" className="w-full mt-auto font-headline">{tier.cta}</Button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
