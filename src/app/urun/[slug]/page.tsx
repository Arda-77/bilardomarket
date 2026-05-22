import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductActions from "@/components/ProductActions";
import {
  categoryNames,
  formatPrice,
  getProductBySlug,
  getProductsByCategory,
  products,
} from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${formatPrice(product.price)}. BilardoMarket'te güvenli alışveriş.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-10">
          {/* Breadcrumb */}
          <nav className="text-sm text-coffee-soft mb-8">
            <Link href="/" className="hover:text-gold">Ana Sayfa</Link>
            <span className="mx-2">/</span>
            <Link href={`/urunler/${product.category}`} className="hover:text-gold">
              {categoryNames[product.category]}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-coffee">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Image */}
            <div className="relative aspect-square bg-white rounded-xl border border-line overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
                unoptimized
                priority
              />
              {product.brand && (
                <span className="absolute top-4 left-4 bg-coffee text-ivory text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded">
                  {product.brand}
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                  {categoryNames[product.category]}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-coffee mb-6 leading-tight">
                {product.name}
              </h1>
              <div className="mb-8">
                <span className="font-display text-5xl font-bold text-green">
                  {formatPrice(product.price)}
                </span>
                <p className="text-coffee-soft text-sm mt-2">KDV dahil fiyattır</p>
              </div>

              <div className="mb-8 p-5 bg-ivory-deep rounded-lg border border-line">
                <div className="flex items-center gap-2 text-sm text-coffee-soft mb-1">
                  <span className="w-2 h-2 bg-green rounded-full" />
                  Stokta var · Hızlı kargo
                </div>
              </div>

              <ProductActions product={product} />

              <div className="text-sm text-coffee-soft border-t border-line pt-6 space-y-1.5">
                <p><strong className="text-coffee">Ürün Kodu:</strong> {product.id}</p>
                {product.brand && (
                  <p><strong className="text-coffee">Marka:</strong> {product.brand}</p>
                )}
                <p><strong className="text-coffee">Kategori:</strong> {categoryNames[product.category]}</p>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-coffee mb-8">Benzer Ürünler</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
