import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import PhoneDetail from "@/components/sections/PhoneDetail";
import SpecsTable from "@/components/ui/SpecsTable";
import Container from "@/components/ui/Container";
import Footer from "@/components/sections/Footer";
import { phones } from "@/data/phones";
import { plans } from "@/data/plans";
import { findBySlug, getActivePhones } from "@/lib/catalogue";

interface PhonePageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all active phone slugs at build time.
 */
export async function generateStaticParams() {
  const active = getActivePhones(phones);
  return active.map((phone) => ({ slug: phone.slug }));
}

/**
 * Dynamic metadata per phone model.
 */
export async function generateMetadata({
  params,
}: PhonePageProps): Promise<Metadata> {
  const { slug } = await params;
  const phone = findBySlug(phones, slug);

  if (!phone) {
    return { title: "Telefon hittades inte – Vimla" };
  }

  return {
    title: `${phone.name} – Köp med Vimla`,
    description: `Köp ${phone.name} med 36 månaders delbetalning från ${Math.min(...phone.variants.map((v) => v.instalmentPrice))} kr/mån. Bundla med ett Vimla-abonnemang.`,
  };
}

/**
 * Phone detail page — `/phones/<phone-slug>`
 *
 * Renders the full product page: gallery, colour/storage pickers,
 * price box, specs table, and CTA.
 *
 * Returns 404 for invalid slugs or inactive models (US-201 edge case).
 *
 * Traces to: FR-201, US-201, Drop 2
 */
export default async function PhonePage({ params }: PhonePageProps) {
  const { slug } = await params;
  const phone = findBySlug(phones, slug);

  // Invalid or inactive slug → 404 (US-201 edge case)
  if (!phone || phone.status !== "active") {
    notFound();
  }

  // Cheapest plan price for the "abonnemang fr. X kr/mån" line — FR-205
  const cheapestPlanPrice = Math.min(...plans.map((p) => p.price));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <Container>
            <PhoneDetail phone={phone} cheapestPlanPrice={cheapestPlanPrice} />
            <SpecsTable specs={phone.specs} />
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
