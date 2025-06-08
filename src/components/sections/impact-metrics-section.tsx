import { GlassCard } from "@/components/ui/glass-card";
import { Users, Landmark, BookOpenCheck, UserCheck } from "lucide-react";

const metrics = [
  {
    icon: <Users className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "500+",
    label: "Expected Attendees",
    description: "Anticipating a large gathering of the Meetei diaspora from across the National Capital Region.",
  },
  {
    icon: <Landmark className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "2000+",
    label: "Years of Cultural Heritage",
    description: "Celebrating the Meetei people, descendants of one of India's most ancient civilizations.",
  },
  {
    icon: <BookOpenCheck className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "8th",
    label: "Schedule Language",
    description: "Meitei language, recognized in the Eighth Schedule of the Indian Constitution for its significance.",
  },
  {
    icon: <UserCheck className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "140+",
    label: "Pre-registered Participants",
    description: "Early enthusiasm indicates strong community engagement for this pivotal event.",
  },
];

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="w-full max-w-5xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16">
        A Landmark Gathering
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {metrics.map((metric) => (
          <GlassCard key={metric.label} className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-accent/20 dark:bg-accent/30 mb-4">
              {metric.icon}
            </div>
            <p className="text-4xl font-bold font-headline text-primary dark:text-primary-foreground">{metric.value}</p>
            <p className="text-lg font-medium font-body mt-1">{metric.label}</p>
            <p className="text-sm font-lora text-foreground/80 dark:text-foreground/70 mt-2 leading-relaxed">
              {metric.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
