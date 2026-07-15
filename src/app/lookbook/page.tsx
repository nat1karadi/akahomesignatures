import type { Metadata } from "next";
import { ImageReveal, TextReveal } from "@/components/Reveal";
import { GarmentImage } from "@/components/GarmentImage";
import { getProduct } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Lookbook — Akahome Signatures",
  description: "An editorial study of the Akahome Signatures house, in cloth and line.",
};

const SPREADS = [
  {
    slug: "overcoat",
    plate: "Plate 01",
    caption: "The car coat, in boiled wool. Cut generous enough to forget you are wearing a coat at all.",
  },
  {
    slug: "notch-blazer",
    plate: "Plate 02",
    caption: "A single-breasted block, half-canvas, left to soften with wear.",
  },
  {
    slug: "basted-trouser",
    plate: "Plate 03",
    caption: "Pleated, high-rise, basted at the waist so the fitting can still move.",
  },
  {
    slug: "oxford-shirt",
    plate: "Plate 04",
    caption: "Mother-of-pearl, a soft collar, a tail that behaves either way.",
  },
  {
    slug: "double-blazer",
    plate: "Plate 05",
    caption: "Donegal tweed, six-on-two, working cuff buttons cut to open.",
  },
];

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-24">
      <header className="mb-16 max-w-3xl">
        <p className="seam-mark spec mb-4">Lookbook</p>
        <h1 className="font-display text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.98] tracking-tight text-ink">
          <TextReveal text="Cloth, line, and" />
          <TextReveal text="the space between." delay={0.15} />
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate">
          A study of the house in five plates — the same restraint, seen at
          different distances.
        </p>
      </header>

      <div className="space-y-24 md:space-y-36">
        {SPREADS.map((s, i) => {
          const p = getProduct(s.slug)!;
          const flip = i % 2 === 1;
          return (
            <article
              key={s.slug}
              className={`grid items-center gap-8 md:grid-cols-2 ${
                flip ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <ImageReveal className="aspect-[4/5] w-full">
                <GarmentImage product={p} variant={i % 2 === 0 ? "a" : "b"} />
              </ImageReveal>
              <div className={flip ? "md:pr-10" : "md:pl-10"}>
                <p className="spec mb-4">{s.plate}</p>
                <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
                  {p.name}
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-slate">
                  {s.caption}
                </p>
                <p className="spec mt-5">{p.code}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
