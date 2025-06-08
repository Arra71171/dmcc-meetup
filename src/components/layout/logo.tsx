
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-center w-16 h-16 rounded-lg",
      "bg-primary-foreground text-primary dark:text-primary-foreground",
      className
    )}>
      DMCC
    </Link>
  );
}
