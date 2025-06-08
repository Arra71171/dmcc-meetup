
'use client';

import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck, LogIn, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button"; // Standard button for login prompt

// IMPORTANT: This is a placeholder for actual admin role management.
// In a real application, user roles should be managed on the backend.
const ADMIN_EMAIL = "admin@example.com";

export default function AdminDashboardPage() {
  const { currentUser, loadingAuthState, openAuthDialog } = useAuth();

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

  if (!currentUser) {
    return (
      <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <GlassCard className="w-full max-w-md p-6 md:p-8 text-center">
          <ShieldCheck className="w-16 h-16 text-destructive mb-4" />
          <h1 className={cn(
            "text-2xl md:text-3xl font-headline font-semibold text-gradient-theme tracking-wide mb-4",
            "text-glass-shadow"
            )}>
            Access Denied
          </h1>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-6">
            You must be logged in to view the Admin Dashboard.
          </p>
          <Button onClick={openAuthDialog} variant="outline" className="font-subtitle">
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
        </GlassCard>
      </main>
    );
  }

  if (currentUser.email !== ADMIN_EMAIL) {
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

  // User is authenticated and is the admin
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
            Welcome to the Admin Dashboard, {currentUser.displayName || currentUser.email}. This area is restricted.
          </p>
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mt-4">
            Future administrative features will be available here. Remember, the current admin check (email-based) is for prototyping and is not secure for production.
          </p>
        </div>
      </GlassCard>
    </main>
  );
}
