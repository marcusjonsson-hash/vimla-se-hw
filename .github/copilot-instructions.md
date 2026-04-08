# Copilot Instructions

## Project Overview

This workspace contains a **Vimla.se landing page clone** — a single-page React/TypeScript application that reproduces the main landing page of [vimla.se](https://vimla.se/), the Swedish MVNO. The focus is on clean layout, accurate content structure, and responsive design — **no complicated graphics or animations**.

---

## Workspace Structure

| Folder | Purpose |
|--------|---------|
| `app/` | Next.js application (App Router, TypeScript, Tailwind CSS v4) |
| `.github/` | Copilot instructions and skills |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Icons | `lucide-react` |
| Content language | Swedish |

---

## Conventions

### File & Folder Naming

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase `.tsx` | `HeroSection.tsx` |
| Data files | camelCase `.ts` | `plans.ts` |
| UI primitives | PascalCase `.tsx` in `components/ui/` | `Button.tsx` |
| Section components | PascalCase `.tsx` in `components/sections/` | `PlanCards.tsx` |

### Source Layout (`app/src/`)

```
app/src/
├── app/                  # Next.js App Router (layout, page, global CSS)
├── components/
│   ├── sections/         # Page section components (Navbar, Hero, PlanCards, etc.)
│   └── ui/               # Reusable UI primitives (Button, Card, Accordion, Container)
└── data/                 # Static typed content (plans, usps, faqs, navigation)
```

### Brand Tokens

| Token | Value |
|-------|-------|
| Primary (green) | `#3CB371` |
| Primary hover | `#2E9E5E` |
| Dark text | `#2D2D2D` |
| Muted text | `#6B7280` |
| Warm background | `#E8F5E9` |
| White | `#FFFFFF` |
| Font stack | System sans-serif |
| Border radius (cards) | `1rem` |

### Component Patterns

- **Data-driven sections.** Section components import from `data/` and render arrays — no hardcoded content inside JSX.
- **Variant props.** UI primitives accept a `variant` prop (e.g., `Button variant="primary"`) — avoid one-off className overrides.
- **Composition over nesting.** `page.tsx` composes sections top-to-bottom. Sections are self-contained and don't import each other.
- **No client-side state unless needed.** Default to Server Components. Only add `"use client"` for interactive components (Accordion, mobile nav toggle).
- **Logo as styled text.** The "vimla" wordmark is rendered as styled text in the brand green — no image asset.

---

## Available Skills

### `mermaid-diagrams`

Comprehensive guide for creating software diagrams using Mermaid syntax.

**Use when:** The user asks to "diagram", "visualise", "model", "map out", or create any architectural or process visual.

### `architecture-blueprint-generator`

Analyses codebases to create detailed architectural documentation with visual diagrams.

**Use when:** The user asks to document architecture, generate a system blueprint, or understand the structural patterns in the codebase.

### `documentation-clarity`

Diátaxis-based documentation quality engineer. Classifies, audits, restructures, and generates clear technical documentation with enforced separation into Tutorial / How-to / Reference / Troubleshooting quadrants.

**Use when:** Writing, reviewing, auditing, or restructuring any documentation — README files, product docs, API references, onboarding guides, or project artifacts. Also use when a doc mixes tutorial content with reference tables, lacks audience statements, or needs a documentation scaffold for a new feature.

**Quality gate:** All documentation in this workspace should serve exactly one Diátaxis quadrant per file. The skill enforces 12 documentation smells and scores docs against a 100-point rubric. Templates in `assets/` embed the quadrant-specific structure standards.

---

## Workflow Principles

1. **Plan before implementing.** Break work into steps, understand the current state, then act.
2. **Read before writing.** Gather context from existing files before making changes. Follow established patterns in the codebase.
3. **Problem-space over solution-space.** Requirements and stories define WHAT and WHY, not HOW. Technology choices belong in design artifacts with rationale.
4. **Smell-then-fix.** When writing or reviewing requirements, user stories, or business rules, detect quality issues before rewriting. Re-check output against the same standards.
5. **Atomic by default.** One requirement per row, one story per block, one rule per entry. Split ruthlessly.
6. **UNSPECIFIED over guessing.** Mark unknowns explicitly rather than inventing values.
7. **Templates are the starting point.** When creating new project artifacts, use the templates in `templates/`. They embed the quality standards that all specifications must meet.
8. **Track what you finish.** After completing work, update the relevant tracking documents (`slicing.md`, `definition-of-done.md`, `project.md`).
9. **Data layer first.** Define TypeScript interfaces and content arrays before building the components that consume them.
10. **Mobile-first responsive.** Write Tailwind classes mobile-first, then add `md:` / `lg:` breakpoints.
11. **Keep it simple.** No complex animations, no heavy illustrations. Use background colors, whitespace, and typography for visual hierarchy.
12. **Swedish content.** All user-facing text is in Swedish. Match Vimla's friendly, informal brand tone.