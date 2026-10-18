import Link from "next/link";
import { GoArrow } from "@/components/go-arrow";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/site";

/**
 * Home proof strip: skills illustrated by named working examples.
 * Each row is one link; hovering a row pushes the others back.
 */
export function WorkProof() {
  return (
    <section className="border-t border-rule">
      <div className="wrap py-20 md:py-32">
        <Reveal variant="mask">
          <h2 className="max-w-3xl text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.04]">
            Skills, with working examples
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="measure mt-5 text-lg text-slate">
            Each line is a kind of work we take on, with a live example behind
            it. How the problems were solved is in{" "}
            <Link href="/writings/" className="link">
              Writings
            </Link>
            .
          </p>
        </Reveal>

        <ul className="work-list mt-12 border-b border-ink md:mt-16">
          {projects.map((project, index) => (
            <Reveal
              key={project.slug}
              as="li"
              variant="fade"
              delay={80 * index}
              className="work-row draw-rule"
            >
              <Link
                href={`/work/#${project.slug}`}
                className="grid items-center gap-x-10 gap-y-2 py-7 md:grid-cols-[11rem_1fr_auto] md:py-11"
              >
                <span className="text-base font-medium text-slate">
                  {project.name}
                </span>
                <span className="work-row__cap font-heading text-[clamp(1.5rem,3.3vw,2.9rem)] font-semibold leading-[1.1]">
                  {project.capability}
                </span>
                <span className="hidden md:block">
                  <GoArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-9 flex flex-wrap gap-x-8 gap-y-3" delay={100}>
          <Link href="/work/" className="link-draw text-lg font-medium">
            See all examples
          </Link>
          <Link href="/writings/" className="link-draw text-lg font-medium text-slate">
            Read how they were solved
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
