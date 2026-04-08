import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/sections/Navbar";
import PhoneHero from "@/components/sections/PhoneHero";
import PhoneListing from "@/components/sections/PhoneListing";
import Footer from "@/components/sections/Footer";
import { phones } from "@/data/phones";
import { getActivePhones, getLowestInstalmentPrice } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Telefoner – Köp mobil med Vimla",
  description:
    "Köp de senaste iPhone- och Samsung-telefonerna med 36 månaders delbetalning. Vimla erbjuder enkla mobilabonnemang bundlade med nya telefoner.",
};

/**
 * Phone listing page — `/phones`
 *
 * Composes: Navbar, PhoneHero, PhoneListing (client), Footer.
 * Data loaded server-side from the catalogue.
 *
 * Traces to: FR-001, FR-101, US-001, US-101, Drop 1
 */
export default function PhonesPage() {
  const activePhones = getActivePhones(phones);
  const lowestPrice = getLowestInstalmentPrice(activePhones);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PhoneHero lowestPrice={lowestPrice} />
        <Suspense>
          <PhoneListing phones={activePhones} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
