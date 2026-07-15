"use client";

import { useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { GarmentImage } from "./GarmentImage";
import { AddToBag } from "./AddToBag";
import { ProductCard } from "./ProductCard";

const FRAMES: { variant: "a" | "b"; zoom?: boolean; label: string }[] = [
  { variant: "a", label: "Front" },
  { variant: "b", label: "Detail" },
  { variant: "a", zoom: true, label: "Cloth" },
];

export function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const reduce = useReducedMotion();
  const [size, setSize] = useState<string | null>(null);
  const [frame, setFrame] = useState(0);
  const x = useMotionValue(0);

  const onDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) setFrame((f) => Math.min(f + 1, FRAMES.length - 1));
    else if (info.offset.x > 50) setFrame((f) => Math.max(f - 1, 0));
  };

  return (
    <div className="mx-auto max-w-bolt px-5 py-12 md:px-10 md:py-16">
      <Link
        href="/shop"
        className="spec mb-8 inline-block text-ink/60 hover:text-ink"
      >
        ← Collection
      </Link>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Gallery — draggable / swipeable */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-chalk">
            <motion.div
              className="flex h-full w-full"
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={onDragEnd}
              animate={{ x: `-${frame * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ x: reduce ? undefined : x }}
            >
              {FRAMES.map((f, i) => (
                <div key={i} className="h-full w-full shrink-0">
                  <div
                    className="h-full w-full"
                    style={f.zoom ? { transform: "scale(1.18)" } : undefined}
                  >
                    <GarmentImage
                      product={product}
                      variant={f.variant}
                      className="h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex gap-2">
              {FRAMES.map((f, i) => (
                <button
                  key={i}
                  onClick={() => setFrame(i)}
                  aria-label={`View ${f.label}`}
                  className={`h-1.5 w-8 ${
                    i === frame ? "bg-ink" : "bg-mist"
                  }`}
                />
              ))}
            </div>
            <span className="spec">Drag to explore</span>
          </div>
        </div>

        {/* Detail */}
        <div>
          <p className="spec mb-3">{product.code}</p>
          <h1 className="font-display text-4xl leading-tight text-ink md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-lg text-ink">
            {formatPrice(product.price, product.currency)}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate">
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mt-9">
            <div className="flex items-center justify-between">
              <span className="spec">Size</span>
              <span className="spec text-ink/50">Made to your measurements</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 border px-4 py-2 font-mono text-[12px] transition-colors ${
                    size === s
                      ? "border-ink bg-ink text-paper"
                      : "border-mist text-ink hover:border-ink"
                  }`}
                  data-cursor={size === s ? undefined : "Select"}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <AddToBag product={product} size={size} />
          </div>

          {/* Care / spec label — styled like a garment tag */}
          <div className="mt-10 border border-ink/30 bg-chalk p-5">
            <p className="spec mb-3">Specification &amp; care</p>
            <dl className="space-y-2 font-mono text-[11px] uppercase tracking-spec text-ink">
              <div className="flex justify-between gap-4 border-b border-mist pb-2">
                <dt className="text-slate">Composition</dt>
                <dd className="text-right">{product.composition}</dd>
              </div>
              <div className="border-b border-mist pb-2">
                <dt className="text-slate">Care</dt>
                <dd className="mt-1 space-y-1">
                  {product.care.map((c) => (
                    <div key={c} className="text-right">
                      {c}
                    </div>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate">Cloth</dt>
                <dd className="max-w-[60%] text-right normal-case tracking-normal">
                  {product.fabric}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Cross-sell */}
      {related.length > 0 && (
        <section className="mt-24 border-t border-mist pt-12">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-display text-3xl text-ink md:text-4xl">
              Worn with
            </h2>
            <Link
              href="/shop"
              className="font-mono text-[11px] uppercase tracking-spec text-ink underline underline-offset-4"
            >
              All pieces →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
