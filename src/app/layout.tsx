import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "ASSETORY | Premium Real Estate Assets",
  description: "Own Smart. Grow Strong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <div className="bg-grain" />
        <div className="flex min-h-screen flex-col text-foreground relative">
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
