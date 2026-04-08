/**
 * Instalment pricing utilities — BR-101, BR-102, BR-103
 *
 * All financial calculations are defined here so they remain
 * authoritative and testable in one place.
 */

/** Instalment period in months — fixed at 36 for Phase 1 (BR-301) */
export const INSTALMENT_MONTHS = 36;

/**
 * Calculate monthly instalment for a given retail price.
 * Always rounds UP to nearest whole SEK (BR-101).
 */
export function calculateInstalment(retailPrice: number): number {
  return Math.ceil(retailPrice / INSTALMENT_MONTHS);
}

/**
 * Calculate total device cost from the monthly instalment.
 * Total = instalment × 36 (BR-103).
 */
export function calculateTotalCost(instalmentPrice: number): number {
  return instalmentPrice * INSTALMENT_MONTHS;
}
