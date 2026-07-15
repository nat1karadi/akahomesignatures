import type { Metadata } from "next";
import { TextReveal, ImageReveal } from "@/components/Reveal";
import { GarmentImage } from "@/components/GarmentImage";
import { PRODUCTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Craft — MERROW",
  description:
    "How a MERROW garment is made: fabric selection, cutting, stitching, fitting, finishing.",
};

const STEPS = [
  {
    n: "01",
    title: "Fabric selection",
    body: "We choose the cloth first — its weight, its hand, the way it will fall. A Super 120s wool for a city blazer; a boiled wool for a coat that must hold its line in wind.",
    slug: "notch-blazer",
  },
  {
    n: "02",
    title: "Cutting",
    body: "The block is drafted to the client, then laid on the cloth with chalk and a ruler. A single length is cut — no off-cuts reused, no compromise in the grain.",
    slug: "double-blazer",
  },
  {
    n: "03",
    title: "Stitching",
    body: "The canvas is sewn by hand so the chest can be shaped over time. Lapels are rolled, not pressed flat. Every seam is finished on the inside as cleanly as the outside.",
    slug: "waistcoat",
  },
  {
    n: "04",
    title: "Fitting",
    body: "The garment is basted — pinned and loosely stitched — and tried on. The line is corrected at the body before a single final seam is set.",
    slug: "basted-trouser",
  },
  {
    n: "05",
    title: "Finishing",
    body: "Edges are felled, buttons are sewn on with a shank, the cloth is pressed over a ham. The piece leaves the house ready to be worn for decades.",
    slug: "overcoat",
  },
];

export default function CraftPage() {
  return (
    <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-24">
      <header className="max-w-3xl">
        <p className="seam-mark spec mb-4">The Craft</p>
        <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.98] tracking-tight text-ink">
          <TextReveal text="A garment is a sequence," />
          <TextReveal text="not a single act." delay={0.15} />
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate">
          MERROW keeps the whole making under one roof. From the bolt to the
          button, a piece passes through five hands and five stages — and we
          think the order is the point.
        </p>
      </header>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <ImageReveal className="aspect-[4/5] w-full">
          <GarmentImage product={PRODUCTS[0]} variant="b" />
        </ImageReveal>
        <div className="flex flex-col justify-center">
          <p className="font-display text-3xl leading-snug text-ink">
            “We would rather cut once and wait than cut twice and regret.”
          </p>
          <p className="spec mt-4">— The house, on its own method</p>
        </div>
      </div>

      {/* The numbered sequence — the only place markers are used, because
          making a garment genuinely is a sequence. */}
      <section className="mt-24 border-t border-mist pt-16">
        <p className="seam-mark spec mb-10">The making, in order</p>
        <ol className="space-y-16">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className="grid gap-8 md:grid-cols-[auto_1fr_0.8fr] md:items-center"
            >
              <span className="font-mono text-sm text-slate">{s.n}</span>
              <div>
                <h2 className="font-display text-3xl text-ink md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
                  {s.body}
                </p>
              </div>
              <ImageReveal
                className={`aspect-[4/5] w-full ${
                  i % 2 === 0 ? "md:order-last" : ""
                }`}
              >
                <GarmentImage
                  product={PRODUCTS.find((p) => p.slug === s.slug)!}
                  variant="a"
                />
              </ImageReveal>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
