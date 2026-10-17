import Link from "next/link";
import type { Project } from "@/content/site";

type Props = {
  project: Project;
  index: number;
};

/**
 * Skill example row. How the problem was solved lives in Writings.
 */
export function ProjectBlock({ project, index }: Props) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      id={project.slug}
      className="scroll-mt-24 border-t border-ink py-8 md:py-10"
    >
      <div className="grid gap-4 md:grid-cols-[4.5rem_1fr] md:gap-10 md:items-start">
        <p
          aria-hidden="true"
          className="font-heading text-2xl font-bold text-blue md:pt-1"
        >
          {number}
        </p>

        <div>
          <p className="text-sm font-medium text-slate">{project.sector}</p>
          <h3 className="mt-1 font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
            {project.capability}
          </h3>
          <p className="mt-2 text-sm font-medium text-slate">
            Example
            <span aria-hidden="true"> · </span>
            {project.name}
          </p>
          <p className="measure mt-4 text-lg text-slate">{project.body}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
            {project.writingSlug && (
              <Link
                href={`/writings/${project.writingSlug}/`}
                className="link font-medium"
              >
                How it was solved
                <span aria-hidden="true"> →</span>
              </Link>
            )}
            {project.liveUrl && (
              <a
                className="text-[0.95rem] font-medium text-slate underline-offset-4 hover:underline"
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
