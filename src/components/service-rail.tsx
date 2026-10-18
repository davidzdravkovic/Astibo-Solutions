"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ServiceArt } from "@/components/service-art";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type ServiceRailItem = {
  name: string;
  body: string;
  href?: string;
};

type Props = {
  items: ServiceRailItem[];
};

/** Wide, tall screens with motion allowed get the pinned scroll-linked row. */
const PIN_QUERY =
  "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

/** Share of one screen height the cards rest, centred, before and after moving. */
const DWELL = 0.1;
/** How quickly the row eases toward the scroll position (0–1 per frame). */
const EASE = 0.14;

const outlineLink = cn(
  buttonVariants({ size: "lg", variant: "outline" }),
  "border-blue-soft/40! text-paper! hover:bg-white/10!",
);

function ServiceCard({
  item,
  index,
}: {
  item: ServiceRailItem;
  index: number;
}) {
  return (
    <article className="service-card flex shrink-0 snap-start flex-col items-center rounded-[2.5rem] bg-[#1b2b44] px-7 pb-9 pt-9 text-center md:px-10 md:pb-10 md:pt-10">
      <div className="service-card__art">
        <ServiceArt index={index} />
      </div>
      <h3 className="service-card__title mt-6 font-heading font-semibold leading-tight">
        {item.name}
      </h3>
      <p className="mt-4 grow text-[0.98rem] leading-relaxed text-blue-soft/85">
        {item.body}
      </p>
      {item.href ? (
        <Link
          href={item.href}
          draggable={false}
          className="mt-7 inline-flex items-center gap-2 rounded-full border border-blue-soft/35 px-7 py-3 text-base font-medium text-paper transition-colors hover:bg-white/10"
        >
          Read more
          <span aria-hidden="true">→</span>
        </Link>
      ) : null}
    </article>
  );
}

/**
 * Services as large cards in a horizontal row.
 *
 * Wide screens: a tall "runway" section holds a sticky full-screen stage.
 * Native page scrolling (momentum, keyboard, scrollbar all intact) is
 * translated into sideways travel of the row, so
 *   - the stage is pinned, cards centred, for the whole movement;
 *   - a fast scroll cannot skip it;
 *   - the row ends exactly where the runway ends, then the page moves on.
 * No wheel handler, no preventDefault.
 *
 * Phones, narrow or short screens, reduced motion: a plain swipeable row.
 */
export function ServiceRail({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const mq = window.matchMedia(PIN_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pinned: page scroll position -> sideways travel.
  useEffect(() => {
    if (!pinned) return;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    if (!section || !stage || !track || !bar) return;

    let maxShift = 0;
    let dwell = 0;
    let target = 0;
    let current = 0;
    let running = false;
    let raf = 0;

    const apply = () => {
      track.style.transform = `translate3d(${(-current).toFixed(1)}px,0,0)`;
      bar.style.transform = `scaleX(${maxShift > 0 ? (current / maxShift).toFixed(4) : 0})`;
    };

    const readTarget = () => {
      const top = section.getBoundingClientRect().top;
      target = Math.min(maxShift, Math.max(0, -top - dwell));
    };

    const loop = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.2) {
        current = target;
        running = false;
      } else {
        raf = requestAnimationFrame(loop);
      }
      apply();
    };

    const kick = () => {
      readTarget();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    const measure = () => {
      const vh = window.innerHeight;
      dwell = vh * DWELL;
      maxShift = Math.max(0, track.offsetLeft * 2 + track.offsetWidth - stage.clientWidth);
      // Scroll distance = one screen (the pinned stage) + exact sideways travel + rests.
      section.style.height = `${vh + maxShift + dwell * 2}px`;
      readTarget();
      current = target;
      apply();
    };

    measure();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", measure);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      section.style.height = "";
      track.style.transform = "";
      bar.style.transform = "";
    };
  }, [pinned, items.length]);

  // Fallback row: progress line and arrow state follow the swipe.
  const syncNative = useCallback(() => {
    const node = scrollerRef.current;
    if (!node) return;
    const max = node.scrollWidth - node.clientWidth;
    const fill =
      node.scrollWidth > 0
        ? (node.scrollLeft + node.clientWidth) / node.scrollWidth
        : 1;
    if (barRef.current) barRef.current.style.transform = `scaleX(${fill})`;
    const start = node.scrollLeft <= 4;
    const end = max <= 4 || node.scrollLeft >= max - 4;
    setEdge((prev) =>
      prev.start === start && prev.end === end ? prev : { start, end },
    );
  }, []);

  useEffect(() => {
    if (pinned) return;
    syncNative();
    window.addEventListener("resize", syncNative);
    return () => window.removeEventListener("resize", syncNative);
  }, [pinned, syncNative]);

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector<HTMLElement>("article");
    const step = card ? card.offsetWidth + 24 : 340;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const progress = (
    <div
      className="h-0.5 w-full overflow-hidden rounded-full bg-white/10"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="service-rail__bar h-full origin-left bg-blue-soft"
      />
    </div>
  );

  if (pinned) {
    return (
      <section
        ref={sectionRef}
        className="on-dark border-t border-white/10 bg-ink text-paper"
      >
        <div
          ref={stageRef}
          className="sticky top-0 flex h-dvh flex-col justify-center gap-8 overflow-hidden pb-8 pt-24"
        >
          <div className="wrap flex items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-semibold md:text-6xl">Services</h2>
              <p className="rail-sub mt-3 text-lg text-blue-soft/90">
                What we plan, design and build. Keep scrolling and the cards
                slide across.
              </p>
            </div>
            <Link href="/services/" className={cn(outlineLink, "shrink-0")}>
              All services
            </Link>
          </div>

          <div
            ref={trackRef}
            className="rail-track flex w-max flex-row items-stretch gap-6 will-change-transform"
          >
            {items.map((item, index) => (
              <ServiceCard key={item.name} item={item} index={index} />
            ))}
          </div>

          <div className="wrap">{progress}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="on-dark overflow-hidden border-t border-white/10 bg-ink py-16 text-paper md:py-24"
    >
      <div className="wrap flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-semibold md:text-5xl">Services</h2>
          <p className="mt-3 text-lg text-blue-soft/90">
            What we plan, design and build. Swipe through the cards; each links
            to the full description.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="service-rail__nav"
            aria-label="Previous services"
            disabled={edge.start}
            onClick={() => scrollByCard(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="service-rail__nav"
            aria-label="Next services"
            disabled={edge.end}
            onClick={() => scrollByCard(1)}
          >
            →
          </button>
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        <div
          ref={scrollerRef}
          className="rail-scroller flex flex-row flex-nowrap items-stretch gap-5 overflow-x-auto overscroll-x-contain pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          tabIndex={0}
          role="region"
          aria-label="Services"
          onScroll={syncNative}
        >
          {items.map((item, index) => (
            <ServiceCard key={item.name} item={item} index={index} />
          ))}
        </div>
        <div className="wrap mt-6">{progress}</div>
      </div>
    </section>
  );
}
