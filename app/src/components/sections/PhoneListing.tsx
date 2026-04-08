"use client";

import { useState } from "react";
import type { Phone, PhoneBrand } from "@/data/phones";
import { filterByBrand, sortPhones, type SortOption } from "@/lib/catalogue";
import Container from "@/components/ui/Container";
import PhoneCard from "@/components/ui/PhoneCard";
import BrandFilter from "@/components/ui/BrandFilter";
import SortDropdown from "@/components/ui/SortDropdown";

type BrandOption = "Alla" | PhoneBrand;

interface PhoneListingProps {
  phones: Phone[];
}

/**
 * Client component for the phone listing: filter, sort, and grid.
 *
 * State:
 * - brand: "Alla" | "iPhone" | "Samsung" — default "Alla"
 * - sort: "popularity" | "price-asc" | "price-desc" — default "popularity"
 *
 * Traces to: US-101, US-102, US-103, FR-104, FR-105, FR-106
 */
export default function PhoneListing({ phones }: PhoneListingProps) {
  const [brand, setBrand] = useState<BrandOption>("Alla");
  const [sort, setSort] = useState<SortOption>("popularity");

  const filtered = filterByBrand(phones, brand);
  const sorted = sortPhones(filtered, sort);

  return (
    <section className="py-12 md:py-20 bg-white">
      <Container>
        {/* Filter + Sort toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <BrandFilter activeBrand={brand} onBrandChange={setBrand} />
          <SortDropdown activeSort={sort} onSortChange={setSort} />
        </div>

        {/* Phone grid or empty state */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {sorted.map((phone) => (
              <PhoneCard key={phone.slug} phone={phone} />
            ))}
          </div>
        ) : phones.length === 0 ? (
          /* Empty catalogue — US-001 edge case, US-101 edge case */
          <div className="text-center py-20">
            <p className="text-lg text-muted">
              Inga telefoner tillgängliga just nu
            </p>
          </div>
        ) : (
          /* Empty filter result — FR-106, US-102 AC-3 */
          <div className="text-center py-20">
            <p className="text-lg text-muted">
              Inga telefoner matchar ditt filter
            </p>
            <button
              onClick={() => setBrand("Alla")}
              className="mt-4 text-primary font-semibold hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"
            >
              Visa alla telefoner
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
