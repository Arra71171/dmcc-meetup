
'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from "@/components/sections/hero-section";
import { ImpactMetricsSection } from "@/components/sections/impact-metrics-section"; // Renamed in thought process, but keeping filename for now
import { EventHighlightsSection } from "@/components/sections/event-highlights-section";
import { RegistrationTiersSection } from "@/components/sections/registration-tiers-section";
// import { RegistrationFormSection } from "@/components/sections/registration-form-section"; // Removed
import { EventDetailsSection } from "@/components/sections/event-details-section";
import { ClosingRemarksSection } from "@/components/sections/closing-remarks-section";

import { InvitationSection } from "@/components/sections/invitation-section";
import { pageLoadAnimation } from "@/lib/animations";
import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface'), { ssr: false });

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize page load animations
  useEffect(() => {
    // Use the pageLoadAnimation function from animations.ts
    const animation = pageLoadAnimation();
    
    return () => {
      // Cleanup animations if needed
      animation.kill();
    };
  }, []);
  
  return (
    <>
      <main className="w-full animate-on-load"> 
        <HeroSection />
        
        <InvitationSection />
        <ImpactMetricsSection />
        <EventHighlightsSection />
        <EventDetailsSection />
        <RegistrationTiersSection />
        <ClosingRemarksSection />

        <footer className="w-full py-12 mt-16 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="font-body text-sm text-neutral-400">
                © 2025 Delhi Meetei Co-ordinating Committee. All rights reserved.
              </p>
              <p className="font-body text-xs text-neutral-400 mt-3">
                For the people, by the people — with ❤️ from Meetei Club South X.
              </p>
            </div>
          </div>
        </footer>
      </main>
      {isMounted && <ChatInterface />}
    </>
  );
}
