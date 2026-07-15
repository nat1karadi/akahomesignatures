"use client";

/**
 * A marquee strip of short brand phrases. Two copies of the row scroll as one
 * seamless loop via the `marquee` keyframe. Under reduced motion the global
 * CSS flattens the animation to a static strip.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-mist py-5">
      <div className="flex w-max animate-marquee items-center gap-12 whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl italic text-ink/80 md:text-3xl">
              {t}
            </span>
            <span className="text-thread">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
