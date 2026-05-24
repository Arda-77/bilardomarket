import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Teslimat Bilgileri",
};

const REGIONS = [
  { name: "İstanbul (Avrupa & Anadolu)", time: "1 iş günü", cost: "Ücretsiz" },
  { name: "Ankara, İzmir, Bursa", time: "2 iş günü", cost: "40-50 TL" },
  { name: "Antalya, Adana, Konya, Gaziantep", time: "3 iş günü", cost: "60-70 TL" },
  { name: "Doğu ve Güneydoğu Anadolu", time: "4 iş günü", cost: "80-100 TL" },
];

export default function DeliveryPage() {
  return (
    <PageLayout
      title="Teslimat Bilgileri"
      intro="500 TL üzeri tüm siparişlerde kargo ücretsizdir."
    >
      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          Teslimat Süreleri
        </h2>
        <p className="text-coffee-soft mb-4">
          Siparişiniz onaylandıktan sonra aynı iş günü kargoya verilir. Tahmini teslimat
          süreleri:
        </p>
        <div className="bg-white border border-line rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-ivory-deep text-coffee">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Bölge</th>
                <th className="text-left px-4 py-3 font-semibold">Süre</th>
                <th className="text-left px-4 py-3 font-semibold">Kargo</th>
              </tr>
            </thead>
            <tbody>
              {REGIONS.map((r) => (
                <tr key={r.name} className="border-t border-line">
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.time}</td>
                  <td className="px-4 py-3 text-green font-semibold">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          Bilardo Masası Teslimatı
        </h2>
        <p className="text-coffee-soft">
          Bilardo masaları gabarit ürün olduğu için özel nakliye ile teslim edilir.
          Sipariş sonrası ekibimiz teslimat ve kurulum tarihini sizinle planlar.
          İstanbul ve çevre illerde profesyonel kurulum hizmeti sunuyoruz.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          Kargo Takibi
        </h2>
        <p className="text-coffee-soft">
          Siparişiniz kargoya verildiğinde size kargo takip numarası e-posta ile
          gönderilir. Hesap sayfanızdaki &quot;Siparişlerim&quot; bölümünden de
          takip edebilirsiniz.
        </p>
      </section>
    </PageLayout>
  );
}
