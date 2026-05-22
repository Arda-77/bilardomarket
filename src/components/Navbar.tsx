"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User } from "lucide-react";
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

export default function Navbar() {
  const { totalCount } = useCart();
  const { count: favCount } = useFavorites();

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-line">
      <div className="container mx-auto max-w-6xl px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
          BİLARDO<span className="text-gold">MARKET</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/urunler/bilardo"
            className="text-sm font-semibold tracking-wider uppercase hover:text-gold transition-colors"
          >
            Bilardo
          </Link>
          <Link
            href="/urunler/dart"
            className="text-sm font-semibold tracking-wider uppercase hover:text-gold transition-colors"
          >
            Dart
          </Link>
          <Link
            href="/urunler/oyun"
            className="text-sm font-semibold tracking-wider uppercase hover:text-gold transition-colors"
          >
            Oyun
          </Link>
        </nav>

        <div className="flex items-center gap-5 text-coffee">
          <button aria-label="Ara" className="hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <Link
            href="/favoriler"
            aria-label="Favoriler"
            className="relative hover:text-gold transition-colors"
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
          <Link href="/profil" aria-label="Profil" className="hover:text-gold transition-colors">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
