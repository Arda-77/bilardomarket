// Quiz-driven product recommendation. Maps user answers to product filters
// that work against our live products.ts catalog.

import type { Product } from "@/lib/products";
import { products } from "@/lib/products";

export type GameType = "pool" | "snooker" | "3-band" | "dart" | "okey";
export type PlayerLevel = "beginner" | "intermediate" | "advanced" | "pro";
export type BudgetRange = "low" | "mid" | "high" | "pro";

export interface QuizAnswers {
  game: GameType;
  level: PlayerLevel;
  budget: BudgetRange;
}

export const GAME_OPTIONS: { value: GameType; label: string; emoji: string; desc: string }[] = [
  { value: "pool", label: "Amerikan Bilardo (Pool)", emoji: "🎱", desc: "8-top, 9-top oyunları" },
  { value: "3-band", label: "3 Bant Bilardo", emoji: "🎯", desc: "Büyük masa, hassas karambol oyunu" },
  { value: "snooker", label: "Snooker", emoji: "🟥", desc: "22 toplu İngiliz bilardosu" },
  { value: "dart", label: "Dart", emoji: "🎯", desc: "Steel veya soft tip" },
  { value: "okey", label: "Okey / Kart", emoji: "🃏", desc: "Salon oyunları" },
];

export const LEVEL_OPTIONS: { value: PlayerLevel; label: string; desc: string }[] = [
  { value: "beginner", label: "Başlangıç", desc: "Yeni başlıyorum, basit ve kullanışlı olsun" },
  { value: "intermediate", label: "Orta seviye", desc: "Düzenli oynuyorum, kaliteyi hissedebilirim" },
  { value: "advanced", label: "İleri seviye", desc: "Turnuvalara katılıyorum, performans önemli" },
  { value: "pro", label: "Profesyonel", desc: "Üst düzey ekipman istiyorum, fiyat ikinci planda" },
];

export const BUDGET_OPTIONS: { value: BudgetRange; label: string; range: string; max: number }[] = [
  { value: "low", label: "Ekonomik", range: "0 - 3.000 TL", max: 3000 },
  { value: "mid", label: "Orta", range: "3.000 - 15.000 TL", max: 15000 },
  { value: "high", label: "Premium", range: "15.000 - 50.000 TL", max: 50000 },
  { value: "pro", label: "Profesyonel", range: "50.000 TL üzeri", max: Infinity },
];

const BUDGET_MIN: Record<BudgetRange, number> = {
  low: 0,
  mid: 3000,
  high: 15000,
  pro: 50000,
};

// Subcategories that match each game type (using our actual catalog slugs)
const GAME_SUBCATEGORIES: Record<GameType, string[]> = {
  pool: [
    "amerikan-bilardo-toplari",
    "bilardo-istakalari",
    "ekonomik-istakalar",
    "bilardo-aksesuarlari",
    "bilardo-cuhalari",
    "bilardo-uclari",
    "bilardo-tebesirleri",
    "istaka-cantalari",
    "bilardo-eldivenleri",
  ],
  "3-band": [
    "3-bant-bilardo-toplari",
    "bilardo-istakalari",
    "carom-istakalar",
    "bilardo-cuhalari",
    "bilardo-uclari",
    "istaka-cantalari",
  ],
  snooker: [
    "bilardo-istakalari",
    "bilardo-cuhalari",
    "bilardo-uclari",
    "istaka-cantalari",
  ],
  dart: ["dart-urunleri"],
  okey: ["okey-urunleri", "langirt-urunleri", "kart-dagitici"],
};

export function recommendProducts(answers: QuizAnswers, count = 3): Product[] {
  const subs = GAME_SUBCATEGORIES[answers.game];
  const minBudget = BUDGET_MIN[answers.budget];
  const maxBudget = BUDGET_OPTIONS.find((b) => b.value === answers.budget)?.max ?? Infinity;

  // Filter products that match game subcategories and budget
  const candidates = products.filter(
    (p) => subs.includes(p.subcategorySlug) && p.price >= minBudget && p.price <= maxBudget,
  );

  // Score: higher = better match. Reward branded items, and items near the
  // mid-point of the budget range for the player level.
  const scored = candidates.map((p) => {
    let score = 0;
    if (p.brand) score += 10;

    // Level fit — beginners prefer lower half of budget, pros prefer upper
    const budgetSpan = (isFinite(maxBudget) ? maxBudget : p.price * 2) - minBudget;
    const positionInBudget = budgetSpan > 0 ? (p.price - minBudget) / budgetSpan : 0.5;
    const targetPosition = { beginner: 0.3, intermediate: 0.5, advanced: 0.7, pro: 0.9 }[
      answers.level
    ];
    score += 20 * (1 - Math.abs(positionInBudget - targetPosition));

    return { product: p, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, count).map((s) => s.product);

  // Fallback: if no matches at all (e.g., budget too low for game type), relax
  // budget and return cheapest in subcategories.
  if (top.length === 0) {
    return products
      .filter((p) => subs.includes(p.subcategorySlug))
      .sort((a, b) => a.price - b.price)
      .slice(0, count);
  }

  return top;
}
