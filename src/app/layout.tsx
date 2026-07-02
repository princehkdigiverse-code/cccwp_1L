import type { Metadata, Viewport } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition/PageTransition";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Chhab Chhaba Chhab Waterpark | Premium Water Park Experience",
  description: "Dive into a premium cinematic waterpark experience. Experience massive slides, wave pools, luxury amenities, and beautiful moments at Chhab Chhaba Chhab.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071C2C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <body 
        className="bg-bg-dark text-white font-sans selection:bg-primary selection:text-bg-dark min-h-screen"
      >
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
