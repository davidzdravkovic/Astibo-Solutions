import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { mainServices, supportingServices } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites and web applications, MVP and product development, UX and UI design, mobile development, and software consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="What we build, and what we agree before starting." art={0}>
        <p>
          Most work falls into two areas: websites and web applications, and
          first versions of products. Design, mobile work and engineering
          reviews sit alongside those. Each engagement has a defined scope,
          written down before work begins.
        </p>
      </PageHeader>

      {mainServices.map((service) => (
        <section key={service.slug} id={service.slug} className="scroll-mt-6">
          <div className="wrap grid gap-10 py-16 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <Reveal className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05]">
                {service.name}
              </h2>
              <p className="measure mt-5 text-xl">{service.summary}</p>
            </Reveal>

            <div className="space-y-12">
              <Reveal>
                <h3 className="text-xl font-semibold text-primary">Who it is for</h3>
                <p className="measure mt-2 text-lg text-slate">{service.forWho}</p>
              </Reveal>
              <div>
                <Reveal>
                  <h3 className="text-xl font-semibold text-primary">
                    What it can include
                  </h3>
                </Reveal>
                <ul className="mt-4 border-b border-rule">
                  {service.canInclude.map((item, index) => (
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
              <Reveal>
                <h3 className="text-xl font-semibold text-primary">
                  What we agree first
                </h3>
                <p className="measure mt-2 text-lg text-slate">{service.toAgree}</p>
              </Reveal>
            </div>
          </div>
          <div className="wrap">
            <div className="h-px bg-rule" />
          </div>
        </section>
      ))}

      <section id="more" className="scroll-mt-6 bg-band">
        <div className="wrap py-20 md:py-32">
          <Reveal variant="mask">
            <h2 className="text-[clamp(2.2rem,5vw,4.25rem)] font-semibold leading-[1.04]">
              Alongside the build
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="measure mt-4 text-lg text-slate">
              These can be taken on their own or as part of a larger project.
            </p>
          </Reveal>
          <ul className="work-list mt-12 border-b border-ink">
            {supportingServices.map((service, index) => (
              <Reveal
                key={service.name}
                as="li"
                variant="fade"
                delay={70 * index}
                className="work-row draw-rule"
              >
                <div className="grid gap-2 py-7 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-9">
                  <h3 className="work-row__cap text-2xl font-semibold md:text-3xl">
                    {service.name}
                  </h3>
                  <p className="text-lg text-slate">{service.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="wrap grid gap-8 py-20 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal variant="mask">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05]">
              Prices and timelines
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="measure text-xl">
              There are no fixed prices or delivery dates on this site, because
              they depend on scope. After a conversation and an agreed
              definition of what is in and out, you get a written proposal with
              deliverables, milestones, price and payment terms.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Have something in mind?"
        body="Share a few lines about the problem. That is enough to start."
        showEmail={false}
      />
    </>
  );
}
