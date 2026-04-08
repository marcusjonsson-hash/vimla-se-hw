export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: "keep-number",
    question: "Kan jag behålla mitt nummer?",
    answer:
      "Absolut! Du kan enkelt flytta med ditt befintliga nummer till Vimla. Det tar vanligtvis 1–2 arbetsdagar.",
  },
  {
    id: "binding",
    question: "Har ni bindningstid?",
    answer:
      "Nej, vi har ingen bindningstid alls. Du kan byta abonnemang eller säga upp det när som helst.",
  },
  {
    id: "network",
    question: "Vilket nät använder Vimla?",
    answer:
      "Vimla använder Telenors nät, som är ett av Sveriges mest heltäckande mobilnät med bra täckning i hela landet.",
  },
  {
    id: "price-drop",
    question: "Hur fungerar prisrabatten?",
    answer:
      "Ditt pris sjunker automatiskt ju längre du är kund hos oss. Ingen ansökan behövs – rabatten kickar in av sig själv.",
  },
  {
    id: "eu-roaming",
    question: "Fungerar mitt abonnemang utomlands?",
    answer:
      "Ja, du kan använda ditt abonnemang inom EU/EES utan extra kostnad. Ditt inkluderade data gäller även utomlands.",
  },
  {
    id: "change-plan",
    question: "Kan jag byta abonnemang?",
    answer:
      "Ja, du kan uppgradera eller nedgradera ditt abonnemang när du vill. Ändringen träder i kraft direkt eller vid nästa faktureringsperiod.",
  },
];
