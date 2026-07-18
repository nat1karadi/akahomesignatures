import type { Product } from "./types";

/**
 * MOCK CATALOG — placeholder content.
 * Names, fabrics, prices and codes are realistic stand-ins. Swap for real
 * product copy + photography when available. Imagery in this build is rendered
 * as a duotone gradient + line-drawing silhouette (see GarmentSilhouette), so
 * nothing depends on a broken image URL.
 *
 * REAL PHOTOS: add two per product to enable the 3D flip-on-hover — a front
 * and a back shot. Place files in /public/products (see the README there) and
 * add `image` + `backImage` to the product, e.g.:
 *     image: "/products/notch-blazer-front.jpg",
 *     backImage: "/products/notch-blazer-back.jpg",
 * See the (commented) example on the first product below.
 */
export const PRODUCTS: Product[] = [
  {
    slug: "notch-blazer",
    name: "The Notch Blazer",
    code: "MRW-001",
    category: "tailoring",
    price: 1180,
    currency: "NGN",
    fabric: "Super 120s virgin wool, woven in Biella.",
    composition: "100% SUPER 120S WOOL",
    care: ["DRY CLEAN ONLY", "PRESS WITH CLOTH", "STORE ON A CEDAR HANGER"],
    silhouette: "blazer",
    description:
      "A single-breasted house block cut for a clean lapel roll and a quiet shoulder. Half-canvas construction so the chest moulds to the wearer over time.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    duo: ["#ECECE8", "#D6D6D0"],
    related: ["double-blazer", "waistcoat", "basted-trouser"],
    image: "/products/notch-blazer-front.webp",
    backImage: "/products/notch-blazer-back.webp",
  },
  {
    slug: "basted-trouser",
    name: "The Basted Trouser",
    code: "MRW-002",
    category: "trousers",
    price: 420,
    currency: "NGN",
    fabric: "Italian wool flannel with a soft, brushed hand.",
    composition: "98% WOOL / 2% ELASTANE",
    care: ["DRY CLEAN ONLY", "CREASE WITH A COVERED SLEEVE"],
    silhouette: "trouser",
    description:
      "A high-rise, pleated trouser with a full break. Basted by hand at the waistband so the fitting can be revised before the final stitch.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    duo: ["#E9E9E5", "#D2D2CC"],
    related: ["notch-blazer", "oxford-shirt", "waistcoat"],
    image: "/products/basted-trouser-front.webp",
    backImage: "/products/basted-trouser-back.webp",
  },
  {
    slug: "oxford-shirt",
    name: "The Oxford Shirt",
    code: "MRW-003",
    category: "shirting",
    price: 190,
    currency: "NGN",
    fabric: "Pinpoint Oxford cotton, garment-washed for softness.",
    composition: "100% COTTON OXFORD",
    care: ["MACHINE WASH 30C", "TUMBLE DRY LOW", "IRON DAMP"],
    silhouette: "shirt",
    description:
      "A soft collar and a slightly shortened tail so it sits as well untucked as it does under a waistband. Mother-of-pearl buttons as standard.",
    sizes: ["XS", "S", "M", "L", "XL"],
    duo: ["#EDEDEA", "#DADAD4"],
    related: ["formal-shirt", "basted-trouser", "notch-blazer"],
    backImage: "/products/oxford-shirt-back.webp",
  },
  {
    slug: "overcoat",
    name: "The Overcoat",
    code: "MRW-004",
    category: "outerwear",
    price: 1640,
    currency: "NGN",
    fabric: "A substantial cashmere-and-wool melton.",
    composition: "70% WOOL / 30% CASHMERE",
    care: ["DRY CLEAN ONLY", "BRUSH REGULARLY", "REPLACE SHOULDER PADS AS NEEDED"],
    silhouette: "coat",
    description:
      "A full-length coat with a hand-padded collar and a grosgrain-lined vent. Cut generous enough to layer over tailoring without strain.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    duo: ["#E6E6E2", "#CECEC8"],
    related: ["notch-blazer", "car-coat", "waistcoat"],
    image: "/products/overcoat-front.webp",
    backImage: "/products/overcoat-back.webp",
  },
  {
    slug: "waistcoat",
    name: "The Waistcoat",
    code: "MRW-005",
    category: "tailoring",
    price: 380,
    currency: "NGN",
    fabric: "Wool mohair with a faint lustre.",
    composition: "90% WOOL / 10% MOHAIR",
    care: ["DRY CLEAN ONLY"],
    silhouette: "vest",
    description:
      "A six-button waistcoat with a watch pocket and a fully adjustable back strap. Cut to meet the trouser waist without a gap.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    duo: ["#EBEBE7", "#D4D4CE"],
    related: ["notch-blazer", "basted-trouser", "double-blazer"],
    image: "/products/waistcoat-front.webp",
    backImage: "/products/waistcoat-back.webp",
  },
  {
    slug: "camp-knit",
    name: "The Camp Knit",
    code: "MRW-006",
    category: "knitwear",
    price: 240,
    currency: "NGN",
    fabric: "Extra-fine merino, fully-fashioned on the seam.",
    composition: "100% EXTRAFINE MERINO",
    care: ["HAND WASH COLD", "DRY FLAT", "DO NOT TUMBLE"],
    silhouette: "knit",
    description:
      "A camp-collar knit with a clean, seamless shoulder. Fully-fashioned panels mean the garment is shaped by the machine, not by cutting.",
    sizes: ["XS", "S", "M", "L", "XL"],
    duo: ["#EDEDEB", "#D8D8D2"],
    related: ["oxford-shirt", "selvedge-jean", "car-coat"],
  },
  {
    slug: "double-blazer",
    name: "The Double-Breasted Blazer",
    code: "MRW-007",
    category: "tailoring",
    price: 1260,
    currency: "NGN",
    fabric: "Donegal tweed with a speckled, irregular weave.",
    composition: "100% WOOL TWEED",
    care: ["DRY CLEAN ONLY", "STORE FLAT ON A BOARD"],
    silhouette: "blazer",
    description:
      "A six-on-two double-breasted block with a deep overlap. The lapel is rolled by hand and the working cuff buttons are cut to open.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    duo: ["#E8E8E4", "#D0D0CA"],
    related: ["notch-blazer", "waistcoat", "overcoat"],
    image: "/products/double-blazer-front.webp",
  },
  {
    slug: "selvedge-jean",
    name: "The Selvedge Jean",
    code: "MRW-008",
    category: "trousers",
    price: 260,
    currency: "NGN",
    fabric: "14oz Japanese selvedge denim, loomed on old shuttle machines.",
    composition: "100% COTTON SELVEDGE",
    care: ["WASH RARELY", "TURN INSIDE OUT", "LINE DRY"],
    silhouette: "trouser",
    description:
      "A straight, mid-rise jean with a clean self-edge at the outseam — the selvedge that gives the cloth its name. Chain-stitched hem that ripples with wear.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    duo: ["#E7E7E3", "#CFCFC9"],
    related: ["camp-knit", "oxford-shirt", "basted-trouser"],
  },
  {
    slug: "formal-shirt",
    name: "The Formal Shirt",
    code: "MRW-009",
    category: "shirting",
    price: 210,
    currency: "NGN",
    fabric: "Sea Island cotton with a tight, lustrous weave.",
    composition: "100% SEA ISLAND COTTON",
    care: ["MACHINE WASH 40C", "IRON WHILE DAMP", "STARCH COLLAR LIGHTLY"],
    silhouette: "shirt",
    description:
      "A cutaway-collar dress shirt with a fused placket and a single neck button. Tailored to stay put beneath a waistcoat all day.",
    sizes: ["XS", "S", "M", "L", "XL"],
    duo: ["#EDEDEA", "#D9D9D3"],
    related: ["oxford-shirt", "notch-blazer", "waistcoat"],
    image: "/products/formal-shirt-front.webp",
    backImage: "/products/formal-shirt-back.webp",
  },
  {
    slug: "car-coat",
    name: "The Car Coat",
    code: "MRW-010",
    category: "outerwear",
    price: 1120,
    currency: "NGN",
    fabric: "Boiled wool with a dense, felted surface.",
    composition: "100% BOILED WOOL",
    care: ["DRY CLEAN ONLY", "BRUSH WITH A SUEDE BRUSH"],
    silhouette: "coat",
    description:
      "A hip-length coat cut for the seat of a car — ease through the sleeve, a single vent at the back, and a collar that stands against the wind.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    duo: ["#E6E6E2", "#CDCDC7"],
    related: ["overcoat", "notch-blazer", "camp-knit"],
    image: "/products/car-coat-front.webp",
    backImage: "/products/car-coat-back.webp",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getRelated(product: Product): Product[] {
  return product.related
    .map((s) => PRODUCTS.find((p) => p.slug === s))
    .filter((p): p is Product => Boolean(p));
}

export const CATEGORIES = [
  "tailoring",
  "shirting",
  "trousers",
  "outerwear",
  "knitwear",
] as const;
