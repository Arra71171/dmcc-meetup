
'use client';

import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, LogIn, Loader2, UserCog } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  const { currentUser, loadingAuthState, openAuthDialog, isAdminOverrideLoggedIn } = useAuth();

  if (loadingAuthState) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
          <p className="font-body text-lg text-card-foreground/90">
            Checking authentication status...
          </p>
        </GlassCard>
      </main>
    );
  }

  if (!isAdminOverrideLoggedIn && !currentUser) { // If not admin override AND no regular user logged in
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <UserCog className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Admin Access Required
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-6">
            You must be logged in as an administrator to view this page.
          </p>
          <Button onClick={() => openAuthDialog('adminOnly')} variant="outline" className="font-subtitle">
            <LogIn className="mr-2 h-5 w-5" />
            Log In as Admin
          </Button>
        </GlassCard>
      </main>
    );
  }
  
  // If a regular user is logged in but not admin override
  if (currentUser && !isAdminOverrideLoggedIn) {
     return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
           <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Not Authorized
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
            You do not have permission to access this page.
          </p>
        </GlassCard>
      </main>
    );
  }


  // User is logged in via admin override
  if (isAdminOverrideLoggedIn) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center">
        <GlassCard className="w-full max-w-3xl p-6 md:p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <ShieldCheck className="w-16 h-16 text-accent mb-4" />
            <h1 className={cn(
              "text-3xl md:text-4xl font-headline font-semibold text-gradient-theme tracking-wide",
              "text-glass-shadow"
              )}>
              Admin Dashboard
            </h1>
          </div>
          <div className="text-center">
            <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
              Welcome to the Admin Dashboard, Administrator. This area is restricted.
            </p>
            <p className="font-body text-lg text-card-foreground/90 leading-relaxed mt-4">
              Future administrative features will be available here.
            </p>
          </div>
        </GlassCard>
      </main>
    );
  }

  // Fallback, should ideally not be reached if logic above is correct
  return (
     <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <p className="font-body text-lg text-card-foreground/90">
            An unexpected error occurred. Please try again.
          </p>
        </GlassCard>
      </main>
  );
}
