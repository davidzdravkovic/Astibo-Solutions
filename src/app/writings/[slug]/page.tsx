import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, writings } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return writings.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = writings.find((item) => item.slug === slug);
  if (!post) return { title: "Writing" };
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function WritingPage({ params }: Props) {
  const { slug } = await params;
  const post = writings.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = post.relatedProject
    ? projects.find((project) => project.slug === post.relatedProject)
    : undefined;

  return (
    <article className="wrap py-14 md:py-20">
      <p className="text-sm font-medium text-slate">
        <Link href="/writings/" className="underline-offset-4 hover:underline">
          Writings
        </Link>
        <span aria-hidden="true"> / </span>
        {post.category}
        <span aria-hidden="true"> · </span>
        {post.dateLabel}
      </p>
      <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08]">
        {post.title}
      </h1>
      <p className="measure mt-6 text-xl text-slate">{post.summary}</p>

      <div className="measure mt-10 space-y-5 text-lg leading-relaxed">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
      </div>

      {post.links && post.links.length > 0 ? (
        <ul className="mt-10 flex flex-col gap-2 border-t border-rule pt-8">
          {post.links.map((link) => (
            <li key={link.href}>
              <a
                className="link font-medium"
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
                <span aria-hidden="true"> →</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
        <Link href="/writings/" className="link font-medium">
          All writings
        </Link>
        {related ? (
          <Link href={`/work/#${related.slug}`} className="link font-medium">
            See on Work
          </Link>
        ) : null}
      </p>
    </article>
  );
}
