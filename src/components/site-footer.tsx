import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap border-t border-white/15 pt-14 md:pt-20">
        <div className="flex flex-col gap-12 sm:flex-row sm:items-start sm:justify-between sm:gap-16">
          <div className="max-w-md">
            <p className="font-heading text-lg font-semibold text-blue-soft">
              {site.name}
            </p>
            <p className="mt-2 text-white/70">
              Software planning, design and delivery for growing businesses.
            </p>
          </div>

          <nav aria-label="Footer" className="sm:min-w-[10rem] sm:text-right">
            <p className="font-heading font-semibold text-blue-soft">Pages</p>
            <ul className="mt-3 space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-draw inline-block py-1 text-lg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <a
          className="link-draw mt-12 block break-all text-center font-heading text-[clamp(1.25rem,3.2vw,2.25rem)] font-semibold leading-tight sm:mt-16"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>

        <p className="mt-10 text-center text-sm text-white/60">
          &copy; 2026 {site.name}
        </p>
      </div>

      <Reveal className="footer-mark mt-8">
        <span aria-hidden="true">{site.name}</span>
      </Reveal>
    </footer>
  );
}
