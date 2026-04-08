# Documentation Clarity

A Diátaxis-based documentation quality skill that classifies, audits, restructures, and generates clear technical documentation. Ensures every doc serves exactly one of four purposes: learning (Tutorial), doing (How-to), looking up (Reference), or fixing (Troubleshooting).

## Purpose

Prevents documentation rot, confusion, and wasted reader time by enforcing the Diátaxis separation of concerns. Uses automated smell detection (12 issue types), a 100-point scoring rubric, and quadrant-specific writing rules to systematically transform unclear docs into purposeful, navigable content.

## When to Use This Skill

### Use When
- Writing new documentation (README, guides, API references, onboarding docs)
- Reviewing or auditing existing documentation for quality
- Restructuring a monolithic doc into proper Diátaxis quadrants
- Creating a documentation template or scaffold for a new project/feature
- A README mixes tutorial content with reference tables
- Troubleshooting docs lack structured symptom → cause → fix patterns
- Documentation uses inconsistent terminology or undefined jargon

### Don't Use When
- Writing or reviewing requirements, user stories, or business rules (use `requirements-clarity`)
- Creating diagrams or visualizations (use `mermaid-diagrams`)
- Analyzing codebase architecture (use `architecture-blueprint-generator`)
- Writing code or fixing bugs

## How It Works

### The Diátaxis Framework

Every documentation file must serve **exactly one** of four modes:

| Quadrant | Purpose | User State | Key Principle |
|----------|---------|-----------|---------------|
| **Tutorial** | Teach through guided exercise | Learner — "I want to learn" | Hand-hold through steps to a working result |
| **How-to** | Show how to achieve a goal | Practitioner — "I need to do X" | Assume competence; give the recipe |
| **Reference** | Provide factual lookup material | Practitioner — "I need to check Y" | Tables and schemas; no narrative |
| **Troubleshooting** | Diagnose and fix problems | Practitioner — "It's broken" | Symptom → Cause → Fix → Verify |

The cardinal rule: **Never mix quadrants in a single document.**

### The 12 Documentation Smells

The skill scans for these common issues using regex patterns and NLP heuristics:

| # | Smell Label | What It Catches |
|---|------------|----------------|
| 1 | `WrongQuadrant` | Tutorial content in a reference doc (or any cross-quadrant mixing) |
| 2 | `MixedModes` | Single doc with both step-by-step instructions AND exhaustive API tables |
| 3 | `MissingAudience` | No indication of who the doc is for |
| 4 | `WallOfText` | Long prose paragraphs without structural elements |
| 5 | `UndefinedJargon` | Domain terms used without definition |
| 6 | `MissingContext` | Steps presented without explaining when/why |
| 7 | `BrokenSequence` | Steps out of order or missing prerequisites |
| 8 | `NoVerification` | Instructions without a way to confirm success |
| 9 | `StaleContent` | References to deprecated APIs or old versions |
| 10 | `MissingErrorPath` | Only the happy path is documented |
| 11 | `PassiveVoice` | Excessive passive constructions hiding agency |
| 12 | `InconsistentTerminology` | Same concept referred to by multiple names |

### The Clarification Process

```
┌─────────────────────────────────────────────────────────────────┐
│  1. CLASSIFY       Determine Diátaxis quadrant(s) →             │
│                    detect mixed content                         │
│                                                                 │
│  2. DETECT         Run smell detection (12 types) →             │
│                    score against 100-point rubric               │
│                                                                 │
│  3. CLARIFY        Ask 2-3 targeted questions per round →       │
│                    update score → repeat until ≥ 80             │
│                                                                 │
│  4. REWRITE        Separate quadrants → apply writing rules →   │
│                    add verification → standardize terms          │
│                                                                 │
│  5. OUTPUT         Audit report / rewritten docs / scaffold     │
└─────────────────────────────────────────────────────────────────┘
```

**Step 1 — Classify**: Determines which Diátaxis quadrant(s) the content belongs to. Flags `MixedModes` and `WrongQuadrant` issues.

**Step 2 — Detect**: Runs automated pattern detection against all 12 smell types. Scores against the rubric.

**Step 3 — Clarify**: Asks targeted questions about audience, prerequisites, terminology, and missing context. Updates score transparently after each round.

**Step 4 — Rewrite**: Extracts mixed content into separate files per quadrant. Rewrites each following the quadrant's voice and structure rules. Adds verification steps and error paths.

**Step 5 — Output**: Generates audit report, rewritten docs, or new scaffold depending on configuration.

### Scoring Rubric (100 points)

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
  Logical heading hierarchy                           /5
  Scannable (lists, tables, code blocks > prose)      /5
  Meaningful headings                                 /5
  Cross-references to related quadrant docs           /5
  Table of contents for docs > 100 lines              /5
```

### Severity Rules

- **Error**: `WrongQuadrant`, `MixedModes`, `BrokenSequence`, `StaleContent` — fundamentally misleading content
- **Warning**: all others — reduce quality but don't actively mislead

## Configuration

| Variable | Options | Default | Purpose |
|----------|---------|---------|---------|
| `AUDIENCE` | developer, QA, product, end-user, mixed | mixed | Adjusts language level and depth |
| `DOC_SCOPE` | single-file, multi-file, full-docset | single-file | How many docs to audit/generate |
| `OUTPUT_MODE` | audit, rewrite, scaffold, all | all | What output to produce |
| `DETAIL_LEVEL` | concise, standard, comprehensive | standard | Depth of generated content |
| `DIATAXIS_QUADRANTS` | Any combination of: tutorial, how-to, reference, troubleshooting | all four | Which quadrants to include |

## Usage Examples

### Example 1: Auditing a Mixed README

**User Input:**
```
Review this README for documentation quality.
```

**Skill Response:**
```markdown
**Doc Clarity Score**: 35/100
**Detected Quadrant**: Mixed ⚠️

**Detected Issues**:
| # | Smell | Evidence | Severity |
|---|-------|----------|----------|
| 1 | `MixedModes` | Lines 5-20: getting started tutorial mixed with config reference table | Error |
| 2 | `WallOfText` | Lines 25-40: 15 prose sentences explaining architecture | Warning |
| 3 | `NoVerification` | Installation steps have no way to confirm success | Warning |

**Recommendations**:
1. Extract getting-started walkthrough into `docs/tutorial.md`
2. Move config reference table to `docs/reference.md`
3. Add `--version` check after install step
```

### Example 2: Scaffolding a Doc Set

**User Input:**
```
Create documentation structure for our new API service.
```

**Skill Output:**
- `docs/tutorial.md` — "Build your first API request" learning path
- `docs/how-to.md` — Authentication, pagination, error handling recipes
- `docs/reference.md` — Endpoints, parameters, response schemas, error codes
- `docs/troubleshooting.md` — Common errors with symptom/cause/fix patterns

### Example 3: Rewrite with Before/After

**Before** (score 30/100):
```markdown
## API

The API is easy to use. Just send a POST request to /api/data with your
payload and it will return the results. You might need to authenticate first.
The response includes various fields that are documented below. If something
goes wrong, check the logs.
```

**After** — Split into proper quadrants:

**reference.md** (score 88/100):
```markdown
## POST /api/data

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| payload | object | Yes | The data object to process |

**Headers**: `Authorization: Bearer <token>` (required)

**Response** (200 OK):
| Field | Type | Description |
|-------|------|-------------|
| result | object | Processed data |
| request_id | string | Unique request identifier |

**Error responses**: See Troubleshooting §1.
```

## Output Locations

| Output | File Path |
|--------|-----------|
| Audit report | Inline in chat |
| Tutorial | `docs/tutorial.md` |
| How-to guide | `docs/how-to.md` |
| Reference | `docs/reference.md` |
| Troubleshooting | `docs/troubleshooting.md` |

## Key Principles

| Principle | Meaning |
|-----------|---------|
| **One quadrant per document** | Never mix tutorial, how-to, reference, and troubleshooting in one file |
| **Classify before writing** | Know which quadrant you're writing before drafting content |
| **Smell-then-fix** | Always detect issues before rewriting; always re-check output |
| **Audience-first** | Every doc states who it's for and what they need to know already |
| **Verify every action** | Every instruction tells the reader how to confirm it worked |
| **Cross-reference, don't duplicate** | Link between quadrants instead of repeating content |
| **Tables over paragraphs** | When presenting multiple items with attributes, use tables |
| **Active voice** | "Run the command" not "The command should be run" |

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

## Framework Basis

This skill is grounded in:
- **Diátaxis** (https://diataxis.fr/) — Documentation architecture separating tutorials, how-to guides, reference, and explanation/troubleshooting
- **Plain language research** — Writing for comprehension, scannability, and task completion
- **Technical writing best practices** — Active voice, audience awareness, verification steps, structured content
