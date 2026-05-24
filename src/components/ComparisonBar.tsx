"use client";

import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { useComparison } from "@/contexts/ComparisonContext";

export default function ComparisonBar() {
  const { items, count, maxItems, remove, clear } = useComparison();
  if (count === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-coffee text-ivory border-t border-gold/30 shadow-2xl">
      <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center gap-4">
        <div className="text-xs uppercase tracking-wider font-semibold text-gold whitespace-nowrap hidden sm:block">
          Karşılaştırma <span className="text-ivory/60">({count}/{maxItems})</span>
        </div>
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {items.map((p) => (
            <div
              key={p.id}
              className="relative flex items-center gap-2 bg-ivory/5 rounded-lg px-3 py-1.5 pr-8 min-w-0 flex-shrink-0"
            >
              <div className="relative w-8 h-8 bg-ivory rounded flex-shrink-0">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="32px"
                  className="object-contain p-0.5"
                  unoptimized
                />
              </div>
              <span className="text-xs truncate max-w-[140px]">{p.name}</span>
              <button
                type="button"
                onClick={() => remove(p.id)}
                aria-label="Çıkar"
                className="absolute right-1 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={clear}
            className="text-xs text-ivory/60 hover:text-ivory"
          >
            Temizle
          </button>
          <Link
            href="/karsilastir"
            className={`text-xs font-semibold px-4 py-2 rounded-md transition-colors ${
              count >= 2
                ? "bg-green hover:bg-green-deep text-ivory"
                : "bg-ivory/10 text-ivory/60 cursor-not-allowed pointer-events-none"
            }`}
          >
            Karşılaştır →
          </Link>
        </div>
      </div>
    </div>
  );
}
