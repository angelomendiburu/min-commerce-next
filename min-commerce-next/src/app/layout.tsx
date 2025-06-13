import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavBarClient from "@/components/ui/nav-bar-client";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MinCommerce",
  description: "Un simple e-commerce con Next.js",
  icons: {
    icon: [
      { url: '/app/favicon.ico' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.ico', sizes: '16x16' },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBarClient />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
