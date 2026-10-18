"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Delay in ms after the element enters view. */
  delay?: number;
  /** Render as a different element (use `li` inside lists). */
  as?: ElementType;
  /**
   * up    – fade and rise (default)
   * scale – fade and settle from slightly smaller (cards)
   * mask  – headline wipes in from below a clip edge
   * fade  – opacity only
   */
  variant?: "up" | "scale" | "mask" | "fade";
};

/**
 * One-shot scroll reveal. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  variant = "up",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const delayStyle = delay ? { transitionDelay: `${delay}ms` } : undefined;

  // The mask variant clips an inner wrapper, so the observed element is never
  // fully clipped (Chrome treats a fully clipped target as not intersecting).
  if (variant === "mask") {
    return (
      <Tag
        ref={ref}
        className={cn("reveal-mask", shown && "reveal--in", className)}
      >
        <div className="reveal-mask__inner" style={delayStyle}>
          {children}
        </div>
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      className={cn(
        "reveal",
        variant !== "up" && `reveal--${variant}`,
        shown && "reveal--in",
        className,
      )}
      style={delayStyle}
    >
      {children}
    </Tag>
  );
}
