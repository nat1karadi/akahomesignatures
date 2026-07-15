"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * THE SIGNATURE MOTIF.
 * A running-stitch line fixed in the left margin that "sews itself" downward
 * as the page scrolls — the ink thread is revealed top-to-bottom via a
 * clip-path scrubbed to scroll progress, and a small needle dot tracks the
 * leading edge. The faint mist track underneath shows where the seam will go.
 *
 * Only rendered on md+ (there is no left margin to thread on small screens)
 * and disabled under prefers-reduced-motion.
 */
export function StitchLine() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );
  const needleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (reduce) {
    // Quiet static track only — no motion.
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed left-[20px] top-0 z-30 hidden h-screen w-3 md:block"
      >
        <svg className="h-full w-full" viewBox="0 0 4 1000" preserveAspectRatio="none">
          <path
            d="M2 0 L2 1000"
            stroke="var(--mist)"
            strokeWidth={1.5}
            strokeDasharray="2 9"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-[20px] top-0 z-30 hidden h-screen w-3 md:block"
    >
      {/* track: where the seam will go */}
      <svg className="h-full w-full" viewBox="0 0 4 1000" preserveAspectRatio="none">
        <path
          d="M2 0 L2 1000"
          stroke="var(--mist)"
          strokeWidth={1.5}
          strokeDasharray="2 9"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* thread: sewn in as you scroll */}
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <svg className="h-full w-full" viewBox="0 0 4 1000" preserveAspectRatio="none">
          <path
            d="M2 0 L2 1000"
            stroke="var(--ink)"
            strokeWidth={1.5}
            strokeDasharray="5 9"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </motion.div>
      {/* the needle */}
      <motion.span
        className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink"
        style={{ top: needleY }}
      />
    </div>
  );
}
