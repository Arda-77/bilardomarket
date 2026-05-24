import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";
import ProductCard from "@/components/ProductCard";
import {
  categoryNames,
  getBestSellers,
  getProductsByCategory,
  getSubcategoriesByCategory,
  type Category,
} from "@/lib/products";

const VALID: Category[] = ["bilardo", "dart", "oyun"];

function isCategory(value: string): value is Category {
  return (VALID as string[]).includes(value);
}

export function generateStaticParams() {
  return VALID.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) return {};
  return {
    title: `${categoryNames[category]} Ürünleri`,
    description: `${categoryNames[category]} kategorisindeki profesyonel ürünler.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategory(category)) notFound();

  const products = getProductsByCategory(category);
  const subcategories = getSubcategoriesByCategory(category);
  const bestSellers = getBestSellers(category, 4);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                Kategori
              </span>
            </div>
            <h1 className="text-5xl font-bold text-coffee mb-2">
              {categoryNames[category]}
            </h1>
            <p className="text-coffee-soft">{products.length} ürün listeleniyor</p>
          </div>

          {bestSellers.length > 0 && (
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-gold text-lg">⭐</span>
                <h2 className="font-display text-2xl font-bold text-coffee">
                  Bu Kategoride Çok Satanlar
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {bestSellers.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              <div className="border-b border-line mt-12" />
            </section>
          )}

          <CategoryProducts products={products} subcategories={subcategories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
