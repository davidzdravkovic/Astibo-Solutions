import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { ProjectBlock } from "@/components/project-block";
import { ScrollFocus } from "@/components/scroll-focus";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Working examples of engineering skills from Astibo Solutions — messaging, full-stack apps, and first product surfaces.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader title="Skills, with working examples" art={1}>
        <p>
          Live builds that show the kind of work we take on.{" "}
          <Link href="/writings/" className="link">
            Writings
          </Link>{" "}
          cover how each problem was solved.
        </p>
      </PageHeader>

      <section>
        <ScrollFocus as="div" className="wrap py-6 md:py-12">
          {projects.map((project) => (
            <ProjectBlock key={project.slug} project={project} />
          ))}
        </ScrollFocus>
        <div className="wrap">
          <div className="h-px bg-ink" />
        </div>
      </section>

      <CtaBand
        title="Need something like this on a project?"
        body="Share a few lines about the problem. That is enough to start."
        showEmail={false}
      />
    </>
  );
}
