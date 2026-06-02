"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/products";

export default function CartPage() {
  const { items, totalPrice, totalCount, updateQuantity, removeItem, clear } =
    useCart();

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-coffee mb-2">Sepetim</h1>
          <p className="text-coffee-soft mb-10">
            {totalCount > 0 ? `${totalCount} ürün` : "Sepetiniz boş"}
          </p>

          {items.length === 0 ? (
            <div className="bg-white rounded-xl border border-line p-16 text-center">
              <ShoppingCart size={48} className="mx-auto text-coffee-soft mb-4" />
              <p className="text-coffee-soft mb-6">
                Sepetinizde henüz ürün bulunmuyor.
              </p>
              <Link
                href="/urunler/bilardo"
                className="inline-block bg-green hover:bg-green-deep text-ivory font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-white rounded-lg border border-line p-4 flex gap-4"
                  >
                    <Link
                      href={`/urun/${item.product.slug}`}
                      className="relative w-24 h-24 flex-shrink-0 bg-white border border-line rounded"
                    >
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                        unoptimized
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/urun/${item.product.slug}`}
                        className="font-semibold text-coffee hover:text-green block mb-1 line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      {item.product.brand && (
                        <p className="text-xs text-coffee-soft mb-2">
                          {item.product.brand}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-line rounded-lg">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 hover:bg-ivory-deep transition-colors"
                            aria-label="Azalt"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-4 font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 hover:bg-ivory-deep transition-colors"
                            aria-label="Arttır"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="price text-lg text-green-deep">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="self-start text-coffee-soft hover:text-red-600 transition-colors"
                      aria-label="Sepetten çıkar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <aside className="bg-white rounded-xl border border-line p-6 h-fit sticky top-24">
                <h2 className="font-display text-2xl font-bold text-coffee mb-6">
                  Sipariş Özeti
                </h2>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-coffee-soft">Ara Toplam</span>
                    <span className="font-semibold">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-coffee-soft">Kargo</span>
                    <span className="text-green font-semibold">
                      {totalPrice >= 500 ? "Ücretsiz" : "Hesaplanacak"}
                    </span>
                  </div>
                </div>
                <div className="border-t border-line pt-4 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="font-display text-lg text-coffee">
                      Toplam
                    </span>
                    <span className="price text-2xl text-green-deep">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full bg-green hover:bg-green-deep text-ivory font-semibold py-4 rounded-lg transition-colors mb-3"
                  disabled
                >
                  Ödemeye Geç (Yakında)
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-coffee-soft hover:text-coffee text-sm transition-colors"
                >
                  Sepeti Temizle
                </button>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
