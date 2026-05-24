import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "Gizlilik Politikası",
};

export default function PrivacyPage() {
  return (
    <PageLayout
      title="Gizlilik Politikası"
      intro="Kişisel verilerinizin nasıl korunduğu ve işlendiği hakkında bilgi."
    >
      <p className="text-coffee-soft">
        BilardoMarket.com olarak, kullanıcılarımızın gizliliğini korumayı taahhüt
        ediyoruz. Bu politika, sizden topladığımız bilgilerin nasıl kullanıldığını
        ve korunduğunu açıklar.
      </p>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">
        Topladığımız Veriler
      </h2>
      <ul className="list-disc pl-6 space-y-2 text-coffee-soft">
        <li>İsim, soyisim, e-posta, telefon (sipariş ve iletişim için)</li>
        <li>Teslimat ve fatura adresi</li>
        <li>Ödeme bilgileri (kart bilgileri saklanmaz, ödeme sağlayıcısı tarafından işlenir)</li>
        <li>Site kullanım verileri (çerezler aracılığıyla, anonim)</li>
      </ul>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">
        Verilerin Kullanımı
      </h2>
      <p className="text-coffee-soft">
        Verileriniz yalnızca siparişinizi işleme almak, sizinle iletişim kurmak ve
        yasal zorunluluklarımızı yerine getirmek için kullanılır. Üçüncü taraflarla
        pazarlama amaçlı paylaşılmaz.
      </p>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">
        Çerezler
      </h2>
      <p className="text-coffee-soft">
        Site deneyiminizi iyileştirmek için çerezler kullanırız. Tarayıcı
        ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda
        sitenin bazı özellikleri çalışmayabilir.
      </p>

      <h2 className="font-display text-2xl font-bold mt-8 mb-3">
        KVKK Haklarınız
      </h2>
      <p className="text-coffee-soft">
        6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında verilerinize
        erişme, düzeltme, silme ve işlenmesine itiraz etme haklarına sahipsiniz.
        Bu hakları kullanmak için{" "}
        <a href="mailto:kvkk@bilardomarket.com" className="text-green hover:underline">
          kvkk@bilardomarket.com
        </a>{" "}
        adresine başvurabilirsiniz.
      </p>

      <p className="text-coffee-soft text-sm mt-8">
        Son güncellenme: 2026
      </p>
    </PageLayout>
  );
}
