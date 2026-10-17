import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Discuss a project",
  description:
    "Tell Asibo Solutions what you are trying to do, or ask for a short introductory call about your project.",
};

export default function ContactPage() {
  return (
    <section className="wrap py-14 md:py-20">
      <h1 className="max-w-3xl text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.05]">
        Discuss a project
      </h1>
      <p className="measure mt-6 text-xl text-slate">
        A few sentences about the problem or idea is enough to start.
      </p>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <ContactForm />

        <aside className="space-y-10 lg:border-l lg:border-rule lg:pl-12">
          <div>
            <h2 className="text-2xl font-semibold">Email directly</h2>
            <p className="mt-2">
              <a className="link break-all" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">A short introductory call</h2>
            <p className="measure mt-2 text-slate">
              Prefer a call? Say so in your message and suggest a few times that
              work for you, including your time zone.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">What happens next</h2>
            <p className="measure mt-2 text-slate">
              Replies come by email. If it looks like a fit, the next steps are
              a conversation about the problem, an agreed scope, and a written
              proposal before any work starts.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
