import Container from "@/components/ui/Container";
import { usps } from "@/data/usps";

export default function USPSection() {
  return (
    <section id="om-vimla" className="py-20 md:py-28 bg-gray-50">
      <Container>
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-dark">
            Varför Vimla?
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
            Vi tror på enkel mobil utan krångel. Här är tre saker som gör oss
            lite annorlunda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {usps.map((usp) => {
            const Icon = usp.icon;
            return (
              <div key={usp.id} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-dark">
                  {usp.title}
                </h3>
                <p className="mt-3 text-muted leading-relaxed">
                  {usp.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
