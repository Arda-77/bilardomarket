"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Geçerli bir e-posta adresi girin");
      return;
    }
    // Persisted client-side until a real backend is wired up.
    try {
      const list = JSON.parse(
        localStorage.getItem("bilardomarket:newsletter") ?? "[]",
      );
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(
          "bilardomarket:newsletter",
          JSON.stringify(list),
        );
      }
    } catch {
      // ignore storage failures
    }
    toast.success("Aboneliğiniz alındı", {
      description: "Yeni ürünlerden ilk siz haberdar olacaksınız.",
    });
    setEmail("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 max-w-md mx-auto"
    >
      <div className="relative flex-1">
        <Mail
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ivory/40"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-posta adresiniz"
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-ivory/10 border border-ivory/20 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold text-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-gold hover:bg-gold-soft text-coffee font-semibold px-5 rounded-lg text-sm transition-colors"
      >
        Abone Ol
      </button>
    </form>
  );
}
