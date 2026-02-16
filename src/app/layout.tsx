import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const outfit = Outfit({
  subsets: ["latin"],
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
        className={`${outfit.variable} antialiased text-white relative selection:bg-violet-500/30 selection:text-violet-200`}
      >
        <Navbar />
        <main className="min-h-screen relative overflow-hidden">
          {/* Global Mesh Gradient Background */}
          <div className="fixed inset-0 z-[-1] pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" />
          </div>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
