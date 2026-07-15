"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SERVICES = [
  "Full bespoke suit",
  "Made-to-measure suit",
  "Overcoat",
  "Shirting",
  "Alterations & refit",
];

export function BespokeForm() {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [service, setService] = useState(SERVICES[0]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-ink/30 bg-chalk p-8"
      >
        <p className="seam-mark spec mb-4">Received</p>
        <h3 className="font-display text-3xl text-ink">Thank you.</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-slate">
          Your inquiry is with the house. A cutter will reply within two
          working days to arrange your first measurement.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <Field label="Name">
          <input required className={inputCls} placeholder="Full name" />
        </Field>
        <Field label="Email">
          <input
            required
            type="email"
            className={inputCls}
            placeholder="you@studio.com"
          />
        </Field>
      </div>

      <Field label="Commission">
        <div className="flex flex-wrap gap-2">
          {SERVICES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setService(s)}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-spec transition-colors ${
                service === s
                  ? "border-ink bg-ink text-paper"
                  : "border-mist text-ink hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Measurements & notes">
        <textarea
          rows={4}
          className={inputCls}
          placeholder="Height, chest, waist, any fit preferences…"
        />
      </Field>

      <button
        type="submit"
        className="bg-ink px-7 py-3 font-mono text-[11px] uppercase tracking-spec text-paper"
        data-cursor="Send"
      >
        Send inquiry
      </button>
    </form>
  );
}

const inputCls =
  "w-full border-b border-ink/40 bg-transparent py-2 font-sans text-sm text-ink outline-none transition-colors placeholder:text-slate focus:border-ink";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="spec mb-3 block">{label}</span>
      {children}
    </label>
  );
}
