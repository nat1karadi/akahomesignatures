"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const COLUMNS = [
  {
    title: "House",
    links: [
      { href: "/shop", label: "Shop" },
      { href: "/craft", label: "The Craft" },
      { href: "/lookbook", label: "Lookbook" },
    ],
  },
  {
    title: "Commissions",
    links: [
      { href: "/contact", label: "Bespoke inquiry" },
      { href: "/contact", label: "Made-to-measure" },
      { href: "/shop", label: "Gift cards" },
    ],
  },
];

export function Footer() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <footer className="border-t border-mist bg-paper">
      <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl text-ink">Akahome Signatures</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              A made-to-measure tailoring house. Immaculate seams, restrained
              silhouettes, obsessive construction.
            </p>

            <form onSubmit={submit} className="mt-7 max-w-sm">
              <label className="spec" htmlFor="nl">
                Newsletter — cuttings &amp; openings
              </label>
              <div className="mt-2 flex items-center border-b border-ink/40 focus-within:border-ink">
                <input
                  id="nl"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full bg-transparent py-2 font-sans text-sm text-ink outline-none placeholder:text-slate"
                />
                <button
                  type="submit"
                  className="ml-3 shrink-0 font-mono text-[11px] uppercase tracking-spec text-ink"
                  data-cursor="Send"
                >
                  {sent ? "Sent" : "Join"}
                </button>
              </div>
              {sent && !reduce && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 font-mono text-[11px] uppercase tracking-spec text-ink/60"
                >
                  Thank you — watch your inbox for the next cutting.
                </motion.p>
              )}
              {sent && reduce && (
                <p className="mt-3 font-mono text-[11px] uppercase tracking-spec text-ink/60">
                  Thank you — watch your inbox for the next cutting.
                </p>
              )}
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="spec mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="font-sans text-sm text-ink/80 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-mist pt-6 md:flex-row md:items-center md:justify-between">
          <span className="spec">© MMXXV Akahome Signatures — ALL SEAMS RESERVED</span>
          <span className="spec">CUT ONCE · WORN FOR DECADES</span>
        </div>
      </div>
    </footer>
  );
}
