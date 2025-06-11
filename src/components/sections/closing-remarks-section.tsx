'use client';

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Calendar, Mail, Phone, MessageCircle } from 'lucide-react';

export function ClosingRemarksSection() {
  return (
    <section id="connect" className="w-full py-20 md:py-28 relative bg-background overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-secondary to-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-primary/50"></div>
          <span className="text-foreground text-sm font-medium uppercase tracking-wider">Connect</span>
          <div className="h-px w-12 bg-primary/50"></div>
        </div>
        
        <h2 className={cn(
          "text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-10 md:mb-12 tracking-wide",
          "drop-shadow-md"
          )}>
          Stay Connected & Event Reminder
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Date Card */}
          <GlassCard className="p-8 flex flex-col items-center justify-center text-center">
            <Calendar className="w-10 h-10 text-foreground/80 mb-4" />
            <h3 className="text-xl md:text-2xl font-subtitle font-medium text-foreground">Mark Your Calendars</h3>
            <p className="text-3xl md:text-4xl font-headline font-semibold text-foreground mt-2">June 15th, 2025</p>
          </GlassCard>

          {/* Contact Card */}
          <GlassCard className="p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl md:text-2xl font-subtitle font-medium text-foreground mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-foreground/80" />
                <a href="mailto:dmcc.office11@gmail.com" className="text-muted-foreground hover:text-foreground/80 transition-colors">dmcc.office11@gmail.com</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-foreground/80" />
                <a href="tel:+919717921812" className="text-muted-foreground hover:text-foreground/80 transition-colors">+91 97179 21812</a>
              </div>
            </div>
            <p className="text-xs text-muted-foreground/80 mt-4">Response within 24-48 hours</p>
          </GlassCard>

          {/* Quote Card */}
          <GlassCard className="md:col-span-2 p-8 text-center">
            <MessageCircle className="w-10 h-10 text-foreground/80 mx-auto mb-4" />
            <p className="text-lg md:text-xl font-body italic text-foreground max-w-4xl mx-auto leading-relaxed">
              &quot;This convention is more than just an event; it&apos;s a celebration of our identity, a platform for dialogue, and a step towards a more unified and prosperous Meetei community. We look forward to welcoming you!&quot;
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
