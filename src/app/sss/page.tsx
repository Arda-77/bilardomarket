import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Sıkça Sorulan Sorular",
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "Siparişim ne zaman elime ulaşır?",
    a: "İstanbul içi siparişler 1 iş günü, diğer şehirler 2-4 iş günü içinde teslim edilir. 500 TL üzeri siparişlerde kargo ücretsizdir.",
  },
  {
    q: "Bilardo masası kurulum hizmeti veriyor musunuz?",
    a: "İstanbul ve çevre illerde profesyonel kurulum hizmeti sunuyoruz. Sipariş sırasında 'Kurulum İste' seçeneği ile talep edebilirsiniz.",
  },
  {
    q: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
    a: "Kredi/banka kartı, havale/EFT ve kapıda ödeme seçeneklerimiz mevcut. Tüm ödemeler 256-bit SSL ile şifrelenmiştir.",
  },
  {
    q: "Ürünleri iade edebilir miyim?",
    a: "Tüketici hakları kapsamında ürünleri teslim aldığınız tarihten itibaren 14 gün içinde, orijinal ambalajında ve kullanılmamış olarak iade edebilirsiniz.",
  },
  {
    q: "Toptan/kurumsal alım için fiyat alabilir miyim?",
    a: "Evet, kurumsal müşterilerimize özel fiyatlandırma sunuyoruz. İletişim sayfasından bizimle iletişime geçebilir veya info@bilardomarket.com adresine e-posta gönderebilirsiniz.",
  },
  {
    q: "Ürün garantisi nasıl çalışır?",
    a: "Tüm ürünlerimiz üretici garantisi kapsamındadır. Garanti süresi ürünlere göre 1-3 yıl arası değişir, ürün detay sayfasında belirtilmiştir.",
  },
  {
    q: "Istakamı bana özel yaptırabilir miyim?",
    a: "Premium markalarımızda kişiselleştirme seçeneği mevcuttur. Talebinizi BilardoMarket AI sohbetinden veya iletişim formundan bize iletin.",
  },
];

export default function FAQPage() {
  return (
    <PageLayout
      title="Sıkça Sorulan Sorular"
      intro="Aradığınız cevabı bulamadıysanız BilardoMarket AI'a sorun veya iletişim sayfasından bize ulaşın."
    >
      <div className="space-y-4">
        {FAQ.map((item, i) => (
          <details
            key={i}
            className="bg-white border border-line rounded-lg p-5 group"
          >
            <summary className="font-display font-semibold text-lg cursor-pointer list-none flex justify-between items-center">
              {item.q}
              <span className="text-gold text-xl group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="mt-3 text-coffee-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </PageLayout>
  );
}
