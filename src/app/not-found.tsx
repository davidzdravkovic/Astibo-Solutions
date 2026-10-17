import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="wrap py-20 md:py-28">
      <h1 className="max-w-2xl text-4xl font-bold md:text-6xl">
        That page does not exist.
      </h1>
      <p className="measure mt-6 text-xl text-slate">
        The link may be out of date, or the address may have a typo. The pages
        that do exist are in the menu.
      </p>
      <p className="mt-8">
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Go to the home page
        </Link>
      </p>
    </section>
  );
}
