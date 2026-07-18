"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { CartLine } from "@/lib/types";
import { whatsappLink, WHATSAPP_NUMBER, isWhatsAppConfigured } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type FormData = {
  name: string;
  phone: string;
  email: string;
  colour: string;
  address: string;
  notes: string;
};

const emptyForm: FormData = {
  name: "",
  phone: "",
  email: "",
  colour: "",
  address: "",
  notes: "",
};

const fieldSpecs: Array<{
  key: keyof FormData;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  required?: boolean;
}> = [
  { key: "name", label: "Full name", placeholder: "Your full name", autoComplete: "name", required: true },
  { key: "phone", label: "Phone / WhatsApp", placeholder: "+234 8XX XXX XXXX", type: "tel", autoComplete: "tel", required: true },
  { key: "email", label: "Email", placeholder: "you@domain.com", type: "email", autoComplete: "email" },
  { key: "colour", label: "Preferred colour", placeholder: "e.g. Navy, Charcoal, Cream" },
  { key: "address", label: "Delivery address", placeholder: "Full address for fitting/delivery", autoComplete: "street-address" },
  { key: "notes", label: "Measurements / Notes", placeholder: "Chest, waist, sleeve length, or any special requests…" },
];

function Input({ value, onChange, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={props.id} className="block font-mono text-[10px] uppercase tracking-spec text-slate">
        {props.label} {props.required && <span className="text-ink/50">*</span>}
      </label>
      <input
        {...props}
        value={value}
        onChange={onChange}
        className="w-full border border-mist bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-slate/60 focus:border-ink focus:outline-none transition-colors"
      />
    </div>
  );
}

function Textarea({ value, onChange, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={props.id} className="block font-mono text-[10px] uppercase tracking-spec text-slate">
        {props.label}
      </label>
      <textarea
        {...props}
        value={value}
        onChange={onChange}
        className="w-full border border-mist bg-paper px-4 py-3.5 font-sans text-sm text-ink placeholder:text-slate/60 focus:border-ink focus:outline-none transition-colors resize-y min-h-[100px]"
      />
    </div>
  );
}

function OrderSummary({ lines, subtotal }: { lines: CartLine[]; subtotal: number }) {
  return (
    <aside className="border-l border-mist pl-8 hidden lg:block">
      <h3 className="font-display text-lg text-ink mb-6 pb-3 border-b border-mist">Order Summary</h3>
      <ul className="space-y-4 mb-6">
        {lines.map((line) => {
          const p = getProduct(line.slug);
          if (!p) return null;
          return (
          <li key={`${line.slug}-${line.size}`} className="flex gap-4">
            <div className="w-16 h-16 bg-chalk/50 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-thread/20 via-transparent to-slate/10" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm text-ink">{p.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-spec text-slate mt-0.5">
                {p.category} · {p.composition}
              </p>
              <p className="font-mono text-sm text-ink mt-1">Qty: {line.qty}</p>
            </div>
          </li>
          );
        })}
      </ul>
      <div className="border-t border-mist pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate">Subtotal</span>
          <span className="font-mono text-ink">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate">Fitting & Delivery</span>
          <span className="font-mono text-ink">To be confirmed</span>
        </div>
        <div className="flex justify-between text-lg font-display border-t border-mist pt-3">
          <span className="text-ink">Estimated Total</span>
          <span className="font-mono text-ink">{formatPrice(subtotal)}+</span>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-spec text-slate/70 mt-2">
          No payment now · Price confirmed over WhatsApp before cutting
        </p>
      </div>
    </aside>
  );
}

export default function OrderPage() {
  const { lines, clear } = useCart();
  const subtotal = lines.reduce((sum, l) => {
    const p = getProduct(l.slug);
    return sum + (p ? p.price * l.qty : 0);
  }, 0);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successUrl, setSuccessUrl] = useState<string | null>(null);

  const configured = isWhatsAppConfigured();

  if (lines.length === 0) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-display text-3xl text-ink mb-3">Your bag is empty</p>
          <p className="text-slate mb-6">Add a garment to begin your order.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 font-mono text-[11px] uppercase tracking-spec hover:bg-ink/90 transition-colors"
          >
            Continue Shopping
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </main>
    );
  }

  function buildMessage() {
    const linesMsg = lines
      .map((l, i) => {
        const p = getProduct(l.slug);
        return `${i + 1}. ${p ? p.name : l.slug} — ${p ? p.category : ""}, ${p ? p.composition : ""} × ${l.qty}`;
      })
      .join("\n");
    return (
      `NEW ORDER — AKAHOME SIGNATURES\n\n` +
      `Customer: ${form.name}\n` +
      `Phone: ${form.phone}\n` +
      (form.email ? `Email: ${form.email}\n` : "") +
      (form.colour ? `Preferred colour: ${form.colour}\n` : "") +
      (form.address ? `Address: ${form.address}\n` : "") +
      `\nOrder:\n${linesMsg}\n` +
      `\nSubtotal: ${formatPrice(subtotal)}\n` +
      `Fitting & Delivery: To be confirmed\n\n` +
      (form.notes ? `Notes:\n${form.notes}\n\n` : "") +
      `— Sent from Akahome Signatures storefront`
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please provide your name and phone number.");
      return;
    }
    if (!configured) {
      setError("Ordering is not configured yet — the house number isn't set.");
      return;
    }

    setSending(true);
    try {
      const url = whatsappLink(buildMessage());
      setSuccessUrl(url);
      window.open(url, "_blank", "noopener,noreferrer");
      setSubmitted(true);
      setTimeout(() => clear(), 1500);
    } catch {
      setError("Could not open WhatsApp. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-screen bg-paper py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-spec text-slate hover:text-ink transition-colors mb-6"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Atelier
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-ink tracking-tight">
            Place Your Order
          </h1>
          <p className="mt-3 text-slate max-w-xl">
            No payment required now. We'll confirm the final price, arrange your first fitting, and answer any questions over WhatsApp.
          </p>
        </header>

        {submitted && successUrl && (
          <section className="mb-12 p-8 bg-chalk/30 border border-mist rounded-lg animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-display text-lg text-ink">Almost there</h2>
                <p className="mt-1 text-sm text-slate leading-relaxed">
                  WhatsApp should have opened with your order ready to send. Tap{" "}
                  <span className="font-mono text-ink">Send</span> to place it — your cutter will reply to confirm the price and arrange your first fitting.
                </p>
                <a
                  href={successUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 bg-ink text-paper px-6 py-3 font-mono text-[11px] uppercase tracking-spec hover:bg-ink/90 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
                  </svg>
                  Open WhatsApp again
                </a>
              </div>
            </div>
          </section>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-12">
          <section className="space-y-8">
            <fieldset className="space-y-6">
              <legend className="font-display text-xl text-ink">Your Details</legend>
              <div className="grid sm:grid-cols-2 gap-6">
                {fieldSpecs.slice(0, 4).map((f) => (
                  <Input
                    key={f.key}
                    id={f.key}
                    label={f.label}
                    required={f.required}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    type={f.type}
                    placeholder={f.placeholder}
                    autoComplete={f.autoComplete}
                  />
                ))}
                <Textarea
                  key="address"
                  id="address"
                  label="Delivery address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder={fieldSpecs.find((f) => f.key === "address")?.placeholder}
                  className="sm:col-span-2"
                />
                <Textarea
                  key="notes"
                  id="notes"
                  label="Measurements / Notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={fieldSpecs.find((f) => f.key === "notes")?.placeholder}
                  className="sm:col-span-2"
                />
              </div>
            </fieldset>

            {error && (
              <div className="p-4 bg-ink/5 border border-ink/20 rounded-lg">
                <p className="font-mono text-[11px] uppercase tracking-spec text-ink/80">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={sending || !configured}
              className="w-full bg-ink text-paper py-4 font-mono text-[11px] uppercase tracking-spec hover:bg-ink/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Opening WhatsApp…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
                  </svg>
                  Send Order on WhatsApp
                </>
              )}
            </button>

            <p className="text-center font-mono text-[10px] uppercase tracking-spec text-slate/60 mt-4">
              No payment online · We confirm price & fitting over WhatsApp
            </p>
          </section>

          <OrderSummary lines={lines} subtotal={subtotal} />
        </form>
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

