# Reference: Documentation Quality Standards

This reference documents the quality standards, detection patterns, and scoring methodology used by the `documentation-clarity` skill.

---

## The 12 Documentation Smells — Full Reference

### Detection Pattern Details

#### 1. WrongQuadrant
- **Severity**: Error
- **Detection**: Tutorial-style language in reference docs, reference tables in tutorials, troubleshooting in how-tos
- **Regex**: `(let's|let us|we will|we'll|follow along|walk through|try this)` in files classified as Reference
- **Fix**: Extract content to the correct quadrant file; leave a cross-reference link

#### 2. MixedModes
- **Severity**: Error
- **Detection**: Single document containing both ordered step-by-step instructions AND exhaustive lookup tables
- **Regex**: Combined presence of `^\d+\.\s+` (numbered steps) and `^\|.*\|.*\|.*\|` (tables with 3+ columns) in the same document
- **Fix**: Split into separate how-to and reference files

#### 3. MissingAudience
- **Severity**: Warning
- **Detection**: No audience, prerequisite, or "who this is for" statement in the first 20 lines
- **Regex**: Absence of `(audience|prerequisite|who this|you should know|you need|before you begin|assumed knowledge)`
- **Fix**: Add audience statement and prerequisites at the top

#### 4. WallOfText
- **Severity**: Warning
- **Detection**: More than 5 consecutive non-empty lines without a structural element (heading, list, table, code block)
- **Regex**: `((?:[^\n]+\n){6,})(?!\s*[-*#|` `` ` ``])`
- **Fix**: Break into headings, lists, tables, or code blocks

#### 5. UndefinedJargon
- **Severity**: Warning
- **Detection**: Acronyms or domain-specific terms used without definition
- **Regex**: `\b[A-Z]{2,}(?!\s+[-–])\b` (acronyms without inline definition), plus domain-term heuristics
- **Fix**: Define on first use with parenthetical, or link to glossary

#### 6. MissingContext
- **Severity**: Warning
- **Detection**: Imperative instructions without a "why" or "when" clause
- **Regex**: `^(Run|Execute|Add|Configure|Set|Create|Delete|Update)\s+` without preceding context sentence
- **Fix**: Add a context sentence before the instruction explaining when/why

#### 7. BrokenSequence
- **Severity**: Error
- **Detection**: Steps that reference outputs or states from later steps; prerequisites missing from sequence
- **Detection method**: NLP — parse step references and check for forward dependencies
- **Fix**: Reorder steps so dependencies flow forward; add missing prerequisite steps

#### 8. NoVerification
- **Severity**: Warning
- **Detection**: Action steps without confirmation instructions
- **Regex**: `(run|execute|install|deploy|create|configure)\b` without nearby `(verify|confirm|check|should see|expected output|you should now)`
- **Fix**: Add verification step after each significant action

#### 9. StaleContent
- **Severity**: Error
- **Detection**: References to deprecated APIs, old versions, or removed features
- **Detection method**: Compare version references against known current versions; flag `v1` references when `v3` exists
- **Fix**: Update to current; add version badges; add deprecation notices with migration paths

#### 10. MissingErrorPath
- **Severity**: Warning
- **Detection**: Instructions that only cover the success path without error handling
- **Regex**: Absence of `(if.*fail|error|issue|problem|troubleshoot|wrong|unable)` in how-to or tutorial sections
- **Fix**: Add error handling, edge cases, and links to troubleshooting docs

#### 11. PassiveVoice
- **Severity**: Warning
- **Detection**: Excessive use of passive voice constructions
- **Regex**: `\b(is|are|was|were|be|been|being)\s+\w+ed\b`
- **Threshold**: Flag when >30% of sentences are passive
- **Fix**: Rewrite to active voice with explicit subject

#### 12. InconsistentTerminology
- **Severity**: Warning
- **Detection**: Same concept referred to by multiple terms in one document
- **Detection method**: NLP — build term frequency map; flag synonyms used for the same concept (e.g., "config" / "configuration" / "settings" / "options")
- **Fix**: Standardize on one term; add aliases in glossary if needed

---

## Scoring Methodology

### Per-Document Scoring

Each document is scored out of 100 points across four categories:

| Category | Weight | What it measures |
|----------|--------|-----------------|
| Quadrant Alignment | 25 | Content serves one quadrant; structure matches conventions |
| Clarity & Readability | 25 | Active voice, reading level, terminology, jargon |
| Completeness | 25 | Audience stated, verification present, error paths, context, currency |
| Structure & Navigation | 25 | Heading hierarchy, scannability, meaningful headings, cross-refs |

### Doc-Set Scoring

When auditing a full documentation set, additional bonus points apply:

| Bonus Category | Points | What it measures |
|----------------|--------|-----------------|
| Quadrant Coverage | +10 | All four quadrants present or explicitly excluded; no content gaps |
| Cross-Doc Consistency | +10 | Shared terminology, consistent formatting, unified glossary |

### Score Interpretation

| Score Range | Interpretation | Recommended Action |
|-------------|---------------|-------------------|
| 90–100 | Excellent — production-ready | Minor polish only |
| 80–89 | Good — meets quality bar | Address remaining warnings |
| 60–79 | Fair — needs improvement | Address errors; rewrite weak sections |
| 40–59 | Poor — significant issues | Major restructuring needed |
| 0–39 | Critical — fundamentally broken | Start from scaffold templates |

---

## Quadrant-Specific Structure Requirements

### Tutorial Structure Checklist
- [ ] Starts with concrete outcome ("By the end you will have…")
- [ ] States prerequisites
- [ ] Uses numbered steps in strict sequence
- [ ] Every step produces a verifiable result
- [ ] Uses "we" voice
- [ ] No choices or alternatives presented
- [ ] Ends with "what you learned" + "next steps"

### How-to Structure Checklist
- [ ] Title names the goal ("How to…")
- [ ] States prerequisites
- [ ] Uses imperative voice ("Run…", "Add…")
- [ ] Handles branching conditions ("If X, then…")
- [ ] Each step is independently verifiable
- [ ] Links to reference for option details
- [ ] Links to troubleshooting for error scenarios

### Reference Structure Checklist
- [ ] Organized by system/API structure (not by user task)
- [ ] Uses tables, lists, schemas — not prose
- [ ] Includes ALL parameters, options, return values
- [ ] States types, defaults, constraints, valid ranges
- [ ] No tutorial walkthroughs or "why" explanations
- [ ] Alphabetical or structural ordering

### Troubleshooting Structure Checklist
- [ ] Titles are symptoms or exact error messages
- [ ] Each entry: Symptom → Cause → Fix → Verify
- [ ] Includes exact error text for searchability
- [ ] Provides diagnostic commands
- [ ] Fix includes verification step
- [ ] Links to related how-to or reference

---

## Automated Detection Regex Patterns

Full pattern set for documentation lint:

```
# Passive voice
PASSIVE_VOICE       = \b(is|are|was|were|be|been|being)\s+\w+ed\b

# Wall of text (6+ consecutive non-structural lines)
WALL_OF_TEXT        = ((?:[^\n]+\n){6,})(?!\s*[-*#|`])

# Hedge words (indicate uncertainty — often a sign of vague docs)
HEDGE_WORDS         = \b(might|maybe|perhaps|possibly|generally|usually|sometimes|often|typically)\b

# Vague references (pronouns without clear antecedent)
VAGUE_REFS          = \b(this|that|these|those|it|above|below|the following|the previous)\b(?!\s+(section|table|diagram|figure|step))

# Acronyms without definition
JARGON_INDICATORS   = \b[A-Z]{2,}(?!\s+[-–])\b

# Actions without verification
MISSING_VERIFY      = (?:run|execute|install|deploy|create|configure)\b(?!.*(?:verify|confirm|check|should\s+see|expected\s+output))

# Tutorial language in non-tutorial docs
TUTORIAL_IN_REF     = (let's|let us|we will|we'll|follow along|walk through|try this)

# Mixed numbered steps and tables in same doc
MIXED_IMPERATIVE    = (#{1,3}\s+.+\n(?:.*\n)*?(?:^\d+\.\s+)(?:.*\n)*?(?:^\|))
```

---

## Research and Standards Basis

| Source | Contribution to this skill |
|--------|---------------------------|
| **Diátaxis** (Daniele Procida) | Four-quadrant documentation architecture; separation of user needs |
| **Plain Language guidelines** (plainlanguage.gov) | Active voice, short sentences, audience-first design |
| **Nielsen Norman Group** — "How Users Read on the Web" | Scanning behavior; structural elements over prose |
| **Google Developer Documentation Style Guide** | Imperative voice for instructions; audience specification; terminology consistency |
| **Microsoft Writing Style Guide** | Active voice, scannability, task-orientation |
| **readability research** (Flesch-Kincaid, Coleman-Liau) | Reading level assessment for audience appropriateness |
