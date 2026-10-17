"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  words: readonly string[];
  /** Interval between swaps, ms */
  intervalMs?: number;
  className?: string;
};

/**
 * Fixed-width title swap: slot is always as wide as the longest phrase,
 * so the line does not reflow when the word changes.
 */
export function RotatingWord({
  words,
  intervalMs = 2800,
  className,
}: Props) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [reduce, setReduce] = useState(false);
  const widest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce || words.length < 2) return;

    let timeout: number;
    const tick = window.setInterval(() => {
      setPhase("out");
      timeout = window.setTimeout(() => {
        setIndex((current) => (current + 1) % words.length);
        setPhase("in");
      }, 280);
    }, intervalMs);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(timeout);
    };
  }, [intervalMs, reduce, words.length]);

  const word = words[index] ?? words[0];

  return (
    <span className={cn("hero-swap", className)}>
      <span className="hero-swap__sizer" aria-hidden="true">
        {widest}
      </span>
      <span
        className={cn(
          "hero-swap__word",
          phase === "out" ? "hero-swap__word--out" : "hero-swap__word--in",
        )}
        aria-live="polite"
      >
        {word}
      </span>
    </span>
  );
}
