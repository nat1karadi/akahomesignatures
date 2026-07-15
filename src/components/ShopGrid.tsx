"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { PRODUCTS } from "@/lib/catalog";
import { CATEGORY_LABELS, type Category } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Cloth = "Wool" | "Cotton" | "Cashmere" | "Denim" | "Merino";

const CLOTH_ORDER: Cloth[] = ["Wool", "Cotton", "Cashmere", "Denim", "Merino"];

function clothOf(composition: string): Cloth | null {
  const c = composition.toUpperCase();
  if (c.includes("CASHMERE")) return "Cashmere";
  if (c.includes("DENIM") || c.includes("SELVEDGE")) return "Denim";
  if (c.includes("MERINO")) return "Merino";
  if (c.includes("COTTON")) return "Cotton";
  if (c.includes("WOOL")) return "Wool";
  return null;
}

export function ShopGrid() {
  const reduce = useReducedMotion();
  const [cat, setCat] = useState<Category | "all">("all");
  const [cloth, setCloth] = useState<Cloth | "all">("all");

  const cloths = useMemo(() => {
    const set = new Set<Cloth>();
    PRODUCTS.forEach((p) => {
      const c = clothOf(p.composition);
      if (c) set.add(c);
    });
    return CLOTH_ORDER.filter((c) => set.has(c));
  }, []);

  const filtered = PRODUCTS.filter((p) => {
    if (cat !== "all" && p.category !== cat) return false;
    if (cloth !== "all" && clothOf(p.composition) !== cloth) return false;
    return true;
  });

  const catChips: { key: Category | "all"; label: string }[] = [
    { key: "all", label: "All" },
    ...(Object.keys(CATEGORY_LABELS) as Category[]).map((k) => ({
      key: k,
      label: CATEGORY_LABELS[k],
    })),
  ];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-mist pb-5">
        {catChips.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`font-mono text-[11px] uppercase tracking-spec transition-colors ${
              cat === c.key ? "text-ink" : "text-slate hover:text-ink"
            }`}
            data-cursor={cat === c.key ? undefined : "Filter"}
          >
            {c.label}
            {cat === c.key && <span className="ml-1">·</span>}
          </button>
        ))}
      </div>

      {cloths.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 py-4">
          <span className="spec mr-1">Cloth</span>
          <button
            onClick={() => setCloth("all")}
            className={`font-mono text-[11px] uppercase tracking-spec transition-colors ${
              cloth === "all" ? "text-ink" : "text-slate hover:text-ink"
            }`}
          >
            All
          </button>
          {cloths.map((c) => (
            <button
              key={c}
              onClick={() => setCloth(c)}
              className={`font-mono text-[11px] uppercase tracking-spec transition-colors ${
                cloth === c ? "text-ink" : "text-slate hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <p className="spec mb-8 mt-2">
        {String(filtered.length).padStart(2, "0")} pieces
      </p>

      <motion.div
        layout={!reduce}
        className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout={!reduce}
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={p} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
