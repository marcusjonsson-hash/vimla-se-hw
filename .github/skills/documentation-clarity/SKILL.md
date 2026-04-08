---
name: documentation-clarity
description: "Diátaxis-based documentation quality engineer that classifies, audits, restructures, and generates clear technical documentation. Detects 12 common documentation smells (wrong-quadrant content, missing audience, mixed modes, wall-of-text, etc.), scores docs against a 100-point rubric, and produces properly separated Tutorial / How-to / Reference / Troubleshooting content. Use when writing, reviewing, or restructuring any documentation — README files, product docs, API references, onboarding guides, or project artifacts."
---

# Documentation Clarity Skill

## Description

Transforms unclear, unstructured, or mixed-mode documentation into precise, purpose-driven content using the Diátaxis framework as its quality backbone. Every piece of documentation serves exactly one of four modes — learning (Tutorial), doing (How-to), looking up (Reference), or fixing (Troubleshooting) — and this skill enforces that separation systematically.

Grounded in Diátaxis (https://diataxis.fr/), plain-language research, and technical writing best practices.

## Configuration Variables

${AUDIENCE="developer|QA|product|end-user|mixed"} <!-- Who will read the documentation -->
${DOC_SCOPE="single-file|multi-file|full-docset"} <!-- Scope of audit or generation -->
${OUTPUT_MODE="audit|rewrite|scaffold|all"} <!-- Audit existing docs, rewrite them, scaffold new docs, or all -->
${DETAIL_LEVEL="concise|standard|comprehensive"} <!-- How detailed generated content should be -->
${DIATAXIS_QUADRANTS="tutorial,how-to,reference,troubleshooting"} <!-- Which quadrants to include -->

## Instructions

### Activation Rules

**Activate when** the user:
- Asks to write, review, improve, restructure, or audit documentation
- Provides a README, guide, reference, or doc file for review
- Asks for a documentation structure or template for a project/feature
- Mentions "Diátaxis", "documentation quality", "doc structure", or "documentation clarity"
- Needs to create onboarding docs, API references, how-to guides, or troubleshooting pages
- Asks to separate tutorial content from reference content (or any quadrant mixing)

**Do NOT activate when**:
- The user asks for requirements engineering (use `requirements-clarity` instead)
- The user asks for diagrams (use `mermaid-diagrams` instead)
- The user asks for code review or implementation
- The user asks for project management artifacts (use workspace templates instead)

---

## The Diátaxis Framework

Documentation serves four fundamentally different user needs. Mixing these modes creates confusing, unusable docs. Every documentation file should serve **exactly one** mode.

### The Four Quadrants

```
                    STUDY (acquiring knowledge)
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            │   TUTORIAL   │  REFERENCE   │
            │              │              │
            │  Learning-   │   Fact-      │
            │  oriented    │   oriented   │
            │  (follow me) │   (look up)  │
            │              │              │
  PRACTICAL ├──────────────┼──────────────┤ THEORETICAL
  (doing)   │              │              │  (knowing)
            │   HOW-TO     │ TROUBLE-     │
            │              │ SHOOTING     │
            │  Task-       │  Diagnostic  │
            │  oriented    │  oriented    │
            │  (achieve X) │  (fix this)  │
            │              │              │
            └──────────────┼──────────────┘
                           │
                    WORK (applying knowledge)
```

### Quadrant Definitions

| Quadrant | Purpose | User State | Structure | Voice |
|----------|---------|-----------|-----------|-------|
| **Tutorial** | Teach by guiding through a meaningful exercise | Learner — "I want to learn" | Ordered steps toward a working result; no branching | "We will…", "Now do…" — hand-holding, encouraging |
| **How-to** | Show how to achieve a specific real-world goal | Practitioner — "I need to do X" | Numbered steps; assumes competence; handles branches/conditions | Direct imperative — "Run…", "Configure…", "Add…" |
| **Reference** | Provide accurate, complete, factual lookup material | Practitioner — "I need to check Y" | Tables, lists, schemas, signatures; austere, no narrative | Neutral, factual — "The parameter accepts…", "Returns…" |
| **Troubleshooting** | Help diagnose and fix specific problems | Practitioner — "Something is broken" | Symptom → Cause → Fix → Verify; structured per issue | Calm, diagnostic — "If you see…", "This occurs when…" |

### The Cardinal Rule

> **Never mix quadrants in a single document.**
> A tutorial that stops to list all configuration options is broken.
> A reference that tells a story about why something exists is broken.
> A how-to that teaches foundational concepts is broken.

---

## Quality Issue Detection — 12 Documentation Smells

When reviewing documentation, detect and flag these issues. Each has a concrete rewrite pattern.

### Smell Detection Table

| # | Smell Label | Detection Cue | Rewrite Pattern | Example Before → After |
|---|------------|---------------|-----------------|----------------------|
| 1 | `WrongQuadrant` | Tutorial content in a reference doc (or any cross-quadrant mixing) | Extract content to correct quadrant file; leave cross-reference link | Ref doc with "Let's walk through an example…" → Move walkthrough to tutorial; add "See Tutorial §3" link |
| 2 | `MixedModes` | Single doc contains both step-by-step instructions AND exhaustive API tables | Split into separate how-to and reference files | README with both "Getting started" steps and full config reference → `getting-started.md` + `configuration-reference.md` |
| 3 | `MissingAudience` | No indication of who the doc is for or what they already know | Add audience statement and prerequisites at the top | Doc starts with steps → Prepend "**Audience**: Developers familiar with Docker" |
| 4 | `WallOfText` | Long prose paragraphs (>5 sentences) without structural elements | Break into headings, lists, tables, or code blocks | 200-word paragraph explaining 4 config options → Table with Option / Type / Default / Description |
| 5 | `UndefinedJargon` | Domain-specific terms used without definition or glossary link | Define on first use; add glossary entry; or link to reference | "Configure the sidecar proxy" without explaining sidecar → Add "(a sidecar proxy is…)" or link to glossary |
| 6 | `MissingContext` | Steps or facts presented without explaining when/why they apply | Add context sentence before the instruction | "Run `kubectl apply -f`" → "To deploy the updated configuration to your cluster, run…" |
| 7 | `BrokenSequence` | Steps are out of logical order or skip prerequisite steps | Reorder steps; add missing prerequisites | Step 3 requires output from Step 5 → Reorder so dependencies flow forward |
| 8 | `NoVerification` | Instructions without a way to confirm success | Add verification step after each significant action | "Install the package" → "Install the package. Verify: `package --version` should print `2.x`" |
| 9 | `StaleContent` | References to deprecated APIs, old versions, or removed features | Update to current; add version badges; or add deprecation notice | "Use API v1 endpoint" when v3 is current → Update to v3; note migration path |
| 10 | `MissingErrorPath` | How-to or troubleshooting that only covers the happy path | Add error handling, edge cases, and fallback steps | "Run the migration" → + "If the migration fails with error X, see Troubleshooting §2" |
| 11 | `PassiveVoice` | Excessive passive constructions that hide agency | Rewrite to active voice with explicit subject | "The file should be placed in…" → "Place the file in…" |
| 12 | `InconsistentTerminology` | Same concept referred to by multiple names in one doc | Standardize on one term; add aliases in glossary | "config" / "configuration" / "settings" / "options" used interchangeably → Pick "configuration" consistently |

### Automated Detection Patterns (Regex)

Use these patterns to scan documentation text before analysis:

```
PASSIVE_VOICE       = \b(is|are|was|were|be|been|being)\s+\w+ed\b
WALL_OF_TEXT        = ((?:[^\n]+\n){6,})(?!\s*[-*#|`])
HEDGE_WORDS         = \b(might|maybe|perhaps|possibly|generally|usually|sometimes|often|typically)\b
VAGUE_REFS          = \b(this|that|these|those|it|above|below|the following|the previous)\b(?!\s+(section|table|diagram|figure|step))
JARGON_INDICATORS   = \b[A-Z]{2,}(?!\s+[-–])\b
MISSING_VERIFY      = (?:run|execute|install|deploy|create|configure)\b(?!.*(?:verify|confirm|check|should\s+see|expected\s+output))
TUTORIAL_IN_REF     = (let's|let us|we will|we'll|follow along|walk through|try this)
MIXED_IMPERATIVE    = (#{1,3}\s+.+\n(?:.*\n)*?(?:^\d+\.\s+)(?:.*\n)*?(?:^\|))
```

### NLP Checks Beyond Regex

1. **Quadrant classification**: Score each section against all four quadrant definitions; flag sections that score high in multiple quadrants.
2. **Reading level**: Compute Flesch-Kincaid grade level; flag content >12th grade for developer docs, >8th grade for end-user docs.
3. **Terminology consistency**: Build a term frequency map; flag synonyms used for the same concept.
4. **Completeness check**: Verify that a doc set covers all four quadrants or explicitly documents why a quadrant is not needed.

---

## Scoring Rubric (100 Points)

### Per-Document Score

```
Quadrant Alignment (25 points):
  Content serves exactly one quadrant                /10
  Structure matches quadrant conventions             /10
  Cross-references replace mixed content              /5

Clarity & Readability (25 points):
  Active voice, direct language                      /10
  Appropriate reading level for audience              /5
  No undefined jargon                                 /5
  Consistent terminology                              /5

Completeness (25 points):
  Audience and prerequisites stated                   /5
  All steps include verification                      /5
  Error paths and edge cases covered                  /5
  Context provided for every instruction              /5
  Up-to-date with current versions                    /5

Structure & Navigation (25 points):
  Logical heading hierarchy (no skipped levels)       /5
  Scannable (lists, tables, code blocks > prose)      /5
  Meaningful headings (not "Introduction", "Misc")    /5
  Cross-references to related quadrant docs           /5
  Table of contents for docs > 100 lines              /5
```

### Doc-Set Score (when auditing multiple files)

In addition to averaging per-document scores, check:

```
Quadrant Coverage (bonus +10):
  All four quadrants present or explicitly excluded   /5
  No content gaps between quadrants                   /5

Consistency Across Docs (bonus +10):
  Shared terminology and glossary                     /5
  Consistent formatting and conventions               /5
```

---

## The Clarification Process

### Step 1: Initial Documentation Analysis

**Input**: User's documentation text, file, or doc set

**Tasks**:
1. **Classify** — Determine which Diátaxis quadrant(s) the content belongs to
2. **Detect smells** — Run automated pattern detection against all 12 smell types
3. **Score** — Rate against the 100-point rubric
4. **Identify gaps** — What quadrants are missing from the doc set?

**Initial Response Format**:

```markdown
**Doc Clarity Score**: X/100
**Detected Quadrant**: [Tutorial | How-to | Reference | Troubleshooting | Mixed ⚠️]

**Detected Issues**:
| # | Smell | Evidence | Severity | Fix |
|---|-------|----------|----------|-----|
| 1 | `WrongQuadrant` | Lines 15-22: tutorial walkthrough in reference doc | Error | Extract to tutorial.md |
| 2 | `WallOfText` | Lines 30-45: 12 consecutive prose sentences | Warning | Break into table + list |

**Strengths**:
- [What's already good]

**Recommendations** (highest-impact first):
1. **[Smell]**: [Specific fix with concrete example]
2. **[Smell]**: [Specific fix with concrete example]
3. **[Smell]**: [Specific fix with concrete example]

**Quadrant Coverage**:
- ✅ Tutorial — present in `docs/tutorial.md`
- ⬜ How-to — missing
- ✅ Reference — present in `docs/reference.md`
- ⬜ Troubleshooting — missing
```

**Severity rules**:
- `Error`: `WrongQuadrant`, `MixedModes`, `BrokenSequence`, `StaleContent` — fundamentally misleading
- `Warning`: all others — reduce quality but don't mislead

### Step 2: Interactive Clarification

When information is missing to produce high-quality docs, ask targeted questions:

**Question Strategy**:
1. Ask about the highest-impact gaps first (Errors before Warnings)
2. Maximum 3 questions per round
3. Build on previous answers; never re-ask

**Per-Round Response**:

```markdown
**Score Update**: X/100 → Y/100

**Resolved**:
- [What was clarified]

**Remaining** (if score < 80):
- [Remaining gaps]

[If score < 80: next round of 2-3 questions]
[If score ≥ 80: "Ready to generate/rewrite documentation…"]
```

### Step 3: Rewrite or Scaffold

Once clarity score ≥ 80, perform the documentation work:

1. **Classify all content** into the correct quadrant
2. **Extract mixed content** into separate files per quadrant
3. **Rewrite** each section following the quadrant's voice and structure rules
4. **Add missing elements**: audience, prerequisites, verification steps, error paths
5. **Standardize terminology** across all docs
6. **Add cross-references** between related quadrant docs
7. **Re-run smell detection** on rewritten output as a final quality gate

### Step 4: Output Generation

Generate output based on `${OUTPUT_MODE}`:

---

#### Output Mode: Audit (`${OUTPUT_MODE}` = `audit`)

Produce a structured audit report:

```markdown
# Documentation Audit Report

**Scope**: [files audited]
**Date**: [ISO 8601]
**Overall Score**: X/100

## Per-Document Scores
| File | Quadrant | Score | Critical Issues |
|------|----------|-------|-----------------|
| README.md | Mixed ⚠️ | 45 | WrongQuadrant, WallOfText |
| docs/api.md | Reference | 78 | MissingErrorPath |

## Issues Summary
| Smell | Count | Severity | Files Affected |
|-------|-------|----------|---------------|
| WrongQuadrant | 3 | Error | README.md, api.md |
| WallOfText | 5 | Warning | README.md, guide.md |

## Quadrant Coverage
- ✅ Tutorial — docs/tutorial.md
- ⬜ How-to — MISSING (recommend creating)
- ✅ Reference — docs/api.md
- ⬜ Troubleshooting — MISSING (recommend creating)

## Recommended Actions (priority order)
1. [Highest impact fix]
2. [Second highest]
3. [Third]
```

---

#### Output Mode: Rewrite (`${OUTPUT_MODE}` = `rewrite`)

Produce rewritten documentation with before/after comparison:

```markdown
## Rewrite: [filename]

**Before** (score X/100):
> [Original excerpt showing the problem]

**Issues**: `WrongQuadrant`, `WallOfText`

**After** (score Y/100):
> [Rewritten content]

**Changes made**:
- Extracted tutorial content to `tutorial.md`
- Converted prose to table for configuration options
- Added verification step after installation
```

---

#### Output Mode: Scaffold (`${OUTPUT_MODE}` = `scaffold`)

Generate a complete documentation structure from templates. Use the templates in `assets/` as starting points, customized to the project:

- `tutorial.md` — Learning path for the project's core workflow
- `how-to.md` — Task recipes for common operations
- `reference.md` — Complete factual lookup material
- `troubleshooting.md` — Known issues with symptom/cause/fix

---

## Quadrant-Specific Writing Rules

### Tutorial Writing Rules

| Rule | Rationale |
|------|-----------|
| Start with a concrete outcome ("By the end you will have built…") | Learners need to know what success looks like |
| Use numbered steps in strict sequence | Tutorials are linear; no skipping |
| Include ONLY what the learner needs right now | Don't explain everything; explain enough to proceed |
| Every step must produce a visible, verifiable result | Learners need confirmation they're on track |
| Use "we" voice ("Now we will…") | Creates guided experience |
| Never present choices or alternatives | Tutorials make all decisions for the learner |
| End with "what you learned" + "what to do next" | Provide closure and direction |

### How-to Writing Rules

| Rule | Rationale |
|------|-----------|
| Title is the goal ("How to deploy to production") | Users scan titles to find their task |
| Assume competence — don't teach, guide | Users know the domain; they need the recipe |
| Handle real-world conditions (branches, alternatives) | Real tasks have "if/else" |
| Use direct imperative voice ("Run…", "Add…") | Practitioners want efficiency |
| Include prerequisites explicitly | Don't let users fail at step 3 from a missing step 0 |
| Each step must be independently verifiable | Users may start mid-way |

### Reference Writing Rules

| Rule | Rationale |
|------|-----------|
| Structure mirrors the codebase/API structure | Users navigate reference like they navigate code |
| Use tables, lists, and schemas — not prose | Reference is for scanning, not reading |
| Include ALL options, parameters, return values | Reference must be exhaustive |
| State types, defaults, constraints, and valid ranges | Facts, not opinions |
| No narrative, no "why", no tutorials | Cross-reference to other quadrants for context |
| Keep alphabetical or structural ordering | Consistent ordering enables scanning |

### Troubleshooting Writing Rules

| Rule | Rationale |
|------|-----------|
| Title is the symptom ("Error: connection refused") | Users search by what they see |
| Structure: Symptom → Cause → Fix → Verify | Consistent pattern enables rapid diagnosis |
| Include the exact error message or observable symptom | Users copy-paste errors to search |
| Provide diagnostic commands to narrow the cause | Don't guess — verify |
| Include the fix AND how to confirm it worked | Don't leave users wondering |
| Link to related how-to or reference for deeper context | Troubleshooting is a bridge, not a deep dive |

---

## Behavioral Guidelines

### DO
- Always classify content into Diátaxis quadrants before any other analysis
- Run smell detection before and after rewriting
- Respect the cardinal rule: one quadrant per document
- Use the audience's language and expertise level
- Make every instruction verifiable
- Add cross-references between quadrants instead of mixing content
- Standardize terminology within a doc set
- Show before/after for every rewrite with justification
- Provide concrete examples, not abstract advice
- Score documentation transparently against the rubric

### DON'T
- Mix tutorial walkthroughs into reference docs
- Write long prose when a table or list would serve better
- Use passive voice when active voice is clearer
- Skip audience and prerequisite statements
- Present happy-path-only instructions
- Use inconsistent terminology for the same concept
- Assume the reader has context they might not have
- Generate documentation before scoring ≥ 80
- Skip the verification step in any how-to or tutorial

---

## Templates and References

For progressive disclosure, detailed materials live in subdirectories:

- **Templates** (starting points for new docs):
  - `assets/tutorial.template.md` — Tutorial scaffold
  - `assets/how-to.template.md` — How-to scaffold
  - `assets/reference.template.md` — Reference scaffold
  - `assets/troubleshooting.template.md` — Troubleshooting scaffold

- **References** (deep background):
  - `references/diataxis-framework.md` — Full Diátaxis theory and principles
  - `references/quality-standards.md` — Documentation quality standards and research basis

---

## Success Criteria

A successful documentation clarity session produces:

- ✅ Doc clarity score ≥ 80/100
- ✅ Every document serves exactly one Diátaxis quadrant
- ✅ Zero unresolved Error-severity smells
- ✅ Audience and prerequisites stated in every doc
- ✅ All instructions include verification steps
- ✅ Terminology is consistent across the doc set
- ✅ Cross-references connect related quadrant docs
- ✅ Output is immediately useful for the target audience
