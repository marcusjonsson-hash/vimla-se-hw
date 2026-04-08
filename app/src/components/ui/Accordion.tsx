"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  question: string;
  answer: string;
}

export default function Accordion({ question, answer }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-5 text-left cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-dark">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-muted leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
