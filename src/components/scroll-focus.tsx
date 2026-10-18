"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Children marked `.focus-item` brighten as they near the middle of the
 * screen and settle back as they leave, so the list reads like a spotlight
 * moving down it. Everything stays fully visible without JavaScript or with
 * reduced motion.
 */
export function ScrollFocus({ children, className, as: Tag = "ul" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(
      root.querySelectorAll<HTMLElement>(":scope > .focus-item"),
    );
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of items) {
        const rect = el.getBoundingClientRect();
        const centre = rect.top + rect.height / 2;
        // Taller items get a wider zone so they are not dimmed while fully in view.
        const reach = vh * 0.42 + rect.height * 0.5;
        const f = Math.max(0, 1 - Math.abs(centre - vh * 0.52) / reach);
        const eased = f * f * (3 - 2 * f);
        el.style.setProperty("--f", eased.toFixed(3));
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    root.classList.add("sf-armed");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("sf-armed");
      items.forEach((el) => el.style.removeProperty("--f"));
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
