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
    id: "mini",
    name: "Mini",
    dataAmount: "1 GB",
    price: 39,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
    ],
  },
  {
    id: "liten",
    name: "Liten",
    dataAmount: "5 GB",
    price: 99,
    features: [
      "Fria samtal & SMS",
      "Telenors nät",
      "Ingen bindningstid",
      "EU-roaming inkluderat",
    ],
  },
  {
    id: "mellan",
    name: "Mellan",
    dataAmount: "15 GB",
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
    id: "stor",
    name: "Stor",
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
];
