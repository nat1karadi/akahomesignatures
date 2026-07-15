"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-store";

/** Best-effort: empties the persisted bag once the customer lands on the
 *  confirmation page. Runs only on the client. */
export function ClearCartOnMount() {
  const clear = useCart((s) => s.clear);
  useEffect(() => {
    // Defer a tick so the confirmation can read the contents first if needed.
    const t = setTimeout(() => clear(), 50);
    return () => clearTimeout(t);
  }, [clear]);
  return null;
}
