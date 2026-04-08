import Container from "@/components/ui/Container";

const steps = [
  {
    number: "1",
    title: "Välj abonnemang",
    description: "Hitta det abonnemang som passar din surfning och budget.",
  },
  {
    number: "2",
    title: "Beställ SIM-kort",
    description: "Vi skickar ditt SIM-kort hem till dig — helt gratis.",
  },
  {
    number: "3",
    title: "Klar!",
    description: "Sätt i SIM-kortet och börja surfa. Behåll ditt gamla nummer.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Så enkelt kommer du igång
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Tre steg — sedan är du Vimlakund.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                {step.number}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-dark">
                {step.title}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
