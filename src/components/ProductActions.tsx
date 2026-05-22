"use client";

import { Heart, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function ProductActions({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isFavorite } = useFavorites();
  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);

  return (
    <div className="flex gap-3 mb-8">
      <button
        type="button"
        onClick={() => addItem(product)}
        className={`flex-1 flex items-center justify-center gap-2 text-ivory font-semibold py-4 rounded-lg transition-colors ${
          inCart ? "bg-green-deep" : "bg-green hover:bg-green-deep"
        }`}
      >
        {inCart ? (
          <>
            <Check size={18} /> Sepete Eklendi
          </>
        ) : (
          <>
            <ShoppingCart size={18} /> Sepete Ekle
          </>
        )}
      </button>
      <button
        type="button"
        onClick={() => toggle(product)}
        aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
        className={`border px-5 py-4 rounded-lg transition-colors ${
          fav
            ? "bg-green text-ivory border-green"
            : "border-line hover:border-gold hover:text-gold"
        }`}
      >
        <Heart size={18} fill={fav ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
