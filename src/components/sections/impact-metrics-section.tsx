import Image from "next/image";
import { RainbowBorderButton } from "@/components/ui/rainbow-border-button";
import { Sparkles, Users, Landmark, UserCheck } from "lucide-react";

const sectionMetrics = [
  {
    value: "500+",
    label: "Expected Attendees",
    colorClass: "text-[hsl(var(--chart-1))]", // Example: Bright Blue/Teal
  },
  {
    value: "2000+",
    label: "Years of Cultural Heritage",
    colorClass: "text-[hsl(var(--chart-3))]", // Example: Bright Green/Lime
  },
  {
    value: "140+",
    label: "Pre-registered Participants",
    colorClass: "text-[hsl(var(--chart-5))]", // Example: Bright Orange/Yellow
  },
];

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="w-full bg-neutral-900 py-16 md:py-24 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold font-headline mb-12 md:mb-16 text-left">
          A Landmark Gathering
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column: Image */}
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="https://placehold.co/500x650.png" // Adjusted aspect ratio
              alt="Community discussion and planning"
              width={500}
              height={650}
              className="rounded-xl shadow-2xl object-cover"
              data-ai-hint="community meeting discussion"
            />
          </div>
          {/* Right Column: Text, Button, Metrics */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <p className="font-lora text-lg md:text-xl text-gray-300 leading-relaxed">
              This historic convention marks a pivotal moment for community empowerment and cultural renaissance, uniting the Meetei diaspora in the nation&apos;s capital. It&apos;s a unique opportunity to celebrate our shared identity and forge pathways for a brighter future.
            </p>
            <RainbowBorderButton icon={<Sparkles className="w-5 h-5" />}>
              More about DMCC
            </RainbowBorderButton>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 md:pt-6">
              {sectionMetrics.map((metric) => (
                <div key={metric.label} className="text-center sm:text-left">
                  <p className={`text-4xl md:text-5xl font-bold font-headline ${metric.colorClass}`}>
                    {metric.value}
                  </p>
                  <p className="text-sm font-body text-gray-400 mt-1 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
