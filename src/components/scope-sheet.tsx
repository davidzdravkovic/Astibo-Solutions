/**
 * The hero's one memorable element: a scope sheet drawn like an engineering
 * drawing. It shows what a first conversation settles, taken from
 * docs/domain/engagement-model.md. It contains no client data or results.
 */

const rows = [
  {
    term: "The problem",
    note: "What is getting in the way today.",
  },
  {
    term: "The people",
    note: "Who uses it, and who decides.",
  },
  {
    term: "The limits",
    note: "Budget, timing and the systems it has to work with.",
  },
  {
    term: "Left out",
    note: "What we agree not to build yet.",
  },
  {
    term: "First version",
    note: "The smallest thing worth releasing.",
  },
] as const;

export function ScopeSheet() {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-[1.75rem_1fr] gap-3">
        {/* Dimension line: runs the full height of the sheet, with end ticks. */}
        <div aria-hidden="true" className="relative">
          <span className="dim-tick absolute left-1/2 top-0 h-px w-3 -translate-x-1/2 bg-ink" />
          <span className="dim-line absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink" />
          <span className="dim-tick absolute bottom-0 left-1/2 h-px w-3 -translate-x-1/2 bg-ink" />
          <span className="dim-tick absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-paper py-2 text-sm font-medium text-slate [text-orientation:mixed] [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
            First conversation
          </span>
        </div>

        <div className="border border-ink bg-surface p-1.5">
          <div className="border border-rule">
            <h2 className="border-b border-rule px-5 py-4 font-heading text-xl font-semibold">
              What we settle first
            </h2>

            <dl>
              {rows.map((row) => (
                <div
                  key={row.term}
                  className="grid gap-1 border-b border-rule px-5 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
                >
                  <dt className="font-heading font-semibold">{row.term}</dt>
                  <dd className="text-slate">{row.note}</dd>
                </div>
              ))}
            </dl>

            <figcaption className="grid grid-cols-3 text-sm">
              <div className="border-r border-rule px-5 py-3">
                <p className="text-slate">Project</p>
                <p className="font-medium">Yours</p>
              </div>
              <div className="border-r border-rule px-5 py-3">
                <p className="text-slate">Prepared by</p>
                <p className="font-medium">Astibo Solutions</p>
              </div>
              <div className="px-5 py-3">
                <p className="text-slate">Status</p>
                <p className="font-medium">Draft</p>
              </div>
            </figcaption>
          </div>
        </div>
      </div>
    </figure>
  );
}
