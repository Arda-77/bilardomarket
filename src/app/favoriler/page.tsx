"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function FavoritesPage() {
  const { items, count } = useFavorites();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-coffee mb-2">Favorilerim</h1>
          <p className="text-coffee-soft mb-10">
            {count > 0
              ? `${count} ürün favorilerinizde`
              : "Henüz favori ürün eklemediniz"}
          </p>

          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-line p-16 text-center">
              <Heart size={48} className="mx-auto text-coffee-soft mb-4" />
              <p className="text-coffee-soft mb-6">
                Favorilemek istediğiniz ürünlerin kalp ikonuna tıklayın.
              </p>
              <Link
                href="/urunler/bilardo"
                className="inline-block bg-green hover:bg-green-deep text-ivory font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
