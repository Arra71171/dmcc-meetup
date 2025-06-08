
"use client";

import { useState, useEffect } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const difference = +targetDate - +new Date();
  if (difference <= 0) {
    return null; // Event has passed or is happening now
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Calculate initial time left on client mount to avoid hydration mismatch
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return <div className="text-2xl font-bold font-headline text-accent">The event is here!</div>;
  }

  return (
    <div className="grid grid-flow-col gap-3 md:gap-5 text-center auto-cols-max">
      {Object.entries(timeLeft).map(([interval, value]) => (
        <div key={interval} className="flex flex-col p-2 bg-primary/10 dark:bg-secondary/20 rounded-lg shadow-md text-foreground">
          <span className="font-mono text-3xl md:text-5xl font-headline">
            {String(value).padStart(2, '0')}
          </span>
          <span className="font-body text-xs md:text-sm uppercase tracking-wider">
            {interval}
          </span>
        </div>
      ))}
    </div>
  );
}
