import { describe, it, expect } from "vitest";
import type { Phone } from "@/data/phones";
import {
  findBySlug,
  getActivePhones,
  filterByBrand,
  sortPhones,
  getStartingPrice,
  getLowestInstalmentPrice,
} from "./catalogue";

// ---------------------------------------------------------------------------
// Test fixtures — minimal Phone objects for unit tests
// ---------------------------------------------------------------------------

function makePhone(overrides: Partial<Phone> = {}): Phone {
  return {
    slug: "test-phone",
    name: "Test Phone",
    brand: "iPhone",
    status: "active",
    sortOrder: 1,
    imageUrl: "/phones/test.svg",
    colours: [{ name: "Svart", hex: "#000000", imageUrl: "/phones/test.svg" }],
    variants: [
      { storage: "128 GB", retailPrice: 10800, instalmentPrice: 300, totalCost: 10800 },
    ],
    specs: { Skärm: "6.1\"" },
    ...overrides,
  };
}

const iphone1 = makePhone({
  slug: "iphone-a",
  name: "iPhone A",
  brand: "iPhone",
  sortOrder: 1,
  variants: [
    { storage: "128 GB", retailPrice: 10800, instalmentPrice: 300, totalCost: 10800 },
    { storage: "256 GB", retailPrice: 14400, instalmentPrice: 400, totalCost: 14400 },
  ],
});

const iphone2 = makePhone({
  slug: "iphone-b",
  name: "iPhone B",
  brand: "iPhone",
  sortOrder: 3,
  variants: [
    { storage: "128 GB", retailPrice: 7200, instalmentPrice: 200, totalCost: 7200 },
  ],
});

const samsung1 = makePhone({
  slug: "samsung-a",
  name: "Samsung A",
  brand: "Samsung",
  sortOrder: 2,
  variants: [
    { storage: "256 GB", retailPrice: 14400, instalmentPrice: 400, totalCost: 14400 },
  ],
});

const inactivePhone = makePhone({
  slug: "inactive",
  name: "Inactive",
  status: "inactive",
});

const outOfStockPhone = makePhone({
  slug: "oos",
  name: "Out of Stock",
  status: "out-of-stock",
});

const noVariantsPhone = makePhone({
  slug: "no-variants",
  name: "No Variants",
  status: "active",
  variants: [],
});

const allPhones = [iphone1, iphone2, samsung1, inactivePhone, outOfStockPhone, noVariantsPhone];

// ---------------------------------------------------------------------------
// findBySlug — US-201
// ---------------------------------------------------------------------------

describe("findBySlug", () => {
  it("returns the phone matching the slug", () => {
    expect(findBySlug(allPhones, "iphone-a")).toBe(iphone1);
  });

  it("returns undefined for an unknown slug", () => {
    expect(findBySlug(allPhones, "nonexistent")).toBeUndefined();
  });

  it("returns undefined for an empty array", () => {
    expect(findBySlug([], "iphone-a")).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// getActivePhones — BR-401, FR-107
// ---------------------------------------------------------------------------

describe("getActivePhones", () => {
  it("returns only active phones with ≥ 1 variant", () => {
    const result = getActivePhones(allPhones);
    expect(result).toHaveLength(3); // iphone1, iphone2, samsung1
    expect(result.every((p) => p.status === "active")).toBe(true);
    expect(result.every((p) => p.variants.length > 0)).toBe(true);
  });

  it("excludes inactive phones", () => {
    const result = getActivePhones(allPhones);
    expect(result.find((p) => p.slug === "inactive")).toBeUndefined();
  });

  it("excludes out-of-stock phones", () => {
    const result = getActivePhones(allPhones);
    expect(result.find((p) => p.slug === "oos")).toBeUndefined();
  });

  it("excludes active phones with zero variants (BR-401)", () => {
    const result = getActivePhones(allPhones);
    expect(result.find((p) => p.slug === "no-variants")).toBeUndefined();
  });

  it("returns empty array for empty input", () => {
    expect(getActivePhones([])).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// filterByBrand — FR-104
// ---------------------------------------------------------------------------

describe("filterByBrand", () => {
  const active = [iphone1, iphone2, samsung1];

  it("returns all phones when brand is 'Alla'", () => {
    expect(filterByBrand(active, "Alla")).toEqual(active);
  });

  it("returns only iPhones when brand is 'iPhone'", () => {
    const result = filterByBrand(active, "iPhone");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.brand === "iPhone")).toBe(true);
  });

  it("returns only Samsung when brand is 'Samsung'", () => {
    const result = filterByBrand(active, "Samsung");
    expect(result).toHaveLength(1);
    expect(result[0].brand).toBe("Samsung");
  });

  it("returns empty array when no phones match the brand", () => {
    expect(filterByBrand([iphone1], "Samsung")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getStartingPrice — BR-102
// ---------------------------------------------------------------------------

describe("getStartingPrice", () => {
  it("returns the cheapest instalment price across variants", () => {
    // iphone1 has 300 and 400 → starting price = 300
    expect(getStartingPrice(iphone1)).toBe(300);
  });

  it("returns the only price when there is one variant", () => {
    expect(getStartingPrice(samsung1)).toBe(400);
  });

  it("returns 0 for a phone with no variants", () => {
    expect(getStartingPrice(noVariantsPhone)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// sortPhones — FR-105, BR-403
// ---------------------------------------------------------------------------

describe("sortPhones", () => {
  const phones = [samsung1, iphone2, iphone1]; // deliberately unsorted

  it("sorts by sortOrder ascending for 'popularity' (BR-403)", () => {
    const result = sortPhones(phones, "popularity");
    expect(result.map((p) => p.slug)).toEqual([
      "iphone-a",   // sortOrder 1
      "samsung-a",  // sortOrder 2
      "iphone-b",   // sortOrder 3
    ]);
  });

  it("sorts by cheapest instalment first for 'price-asc'", () => {
    const result = sortPhones(phones, "price-asc");
    expect(result.map((p) => p.slug)).toEqual([
      "iphone-b",   // 200 kr/mån
      "iphone-a",   // 300 kr/mån
      "samsung-a",  // 400 kr/mån
    ]);
  });

  it("sorts by most expensive instalment first for 'price-desc'", () => {
    const result = sortPhones(phones, "price-desc");
    expect(result.map((p) => p.slug)).toEqual([
      "samsung-a",  // 400 kr/mån
      "iphone-a",   // 300 kr/mån
      "iphone-b",   // 200 kr/mån
    ]);
  });

  it("uses sortOrder as tiebreaker when prices are equal", () => {
    const phoneA = makePhone({ slug: "a", sortOrder: 5, variants: [{ storage: "128 GB", retailPrice: 10800, instalmentPrice: 300, totalCost: 10800 }] });
    const phoneB = makePhone({ slug: "b", sortOrder: 1, variants: [{ storage: "128 GB", retailPrice: 10800, instalmentPrice: 300, totalCost: 10800 }] });
    const result = sortPhones([phoneA, phoneB], "price-asc");
    expect(result[0].slug).toBe("b"); // lower sortOrder wins
  });

  it("uses alphabetical name as tiebreaker for same sortOrder in popularity", () => {
    const phoneA = makePhone({ slug: "a", name: "Zebra", sortOrder: 1 });
    const phoneB = makePhone({ slug: "b", name: "Alpha", sortOrder: 1 });
    const result = sortPhones([phoneA, phoneB], "popularity");
    expect(result[0].name).toBe("Alpha");
  });

  it("does not mutate the original array", () => {
    const original = [samsung1, iphone1];
    sortPhones(original, "popularity");
    expect(original[0]).toBe(samsung1); // unchanged
  });

  it("returns empty array for empty input", () => {
    expect(sortPhones([], "popularity")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getLowestInstalmentPrice — US-001 AC-4
// ---------------------------------------------------------------------------

describe("getLowestInstalmentPrice", () => {
  it("returns the lowest starting price across all phones", () => {
    // iphone-b has 200, iphone-a has 300, samsung-a has 400
    expect(getLowestInstalmentPrice([iphone1, iphone2, samsung1])).toBe(200);
  });

  it("returns 0 for empty array", () => {
    expect(getLowestInstalmentPrice([])).toBe(0);
  });

  it("handles a single phone", () => {
    expect(getLowestInstalmentPrice([samsung1])).toBe(400);
  });
});
