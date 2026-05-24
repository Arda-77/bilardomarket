import ArticleLayout from "@/components/ArticleLayout";

export const metadata = {
  title: "Bilardo Masası Bakımı — Çuha, Top, Lastik Bakım Rehberi",
  description:
    "Bilardo masanızın ömrünü uzatın: çuha temizliği, top bakımı, lastik kontrol, nem ve sıcaklık önerileri.",
};

export default function MaintenanceGuide() {
  return (
    <ArticleLayout
      title="Bilardo Masası Bakımı"
      category="Bakım"
      readTime="6 dk"
      intro="Bir bilardo masası doğru bakımla 20+ yıl size hizmet edebilir. Bu rehberde günlük, haftalık ve yıllık bakım rutinlerini paylaşıyoruz."
    >
      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Günlük Bakım</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Çuhayı fırçalayın:</strong> Oyun sonrası özel bilardo fırçası ile aynı yönde
          (uzun kenar boyunca) fırçalayın. Tebeşir tozu birikmesin.
        </li>
        <li>
          <strong>Topları silin:</strong> Yumuşak mikrofiber bezle topları temizleyin.
          Profesyonel top temizleyici ürünler ay sonu kullanılır.
        </li>
        <li>
          <strong>Masayı örtün:</strong> Kullanmadığınız zamanlarda masa örtüsüyle kapatın —
          toz, güneş ışığı ve direkt sıcağa karşı korur.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Haftalık Bakım</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Çuha derin temizliği:</strong> Düşük güçte elektrik süpürgesi (mobilya
          başlığıyla) kullanarak çuhadaki tozu çekin.
        </li>
        <li>
          <strong>Lastik kontrolü:</strong> Top oynatarak lastiğin elastikiyetini test edin.
          Donuk seste lastik sertleşmiş demektir, profesyonel destek alın.
        </li>
        <li>
          <strong>Ahşap parlatma:</strong> Masa ahşap kenarlarını yumuşak bezle, ahşap bakım
          ürünüyle silin.
        </li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">Çevre Koşulları</h2>
      <p>Bilardo masası şu çevre koşullarında en iyi performansı verir:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Sıcaklık:</strong> 18-24°C arası, ani değişimden kaçının</li>
        <li><strong>Nem:</strong> %40-60 bağıl nem ideal</li>
        <li><strong>Işık:</strong> Direkt güneş çuhayı soldurur, kaliteli masa lambası kullanın</li>
        <li><strong>Zemin:</strong> Sağlam, düz ve stabil — yumuşak zeminde masa zaman içinde
          eğilir</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">
        Çuha Değişimi Ne Zaman Gerekir?
      </h2>
      <p>Çuha aşağıdaki belirtilerden birini gösteriyorsa değişim zamanı gelmiştir:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Görünür yıpranma, sökülme veya yırtık</li>
        <li>Top akışında düzensizlik (top &quot;sıçrıyor&quot; veya yavaşlıyor)</li>
        <li>Yağ veya leke kalıcı kirlilik</li>
        <li>Yoğun kullanımda 2-3 yıl, normal kullanımda 5-7 yıl</li>
      </ul>
      <p className="mt-4">
        Profesyonel çuha değişimi <strong>Gorina, Hainsworth veya Granito</strong> markalarıyla
        İstanbul içi 1 iş gününde tamamlanır. Ekibimizle iletişime geçin.
      </p>
    </ArticleLayout>
  );
}
