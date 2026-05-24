import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";
import {
  categoryNames,
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

          <CategoryProducts products={products} subcategories={subcategories} />
        </div>
      </main>
      <Footer />
    </>
  );
}
