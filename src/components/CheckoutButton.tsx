"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";

/**
 * Posts the current cart to /api/checkout and redirects to Stripe-hosted
 * checkout. Surfaces a clear message if Stripe isn't configured yet.
 */
export function CheckoutButton() {
  const lines = useCart((s) => s.lines);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setError(data.error || "Could not start checkout.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error starting checkout.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        disabled={loading || lines.length === 0}
        data-cursor="Pay"
        className="w-full bg-ink py-4 font-mono text-[11px] uppercase tracking-spec text-paper disabled:opacity-40"
      >
        {loading ? "Redirecting…" : "Proceed to secure checkout"}
      </button>
      {error && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-spec text-ink/70">
          {error}
        </p>
      )}
    </div>
  );
}
