import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  body: string;
  /** Show the email address next to the button. */
  showEmail?: boolean;
};

/** Dark closing band. Soft light drifts behind the text; nothing follows the pointer. */
export function CtaBand({ title, body, showEmail = true }: Props) {
  return (
    <section className="on-dark cta-band bg-ink text-paper">
      <div className="wrap relative py-20 md:py-32">
        <Reveal variant="mask">
          <h2 className="max-w-4xl text-[clamp(2.4rem,6vw,5.25rem)] font-semibold leading-[1.02]">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="measure mt-6 text-lg text-blue-soft md:text-xl">{body}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "btn-sweep bg-paper! text-ink! hover:bg-paper!",
              )}
            >
              Discuss a project
            </Link>
            {showEmail ? (
              <a
                className="link-draw break-all text-lg"
                href={`mailto:${site.email}`}
              >
                {site.email}
              </a>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
