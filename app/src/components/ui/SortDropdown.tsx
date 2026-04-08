import type { SortOption } from "@/lib/catalogue";

interface SortDropdownProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Populärast" },
  { value: "price-asc", label: "Pris lägst först" },
  { value: "price-desc", label: "Pris högst först" },
];

/**
 * Sort dropdown for the phone listing page.
 *
 * Options: Populärast (default), Pris lägst först, Pris högst först.
 *
 * Traces to: FR-105, US-103
 */
export default function SortDropdown({
  activeSort,
  onSortChange,
}: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="phone-sort"
        className="text-sm font-medium text-muted whitespace-nowrap"
      >
        Sortera:
      </label>
      <select
        id="phone-sort"
        aria-label="Sortera telefoner"
        value={activeSort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
