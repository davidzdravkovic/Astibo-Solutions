import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Discuss a project",
  description:
    "Tell Astibosoft what you are trying to do, or ask for a short introductory call about your project.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Discuss a project" art={3}>
        <p>A few sentences about the problem or idea is enough to start.</p>
      </PageHeader>

      <section className="wrap py-16 md:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>

          <aside className="space-y-10 lg:border-l lg:border-rule lg:pl-12">
            <Reveal delay={100}>
              <h2 className="text-2xl font-semibold">Email directly</h2>
              <p className="mt-2">
                <a className="link-draw break-all text-primary" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </Reveal>

            <Reveal delay={180}>
              <h2 className="text-2xl font-semibold">A short introductory call</h2>
              <p className="measure mt-2 text-slate">
                Prefer a call? Say so in your message and suggest a few times
                that work for you, including your time zone.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <h2 className="text-2xl font-semibold">What happens next</h2>
              <p className="measure mt-2 text-slate">
                Replies come by email. If it looks like a fit, the next steps
                are a conversation about the problem, an agreed scope, and a
                written proposal before any work starts.
              </p>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
