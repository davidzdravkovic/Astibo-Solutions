import type { ReactNode } from "react";
import { ServiceArt } from "@/components/service-art";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children?: ReactNode;
  /** Index of a glossy service shape to show on a dark panel (wide screens). */
  art?: number;
  /** Smaller title for long headings such as article titles. */
  compact?: boolean;
  /** Small line above the title (breadcrumb etc.). */
  top?: ReactNode;
};

/**
 * Opening for inner pages: title words rise in once on load, a line draws
 * along the bottom edge, soft light drifts behind, and an optional glossy
 * shape floats on a dark panel.
 */
export function PageHeader({ title, children, art, compact, top }: Props) {
  const words = title.split(" ");
  const ledeDelay = 220 + words.length * 70;

  return (
    <header className="page-hero">
      <div className="page-hero__orb page-hero__orb--a" aria-hidden="true" />
      <div className="page-hero__orb page-hero__orb--b" aria-hidden="true" />
      <div className="page-hero__grid" aria-hidden="true" />

      <div
        className={cn(
          "wrap relative grid items-center gap-10",
          art !== undefined && "lg:grid-cols-[1.6fr_1fr]",
        )}
      >
        <div className="py-14 md:py-24">
          {top ? (
            <div
              className="page-lede mb-5 text-[0.95rem] font-medium text-slate"
              style={{ animationDelay: "60ms" }}
            >
              {top}
            </div>
          ) : null}
          <h1 className={cn("page-title", compact && "page-title--compact")}>
            {words.map((word, index) => (
              <span key={`${word}-${index}`}>
                <span className="page-title__word">
                  <span
                    className="page-title__in"
                    style={{ animationDelay: `${120 + index * 70}ms` }}
                  >
                    {word}
                  </span>
                </span>
                {index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          {children ? (
            <div
              className="page-lede mt-7 max-w-2xl text-xl text-slate"
              style={{ animationDelay: `${ledeDelay}ms` }}
            >
              {children}
            </div>
          ) : null}
        </div>

        {art !== undefined ? (
          <div className="page-hero__art" aria-hidden="true">
            <div className="page-hero__panel">
              <ServiceArt index={art} />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
