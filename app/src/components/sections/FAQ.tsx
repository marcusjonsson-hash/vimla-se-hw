import Container from "@/components/ui/Container";
import Accordion from "@/components/ui/Accordion";
import { faqs } from "@/data/faqs";

export default function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Vanliga frågor
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Hittar du inte svaret du söker? Kontakta vår kundservice så hjälper
            vi dig.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
