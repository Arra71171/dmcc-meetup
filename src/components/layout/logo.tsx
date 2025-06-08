
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-center w-14 h-14 rounded-full", // Increased size
      "bg-primary text-primary-foreground",
      "dark:bg-primary dark:text-primary-foreground",
      "font-headline font-bold text-lg",
      className
    )}>
      DMCC
    </Link>
  );
}
