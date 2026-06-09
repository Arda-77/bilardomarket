import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getBestSellers, getFeaturedProducts, getProductsByCategory } from "@/lib/products";

export default function Home() {
  const bestSellers = getBestSellers(undefined, 5);
  const featured = getFeaturedProducts(8);
  const categoryCards = [
    {
      slug: "bilardo",
      title: "Bilardo",
      tagline: "Istakalar, toplar, çuhalar, aksesuarlar",
      count: getProductsByCategory("bilardo").length,
    },
    {
      slug: "dart",
      title: "Dart",
      tagline: "Profesyonel oklar, tahtalar, uçuşlar",
      count: getProductsByCategory("dart").length,
    },
    {
      slug: "oyun",
      title: "Oyun",
      tagline: "Okey, langırt, kart oyunları",
      count: getProductsByCategory("oyun").length,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-night via-coffee to-green-deep" />
          <div className="container relative z-10 mx-auto max-w-6xl px-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                  Profesyonel Ekipmanlar
                </span>
              </div>
              <h1 className="text-ivory text-5xl md:text-7xl font-bold leading-[1.05] mb-6">
                Oyununu
                <br />
                <span className="text-gold italic">Bir Üst Seviyeye</span>
                <br />
                Taşı
              </h1>
              <p className="text-ivory/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                Bilardo, dart ve oyun kartı ürünlerinde Türkiye&apos;nin en
                güvenilir adresi. Profesyonel kalite, uygun fiyat.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/urunler/bilardo"
                  className="bg-gold hover:bg-gold-soft text-coffee font-bold px-8 py-4 rounded-lg shadow-lg shadow-gold/20 transition-colors"
                >
                  Ürünleri Keşfet
                </Link>
                <Link
                  href="/oyun-secici"
                  className="border border-gold/60 text-gold hover:bg-gold/10 font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  Oyun Seçici →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="py-20 bg-ivory">
            <div className="container mx-auto max-w-6xl px-6">
              <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-px w-12 bg-gold" />
                    <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                      Bestseller
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-coffee mb-2">
                    En Çok Satılanlar
                  </h2>
                  <p className="text-coffee-soft">
                    Müşterilerimizin en çok tercih ettiği ürünler
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {bestSellers.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Categories */}
        <section className="py-20 bg-ivory-deep">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-coffee mb-3">
                Kategoriler
              </h2>
              <p className="text-coffee-soft">
                Aradığın ekipmanı kategorilere göre keşfet
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categoryCards.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/urunler/${cat.slug}`}
                  className="group relative overflow-hidden rounded-xl bg-coffee text-ivory p-10 min-h-[220px] flex flex-col justify-between hover:shadow-2xl transition-shadow"
                >
                  <div>
                    <h3 className="font-display text-3xl font-bold mb-2">{cat.title}</h3>
                    <p className="text-ivory/70">{cat.tagline}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gold text-sm font-semibold tracking-wider uppercase">
                      {cat.count} ürün
                    </span>
                    <span className="text-gold group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-coffee mb-3">
                  Öne Çıkan Ürünler
                </h2>
                <p className="text-coffee-soft">Profesyonel kalitede seçkimiz</p>
              </div>
              <Link
                href="/urunler/bilardo"
                className="hidden md:inline-block text-sm font-semibold text-green hover:text-green-deep tracking-wider uppercase"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
