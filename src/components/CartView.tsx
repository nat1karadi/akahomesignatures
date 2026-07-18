"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { GarmentImage } from "./GarmentImage";

export function CartView() {
  const { lines, subtotal, totalItems, updateQty, remove } = useCart();

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] px-6 text-center">
        <svg className="w-16 h-16 text-slate/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="font-display text-lg text-ink mb-2">Your bag is empty</p>
        <p className="text-slate text-sm mb-6">Add a garment to begin your order.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-mono text-[11px] uppercase tracking-spec hover:bg-ink/90 transition-colors"
        >
          Continue Shopping
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-mist pb-4 mb-4">
        <h2 className="font-display text-xl text-ink">Your Order ({totalItems})</h2>
      </header>

      <ul className="flex-1 overflow-y-auto space-y-4 pr-2">
        {lines.map((line) => (
          <li key={line.id} className="flex gap-4 pb-4 border-b border-mist last:border-0">
            <Link href={`/product/${line.item.slug}`} className="flex-shrink-0 w-20 h-20 relative">
              <GarmentImage item={line.item} className="w-full h-full" />
            </Link>
            <div className="flex-1 min-w-0">
              <Link href={`/product/${line.item.slug}`} className="font-display text-sm text-ink hover:text-ink/70 transition-colors block truncate">
                {line.item.name}
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-spec text-slate mt-1">
                {line.item.category} · {line.item.cloth}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center border border-mist bg-paper">
                  <button
                    onClick={() => updateQty(line.id, line.qty - 1)}
                    disabled={line.qty <= 1}
                    className="px-3 py-1.5 font-mono text-[11px] text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-mist transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 font-mono text-sm text-ink border-x border-mist bg-paper min-w-[2.5rem] text-center">
                    {line.qty}
                  </span>
                  <button
                    onClick={() => updateQty(line.id, line.qty + 1)}
                    className="px-3 py-1.5 font-mono text-[11px] text-ink hover:bg-mist transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <span className="font-mono text-sm text-ink ml-auto">
                  ₦{(line.item.price * line.qty).toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => remove(line.id)}
              className="flex-shrink-0 p-2 text-slate/50 hover:text-ink hover:bg-mist rounded-lg transition-colors"
              aria-label={`Remove ${line.item.name}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </li>
        ))}
      </ul>

      <footer className="border-t border-mist pt-6 mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate">Subtotal</span>
          <span className="font-mono text-ink">₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate">Fitting & Delivery</span>
          <span className="font-mono text-ink">To be confirmed</span>
        </div>
        <div className="flex justify-between text-lg font-display border-t border-mist pt-4">
          <span className="text-ink">Estimated Total</span>
          <span className="font-mono text-ink">₦{subtotal.toLocaleString()}+</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-spec text-slate/70 text-center">
          No payment now · Price confirmed over WhatsApp before cutting
        </p>

        <Link
          href="/order/new"
          className="block w-full bg-ink text-paper py-4 text-center font-mono text-[11px] uppercase tracking-spec hover:bg-ink/90 transition-colors"
        >
          Proceed to Order
        </Link>

        <Link
          href="/shop"
          className="block w-full text-center font-mono text-[11px] uppercase tracking-spec text-slate hover:text-ink transition-colors"
        >
          ← Continue Shopping
        </Link>
      </footer>
    </div>
  );
}