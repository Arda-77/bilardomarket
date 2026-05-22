import type { NextRequest } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `Sen BilardoMarket.com'un Türkçe konuşan yardımcı satış asistanısın. Adın "BilardoMarket AI".
BilardoMarket bilardo, dart ve oyun (okey, langırt, kart oyunları) ürünleri satan profesyonel bir e-ticaret sitesidir.
Müşterilere ürün tavsiyesi ver, kategorilerden bahset, kibarca yönlendir.
Bilmediğin şirket içi konularda (sipariş durumu, kargo detayı vb.) müşteri hizmetlerine yönlendir.
Cevaplarını kısa ve net tut.`;

export async function POST(request: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Mesaj bulunamadı" }, { status: 400 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    // Graceful fallback while API key is not configured yet.
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
        system: SYSTEM_PROMPT,
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
