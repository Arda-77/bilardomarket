import ArticleLayout from "@/components/ArticleLayout";

export const metadata = {
  title: "Bilardo Oyun Kuralları — 8-top, 9-top, Snooker, 3 Bant",
  description:
    "En popüler bilardo oyunlarının kuralları: 8-top, 9-top, snooker ve 3 bant. Başlangıç oyuncular için kısa rehber.",
};

export default function GameRulesGuide() {
  return (
    <ArticleLayout
      title="Bilardo Oyun Kuralları"
      category="Oyun"
      readTime="10 dk"
      intro="En popüler bilardo oyunlarını kısaca tanıtıyoruz. Pool, snooker veya 3 bant — hangisi sizin için uygun?"
    >
      <h2 className="font-display text-2xl font-bold mt-8 mb-3">8-Top (Amerikan)</h2>
      <p>
        Türkiye&apos;de en yaygın oynanan oyun. 15 numaralı toplar (1-7 düz, 9-15 çizgili) ve 8
        topu ile oynanır.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Amaç:</strong> Önce kendi grubunuzu (düz veya çizgili) sokmak, sonra 8 topunu sokmak.</li>
        <li><strong>Açılış:</strong> Aynı top numarası grubuna sokulması belirleyicidir.</li>
        <li><strong>Kazanma:</strong> 8 topunu doğru cebe ilan ederek sokan kazanır.</li>
        <li><strong>Kaybetme:</strong> 8 topu yanlış cebe sokulursa veya istemeden sokulursa oyun kaybedilir.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">9-Top</h2>
      <p>
        Hızlı tempolu, profesyonel turnuvalarda en sık görülen versiyon. 1-9 numaralı toplarla
        oynanır.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Sıralı vuruş:</strong> Beyaz top, masada en düşük numaralı topla ilk teması yapmalı.</li>
        <li><strong>Kazanma:</strong> Sıralı oynanan vuruşlar sonunda 9 topunu cebe sokan kazanır.</li>
        <li><strong>Push out:</strong> İlk vuruştan sonraki vuruşta &quot;push out&quot; kuralı uygulanabilir.</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Snooker</h2>
      <p>
        İngiliz bilardosu. 22 topla oynanır: 15 kırmızı + 6 renkli + 1 beyaz. Büyük 12 fit
        masada profesyonel olarak oynanır.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Puan sistemi:</strong> Kırmızı (1), sarı (2), yeşil (3), kahverengi (4), mavi (5), pembe (6), siyah (7).</li>
        <li><strong>Sıra:</strong> Önce kırmızı, sonra renkli, sonra tekrar kırmızı — bu şekilde devam eder.</li>
        <li><strong>Renkli toplar:</strong> Kırmızılar bittikten sonra puan sırasıyla oynanır.</li>
        <li><strong>Maximum break:</strong> 147 puan (her kırmızı + siyahla devam etmek).</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">3 Bant (Carom)</h2>
      <p>
        Klasik karambol bilardosu. Cebi olmayan büyük masada (genelde 10 fit) sadece 3 topla
        oynanır.
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Top sayısı:</strong> 1 beyaz, 1 sarı, 1 kırmızı.</li>
        <li><strong>Amaç:</strong> Beyaz top en az 3 banta dokunduktan sonra diğer iki topa temas etmeli.</li>
        <li><strong>Puanlama:</strong> Her başarılı karambol 1 puan. Belirlenen puana ilk ulaşan kazanır.</li>
        <li><strong>Türkiye:</strong> 3 bantta Türk oyuncular dünya çapında üstün performans gösterir (Semih Saygıner, Murat Naci Çoklu vb.).</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Hangi Oyunu Tercih Etmeli?</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Yeni başlıyorum:</strong> 8-top — kuralları basit, hızlı öğrenilir.</li>
        <li><strong>Hızlı tempolu maç istiyorum:</strong> 9-top.</li>
        <li><strong>Beceri ve sabır:</strong> Snooker — daha hassas, mental oyun.</li>
        <li><strong>Karambol ustalığı:</strong> 3 bant — Türkiye&apos;de güçlü ekol.</li>
      </ul>
    </ArticleLayout>
  );
}
