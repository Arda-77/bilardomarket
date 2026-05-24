"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import AIAssistant from "@/components/AIAssistant";
import WhatsAppButton from "@/components/WhatsAppButton";
import ComparisonBar from "@/components/ComparisonBar";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          {children}
          <ComparisonBar />
          <WhatsAppButton />
          <AIAssistant />
        </ComparisonProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
