import type { Metadata } from "next";
import Link from "next/link";
import Stripe from "stripe";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Order confirmed — Akahome Signatures",
};

interface Confirmation {
  id: string;
  email: string | null;
  total: number;
  currency: string;
  items: { name: string; qty: number }[];
  demo: boolean;
}

async function loadConfirmation(id: string): Promise<Confirmation> {
  const secret = process.env.STRIPE_SECRET_KEY;
  const demo: Confirmation = {
    id,
    email: null,
    total: 0,
    currency: "GBP",
    items: [],
    demo: true,
  };

  if (!secret || secret.startsWith("sk_test_xxx")) return demo;

  try {
    const stripe = new Stripe(secret, { apiVersion: "2024-04-10" });
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ["line_items"],
    });
    const items =
      session.line_items?.data.map((li) => ({
        name: li.description ?? "Akahome Signatures piece",
        qty: li.quantity ?? 1,
      })) ?? [];
    return {
      id: session.id,
      email: (session.customer_details?.email as string) ?? null,
      total: session.amount_total ?? 0,
      currency: session.currency ?? "gbp",
      items,
      demo: false,
    };
  } catch {
    return demo;
  }
}

export default async function OrderPage({
  params,
}: {
  params: { id: string };
}) {
  const c = await loadConfirmation(params.id);

  return (
    <div className="mx-auto max-w-bolt px-5 py-20 md:px-10 md:py-28">
      <ClearCartOnMount />
      <div className="mx-auto max-w-xl text-center">
        <p className="seam-mark spec mb-6 justify-center">Order</p>
        <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">
          Thank you.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate">
          Your commission has been placed. A confirmation will follow by email,
          and your cutter will be in touch to arrange the first fitting.
        </p>

        {c.email && (
          <p className="mt-3 font-mono text-[11px] uppercase tracking-spec text-ink/60">
            Sent to {c.email}
          </p>
        )}

        <div className="mt-10 border border-mist bg-chalk p-6 text-left">
          <div className="flex items-center justify-between border-b border-mist pb-3">
            <span className="spec">Order ref</span>
            <span className="font-mono text-[11px] text-ink">{c.id}</span>
          </div>

          {!c.demo && c.items.length > 0 && (
            <ul className="divide-y divide-mist py-3">
              {c.items.map((it, i) => (
                <li
                  key={i}
                  className="flex justify-between gap-3 py-2 font-mono text-[11px] uppercase tracking-spec text-ink"
                >
                  <span>{it.name}</span>
                  <span className="text-slate">×{it.qty}</span>
                </li>
              ))}
            </ul>
          )}

          {!c.demo && (
            <div className="flex items-center justify-between border-t border-mist pt-3">
              <span className="spec">Total paid</span>
              <span className="font-mono text-sm text-ink">
                {formatPrice(c.total / 100, c.currency.toUpperCase())}
              </span>
            </div>
          )}

          {c.demo && (
            <p className="py-3 font-mono text-[11px] uppercase tracking-spec text-ink/60">
              Demo confirmation — Stripe keys are not configured, so live order
              details are unavailable. Add your keys to see the real summary.
            </p>
          )}
        </div>

        <Link
          href="/shop"
          className="mt-10 inline-block bg-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-paper"
          data-cursor="Shop"
        >
          Continue browsing
        </Link>
      </div>
    </div>
  );
}
