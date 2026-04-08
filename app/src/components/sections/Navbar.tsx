"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { navLinks } from "@/data/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <a href="/" className="text-2xl font-extrabold tracking-tight text-primary">
          vimla
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="primary" href="#">
            Mitt Vimla
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-dark cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <Container className="flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-dark hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="primary" href="#">
              Mitt Vimla
            </Button>
          </Container>
        </div>
      )}
    </nav>
  );
}
