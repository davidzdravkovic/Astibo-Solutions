import Link from "next/link";
import type { Project } from "@/content/site";

type Props = {
  project: Project;
};

/**
 * Skill example row. How the problem was solved lives in Writings.
 * Rendered as a `.focus-item` so it brightens as it nears the screen centre.
 */
export function ProjectBlock({ project }: Props) {
  return (
    <article
      id={project.slug}
      className="focus-item scroll-mt-24 border-t border-ink py-10 md:py-14"
    >
      <div className="grid gap-6 md:grid-cols-[14rem_1fr] md:gap-14">
        <div className="md:sticky md:top-28 md:self-start">
          <p className="text-sm font-medium text-slate">Example</p>
          <p className="mt-1 font-heading text-2xl font-semibold">
            {project.name}
          </p>
          <p className="mt-1 text-sm text-slate">{project.sector}</p>
        </div>

        <div>
          <h3 className="font-heading text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[1.08]">
            {project.capability}
          </h3>
          <p className="measure mt-5 text-lg text-slate">{project.body}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.writingSlug && (
              <Link
                href={`/writings/${project.writingSlug}/`}
                className="link-draw font-medium text-primary"
              >
                How it was solved
              </Link>
            )}
            {project.liveUrl && (
              <a
                className="link-draw font-medium text-slate"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Working example
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
