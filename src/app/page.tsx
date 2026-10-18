import Link from "next/link";
import { CapabilityMarquee } from "@/components/capability-marquee";
import { CtaBand } from "@/components/cta-band";
import { HomeHero } from "@/components/home-hero";
import { ProcessTimeline } from "@/components/process-timeline";
import { Reveal } from "@/components/reveal";
import { ScrollFocus } from "@/components/scroll-focus";
import { ServiceRail } from "@/components/service-rail";
import { WorkProof } from "@/components/work-proof";
import {
  mainServices,
  principles,
  process,
  situations,
  supportingServices,
} from "@/content/site";

export default function HomePage() {
  const serviceItems = [
    ...mainServices.map((s) => ({
      name: s.name,
      body: s.summary,
      href: `/services/#${s.slug}`,
    })),
    ...supportingServices.map((s) => ({
      name: s.name,
      body: s.body,
      href: "/services/",
    })),
  ];

  return (
    <>
      <HomeHero />
      <CapabilityMarquee />

      <section className="border-t border-rule">
        <div className="wrap grid gap-10 py-20 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <Reveal variant="mask" className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04]">
              Situations we can help with
            </h2>
          </Reveal>
          <ScrollFocus as="ul">
            {situations.map((item, index) => (
              <li
                key={item.title}
                className={
                  index === 0
                    ? "focus-item situation border-ink pb-8 md:pb-10"
                    : "focus-item situation border-t border-ink py-8 md:py-10"
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

      <ServiceRail items={serviceItems} />

      <WorkProof />

      <section className="border-t border-rule">
        <div className="wrap py-20 md:py-32">
          <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <Reveal variant="mask">
              <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04]">
                How a project runs
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="measure text-lg text-slate">
                This is the usual shape. The details, including price and
                payment terms, are agreed in writing before any work starts.
              </p>
            </Reveal>
          </div>
          <ProcessTimeline steps={process} />
        </div>
      </section>

      <section className="border-t border-rule bg-band">
        <div className="wrap grid gap-10 py-20 md:py-32 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal variant="mask">
              <h2 className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.04]">
                Why us
              </h2>
            </Reveal>
            <Reveal className="mt-8" delay={120}>
              <Link
                href="/about/"
                className="link-draw text-lg font-medium text-primary"
              >
                How we work and who it suits
              </Link>
            </Reveal>
          </div>
          <ScrollFocus as="ul">
            {principles.map((item, index) => (
              <li
                key={item.title}
                className={
                  index === 0
                    ? "focus-item border-ink pb-8 md:pb-10"
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

      <CtaBand
        title="Have a project in mind?"
        body="Share a few lines about what you are trying to do. That is enough to start."
      />
    </>
  );
}
