"use client";

import { useMemo, useState } from "react";
import { Ruler, Check, X as XIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { evaluateRoom } from "@/lib/room-calculator";

export default function RoomCalculatorPage() {
  const [length, setLength] = useState<number>(400);
  const [width, setWidth] = useState<number>(300);

  const results = useMemo(
    () => evaluateRoom({ length, width }),
    [length, width],
  );
  const fitsCount = results.filter((r) => r.fits).length;
  const largest = results.filter((r) => r.fits).slice(-1)[0];

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Akıllı Araç
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-coffee mb-3">
            Oda Hesaplayıcı
          </h1>
          <p className="text-coffee-soft mb-10 text-lg">
            Bilardo masası için odanızın yeterli olup olmadığını anında
            görün — ısta için 150 cm rahat oynama mesafesi dahil hesaplanır.
          </p>

          <div className="bg-white border border-line rounded-xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  Oda Uzunluğu
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={100}
                    max={1500}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                  />
                  <span className="text-coffee-soft text-sm whitespace-nowrap">cm</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={1000}
                  step={10}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full mt-3 accent-green"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-coffee mb-2">
                  Oda Genişliği
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={100}
                    max={1500}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-lg bg-ivory-deep border border-line focus:outline-none focus:border-green"
                  />
                  <span className="text-coffee-soft text-sm whitespace-nowrap">cm</span>
                </div>
                <input
                  type="range"
                  min={200}
                  max={1000}
                  step={10}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full mt-3 accent-green"
                />
              </div>
            </div>

            <div className="bg-coffee text-ivory rounded-lg p-5 flex items-start gap-4">
              <Ruler size={32} className="text-gold flex-shrink-0" />
              <div className="flex-1">
                {fitsCount > 0 && largest ? (
                  <>
                    <p className="text-ivory/70 text-sm mb-1">Tavsiyemiz:</p>
                    <p className="font-display text-2xl font-bold text-gold mb-1">
                      {largest.table.name}
                    </p>
                    <p className="text-sm text-ivory/80">
                      Odanız {fitsCount} farklı masa boyutuna uygun. En büyük masa
                      önerimiz {largest.table.name} ({largest.table.length}×
                      {largest.table.width} cm).
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-display text-2xl font-bold text-gold mb-1">
                      Uygun masa yok
                    </p>
                    <p className="text-sm text-ivory/80">
                      Bu boyuttaki bir odaya bilardo masası kurulması, ısta için
                      150 cm rahat oynama mesafesi gerektiren standartı karşılamıyor.
                      Daha geniş bir alana ihtiyaç var.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-coffee mb-4">
              Tüm Masa Boyutları
            </h2>
            <div className="overflow-x-auto bg-white border border-line rounded-xl">
              <table className="w-full text-sm">
                <thead className="bg-ivory-deep">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">Masa</th>
                    <th className="text-left px-4 py-3 font-semibold">Boyut</th>
                    <th className="text-left px-4 py-3 font-semibold">
                      Gerekli Oda
                    </th>
                    <th className="text-center px-4 py-3 font-semibold">Uyum</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.table.id} className="border-t border-line">
                      <td className="px-4 py-3 font-semibold">
                        {r.table.name}
                      </td>
                      <td className="px-4 py-3 text-coffee-soft">
                        {r.table.length} × {r.table.width} cm
                      </td>
                      <td className="px-4 py-3 text-coffee-soft">
                        {r.table.length + 2 * r.table.minClearance} ×{" "}
                        {r.table.width + 2 * r.table.minClearance} cm
                      </td>
                      <td className="px-4 py-3 text-center">
                        {r.fits ? (
                          <span className="inline-flex items-center gap-1 text-green font-semibold">
                            <Check size={16} /> Uygun
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                            <XIcon size={16} /> Yetmez
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-coffee-soft mt-6">
            Hesaplama 150 cm minimum ısta mesafesi varsayar. Profesyonel turnuva
            ortamı için 180 cm önerilir.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
