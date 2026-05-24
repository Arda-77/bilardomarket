import type { NextRequest } from "next/server";
import {
  products,
  subcategories,
  formatPrice,
  type Product,
} from "@/lib/products";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface CartLine {
  name: string;
  quantity: number;
  price: number;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
  cart?: CartLine[];
}

const BASE_SYSTEM_PROMPT = `Sen BilardoMarket.com'un Türkçe konuşan satış asistanısın. Adın "BilardoMarket AI".

BilardoMarket bilardo (top, ıstaka, çuha, aksesuar), dart ve oyun (okey, langırt, kart) ürünleri satan profesyonel bir e-ticaret sitesidir. Türkiye'ye kargo yapar — İstanbul 1 iş günü, diğer şehirler 2-4 iş günü. 500 TL üzeri kargo ücretsizdir.

KURALLAR:
- Müşterilere ürün tavsiye ederken aşağıda listelenen GERÇEK ürün adlarını ve fiyatlarını kullan, uydurma.
- Bilmediğin sipariş/hesap konularında "Lütfen iletisim sayfasından bize ulaşın veya info@bilardomarket.com adresine yazın" diye yönlendir.
- Cevapları kısa, samimi ve net tut (2-4 cümle).
- Fiyatları "1.857,75 TL" formatında ver.
- Kullanıcı ürün önerisi isterse 2-3 ürün öner, neden uygun olduğunu kısaca açıkla.`;

function buildCatalogSummary(): string {
  const lines: string[] = ["MEVCUT ÜRÜN KATALOĞU:"];
  const byCat = new Map<string, Product[]>();
  for (const p of products) {
    if (!byCat.has(p.subcategorySlug)) byCat.set(p.subcategorySlug, []);
    byCat.get(p.subcategorySlug)!.push(p);
  }
  const subBySlug = new Map(subcategories.map((s) => [s.slug, s]));

  for (const [slug, list] of byCat) {
    const sub = subBySlug.get(slug);
    if (!sub) continue;
    const top = list.slice(0, 4); // first few products per subcategory
    lines.push(`\n## ${sub.name} (${list.length} ürün)`);
    for (const p of top) {
      const brand = p.brand ? `[${p.brand}] ` : "";
      lines.push(`- ${brand}${p.name} — ${formatPrice(p.price)}`);
    }
    if (list.length > top.length) {
      lines.push(`  ... ve ${list.length - top.length} ürün daha`);
    }
  }
  return lines.join("\n");
}

function buildCartContext(cart: CartLine[] | undefined): string {
  if (!cart || cart.length === 0) {
    return "Kullanıcının sepeti şu anda boş.";
  }
  const lines = cart.map(
    (c) => `- ${c.name} × ${c.quantity} (${formatPrice(c.price)})`,
  );
  const total = cart.reduce((s, c) => s + c.price * c.quantity, 0);
  return `KULLANICININ MEVCUT SEPETİ:\n${lines.join("\n")}\nToplam: ${formatPrice(total)}`;
}

let cachedCatalog: string | null = null;
function getCatalog(): string {
  if (!cachedCatalog) cachedCatalog = buildCatalogSummary();
  return cachedCatalog;
}

export async function POST(request: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Mesaj bulunamadı" }, { status: 400 });
  }

  const systemPrompt = [
    BASE_SYSTEM_PROMPT,
    "",
    getCatalog(),
    "",
    buildCartContext(body.cart),
  ].join("\n");

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return Response.json({
      message:
        "Sohbet servisi henüz yapılandırılmadı. Yöneticinin ANTHROPIC_API_KEY çevre değişkenini ayarlaması gerekiyor. Şimdilik info@bilardomarket.com adresinden bize ulaşabilirsiniz.",
    });
  }

  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: systemPrompt,
        messages: messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("Anthropic API error:", upstream.status, errText);
      return Response.json({
        message:
          "Üzgünüm, şu anda yanıt veremiyorum. Lütfen biraz sonra tekrar deneyin.",
      });
    }

    const data = (await upstream.json()) as {
      content?: Array<{ type: string; text?: string }>;
    };
    const text =
      data.content?.find((c) => c.type === "text")?.text ??
      "Bir cevap üretemedim, lütfen tekrar deneyin.";

    return Response.json({ message: text });
  } catch (err) {
    console.error("Chat handler error:", err);
    return Response.json({
      message:
        "Sohbet servisinde geçici bir sorun var. Lütfen sonra tekrar deneyin.",
    });
  }
}
