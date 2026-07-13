import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P, Anton } from "next/font/google";
import "./globals.css";
import Neko from "@/components/Neko";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const hero = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-hero",
});

export const metadata: Metadata = {
  title: "Zoha Malik",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${pixel.variable} ${hero.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Neko Cat */}
        <Neko />
      </body>
    </html>
  );
}