import type { Metadata } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BilardoMarket — Profesyonel Bilardo, Dart ve Oyun Kartı Ürünleri",
    template: "%s | BilardoMarket",
  },
  description:
    "Türkiye'nin profesyonel bilardo, dart ve oyun kartları adresi. Aramith, Harrows, Winmau, Bicycle ve daha fazlası. Güvenli ödeme, hızlı kargo.",
  applicationName: "BilardoMarket",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${cormorant.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-coffee">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
