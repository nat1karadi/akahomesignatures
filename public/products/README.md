# Product photos

Drop your product photography here. Anything in `/public` is served from the
site root, so a file at:

    public/products/notch-blazer-front.jpg

is referenced in code as:

    /products/notch-blazer-front.jpg

## Naming convention

Two photos per product — a **front** shot and a **back** (or alternate) shot,
which is what the 3D flip-on-hover reveals:

    <slug>-front.jpg
    <slug>-back.jpg

e.g. for the product with slug `notch-blazer`:

    notch-blazer-front.jpg
    notch-blazer-back.jpg

(The slug for each product is the `slug` field in `src/lib/catalog.ts`.)

## Wiring a photo to a product

In `src/lib/catalog.ts`, add `image` and `backImage` to the product:

    {
      slug: "notch-blazer",
      ...
      image: "/products/notch-blazer-front.jpg",
      backImage: "/products/notch-blazer-back.jpg",
    }

That's the whole change — the card picks the photos up automatically.

## Notes

- **Aspect ratio:** cards are cropped to **4:5** (portrait). Shoot/crop both
  photos to the same frame so the flip doesn't jump. `object-cover` handles
  minor differences, but matching crops look best.
- **Front only:** set just `image` (no `backImage`) and the card shows that
  photo statically — no flip.
- **Neither set:** the card falls back to the duotone-gradient placeholder,
  which still flips between two frames so you can see the effect now.
- **Format:** `.jpg`/`.webp` for photos; keep them reasonably sized
  (~1000×1250px is plenty for these cards).
