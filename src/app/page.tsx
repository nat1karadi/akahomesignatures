import Link from "next/link";
import { TextReveal, ImageReveal } from "@/components/Reveal";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { GarmentImage } from "@/components/GarmentImage";
import { Magnetic } from "@/components/Magnetic";
import { PRODUCTS, getProduct } from "@/lib/catalog";

const FEATURED = [
  "notch-blazer",
  "basted-trouser",
  "oxford-shirt",
  "overcoat",
  "waistcoat",
  "camp-knit",
].map((s) => PRODUCTS.find((p) => p.slug === s)!);

const PHRASES = [
  "Immaculate seams",
  "Restrained silhouettes",
  "Basted by hand",
  "Cut once, worn for decades",
  "The house of Akahome Signatures",
  "Selvedge edges",
  "Pattern paper & chalk",
];

export default function HomePage() {
  const coat = getProduct("overcoat")!;

  return (
    <div className="mx-auto max-w-bolt px-5 md:px-10">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="grid min-h-[86vh] items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="spec mb-6">Made-to-measure · Est. MMXXV</p>
          <h1 className="font-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-ink">
            <TextReveal text="Immaculate seams," />
            <TextReveal text="cut once." delay={0.2} />
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-slate">
            Akahome Signatures is a made-to-measure tailoring house. Every garment is cut
            from a single length of cloth and finished by one hand — no
            shortcuts sewn into the seam.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Magnetic strength={0.25}>
              <Link
                href="/shop"
                className="bg-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-paper"
                data-cursor="Shop"
              >
                Shop the house
              </Link>
            </Magnetic>
            <Magnetic strength={0.25}>
              <Link
                href="/contact"
                className="border border-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-ink"
                data-cursor="Book"
              >
                Book a fitting
              </Link>
            </Magnetic>
          </div>
        </div>

        <div className="relative">
          <ImageReveal className="aspect-[4/5] w-full">
            <GarmentImage product={getProduct("notch-blazer")!} variant="a" />
          </ImageReveal>
          <span className="spec absolute -bottom-6 right-0 text-ink/50">
            MRW-001 · SUPER 120S WOOL
          </span>
        </div>
      </section>

      {/* ── THE HOUSE ─────────────────────────────────────── */}
      <section className="grid gap-12 border-t border-mist py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="seam-mark spec mb-4">The House</p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            A cutting table, not a catalogue.
          </h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-slate">
          <TextReveal
            text="We begin with the body, not a size run. A client is measured, a block is drafted, and the cloth is laid out by hand with chalk and a ruler."
            as="p"
          />
          <TextReveal
            text="Each piece is basted first — pinned and stitched loosely so the shape can be revised at the fitting. Only when the line is right do we set the final seam."
            as="p"
            delay={0.1}
          />
        </div>
      </section>

      {/* ── FEATURED ──────────────────────────────────────── */}
      <section className="border-t border-mist py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="seam-mark spec mb-4">Featured</p>
            <h2 className="font-display text-4xl text-ink md:text-5xl">
              The fall cut
            </h2>
          </div>
          <Link
            href="/shop"
            className="font-mono text-[11px] uppercase tracking-spec text-ink underline underline-offset-4"
            data-cursor="All"
          >
            All pieces →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
          {FEATURED.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────── */}
      <Marquee items={PHRASES} />

      {/* ── THE CRAFT TEASER ─────────────────────────────── */}
      <section className="grid items-center gap-10 border-t border-mist py-20 md:grid-cols-2">
        <ImageReveal className="aspect-[5/4] w-full">
          <GarmentImage product={coat} variant="b" />
        </ImageReveal>
        <div>
          <p className="seam-mark spec mb-4">The Craft</p>
          <h2 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            Five hands, one garment.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
            From fabric selection to the final press, a single coat passes
            through five distinct stages. We documented each one.
          </p>
          <Magnetic strength={0.25} className="mt-8 inline-block">
            <Link
              href="/craft"
              className="font-mono text-[11px] uppercase tracking-spec text-ink underline underline-offset-4"
              data-cursor="Read"
            >
              Read the process →
            </Link>
          </Magnetic>
        </div>
      </section>
    </div>
  );
}
