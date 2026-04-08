/**
 * Phone catalogue data — Vimla Hardware Sales
 *
 * Typed data arrays for the phone webshop. Follows the
 * project convention of data-driven sections (data/ feeds components).
 *
 * Interfaces defined here serve as the contract that a future
 * headless CMS schema must satisfy.
 *
 * Traces to: FR-101, FR-102, FR-104, FR-107, BR-101, BR-102, BR-401, BR-403
 */

import { calculateInstalment, calculateTotalCost } from "@/lib/pricing";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** A single storage variant with its own price — FR-204, BR-101 */
export interface PhoneVariant {
  storage: string;
  retailPrice: number;
  instalmentPrice: number; // ceil(retailPrice / 36) — BR-101
  totalCost: number; // instalmentPrice × 36 — BR-103
}

/** A colour option for a phone model — FR-203, FR-202 */
export interface PhoneColour {
  name: string;
  hex: string;
  /** Primary image — used on listing card + gallery hero */
  imageUrl: string;
  /** Additional angles for the image gallery (front, back, side, etc.) — FR-202 */
  gallery?: string[];
}

/** Catalogue status — BR-401, FR-107, FR-602 */
export type PhoneStatus = "active" | "out-of-stock" | "inactive";

/** Brand identifier — FR-104 */
export type PhoneBrand = "iPhone" | "Samsung";

/** A phone model in the catalogue */
export interface Phone {
  slug: string;
  name: string;
  brand: PhoneBrand;
  status: PhoneStatus;
  sortOrder: number; // "Populärast" order — BR-403 (lower = first)
  imageUrl: string;
  colours: PhoneColour[];
  variants: PhoneVariant[];
  specs: Record<string, string>; // Used in Drop 2 detail page
}

// ---------------------------------------------------------------------------
// Helper to build a variant with auto-calculated instalment — BR-101
// ---------------------------------------------------------------------------

function variant(storage: string, retailPrice: number): PhoneVariant {
  const instalmentPrice = calculateInstalment(retailPrice);
  return {
    storage,
    retailPrice,
    instalmentPrice,
    totalCost: calculateTotalCost(instalmentPrice),
  };
}

// ---------------------------------------------------------------------------
// Seed data — ≥ 3 iPhone + ≥ 3 Samsung models
// ---------------------------------------------------------------------------

export const phones: Phone[] = [
  // ── iPhone ────────────────────────────────────────────────────────────
  {
    slug: "iphone-17-pro",
    name: "iPhone 17 Pro",
    brand: "iPhone",
    status: "active",
    sortOrder: 1,
    imageUrl: "/phones/iphone-17-pro/titan-natur-front.svg",
    colours: [
      {
        name: "Titan Natur", hex: "#8B7355",
        imageUrl: "/phones/iphone-17-pro/titan-natur-front.svg",
        gallery: [
          "/phones/iphone-17-pro/titan-natur-front.svg",
          "/phones/iphone-17-pro/titan-natur-back.svg",
          "/phones/iphone-17-pro/titan-natur-side.svg",
        ],
      },
      {
        name: "Titan Blå", hex: "#4A6FA5",
        imageUrl: "/phones/iphone-17-pro/titan-bla-front.svg",
        gallery: [
          "/phones/iphone-17-pro/titan-bla-front.svg",
          "/phones/iphone-17-pro/titan-bla-back.svg",
          "/phones/iphone-17-pro/titan-bla-side.svg",
        ],
      },
      {
        name: "Titan Svart", hex: "#2D2D2D",
        imageUrl: "/phones/iphone-17-pro/titan-svart-front.svg",
        gallery: [
          "/phones/iphone-17-pro/titan-svart-front.svg",
          "/phones/iphone-17-pro/titan-svart-back.svg",
          "/phones/iphone-17-pro/titan-svart-side.svg",
        ],
      },
      {
        name: "Titan Vit", hex: "#F5F5F0",
        imageUrl: "/phones/iphone-17-pro/titan-vit-front.svg",
        gallery: [
          "/phones/iphone-17-pro/titan-vit-front.svg",
          "/phones/iphone-17-pro/titan-vit-back.svg",
          "/phones/iphone-17-pro/titan-vit-side.svg",
        ],
      },
    ],
    variants: [
      variant("128 GB", 14388),
      variant("256 GB", 15588),
      variant("512 GB", 18588),
      variant("1 TB", 21588),
    ],
    specs: {
      Skärm: "6.3\" Super Retina XDR, 120 Hz",
      Chip: "A19 Pro",
      Kamera: "48 MP + 12 MP + 12 MP",
      Batteri: "Upp till 23 tim video",
      "5G": "Ja",
    },
  },
  {
    slug: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    brand: "iPhone",
    status: "active",
    sortOrder: 2,
    imageUrl: "/phones/iphone-17-pro-max/titan-natur-front.svg",
    colours: [
      {
        name: "Titan Natur", hex: "#8B7355",
        imageUrl: "/phones/iphone-17-pro-max/titan-natur-front.svg",
        gallery: [
          "/phones/iphone-17-pro-max/titan-natur-front.svg",
          "/phones/iphone-17-pro-max/titan-natur-back.svg",
          "/phones/iphone-17-pro-max/titan-natur-side.svg",
        ],
      },
      {
        name: "Titan Blå", hex: "#4A6FA5",
        imageUrl: "/phones/iphone-17-pro-max/titan-bla-front.svg",
        gallery: [
          "/phones/iphone-17-pro-max/titan-bla-front.svg",
          "/phones/iphone-17-pro-max/titan-bla-back.svg",
          "/phones/iphone-17-pro-max/titan-bla-side.svg",
        ],
      },
      {
        name: "Titan Svart", hex: "#2D2D2D",
        imageUrl: "/phones/iphone-17-pro-max/titan-svart-front.svg",
        gallery: [
          "/phones/iphone-17-pro-max/titan-svart-front.svg",
          "/phones/iphone-17-pro-max/titan-svart-back.svg",
          "/phones/iphone-17-pro-max/titan-svart-side.svg",
        ],
      },
      {
        name: "Titan Vit", hex: "#F5F5F0",
        imageUrl: "/phones/iphone-17-pro-max/titan-vit-front.svg",
        gallery: [
          "/phones/iphone-17-pro-max/titan-vit-front.svg",
          "/phones/iphone-17-pro-max/titan-vit-back.svg",
          "/phones/iphone-17-pro-max/titan-vit-side.svg",
        ],
      },
    ],
    variants: [
      variant("256 GB", 17988),
      variant("512 GB", 20988),
      variant("1 TB", 23988),
    ],
    specs: {
      Skärm: "6.9\" Super Retina XDR, 120 Hz",
      Chip: "A19 Pro",
      Kamera: "48 MP + 48 MP + 12 MP",
      Batteri: "Upp till 29 tim video",
      "5G": "Ja",
    },
  },
  {
    slug: "iphone-17",
    name: "iPhone 17",
    brand: "iPhone",
    status: "active",
    sortOrder: 3,
    imageUrl: "/phones/iphone-17/svart-front.svg",
    colours: [
      {
        name: "Svart", hex: "#1C1C1E",
        imageUrl: "/phones/iphone-17/svart-front.svg",
        gallery: [
          "/phones/iphone-17/svart-front.svg",
          "/phones/iphone-17/svart-back.svg",
          "/phones/iphone-17/svart-side.svg",
        ],
      },
      {
        name: "Vit", hex: "#F5F5F0",
        imageUrl: "/phones/iphone-17/vit-front.svg",
        gallery: [
          "/phones/iphone-17/vit-front.svg",
          "/phones/iphone-17/vit-back.svg",
          "/phones/iphone-17/vit-side.svg",
        ],
      },
      {
        name: "Blå", hex: "#6EA4D4",
        imageUrl: "/phones/iphone-17/bla-front.svg",
        gallery: [
          "/phones/iphone-17/bla-front.svg",
          "/phones/iphone-17/bla-back.svg",
          "/phones/iphone-17/bla-side.svg",
        ],
      },
      {
        name: "Grön", hex: "#4D8B55",
        imageUrl: "/phones/iphone-17/gron-front.svg",
        gallery: [
          "/phones/iphone-17/gron-front.svg",
          "/phones/iphone-17/gron-back.svg",
          "/phones/iphone-17/gron-side.svg",
        ],
      },
    ],
    variants: [
      variant("128 GB", 10788),
      variant("256 GB", 11988),
      variant("512 GB", 14988),
    ],
    specs: {
      Skärm: "6.1\" Super Retina XDR, 60 Hz",
      Chip: "A19",
      Kamera: "48 MP + 12 MP",
      Batteri: "Upp till 20 tim video",
      "5G": "Ja",
    },
  },

  // ── Samsung ───────────────────────────────────────────────────────────
  {
    slug: "samsung-galaxy-s26-ultra",
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    status: "active",
    sortOrder: 4,
    imageUrl: "/phones/samsung-galaxy-s26-ultra/titan-svart-front.svg",
    colours: [
      {
        name: "Titan Svart", hex: "#2D2D2D",
        imageUrl: "/phones/samsung-galaxy-s26-ultra/titan-svart-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-ultra/titan-svart-front.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-svart-back.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-svart-side.svg",
        ],
      },
      {
        name: "Titan Grå", hex: "#8A8D8F",
        imageUrl: "/phones/samsung-galaxy-s26-ultra/titan-gra-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-ultra/titan-gra-front.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-gra-back.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-gra-side.svg",
        ],
      },
      {
        name: "Titan Blå", hex: "#3B5998",
        imageUrl: "/phones/samsung-galaxy-s26-ultra/titan-bla-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-ultra/titan-bla-front.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-bla-back.svg",
          "/phones/samsung-galaxy-s26-ultra/titan-bla-side.svg",
        ],
      },
    ],
    variants: [
      variant("256 GB", 16188),
      variant("512 GB", 18588),
      variant("1 TB", 21588),
    ],
    specs: {
      Skärm: "6.9\" Dynamic AMOLED 2X, 120 Hz",
      Chip: "Snapdragon 8 Elite",
      Kamera: "200 MP + 50 MP + 12 MP + 10 MP",
      Batteri: "5 000 mAh",
      "5G": "Ja",
    },
  },
  {
    slug: "samsung-galaxy-s26",
    name: "Samsung Galaxy S26",
    brand: "Samsung",
    status: "active",
    sortOrder: 5,
    imageUrl: "/phones/samsung-galaxy-s26/svart-front.svg",
    colours: [
      {
        name: "Svart", hex: "#1C1C1E",
        imageUrl: "/phones/samsung-galaxy-s26/svart-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26/svart-front.svg",
          "/phones/samsung-galaxy-s26/svart-back.svg",
          "/phones/samsung-galaxy-s26/svart-side.svg",
        ],
      },
      {
        name: "Grön", hex: "#4A7C59",
        imageUrl: "/phones/samsung-galaxy-s26/gron-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26/gron-front.svg",
          "/phones/samsung-galaxy-s26/gron-back.svg",
          "/phones/samsung-galaxy-s26/gron-side.svg",
        ],
      },
      {
        name: "Lila", hex: "#7B6D8D",
        imageUrl: "/phones/samsung-galaxy-s26/lila-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26/lila-front.svg",
          "/phones/samsung-galaxy-s26/lila-back.svg",
          "/phones/samsung-galaxy-s26/lila-side.svg",
        ],
      },
    ],
    variants: [
      variant("128 GB", 11988),
      variant("256 GB", 13188),
    ],
    specs: {
      Skärm: "6.2\" Dynamic AMOLED 2X, 120 Hz",
      Chip: "Exynos 2600",
      Kamera: "50 MP + 12 MP + 10 MP",
      Batteri: "4 000 mAh",
      "5G": "Ja",
    },
  },
  {
    slug: "samsung-galaxy-s26-plus",
    name: "Samsung Galaxy S26+",
    brand: "Samsung",
    status: "active",
    sortOrder: 6,
    imageUrl: "/phones/samsung-galaxy-s26-plus/svart-front.svg",
    colours: [
      {
        name: "Svart", hex: "#1C1C1E",
        imageUrl: "/phones/samsung-galaxy-s26-plus/svart-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-plus/svart-front.svg",
          "/phones/samsung-galaxy-s26-plus/svart-back.svg",
          "/phones/samsung-galaxy-s26-plus/svart-side.svg",
        ],
      },
      {
        name: "Silver", hex: "#C0C0C0",
        imageUrl: "/phones/samsung-galaxy-s26-plus/silver-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-plus/silver-front.svg",
          "/phones/samsung-galaxy-s26-plus/silver-back.svg",
          "/phones/samsung-galaxy-s26-plus/silver-side.svg",
        ],
      },
      {
        name: "Blå", hex: "#4A6FA5",
        imageUrl: "/phones/samsung-galaxy-s26-plus/bla-front.svg",
        gallery: [
          "/phones/samsung-galaxy-s26-plus/bla-front.svg",
          "/phones/samsung-galaxy-s26-plus/bla-back.svg",
          "/phones/samsung-galaxy-s26-plus/bla-side.svg",
        ],
      },
    ],
    variants: [
      variant("256 GB", 13788),
      variant("512 GB", 15588),
    ],
    specs: {
      Skärm: "6.7\" Dynamic AMOLED 2X, 120 Hz",
      Chip: "Exynos 2600",
      Kamera: "50 MP + 12 MP + 10 MP",
      Batteri: "4 900 mAh",
      "5G": "Ja",
    },
  },
];
