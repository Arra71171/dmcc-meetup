
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8 md:py-12 lg:py-16 flex flex-col items-center">
      <GlassCard className="w-full max-w-3xl p-6 md:p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <ShieldCheck className="w-16 h-16 text-accent dark:text-accent-foreground mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-gradient-theme">
            Admin Dashboard
          </h1>
        </div>
        <div className="text-center">
          <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed">
            Welcome to the Admin Dashboard. This area is restricted and intended for site administrators.
          </p>
          <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed mt-4">
            Future administrative features will be available here.
          </p>
        </div>
      </GlassCard>
    </main>
  );
}
