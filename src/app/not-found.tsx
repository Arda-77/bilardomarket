import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center bg-ivory">
        <div className="container mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="flex items-center gap-3 justify-center mb-6">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Sayfa Bulunamadı
            </span>
            <div className="h-px w-12 bg-gold" />
          </div>
          <h1 className="font-display text-7xl md:text-9xl font-bold text-coffee mb-4">
            404
          </h1>
          <p className="text-coffee-soft text-lg mb-10 max-w-md mx-auto">
            Aradığınız sayfa kaybolmuş gibi görünüyor. Belki ana sayfadan
            yeniden başlamak istersiniz.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/"
              className="bg-green hover:bg-green-deep text-ivory font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/urunler/bilardo"
              className="border border-line hover:border-gold hover:text-gold text-coffee font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
