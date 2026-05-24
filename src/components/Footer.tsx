import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-coffee text-ivory mt-24">
      <div className="container mx-auto max-w-6xl px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="font-display text-2xl font-bold mb-3">
            BİLARDO<span className="text-gold">MARKET</span>
          </div>
          <p className="text-ivory/60 text-sm leading-relaxed">
            Profesyonel bilardo, dart ve oyun ekipmanlarında güvenilir adresiniz.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-gold">Kategoriler</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link href="/urunler/bilardo" className="hover:text-gold">Bilardo</Link></li>
            <li><Link href="/urunler/dart" className="hover:text-gold">Dart</Link></li>
            <li><Link href="/urunler/oyun" className="hover:text-gold">Oyun</Link></li>
            <li><Link href="/oyun-secici" className="hover:text-gold">Oyun Seçici</Link></li>
            <li><Link href="/rehber" className="hover:text-gold">Bilardo Rehberi</Link></li>
            <li><Link href="/toptan" className="hover:text-gold">Toptan / Kurumsal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-gold">Yardım</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li><Link href="/sss" className="hover:text-gold">SSS</Link></li>
            <li><Link href="/teslimat" className="hover:text-gold">Teslimat</Link></li>
            <li><Link href="/iade" className="hover:text-gold">İade & Değişim</Link></li>
            <li><Link href="/iletisim" className="hover:text-gold">İletişim</Link></li>
            <li><Link href="/gizlilik" className="hover:text-gold">Gizlilik Politikası</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4 text-gold">İletişim</h4>
          <ul className="space-y-2 text-sm text-ivory/70">
            <li>info@bilardomarket.com</li>
            <li>7/24 Müşteri Desteği</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container mx-auto max-w-6xl px-6 py-6 text-center text-xs text-ivory/40">
          © {new Date().getFullYear()} BilardoMarket. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
