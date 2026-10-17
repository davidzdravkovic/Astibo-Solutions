---
name: website-evidence-research
description: >-
  Runs an evidence-backed research loop for consequential Asibo Solutions website
  decisions (positioning, service pages, proof, CTAs, lead forms, booking).
  Defines a research question, gathers linked sources, assesses applicability and
  strength of evidence, documents a recommendation with confidence and trade-offs,
  and plans validation. Use when making or revisiting those decisions—not for
  minor implementation choices or generic “best website design practices” searches.
---

# Website evidence research

Investigate a **specific decision** in Asibo Solutions’ business context. Do not substitute a vague search for “best practices.”

Primary process basis: [GOV.UK Service Manual — Plan user research](https://www.gov.uk/service-manual/user-research/plan-user-research).

Supporting judgment of evidence strength: [Nielsen Norman Group — Strength of Evidence](https://www.nngroup.com/articles/strength-evidence/).

Structured UX research methods (do not treat e-commerce findings as automatic truths for this consulting site): [Baymard Institute — UX research methodology](https://baymard.com/learn/ux-research-methodology).

Domain facts and constraints live in `docs/domain/`. Persist outcomes in `docs/research/`.

## When to use

Use for consequential decisions about:

- Homepage / offer positioning
- Service page structure and wording
- Proof, testimonials, and claims
- Calls to action
- Contact / lead forms
- Discovery-call booking

Skip for minor layout tweaks, typography polish, or routine coding once a decision is already documented.

## Loop

### 1. Define the question

Write one concrete decision question tied to this business.

Example: *Should the homepage lead with MVP development, websites, or the broader software-engineering offer?*

If the question is vague, narrow it before searching.

### 2. Gather evidence

Search and note:

- Relevant B2B buyer research
- Credible UX studies
- Competitor positioning (as context, not to copy)
- Discussions from people buying software services

Keep **each source linked**. Prefer primary or high-quality secondary sources over SEO listicles.

Write reusable notes only under `docs/research/sources/` — do not dump whole articles into chat context.

### 3. Assess applicability

For each finding, answer:

- Is this about e-commerce, SaaS, agencies, or independent consultants?
- How strong is the evidence (single study vs. converging sources)? See NN/g strength guidance.
- What does it actually establish — and what does it *not* establish for Asibo?

Mark gaps explicitly. Respect `docs/domain/constraints.md` and `content-truth.md`: never invent credentials, clients, or results.

### 4. Make a documented recommendation

Update `docs/research/decisions.md` with:

- **Decision** — what to do
- **Supporting evidence** — with links
- **Contrary evidence** — with links
- **Confidence** — high / medium / low
- **Trade-offs**
- **Facts vs assumptions** — labeled separately
- **Validation plan** — how to test after launch

Do not claim scientific certainty. Provide an evidence-backed reason, state what remains uncertain, and how to validate.

### 5. Test and update

After the site is live, revisit assumptions using:

- Qualified inquiries
- Form completion
- Feedback from prospective clients

Small-scale traffic may not support statistically reliable A/B tests; prefer qualitative and directional signals when volume is low. Update `decisions.md` when evidence changes.

## Method choice

Follow GOV.UK’s guidance: prioritize the research question, then choose the **lowest-cost suitable method** that can produce a useful answer (time, effort, cost).

## Output in chat

When reporting to the owner, keep the reply short:

1. Question
2. Recommendation
3. Confidence + main uncertainties
4. Paths updated under `docs/research/`

## Related files

- `docs/research/README.md` — scope and source-quality standards
- `docs/research/decisions.md` — decision log
- `docs/research/sources/` — substantial reusable notes only
- `docs/domain/` — business source of truth
