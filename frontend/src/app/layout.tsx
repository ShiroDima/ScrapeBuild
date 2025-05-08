import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/shared/providers";
import { ClerkProvider } from "@clerk/nextjs"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScrapeBuild",
  description: "Scrape websites by building your own scrapers using drag and drop workflows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider afterSignOutUrl={"/sign-in"}>
        <html lang="en" suppressHydrationWarning>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <AppProviders>
              {children}
            </AppProviders>
          </body>
        </html>
      </ClerkProvider>
  );
}
