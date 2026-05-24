import ArticleLayout from "@/components/ArticleLayout";

export const metadata = {
  title: "Istaka Seçim Rehberi — Ağırlık, Denge, Uç Çapı",
  description:
    "Doğru bilardo ıstakası nasıl seçilir? Ağırlık, dengeleme noktası, uç çapı ve marka tavsiyeleri.",
};

export default function CueSelectionGuide() {
  return (
    <ArticleLayout
      title="Istaka Seçim Rehberi"
      category="Ekipman"
      readTime="8 dk"
      intro="Doğru ıstaka, oyununuzu ileri taşıyan ilk yatırımdır. Bu rehberde ağırlık, denge, uç çapı ve marka tercihlerini açıklıyoruz."
    >
      <h2 className="font-display text-2xl font-bold mt-8 mb-3">1. Ağırlık</h2>
      <p>
        Standart bilardo ıstakaları <strong>17-21 ons</strong> (482-595 gram) arasında değişir.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>17-18 ons:</strong> Hassas kontrol, snooker ve hassas vuruşlar için</li>
        <li><strong>19 ons:</strong> Çoğu oyuncu için altın orta — esnek ve dengeli</li>
        <li><strong>20-21 ons:</strong> Güçlü vuruşlar, açış (break) ve uzun mesafe için</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">2. Dengeleme Noktası</h2>
      <p>
        Bir ıstakanın dengesi, parmaklarınızla tuttuğunuzda dengelendiği noktadır. Genellikle
        ıstakanın ortasından 45-48 cm uca doğrudur.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Önde denge (forward weighted):</strong> Daha güçlü vuruş hissi</li>
        <li><strong>Geride denge (rear weighted):</strong> Daha hassas, kontrollü oyun</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">3. Uç Çapı</h2>
      <p>
        Uç çapı topla temas alanını belirler ve doğrudan kontrolü etkiler.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>11.75-12.5 mm:</strong> Hassas spin, profesyonel oyun (Pool için ideal)</li>
        <li><strong>12.5-13 mm:</strong> Geniş tolerans, başlangıç-orta seviye</li>
        <li><strong>9-10 mm:</strong> Snooker için karakteristik</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">4. Şaft Malzemesi</h2>
      <p>
        Klasik Kanada akçaağacı (Hard Rock Maple) hala en popüler tercih. Karbon fiber şaftlar
        (Predator REVO, Cuetec Cynergy gibi) daha sert, daha az &quot;deflection&quot; sunar — ancak
        fiyatı çok daha yüksektir.
      </p>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">5. Marka Tavsiyeleri</h2>
      <p>BilardoMarket&apos;te en çok tercih edilen ıstaka markaları:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Longoni:</strong> İtalyan zanaatkârlığı, premium Carom segmenti</li>
        <li><strong>Predator:</strong> Düşük deflection teknolojisi, Pool için referans</li>
        <li><strong>Cuetec:</strong> Hibrit şaftlar, profesyonel turnuva oyuncuları</li>
        <li><strong>McDermott & Lucasi:</strong> Orta segment, fiyat-performans dengesi</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Özetle</h2>
      <p>
        Başlangıç seviyesindeyseniz <strong>19 ons, 12.75mm uç, akçaağaç şaft</strong> üçlüsü
        güvenli bir seçimdir. Seviye atladıkça, oyun stilinize göre özelleştirme yapabilirsiniz.
        Karar vermekte zorlanırsanız BilardoMarket AI&apos;a sorun — somut ürün önerisi alabilirsiniz.
      </p>
    </ArticleLayout>
  );
}
