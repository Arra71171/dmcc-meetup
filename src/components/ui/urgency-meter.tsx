"use client";

import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from 'react';

interface UrgencyMeterProps {
  value: number; // Percentage from 0 to 100
}

export function UrgencyMeter({ value: initialValue }: UrgencyMeterProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Ensure this runs only on the client after hydration
    setProgress(initialValue);
  }, [initialValue]);
  
  let urgencyText = "Early Bird"; // Default text
  if (progress > 75) {
    urgencyText = "Filling Fast!";
  } else if (progress > 50) {
    urgencyText = "Popular!";
  } else if (progress > 25) {
    urgencyText = "Good Availability";
  }


  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium font-body text-primary dark:text-primary-foreground">Registration Capacity</span>
        <span className="text-sm font-medium font-body text-accent dark:text-accent-foreground">{urgencyText}</span>
      </div>
      <Progress value={progress} className="w-full h-3 md:h-4" />
       {/* This text is now moved to the parent component for more specific messaging */}
    </div>
  );
}
