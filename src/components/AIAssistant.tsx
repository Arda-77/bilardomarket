"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_GREETING: Message = {
  role: "assistant",
  content:
    "Merhaba! Ben BilardoMarket AI — bilardo, dart ve oyun ürünlerinde size yardımcı olmak için buradayım. Ne arıyorsunuz?",
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.message ?? "Bir hata oluştu." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Şu anda sohbet servisine ulaşılamıyor. Lütfen daha sonra tekrar deneyin.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="BilardoMarket AI ile sohbet"
          className="fixed bottom-6 right-6 z-50 bg-green hover:bg-green-deep text-ivory rounded-full shadow-2xl px-5 py-4 flex items-center gap-2 font-semibold transition-all hover:scale-105"
        >
          <Sparkles size={20} />
          <span className="hidden sm:inline">BilardoMarket AI</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[min(560px,calc(100vh-6rem))] bg-white rounded-2xl shadow-2xl border border-line flex flex-col overflow-hidden">
          <header className="bg-coffee text-ivory px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-gold" />
              <div>
                <h3 className="font-display text-lg font-semibold leading-tight">
                  BilardoMarket AI
                </h3>
                <p className="text-[11px] text-ivory/60">7/24 Yardım</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sohbeti kapat"
              className="hover:text-gold transition-colors"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ivory-deep/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-green text-ivory rounded-br-sm"
                      : "bg-white text-coffee border border-line rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-line rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-coffee-soft rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-coffee-soft rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-coffee-soft rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-line p-3 bg-white flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Mesajınızı yazın..."
              className="flex-1 px-4 py-2.5 rounded-full bg-ivory-deep text-sm border border-line focus:outline-none focus:border-green"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-green hover:bg-green-deep disabled:bg-coffee-soft text-ivory rounded-full w-11 h-11 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Gönder"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
