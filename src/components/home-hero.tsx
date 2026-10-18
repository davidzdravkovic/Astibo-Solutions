import Link from "next/link";
import { HeroStage } from "@/components/hero-stage";
import { RotatingWord } from "@/components/rotating-word";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const heroWords = [
  "working product.",
  "clear website.",
  "web application.",
  "usable MVP.",
] as const;

export function HomeHero() {
  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="wrap relative grid items-center gap-7 py-8 md:gap-12 md:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-24">
        <div className="hero__copy order-2 lg:order-none">
          <p
            className="hero__eyebrow hero__enter"
            style={{ animationDelay: "80ms" }}
          >
            <span aria-hidden="true">&gt;_</span> For growing businesses
          </p>
          <h1
            className="hero__title hero__enter"
            style={{ animationDelay: "180ms" }}
          >
            From the first conversation to{" "}
            <span className="hero__title-tail">
              a <RotatingWord words={heroWords} className="hero__accent" />
            </span>
          </h1>
          <p
            className="measure mt-6 text-lg text-slate md:text-xl hero__enter"
            style={{ animationDelay: "320ms" }}
          >
            {site.name} helps plan, design and build websites, web applications
            and first versions of products—with clear scope, regular checkpoints
            and a proper handover.
          </p>
          <div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 hero__enter"
            style={{ animationDelay: "460ms" }}
          >
            <Link
              href="/contact/"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Discuss a project
            </Link>
            <Link href="/work/" className="hero__text-link">
              See engineering examples
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>

        <div
          className="hero__stage-wrap hero__enter order-1 lg:order-none"
          style={{ animationDelay: "280ms" }}
        >
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
