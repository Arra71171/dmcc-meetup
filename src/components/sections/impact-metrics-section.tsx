import { GlassCard } from "@/components/ui/glass-card";
import { TrendingUp, Users, Landmark, CalendarDays } from "lucide-react";

const metrics = [
  {
    icon: <Landmark className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "2000+",
    label: "Years of Heritage",
    description: "Celebrating a rich and vibrant cultural history passed down through generations.",
  },
  {
    icon: <Users className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "500+",
    label: "Attendees Annually",
    description: "Bringing together a diverse group from our community and beyond.",
  },
  {
    icon: <CalendarDays className="w-10 h-10 text-accent dark:text-accent-foreground" />,
    value: "10+",
    label: "Successful Events",
    description: "A proven track record of memorable and impactful gatherings.",
  },
];

export function ImpactMetricsSection() {
  return (
    <section id="impact" className="w-full max-w-5xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16">
        Our Collective Impact
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {metrics.map((metric) => (
          <GlassCard key={metric.label} className="flex flex-col items-center text-center">
            <div className="p-3 rounded-full bg-accent/20 dark:bg-accent/30 mb-4">
              {metric.icon}
            </div>
            <p className="text-4xl font-bold font-headline text-primary dark:text-primary-foreground">{metric.value}</p>
            <p className="text-lg font-medium font-body mt-1">{metric.label}</p>
            <p className="text-sm font-lora text-foreground/80 dark:text-foreground/70 mt-2">
              {metric.description}
            </p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
