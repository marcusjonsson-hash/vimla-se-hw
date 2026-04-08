"use client";

import { Check } from "lucide-react";
import type { CheckoutFormFields } from "@/lib/validation";

interface PersonalDetailsFormProps {
  fields: CheckoutFormFields;
  errors: Partial<Record<keyof CheckoutFormFields, string>>;
  onChange: (field: keyof CheckoutFormFields, value: string) => void;
  onBlur: (field: keyof CheckoutFormFields) => void;
}

type FieldConfig = {
  key: keyof CheckoutFormFields;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  placeholder?: string;
};

const FIELD_CONFIGS: FieldConfig[] = [
  {
    key: "personnummer",
    label: "Personnummer",
    type: "text",
    autoComplete: "off",
    placeholder: "YYYYMMDD-XXXX",
  },
  { key: "name", label: "Namn", type: "text", autoComplete: "name" },
  {
    key: "address",
    label: "Adress",
    type: "text",
    autoComplete: "street-address",
  },
  {
    key: "email",
    label: "E-post",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "phone",
    label: "Telefon",
    type: "tel",
    autoComplete: "tel",
  },
];

export default function PersonalDetailsForm({
  fields,
  errors,
  onChange,
  onBlur,
}: PersonalDetailsFormProps) {
  return (
    <div className="space-y-4" data-analytics-section="checkout-personal-details">
      {FIELD_CONFIGS.map((field) => {
        const fieldId = `checkout-${field.key}`;
        const error = errors[field.key];
        const hasValue = fields[field.key].trim().length > 0;
        const isValid = hasValue && !error;

        return (
          <div key={field.key}>
            <label htmlFor={fieldId} className="mb-1 block text-sm font-semibold text-dark">
              {field.label} <span className="text-primary">*</span>
            </label>
            <div className="relative">
              <input
                id={fieldId}
                type={field.type}
                value={fields[field.key]}
                onChange={(event) => onChange(field.key, event.target.value)}
                onBlur={() => onBlur(field.key)}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                aria-required="true"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${fieldId}-error` : undefined}
                className={`w-full rounded-xl border px-4 py-3 text-base text-dark outline-none transition-colors ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : isValid
                      ? "border-primary focus:border-primary"
                      : "border-gray-200 focus:border-primary"
                }`}
              />
              {isValid ? (
                <Check className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary" />
              ) : null}
            </div>
            {error ? (
              <p id={`${fieldId}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
