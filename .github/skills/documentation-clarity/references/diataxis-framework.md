# Reference: The Diátaxis Documentation Framework

This reference covers the theoretical foundation of the Diátaxis framework used by the `documentation-clarity` skill. For task-oriented usage, see the SKILL.md instructions.

**Source**: https://diataxis.fr/ (Daniele Procida)

---

## The Two Axes

Diátaxis organizes documentation along two independent axes:

| Axis | Pole A | Pole B |
|------|--------|--------|
| **User's need** | Study (acquiring knowledge) | Work (applying knowledge) |
| **Content orientation** | Practical (doing) | Theoretical (knowing) |

The intersection of these axes creates four quadrants. Each quadrant demands a different writing approach, structure, and voice.

---

## Quadrant Deep Dive

### Tutorial (Practical + Study)

**What it is**: A learning experience. The reader follows a guided path to build something, gaining competence through doing.

**The analogy**: Teaching a child to cook by cooking together — you choose the recipe, you guide each step, the child learns by doing.

**Key properties**:
- The author is in control, not the reader
- Steps are strictly ordered — no branching
- The goal is *learning*, not *completing a task*
- Every step must produce a visible result the learner can verify
- Explains only what's necessary for the current step — not everything
- Uses "we" voice to create a guided experience

**Common failures**:
- Including exhaustive reference material ("while we're here, let me explain all 47 options…")
- Offering choices ("you can use X or Y") — tutorials make all decisions
- Teaching concepts abstractly instead of through concrete actions
- Steps that don't produce verifiable results

**Structure template**:
```
# Tutorial: [What you will build]

## What you'll learn
## Prerequisites
## Step 1: [Action with verifiable result]
## Step 2: [Action with verifiable result]
## …
## What you learned
## Next steps
```

---

### How-to Guide (Practical + Work)

**What it is**: A recipe for accomplishing a specific real-world goal. The reader has a task to complete and needs efficient, reliable instructions.

**The analogy**: A recipe in a cookbook — it assumes you know how to chop, sauté, and measure; it gives you the specific steps for *this dish*.

**Key properties**:
- The reader is in control — they came with a goal
- Assumes the reader has competence; doesn't teach fundamentals
- Handles real-world complexity (branches, conditions, alternatives)
- Titles name the goal ("How to deploy to staging")
- Uses direct imperative voice ("Run…", "Configure…")
- Includes prerequisites explicitly

**Common failures**:
- Teaching foundational concepts (that's a tutorial's job)
- Listing all options exhaustively (that's reference's job)
- Only covering the happy path (real tasks hit edges)
- Vague titles ("Deployment" instead of "How to deploy to staging")

**Structure template**:
```
# How to [achieve goal]

## Prerequisites
## Step 1: [Action]
  - Verify: [how to confirm]
## Step 2: [Action]
  - If [condition]: [alternative step]
  - Verify: [how to confirm]
## …
## Related
- [Link to reference for full option details]
- [Link to troubleshooting if things go wrong]
```

---

### Reference (Theoretical + Work)

**What it is**: A factual, exhaustive, lookup-oriented description of the system. Like a dictionary, encyclopedia, or API documentation.

**The analogy**: A reference book — you don't read it cover to cover, you look up what you need.

**Key properties**:
- Organized by the structure of the thing it describes (not by user tasks)
- Exhaustive — includes everything
- Uses tables, lists, schemas — not narrative prose
- Austere, neutral voice — states facts
- Types, defaults, constraints, valid ranges — all present
- No "why", no tutorials, no walkthroughs

**Common failures**:
- Including tutorial walkthroughs ("Let's try an example…")
- Explaining *why* things work the way they do (that's explanation's job)
- Omitting edge cases, constraints, or less common options
- Using narrative prose instead of structured lookup formats

**Structure template**:
```
# [System/API/Component] Reference

## Overview (one paragraph max)
## [Section matching code/API structure]
  | Parameter | Type | Default | Description |
  |-----------|------|---------|-------------|
## [Next section]
## See also
- [Link to tutorial for learning]
- [Link to how-to for tasks]
```

---

### Troubleshooting (Theoretical + Work)

**What it is**: Diagnostic-oriented content that helps users identify and fix specific problems. Organized by symptoms, not by system structure.

**The analogy**: A car repair manual's troubleshooting section — "If you hear grinding noise when braking" → cause → fix → verify.

**Key properties**:
- Organized by *symptoms* (what the user observes), not by system components
- Each entry follows: Symptom → Cause → Fix → Verify
- Includes the exact error message or observable symptom
- Provides diagnostic commands to narrow the cause
- Includes the fix AND how to confirm it worked
- Links to how-to or reference for deeper context

**Common failures**:
- Organizing by system component instead of by symptom
- Missing the exact error message (users search by what they see)
- Providing a fix without verification ("do X" — but did it work?)
- Only covering obvious causes; missing edge cases

**Structure template**:
```
# Troubleshooting

## [Exact symptom or error message]

**Symptom**: [What the user observes — exact text, screenshot, behavior]

**Likely cause**: [Why this happens]

**Diagnosis**:
1. Run `[diagnostic command]`
2. Check for [specific indicator]

**Fix**:
1. [Step to resolve]
2. [Step to resolve]

**Verify**: [How to confirm the fix worked]

**See also**: [Link to related reference or how-to]
```

---

## Why Separation Matters

Mixed documentation creates compounding problems:

| Problem | Root Cause | Impact |
|---------|-----------|--------|
| Users can't find what they need | Content for different needs is interleaved | Time wasted, frustration |
| Docs are hard to maintain | Changes to one concern ripple through mixed content | Docs go stale faster |
| New content has no clear home | No structural principle for where to put things | Docs grow as a dump |
| Different audiences are poorly served | One doc tries to serve learners AND experts | Neither group is satisfied |

Diátaxis solves this by giving every piece of content a clear, unambiguous home. If you're writing a guided learning exercise, it goes in a tutorial. If you're documenting an API parameter, it goes in reference. If you need to cross-reference, you link — you don't duplicate.

---

## Diátaxis vs. Other Frameworks

| Framework | Scope | Overlap with Diátaxis |
|-----------|-------|----------------------|
| **Diátaxis** | Documentation architecture (4 quadrants) | — |
| **DITA** (Darwin Information Typing Architecture) | XML-based content typing (concept, task, reference) | Similar separation but adds "concept" and omits tutorial vs how-to distinction |
| **Docs as Code** | Documentation tooling philosophy (Git, CI, Markdown) | Orthogonal — Diátaxis is about *content architecture*, Docs as Code is about *tooling* |
| **README-driven development** | Start with the README | Complementary — the README can link to Diátaxis quadrant docs |

---

## Further Reading

- Diátaxis official site: https://diataxis.fr/
- Daniele Procida — "What nobody tells you about documentation" (PyCon 2017)
- The Grand Unified Theory of Documentation: https://diataxis.fr/compass/
