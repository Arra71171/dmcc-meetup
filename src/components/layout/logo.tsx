
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn(
      "flex items-center justify-center w-16 h-16 rounded-lg",
      "bg-primary text-primary-foreground dark:bg-card dark:text-card-foreground",
      className
    )}>
      DMCC
    </Link>
  );
}
