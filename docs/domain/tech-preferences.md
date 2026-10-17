# Technical preferences

This file records implementation decisions. An example is not a decision; items marked **OPEN** require owner approval.

## Current status
- **Version 1 scope:** static files only, no backend. **CONFIRMED** (provided by owner).
- **Framework / language:** Next.js with TypeScript, built as a static export (`output: "export"`). **CONFIRMED** (provided by owner).
- **UI component library / styling:** Tailwind CSS and shadcn/ui. **CONFIRMED** (provided by owner).
- **Hosting / deployment:** OPEN.
- **Domain / DNS:** OPEN.
- **Email delivery provider:** OPEN.
- **Booking provider:** OPEN.
- **Lead destination (email / CRM):** davidzdravkovic21@gmail.com via `mailto:` in version 1. **CONFIRMED** (provided by owner).
- **Analytics / consent approach:** OPEN.
- **CMS or content editing needs:** OPEN.
- **Repository / CI / preview deployments:** OPEN.

## Selection principles (PROPOSED)
- Choose the simplest stack that meets the site's requirements and is maintainable by one person.
- Prefer accessible, responsive, performant pages and a small dependency footprint.
- Keep secrets on the server or in deployment secrets, never in client-side code.
- Use established services for email and booking unless custom behavior justifies owning that complexity.
- Include basic validation, spam protection, error handling, backups where applicable, and a documented deployment process.

Do not choose or install a stack, email provider, calendar provider, analytics service, or paid tool until the owner approves the choice.
