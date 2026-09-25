import { Header } from "@/components/site/Header";
import { OfficialLinkBar } from "@/components/site/OfficialLinkBar";
import { Hero } from "@/components/site/Hero";
import { IdentificationGuide } from "@/components/site/IdentificationGuide";
import { SightingForm } from "@/components/site/SightingForm";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <Header />
      <OfficialLinkBar />
      <main className="flex-1">
        <Hero />
        <IdentificationGuide />
        <SightingForm />
      </main>
      <Footer />
    </div>
  );
}
