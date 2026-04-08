"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { Phone, PhoneBrand } from "@/data/phones";
import { filterByBrand, sortPhones, type SortOption } from "@/lib/catalogue";
import Container from "@/components/ui/Container";
import PhoneCard from "@/components/ui/PhoneCard";
import BrandFilter from "@/components/ui/BrandFilter";
import SortDropdown from "@/components/ui/SortDropdown";

type BrandOption = "Alla" | PhoneBrand;

const VALID_BRANDS: BrandOption[] = ["Alla", "iPhone", "Samsung"];
const VALID_SORTS: SortOption[] = ["popularity", "price-asc", "price-desc"];

interface PhoneListingProps {
  phones: Phone[];
}

/**
 * Client component for the phone listing: filter, sort, and grid.
 *
 * Filter/sort state is synced to URL search params (?brand=…&sort=…)
 * so that back-button navigation and back-links from the detail page
 * preserve the visitor's selections.
 *
 * Traces to: US-101, US-102, US-103, US-203, FR-104, FR-105, FR-106, FR-207
 */
export default function PhoneListing({ phones }: PhoneListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read state from URL, falling back to defaults
  const brandParam = searchParams.get("brand");
  const sortParam = searchParams.get("sort");

  const brand: BrandOption = VALID_BRANDS.includes(brandParam as BrandOption)
    ? (brandParam as BrandOption)
    : "Alla";
  const sort: SortOption = VALID_SORTS.includes(sortParam as SortOption)
    ? (sortParam as SortOption)
    : "popularity";

  // Update URL search params without scroll reset
  const updateParams = useCallback(
    (key: string, value: string, defaultValue: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === defaultValue) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      const qs = params.toString();
      router.replace(`/phones${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router]
  );

  const setBrand = useCallback(
    (b: BrandOption) => updateParams("brand", b, "Alla"),
    [updateParams]
  );

  const setSort = useCallback(
    (s: SortOption) => updateParams("sort", s, "popularity"),
    [updateParams]
  );

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
