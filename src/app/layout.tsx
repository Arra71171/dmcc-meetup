
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/contexts/auth-context';
import { RegistrationProvider } from '@/contexts/registration-context';
import { AuthDialog } from '@/components/auth/auth-dialog';
import { Header } from '@/components/layout/header';
import { cn } from '@/lib/utils';

import { SmoothScrollProvider } from '@/lib/smooth-scroll';
import { CursorSpotlight } from '@/components/ui/cursor-spotlight';

export const metadata: Metadata = {
  metadataBase: new URL('https://dmcc-event.netlify.app'),
  title: "Meetei People's Convention, Delhi 2025 | DMCC",
  description: "Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow",
  icons: {
    icon: "/dmcc-logo.png",
    shortcut: "/dmcc-logo.png",
    apple: "/dmcc-logo.png",
  },
  openGraph: {
    title: "Meetei People's Convention, Delhi 2025 | DMCC",
    description: "Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow",
    images: ['/dmcc-logo.png'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meetei People's Convention, Delhi 2025 | DMCC",
    description: "Celebrating Our Heritage, Honoring Our Foundation, and Shaping a Brighter Tomorrow",
    images: ['/dmcc-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Using our imported font stack: Cabinet Grotesk (Headings), Inter (Body) */}
      </head>
      <body className={cn("font-body antialiased text-foreground bg-background")}>

          <SmoothScrollProvider>
            {/* Interactive cursor spotlight effect */}
            <CursorSpotlight size={250} blur={120} />
            
            <div className="absolute inset-0 -z-10 bg-midnight-bloom-gradient opacity-10 blur-3xl dark:opacity-5" />
            <div className="relative z-0 flex flex-col min-h-screen">
              <AuthProvider>
                <RegistrationProvider>
                  <Header />
                  <div className="flex-grow">
                    {children}
                  </div>
                  <AuthDialog />
                  <Toaster />
                </RegistrationProvider>
              </AuthProvider>
            </div>
          </SmoothScrollProvider>

      </body>
    </html>
  );
}
