"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/types";
import { GarmentImage } from "./GarmentImage";

/**
 * A product image that flips over on its Y axis on hover (desktop) or tap
 * (touch) to reveal a second photo — a genuine 3D rotation, not a crossfade.
 *
 * Faces:
 *  - front: `product.image`      → real photo, else duotone-gradient placeholder
 *  - back:  `product.backImage`  → real photo, else the alternate gradient frame
 *
 * Flip is enabled when there's something meaningful on the back:
 *  - both photos set                     → real 3D flip
 *  - neither set (placeholder)           → flips between two gradient frames
 *  - only front set, no back             → static, no flip, no empty face
 *
 * Motion: soft ease-in-out, ~650ms, real perspective, no overshoot. Only the
 * transform (rotateY) animates. `prefers-reduced-motion` degrades to a quick
 * opacity swap. On touch, a second tap or scrolling the card out of view
 * flips it back.
 */
export function ProductFlipImage({ product }: { product: Product }) {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const hasFront = !!product.image;
  const hasBack = !!product.backImage;
  const placeholderMode = !hasFront && !hasBack;
  // A back face exists (and thus a flip is meaningful) with real back art, or
  // in placeholder mode where we flip between two gradient frames.
  const canFlip = hasBack || placeholderMode;

  // Detect touch / no-hover environments.
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // On touch, flip back when the card scrolls out of view.
  useEffect(() => {
    if (!isTouch || !flipped) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setFlipped(false);
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isTouch, flipped]);

  const onMouseEnter = () => {
    if (!isTouch && canFlip) setFlipped(true);
  };
  const onMouseLeave = () => {
    if (!isTouch && canFlip) setFlipped(false);
  };
  const onClick = (e: React.MouseEvent) => {
    // On touch, tapping the image flips it instead of following the card link.
    // (Navigation on touch remains available via the title/price below.)
    if (isTouch && canFlip) {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  };

  const front = <Face product={product} src={product.image} variant="a" />;
  const back = <Face product={product} src={product.backImage} variant="b" />;

  // Front-only: nothing to flip to — render statically.
  if (!canFlip) {
    return <div className="h-full w-full">{front}</div>;
  }

  // Reduced motion: skip the 3D rotation, quick opacity swap instead.
  if (reduce) {
    return (
      <div
        ref={ref}
        className="relative h-full w-full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
      >
        <div className="absolute inset-0">{front}</div>
        <div
          className="absolute inset-0 transition-opacity duration-300 ease-thread"
          style={{ opacity: flipped ? 1 : 0 }}
        >
          {back}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative h-full w-full"
      style={{ perspective: 1200 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.45, 0, 0.55, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * A single face: a real photo when `src` is set, otherwise the gradient
 * placeholder. Both fill the container identically so the flip never jumps.
 */
function Face({
  product,
  src,
  variant,
}: {
  product: Product;
  src?: string;
  variant: "a" | "b";
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={product.name}
        draggable={false}
        className="h-full w-full select-none object-cover"
      />
    );
  }
  return <GarmentImage product={product} variant={variant} />;
}
