
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Award, Eye, HandHeart } from "lucide-react"; // Example icons

export function ImpactMetricsSection() { // Note: Filename remains, content changes to "About DMCC"
  return (
    <section id="about-dmcc" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="w-full h-full flex items-center justify-center order-last md:order-first">
            <GlassCard className="p-6 md:p-8">
              <h2 className={cn(
                "text-4xl md:text-5xl font-headline font-semibold text-left text-gradient-theme mb-8 tracking-tight",
                "text-glass-shadow"
                )}>
                About Delhi Meetei Co-ordinating Committee (DMCC)
              </h2>
              
              <div className="space-y-6 font-body text-card-foreground/90 leading-relaxed">
                <div>
                  <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-accent", "text-glass-shadow")}>Our Mission</h3>
                  <p>
                    We are dedicated to strengthening community bonds through meaningful dialogue, cultural preservation, and unity-building initiatives that create lasting positive impact.
                  </p>
                </div>
                <div>
                  <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-accent", "text-glass-shadow")}>Our Vision</h3>
                  <p>
                    To foster a thriving Meetei community that honors our rich heritage while embracing innovation and progress for future generations.
                  </p>
                </div>
                <div>
                  <h3 className={cn("text-2xl font-subtitle font-medium mb-2 text-accent", "text-glass-shadow")}>Our Core Values</h3>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li><span className="font-semibold">Unity:</span> Building collective strength through community connection</li>
                    <li><span className="font-semibold">Cultural Pride:</span> Preserving and celebrating our unique heritage</li>
                    <li><span className="font-semibold">Inclusivity:</span> Creating welcoming spaces for all community members</li>
                    <li><span className="font-semibold">Advocacy:</span> Promoting peaceful coexistence and community rights</li>
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
          <div className="w-full h-full flex items-center justify-center order-first md:order-last">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/500x650.png"
                alt="DMCC community members or event"
                width={500}
                height={650}
                className="object-cover"
                data-ai-hint="community group meeting"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
