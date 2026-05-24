import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "İade & Değişim",
};

export default function ReturnsPage() {
  return (
    <PageLayout
      title="İade & Değişim"
      intro="Mesafeli Satış Sözleşmesi gereği 14 günlük iade hakkınız vardır."
    >
      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          İade Koşulları
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-coffee-soft">
          <li>Ürünün teslim alınmasından itibaren 14 gün içinde iade talebiniz olmalı.</li>
          <li>Ürün orijinal ambalajında ve kullanılmamış halde olmalı.</li>
          <li>Bilardo masaları ve özel kişiselleştirilmiş ürünler iade kapsamı dışındadır.</li>
          <li>İade kargo bedeli, kusurlu ürünler hariç müşteriye aittir.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          İade Süreci
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-coffee-soft">
          <li>
            <strong className="text-coffee">İade talebi gönderin:</strong>{" "}
            iletişim formundan veya{" "}
            <a href="mailto:info@bilardomarket.com" className="text-green hover:underline">
              info@bilardomarket.com
            </a>{" "}
            adresinden bizimle iletişime geçin.
          </li>
          <li>
            <strong className="text-coffee">İade kodu alın:</strong> Ekibimiz size bir
            iade kodu ve kargo yönergeleri gönderecek.
          </li>
          <li>
            <strong className="text-coffee">Ürünü gönderin:</strong> Ürünü
            anlaşmalı kargo şirketimizle bize iletin.
          </li>
          <li>
            <strong className="text-coffee">Para iadesi:</strong> Ürün tarafımıza
            ulaştıktan ve incelendikten sonra 3 iş günü içinde ödemenizi iade ederiz.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="font-display text-2xl font-bold mt-8 mb-3">
          Değişim
        </h2>
        <p className="text-coffee-soft">
          Aynı ürünün farklı bir varyantıyla değişim yapmak istiyorsanız aynı süreçle
          başlayabilirsiniz. Fiyat farkı varsa fark talep edilir veya iade edilir.
        </p>
      </section>
    </PageLayout>
  );
}
