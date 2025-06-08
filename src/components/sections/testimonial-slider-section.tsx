"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Quote } from "lucide-react";
import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "A landmark event for our community, fostering unity and celebrating our shared heritage like never before.",
    author: "Dr. Anya Sharma",
    title: "DMCC Chair",
  },
  {
    quote: "Incredibly insightful sessions and the cultural showcase was simply breathtaking. A must-attend event!",
    author: "John B.",
    title: "Past Attendee",
  },
  {
    quote: "The networking opportunities were invaluable. I connected with so many inspiring individuals.",
    author: "Maria L.",
    title: "Community Leader",
  },
  {
    quote: "DMCC events always exceed expectations. The energy and passion are palpable.",
    author: "Samuel K.",
    title: "Long-time Supporter",
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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="w-full max-w-3xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16">
        Voices of Our Community
      </h2>
      <GlassCard className="relative overflow-hidden p-6 md:p-10 min-h-[280px] md:min-h-[250px] flex flex-col justify-center items-center">
        <Quote className="w-12 h-12 text-accent dark:text-accent-foreground absolute top-4 left-4 opacity-30" />
        <div className="text-center">
          <p className="text-xl md:text-2xl font-lora italic text-foreground/90 dark:text-foreground/80 mb-6">
            &ldquo;{currentTestimonial.quote}&rdquo;
          </p>
          <p className="font-bold font-headline text-lg text-primary dark:text-primary-foreground">
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
