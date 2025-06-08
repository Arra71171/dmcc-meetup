
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Header } from '@/components/layout/header';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Meetei People's Convention, Delhi 2025 | DMCC",
  description: "Join the Delhi Meetei Coordinating Committee for the Meetei People's Convention 2025. Celebrating heritage, honoring our foundation, and shaping a brighter tomorrow on June 15, 2025, at JNU Convention Center, New Delhi.",
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
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased text-foreground">
        <div className="fixed inset-0 -z-10">
          <Image
            src="https://placehold.co/1920x1080.png"
            alt="DMCC Community Event Background"
            layout="fill"
            objectFit="cover"
            quality={80}
            className="opacity-10 dark:opacity-5"
            data-ai-hint="abstract community celebration"
          />
          <div className="absolute inset-0 bg-black/[.85] dark:bg-black/[.90]" />
        </div>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
