"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { CartProvider } from "@/contexts/CartContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ComparisonProvider } from "@/contexts/ComparisonContext";
import { RecentlyViewedProvider } from "@/contexts/RecentlyViewedContext";
import AIAssistant from "@/components/AIAssistant";
import WhatsAppButton from "@/components/WhatsAppButton";
import ComparisonBar from "@/components/ComparisonBar";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <ComparisonProvider>
          <RecentlyViewedProvider>
            {children}
            <ComparisonBar />
            <WhatsAppButton />
            <AIAssistant />
            <Toaster
              position="top-right"
              richColors
              theme="light"
              toastOptions={{
                style: {
                  fontFamily: "var(--font-body)",
                },
              }}
            />
          </RecentlyViewedProvider>
        </ComparisonProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
