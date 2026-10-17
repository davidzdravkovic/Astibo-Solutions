import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { goodFit, notAFit, principles, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Asibo Solutions works with clients, who a project suits, and who it does not.",
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap py-14 md:py-20">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05]">
          How {site.name} works.
        </h1>
        <p className="measure mt-6 text-xl text-slate">
          An independent software practice for growing businesses: clear
          problems, written scope, incremental delivery and a handover that
          leaves you able to move on.
        </p>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">Working approach</h2>
          <ul>
            {principles.map((item) => (
              <li
                key={item.title}
                className="border-t border-ink py-5 first:border-t-0 first:pt-0 md:py-6 md:first:pt-0"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="measure mt-1 text-slate">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule bg-band">
        <div className="wrap py-14 md:py-20">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Who this suits
          </h2>
          <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <h3 className="text-xl font-semibold">A good fit</h3>
              <ul className="mt-4 border-b border-ink">
                {goodFit.map((item) => (
                  <li key={item} className="border-t border-ink py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Probably not a fit</h3>
              <ul className="mt-4 border-b border-ink">
                {notAFit.map((item) => (
                  <li key={item} className="border-t border-ink py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-6 py-14 md:py-20 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Ready to talk through a project?
          </h2>
          <div>
            <p className="measure text-lg text-slate">
              Share a few lines about what you are trying to do. That is enough
              to start.
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
