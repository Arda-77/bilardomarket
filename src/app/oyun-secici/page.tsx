"use client";

import { useState } from "react";
import { ChevronLeft, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  BUDGET_OPTIONS,
  GAME_OPTIONS,
  LEVEL_OPTIONS,
  recommendProducts,
  type BudgetRange,
  type GameType,
  type PlayerLevel,
} from "@/lib/game-selector";

type Step = 1 | 2 | 3 | 4;

export default function GameSelectorPage() {
  const [step, setStep] = useState<Step>(1);
  const [game, setGame] = useState<GameType | null>(null);
  const [level, setLevel] = useState<PlayerLevel | null>(null);
  const [budget, setBudget] = useState<BudgetRange | null>(null);

  const totalSteps = 3;
  const progress = step === 4 ? 100 : Math.round(((step - 1) / totalSteps) * 100);

  const reset = () => {
    setStep(1);
    setGame(null);
    setLevel(null);
    setBudget(null);
  };

  const recommendations =
    step === 4 && game && level && budget
      ? recommendProducts({ game, level, budget })
      : [];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-3xl px-6 py-12">
          {step !== 4 && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-gold" />
                <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                  Oyun Seçici
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-coffee mb-3">
                Sana en uygun ürünleri bulalım
              </h1>
              <p className="text-coffee-soft mb-8">
                3 kısa adımda, ihtiyacına özel ürün önerilerimiz hazır olsun.
              </p>

              <div className="mb-8 bg-white rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-green transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <section>
              <h2 className="font-display text-2xl font-bold mb-4">
                1. Hangi oyunu oynuyorsun?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {GAME_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setGame(opt.value);
                      setStep(2);
                    }}
                    className="text-left bg-white border border-line p-5 rounded-xl hover:border-green hover:shadow-md transition-all"
                  >
                    <div className="text-3xl mb-2">{opt.emoji}</div>
                    <div className="font-display text-lg font-semibold text-coffee">
                      {opt.label}
                    </div>
                    <div className="text-sm text-coffee-soft mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 2 && (
            <section>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 text-coffee-soft text-sm mb-4 hover:text-coffee"
              >
                <ChevronLeft size={16} /> Geri
              </button>
              <h2 className="font-display text-2xl font-bold mb-4">
                2. Hangi seviyedesin?
              </h2>
              <div className="space-y-3">
                {LEVEL_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setLevel(opt.value);
                      setStep(3);
                    }}
                    className="w-full text-left bg-white border border-line p-5 rounded-xl hover:border-green hover:shadow-md transition-all"
                  >
                    <div className="font-display text-lg font-semibold text-coffee">
                      {opt.label}
                    </div>
                    <div className="text-sm text-coffee-soft mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 3 && (
            <section>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 text-coffee-soft text-sm mb-4 hover:text-coffee"
              >
                <ChevronLeft size={16} /> Geri
              </button>
              <h2 className="font-display text-2xl font-bold mb-4">
                3. Bütçen hangi aralıkta?
              </h2>
              <div className="space-y-3">
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setBudget(opt.value);
                      setStep(4);
                    }}
                    className="w-full text-left bg-white border border-line p-5 rounded-xl hover:border-green hover:shadow-md transition-all flex justify-between items-center"
                  >
                    <div>
                      <div className="font-display text-lg font-semibold text-coffee">
                        {opt.label}
                      </div>
                      <div className="text-sm text-coffee-soft mt-1">
                        {opt.range}
                      </div>
                    </div>
                    <span className="text-gold">→</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === 4 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-gold" size={20} />
                <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                  Senin İçin Seçtiklerimiz
                </span>
              </div>
              <h1 className="text-4xl font-bold text-coffee mb-3">
                İşte sana uygun 3 ürün
              </h1>
              <p className="text-coffee-soft mb-8">
                {GAME_OPTIONS.find((g) => g.value === game)?.label} ·{" "}
                {LEVEL_OPTIONS.find((l) => l.value === level)?.label} ·{" "}
                {BUDGET_OPTIONS.find((b) => b.value === budget)?.range}
              </p>

              {recommendations.length === 0 ? (
                <div className="bg-white border border-line rounded-lg p-8 text-center">
                  <p className="text-coffee-soft mb-4">
                    Bu kriterlerde tam eşleşme bulamadık. Lütfen bütçe veya seviyeyi
                    güncelleyin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  {recommendations.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="flex items-center gap-2 bg-coffee hover:bg-coffee/90 text-ivory font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <RotateCcw size={16} /> Tekrar Dene
                </button>
                <Link
                  href={`/urunler/${
                    game === "dart" ? "dart" : game === "okey" ? "oyun" : "bilardo"
                  }`}
                  className="border border-line hover:border-gold hover:text-gold font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Tüm Ürünleri Gör
                </Link>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
