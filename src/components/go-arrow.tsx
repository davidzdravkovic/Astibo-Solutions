/** Round arrow affordance for whole-row links. Fills in on row hover. */
export function GoArrow() {
  return (
    <span className="go" aria-hidden="true">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 10h11" />
        <path d="M10.5 5l5 5-5 5" />
      </svg>
    </span>
  );
}
