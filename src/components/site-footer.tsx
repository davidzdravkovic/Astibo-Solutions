import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        <div>
          <p className="font-heading text-xl font-bold tracking-tight">
            {site.name}
          </p>
          <p className="measure mt-3 max-w-sm text-slate">
            Software planning, design and delivery for growing businesses.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-heading font-semibold">Pages</p>
          <ul className="mt-3 space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-heading font-semibold">Get in touch</p>
          <p className="mt-3">
            <a className="link break-all" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-rule">
        <p className="wrap py-5 text-sm text-slate">
          &copy; 2026 {site.name}
        </p>
      </div>
    </footer>
  );
}
