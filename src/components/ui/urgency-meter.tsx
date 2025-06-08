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
  
  let urgencyText = "Low Urgency";
  if (progress > 75) {
    urgencyText = "High Urgency!";
  } else if (progress > 50) {
    urgencyText = "Medium Urgency";
  }

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium font-body text-primary dark:text-primary-foreground">Registration Closes Soon!</span>
        <span className="text-sm font-medium font-body text-accent dark:text-accent-foreground">{urgencyText}</span>
      </div>
      <Progress value={progress} className="w-full h-3 md:h-4" />
       <p className="text-xs text-muted-foreground mt-1 font-lora">
        {progress}% of spots are filling up quickly! Don't miss out.
      </p>
    </div>
  );
}
