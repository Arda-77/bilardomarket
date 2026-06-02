"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Check, Scale } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useComparison } from "@/contexts/ComparisonContext";
import { getProductStock } from "@/lib/inventory";
import StockIndicator from "@/components/StockIndicator";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart } = useCart();
  const { toggle, isFavorite } = useFavorites();
  const { toggle: toggleCompare, isInComparison } = useComparison();
  const inCart = isInCart(product.id);
  const fav = isFavorite(product.id);
  const inCompare = isInComparison(product.id);
  const stock = getProductStock(product.id);
  const outOfStock = stock.status === "out_of_stock";

  return (
    <div className="group relative bg-white rounded-lg border border-line overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const willBeFavorite = !fav;
            toggle(product);
            toast.success(
              willBeFavorite
                ? "Favorilere eklendi"
                : "Favorilerden çıkarıldı",
            );
          }}
          aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            fav ? "bg-green text-ivory" : "bg-white/90 text-coffee hover:bg-white"
          }`}
        >
          <Heart size={16} fill={fav ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const result = toggleCompare(product);
            if (result === "full") {
              toast.error("En fazla 3 ürün karşılaştırabilirsiniz");
            } else if (result === "added") {
              toast.success("Karşılaştırma listesine eklendi");
            } else {
              toast.success("Karşılaştırmadan çıkarıldı");
            }
          }}
          aria-label={inCompare ? "Karşılaştırmadan çıkar" : "Karşılaştır"}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            inCompare
              ? "bg-coffee text-ivory"
              : "bg-white/90 text-coffee hover:bg-white"
          }`}
        >
          <Scale size={16} />
        </button>
      </div>

      <Link href={`/urun/${product.slug}`} className="block">
        <div className="relative aspect-square bg-white border-b border-line overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            {product.salesRank !== undefined && (
              <span className="bg-gold text-coffee text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded shadow-md">
                Çok Satan
              </span>
            )}
            {product.brand && (
              <span className="bg-coffee/90 text-ivory text-[10px] font-semibold tracking-wider uppercase px-2 py-1 rounded">
                {product.brand}
              </span>
            )}
          </div>
        </div>
        <div className="p-4 pb-2">
          <h3 className="font-body font-semibold text-sm text-coffee line-clamp-2 min-h-[2.5rem] mb-2 group-hover:text-green transition-colors">
            {product.displayName ?? product.name}
          </h3>
          <div className="flex items-center justify-between mb-2">
            <span className="price text-xl text-green-deep">
              {formatPrice(product.price)}
            </span>
          </div>
          <StockIndicator productId={product.id} />
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => {
            if (outOfStock) return;
            addItem(product);
            toast.success("Sepete eklendi", { description: product.name });
          }}
          disabled={outOfStock}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-semibold transition-colors ${
            outOfStock
              ? "bg-line text-coffee-soft cursor-not-allowed"
              : inCart
              ? "bg-green-deep text-ivory"
              : "bg-coffee hover:bg-green text-ivory"
          }`}
        >
          {outOfStock ? (
            "Tükendi"
          ) : inCart ? (
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
