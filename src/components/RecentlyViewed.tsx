"use client";

import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";

export default function RecentlyViewed({
  excludeId,
  title = "Son Görüntülediğin Ürünler",
}: {
  excludeId?: string;
  title?: string;
}) {
  const { items } = useRecentlyViewed();
  const filtered = items.filter((p) => p.id !== excludeId).slice(0, 4);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-3xl font-bold text-coffee mb-6">
        {title}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
