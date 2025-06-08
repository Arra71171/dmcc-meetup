import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

export const metadata: Metadata = {
  title: 'DMCC-Community Event',
  description: 'Join the DMCC Community for an unforgettable event.',
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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-gradient-light dark:bg-gradient-dark text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
