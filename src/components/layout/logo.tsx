
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-center w-16 h-16 rounded-lg", // Changed from rounded-full
      "bg-background text-primary dark:text-primary-foreground", 
      "font-headline font-bold text-lg",
      className
    )}>
      DMCC
    </Link>
  );
}
