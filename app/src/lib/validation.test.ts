import { describe, expect, it } from "vitest";
import {
  validateAge,
  validateCheckoutForm,
  validateEmail,
  validatePersonnummer,
  validatePhone,
  validateRequired,
} from "./validation";

function buildPersonnummerForAge(age: number, dayOffset = 0): string {
  const now = new Date();
  const date = new Date(
    now.getFullYear() - age,
    now.getMonth(),
    now.getDate() + dayOffset
  );

  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}${month}${day}-1234`;
}

describe("validatePersonnummer", () => {
  it("accepts valid format", () => {
    expect(validatePersonnummer("19900101-1234").valid).toBe(true);
    expect(validatePersonnummer("199001011234").valid).toBe(true);
  });

  it("rejects invalid format", () => {
    const result = validatePersonnummer("900101-1234");
    expect(result.valid).toBe(false);
    expect(result.error).toBe("Ange ett giltigt personnummer (YYYYMMDD-XXXX)");
  });

  it("rejects impossible dates", () => {
    expect(validatePersonnummer("19900231-1234").valid).toBe(false);
  });
});

describe("validateAge", () => {
  it("accepts customer exactly 18 years old today", () => {
    const pnr = buildPersonnummerForAge(18);
    expect(validateAge(pnr).valid).toBe(true);
  });

  it("rejects under 18", () => {
    const pnr = buildPersonnummerForAge(17, 1);
    const result = validateAge(pnr);
    expect(result.valid).toBe(false);
    expect(result.error).toBe(
      "Du måste vara minst 18 år för att ansöka om delbetalning"
    );
  });
});

describe("field validators", () => {
  it("validateRequired rejects whitespace-only input", () => {
    expect(validateRequired("   ", "ditt namn").valid).toBe(false);
  });

  it("validateEmail validates basic address", () => {
    expect(validateEmail("hej@vimla.se").valid).toBe(true);
    expect(validateEmail("inte-en-epost").valid).toBe(false);
  });

  it("validatePhone supports Swedish mobile formats", () => {
    expect(validatePhone("0701234567").valid).toBe(true);
    expect(validatePhone("+46701234567").valid).toBe(true);
    expect(validatePhone("070-123 45 67").valid).toBe(true);
    expect(validatePhone("031123456").valid).toBe(false);
  });
});

describe("validateCheckoutForm", () => {
  it("returns valid results for a complete valid form", () => {
    const result = validateCheckoutForm({
      personnummer: buildPersonnummerForAge(30),
      name: "Anna Andersson",
      address: "Testgatan 1, 111 22 Stockholm",
      email: "anna@example.se",
      phone: "0701234567",
    });

    expect(Object.values(result).every((entry) => entry.valid)).toBe(true);
  });

  it("returns field errors for invalid values", () => {
    const result = validateCheckoutForm({
      personnummer: "20220101-1234",
      name: "",
      address: "",
      email: "anna@",
      phone: "123",
    });

    expect(result.personnummer.valid).toBe(false);
    expect(result.name.valid).toBe(false);
    expect(result.address.valid).toBe(false);
    expect(result.email.valid).toBe(false);
    expect(result.phone.valid).toBe(false);
  });
});
