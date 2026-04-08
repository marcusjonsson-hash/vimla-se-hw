import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { plans } from "@/data/plans";
import { Check } from "lucide-react";

export default function PlanCards() {
  return (
    <section id="planer" className="py-20 md:py-28 bg-white">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Våra mobilabonnemang
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Välj det abonnemang som passar dig. Ingen bindningstid — byt eller
            säg upp när du vill.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} highlight={plan.popular} className="flex flex-col">
              {plan.popular && (
                <span className="inline-block self-start rounded-full bg-primary text-white text-xs font-semibold px-3 py-1 mb-4">
                  Populärast
                </span>
              )}
              <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
              <p className="mt-1 text-3xl font-extrabold text-primary">
                {plan.dataAmount}
              </p>
              <p className="mt-2 text-muted">
                <span className="text-2xl font-bold text-dark">{plan.price} kr</span>
                <span className="text-sm"> /mån</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                Välj {plan.name}
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
