import { Mail, Phone, MapPin, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

export const metadata = {
  title: "İletişim",
};

export default function ContactPage() {
  return (
    <PageLayout
      title="İletişim"
      intro="Sorularınız için bize ulaşın. 7/24 BilardoMarket AI da yardımcı olabilir."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white border border-line rounded-lg p-6 flex gap-4">
          <Mail size={24} className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-lg mb-1">E-posta</h3>
            <a
              href="mailto:info@bilardomarket.com"
              className="text-green hover:underline"
            >
              info@bilardomarket.com
            </a>
            <p className="text-xs text-coffee-soft mt-1">
              24 saat içinde dönüş yapıyoruz
            </p>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-6 flex gap-4">
          <Phone size={24} className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-lg mb-1">Telefon</h3>
            <p className="text-coffee">0850 XXX XX XX</p>
            <p className="text-xs text-coffee-soft mt-1">
              Hafta içi 09:00 - 18:00
            </p>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-6 flex gap-4">
          <Clock size={24} className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-lg mb-1">
              Çalışma Saatleri
            </h3>
            <p className="text-coffee text-sm">Hafta içi: 09:00 - 18:00</p>
            <p className="text-coffee text-sm">Cumartesi: 10:00 - 16:00</p>
            <p className="text-xs text-coffee-soft mt-1">
              BilardoMarket AI 7/24
            </p>
          </div>
        </div>

        <div className="bg-white border border-line rounded-lg p-6 flex gap-4">
          <MapPin size={24} className="text-gold flex-shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-lg mb-1">Adres</h3>
            <p className="text-coffee text-sm">
              Yakında açıklanacak
            </p>
            <p className="text-xs text-coffee-soft mt-1">
              Türkiye geneli kargo
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold mt-12 mb-3">
        Toptan / Kurumsal İletişim
      </h2>
      <p className="text-coffee-soft">
        Kurumsal müşteriler, bilardo salonları ve toptan alım için özel
        fiyatlandırma ve teslimat avantajları sunuyoruz. Talebinizi{" "}
        <a
          href="mailto:toptan@bilardomarket.com"
          className="text-green hover:underline"
        >
          toptan@bilardomarket.com
        </a>{" "}
        adresine ulaştırabilirsiniz.
      </p>
    </PageLayout>
  );
}
