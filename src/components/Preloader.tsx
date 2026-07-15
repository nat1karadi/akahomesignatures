"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/**
 * First-load preloader. The wordmark reveals left-to-right while a running-
 * stitch line "sews" across beneath it — the signature gesture, used at its
 * boldest here — then releases into the hero. Skipped/shortened on repeat
 * visits via sessionStorage, and reduced to an instant cut under
 * prefers-reduced-motion.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("merrow-preloaded");
    if (seen || reduce) {
      sessionStorage.setItem("merrow-preloaded", "1");
      setDone(true);
      return;
    }

    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("merrow-preloaded", "1");
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    }, 1700);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-paper"
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.span
            className="font-display text-4xl tracking-tight text-ink md:text-5xl"
            initial={
              reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
            }
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Akahome Signatures
          </motion.span>

          <motion.div
            className="mt-6 w-48 md:w-64"
            initial={
              reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }
            }
            animate={
              reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }
            }
            transition={{
              duration: 1.1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <svg viewBox="0 0 240 4" fill="none" className="h-3 w-full">
              <path
                d="M2 2 L238 2"
                stroke="var(--ink)"
                strokeWidth={1.5}
                strokeDasharray="5 7"
              />
            </svg>
          </motion.div>

          <span className="spec mt-5">MADE TO MEASURE · EST. MMXXV</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
