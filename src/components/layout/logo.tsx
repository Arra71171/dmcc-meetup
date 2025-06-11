
'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import gsap from 'gsap';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      const letters = logoRef.current.querySelectorAll('span');
      gsap.from(letters, {
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <Link href="/">
      <div
        ref={logoRef}
        className={cn(
          "font-headline font-semibold text-3xl text-foreground transition-all duration-300 [text-shadow:0_0_8px_hsl(var(--primary)/0.5)] hover:text-primary hover:[text-shadow:0_0_16px_hsl(var(--primary))] flex",
          className
        )}
        aria-label="DMCC Logo"
      >
        {'DMCC'.split('').map((letter, index) => (
          <span key={index} style={{ display: 'inline-block' }}>
            {letter}
          </span>
        ))}
      </div>
    </Link>
  );
}
