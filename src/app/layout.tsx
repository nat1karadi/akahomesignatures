import type { Metadata } from "next";
import "./globals.css";
import { fontDisplay, fontSans, fontMono } from "@/lib/fonts";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StitchLine } from "@/components/StitchLine";
import { Preloader } from "@/components/Preloader";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "MERROW — Made-to-Measure Tailoring",
  description:
    "MERROW is a made-to-measure tailoring house. Immaculate seams, restrained silhouettes, obsessive attention to garment construction.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="bg-paper font-sans text-ink antialiased">
        <Preloader />
        <CustomCursor />
        <StitchLine />
        <SmoothScroll>
          <Nav />
          <main className="pt-16">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
        <CartDrawer />
      </body>
    </html>
  );
}
