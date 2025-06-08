
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/auth-context';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Meetei People's Convention, Delhi 2025 | DMCC",
  description: "Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Epilogue (Headings), Barlow (Subtitles/Buttons), DM Sans (Body) */}
        <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@600;700&family=Barlow:wght@500&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased text-foreground bg-background")}>
        <div className="absolute inset-0 -z-10 bg-pastel-gradient-overlay opacity-50 dark:opacity-30" />
        <div className="relative z-0 flex flex-col min-h-screen">
          <AuthProvider>
            <Header />
            <div className="flex-grow">
              {children}
            </div>
            <AuthDialog />
            <Toaster />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
