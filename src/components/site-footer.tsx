import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark overflow-x-hidden bg-ink text-paper">
      <div className="wrap border-t border-white/15 pt-12 pb-[max(1.25rem,env(safe-area-inset-bottom))] md:pt-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <div className="max-w-[22rem]">
            <p
              className="font-heading text-lg font-semibold tracking-tight text-blue-soft"
              translate="no"
            >
              {site.name}
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-[#c5d0de]">
              Software planning, design and delivery for growing businesses.
            </p>
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

        <div className="mt-8 flex flex-col gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <a
            className="link-draw inline-block max-w-full break-all font-heading text-[clamp(1.15rem,2.4vw,1.75rem)] font-semibold leading-tight tracking-tight"
            href={`mailto:${site.email}`}
            translate="no"
          >
            {site.email}
          </a>
          <p className="shrink-0 text-sm text-[#c5d0de]">
            &copy;&nbsp;2026 {site.name}
          </p>
        </div>
      </div>

      <div className="footer-mark" aria-hidden="true">
        <span translate="no">{site.name}</span>
      </div>
    </footer>
  );
}
