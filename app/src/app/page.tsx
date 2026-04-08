import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import PlanCards from "@/components/sections/PlanCards";
import USPSection from "@/components/sections/USPSection";
import HowItWorks from "@/components/sections/HowItWorks";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PlanCards />
        <USPSection />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
