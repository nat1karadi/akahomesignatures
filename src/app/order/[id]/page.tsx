"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/whatsapp";

type OrderData = {
  id: string;
  timestamp: number;
  lines: Array<{
    slug: string;
    name: string;
    price: number;
    qty: number;
    image?: string;
  }>;
  customer: {
    name: string;
    phone: string;
    email: string;
    colour: string;
    address: string;
    notes: string;
  };
  subtotal: number;
};

function generateOrderId() {
  const now = Date.now();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `AKH-${now.toString(36).toUpperCase()}-${random}`;
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [whatsappUrl, setWhatsAppUrl] = useState<string | null>(null);

  useEffect(() => {
    params.then(({ id }) => {
      if (id === "new") return;
      try {
        const stored = sessionStorage.getItem(`order-${id}`);
        if (stored) {
          const data = JSON.parse(stored) as OrderData;
          setOrder(data);
          const msg = buildMessage(data);
          setWhatsAppUrl(whatsappLink(msg));
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      }
    });
  }, [params]);

  if (!order) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in">
          {notFound ? (
            <>
              <p className="font-display text-2xl text-ink mb-2">Order not found</p>
              <p className="text-slate mb-6">This order reference doesn't exist or has expired.</p>
              <Link href="/order/new" className="inline-block bg-ink py-3 px-8 font-mono text-[11px] uppercase tracking-spec text-paper">
                Place a New Order
              </Link>
            </>
          ) : (
            <p className="font-display text-xl text-slate">Loading…</p>
          )}
        </div>
        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.4s ease-out; }
        `}</style>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] px-4 md:px-8">
      <div className="max-w-3xl mx-auto py-12 md:py-20 animate-fade-in">
        {/* Header */}
        <header className="mb-10 md:mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-thread mb-3">
            Order Confirmed
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-ink mb-3">
            Thank you, {order.customer.name.split(" ")[0]}.
          </h1>
          <p className="text-slate leading-relaxed max-w-md mx-auto">
            Your order has been received. We&apos;ll message you on WhatsApp shortly to confirm the price, discuss fabric options, and arrange your first fitting.
          </p>
        </header>

        {/* Order Reference */}
        <div className="border-t border-b border-mist py-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-spec text-slate mb-1">
                Order Reference
              </p>
              <p className="font-mono text-lg tracking-wide text-ink">{order.id}</p>
            </div>
            <div className="text-right sm:text-left">
              <p className="font-mono text-[10px] uppercase tracking-spec text-slate mb-1">
                Placed
              </p>
              <p className="text-slate">{formatDate(order.timestamp)}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <section className="mb-10">
          <p className="font-mono text-[10px] uppercase tracking-spec text-slate mb-4">
            Your Selection
          </p>
          <div className="space-y-4">
            {order.lines.map((line, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 border border-mist bg-paper/50">
                <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 bg-chalk rounded-lg overflow-hidden">
                  {line.image ? (
                    <img src={line.image} alt={line.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display text-2xl text-thread">{line.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-display text-lg text-ink">{line.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-spec text-thread mt-1">
                    Qty: {line.qty} × {formatPrice(line.price)}
                  </p>
                  {order.customer.colour && (
                    <p className="font-mono text-[11px] uppercase tracking-spec text-slate mt-1">
                      Colour: {order.customer.colour}
                    </p>
                  )}
                </div>
                <div className="text-right flex flex-col justify-center items-end sm:items-end">
                  <p className="font-display text-lg text-ink">{formatPrice(line.price * line.qty)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Totals */}
        <section className="border-t border-mist pt-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:justify-end gap-2 text-right">
            <div className="flex justify-between w-full sm:w-auto gap-4">
              <span className="text-slate">Subtotal</span>
              <span className="font-mono text-ink">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between w-full sm:w-auto gap-4 border-t border-mist pt-2">
              <span className="font-display text-ink">Total</span>
              <span className="font-display text-xl text-ink">{formatPrice(order.subtotal)}</span>
            </div>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-spec text-slate/60 mt-4 text-right">
            No payment due now · Final price confirmed after fabric selection
          </p>
        </section>

        {/* Next Steps */}
        <section className="mb-10 p-6 border border-mist bg-paper/50">
          <p className="font-mono text-[10px] uppercase tracking-spec text-slate mb-4">
            What happens next
          </p>
          <ol className="space-y-3 text-slate leading-relaxed">
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-ink/50 shrink-0">01</span>
              We&apos;ll message you on WhatsApp within a few hours to confirm fabric, colour, and pricing.
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-ink/50 shrink-0">02</span>
              We&apos;ll arrange your first fitting (at our workshop or a location that suits you).
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-[11px] text-ink/50 shrink-0">03</span>
              Your garment enters our 5-stage making process — you&apos;ll receive updates at each milestone.
            </li>
          </ol>
        </section>

        {/* WhatsApp CTA */}
        <section className="mb-10 text-center">
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] py-4 px-8 font-mono text-[11px] uppercase tracking-spec text-white hover:opacity-90 transition-opacity"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
              </svg>
              Open WhatsApp to Continue
            </a>
          )}
          <p className="mt-4 font-mono text-[10px] uppercase tracking-spec text-slate/60">
            Or tap the button above when you&apos;re ready to chat
          </p>
        </section>

        {/* Customer Details */}
        <details className="border border-mist">
          <summary className="p-4 font-mono text-[10px] uppercase tracking-spec text-slate cursor-pointer flex items-center justify-between">
            Your Details
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate/50">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <div className="px-4 pb-4 space-y-3 text-sm text-slate">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <dt className="font-mono text-[10px] uppercase tracking-spec text-ink/50">Name</dt>
              <dd className="col-span-3">{order.customer.name}</dd>
              <dt className="font-mono text-[10px] uppercase tracking-spec text-ink/50">Phone</dt>
              <dd className="col-span-3">{order.customer.phone}</dd>
              <dt className="font-mono text-[10px] uppercase tracking-spec text-ink/50">Email</dt>
              <dd className="col-span-3">{order.customer.email || "—"}</dd>
              <dt className="font-mono text-[10px] uppercase tracking-spec text-ink/50">Address</dt>
              <dd className="col-span-3">{order.customer.address || "—"}</dd>
            </div>
            {order.customer.notes && (
              <div className="border-t border-mist pt-3">
                <dt className="font-mono text-[10px] uppercase tracking-spec text-ink/50 mb-1">Notes</dt>
                <dd className="whitespace-pre-wrap">{order.customer.notes}</dd>
              </div>
            )}
          </div>
        </details>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-mist text-center">
          <p className="font-mono text-[10px] uppercase tracking-spec text-slate/60 mb-2">
            Akahome Signatures — Made-to-Measure Tailoring
          </p>
          <Link href="/" className="text-slate hover:text-ink transition-colors text-sm">
            Return to the House
          </Link>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        details summary { list-style: none; }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </main>
  );
}

function buildMessage(o: OrderData): string {
  const lines = o.lines.map((l, i) => `${i + 1}. ${l.name} × ${l.qty} — ₦${(l.price * l.qty).toLocaleString()}`).join("\n");
  return [
    `*New Order — ${o.id}*`,
    `Customer: ${o.customer.name}`,
    `Phone: ${o.customer.phone}`,
    o.customer.email ? `Email: ${o.customer.email}` : "",
    o.customer.colour ? `Preferred Colour: ${o.customer.colour}` : "",
    o.customer.address ? `Address: ${o.customer.address}` : "",
    "",
    "*Items:*",
    lines,
    "",
    `*Subtotal: ₦${o.subtotal.toLocaleString()}*`,
    "",
    o.customer.notes ? `*Notes:*\n${o.customer.notes}` : "",
    "",
    "_Sent from Akahome Signatures storefront_",
  ]
    .filter(Boolean)
    .join("\n");
}