"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { getProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { whatsappLink, isWhatsAppConfigured } from "@/lib/whatsapp";

/**
 * Collects the customer's details and hands the order off to WhatsApp with a
 * pre-filled message (basket + contact info). No online payment — the house
 * confirms price and fitting over chat.
 */
export function WhatsAppOrderForm() {
  const { lines, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    colour: "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null); // holds the wa.me url

  const configured = isWhatsAppConfigured();

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const buildMessage = () => {
    const L = ["*New order — Akahome Signatures*", ""];

    L.push("*Pieces*");
    let subtotal = 0;
    for (const l of lines) {
      const p = getProduct(l.slug);
      if (!p) continue;
      const lineTotal = p.price * l.qty;
      subtotal += lineTotal;
      L.push(
        `• ${p.name} (${p.code}) — Size ${l.size} × ${l.qty} — ${formatPrice(
          lineTotal,
          p.currency
        )}`
      );
    }
    L.push("", `*Subtotal:* ${formatPrice(subtotal)}`, "");

    L.push("*Customer*");
    L.push(`Name: ${form.name}`);
    L.push(`Phone: ${form.phone}`);
    if (form.email) L.push(`Email: ${form.email}`);
    if (form.colour) L.push(`Preferred colour: ${form.colour}`);
    if (form.address) L.push(`Delivery: ${form.address}`);
    if (form.notes) L.push(`Notes: ${form.notes}`);

    return L.join("\n");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (lines.length === 0) {
      setError("Your bag is empty.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      setError("Please add your name and phone number.");
      return;
    }
    if (!configured) {
      setError("Ordering is not available yet — the house number isn't set.");
      return;
    }

    const url = whatsappLink(buildMessage());
    // Open WhatsApp in a new tab so the customer keeps this page as a fallback.
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(url);
    clear();
  };

  if (sent) {
    return (
      <div className="border-t border-mist pt-4">
        <p className="font-display text-lg text-ink">Almost there</p>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          WhatsApp should have opened with your order ready to send. Tap
          <span className="text-ink"> Send</span> to place it — your cutter will
          reply to confirm the price and arrange a first fitting.
        </p>
        <a
          href={sent}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block w-full bg-ink py-4 text-center font-mono text-[11px] uppercase tracking-spec text-paper"
          data-cursor="Open"
        >
          Open WhatsApp again
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-mist pt-4">
      <p className="spec mb-3">Your details</p>
      <div className="space-y-3">
        <Field
          name="name"
          placeholder="Full name *"
          value={form.name}
          onChange={set("name")}
          autoComplete="name"
        />
        <Field
          name="phone"
          type="tel"
          placeholder="Phone / WhatsApp *"
          value={form.phone}
          onChange={set("phone")}
          autoComplete="tel"
        />
        <Field
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={set("email")}
          autoComplete="email"
        />
        <Field
          name="colour"
          placeholder="Preferred colour"
          value={form.colour}
          onChange={set("colour")}
        />
        <Field
          name="address"
          placeholder="Delivery address"
          value={form.address}
          onChange={set("address")}
          autoComplete="street-address"
        />
        <textarea
          name="notes"
          placeholder="Notes / measurements"
          value={form.notes}
          onChange={set("notes")}
          rows={3}
          className="w-full border border-mist bg-paper px-3 py-3 font-sans text-sm text-ink placeholder:text-slate/70 focus:border-ink focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={lines.length === 0}
        data-cursor="Send"
        className="mt-4 flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 font-mono text-[11px] uppercase tracking-spec text-white disabled:opacity-40"
      >
        <WhatsAppGlyph />
        Send order on WhatsApp
      </button>

      {error && (
        <p className="mt-3 font-mono text-[11px] uppercase tracking-spec text-ink/70">
          {error}
        </p>
      )}
      <p className="mt-4 font-mono text-[10px] uppercase tracking-spec text-slate">
        No payment online · We confirm price &amp; fitting over WhatsApp
      </p>
    </form>
  );
}

function Field({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full border border-mist bg-paper px-3 py-3 font-sans text-sm text-ink placeholder:text-slate/70 focus:border-ink focus:outline-none"
    />
  );
}

function WhatsAppGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.73-1.63-2.02-.17-.3-.02-.46.13-.6.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.9-2.19-.24-.57-.48-.5-.66-.5h-.56c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2z" />
    </svg>
  );
}
