import { LucideIcon, Lock, Signal, TrendingDown } from "lucide-react";

export interface USP {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const usps: USP[] = [
  {
    id: "no-lock-in",
    icon: Lock,
    title: "Ingen bindningstid",
    description:
      "Byt eller säg upp ditt abonnemang när du vill. Inga dolda avgifter, inga krångliga avtal.",
  },
  {
    id: "telenor-network",
    icon: Signal,
    title: "Telenors nät",
    description:
      "Du surfar och ringer i Telenors rikstäckande nät – ett av Sveriges bästa mobilnät.",
  },
  {
    id: "price-drops",
    icon: TrendingDown,
    title: "Priset sjunker",
    description:
      "Ju längre du är kund, desto lägre pris. Vi belönar lojalitet istället för att bara ge erbjudanden till nya kunder.",
  },
];
