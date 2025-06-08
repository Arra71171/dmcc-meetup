
"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Quote } from "lucide-react";
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "This convention represents more than a gathering—it's a clarion call for our community to reclaim its rightful place in India's narrative. We are not merely preserving tradition; we are actively shaping the future.",
    author: "DMCC Leadership",
    title: "Strategic Vision",
  },
  {
    quote: "This gathering represents a pivotal moment in our community's journey. We are not just celebrating our past—we are actively constructing a future where Meetei culture thrives in the modern world.",
    author: "DMCC Organizers",
    title: "Leadership Commitment",
  },
  {
    quote: "Past DMCC initiatives have consistently strengthened our community bonds and amplified our voice. This convention will be a new peak for us all.",
    author: "A. Meetei", // Placeholder name
    title: "Previous Initiative Attendee",
  },
  {
    quote: "The opportunity to connect with fellow Meeteis in Delhi and discuss our future is invaluable. DMCC is paving the way.",
    author: "L. Chanu", // Placeholder name
    title: "Community Enthusiast",
  }
];

export function TestimonialSliderSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds
    return () => clearInterval(interval);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null; // Or some fallback UI
  }
  
  const currentTestimonial = testimonials[currentIndex];
   if (!currentTestimonial) {
    // This should ideally not happen if testimonials array is not empty
    // and currentIndex is always kept within bounds.
    // However, as a safeguard:
    return <div className="text-center p-4">Loading testimonials...</div>;
  }


  return (
    <section id="testimonials" className="w-full max-w-3xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        Words from Our Leadership & Community
      </h2>
      <GlassCard className="relative overflow-hidden p-6 md:p-10 min-h-[280px] md:min-h-[250px] flex flex-col justify-center items-center">
        <Quote className="w-12 h-12 text-accent dark:text-accent-foreground absolute top-4 left-4 opacity-30" />
        <div className="text-center">
          <p className="text-xl md:text-2xl font-lora italic text-foreground/90 dark:text-foreground mb-6">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>
          <p className="font-bold font-headline text-lg text-foreground">
            {currentTestimonial.author}
          </p>
          <p className="font-body text-sm text-muted-foreground">
            {currentTestimonial.title}
          </p>
        </div>
        <Quote className="w-12 h-12 text-accent dark:text-accent-foreground absolute bottom-4 right-4 opacity-30 transform scale-x-[-1]" />
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentIndex === index ? 'bg-primary dark:bg-primary-foreground' : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
