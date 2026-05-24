import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Bilardo Rehberi — Istaka, Top, Bakım ve Kural Rehberleri",
  description:
    "Profesyonel oyunculardan ve uzmanlardan derlenen bilardo rehberi: ıstaka seçimi, masa bakımı, oyun kuralları ve daha fazlası.",
};

const ARTICLES = [
  {
    slug: "istaka-secimi",
    title: "Istaka Seçim Rehberi",
    desc: "Doğru ıstakayı seçmek için ağırlık, dengeleme, uç ölçüsü ve marka rehberi.",
    readTime: "8 dk",
    category: "Ekipman",
  },
  {
    slug: "masa-bakimi",
    title: "Bilardo Masası Bakımı",
    desc: "Çuhanın ömrünü uzatma, lastik bakımı, top temizliği ve aylık rutin kontroller.",
    readTime: "6 dk",
    category: "Bakım",
  },
  {
    slug: "oyun-kurallari",
    title: "Bilardo Oyun Kuralları",
    desc: "8-top, 9-top, snooker ve 3 bant — popüler oyunların kısa kural özetleri.",
    readTime: "10 dk",
    category: "Oyun",
  },
];

export default function GuideHome() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-5xl px-6 py-12">
          <div className="mb-12 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                Bilardo Rehberi
              </span>
            </div>
            <h1 className="text-5xl font-bold text-coffee mb-3">
              Profesyoneller İçin Rehberler
            </h1>
            <p className="text-coffee-soft text-lg">
              Doğru ekipmanı seçmek, masanızı uzun yıllar korumak ve her oyunda
              maksimum verim almak için uzman tavsiyeleri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ARTICLES.map((a) => (
              <Link
                key={a.slug}
                href={`/rehber/${a.slug}`}
                className="group bg-white border border-line rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gold">
                    {a.category}
                  </span>
                  <span className="text-xs text-coffee-soft">{a.readTime}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-coffee mb-2 group-hover:text-green transition-colors">
                  {a.title}
                </h2>
                <p className="text-sm text-coffee-soft">{a.desc}</p>
                <span className="inline-block mt-4 text-sm font-semibold text-green group-hover:translate-x-1 transition-transform">
                  Oku →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
