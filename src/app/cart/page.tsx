import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "Bag — Akahome Signatures",
};

export default function CartPage() {
  return <CartView />;
}
