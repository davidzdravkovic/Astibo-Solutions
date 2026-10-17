import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Home proof strip: skills illustrated by named working examples.
 */
export function WorkProof() {
  return (
    <section className="border-t border-rule">
      <div className="wrap py-16 md:py-24">
        <Reveal className="grid gap-4 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Skills, with working examples
          </h2>
          <p className="measure text-slate">
            Each line is a kind of work we take on, with a live example behind
            it. How the problems were solved is in{" "}
            <Link href="/writings/" className="link">
              Writings
            </Link>
            .
          </p>
        </Reveal>

        <ul className="mt-10 border-b border-ink">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              as="li"
              delay={70 * index}
              className={cn(
                "border-ink py-5 md:py-6",
                index === 0 ? "border-t-0 pt-0 md:pt-0" : "border-t",
              )}
            >
              <Link
                href={`/work/#${project.slug}`}
                className="group grid gap-1 md:grid-cols-[minmax(0,12rem)_1fr] md:gap-10 md:items-baseline"
              >
                <span className="text-sm font-medium text-slate md:text-[0.95rem]">
                  {project.name}
                </span>
                <span className="font-heading text-xl font-semibold group-hover:underline group-hover:underline-offset-4 md:text-2xl">
                  {project.capability}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3" delay={100}>
          <Link href="/work/" className="link text-lg font-medium">
            See all examples
            <span aria-hidden="true"> →</span>
          </Link>
          <Link
            href="/writings/"
            className="text-lg font-medium text-slate underline-offset-4 hover:underline"
          >
            Read how they were solved
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
