"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartLine } from "./types";

interface CartState {
  lines: CartLine[];
  drawerOpen: boolean;
  add: (slug: string, size: string, qty?: number) => void;
  remove: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  clear: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      drawerOpen: false,
      add: (slug, size, qty = 1) =>
        set((state) => {
          const existing = state.lines.find(
            (l) => l.slug === slug && l.size === size
          );
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l === existing ? { ...l, qty: l.qty + qty } : l
              ),
            };
          }
          return { lines: [...state.lines, { slug, size, qty }] };
        }),
      remove: (slug, size) =>
        set((state) => ({
          lines: state.lines.filter(
            (l) => !(l.slug === slug && l.size === size)
          ),
        })),
      setQty: (slug, size, qty) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.slug === slug && l.size === size
                ? { ...l, qty: Math.max(0, qty) }
                : l
            )
            .filter((l) => l.qty > 0),
        })),
      clear: () => set({ lines: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
    }),
    {
      name: "merrow-cart",
      // Persist only the basket contents, not the transient drawer state.
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((n, l) => n + l.qty, 0);
}
