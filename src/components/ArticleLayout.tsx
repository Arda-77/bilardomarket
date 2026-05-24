import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ArticleLayout({
  title,
  category,
  readTime,
  intro,
  children,
}: {
  title: string;
  category: string;
  readTime: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <article className="container mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/rehber"
            className="inline-block text-sm text-coffee-soft hover:text-coffee mb-8"
          >
            ← Tüm rehberler
          </Link>

          <div className="flex items-center gap-3 mb-4 text-xs">
            <span className="bg-gold/10 text-gold font-semibold tracking-wider uppercase px-3 py-1 rounded-full">
              {category}
            </span>
            <span className="text-coffee-soft">{readTime} okuma</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-coffee mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-coffee-soft text-lg leading-relaxed mb-10">
            {intro}
          </p>

          <div className="article-body space-y-6 text-coffee leading-relaxed">
            {children}
          </div>

          <div className="mt-16 p-6 bg-coffee text-ivory rounded-xl">
            <h3 className="font-display text-xl font-bold mb-2">
              Hangi ürün size uygun?
            </h3>
            <p className="text-ivory/70 mb-4">
              BilardoMarket AI veya Oyun Seçici ile size en uygun ürünleri bulun.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/oyun-secici"
                className="bg-gold hover:bg-gold-soft text-coffee font-semibold px-5 py-2.5 rounded-md transition-colors"
              >
                Oyun Seçici →
              </Link>
              <Link
                href="/urunler/bilardo"
                className="border border-ivory/30 hover:border-gold hover:text-gold font-semibold px-5 py-2.5 rounded-md transition-colors"
              >
                Ürünleri Keşfet
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
