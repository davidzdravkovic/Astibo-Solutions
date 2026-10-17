import Link from "next/link";
import { HomeHero } from "@/components/home-hero";
import { Reveal } from "@/components/reveal";
import { WorkProof } from "@/components/work-proof";
import { buttonVariants } from "@/components/ui/button";
import {
  mainServices,
  process,
  situations,
  site,
  supportingServices,
} from "@/content/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const overview = [
    ...mainServices.map((s) => ({ name: s.name, body: s.summary })),
    ...supportingServices,
  ];

  return (
    <>
      <HomeHero />

      <section className="border-t border-rule">
        <div className="wrap grid gap-8 py-16 md:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Situations we can help with
            </h2>
          </Reveal>
          <ul>
            {situations.map((item, index) => (
              <Reveal
                key={item.title}
                as="li"
                delay={90 * index}
                className={cn(
                  "border-ink py-5 md:py-6",
                  index === 0 ? "border-t-0 pt-0 md:pt-0" : "border-t",
                )}
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="measure mt-1 text-slate">{item.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule bg-band">
        <div className="wrap py-16 md:py-24">
          <Reveal>
            <h2 className="text-3xl font-semibold md:text-4xl">
              What we work on
            </h2>
          </Reveal>
          <ul className="mt-10 border-b border-ink">
            {overview.map((item, index) => (
              <Reveal
                key={item.name}
                as="li"
                delay={60 * index}
                className={cn(
                  "grid gap-2 border-t border-ink py-6 md:grid-cols-[1fr_1.4fr] md:gap-10",
                  index < mainServices.length && "md:py-8",
                )}
              >
                <h3
                  className={cn(
                    "font-semibold",
                    index < mainServices.length
                      ? "text-2xl md:text-3xl"
                      : "text-xl md:text-2xl",
                  )}
                >
                  {item.name}
                </h3>
                <p className="text-slate">{item.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal className="mt-10" delay={80}>
            <Link
              href="/services/"
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              Read about each service
            </Link>
          </Reveal>
        </div>
      </section>

      <WorkProof />

      <section className="border-t border-rule">
        <div className="wrap py-16 md:py-24">
          <Reveal className="grid gap-4 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <h2 className="text-3xl font-semibold md:text-4xl">
              How a project runs
            </h2>
            <p className="measure text-slate">
              This is the usual shape. The details, including price and
              payment terms, are agreed in writing before any work starts.
            </p>
          </Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {process.map((step, index) => (
              <Reveal
                key={step.title}
                as="li"
                delay={90 * index}
                className="border-t-2 border-ink pt-4"
              >
                <span
                  aria-hidden="true"
                  className="font-heading text-3xl font-bold text-blue"
                >
                  {index + 1}
                </span>
                <h3 className="mt-2 text-xl font-semibold">
                  <span className="sr-only">Step {index + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.97rem] text-slate">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-rule bg-band">
        <Reveal className="wrap grid gap-6 py-16 md:py-24 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Clear scope, regular progress
          </h2>
          <div>
            <p className="measure text-xl">
              Each engagement starts with the problem and ends with a written
              proposal, visible checkpoints and a handover you can run with.
            </p>
            <p className="measure mt-4 text-slate">
              Trade-offs are raised early. Complexity is added only when it
              earns its place.
            </p>
            <p className="mt-6">
              <Link href="/about/" className="link font-medium">
                How we work and who it suits
              </Link>
            </p>
          </div>
        </Reveal>
      </section>

      <section className="on-dark bg-ink text-paper">
        <Reveal className="wrap py-16 md:py-24">
          <h2 className="max-w-2xl text-3xl font-semibold md:text-5xl">
            Have a project in mind?
          </h2>
          <p className="measure mt-4 text-lg text-blue-soft">
            Share a few lines about what you are trying to do. That is enough
            to start.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "bg-paper! text-ink! hover:bg-white!",
              )}
            >
              Discuss a project
            </Link>
            <a
              className="break-all text-lg underline underline-offset-4"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
