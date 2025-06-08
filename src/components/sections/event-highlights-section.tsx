
import { GlassCard } from "@/components/ui/glass-card";
import { MessageSquare, Presentation, Music2, Link as LinkIcon } from "lucide-react";

const highlights = [
  {
    icon: <MessageSquare className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Community Conversations",
    description: "Open discussions about the experiences, challenges, and aspirations of Meetei families living in Delhi NCR. We invite you to share your stories and learn from others.",
  },
  {
    icon: <Presentation className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Thoughtful Presentations",
    description: "Speakers from our community will share insights on Manipur's social, cultural, and economic landscape, helping us stay connected to our homeland's developments.",
  },
  {
    icon: <Music2 className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Cultural Expressions",
    description: "Performances celebrating our artistic traditions, from classical Manipuri dance to folk songs, offering moments of cultural pride and connection.",
  },
  {
    icon: <LinkIcon className="w-12 h-12 text-accent dark:text-accent-foreground" />,
    title: "Building Connections",
    description: "Opportunities to meet fellow community members, from professionals and students to families, creating a network of mutual support and friendship.",
  },
];

export function EventHighlightsSection() {
  return (
    <section id="highlights" className="w-full max-w-6xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        What We Hope to Share
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {highlights.map((highlight) => (
          <GlassCard key={highlight.title} className="flex flex-col items-center text-center h-full">
            <div className="p-4 rounded-full bg-accent/20 dark:bg-accent/30 mb-6">
             {highlight.icon}
            </div>
            <h3 className="text-2xl font-semibold font-headline mb-3">{highlight.title}</h3>
            <p className="font-lora text-foreground dark:text-foreground leading-relaxed">
              {highlight.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
