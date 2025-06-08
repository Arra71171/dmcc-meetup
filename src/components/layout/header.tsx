import Link from 'next/link';
import { Logo } from './logo';
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#register', label: 'Register' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <GradientBorderButton>
            Secure Your Place
          </GradientBorderButton>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium transition-colors hover:text-foreground/80 text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <GradientBorderButton className="w-full">
                  Secure Your Place
                </GradientBorderButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
