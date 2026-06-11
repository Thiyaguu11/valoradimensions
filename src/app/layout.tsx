import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Valora Dimensions | Growth-Driven Marketing",
  description: "Valora Dimensions is a growth-driven marketing partner helping brands scale through strategy, content, and performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased text-white relative selection:bg-blue-500/30 selection:text-blue-200 font-sans`}
      >
        <Navbar />
        <main className="min-h-screen relative overflow-hidden">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
