import { Star } from "lucide-react";

// Mock reviews — until we wire a database. Deterministic per product so the
// same product always shows the same reviews.
const REVIEW_POOL: { author: string; rating: number; date: string; text: string }[] = [
  {
    author: "Mehmet K.",
    rating: 5,
    date: "12 gün önce",
    text: "Beklediğimden hızlı geldi, ürün açıklamayla bire bir aynı. Kalite çok iyi.",
  },
  {
    author: "Ayşe Y.",
    rating: 4,
    date: "3 hafta önce",
    text: "Ürün gayet güzel ama kargo paketi biraz hasarlıydı. İçindeki ürün sağlam.",
  },
  {
    author: "Burak D.",
    rating: 5,
    date: "1 ay önce",
    text: "Profesyonel kalite. Birkaç yerden baktım, en uygun fiyat buradaymış.",
  },
  {
    author: "Selin A.",
    rating: 5,
    date: "5 hafta önce",
    text: "Müşteri hizmetlerinden hızlı dönüş aldım. Tekrar alışveriş yapacağım.",
  },
  {
    author: "Onur T.",
    rating: 4,
    date: "2 ay önce",
    text: "Fiyatı performansı iyi. Profesyoneller için biraz daha üst model bakılabilir.",
  },
  {
    author: "Cem Ö.",
    rating: 5,
    date: "3 ay önce",
    text: "Tam olarak aradığım üründü. Faturalı ve garantili gönderildi.",
  },
];

function hash(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function pickReviews(productId: string) {
  const h = hash(productId);
  const count = 3 + (h % 3); // 3-5 reviews
  const start = h % REVIEW_POOL.length;
  const picked = [];
  for (let i = 0; i < count; i++) {
    picked.push(REVIEW_POOL[(start + i) % REVIEW_POOL.length]);
  }
  return picked;
}

function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-gold">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          fill={n <= rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function ReviewSection({ productId }: { productId: string }) {
  const reviews = pickReviews(productId);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display text-3xl font-bold text-coffee">
          Müşteri Yorumları
        </h2>
        <div className="flex items-center gap-3">
          <Stars rating={Math.round(avg)} size={18} />
          <span className="font-semibold text-coffee">
            {avg.toFixed(1)} / 5.0
          </span>
          <span className="text-coffee-soft text-sm">
            ({reviews.length} yorum)
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <article
            key={i}
            className="bg-white border border-line rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-coffee text-ivory flex items-center justify-center font-semibold text-sm">
                  {r.author.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-coffee text-sm">
                    {r.author}
                  </div>
                  <div className="text-xs text-coffee-soft">{r.date}</div>
                </div>
              </div>
              <Stars rating={r.rating} />
            </div>
            <p className="text-coffee-soft leading-relaxed">{r.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
