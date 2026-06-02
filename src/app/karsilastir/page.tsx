"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Scale } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StockIndicator from "@/components/StockIndicator";
import { useComparison } from "@/contexts/ComparisonContext";
import { useCart } from "@/contexts/CartContext";
import { formatPrice, categoryNames } from "@/lib/products";

export default function ComparisonPage() {
  const { items, remove, clear } = useComparison();
  const { addItem } = useCart();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold text-coffee mb-2">
                Karşılaştırma
              </h1>
              <p className="text-coffee-soft">
                {items.length} ürün karşılaştırılıyor
              </p>
            </div>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-sm text-coffee-soft hover:text-coffee"
              >
                Hepsini Temizle
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-line p-16 text-center">
              <Scale size={48} className="mx-auto text-coffee-soft mb-4" />
              <p className="text-coffee-soft mb-6">
                Karşılaştırma listenize henüz ürün eklemediniz. Ürün kartlarındaki
                terazi ikonuna tıklayarak ekleyebilirsiniz.
              </p>
              <Link
                href="/urunler/bilardo"
                className="inline-block bg-green hover:bg-green-deep text-ivory font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white border border-line rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-line">
                    <th className="text-left px-4 py-4 w-32 font-semibold text-coffee bg-ivory-deep">
                      Özellik
                    </th>
                    {items.map((p) => (
                      <th key={p.id} className="px-4 py-4 min-w-[200px]">
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => remove(p.id)}
                            aria-label="Çıkar"
                            className="absolute -top-2 -right-2 bg-white border border-line rounded-full p-1 hover:bg-ivory-deep"
                          >
                            <X size={12} />
                          </button>
                          <Link
                            href={`/urun/${p.slug}`}
                            className="block relative aspect-square bg-white border border-line rounded-lg mb-3"
                          >
                            <Image
                              src={p.image}
                              alt={p.name}
                              fill
                              sizes="200px"
                              className="object-contain p-3"
                              unoptimized
                            />
                          </Link>
                          <Link
                            href={`/urun/${p.slug}`}
                            className="font-semibold text-coffee hover:text-green line-clamp-2 text-left text-sm"
                          >
                            {p.name}
                          </Link>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3 bg-ivory-deep font-semibold">
                      Fiyat
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-3 price text-lg text-green-deep">
                        {formatPrice(p.price)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3 bg-ivory-deep font-semibold">
                      Marka
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-3">
                        {p.brand ?? "-"}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3 bg-ivory-deep font-semibold">
                      Kategori
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-3">
                        {categoryNames[p.category]}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-line">
                    <td className="px-4 py-3 bg-ivory-deep font-semibold">
                      Stok
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-3">
                        <StockIndicator productId={p.id} />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-4 py-4 bg-ivory-deep font-semibold">
                      Aksiyon
                    </td>
                    {items.map((p) => (
                      <td key={p.id} className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => addItem(p)}
                          className="w-full bg-green hover:bg-green-deep text-ivory font-semibold py-2.5 px-3 rounded-md text-sm transition-colors"
                        >
                          Sepete Ekle
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
