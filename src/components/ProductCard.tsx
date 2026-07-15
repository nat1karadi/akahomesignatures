"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { GarmentImage } from "./GarmentImage";

/**
 * Product card. Hover crossfades to an alternate "frame" of the placeholder
 * imagery, lifts with a soft shadow and a 1.03 scale (transform/opacity only).
 */
export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block"
      data-cursor="View"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-chalk">
        <div className="absolute inset-0 transition-transform duration-700 ease-thread group-hover:scale-[1.03]">
          <GarmentImage
            product={product}
            variant="a"
            className="transition-opacity duration-500 group-hover:opacity-0"
          />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <GarmentImage product={product} variant="b" />
          </div>
        </div>
        <span className="spec absolute right-3 top-3 text-ink/45">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-lg leading-tight text-ink">
            {product.name}
          </h3>
          <p className="spec mt-1">{product.code}</p>
        </div>
        <p className="font-mono text-sm text-ink">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
