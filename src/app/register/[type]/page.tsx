
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { SpecificRegistrationForm, type RegistrationType } from '@/components/forms/specific-registration-form';
import { GlassCard } from '@/components/ui/glass-card';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const validTypes: RegistrationType[] = ["student", "professional", "family", "others"];

const typeToTitleMap: Record<RegistrationType, string> = {
  student: "Student Registration",
  professional: "Professional Registration",
  family: "Family Pass Registration",
  others: "Other Registration",
};

const typeToPriceMap: Record<RegistrationType, string> = {
  student: "₹100",
  professional: "₹299",
  family: "₹499",
  others: "₹100",
};

export default function SpecificRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const { currentUser, loadingAuthState, openAuthDialog } = useAuth();
  const [isValidType, setIsValidType] = useState(false);
  const [registrationType, setRegistrationType] = useState<RegistrationType | null>(null);

  useEffect(() => {
    const typeParam = params.type as RegistrationType;
    if (typeParam && validTypes.includes(typeParam)) {
      setIsValidType(true);
      setRegistrationType(typeParam);
    } else {
      setIsValidType(false);
      setRegistrationType(null);
    }
  }, [params.type]);

  useEffect(() => {
    if (!loadingAuthState && !currentUser && isValidType) {
      // If a valid type is in URL but user is not logged in,
      // prompt login then redirect back or let them proceed.
      // For now, show auth prompt then they'd need to re-initiate from tiers page.
      // Or, we can store intended type and redirect after login.
      // Simplest for now: redirect to home as they shouldn't be here without auth.
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this registration form.",
        variant: "destructive",
      });
      openAuthDialog(); // Open auth dialog
      router.push('/'); // Redirect to home after a brief moment or upon dialog close
    }
  }, [loadingAuthState, currentUser, isValidType, router, openAuthDialog]);


  if (loadingAuthState) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className="font-body text-lg text-card-foreground/90">
            Loading registration form...
          </p>
        </GlassCard>
      </main>
    );
  }

  if (!currentUser && isValidType) {
     // This state might be brief if redirection or auth dialog takes over
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn("text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4", "text-glass-shadow")}>
            Authentication Required
          </h1>
          <p className="font-body text-lg text-card-foreground/90 mb-6">
            You need to be signed in to access this registration form.
          </p>
          <Button onClick={() => openAuthDialog()} variant="outline">Sign In / Create Account</Button>
        </GlassCard>
      </main>
    );
  }
  
  if (!currentUser && !isValidType) {
    // If not logged in and type is invalid, definitely redirect or show generic error
     router.push('/');
     return null; // Or a more graceful error page
  }


  if (!isValidType && registrationType === null && !loadingAuthState) { // Check after loading
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <ShieldAlert className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn("text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4", "text-glass-shadow")}>
            Invalid Registration Type
          </h1>
          <p className="font-body text-lg text-card-foreground/90 mb-6">
            The registration type specified in the URL is not valid.
          </p>
          <Button onClick={() => router.push('/')} variant="outline">Go to Homepage</Button>
        </GlassCard>
      </main>
    );
  }

  if (!registrationType) {
    // Fallback if registrationType is somehow still null after checks (shouldn't happen if logic is correct)
    return (
       <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className="font-body text-lg text-card-foreground/90">
            Preparing form...
          </p>
        </GlassCard>
      </main>
    );
  }
  
  // Add a local import for useToast
  const { toast } = (typeof window !== 'undefined' ? require('@/hooks/use-toast') : { toast: () => {} });


  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <GlassCard className="p-6 md:p-8 mb-8 text-center">
            <h1 className={cn(
                "text-3xl md:text-4xl font-headline font-semibold text-gradient-theme tracking-wide mb-2",
                "text-glass-shadow"
            )}>
                {typeToTitleMap[registrationType]}
            </h1>
            <p className={cn("text-2xl font-subtitle text-accent", "text-glass-shadow")}>
                Fee: {typeToPriceMap[registrationType]}
            </p>
        </GlassCard>
        <SpecificRegistrationForm initialRegistrationType={registrationType} />
      </div>
    </main>
  );
}
