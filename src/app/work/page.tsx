import type { Metadata } from "next";
import Link from "next/link";
import { ProjectBlock } from "@/components/project-block";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Working examples of engineering skills from Astibo Solutions — messaging, full-stack apps, and first product surfaces.",
};

export default function WorkPage() {
  return (
    <>
      <section className="wrap py-14 md:py-20">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05]">
          Skills, with working examples
        </h1>
        <p className="measure mt-6 text-xl text-slate">
          Live builds that show the kind of work we take on.{" "}
          <Link href="/writings/" className="link">
            Writings
          </Link>{" "}
          cover how each problem was solved.
        </p>
      </section>

      <section className="border-t border-rule">
        <div className="wrap py-4 md:py-8">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={80 * index}>
              <ProjectBlock project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-rule bg-band">
        <div className="wrap grid gap-6 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Need something like this on a project?
          </h2>
          <div>
            <p className="measure text-lg text-slate">
              Share a few lines about the problem. That is enough to start.
            </p>
            <p className="mt-8">
              <Link
                href="/contact/"
                className={buttonVariants({ size: "lg" })}
              >
                Discuss a project
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
