export interface Plan {
  id: string;
  name: string;
  dataAmount: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export const plans: Plan[] = [
  {
    id: "vimla-s",
    name: "Vimla S",
    dataAmount: "6 GB",
    price: 99,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
      "EU-roaming inkluderat",
    ],
  },
  {
    id: "vimla-m",
    name: "Vimla M",
    dataAmount: "20 GB",
    price: 149,
    popular: true,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
      "EU-roaming inkluderat",
      "Priset sjunker över tid",
    ],
  },
  {
    id: "vimla-l",
    name: "Vimla L",
    dataAmount: "40 GB",
    price: 199,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
      "EU-roaming inkluderat",
      "Priset sjunker över tid",
    ],
  },
  {
    id: "vimla-xl",
    name: "Vimla XL",
    dataAmount: "100 GB",
    price: 299,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
      "EU-roaming inkluderat",
      "Priset sjunker över tid",
      "Obegränsad surf i sociala medier",
    ],
  },
];
