import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { writings } from "@/content/site";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Engineering notes from Astibo Solutions — how realtime, full-stack and multi-surface problems were solved.",
};

export default function WritingsPage() {
  return (
    <>
      <section className="wrap py-14 md:py-20">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05]">
          Our notes.
        </h1>
        <p className="measure mt-6 text-xl text-slate">
          Engineering notes on real work: the problem, the approach, and how it
          was solved.
        </p>
      </section>

      <section className="border-t border-rule">
        <ul className="wrap py-4 md:py-8">
          {writings.map((post, index) => (
            <Reveal
              key={post.slug}
              as="li"
              delay={70 * index}
              className={
                index === 0
                  ? "border-t-0 py-8 md:py-10"
                  : "border-t border-ink py-8 md:py-10"
              }
            >
              <article>
                <p className="text-sm font-medium text-slate">
                  {post.category}
                  <span aria-hidden="true"> · </span>
                  {post.dateLabel}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-bold md:text-3xl">
                  <Link
                    href={`/writings/${post.slug}/`}
                    className="underline-offset-4 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="measure mt-3 text-lg text-slate">{post.summary}</p>
                <p className="mt-4">
                  <Link
                    href={`/writings/${post.slug}/`}
                    className="link font-medium"
                  >
                    Read note
                    <span aria-hidden="true"> →</span>
                  </Link>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
