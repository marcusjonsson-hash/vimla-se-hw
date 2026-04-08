# Requirements Clarity

A standards-backed requirements engineering skill that transforms vague ideas into precise, testable, atomic specifications. Grounded in IEEE 830, ISO/IEC/IEEE 29148, and requirements-smells research.

## Purpose

Prevents costly misunderstandings and rework by ensuring requirements are **clear, testable, atomic, traceable, unambiguous, prioritized, and context-linked** before implementation begins. Uses automated smell detection (13 issue types), a 100-point scoring rubric, and structured rewrite patterns to systematically eliminate ambiguity.

## When to Use This Skill

### Use When
- Requirements are vague or ambiguous (e.g., "add login feature", "make it fast", "create dashboard")
- You need to review/refine existing requirements for quality
- Generating acceptance criteria and test cases from a requirement
- Building a traceability matrix (source → requirement → tests)
- Resolving conflicting requirements across a specification
- Preparing a PRD for development handoff

### Don't Use When
- Specific file paths are mentioned (e.g., "fix auth.go:45")
- Code snippets are included for review/editing
- Bug fixes with clear reproduction steps
- The user explicitly asks for code, not requirements

## How It Works

### The 7 Quality Attributes

Every requirement is evaluated against seven attributes derived from IEEE 830 and ISO 29148:

| Attribute | Key Question |
|-----------|-------------|
| **Clear** | Can the intended audience understand it without tribal knowledge? |
| **Testable** | Can a finite procedure determine pass/fail objectively? |
| **Atomic** | Does it express exactly one capability/constraint? |
| **Traceable** | Does it link to its origin and to tests? |
| **Unambiguous** | Does it have only one possible interpretation? |
| **Prioritized** | Is its importance labeled with rationale? |
| **Context-linked** | Are actor, preconditions, and constraints stated? |

### The 13 Quality Issues Detected

The skill scans for these common "requirement smells" using regex patterns and NLP heuristics:

| # | Issue Label | What It Catches |
|---|------------|----------------|
| 1 | `AmbiguousTerm` | Subjective words: "user-friendly", "intuitive", "fast", "modern" |
| 2 | `NonTestable` | Unverifiable verbs: "ensure", "support", "provide" |
| 3 | `CombinedReq` | Multiple "shall" statements or "and/or" joining behaviors |
| 4 | `MissingAC` | No acceptance criteria or pass/fail conditions |
| 5 | `MissingActor` | Passive voice hides who is responsible |
| 6 | `MissingMetric` | Performance/quality claims without numbers or units |
| 7 | `AssumptionHidden` | Unstated preconditions (assumes auth, data exists) |
| 8 | `Conflict` | Contradictory thresholds across requirements |
| 9 | `ScopeCreep` | Mixes unrelated features in one requirement |
| 10 | `SolutionOriented` | Names technology without justification |
| 11 | `UIUnclear` | "Provide a dashboard" without widgets, states, data |
| 12 | `SecurityGap` | Stores sensitive data without security constraints |
| 13 | `Loophole` | Escape clauses: "as far as possible", "if feasible", "etc." |

### The Clarification Process

```
┌─────────────────────────────────────────────────────────────────┐
│  1. ANALYZE        Parse input → run smell detection →          │
│                    score (0-100) → flag issues                  │
│                                                                 │
│  2. CLARIFY        Ask 2-3 targeted questions per round →       │
│                    update score → repeat until ≥ 85             │
│                                                                 │
│  3. REWRITE        Apply rewrite patterns → add context →       │
│                    add AC → generate test cases → add traces    │
│                                                                 │
│  4. OUTPUT         YAML requirements / PRD / both               │
│                    with traceability matrix                      │
└─────────────────────────────────────────────────────────────────┘
```

**Step 1 — Initial Analysis**:
- Parses the requirement text
- Runs regex + NLP smell detection against all 13 issue types
- Scores clarity (0-100) across the 7 quality attributes
- Presents: score, detected issues table, clear aspects, and first round of questions

**Step 2 — Interactive Clarification**:
- Asks 2–3 focused questions per round (never overwhelming)
- Starts with highest-impact gaps (Errors before Warnings)
- Updates score transparently after each response
- Continues until score ≥ 85/100

**Step 3 — Rewrite & Structure**:
- Rewrites each requirement to satisfy all 7 attributes
- Adds acceptance criteria (Given/When/Then with metrics, ≥ 2 per requirement)
- Generates test cases (positive + negative + boundary, ≥ 3 per requirement)
- Adds traceability links (source ↔ requirement ↔ tests)
- Re-runs smell detection on its own output as a final quality gate

**Step 4 — Output Generation**:
- YAML: Structured requirement blocks with all fields
- PRD: Full document saved to `./docs/prds/{feature-name}-v{version}-prd.md`
- Both: YAML blocks embedded in PRD structure

### Scoring Rubric (100 points)

```
Quality Attributes (85 points):
  Clear (actor + behavior + object explicit)         /15
  Testable (measurable AC with thresholds)           /15
  Atomic (one "shall", no compound behaviors)        /10
  Traceable (source link + test links)               /10
  Unambiguous (no vague terms, no pronouns)          /15
  Prioritized (priority label + rationale)           /10
  Context-linked (actor, preconditions, constraints) /10

Completeness (15 points):
  Acceptance criteria present (≥2 per requirement)   /10
  Edge cases / error handling considered              /5
```

### Severity Rules

The `STAGE` configuration determines how strictly issues are enforced:

- **Exploration**: All issues are Warnings (informational, for early-stage brainstorming)
- **Implementation-ready**: `NonTestable`, `Conflict`, `MissingAC`, and missing traceability become Errors that block output generation

## Configuration

| Variable | Options | Default | Purpose |
|----------|---------|---------|---------|
| `AUDIENCE` | dev, QA, product, compliance, mixed | mixed | Adjusts language and depth |
| `PRIORITY_SCHEME` | MoSCoW, P0-P3, Critical/High/Medium/Low | P0-P3 | Priority labeling |
| `AC_STYLE` | Gherkin, bullet, checklists | Gherkin | Acceptance criteria format |
| `OUTPUT_FORMAT` | YAML, PRD, both | both | What gets generated |
| `STAGE` | exploration, implementation-ready | exploration | Severity enforcement |

## Usage Examples

### Example 1: Vague Feature Request

**User Input:**
```
I need a login feature for my app.
```

**Skill Response:**
```markdown
**Clarity Score**: 15/100

**Detected Issues**:
| # | Issue             | Evidence                      | Severity |
|---|-------------------|-------------------------------|----------|
| 1 | `MissingActor`    | No user role specified         | Warning  |
| 2 | `MissingAC`       | No acceptance criteria         | Warning  |
| 3 | `AssumptionHidden` | Auth method, tech stack unknown | Warning  |
| 4 | `MissingMetric`   | No security/performance bounds | Warning  |

**Clear Aspects**:
- Core need identified: authentication functionality

**Needs Clarification**:
1. **MissingActor**: Who logs in? Single user type or multiple roles?
   - Example: Admin vs regular user with different permissions
2. **AssumptionHidden**: What authentication method?
   - Example: Email/password, OAuth (Google/GitHub), SSO, magic links?
3. **MissingMetric**: Any security requirements?
   - Example: 2FA, account lockout after N failures, session duration?
```

### Example 2: Rewrite with Before/After

**Before** (score 20/100):
```
The system should be user-friendly and handle many users efficiently.
```

**After** (score 90/100):
```yaml
- id: REQ-UX-001
  title: Task completion time for primary workflow
  statement: >
    The system shall enable users with role "StandardUser" to complete
    the primary workflow task in ≤ 3 minutes with ≤ 1 error, as measured
    in a usability test with ≥ 10 participants.
  priority: P1
  smells_cleared: [AmbiguousTerm, MissingActor, MissingMetric]

- id: REQ-PERF-001
  title: Concurrent user capacity
  statement: >
    The system shall maintain p95 response time ≤ 500 ms under a
    sustained load of 1000 concurrent users for 30 minutes.
  priority: P1
  smells_cleared: [AmbiguousTerm, NonTestable, CombinedReq, MissingMetric]
```

### Example 3: Conflict Detection

**Input:**
```
REQ-A: Password maximum length is 12 characters.
REQ-B: Password must support up to 64 characters.
```

**Output:**
```markdown
**Conflict Report**:
| Conflicting IDs | Type      | Evidence         | Resolution                     |
|----------------|-----------|------------------|--------------------------------|
| REQ-A, REQ-B   | Threshold | max=12 vs max=64 | Reconcile to 12–64; deprecate REQ-A |
```

## Output Locations

| Output | File Path |
|--------|-----------|
| PRD document | `./docs/prds/{feature-name}-v{version}-prd.md` |
| YAML requirements | Inline in chat or embedded in PRD §3 |

## Key Principles

| Principle | Meaning |
|-----------|---------|
| **Fitness-for-purpose** | Requirements quality is relative to audience and stage — adjust formality accordingly |
| **Problem-space focus** | State WHAT/WHY, not HOW; use laddering to convert solution-oriented text |
| **Smell-then-fix** | Always detect issues before rewriting; always re-check output |
| **Atomic by default** | One "shall" per requirement; split ruthlessly |
| **UNSPECIFIED > guessing** | Mark unknowns explicitly rather than inventing values |
| **Traceability is mandatory** | Every requirement links to source and to tests |

## Success Criteria

A successful requirements clarification session produces:

- ✅ Clarity score ≥ 85/100
- ✅ All requirements satisfy the 7 quality attributes
- ✅ Zero unresolved Error-severity smells
- ✅ Every requirement has ≥ 2 acceptance criteria and ≥ 1 test case
- ✅ Traceability matrix complete (no orphans, no untested requirements)
- ✅ Output is immediately actionable for the target audience

## Standards & Research Basis

This skill is grounded in:
- **IEEE Std 830-1998** — Software Requirements Specification quality goals (unambiguous, verifiable, ranked, traceable)
- **ISO/IEC/IEEE 29148:2018** — Requirements engineering lifecycle and well-formed requirement properties
- **Requirements smells research** — Empirically validated linguistic patterns for automated quality detection
- **Quality-in-use / fitness-for-purpose** — Context-sensitive quality assessment (audience, stage, domain)
