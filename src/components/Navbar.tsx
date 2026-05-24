"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -top-1.5 -right-1.5 bg-green text-ivory text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
      {count > 99 ? "99+" : count}
    </span>
  );
}

const NAV_LINKS = [
  { href: "/urunler/bilardo", label: "Bilardo" },
  { href: "/urunler/dart", label: "Dart" },
  { href: "/urunler/oyun", label: "Oyun" },
];

export default function Navbar() {
  const router = useRouter();
  const { totalCount } = useCart();
  const { count: favCount } = useFavorites();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setSearchOpen(false);
    setMobileOpen(false);
    setQuery("");
    router.push(`/arama?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur border-b border-line">
      <div className="container mx-auto max-w-6xl px-6 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight shrink-0"
        >
          BİLARDO<span className="text-gold">MARKET</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-wider uppercase hover:text-gold transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5 text-coffee">
          <button
            type="button"
            aria-label="Ara"
            onClick={() => setSearchOpen((v) => !v)}
            className="hover:text-gold transition-colors"
          >
            {searchOpen ? <X size={20} /> : <Search size={20} />}
          </button>
          <Link
            href="/favoriler"
            aria-label="Favoriler"
            className="relative hover:text-gold transition-colors hidden sm:block"
          >
            <Heart size={20} />
            <Badge count={favCount} />
          </Link>
          <Link
            href="/sepet"
            aria-label="Sepet"
            className="relative hover:text-gold transition-colors"
          >
            <ShoppingCart size={20} />
            <Badge count={totalCount} />
          </Link>
          <Link
            href="/profil"
            aria-label="Profil"
            className="hover:text-gold transition-colors hidden sm:block"
          >
            <User size={20} />
          </Link>
          <button
            type="button"
            aria-label="Menü"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden hover:text-gold transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-line bg-white">
          <form
            onSubmit={submitSearch}
            className="container mx-auto max-w-6xl px-6 py-4 flex gap-2"
          >
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ürün, marka ara..."
              className="flex-1 px-4 py-3 rounded-lg bg-ivory border border-line focus:outline-none focus:border-green"
            />
            <button
              type="submit"
              className="bg-green hover:bg-green-deep text-ivory font-semibold px-6 rounded-lg"
            >
              Ara
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden border-t border-line bg-white">
          <nav className="container mx-auto max-w-6xl px-6 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold tracking-wider uppercase py-2 hover:text-gold"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/favoriler"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold tracking-wider uppercase py-2 hover:text-gold sm:hidden"
            >
              Favoriler {favCount > 0 && `(${favCount})`}
            </Link>
            <Link
              href="/profil"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold tracking-wider uppercase py-2 hover:text-gold sm:hidden"
            >
              Profil
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
