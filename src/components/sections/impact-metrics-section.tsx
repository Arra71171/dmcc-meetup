
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { Users, Feather, Accessibility, Megaphone, Target, Eye } from "lucide-react";

export function ImpactMetricsSection() { // This is the "About DMCC" section
  const coreValues = [
    {
      icon: <Users className="w-6 h-6 text-primary mr-3 shrink-0" />,
      name: "Unity",
      description: "Building collective strength through community connection."
    },
    {
      icon: <Feather className="w-6 h-6 text-primary mr-3 shrink-0" />,
      name: "Cultural Pride",
      description: "Preserving and celebrating our unique heritage."
    },
    {
      icon: <Accessibility className="w-6 h-6 text-primary mr-3 shrink-0" />,
      name: "Inclusivity",
      description: "Creating welcoming spaces for all community members."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-primary mr-3 shrink-0" />,
      name: "Advocacy",
      description: "Promoting peaceful coexistence and community rights."
    }
  ];

  return (
    <section id="about-dmcc" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className={cn(
          "text-4xl md:text-5xl font-headline font-semibold text-center text-gradient-theme mb-12 md:mb-16 tracking-tight uppercase",
          "text-glass-shadow"
          )}>
          About DMCC
        </h2>
        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div className="md:col-span-3 w-full h-full flex items-center justify-center order-last md:order-first">
            <GlassCard className="p-6 md:p-10 w-full">
              <div className="space-y-8 font-body text-card-foreground/90 leading-relaxed">
                <div>
                  <h3 className={cn("text-3xl font-subtitle font-semibold mb-3 text-accent flex items-center", "text-glass-shadow")}>
                    <Target className="w-8 h-8 mr-3 text-accent shrink-0"/> Our Mission
                  </h3>
                  <p className="text-lg ml-11">
                    We are dedicated to strengthening community bonds through meaningful dialogue, cultural preservation, and unity-building initiatives that create lasting positive impact.
                  </p>
                </div>
                <div>
                  <h3 className={cn("text-3xl font-subtitle font-semibold mb-3 text-accent flex items-center", "text-glass-shadow")}>
                    <Eye className="w-8 h-8 mr-3 text-accent shrink-0"/> Our Vision
                  </h3>
                  <p className="text-lg ml-11">
                    To foster a thriving Meetei community that honors our rich heritage while embracing innovation and progress for future generations.
                  </p>
                </div>
                <div>
                  <h3 className={cn("text-3xl font-subtitle font-semibold mb-4 text-accent", "text-glass-shadow")}>
                    Our Core Values
                  </h3>
                  <ul className="space-y-4">
                    {coreValues.map((value) => (
                      <li key={value.name} className="flex items-start text-lg">
                        {value.icon}
                        <div>
                          <span className="font-semibold text-primary/90">{value.name}:</span> {value.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </div>
          <div className="md:col-span-2 w-full h-full flex items-center justify-center order-first md:order-last sticky top-24">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] w-full max-w-md">
              <Image
                src="https://placehold.co/500x667.png"
                alt="Symbolic image representing the DMCC community or its values"
                width={500}
                height={667}
                className="object-cover w-full h-full"
                data-ai-hint="community diverse group"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
