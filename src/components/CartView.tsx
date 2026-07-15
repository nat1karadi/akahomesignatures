"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { GarmentImage } from "./GarmentImage";
import { CheckoutButton } from "./CheckoutButton";

export function CartView() {
  const { lines, remove, setQty } = useCart();

  const subtotal = lines.reduce((sum, l) => {
    const p = getProduct(l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-bolt px-5 py-24 text-center md:px-10">
        <p className="seam-mark spec mb-4 justify-center">Bag</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          Your bag is empty
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-slate">
          Nothing basted yet. Begin with a single, well-cut piece.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-paper"
          data-cursor="Shop"
        >
          Browse the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-24">
      <header className="mb-12">
        <p className="seam-mark spec mb-4">Bag</p>
        <h1 className="font-display text-5xl text-ink md:text-6xl">Your order</h1>
      </header>

      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y divide-mist border-t border-mist">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={`${l.slug}-${l.size}`} className="flex gap-5 py-6">
                <div className="h-32 w-24 shrink-0 overflow-hidden bg-chalk">
                  <GarmentImage product={p} variant="a" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-display text-lg text-ink">{p.name}</p>
                      <p className="spec mt-1">
                        {p.code} · Size {l.size}
                      </p>
                    </div>
                    <p className="font-mono text-sm text-ink">
                      {formatPrice(p.price * l.qty, p.currency)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3 border border-mist px-2">
                      <button
                        onClick={() => setQty(l.slug, l.size, l.qty - 1)}
                        className="py-1 text-ink"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="font-mono text-[11px]">{l.qty}</span>
                      <button
                        onClick={() => setQty(l.slug, l.size, l.qty + 1)}
                        className="py-1 text-ink"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(l.slug, l.size)}
                      className="font-mono text-[10px] uppercase tracking-spec text-slate hover:text-ink"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit border border-mist bg-chalk p-6 md:sticky md:top-24">
          <p className="spec mb-4">Summary</p>
          <div className="flex items-center justify-between border-b border-mist pb-3">
            <span className="font-sans text-sm text-ink">Subtotal</span>
            <span className="font-mono text-sm text-ink">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="font-sans text-sm text-slate">Shipping</span>
            <span className="font-mono text-[11px] uppercase tracking-spec text-slate">
              Calculated at checkout
            </span>
          </div>
          <div className="border-t border-mist pt-4">
            <CheckoutButton />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-spec text-slate">
              Secure payment via Stripe · You will be redirected to checkout
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
