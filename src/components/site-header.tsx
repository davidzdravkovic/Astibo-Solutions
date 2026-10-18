"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [bar, setBar] = useState({ x: 0, w: 0, show: false });

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

  const activeIndex = nav.findIndex((item) => isCurrent(item.href));
  const barIndex = hover ?? activeIndex;

  const measure = useCallback(() => {
    const li = listRef.current?.children[barIndex] as HTMLElement | undefined;
    if (!li) {
      setBar((b) => ({ ...b, show: false }));
      return;
    }
    setBar({ x: li.offsetLeft, w: li.offsetWidth, show: true });
  }, [barIndex]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

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
          className="shrink-0 whitespace-nowrap font-heading text-xl font-bold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-8">
          <ul
            ref={listRef}
            className="relative flex items-center gap-4 pb-1 lg:gap-8"
            onMouseLeave={() => setHover(null)}
            onBlur={() => setHover(null)}
          >
            {nav.map((item, index) => (
              <li
                key={item.href}
                onMouseEnter={() => setHover(index)}
                onFocus={() => setHover(index)}
              >
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? "page" : undefined}
                  className={cn(
                    "block py-2 text-[0.95rem] font-medium transition-colors",
                    isCurrent(item.href) ? "text-ink" : "text-slate hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <span
              aria-hidden="true"
              className="nav-bar"
              style={{
                width: bar.w,
                transform: `translateX(${bar.x}px)`,
                opacity: bar.show ? 1 : 0,
              }}
            />
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
