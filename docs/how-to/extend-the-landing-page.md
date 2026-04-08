# How to Extend the Landing Page

**Audience:** Developers who understand React and TypeScript and want to add or modify content on the Vimla landing page.  
**Prerequisites:** Familiarity with the [architecture reference](../reference/architecture.md), Node.js installed, `npm run dev` running locally.  
**Diátaxis quadrant:** How-to — task recipes. For factual lookup, see [`../reference/architecture.md`](../reference/architecture.md).

---

## How to add a new subscription plan

1. Open `app/src/data/plans.ts`.
2. Append a new object to the `plans` array that satisfies the `Plan` interface:
   ```ts
   {
     id: "xl",           // unique lowercase string
     name: "XL",         // display name shown on the card
     dataAmount: "100 GB",
     price: 299,
     features: [
       "Fria samtal & SMS",
       "Telenors nät",
       "Ingen bindningstid",
       "EU-roaming inkluderat",
       "Priset sjunker över tid",
     ],
   }
   ```
3. Save the file. The `PlanCards` section renders from this array — no component change required.
4. Verify: the new card appears in the plan grid at `http://localhost:3000#planer`.

To mark a plan as the recommended choice, set `popular: true`. Only one plan should carry this flag at a time — the UI renders one badge and one highlighted ring.

---

## How to add a new FAQ entry

1. Open `app/src/data/faqs.ts`.
2. Append an object to the `faqs` array:
   ```ts
   {
     id: "sim-delivery",      // unique lowercase hyphenated string
     question: "Hur snabbt får jag mitt SIM-kort?",
     answer: "Vi skickar ditt SIM-kort med PostNord. Leveranstiden är vanligtvis 2–3 arbetsdagar.",
   }
   ```
3. Verify: the new accordion item appears at `http://localhost:3000#faq`.

---

## How to change a USP

1. Open `app/src/data/usps.ts`.
2. Locate the entry by `id` and edit `title` or `description` as needed.
3. To change the icon, replace the `icon` value with any `LucideIcon` imported at the top of the file:
   ```ts
   import { Lock, Signal, TrendingDown, Smile } from "lucide-react";
   // then in the array:
   { id: "support", icon: Smile, title: "Vänlig support", description: "..." }
   ```
4. Verify: the updated USP block appears in the "Varför Vimla?" section.

---

## How to add a new page section

1. Create a new file in `app/src/components/sections/`, e.g. `Testimonials.tsx`:
   ```tsx
   import Container from "@/components/ui/Container";

   export default function Testimonials() {
     return (
       <section className="py-20 bg-white">
         <Container>
           <h2 className="text-3xl font-bold text-dark text-center">
             Vad våra kunder säger
           </h2>
           {/* render content here */}
         </Container>
       </section>
     );
   }
   ```
2. If the section uses static content, create a matching data file in `app/src/data/` with a TypeScript interface and exported array before writing the component JSX.
3. Import and place the component in `app/src/app/page.tsx` at the desired position in the section stack:
   ```tsx
   import Testimonials from "@/components/sections/Testimonials";

   // inside the JSX:
   <HowItWorks />
   <Testimonials />   {/* ← inserted here */}
   <FAQ />
   ```
4. Verify: the new section renders in the correct position at `http://localhost:3000`.

---

## How to update brand colors

1. Open `app/src/app/globals.css`.
2. Update the relevant CSS variable inside the `@theme inline` block:
   ```css
   @theme inline {
     --color-primary: #NEW_HEX;
     --color-primary-hover: #NEW_HOVER_HEX;
     --color-primary-light: #NEW_LIGHT_HEX;
   }
   ```
3. All Tailwind utilities that reference these tokens (`bg-primary`, `text-primary`, `hover:bg-primary-hover`, etc.) update automatically across the entire application — no component changes needed.
4. Verify: check the navbar logo, hero CTA button, plan card accents, and step circles for the updated color.

---

## How to add a new UI primitive

1. Create a file in `app/src/components/ui/`, e.g. `Badge.tsx`.
2. Accept a `variant` prop for visual variants rather than accepting raw `className` overrides:
   ```tsx
   type BadgeVariant = "default" | "highlight";

   interface BadgeProps {
     variant?: BadgeVariant;
     children: React.ReactNode;
   }

   const variantClasses: Record<BadgeVariant, string> = {
     default: "bg-gray-100 text-muted",
     highlight: "bg-primary text-white",
   };

   export default function Badge({ variant = "default", children }: BadgeProps) {
     return (
       <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${variantClasses[variant]}`}>
         {children}
       </span>
     );
   }
   ```
3. Import it into whichever section component needs it — UI primitives may not import from sections or data.
4. Verify TypeScript: run `npx tsc --noEmit` from the `app/` directory. No errors should appear.
   - If you see `Type 'X' is not assignable to type 'Y'`, check that your `variant` value matches the union type defined at the top of the component file.
   - If you see `Cannot find module`, confirm the file is in `app/src/components/ui/` and the import path uses the `@/` alias.

---

## How to move `HowItWorks` steps to the data layer

The `steps` array in `HowItWorks.tsx` is currently hardcoded inline — a known gap noted in [ADR-001](../reference/architecture.md#10-architectural-decision-records). To fix it:

1. Create `app/src/data/steps.ts`:
   ```ts
   export interface Step {
     number: string;
     title: string;
     description: string;
   }

   export const steps: Step[] = [
     { number: "1", title: "Välj abonnemang", description: "Hitta det abonnemang som passar din surfning och budget." },
     { number: "2", title: "Beställ SIM-kort", description: "Vi skickar ditt SIM-kort hem till dig — helt gratis." },
     { number: "3", title: "Klar!", description: "Sätt i SIM-kortet och börja surfa. Behåll ditt gamla nummer." },
   ];
   ```
2. In `app/src/components/sections/HowItWorks.tsx`, replace the inline `steps` constant with an import:
   ```tsx
   import { steps } from "@/data/steps";
   ```
3. Remove the inline array declaration from the component file.
4. Verify: the section renders identically at `http://localhost:3000`.
