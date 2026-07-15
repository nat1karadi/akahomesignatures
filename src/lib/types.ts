export type Category =
  | "tailoring"
  | "shirting"
  | "trousers"
  | "outerwear"
  | "knitwear";

export type SilhouetteKey =
  | "blazer"
  | "trouser"
  | "shirt"
  | "coat"
  | "vest"
  | "knit";

export interface Product {
  slug: string;
  name: string;
  /** Tailor's product code, shown in mono like a spec tag. */
  code: string;
  category: Category;
  /** Whole-number price in the given currency. */
  price: number;
  currency: string;
  /** One-line fabric description (prose). */
  fabric: string;
  /** Mono spec line, e.g. "100% SUPER 120S WOOL". */
  composition: string;
  /** Care-label micro copy. */
  care: string[];
  silhouette: SilhouetteKey;
  description: string;
  sizes: string[];
  /** Two duotone gradient stops for the placeholder treatment. */
  duo: [string, string];
  /** Slugs of related pieces for cross-sell. */
  related: string[];
}

export interface CartLine {
  slug: string;
  size: string;
  qty: number;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  tailoring: "Tailoring",
  shirting: "Shirting",
  trousers: "Trousers",
  outerwear: "Outerwear",
  knitwear: "Knitwear",
};
