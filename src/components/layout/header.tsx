'use client';

import type React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { Logo } from './logo';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#details', label: 'Details' },
];

const NavLink = ({ href, children, onClick }: { href: string, children: React.ReactNode, onClick?: () => void }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const targetId = href.substring(2);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      href={href}
      onClick={handleScroll}
      className="transition-colors text-foreground/80 hover:text-primary focus:outline-none focus:text-primary px-4 py-2 rounded-md hover:bg-primary/10 focus:bg-primary/10 font-subtitle text-base"
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  const { currentUser, isAdmin, logOut, openAuthDialog } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full",
      "bg-background/80 backdrop-blur-md",
      "border-b border-border/60"
    )}>
      {/* Use Flexbox for mobile and Grid for desktop for robust alignment */}
      <div className="container flex justify-between md:grid md:grid-cols-3 h-20 max-w-screen-2xl items-center px-4 md:px-6">
        
        {/* Left Section: Aligned left in both mobile (flex) and desktop (grid) */}
        <div className="md:justify-self-start">
          <Logo />
        </div>

        {/* Center Section (Desktop): Centered in the grid, hidden on mobile */}
        <nav className="hidden md:flex md:justify-self-center space-x-2">
          {navItems.map((item) => (
            <NavLink key={item.label} href={item.href}>{item.label}</NavLink>
          ))}
        </nav>

        {/* Right Section: Aligned right in both mobile (flex) and desktop (grid) */}
        <div className="md:justify-self-end flex items-center">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {currentUser ? (
              <>
                {isAdmin && (
                  <Button asChild variant="secondary" size="sm">
                    <Link href="/admin">Dashboard</Link>
                  </Button>
                )}
                <Button onClick={logOut} variant="outline" size="sm">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => openAuthDialog('adminOnly')} variant="secondary" size="sm">
                  SysOp Login
                </Button>
                <Button onClick={() => openAuthDialog()} variant="default" size="sm">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register / Sign In
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background p-4 flex flex-col">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation and authentication options.
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-8 font-subtitle flex-grow">
                  {navItems.map((item) => (
                    <NavLink key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)}>{item.label}</NavLink>
                  ))}
                </nav>
                
                {/* Mobile Auth Buttons */}
                <div className="mt-auto flex flex-col space-y-2 pt-4 border-t border-border">
                  {currentUser ? (
                    <>
                      {isAdmin && (
                        <Button asChild variant="ghost" className="justify-start font-subtitle text-base">
                          <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
                        </Button>
                      )}
                      <Button onClick={() => { logOut(); setMobileMenuOpen(false); }} variant="ghost" className="justify-start font-subtitle text-base">
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => { openAuthDialog('adminOnly'); setMobileMenuOpen(false); }} variant="ghost" className="justify-start font-subtitle text-base">
                        SysOp Login
                      </Button>
                      <Button onClick={() => { openAuthDialog(); setMobileMenuOpen(false); }} variant="ghost" className="justify-start font-subtitle text-base">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Register / Sign In
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
