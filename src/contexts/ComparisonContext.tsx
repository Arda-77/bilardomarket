"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

const MAX_ITEMS = 3;

interface ComparisonContextValue {
  items: Product[];
  count: number;
  maxItems: number;
  toggle: (product: Product) => "added" | "removed" | "full";
  remove: (productId: string) => void;
  clear: () => void;
  isInComparison: (productId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null);
const STORAGE_KEY = "bilardomarket:comparison";

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed comparison
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const toggle = (product: Product): "added" | "removed" | "full" => {
    const exists = items.some((p) => p.id === product.id);
    if (exists) {
      setItems(items.filter((p) => p.id !== product.id));
      return "removed";
    }
    if (items.length >= MAX_ITEMS) {
      return "full";
    }
    setItems([...items, product]);
    return "added";
  };

  return (
    <ComparisonContext.Provider
      value={{
        items,
        count: items.length,
        maxItems: MAX_ITEMS,
        toggle,
        remove: (id) => setItems(items.filter((p) => p.id !== id)),
        clear: () => setItems([]),
        isInComparison: (id) => items.some((p) => p.id === id),
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx)
    throw new Error("useComparison must be used within ComparisonProvider");
  return ctx;
}
