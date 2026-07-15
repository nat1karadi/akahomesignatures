import type { Product } from "@/lib/types";
import { GarmentSilhouette } from "./GarmentSilhouette";

/**
 * Placeholder product imagery: a duotone gradient + line-drawing silhouette
 * + a tailor's spec code. Self-contained (no network). The `variant` prop
 * shifts the gradient angle / silhouette so the hover crossfade shows a
 * believably "different" frame rather than an identical one.
 */
export function GarmentImage({
  product,
  variant = "a",
  className = "",
}: {
  product: Product;
  variant?: "a" | "b";
  className?: string;
}) {
  const [c1, c2] = product.duo;
  const angle = variant === "a" ? 145 : 200;
  const shift = variant === "a" ? "0%" : "6%";

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${c1} 0%, ${c2} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: `translateY(${shift})` }}
      >
        <GarmentSilhouette
          type={product.silhouette}
          className="h-[72%] w-[72%] text-ink/25"
        />
      </div>
      {/* tailor's spec tag, lower-left */}
      <span className="spec absolute bottom-3 left-3 text-ink/45">
        {product.code}
      </span>
      {/* selvedge edge hint, right */}
      <span className="absolute right-0 top-0 h-full w-[3px] bg-ink/10" />
    </div>
  );
}
