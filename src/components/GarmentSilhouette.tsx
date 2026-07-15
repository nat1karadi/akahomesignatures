import type { SilhouetteKey } from "@/lib/types";

/**
 * Line-drawing garment silhouettes used for placeholder imagery.
 * Stroke-only, currentColor — sits over a duotone gradient in <GarmentImage>.
 * Swap for real product photography when available.
 */
const PATHS: Record<SilhouetteKey, JSX.Element> = {
  shirt: (
    <>
      <path d="M100 50 L78 44 L52 70 L62 92 L78 86 L78 250 L122 250 L122 86 L138 92 L148 70 L122 44 Z" />
      <path d="M100 50 L84 40 M100 50 L116 40" />
      <path d="M100 50 L100 250" />
      <path d="M78 62 L62 72 M122 62 L138 72" />
    </>
  ),
  trouser: (
    <>
      <path d="M66 55 L134 55" />
      <path d="M66 55 L60 250" />
      <path d="M134 55 L140 250" />
      <path d="M100 82 L66 250 M100 82 L134 250" />
      <path d="M70 60 L130 60" />
    </>
  ),
  blazer: (
    <>
      <path d="M100 55 L80 48 L56 72 L66 96 L80 90 L80 255 L120 255 L120 90 L134 96 L144 72 L120 48 Z" />
      <path d="M100 55 L84 48 L100 122 L116 48" />
      <path d="M100 122 L100 255" />
      <path d="M92 122 L92 250 M108 122 L108 250" />
    </>
  ),
  coat: (
    <>
      <path d="M100 50 L78 42 L50 70 L62 96 L78 90 L78 270 L122 270 L122 90 L138 96 L150 70 L122 42 Z" />
      <path d="M100 50 L82 42 L100 132 L118 42" />
      <path d="M100 132 L100 270" />
      <path d="M100 248 L100 270" />
    </>
  ),
  vest: (
    <>
      <path d="M100 60 L82 52 L74 90 L78 250 L122 250 L126 90 L118 52 Z" />
      <path d="M100 60 L84 52 L100 150 L116 52" />
      <path d="M100 150 L100 250" />
      <path d="M92 150 L92 248 M108 150 L108 248" />
    </>
  ),
  knit: (
    <>
      <path d="M100 58 C92 58 86 52 84 46 L58 70 L66 92 L80 86 L80 250 L120 250 L120 86 L134 92 L142 70 L116 46 C114 52 108 58 100 58 Z" />
      <path d="M100 58 L100 250" />
    </>
  ),
};

export function GarmentSilhouette({
  type,
  className,
}: {
  type: SilhouetteKey;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 280"
      fill="none"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="currentColor"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {PATHS[type]}
      </g>
    </svg>
  );
}
