import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { ScrollFocus } from "@/components/scroll-focus";
import { goodFit, notAFit, principles, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Astibosoft works with clients, who a project suits, and who it does not.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title={`How ${site.name} works.`} art={2}>
        <p>
          An independent software practice for growing businesses: clear
          problems, written scope, incremental delivery and a handover that
          leaves you able to move on.
        </p>
      </PageHeader>

      <section>
        <div className="wrap grid gap-10 py-20 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal variant="mask" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04]">
              Working approach
            </h2>
          </Reveal>
          <ScrollFocus as="ul">
            {principles.map((item, index) => (
              <li
                key={item.title}
                className={
                  index === 0
                    ? "focus-item pb-8 md:pb-10"
                    : "focus-item border-t border-ink py-8 md:py-10"
                }
              >
                <h3 className="text-2xl font-semibold md:text-[1.9rem]">
                  {item.title}
                </h3>
                <p className="measure mt-2 text-lg text-slate">{item.body}</p>
              </li>
            ))}
          </ScrollFocus>
        </div>
      </section>

      <section className="bg-band">
        <div className="wrap py-20 md:py-32">
          <Reveal variant="mask">
            <h2 className="text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.04]">
              Who this suits
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <Reveal>
                <h3 className="text-xl font-semibold text-primary">A good fit</h3>
              </Reveal>
              <ul className="mt-4 border-b border-ink">
                {goodFit.map((item, index) => (
                  <Reveal
                    key={item}
                    as="li"
                    variant="fade"
                    delay={60 * index}
                    className="draw-rule"
                  >
                    <p className="line-item py-4 text-lg">{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <Reveal delay={100}>
                <h3 className="text-xl font-semibold text-slate">
                  Probably not a fit
                </h3>
              </Reveal>
              <ul className="mt-4 border-b border-ink">
                {notAFit.map((item, index) => (
                  <Reveal
                    key={item}
                    as="li"
                    variant="fade"
                    delay={60 * index + 100}
                    className="draw-rule"
                  >
                    <p className="line-item py-4 text-lg text-slate">{item}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to talk through a project?"
        body="Share a few lines about what you are trying to do. That is enough to start."
        showEmail={false}
      />
    </>
  );
}
