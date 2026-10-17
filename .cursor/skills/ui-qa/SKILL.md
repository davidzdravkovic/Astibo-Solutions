---
name: ui-qa
description: Inspect screenshots, test responsive layouts and interactions, fix defects, and repeat until acceptance criteria pass. Use when QA'ing UI, verifying visual acceptance criteria, checking responsiveness, or polishing frontend bugs found in the browser.
---

# UI QA

Run a tight inspect → fix → retest loop until the UI meets the acceptance criteria.

## When to use

- Visual QA of pages or components
- Responsive checks (desktop + mobile)
- Interaction bugs (click, hover, focus, forms, navigation)
- "Looks wrong" or "broken on mobile" reports

## Workflow

1. **Confirm acceptance criteria**
   - If the user did not provide them, ask for the target breakpoints, must-pass interactions, and any reference (design file, screenshot, or written brief).
   - Default breakpoints when unspecified: desktop (~1440px) and mobile (~390px).

2. **Inspect**
   - Open the page with available browser tools (prefer the connected Cursor browser MCP).
   - Capture screenshots at the target breakpoints.
   - Check layout, spacing, typography, contrast, overflow, stacking, and focus visibility.
   - Exercise primary interactions: navigation, buttons, forms, menus, dialogs, hover/focus states.

3. **Diagnose**
   - List defects with severity: blocking / major / minor.
   - Tie each defect to a concrete file or selector when possible.

4. **Fix**
   - Patch the smallest set of files that resolves the defects.
   - Prefer existing project patterns, tokens, and components over one-off styles.

5. **Retest**
   - Re-open the page, re-capture screenshots, and re-run the same interactions.
   - Repeat until all blocking and major defects are gone, and agreed acceptance criteria pass.

6. **Report**
   - Summarize what was checked, what was fixed, and any remaining minor issues or known limitations.

## Acceptance gate

Do not stop while any of these remain true:

- Content overflows or is clipped at an agreed breakpoint
- Primary CTA or navigation is unusable
- Focus is invisible or keyboard path is broken for core flows
- Layout collapses into overlapping or unreadable stacks on mobile
- Agreed acceptance criteria from the user are unmet

## Notes

- Prefer browser snapshot + screenshot over guessing from code alone.
- If Playwright or Chrome DevTools MCP is available, use it for deeper interaction or console/network diagnosis; otherwise use the built-in Cursor browser tools.
- Pair with `frontend-design`, `web-design-guidelines`, `ui-ux-pro-max`, or `avoid-ai-design` when the issue is aesthetic quality rather than functional breakage.
