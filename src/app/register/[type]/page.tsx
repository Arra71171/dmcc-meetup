
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { SpecificRegistrationForm, type RegistrationType } from '@/components/forms/specific-registration-form';
import { GlassCard } from '@/components/ui/glass-card';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast'; // Ensure useToast is imported

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
  const { toast } = useToast(); // Moved to the top
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
      // Ensure toast is available before calling
      if (toast && typeof toast === 'function') {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this registration form.",
          variant: "destructive",
        });
      } else {
        console.warn("Toast function not available when trying to show auth required message.");
      }
      openAuthDialog();
      router.push('/'); // This navigation might still happen very quickly
    }
  }, [loadingAuthState, currentUser, isValidType, router, openAuthDialog, toast]);


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
    // This UI might not be shown for long due to the useEffect redirect
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

  if (!currentUser && !isValidType && !loadingAuthState) {
     // If not loading, not a valid type, and no user, redirect to home.
     router.push('/');
     return null;
  }


  if (!isValidType && registrationType === null && !loadingAuthState) {
    // This case should ideally be hit if the type param is invalid from the start.
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
    // This is a fallback while type is being determined or if things are still loading.
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
  
  // If we reach here, user should be authenticated (or form won't render fully) and type should be valid.
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
