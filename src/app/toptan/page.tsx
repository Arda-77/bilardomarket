"use client";

import { useState } from "react";
import { Building2, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  interest: string;
  volume: string;
  message: string;
}

const INITIAL: FormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  interest: "",
  volume: "",
  message: "",
};

const INTEREST_OPTIONS = [
  "Bilardo (top, ıstaka, çuha)",
  "Bilardo masaları",
  "Dart ürünleri",
  "Oyun (okey, langırt, kart)",
  "Tüm kategoriler",
];

const VOLUME_OPTIONS = [
  "Tek seferlik (< 10 ürün)",
  "Küçük lot (10-50 ürün)",
  "Orta lot (50-200 ürün)",
  "Büyük lot (200+ ürün)",
  "Sürekli tedarik anlaşması",
];

export default function WholesalePage() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `
Firma: ${form.companyName}
İletişim: ${form.contactName}
E-posta: ${form.email}
Telefon: ${form.phone}
İlgi: ${form.interest}
Tahmini Hacim: ${form.volume}

Mesaj:
${form.message}
    `.trim();
    const mailto = `mailto:toptan@bilardomarket.com?subject=${encodeURIComponent(
      "Toptan Talep — " + form.companyName,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-ivory flex items-center">
          <div className="container mx-auto max-w-2xl px-6 py-24 text-center">
            <div className="inline-flex w-16 h-16 bg-green text-ivory rounded-full items-center justify-center mb-6">
              <Check size={32} />
            </div>
            <h1 className="text-4xl font-bold text-coffee mb-4">
              Talebiniz Alındı
            </h1>
            <p className="text-coffee-soft text-lg mb-8">
              E-posta uygulamanız açıldı. Mesajı gönderdikten sonra ekibimiz 1 iş
              günü içinde size dönüş yapacaktır.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setForm(INITIAL);
              }}
              className="text-green hover:text-green-deep font-semibold"
            >
              Yeni talep gönder
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-3xl px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Toptan & Kurumsal
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-coffee mb-3">
            Toplu Alım Talebi
          </h1>
          <p className="text-coffee-soft mb-10 text-lg">
            Bilardo salonu, kahvehane, otel veya kurumsal alımlar için özel
            fiyatlandırma ve avantajlı teslimat. Formu doldurun, 1 iş günü içinde
            dönüş yapalım.
          </p>

          <div className="bg-white border border-line rounded-xl p-8 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <Building2 size={28} className="text-gold mx-auto mb-2" />
              <h3 className="font-semibold text-coffee">Özel Fiyatlar</h3>
              <p className="text-sm text-coffee-soft">Hacme göre indirim</p>
            </div>
            <div className="text-center">
              <span className="text-3xl">📦</span>
              <h3 className="font-semibold text-coffee mt-2">Toplu Sevkiyat</h3>
              <p className="text-sm text-coffee-soft">Türkiye geneli kargo</p>
            </div>
            <div className="text-center">
              <span className="text-3xl">🤝</span>
              <h3 className="font-semibold text-coffee mt-2">Süreli Anlaşma</h3>
              <p className="text-sm text-coffee-soft">Sürekli tedarik seçeneği</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white border border-line rounded-xl p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  Firma Adı *
                </label>
                <input
                  type="text"
                  required
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  İletişim Kurulacak Kişi *
                </label>
                <input
                  type="text"
                  required
                  value={form.contactName}
                  onChange={(e) => update("contactName", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  E-posta *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-coffee mb-2">
                İlgilendiğiniz Kategori *
              </label>
              <select
                required
                value={form.interest}
                onChange={(e) => update("interest", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
              >
                <option value="">Seçiniz...</option>
                {INTEREST_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-coffee mb-2">
                Tahmini Hacim *
              </label>
              <select
                required
                value={form.volume}
                onChange={(e) => update("volume", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
              >
                <option value="">Seçiniz...</option>
                {VOLUME_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-coffee mb-2">
                Detaylar / Sorular
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Spesifik ürün modelleri, teslimat zaman aralığı, özel istekler..."
                className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green hover:bg-green-deep text-ivory font-semibold py-4 rounded-lg transition-colors"
            >
              Talebi Gönder
            </button>
            <p className="text-xs text-coffee-soft text-center">
              Form gönderildiğinde e-posta uygulamanız açılacak.
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
