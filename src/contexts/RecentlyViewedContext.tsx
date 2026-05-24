"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

const MAX_ITEMS = 12;

interface RecentlyViewedContextValue {
  items: Product[];
  track: (product: Product) => void;
  clear: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(
  null,
);
const STORAGE_KEY = "bilardomarket:recently-viewed";

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed storage
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const track = useCallback((product: Product) => {
    setItems((current) => {
      const filtered = current.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider
      value={{ items, track, clear: () => setItems([]) }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx)
    throw new Error(
      "useRecentlyViewed must be used within RecentlyViewedProvider",
    );
  return ctx;
}
