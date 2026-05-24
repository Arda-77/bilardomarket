import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PageLayout({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-ivory">
        <div className="container mx-auto max-w-3xl px-6 py-12">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                Yardım
              </span>
            </div>
            <h1 className="text-5xl font-bold text-coffee mb-3">{title}</h1>
            {intro && <p className="text-coffee-soft text-lg">{intro}</p>}
          </div>
          <div className="prose-content text-coffee leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
