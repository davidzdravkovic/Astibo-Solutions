import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { mainServices, supportingServices } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites and web applications, MVP and product development, UX and UI design, mobile development, and software consulting.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap py-14 md:py-20">
        <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05]">
          What we build, and what we agree before starting.
        </h1>
        <p className="measure mt-6 text-xl text-slate">
          Most work falls into two areas: websites and web applications, and
          first versions of products. Design, mobile work and engineering
          reviews sit alongside those. Each engagement has a defined scope,
          written down before work begins.
        </p>
      </section>

      {mainServices.map((service) => (
        <section
          key={service.slug}
          id={service.slug}
          className="scroll-mt-6 border-t border-rule"
        >
          <div className="wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <h2 className="text-3xl font-semibold md:text-4xl">
                {service.name}
              </h2>
              <p className="measure mt-4 text-lg">{service.summary}</p>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold">Who it is for</h3>
                <p className="measure mt-2 text-slate">{service.forWho}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">What it can include</h3>
                <ul className="mt-3 border-b border-rule">
                  {service.canInclude.map((item) => (
                    <li key={item} className="border-t border-rule py-3">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold">What we agree first</h3>
                <p className="measure mt-2 text-slate">{service.toAgree}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section id="more" className="scroll-mt-6 border-t border-rule bg-band">
        <div className="wrap py-14 md:py-20">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Alongside the build
          </h2>
          <p className="measure mt-3 text-slate">
            These can be taken on their own or as part of a larger project.
          </p>
          <ul className="mt-10 border-b border-ink">
            {supportingServices.map((service) => (
              <li
                key={service.name}
                className="grid gap-2 border-t border-ink py-6 md:grid-cols-[1fr_1.6fr] md:gap-10"
              >
                <h3 className="text-xl font-semibold md:text-2xl">
                  {service.name}
                </h3>
                <p className="text-slate">{service.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-rule">
        <div className="wrap grid gap-8 py-14 md:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <h2 className="text-3xl font-semibold md:text-4xl">
            Prices and timelines
          </h2>
          <div>
            <p className="measure text-lg">
              There are no fixed prices or delivery dates on this site, because
              they depend on scope. After a conversation and an agreed
              definition of what is in and out, you get a written proposal with
              deliverables, milestones, price and payment terms.
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
