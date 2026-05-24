"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import type { Product, Subcategory } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type SortKey = "popular" | "price-asc" | "price-desc" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Önerilen" },
  { value: "price-asc", label: "Fiyat: Düşükten Yükseğe" },
  { value: "price-desc", label: "Fiyat: Yüksekten Düşüğe" },
  { value: "name", label: "İsme Göre (A-Z)" },
];

export default function CategoryProducts({
  products,
  subcategories,
}: {
  products: Product[];
  subcategories: Subcategory[];
}) {
  const [sort, setSort] = useState<SortKey>("popular");
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return Array.from(set).sort();
  }, [products]);

  const maxPrice = useMemo(
    () => Math.max(...products.map((p) => p.price), 0),
    [products],
  );

  const filtered = useMemo(() => {
    let list = products.slice();
    if (selectedSubs.length > 0) {
      list = list.filter((p) => selectedSubs.includes(p.subcategorySlug));
    }
    if (selectedBrands.length > 0) {
      list = list.filter((p) => p.brand && selectedBrands.includes(p.brand));
    }
    if (priceMax !== null) {
      list = list.filter((p) => p.price <= priceMax);
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
        break;
      case "popular":
      default:
        // keep original order
        break;
    }
    return list;
  }, [products, selectedSubs, selectedBrands, priceMax, sort]);

  const toggle = (
    list: string[],
    setList: (l: string[]) => void,
    value: string,
  ) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );
  };

  const reset = () => {
    setSelectedSubs([]);
    setSelectedBrands([]);
    setPriceMax(null);
  };

  const activeFilterCount =
    selectedSubs.length + selectedBrands.length + (priceMax !== null ? 1 : 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      {/* Filter sidebar */}
      <aside
        className={`${
          filtersOpen
            ? "fixed inset-0 z-50 bg-ivory overflow-y-auto p-6"
            : "hidden lg:block"
        }`}
      >
        {filtersOpen && (
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="font-display text-2xl font-bold">Filtreler</h2>
            <button
              type="button"
              onClick={() => setFiltersOpen(false)}
              aria-label="Kapat"
              className="hover:text-gold"
            >
              <X size={24} />
            </button>
          </div>
        )}

        {subcategories.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-coffee mb-3">
              Alt Kategori
            </h3>
            <ul className="space-y-2">
              {subcategories.map((sub) => (
                <li key={sub.slug}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-green">
                    <input
                      type="checkbox"
                      checked={selectedSubs.includes(sub.slug)}
                      onChange={() =>
                        toggle(selectedSubs, setSelectedSubs, sub.slug)
                      }
                      className="accent-green"
                    />
                    {sub.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {brands.length > 0 && (
          <div className="mb-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-coffee mb-3">
              Marka
            </h3>
            <ul className="space-y-2 max-h-72 overflow-y-auto">
              {brands.map((brand) => (
                <li key={brand}>
                  <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-green">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() =>
                        toggle(selectedBrands, setSelectedBrands, brand)
                      }
                      className="accent-green"
                    />
                    {brand}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-coffee mb-3">
            Maks. Fiyat
          </h3>
          <input
            type="range"
            min={0}
            max={maxPrice}
            step={100}
            value={priceMax ?? maxPrice}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full accent-green"
          />
          <div className="text-sm text-coffee-soft mt-1">
            {priceMax !== null
              ? `${formatPrice(priceMax)} ve altı`
              : "Tüm fiyatlar"}
          </div>
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="w-full text-sm text-green hover:text-green-deep font-semibold"
          >
            Filtreleri Temizle ({activeFilterCount})
          </button>
        )}
      </aside>

      {/* Product list */}
      <div>
        <div className="flex items-center justify-between mb-6 gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 text-sm font-semibold border border-line px-4 py-2.5 rounded-lg hover:border-gold"
          >
            <SlidersHorizontal size={16} /> Filtrele
            {activeFilterCount > 0 && (
              <span className="bg-green text-ivory text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          <div className="text-sm text-coffee-soft">
            {filtered.length} ürün
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-coffee-soft hidden sm:inline">
              Sırala:
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-line bg-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:border-green"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-line rounded-lg p-12 text-center">
            <p className="text-coffee-soft mb-4">
              Bu filtrelerle uyuşan ürün bulunamadı.
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-green font-semibold hover:text-green-deep"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
