'use client'; 

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/auth-context'; 
import { useRouter } from 'next/navigation'; 
import { GradientBorderButton } from "../ui/gradient-border-button";

const tiers = [
  {
    name: "Students",
    price: "₹100",
    description: "For students with valid ID. Access to all sessions and cultural events.",
    value: "student", 
  },
  {
    name: "Professionals",
    price: "₹299",
    description: "For working professionals and general attendees. Includes networking opportunities.",
    value: "professional",
  },
  {
    name: "Families",
    price: "₹499",
    description: "Family pass covering two adults and children under 16.", 
    value: "family",
  },
  {
    name: "Others",
    price: "₹100",
    description: "For other community members and well-wishers.",
    value: "others",
  },
];

export function RegistrationTiersSection() {
  const { currentUser, openAuthDialog } = useAuth(); 
  const router = useRouter(); 

  const handleTierClick = (tierValue: string) => { 
    if (!currentUser) {
      openAuthDialog(); // Prompt login/signup
      // Optionally, store intended tier and redirect after login
    } else {
      router.push(`/register/${tierValue}`); 
    }
  };

  return (
    <section id="register" className="w-full py-20 md:py-28 relative bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-secondary to-accent rounded-full blur-3xl"></div>
      </div>
      
      {/* Section divider */}
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-border/10 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary/50"></div>
          <span className="text-foreground text-sm font-medium uppercase tracking-wider">Join Us</span>
          <div className="h-px w-12 bg-primary/50"></div>
        </div>
        
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-6 md:mb-8 tracking-wide",
          "drop-shadow-md"
        )}>
          Registration Tiers
        </h2>

        <p className="text-center text-muted-foreground font-body max-w-3xl mx-auto mb-10 md:mb-12 text-base md:text-lg">
          DMCC welcomes everyone to the event, registered or not. The registration fee just helps us organize, but your attendance is what matters most to us. Thank you.
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {tiers.map((tier) => (
            <GlassCard 
              key={tier.name} 
              className="flex flex-col p-6 md:p-8 h-full backdrop-blur-sm bg-card/80 border border-border hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-subtitle font-medium text-center text-card-foreground drop-shadow-md">{tier.name}</h3>
              <p className="text-4xl md:text-5xl font-headline font-semibold text-center my-4 text-foreground">{tier.price}</p>
              <p className="font-body text-muted-foreground text-center mb-6 text-sm md:text-base leading-relaxed flex-grow">
                {tier.description}
              </p>
              <GradientBorderButton 
                onClick={() => handleTierClick(tier.value)} 
                className="w-full mt-auto text-sm py-2.5 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all duration-300"
              >
                Register as {tier.name}
              </GradientBorderButton>
            </GlassCard>
          ))}
        </div>
        
        <p className="text-center text-lg md:text-xl font-subtitle font-medium mt-10 text-foreground drop-shadow-md">
          Join over 500+ community members for this enriching experience!
        </p>
      </div>
    </section>
  );
}
