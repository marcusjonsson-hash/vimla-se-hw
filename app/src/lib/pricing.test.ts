import { describe, it, expect } from "vitest";
import {
  INSTALMENT_MONTHS,
  calculateCombinedMonthly,
  calculateInstalment,
  calculateTotalCost,
} from "./pricing";

// ---------------------------------------------------------------------------
// BR-101: Monthly instalment = device retail price ÷ 36, rounded up
// ---------------------------------------------------------------------------

describe("calculateInstalment", () => {
  it("divides evenly → no rounding needed", () => {
    // 10 800 / 36 = 300 exactly
    expect(calculateInstalment(10800)).toBe(300);
  });

  it("rounds UP to nearest whole SEK when remainder exists (BR-101)", () => {
    // 10 788 / 36 = 299.666… → 300
    expect(calculateInstalment(10788)).toBe(300);
  });

  it("rounds UP even for tiny remainder", () => {
    // 10 801 / 36 = 300.027… → 301
    expect(calculateInstalment(10801)).toBe(301);
  });

  it("returns 0 for a zero retail price", () => {
    expect(calculateInstalment(0)).toBe(0);
  });

  it("handles large prices correctly", () => {
    // 23 988 / 36 = 666.333… → 667
    expect(calculateInstalment(23988)).toBe(667);
  });
});

// ---------------------------------------------------------------------------
// BR-103: Total device cost = instalment × 36
// ---------------------------------------------------------------------------

describe("calculateTotalCost", () => {
  it("multiplies instalment by 36 months", () => {
    expect(calculateTotalCost(300)).toBe(10800);
  });

  it("returns 0 for a zero instalment", () => {
    expect(calculateTotalCost(0)).toBe(0);
  });

  it("handles a rounded-up instalment (total > retail price)", () => {
    // Instalment for 10 788 kr retail = 300 kr → total = 10 800 kr (> 10 788)
    const instalment = calculateInstalment(10788);
    const total = calculateTotalCost(instalment);
    expect(total).toBe(10800);
    expect(total).toBeGreaterThanOrEqual(10788);
  });
});

// ---------------------------------------------------------------------------
// INSTALMENT_MONTHS constant
// ---------------------------------------------------------------------------

describe("INSTALMENT_MONTHS", () => {
  it("is fixed at 36 for Phase 1 (BR-301)", () => {
    expect(INSTALMENT_MONTHS).toBe(36);
  });
});

describe("calculateCombinedMonthly", () => {
  it("adds instalment and subscription (BR-104)", () => {
    expect(calculateCombinedMonthly(399, 149)).toBe(548);
  });

  it("supports zero subscription", () => {
    expect(calculateCombinedMonthly(399, 0)).toBe(399);
  });
});
