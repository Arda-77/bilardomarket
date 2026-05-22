"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/lib/products";

interface FavoritesContextValue {
  items: Product[];
  count: number;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);
const STORAGE_KEY = "bilardomarket:favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch {
        // ignore malformed favorites
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const toggle = (product: Product) => {
    setItems((current) => {
      const exists = current.some((p) => p.id === product.id);
      return exists
        ? current.filter((p) => p.id !== product.id)
        : [...current, product];
    });
  };

  const remove = (productId: string) =>
    setItems((current) => current.filter((p) => p.id !== productId));

  return (
    <FavoritesContext.Provider
      value={{
        items,
        count: items.length,
        toggle,
        remove,
        isFavorite: (id) => items.some((p) => p.id === id),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
