import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prebranch — Your next step, made simple",
  description: "A TD-inspired university prototype. Explore scripted banking guidance and simulated appointments. Not affiliated with TD.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="sr-only fixed left-3 top-3 z-[100] rounded-lg bg-primary px-4 py-3 text-sm text-white focus:not-sr-only">Skip to main content</a>{children}</body></html>;
}
