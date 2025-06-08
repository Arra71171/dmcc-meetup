
import { GlassCard } from "@/components/ui/glass-card";
import { Mail, Phone } from "lucide-react";

export function ClosingRemarksSection() {
  return (
    <section id="closing-remarks" className="w-full max-w-3xl px-4 space-y-12">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-8 text-gradient-theme">
          We Hope You&apos;ll Join Us
        </h2>
        <GlassCard className="p-6 md:p-8 text-center">
          <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed mb-4">
            This convention represents our sincere effort to bring our community together in Delhi. Whether you&apos;ve been here for years or have recently arrived, whether you&apos;re a student, professional, or family person, we believe there&apos;s a place for you in this gathering.
          </p>
          <p className="font-lora text-lg text-foreground/90 dark:text-foreground leading-relaxed">
            We look forward to learning from each other, celebrating our shared heritage, and building connections that will strengthen our community for years to come.
          </p>
          <p className="mt-6 font-headline text-xl text-accent dark:text-accent-foreground">
            See you on June 15th, 2025!
          </p>
        </GlassCard>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-8 text-gradient-theme">
          Get in Touch
        </h2>
        <GlassCard className="p-6 md:p-8">
          <p className="font-lora text-lg text-foreground leading-relaxed mb-6 text-center">
            If you have any questions or need assistance with registration, please feel free to reach out to us:
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-accent dark:text-accent-foreground mr-3" />
              <a href="mailto:dmcc.office11@gmail.com" className="font-body text-foreground hover:text-accent dark:hover:text-accent-foreground transition-colors">
                dmcc.office11@gmail.com
              </a>
            </div>
            <div className="flex items-center">
              <Phone className="w-6 h-6 text-accent dark:text-accent-foreground mr-3" />
              <a href="tel:+919717921812" className="font-body text-foreground hover:text-accent dark:hover:text-accent-foreground transition-colors">
                +91 9717921812
              </a>
            </div>
          </div>
          <p className="font-lora text-sm text-foreground mt-6 text-center">
            We aim to respond to all inquiries within 24-48 hours during business days. Thank you for your patience as we work to make this event meaningful for everyone.
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
