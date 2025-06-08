
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './logo';
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, LogIn, UserCircle, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#registration-form', label: 'Register' },
  { href: '/#faq', label: 'FAQ' },
];

export function Header() {
  const { currentUser, loadingAuthState, logOut, openAuthDialog } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(' ');
      if (parts.length > 1) {
        return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    }
    if (email) {
      return email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors text-foreground/70 hover:text-accent dark:hover:text-accent focus:outline-none focus:text-accent dark:focus:text-accent hover:bg-accent/10 dark:hover:bg-accent/20 focus:bg-accent/10 dark:focus:bg-accent/20 px-3 py-2 rounded-md"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {loadingAuthState ? (
            <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-md"></div>
          ) : currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 rounded-full px-3 text-foreground/80 hover:text-foreground">
                   <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={currentUser.photoURL || undefined} alt={currentUser.displayName || currentUser.email || 'User'} />
                    <AvatarFallback>{getInitials(currentUser.displayName, currentUser.email)}</AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[100px]">{currentUser.displayName || currentUser.email}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{currentUser.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button variant="ghost" onClick={openAuthDialog} className="text-foreground/70 hover:text-accent dark:hover:text-accent focus:outline-none focus:text-accent dark:focus:text-accent px-3 py-2 rounded-md">
              <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          )}
          
          {currentUser ? (
             <Link href="/#registration-form">
                <GradientBorderButton asChild>
                    Secure Your Place
                </GradientBorderButton>
             </Link>
          ) : (
            <GradientBorderButton onClick={openAuthDialog}>
              Register / Sign In
            </GradientBorderButton>
          )}
        </div>
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-4">
              <nav className="flex flex-col space-y-2 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium transition-colors text-foreground hover:text-accent dark:hover:text-accent focus:outline-none focus:text-accent dark:focus:text-accent hover:bg-accent/10 dark:hover:bg-accent/20 focus:bg-accent/10 dark:focus:bg-accent/20 px-3 py-2 rounded-md block"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="pt-6 border-t border-border/40 mt-4">
                  {loadingAuthState && <div className="h-10 bg-muted/50 animate-pulse rounded-md w-full my-2"></div>}
                  {!loadingAuthState && currentUser && (
                    <>
                      <div className="flex items-center space-x-3 px-2 py-2 mb-2">
                        <Avatar>
                          <AvatarImage src={currentUser.photoURL || undefined} />
                          <AvatarFallback>{getInitials(currentUser.displayName, currentUser.email)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{currentUser.displayName || "User"}</p>
                          <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => { logOut(); setMobileMenuOpen(false); }} className="w-full">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </>
                  )}
                  {!loadingAuthState && !currentUser && (
                    <Button variant="outline" onClick={() => { openAuthDialog(); setMobileMenuOpen(false);}} className="w-full">
                      <LogIn className="mr-2 h-4 w-4" /> Sign In / Register
                    </Button>
                  )}
                </div>
                 {currentUser ? (
                    <Link href="/#registration-form" onClick={() => setMobileMenuOpen(false)}>
                        <GradientBorderButton asChild className="w-full mt-4">
                             Secure Your Place
                        </GradientBorderButton>
                    </Link>
                  ) : (
                    <GradientBorderButton onClick={() => {openAuthDialog(); setMobileMenuOpen(false);}} className="w-full mt-4">
                      Register / Sign In
                    </GradientBorderButton>
                  )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
