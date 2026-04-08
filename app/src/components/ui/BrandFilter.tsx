import type { PhoneBrand } from "@/data/phones";

type BrandOption = "Alla" | PhoneBrand;

interface BrandFilterProps {
  activeBrand: BrandOption;
  onBrandChange: (brand: BrandOption) => void;
}

const brands: BrandOption[] = ["Alla", "iPhone", "Samsung"];

/**
 * Brand filter tabs — Alla / iPhone / Samsung.
 *
 * Active tab: filled with brand colour, white text.
 * Inactive tab: outlined pill, muted text.
 * Keyboard accessible via Tab + Enter/Space.
 *
 * Traces to: FR-104, FR-106, US-102, ux.md brand filter tab states
 */
export default function BrandFilter({
  activeBrand,
  onBrandChange,
}: BrandFilterProps) {
  return (
    <div role="tablist" aria-label="Filtrera efter märke" className="flex gap-2">
      {brands.map((brand) => {
        const isActive = activeBrand === brand;
        return (
          <button
            key={brand}
            role="tab"
            aria-selected={isActive}
            onClick={() => onBrandChange(brand)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              isActive
                ? "bg-primary text-white"
                : "bg-white text-muted ring-1 ring-gray-200 hover:bg-gray-50"
            }`}
          >
            {brand}
          </button>
        );
      })}
    </div>
  );
}
