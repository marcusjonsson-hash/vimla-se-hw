export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export interface CheckoutFormFields {
  personnummer: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

const PERSONNUMMER_ERROR = "Ange ett giltigt personnummer (YYYYMMDD-XXXX)";
const AGE_ERROR = "Du måste vara minst 18 år för att ansöka om delbetalning";

function normalisePersonnummer(value: string): string {
  return value.replace(/\D/g, "");
}

function parseBirthDateFromPersonnummer(value: string): Date | null {
  const digits = normalisePersonnummer(value);
  if (digits.length !== 12) {
    return null;
  }

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  const date = new Date(year, month - 1, day);
  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

export function validatePersonnummer(value: string): ValidationResult {
  const trimmed = value.trim();
  const regex = /^(\d{4})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])-?\d{4}$/;

  if (!regex.test(trimmed)) {
    return { valid: false, error: PERSONNUMMER_ERROR };
  }

  if (!parseBirthDateFromPersonnummer(trimmed)) {
    return { valid: false, error: PERSONNUMMER_ERROR };
  }

  return { valid: true };
}

export function validateAge(personnummer: string): ValidationResult {
  const parsedBirthDate = parseBirthDateFromPersonnummer(personnummer);
  if (!parsedBirthDate) {
    return { valid: false, error: PERSONNUMMER_ERROR };
  }

  const today = new Date();
  let age = today.getFullYear() - parsedBirthDate.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > parsedBirthDate.getMonth() ||
    (today.getMonth() === parsedBirthDate.getMonth() &&
      today.getDate() >= parsedBirthDate.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age < 18) {
    return { valid: false, error: AGE_ERROR };
  }

  return { valid: true };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (value.trim().length === 0) {
    return { valid: false, error: `Ange ${fieldName}` };
  }

  return { valid: true };
}

export function validateEmail(value: string): ValidationResult {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value.trim())) {
    return { valid: false, error: "Ange en giltig e-postadress" };
  }

  return { valid: true };
}

export function validatePhone(value: string): ValidationResult {
  const normalised = value.replace(/[\s\-.]/g, "");
  const regex = /^(?:\+46|0)7\d{8}$/;

  if (!regex.test(normalised)) {
    return { valid: false, error: "Ange ett giltigt telefonnummer" };
  }

  return { valid: true };
}

export function validateCheckoutForm(
  fields: CheckoutFormFields
): Record<keyof CheckoutFormFields, ValidationResult> {
  const personnummerFormat = validatePersonnummer(fields.personnummer);
  const personnummerValidation = personnummerFormat.valid
    ? validateAge(fields.personnummer)
    : personnummerFormat;

  return {
    personnummer: personnummerValidation,
    name: validateRequired(fields.name, "ditt namn"),
    address: validateRequired(fields.address, "din adress"),
    email: validateEmail(fields.email),
    phone: validatePhone(fields.phone),
  };
}
