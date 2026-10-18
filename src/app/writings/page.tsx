import type { Metadata } from "next";
import Link from "next/link";
import { GoArrow } from "@/components/go-arrow";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { writings } from "@/content/site";

export const metadata: Metadata = {
  title: "Writings",
  description:
    "Engineering notes from Astibosoft — how realtime, full-stack and multi-surface problems were solved.",
};

export default function WritingsPage() {
  return (
    <>
      <PageHeader title="Our notes." art={4}>
        <p>
          Engineering notes on real work: the problem, the approach, and how it
          was solved.
        </p>
      </PageHeader>

      <section>
        <ul className="wrap work-list py-6 md:py-12">
          {writings.map((post, index) => (
            <Reveal
              key={post.slug}
              as="li"
              variant="fade"
              delay={70 * index}
              className="work-row draw-rule"
            >
              <article className="relative grid items-center gap-x-10 gap-y-3 py-9 md:grid-cols-[11rem_1fr_auto] md:py-12">
                <p className="text-sm font-medium text-slate">
                  {post.category}
                  <span className="block md:mt-1">{post.dateLabel}</span>
                </p>
                <div>
                  <h2 className="work-row__cap font-heading text-[clamp(1.6rem,3vw,2.5rem)] font-bold leading-[1.1]">
                    <Link
                      href={`/writings/${post.slug}/`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="measure mt-3 text-lg text-slate">{post.summary}</p>
                </div>
                <span className="hidden md:block">
                  <GoArrow />
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
        <div className="wrap">
          <div className="h-px bg-ink" />
        </div>
      </section>
    </>
  );
}
