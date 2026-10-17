# Discovery-call booking

## Purpose
Let a suitable prospect book a short conversation about their business problem and potential project.

## Proposed behavior
- Offer a **20–30 minute** introductory call as a starting recommendation; owner approval required.
- Use a booking provider rather than building a custom calendar unless there is a specific requirement.
- Show the visitor the meeting time in their local timezone and make the timezone explicit in confirmation.
- Configure availability, minimum notice, buffers, cancellation/rescheduling, and a limit on advance booking.
- Ask only for name, email, company (optional), and a short project summary.
- Confirmation should state the date/time, duration, meeting method, and how to reschedule or cancel.
- Do not show availability that is not synchronized with the owner's real calendar.

## OPEN decisions
Provider (e.g. Cal.com or Calendly), calendar account, duration, availability, meeting platform, buffers, booking horizon, required questions, and reminder settings.

Do not implement a provider integration or claim booking is live until the owner selects and configures it.
