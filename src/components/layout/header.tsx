
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './logo';
import { GradientBorderButton } from '@/components/ui/gradient-border-button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, LogOut, LogIn, UserCircle, ChevronDown, LayoutDashboard, ShieldAlert } from 'lucide-react';
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
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/#highlights', label: 'Highlights' },
  { href: '/#registration-form', label: 'Register' },
];

export function Header() {
  const { currentUser, loadingAuthState, logOut, openAuthDialog, isAdminOverrideLoggedIn } = useAuth();
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

  const effectiveUserDisplay = isAdminOverrideLoggedIn 
    ? { displayName: "Admin", email: "Administrator", photoURL: null, isOverride: true } 
    : currentUser;


  return (
    <header className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/80 dark:bg-background/70 backdrop-blur-md", 
        "border-b border-border/60"
      )}>
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden md:flex items-center space-x-1 font-subtitle text-base">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors text-foreground/80 hover:text-primary dark:hover:text-primary focus:outline-none focus:text-primary px-4 py-2 rounded-md hover:bg-primary/10 focus:bg-primary/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/admin" passHref>
            <Button variant="ghost" className="font-subtitle text-base text-foreground/80 hover:text-primary dark:hover:text-primary focus:outline-none focus:text-primary hover:bg-primary/10 focus:bg-primary/10 px-4 py-2 rounded-md">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              Admin
            </Button>
          </Link>

          {loadingAuthState ? (
            <div className="h-10 w-24 bg-muted/50 animate-pulse rounded-md"></div>
          ) : effectiveUserDisplay ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 rounded-full px-3 text-foreground hover:text-foreground font-subtitle">
                   <Avatar className={cn("h-9 w-9 mr-2 border border-border", effectiveUserDisplay.isOverride && "border-destructive")}>
                    <AvatarImage src={effectiveUserDisplay.photoURL || undefined} alt={effectiveUserDisplay.displayName || effectiveUserDisplay.email || 'User'} />
                    <AvatarFallback className={cn(effectiveUserDisplay.isOverride && "bg-destructive/20 text-destructive")}>
                      {effectiveUserDisplay.isOverride ? <ShieldAlert className="h-5 w-5" /> : getInitials(effectiveUserDisplay.displayName, effectiveUserDisplay.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="truncate max-w-[100px]">{effectiveUserDisplay.displayName || effectiveUserDisplay.email}</span>
                  <ChevronDown className="ml-1.5 h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal font-body">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{effectiveUserDisplay.displayName || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {effectiveUserDisplay.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logOut} className="font-subtitle">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <Button variant="ghost" onClick={() => openAuthDialog()} className="font-subtitle text-base text-foreground/80 hover:text-primary dark:hover:text-primary focus:outline-none focus:text-primary hover:bg-primary/10 focus:bg-primary/10 px-4 py-2 rounded-md">
              <LogIn className="mr-2 h-5 w-5" /> Sign In
            </Button>
          )}
          
          <GradientBorderButton 
            onClick={effectiveUserDisplay ? undefined : () => openAuthDialog()} 
            asChild={!!effectiveUserDisplay}
            className="text-sm"
            >
            {effectiveUserDisplay ? (
              <Link href="/#registration-form">Register for the Gathering</Link>
            ) : (
              "Register / Sign In"
            )}
          </GradientBorderButton>
        </div>
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background p-4">
              <nav className="flex flex-col space-y-2 mt-8 font-subtitle">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg transition-colors text-foreground hover:text-primary focus:outline-none focus:text-primary px-3 py-2 rounded-md block"
                  >
                    {item.label}
                  </Link>
                ))}
                 <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg transition-colors text-foreground hover:text-primary focus:outline-none focus:text-primary px-3 py-2 rounded-md block"
                  >
                    <LayoutDashboard className="inline-block mr-2 h-5 w-5" /> Admin
                  </Link>
                <div className="pt-6 border-t border-border/40 mt-4">
                  {loadingAuthState && <div className="h-10 bg-muted/50 animate-pulse rounded-md w-full my-2"></div>}
                  {!loadingAuthState && effectiveUserDisplay && (
                    <>
                      <div className="flex items-center space-x-3 px-2 py-2 mb-2 font-body">
                        <Avatar className={cn(effectiveUserDisplay.isOverride && "border-destructive")}>
                          <AvatarImage src={effectiveUserDisplay.photoURL || undefined} />
                           <AvatarFallback className={cn(effectiveUserDisplay.isOverride && "bg-destructive/20 text-destructive")}>
                             {effectiveUserDisplay.isOverride ? <ShieldAlert className="h-5 w-5" /> : getInitials(effectiveUserDisplay.displayName, effectiveUserDisplay.email)}
                           </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{effectiveUserDisplay.displayName || "User"}</p>
                          <p className="text-xs text-muted-foreground">{effectiveUserDisplay.email}</p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={() => { logOut(); setMobileMenuOpen(false); }} className="w-full font-subtitle">
                        <LogOut className="mr-2 h-4 w-4" /> Sign Out
                      </Button>
                    </>
                  )}
                  {!loadingAuthState && !effectiveUserDisplay && (
                    <Button variant="outline" onClick={() => { openAuthDialog(); setMobileMenuOpen(false);}} className="w-full font-subtitle">
                      <LogIn className="mr-2 h-4 w-4" /> Sign In / Register
                    </Button>
                  )}
                </div>
                <GradientBorderButton 
                    onClick={() => { if(!effectiveUserDisplay) openAuthDialog(); setMobileMenuOpen(false);}} 
                    asChild={!!effectiveUserDisplay}
                    className="w-full mt-4 text-sm">
                     {effectiveUserDisplay ? (
                        <Link href="/#registration-form">Register for the Gathering</Link>
                    ) : (
                        "Register / Sign In"
                    )}
                </GradientBorderButton>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
