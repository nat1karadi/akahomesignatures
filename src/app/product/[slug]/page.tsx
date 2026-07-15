import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelated } from "@/lib/catalog";
import { ProductView } from "@/components/ProductView";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Not found — MERROW" };
  return {
    title: `${p.name} — MERROW`,
    description: p.description,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const related = getRelated(product);
  return <ProductView product={product} related={related} />;
}
