"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import AIAssistant from "@/components/AIAssistant";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        {children}
        <AIAssistant />
      </FavoritesProvider>
    </CartProvider>
  );
}
