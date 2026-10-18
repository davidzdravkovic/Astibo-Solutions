"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Step = { title: string; body: string };

/**
 * Process steps that light up in sequence as the section scrolls through
 * the viewport. Shows every step at once with reduced motion.
 */
export function ProcessTimeline({ steps }: { steps: readonly Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(steps.length);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height + vh * 0.25;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / travel));
      const count = Math.min(steps.length, Math.floor(progress * (steps.length + 1)));
      setActive((prev) => (prev === count ? prev : count));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <ol
      ref={listRef}
      className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          className={cn("process-step", index < active && "process-step--on")}
        >
          <span className="process-step__bar" aria-hidden="true" />
          <span aria-hidden="true" className="process-step__num">
            {index + 1}
          </span>
          <h3 className="mt-2 text-xl font-semibold">
            <span className="sr-only">Step {index + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-2 text-[0.97rem] text-slate">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
