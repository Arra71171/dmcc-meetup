
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

export function ImpactMetricsSection() {
  return (
    <section id="understanding-heritage" className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://placehold.co/500x650.png"
                alt="Stylized representation of Meetei cultural elements"
                width={500}
                height={650}
                className="object-cover"
                data-ai-hint="cultural heritage Manipur"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <GlassCard>
              <h2 className={cn(
                "text-4xl md:text-5xl font-headline font-semibold text-left text-gradient-theme mb-6 tracking-tight",
                "text-glass-shadow"
                )}>
                Understanding Our Heritage
              </h2>
              <p className="font-body text-lg text-card-foreground/90 leading-relaxed mb-4">
                The Meetei people, indigenous to Manipur, represent a rich cultural heritage that spans over two millennia. Our language, Meitei, holds the honor of being recognized in the Eighth Schedule of the Indian Constitution, reflecting our community&apos;s contributions to India&apos;s diverse linguistic landscape.
              </p>
              <p className="font-body text-lg text-card-foreground/90 leading-relaxed">
                Many of us in Delhi and the NCR region carry forward the traditions, values, and aspirations of our ancestors while adapting to modern urban life. Through this convention, we hope to create opportunities for meaningful conversations about preserving our culture while embracing the possibilities that lie ahead.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
