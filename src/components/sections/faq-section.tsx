
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GlassCard } from "@/components/ui/glass-card";

const faqItems = [
  {
    question: "What is the Meetei People's Convention, Delhi 2025?",
    answer:
      "It's a landmark gathering organized by the Delhi Meetei Coordinating Committee (DMCC) for the Meetei diaspora. The convention focuses on celebrating our rich cultural heritage, empowering our community, and collaboratively planning for a brighter future. It coincides with DMCC's 2nd Rising Day.",
  },
  {
    question: "When and where is the event being held?",
    answer:
      "The convention is scheduled for Sunday, June 15, 2025, from 10:00 AM to 6:00 PM. It will take place at the prestigious JNU Convention Center, New Delhi.",
  },
  {
    question: "How can I register for the convention?",
    answer:
      "Registration involves signing in or creating an account on our portal, completing the required information fields, making the payment via UPI transfer to 'radheoinam@oksbi', and uploading a screenshot of the transaction for verification. Confirmation is typically manual and processed within 48 business hours.",
  },
  {
    question: "Who are the Meetei people?",
    answer:
      "The Meetei people are descendants of one of India's most ancient civilizations and are the dominant ethnic group of Manipur. We have a rich cultural heritage spanning over two millennia. Our language, Meitei, is recognized in the Eighth Schedule of the Indian Constitution, reflecting its significant contribution to the nation's linguistic heritage.",
  },
  {
    question: "Is there a specific dress code for the event?",
    answer:
      "While there is no mandatory dress code, attendees are warmly encouraged to wear traditional Meetei attire as a way to celebrate our shared heritage. Otherwise, smart casual attire is perfectly appropriate for the convention.",
  },
  {
    question: "What are the main objectives of this convention?",
    answer:
      "The convention aims to unite the Meetei diaspora, foster community empowerment, promote cultural renaissance, provide a platform for thought leadership on issues relevant to Manipur and the Meetei community, and create networking opportunities for professional and personal growth.",
  },
  {
    question: "Who should I contact for more information or queries?",
    answer:
      "For any further information or specific queries, please feel free to contact us via email at dmcc.office11@gmail.com or by phone at +91 9717921812. We aim to respond within 24-48 hours during business days.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="w-full max-w-3xl px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center font-headline uppercase mb-10 md:mb-16 text-gradient-theme">
        Frequently Asked Questions
      </h2>
      <GlassCard className="p-0 md:p-0"> {/* Remove padding from GlassCard as Accordion items have their own */}
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index} className={index === 0 ? "border-t-0" : ""}>
              <AccordionTrigger className="text-left font-semibold font-body px-6 py-4 hover:no-underline text-base md:text-lg">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-0 font-lora text-foreground/80 dark:text-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </GlassCard>
    </section>
  );
}
