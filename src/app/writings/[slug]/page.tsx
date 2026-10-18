import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
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
    <article>
      <PageHeader
        compact
        title={post.title}
        top={
          <p>
            <Link href="/writings/" className="link-draw">
              Writings
            </Link>
            <span aria-hidden="true"> / </span>
            {post.category}
            <span aria-hidden="true"> · </span>
            {post.dateLabel}
          </p>
        }
      >
        <p>{post.summary}</p>
      </PageHeader>

      <div className="wrap py-14 md:py-20">
      <div className="measure space-y-6 text-lg leading-relaxed md:text-xl md:leading-relaxed">
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
      </div>
    </article>
  );
}
