import { GlassCard } from "@/components/ui/glass-card";
import { Lightbulb, Palette, Users2 } from "lucide-react";

const highlights = [
  {
    icon: <Lightbulb className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Thought Leadership Summit",
    description: "Examine Manipur's socio-political landscape, economic potential, and cultural evolution with distinguished policy experts, historians, and community leaders.",
  },
  {
    icon: <Palette className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Cultural Heritage Showcase",
    description: "Experience Manipuri Classical Dance, Thang-Ta, Sarit Sarak, Lai Haraoba, and artisan exhibitions celebrating Meetei artistic excellence.",
  },
  {
    icon: <Users2 className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Strategic Community Dialogue",
    description: "Engage in facilitated discussions on diaspora engagement, education, professional networking, cultural preservation, and youth leadership.",
  },
];

export function EventHighlightsSection() {
  return (
    <section id="highlights" className="w-full max-w-6xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16">
        Comprehensive Program Architecture
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {highlights.map((highlight) => (
          <GlassCard key={highlight.title} className="flex flex-col items-center text-center h-full">
            <div className="p-4 rounded-full bg-accent/20 dark:bg-accent/30 mb-6">
             {highlight.icon}
            </div>
            <h3 className="text-2xl font-semibold font-headline mb-3">{highlight.title}</h3>
            <p className="font-lora text-foreground/80 dark:text-foreground/70 leading-relaxed">
              {highlight.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
