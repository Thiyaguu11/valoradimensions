import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { DeviceStatusBar } from "@/components/layout/DeviceStatusBar";
import SmoothScroll from "@/components/ui/SmoothScroll";

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
        <div className="device-wrapper">
          <div className="device-chassis">
            {/* Camera Notch */}
            <div className="device-notch">
              <div className="device-notch-speaker"></div>
              <div className="device-notch-camera"></div>
            </div>

            {/* Mobile Status Bar */}
            <DeviceStatusBar />

            {/* Mobile Viewport */}
            <div className="device-viewport">
              <Navbar />
              {/* Lenis-managed scroll content (Navbar + CookieConsent stay fixed, outside) */}
              <div data-lenis-content className="flex-1 flex flex-col">
                <main className="flex-1 relative overflow-visible">
                  {children}
                </main>
                <Footer />
              </div>
              <CookieConsent />
            </div>

            {/* Home Indicator */}
            <div className="device-home-bar">
              <div className="device-home-indicator"></div>
            </div>
          </div>
        </div>
        <SmoothScroll />
      </body>
    </html>
  );
}
