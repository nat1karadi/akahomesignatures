"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/types";

/**
 * Add-to-bag with a quiet confirmation micro-interaction: the button morphs to
 * a small "Added" state, and the cart drawer slides in (the bag icon also
 * bumps via Nav). Confirms the action happened without shouting.
 */
export function AddToBag({
  product,
  size,
}: {
  product: Product;
  size: string | null;
}) {
  const reduce = useReducedMotion();
  const add = useCart((s) => s.add);
  const openDrawer = useCart((s) => s.openDrawer);
  const [added, setAdded] = useState(false);
  const disabled = !size;

  const onClick = () => {
    if (!size) return;
    add(product.slug, size, 1);
    openDrawer();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-cursor={disabled ? undefined : "Add"}
      className="relative w-full overflow-hidden bg-ink py-4 font-mono text-[11px] uppercase tracking-spec text-paper transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
    >
      <motion.span
        key={added ? "added" : "idle"}
        initial={reduce ? { opacity: 0 } : { y: added ? 14 : -14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {disabled
          ? "Select a size"
          : added
            ? "Added to bag ✓"
            : "Add to bag"}
      </motion.span>
    </button>
  );
}
