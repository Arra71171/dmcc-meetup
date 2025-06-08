
import { GlassCard } from "@/components/ui/glass-card";
import { Target, Drama, MessageSquare, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

const highlights = [
  {
    icon: <Target className="w-10 h-10 text-accent" />,
    title: "Inspiring Leadership Talks",
    description: "Discover insights into Manipur's evolving social, cultural, and economic landscape through distinguished speakers who are shaping our community's future.",
  },
  {
    icon: <Drama className="w-10 h-10 text-accent" />,
    title: "Rich Cultural Showcase",
    description: "Immerse yourself in captivating performances and traditional art forms that beautifully preserve and celebrate our heritage.",
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-accent" />,
    title: "Meaningful Community Dialogue",
    description: "Engage in thoughtful conversations about our collective aspirations and collaborate on solutions for our community's growth.",
  },
  {
    icon: <Handshake className="w-10 h-10 text-accent" />,
    title: "Valuable Networking",
    description: "Connect with professionals, students, families, and thought leaders who share your passion for community development.",
  },
];

export function EventHighlightsSection() {
  return (
    <section id="highlights" className="w-full max-w-6xl px-4">
      <h2 className={cn(
        "text-3xl md:text-4xl font-headline font-semibold text-center uppercase mb-10 md:mb-16 text-gradient-theme tracking-wide",
        "text-glass-shadow"
        )}>
        Why This Event Matters
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {highlights.map((highlight) => (
          <GlassCard key={highlight.title} className="flex flex-col items-center text-center h-full p-6">
            <div className="p-4 rounded-full bg-accent/10 mb-6">
             {highlight.icon}
            </div>
            <h3 className={cn("text-2xl font-subtitle font-medium mb-3 text-card-foreground", "text-glass-shadow")}>{highlight.title}</h3>
            <p className="font-body text-card-foreground/80 leading-relaxed text-sm">
              {highlight.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
