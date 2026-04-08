/**
 * Catalogue query utilities — filtering, sorting, and pricing
 *
 * Traces to: BR-401, BR-402, BR-403, BR-102, FR-104, FR-105, FR-107
 */

import type { Phone, PhoneBrand } from "@/data/phones";

// ---------------------------------------------------------------------------
// Lookup — US-201, Drop 2
// ---------------------------------------------------------------------------

/**
 * Find a phone by its URL slug. Returns undefined if not found.
 */
export function findBySlug(
  allPhones: Phone[],
  slug: string
): Phone | undefined {
  return allPhones.find((phone) => phone.slug === slug);
}

// ---------------------------------------------------------------------------
// Filtering — BR-401, FR-107
// ---------------------------------------------------------------------------

/**
 * Returns only phones that should be shown on the listing page:
 *   - status === "active"
 *   - AND has at least one storage variant (BR-401)
 */
export function getActivePhones(allPhones: Phone[]): Phone[] {
  return allPhones.filter(
    (phone) => phone.status === "active" && phone.variants.length > 0
  );
}

/**
 * Filters phones by brand. "Alla" returns all — FR-104.
 */
export function filterByBrand(
  phones: Phone[],
  brand: "Alla" | PhoneBrand
): Phone[] {
  if (brand === "Alla") return phones;
  return phones.filter((phone) => phone.brand === brand);
}

// ---------------------------------------------------------------------------
// Sorting — FR-105, BR-403
// ---------------------------------------------------------------------------

export type SortOption = "popularity" | "price-asc" | "price-desc";

/**
 * Returns the starting (cheapest) monthly instalment for a phone — BR-102.
 */
export function getStartingPrice(phone: Phone): number {
  if (phone.variants.length === 0) return 0;
  return Math.min(...phone.variants.map((v) => v.instalmentPrice));
}

/**
 * Sorts phones by the selected option.
 *
 * - "popularity" → sortOrder ascending, ties broken alphabetically (BR-403)
 * - "price-asc"  → cheapest instalment first, ties broken by sortOrder
 * - "price-desc" → most expensive instalment first, ties broken by sortOrder
 */
export function sortPhones(phones: Phone[], sort: SortOption): Phone[] {
  const copy = [...phones];

  switch (sort) {
    case "popularity":
      return copy.sort(
        (a, b) =>
          a.sortOrder - b.sortOrder ||
          a.name.localeCompare(b.name, "sv")
      );

    case "price-asc":
      return copy.sort(
        (a, b) =>
          getStartingPrice(a) - getStartingPrice(b) ||
          a.sortOrder - b.sortOrder
      );

    case "price-desc":
      return copy.sort(
        (a, b) =>
          getStartingPrice(b) - getStartingPrice(a) ||
          a.sortOrder - b.sortOrder
      );

    default:
      return copy;
  }
}

/**
 * Returns the lowest instalment price across all provided phones.
 * Used for the hero subtitle "betala från XXX kr/mån" — US-001 AC-4.
 */
export function getLowestInstalmentPrice(phones: Phone[]): number {
  if (phones.length === 0) return 0;
  return Math.min(...phones.map(getStartingPrice));
}
