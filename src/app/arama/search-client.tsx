"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o");
}

export default function SearchClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initialQuery = params.get("q") ?? "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(params.get("q") ?? "");
  }, [params]);

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];
    const needle = normalize(trimmed);
    return products.filter((p) => {
      const haystack = normalize(`${p.name} ${p.brand ?? ""}`);
      return haystack.includes(needle);
    });
  }, [query]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (query.trim()) sp.set("q", query.trim());
    router.push(`/arama?${sp.toString()}`);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="relative max-w-2xl mb-10">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-soft"
        />
        <input
          type="text"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ürün, marka ara..."
          className="w-full pl-12 pr-12 py-4 rounded-lg bg-white border border-line focus:outline-none focus:border-green text-coffee"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-coffee-soft hover:text-coffee"
            aria-label="Temizle"
          >
            <X size={18} />
          </button>
        )}
      </form>

      {query.trim() === "" ? (
        <p className="text-coffee-soft">Aramak için yukarıya yaz.</p>
      ) : results.length === 0 ? (
        <div className="bg-white border border-line rounded-lg p-12 text-center">
          <p className="text-coffee-soft">
            &quot;{query}&quot; için sonuç bulunamadı.
          </p>
        </div>
      ) : (
        <>
          <p className="text-coffee-soft mb-6">
            {results.length} sonuç &quot;{query}&quot; için
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
