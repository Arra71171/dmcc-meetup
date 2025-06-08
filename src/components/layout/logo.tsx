
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "font-headline font-semibold text-3xl text-foreground hover:text-primary transition-colors",
      className
    )}>
      DMCC
    </Link>
  );
}
