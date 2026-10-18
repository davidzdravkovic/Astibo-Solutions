"use client";

import { useEffect, useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  as?: ElementType;
};

/**
 * Statement that lights up word by word as it crosses the screen.
 * Plain, fully visible text without JavaScript or with reduced motion.
 */
export function ScrollWords({ text, className, as: Tag = "p" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const words = text.split(/\s+/).filter(Boolean);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>(".sw-word"));
    let lit = -1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height + vh * 0.3;
      const progress = Math.min(1, Math.max(0, (vh * 0.86 - rect.top) / travel));
      const count = Math.round(progress * nodes.length * 1.12);
      if (count === lit) return;
      lit = count;
      nodes.forEach((node, index) => node.classList.toggle("is-on", index < count));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    root.classList.add("sw-armed");
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
      root.classList.remove("sw-armed");
    };
  }, []);

  return (
    <Tag ref={ref} className={cn(className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="sw-word">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
