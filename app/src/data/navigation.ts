export interface NavLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Mobil", href: "/#planer" },
  { label: "Telefoner", href: "/phones" },
  { label: "Om Vimla", href: "/#om-vimla" },
  { label: "Vanliga frågor", href: "/#faq" },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Abonnemang",
    links: [
      { label: "Mobilabonnemang", href: "/#planer" },
      { label: "Jämför abonnemang", href: "/#planer" },
    ],
  },
  {
    title: "Om Vimla",
    links: [
      { label: "Vilka vi är", href: "/#om-vimla" },
      { label: "Vanliga frågor", href: "/#faq" },
      { label: "Kontakta oss", href: "/#kontakt" },
    ],
  },
  {
    title: "Kundservice",
    links: [
      { label: "Mitt Vimla", href: "#" },
      { label: "Täckningskarta", href: "#" },
      { label: "Integritetspolicy", href: "#" },
    ],
  },
];
