import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assemble All FNQ | Flatpack Assembly Cairns",
  description:
    "Assemble All FNQ provides professional flatpack furniture assembly services in Cairns and surrounding Far North Queensland areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-white">
        <SiteHeader />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  );
}
