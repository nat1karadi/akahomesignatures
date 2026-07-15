import type { Metadata } from "next";
import { BespokeForm } from "@/components/BespokeForm";

export const metadata: Metadata = {
  title: "Bespoke — Akahome Signatures",
  description:
    "Commission a made-to-measure garment from Akahome Signatures. Begin with a measurement.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-bolt px-5 py-16 md:px-10 md:py-24">
      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <header>
          <p className="seam-mark spec mb-4">Bespoke</p>
          <h1 className="font-display text-5xl leading-tight text-ink md:text-6xl">
            Begin a commission
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-slate">
            Every Akahome Signatures piece starts with a body and a conversation. Tell us
            what you have in mind and we will arrange your first fitting.
          </p>
          <div className="mt-10 space-y-3 border-t border-mist pt-6">
            <p className="spec">Atelier</p>
            <p className="font-sans text-sm text-ink">
              14 Cutters&apos; Yard, London
            </p>
            <p className="spec mt-4">Hours</p>
            <p className="font-sans text-sm text-ink">
              By appointment, Tue–Sat
            </p>
          </div>
        </header>

        <BespokeForm />
      </div>
    </div>
  );
}
