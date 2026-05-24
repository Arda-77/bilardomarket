import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchClient from "./search-client";

export const metadata = {
  title: "Arama",
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-6xl px-6 py-12">
          <h1 className="text-4xl font-bold text-coffee mb-6">Arama</h1>
          <Suspense
            fallback={
              <div className="text-coffee-soft">Yükleniyor...</div>
            }
          >
            <SearchClient />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
