# Research documentation

Evidence and decisions for the Asibo Solutions marketing site (positioning, services, proof, CTAs, forms, booking).

The agent skill `website-evidence-research` defines the loop. This folder stores lasting outcomes—not chat dumps.

## Layout

| Path | Purpose |
|------|---------|
| `README.md` | Scope, source-quality standards, how to apply findings |
| `decisions.md` | Concise decisions, rationale, confidence, validation plan |
| `sources/` | Substantial reusable research notes only |

## Scope

**In scope:** consequential website decisions that change what we claim, offer, or ask visitors to do.

**Out of scope:** minor UI implementation once a decision is recorded; generic “best design practices” without a business question.

## Process (summary)

1. Define one specific question in Asibo’s context.
2. Gather linked evidence (B2B buyers, credible UX studies, competitor context, buyer discussions).
3. Assess applicability and strength of evidence.
4. Document a recommendation with supporting/contrary evidence, confidence, trade-offs, and facts vs assumptions.
5. After launch, validate with inquiries, form completion, and prospect feedback; update decisions.

Aligned with [GOV.UK — Plan user research](https://www.gov.uk/service-manual/user-research/plan-user-research): prioritize research questions and choose methods that produce useful answers for the least time, effort, and cost.

## Source-quality standards

Prefer:

- Primary research reports and established UX / service-design guidance
- Multiple independent sources when claiming stronger confidence ([NN/g — Strength of Evidence](https://www.nngroup.com/articles/strength-evidence/))
- Explicit notes on context (e-commerce vs SaaS vs agency vs solo consultant)

Avoid treating as transferable without assessment:

- Unsourced listicles and “top 10” SEO posts
- Baymard or other e-commerce benchmarks applied wholesale to a consulting site ([Baymard methodology](https://baymard.com/learn/ux-research-methodology) is useful for *how* to research, not automatic copy of e-commerce findings)
- Competitor marketing claims presented as our proof

Every retained note in `sources/` must include **title, URL, date accessed, and what it establishes for Asibo**.

## How to apply findings

1. Read `docs/domain/` for constraints and truth boundaries before recommending claims.
2. Check `decisions.md` for an existing answer before starting new research.
3. If recommending a change, update `decisions.md` and add a note under `sources/` only when the note is worth reusing.
4. Never invent clients, metrics, or testimonials to fill evidence gaps—use `NONE` / open questions instead.
5. Prefer the lowest-cost method that can answer the question; small traffic may not support reliable A/B tests.

## Key principle

Provide an evidence-backed reason, state what remains uncertain, and show how to validate—do not claim every choice is scientifically proven.
