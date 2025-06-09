
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClosingRemarksSection() {
  return (
    <section id="contact" className="w-full max-w-3xl px-4 space-y-12">
      <div>
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-8 text-gradient-theme tracking-wide",
          "text-glass-shadow"
          )}>
          Stay Connected
        </h2>
        <GlassCard className="p-6 md:p-8">
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-6 text-center">
            If you have any questions or wish to connect with DMCC, please don’t hesitate to reach out to us:
          </p>
          <div className="space-y-4 font-body text-base">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-accent mr-3 shrink-0" />
              <a href="mailto:dmcc.office11@gmail.com" className="text-card-foreground hover:text-accent transition-colors">
                <span className="font-subtitle font-medium">Email:</span> dmcc.office11@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-accent mr-3 shrink-0" />
              <a href="tel:+919717921812" className="text-card-foreground hover:text-accent transition-colors">
                <span className="font-subtitle font-medium">Phone:</span> +91 97179 21812
              </a>
            </div>
          </div>
          <p className="font-body text-sm text-card-foreground/80 mt-6 text-center leading-relaxed">
             We respond to all inquiries within 24-48 hours.
          </p>
        </GlassCard>
      </div>
      
      <GlassCard className="p-6 md:p-8 text-center">
          <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
            We cherish the memories created and the bonds strengthened during our convention.
          </p>
          <p className="mt-6 font-subtitle text-xl text-accent">
            We look forward to future community events and continued engagement!
          </p>
        </GlassCard>
    </section>
  );
}
