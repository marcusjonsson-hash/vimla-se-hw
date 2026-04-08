import Container from "@/components/ui/Container";
import { footerLinkGroups } from "@/data/navigation";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-16">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-primary">
              vimla
            </span>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Mobilabonnemang utan krångel. Drivs med kärlek av Telenor.
            </p>
          </div>

          {/* Link groups */}
          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Vimla. Alla rättigheter förbehållna.
        </div>
      </Container>
    </footer>
  );
}
