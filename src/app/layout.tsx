import type { Metadata, Viewport } from "next"; // Added Viewport here
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This makes the iOS status bar black and allows content to flow behind it
export const viewport: Viewport = {
  themeColor: 'black',
};

// 2. Metadata handles the Apple Web App settings
export const metadata: Metadata = {
  title: "Gentleman's Classic",
  description: "Live scoring and OAD tracking",
  icons: {
    apple: "/icon.png", // Points to your image in the 'public' folder
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: "Gentleman's Classic",
  },
  openGraph: {
    title: "Gentleman's Classic Tracker",
    description: "Track the leaderboard and OAD picks in real-time.",
    url: "https://gentlemans-app.vercel.app",
    siteName: "Gentleman's Classic Tracker",
    images: [{ url: "/SharingPic.png", width: 1200, height: 630, alt: "Gentleman's Classic Tracker" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentleman's Classic Tracker",
    description: "Real-time scoring and OAD tracking.",
    images: ["/SharingPic.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <main className="pb-24">
          {children}
        </main>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
};