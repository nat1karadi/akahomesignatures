"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useCart, cartCount } from "@/lib/cart-store";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { GarmentImage } from "./GarmentImage";

export function CartDrawer() {
  const reduce = useReducedMotion();
  const {
    lines,
    drawerOpen,
    closeDrawer,
    remove,
    setQty,
  } = useCart();
  const count = cartCount(lines);

  const subtotal = lines.reduce((sum, l) => {
    const p = getProduct(l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[55] flex h-screen w-full max-w-[420px] flex-col bg-paper shadow-2xl"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-mist px-6 py-5">
              <p className="font-display text-xl text-ink">
                Bag {count > 0 && `· ${count}`}
              </p>
              <button
                onClick={closeDrawer}
                className="font-mono text-[11px] uppercase tracking-spec text-ink"
                data-cursor="Close"
                aria-label="Close bag"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-start justify-center gap-4">
                  <p className="text-sm text-slate">Your bag is empty.</p>
                  <Link
                    href="/shop"
                    onClick={closeDrawer}
                    className="font-mono text-[11px] uppercase tracking-spec text-ink underline underline-offset-4"
                  >
                    Browse the collection
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-mist">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => {
                      const p = getProduct(l.slug);
                      if (!p) return null;
                      return (
                        <motion.li
                          key={`${l.slug}-${l.size}`}
                          layout
                          initial={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, x: 30 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="flex gap-4 py-5"
                        >
                          <div className="h-24 w-20 shrink-0 overflow-hidden">
                            <GarmentImage product={p} variant="a" />
                          </div>
                          <div className="flex flex-1 flex-col">
                            <div className="flex justify-between gap-2">
                              <p className="font-sans text-sm text-ink">
                                {p.name}
                              </p>
                              <p className="font-mono text-[11px] text-ink">
                                {formatPrice(p.price * l.qty, p.currency)}
                              </p>
                            </div>
                            <p className="spec mt-1">{p.code} · SIZE {l.size}</p>
                            <div className="mt-auto flex items-center justify-between pt-3">
                              <div className="flex items-center gap-3 border border-mist px-2">
                                <button
                                  onClick={() =>
                                    setQty(l.slug, l.size, l.qty - 1)
                                  }
                                  className="py-1 text-ink"
                                  aria-label="Decrease quantity"
                                >
                                  –
                                </button>
                                <span className="font-mono text-[11px]">
                                  {l.qty}
                                </span>
                                <button
                                  onClick={() =>
                                    setQty(l.slug, l.size, l.qty + 1)
                                  }
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
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-mist px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="spec">Subtotal</span>
                  <span className="font-mono text-sm text-ink">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 spec">
                  Shipping &amp; duties calculated at checkout
                </p>
                <Link
                  href="/cart"
                  onClick={closeDrawer}
                  className="mt-4 block w-full bg-ink py-3 text-center font-mono text-[11px] uppercase tracking-spec text-paper"
                  data-cursor="Checkout"
                >
                  Proceed to checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
