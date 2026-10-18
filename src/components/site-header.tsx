"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Hide on scroll down, return on scroll up (or when anything inside is focused).
  useEffect(() => {
    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (y < 80 || y < lastY - 6) setHidden(false);
      else if (y > lastY + 6 && y > 160) setHidden(true);
      if (Math.abs(y - lastY) > 6) lastY = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "sticky top-0 z-50 border-b border-rule bg-paper/95 text-ink backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none",
        hidden && !open && "-translate-y-full",
      )}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-heading text-xl font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "py-2 text-[0.95rem] font-medium underline-offset-[0.5em] hover:underline",
                    isCurrent(item.href) &&
                      "underline decoration-2 decoration-blue",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact/" className={buttonVariants()}>
            Discuss a project
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 items-center rounded-sm border border-input bg-card px-4 text-[0.95rem] font-medium text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Main"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-rule bg-paper text-ink shadow-[0_12px_24px_-16px_rgba(14,27,44,0.35)] md:hidden"
      >
        <ul className="wrap py-2">
          {nav.map((item) => (
            <li
              key={item.href}
              className="border-b border-rule last:border-b-0"
            >
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={cn(
                  "block py-4 font-heading text-2xl font-semibold",
                  isCurrent(item.href) && "text-blue",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="py-4">
            <Link
              href="/contact/"
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ size: "lg" }), "w-full")}
            >
              Discuss a project
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
