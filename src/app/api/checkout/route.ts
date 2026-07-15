import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { PRODUCTS } from "@/lib/catalog";

/**
 * Creates a Stripe Checkout Session from the current cart and returns the
 * hosted-checkout URL. The browser then redirects there; Stripe sends the
 * customer to /order/{session_id} on success.
 *
 * Requires STRIPE_SECRET_KEY in .env.local (test mode is fine). See README.
 */
export async function POST(req: NextRequest) {
  let body: { items?: { slug: string; size: string; qty: number }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!secret || secret.startsWith("sk_test_xxx")) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add a real STRIPE_SECRET_KEY to .env.local (test mode is fine).",
      },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-04-10" });

  const line_items = (body.items ?? [])
    .map((it) => {
      const p = PRODUCTS.find((x) => x.slug === it.slug);
      if (!p) return null;
      return {
        quantity: Math.max(1, it.qty),
        price_data: {
          currency: p.currency.toLowerCase(),
          unit_amount: Math.round(p.price * 100),
          product_data: {
            name: `${p.name} — ${p.code}`,
            description: `Size ${it.size}`,
            metadata: { slug: p.slug, size: it.size },
          },
        },
      };
    })
    .filter(Boolean);

  if (line_items.length === 0) {
    return NextResponse.json({ error: "No valid items in cart" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: line_items as Stripe.Checkout.SessionCreateParams.LineItem[],
    success_url: `${site}/order/{CHECKOUT_SESSION_ID}`,
    cancel_url: `${site}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
