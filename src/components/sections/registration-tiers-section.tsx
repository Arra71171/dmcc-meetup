
'use client'; 

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
// useRouter and useAuth are no longer needed as registration is closed
// import { useAuth } from '@/contexts/auth-context'; 
// import { useRouter } from 'next/navigation'; 

const tiers = [
  {
    name: "Students",
    price: "₹100",
    description: "For students with valid ID.",
    value: "student", 
  },
  {
    name: "Professionals",
    price: "₹299",
    description: "For working professionals and general attendees.",
    value: "professional",
  },
  {
    name: "Families",
    price: "₹499",
    description: "Covered two adults and children under 16.", 
    value: "family",
  },
  {
    name: "Others",
    price: "₹100",
    description: "For other attendees not covered above.",
    value: "others",
  },
];

export function RegistrationTiersSection() {
  // const { currentUser, openAuthDialog } = useAuth(); // Not needed
  // const router = useRouter(); // Not needed

  // const handleTierClick = (tierValue: string) => { // Not needed
  //   if (!currentUser) {
  //     openAuthDialog();
  //   } else {
  //     router.push(`/register/${tierValue}`); 
  //   }
  // };

  return (
    <section id="register" className="w-full max-w-6xl px-4">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-4 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        Event Participation Summary
      </h2>
      <p className={cn(
        "text-lg font-body text-center mb-10 md:mb-12 text-foreground/80", 
        "text-glass-shadow"
        )}>
        We were delighted by the enthusiastic participation from our community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
        {tiers.map((tier) => (
          <GlassCard key={tier.name} className="flex flex-col p-6 md:p-8 h-full">
            <h3 className={cn("text-2xl md:text-3xl font-subtitle font-medium text-center text-card-foreground", "text-glass-shadow")}>{tier.name}</h3>
             <p className="text-4xl md:text-5xl font-headline font-semibold text-center my-4 text-accent">{tier.price}</p>
            <p className="font-body text-card-foreground/80 text-center mb-6 text-sm leading-relaxed">
              {tier.description}
            </p>
            {/* CTA Button removed */}
            <p className="font-body text-card-foreground/70 text-center text-xs mt-auto pt-4 border-t border-border/30">
              Registrations for this tier are now closed.
            </p>
          </GlassCard>
        ))}
      </div>
      <p className={cn(
        "text-center text-xl font-subtitle font-medium mt-10 text-accent",
        "text-glass-shadow"
        )}>
        Over 140 community members participated in this memorable event!
      </p>
    </section>
  );
}
    
