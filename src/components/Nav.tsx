"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useAnimationControls,
  useReducedMotion,
} from "framer-motion";
import { useCart, cartCount } from "@/lib/cart-store";
import { Magnetic } from "./Magnetic";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/craft", label: "The Craft" },
  { href: "/lookbook", label: "Lookbook" },
  { href: "/contact", label: "Bespoke" },
];

export function Nav() {
  const reduce = useReducedMotion();
  const lines = useCart((s) => s.lines);
  const openDrawer = useCart((s) => s.openDrawer);
  const count = cartCount(lines);
  const controls = useAnimationControls();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Bump the bag icon whenever the count changes (after first mount).
  useEffect(() => {
    if (!mounted || reduce) return;
    controls.start({
      scale: [1, 1.28, 1],
      transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
    });
  }, [count, mounted, reduce, controls]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-mist bg-paper/85 backdrop-blur-sm">
      <nav className="mx-auto flex h-16 max-w-bolt items-center justify-between px-5 md:px-10">
        <Link
          href="/"
          className="font-display text-2xl tracking-tight text-ink"
          data-cursor="Home"
        >
          Akahome Signatures
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <Magnetic key={l.href} strength={0.25}>
              <Link
                href={l.href}
                className="font-sans text-sm text-ink/80 transition-colors hover:text-ink"
                data-cursor={l.label}
              >
                {l.label}
              </Link>
            </Magnetic>
          ))}
        </div>

        <button
          type="button"
          onClick={openDrawer}
          className="group flex items-center gap-2 font-mono text-[11px] uppercase tracking-spec text-ink"
          data-cursor="Bag"
          aria-label={`Open bag, ${count} item${count === 1 ? "" : "s"}`}
        >
          <span>Bag</span>
          <motion.span
            animate={controls}
            className="inline-flex h-6 min-w-6 items-center justify-center rounded-full border border-ink px-1.5"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={mounted ? count : "x"}
                initial={reduce ? { opacity: 0 } : { y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { y: "100%", opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {mounted ? count : 0}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </button>
      </nav>
    </header>
  );
}
