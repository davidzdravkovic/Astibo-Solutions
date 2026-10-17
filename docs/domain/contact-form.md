# Contact / lead form

## Purpose
Collect enough information to decide whether a conversation is useful without making the first step feel like a procurement form.

## Proposed fields
- **Required:** name, email, short description of the problem or project.
- **Optional:** company / website, service of interest, approximate budget range, desired timing.
- **Do not request:** passwords, sensitive personal data, confidential source code, or detailed proprietary information.

## Behavior (PROPOSED)
- Validate required fields on both client and server.
- Show clear success and failure states; preserve entered data after a recoverable failure.
- Add proportionate spam protection and server-side rate limiting.
- Send the lead to a verified owner-controlled inbox or CRM; destination is **OPEN**.
- Send an acknowledgement to the visitor only if configured; do not imply the message has been reviewed immediately.
- Do not expose API keys, email credentials, or private routing details in the browser.
- Collect only data needed for the inquiry and publish an appropriate privacy notice before launch.

## Version 1 decision (CONFIRMED by owner)
Version 1 is static files with no backend. The form validates in the browser, then opens the visitor's email app with a prefilled message addressed to davidzdravkovic21@gmail.com (`mailto:`). Nothing is stored or sent by the site itself, so server-side validation, rate limiting, spam protection and auto-reply do not apply until a backend exists. The page must say plainly that nothing is sent until the visitor presses send in their email app. Budget and timing fields are not included in version 1.

## OPEN decisions
Destination, email provider, spam mechanism, auto-reply wording, retention period, privacy notice, and whether budget/timing fields are enabled.
