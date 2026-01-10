import type { Metadata } from "next";
import { Syne, Geist, Geist_Mono } from "next/font/google";
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

const syne = Syne({
  weight: "600",
  variable: "--font-syne",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gentleman's Classic",
  description: "Live scoring and OAD tracking",
  openGraph: {
    title: "Golf Pool Live",
    description: "Track the leaderboard and OAD picks in real-time.",
    url: "https://gentlemans-app.vercel.app", // Replace with your actual URL
    siteName: "Gentleman's Classic Tracker",
    images: [
      {
        url: "/SharingPic.png", // This points to a file in your 'public' folder
        width: 1200,
        height: 630,
        alt: "Gentleman's Classic Tracker",
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased bg-black`}
      >
        <main className="pb-24"> {/* Added padding so BottomNav doesn't cover content */}
          {children}
        </main>
        <BottomNav />
        <Analytics />
      </body>
    </html>
  );
}
