import type { PhoneVariant } from "@/data/phones";

interface StoragePickerProps {
  variants: PhoneVariant[];
  activeStorage: string;
  onStorageChange: (storage: string) => void;
}

/**
 * Storage picker — pill-shaped toggle buttons.
 *
 * Selected pill: filled with brand colour, white text.
 * Unselected pill: outlined, muted text.
 *
 * Traces to: FR-204, US-202 AC-2, Drop 2 AC #5, ux.md storage pill states
 */
export default function StoragePicker({
  variants,
  activeStorage,
  onStorageChange,
}: StoragePickerProps) {
  if (variants.length <= 1) {
    // Single storage — pre-selected, no interaction (US-202 edge case)
    const v = variants[0];
    if (!v) return null;
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">Lagring</span>
        <div>
          <span className="inline-block rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
            {v.storage}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">Lagring</span>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = v.storage === activeStorage;
          return (
            <button
              key={v.storage}
              onClick={() => onStorageChange(v.storage)}
              aria-label={`${v.storage} lagring`}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                isActive
                  ? "bg-primary text-white"
                  : "bg-white text-muted ring-1 ring-gray-200 hover:bg-gray-50"
              }`}
            >
              {v.storage}
            </button>
          );
        })}
      </div>
    </div>
  );
}
