
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "font-headline font-bold text-2xl text-foreground", // Ensures light text on dark header
      className
    )}>
      DMCC
    </Link>
  );
}
