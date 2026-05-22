"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isFavorite } = useFavorites();
  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);

  return (
    <div className="group relative bg-white rounded-lg border border-line overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(product);
        }}
        aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
        className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
          fav
            ? "bg-green text-ivory"
            : "bg-white/90 text-coffee hover:bg-white"
        }`}
      >
        <Heart size={16} fill={fav ? "currentColor" : "none"} />
      </button>

      <Link href={`/urun/${product.slug}`} className="block">
        <div className="relative aspect-square bg-ivory-deep overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          {product.brand && (
            <span className="absolute top-3 left-3 bg-coffee/90 text-ivory text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
              {product.brand}
            </span>
          )}
        </div>
        <div className="p-4 pb-2">
          <h3 className="font-body font-semibold text-sm text-coffee line-clamp-2 min-h-[2.5rem] mb-3 group-hover:text-green transition-colors">
            {product.name}
          </h3>
          <span className="font-display text-xl font-bold text-green">
            {formatPrice(product.price)}
          </span>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => addItem(product)}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
            inCart
              ? "bg-green-deep text-ivory"
              : "bg-coffee hover:bg-green text-ivory"
          }`}
        >
          {inCart ? (
            <>
              <Check size={16} /> Sepette
            </>
          ) : (
            <>
              <ShoppingCart size={16} /> Sepete Ekle
            </>
          )}
        </button>
      </div>
    </div>
  );
}
