
import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";

const galleryImages = [
  { src: "https://placehold.co/600x400.png", alt: "Highlight from past event 1", hint: "event celebration" },
  { src: "https://placehold.co/400x600.png", alt: "Highlight from past event 2", hint: "community gathering" },
  { src: "https://placehold.co/600x400.png", alt: "Highlight from past event 3", hint: "cultural performance" },
  { src: "https://placehold.co/600x400.png", alt: "Highlight from past event 4", hint: "conference speakers" },
  { src: "https://placehold.co/400x600.png", alt: "Highlight from past event 5", hint: "audience engagement" },
  { src: "https://placehold.co/600x400.png", alt: "Highlight from past event 6", hint: "networking event" },
];

export function PastEventsGallerySection() {
  return (
    <section id="gallery" className="w-full max-w-6xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        Moments from the Archives
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {galleryImages.map((image, index) => (
          <GlassCard key={index} className="p-2 md:p-3 aspect-w-1 aspect-h-1 group overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={image.src.includes("400x600") ? 600 : 400}
              className="rounded-md object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={image.hint}
            />
          </GlassCard>
        ))}
      </div>
      <p className="text-center mt-8 font-lora text-lg text-gray-200 dark:text-gray-300">
        Relive the energy and joy from our previous gatherings. We can&apos;t wait to create new memories with you!
      </p>
    </section>
  );
}
