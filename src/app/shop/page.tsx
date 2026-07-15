import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata: Metadata = {
  title: "Shop — Akahome Signatures",
  description: "The Akahome Signatures collection: tailoring, shirting, trousers, outerwear.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-24">
      <header className="mb-12">
        <p className="seam-mark spec mb-4">Collection</p>
        <h1 className="font-display text-5xl text-ink md:text-6xl">
          The pieces
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
          Each made to measure. Filter by category or by the cloth it is cut
          from.
        </p>
      </header>
      <ShopGrid />
    </div>
  );
}
