import type { PhoneColour } from "@/data/phones";
import { Check } from "lucide-react";

/**
 * Returns relative luminance from a hex colour string.
 * Uses the sRGB luminance formula (WCAG 2.1).
 * Values > 0.5 are considered "light" backgrounds.
 */
function getRelativeLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Returns a contrasting checkmark colour for the given swatch background. */
function getCheckmarkColour(hex: string): string {
  return getRelativeLuminance(hex) > 0.5 ? "#2D2D2D" : "#FFFFFF";
}

interface ColourPickerProps {
  colours: PhoneColour[];
  activeColour: string;
  onColourChange: (colourName: string) => void;
}

/**
 * Colour picker — circular swatches with selected state.
 *
 * Selected swatch: thick border + checkmark overlay.
 * Each swatch has aria-label with the colour name (accessibility).
 *
 * Traces to: FR-203, US-202 AC-1, Drop 2 AC #4, ux.md colour swatch states
 */
export default function ColourPicker({
  colours,
  activeColour,
  onColourChange,
}: ColourPickerProps) {
  if (colours.length <= 1) {
    // Single colour — pre-selected, no interaction needed (US-202 edge case)
    const colour = colours[0];
    if (!colour) return null;
    return (
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted">Färg</span>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full ring-2 ring-primary ring-offset-2"
            style={{ backgroundColor: colour.hex }}
            aria-label={colour.name}
          />
          <span className="text-sm text-dark font-medium">{colour.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted">Färg</span>
      <div className="flex items-center gap-3">
        <div className="flex gap-2">
          {colours.map((colour) => {
            const isActive = colour.name === activeColour;
            return (
              <button
                key={colour.name}
                onClick={() => onColourChange(colour.name)}
                aria-label={colour.name}
                title={colour.name}
                className={`relative w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
                  isActive
                    ? "ring-2 ring-primary ring-offset-2"
                    : "ring-1 ring-gray-300"
                }`}
                style={{ backgroundColor: colour.hex }}
              >
                {isActive && (
                  <Check
                    className="absolute inset-0 m-auto h-4 w-4"
                    style={{
                      color: getCheckmarkColour(colour.hex),
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
        <span className="text-sm text-dark font-medium">{activeColour}</span>
      </div>
    </div>
  );
}
