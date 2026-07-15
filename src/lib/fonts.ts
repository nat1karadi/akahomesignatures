import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

// Display — Fraunces variable, low optical size for an elegant, slightly
// handmade couture feel. Used for hero lines, section titles, product names.
export const fontDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  // soft, low-contrast optical setting for the couture feel
  axes: ["opsz", "SOFT"],
});

// Body / UI — Inter (explicitly allowed fallback for General Sans).
// To swap in General Sans from Fontshare, replace with a localFont import.
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Utility / mono — borrowed from an actual tailor's spec tag.
export const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
