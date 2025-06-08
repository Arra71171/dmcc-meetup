
'use client'; 

import { GradientBorderButton } from "@/components/ui/gradient-border-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAuth } from '@/contexts/auth-context'; 
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation'; // Import useRouter

const tiers = [
  {
    name: "Students",
    price: "₹100",
    description: "Students with valid ID",
    cta: "Register as Student",
    value: "student", 
  },
  {
    name: "Professionals",
    price: "₹299",
    description: "Working professionals and general attendees",
    cta: "Register as Professional",
    value: "professional",
  },
  {
    name: "Families",
    price: "₹499",
    description: "Two adults and children under 16", 
    cta: "Get Family Pass",
    value: "family",
  },
  {
    name: "Others",
    price: "₹100",
    description: "For other attendees not covered above",
    cta: "Register Now",
    value: "others",
  },
];

export function RegistrationTiersSection() {
  const { currentUser, openAuthDialog } = useAuth();
  const router = useRouter(); // Initialize router

  const handleTierClick = (tierValue: string) => {
    if (!currentUser) {
      openAuthDialog();
    } else {
      router.push(`/register/${tierValue}`); // Navigate to specific form page
    }
  };

  return (
    <section id="register" className="w-full max-w-6xl px-4">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-4 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        Event Registration
      </h2>
      <p className={cn(
        "text-lg font-body text-center mb-10 md:mb-12 text-foreground/80", 
        "text-glass-shadow"
        )}>
        We believe in making this event accessible to everyone while maintaining quality.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
        {tiers.map((tier) => (
          <GlassCard key={tier.name} className="flex flex-col p-6 md:p-8 h-full">
            <h3 className={cn("text-2xl md:text-3xl font-subtitle font-medium text-center text-card-foreground", "text-glass-shadow")}>{tier.name}</h3>
             <p className="text-4xl md:text-5xl font-headline font-semibold text-center my-4 text-accent">{tier.price}</p>
            <p className="font-body text-card-foreground/80 text-center mb-6 text-sm leading-relaxed">
              {tier.description}
            </p>
            <GradientBorderButton
              onClick={() => handleTierClick(tier.value)} 
              className="w-full text-sm py-3 px-6 mt-auto" 
            >
              <span>{tier.cta}</span> 
            </GradientBorderButton>
          </GlassCard>
        ))}
      </div>
      <p className={cn(
        "text-center text-xl font-subtitle font-medium mt-10 text-accent",
        "text-glass-shadow"
        )}>
        Join 140+ community members who have already registered!
      </p>
    </section>
  );
}
    
