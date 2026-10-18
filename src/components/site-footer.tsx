import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-paper">
      <div className="wrap border-t border-white/15 pt-14 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr]">
          <div>
            <p className="font-heading text-lg font-semibold text-blue-soft">
              {site.name}
            </p>
            <p className="mt-2 max-w-sm text-white/70">
              Software planning, design and delivery for growing businesses.
            </p>
            <a
              className="link-draw mt-8 inline-block break-all font-heading text-[clamp(1.4rem,3.4vw,2.6rem)] font-semibold leading-tight"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>

          <nav aria-label="Footer">
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

        <p className="mt-14 text-sm text-white/60">&copy; 2026 {site.name}</p>
      </div>

      <Reveal className="footer-mark mt-6">
        <span aria-hidden="true" className="wrap">
          {site.name}
        </span>
      </Reveal>
    </footer>
  );
}
