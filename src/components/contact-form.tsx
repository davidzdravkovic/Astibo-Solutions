"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Version 1 has no backend. The form checks the fields in the browser, then
 * opens the visitor's email app with a prefilled message to the owner's
 * address. Nothing is stored or sent by the site itself.
 */

const MAX_MESSAGE = 1500;

type Values = {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
};

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const empty: Values = {
  name: "",
  email: "",
  company: "",
  service: "",
  message: "",
};

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (!values.email.trim()) {
    errors.email = "Enter your email address so a reply is possible.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Check the email address. It should look like name@example.com.";
  }
  if (!values.message.trim()) {
    errors.message = "Write a few sentences about the problem or project.";
  } else if (values.message.length > MAX_MESSAGE) {
    errors.message = `Shorten the message to ${MAX_MESSAGE} characters or fewer, or send a short version and add detail by email.`;
  }
  return errors;
}

function compose(values: Values) {
  const lines: string[] = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
  ];
  if (values.company.trim()) {
    lines.push(`Company or website: ${values.company.trim()}`);
  }
  if (values.service) {
    lines.push(`Interested in: ${values.service}`);
  }
  lines.push("", values.message.trim());

  return {
    subject: `Project inquiry from ${values.name.trim()}`,
    body: lines.join("\n"),
  };
}

const fieldClass = "mt-2";

export function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [composed, setComposed] = useState<ReturnType<typeof compose> | null>(
    null,
  );
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set =
    (key: keyof Values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((current) => ({ ...current, [key]: event.target.value }));
      if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
    };

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setCopied(false);

    const firstInvalid = (["name", "email", "message"] as const).find(
      (key) => found[key],
    );
    if (firstInvalid) {
      setComposed(null);
      formRef.current
        ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }

    const message = compose(values);
    setComposed(message);
    const href = `mailto:${site.email}?subject=${encodeURIComponent(
      message.subject,
    )}&body=${encodeURIComponent(message.body.replace(/\n/g, "\r\n"))}`;
    window.location.href = href;
  }

  async function copyMessage() {
    if (!composed) return;
    const text = `To: ${site.email}\nSubject: ${composed.subject}\n\n${composed.body}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const describedBy = (key: keyof Errors, hint?: string) =>
    [errors[key] && `${key}-error`, hint].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-6">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            className={fieldClass}
            value={values.name}
            onChange={set("name")}
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 text-sm font-medium text-destructive">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Your email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={values.email}
            onChange={set("email")}
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm font-medium text-destructive">
              {errors.email}
            </p>
          )}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="company">
              Company or website{" "}
              <span className="font-normal text-slate">(optional)</span>
            </Label>
            <Input
              id="company"
              name="company"
              autoComplete="organization"
              className={fieldClass}
              value={values.company}
              onChange={set("company")}
            />
          </div>

          <div>
            <Label htmlFor="service">
              What you need{" "}
              <span className="font-normal text-slate">(optional)</span>
            </Label>
            <select
              id="service"
              name="service"
              value={values.service}
              onChange={set("service")}
              className={cn(
                "h-11 w-full rounded-lg border border-input bg-card px-3 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                fieldClass,
              )}
            >
              <option value="">Choose one</option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="message">What are you trying to do?</Label>
          <Textarea
            id="message"
            name="message"
            className={fieldClass}
            value={values.message}
            onChange={set("message")}
            aria-required="true"
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={describedBy("message", "message-hint")}
          />
          <p
            id="message-hint"
            className={cn(
              "mt-2 text-sm",
              values.message.length > MAX_MESSAGE
                ? "font-medium text-destructive"
                : "text-slate",
            )}
          >
            {values.message.length} of {MAX_MESSAGE} characters.
          </p>
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm font-medium text-destructive">
              {errors.message}
            </p>
          )}
        </div>

        <Button type="submit" size="lg">
          Send message
        </Button>
      </form>

      <div aria-live="polite" className="mt-8">
        {composed && (
          <div className="border border-ink bg-surface p-5" role="status">
            <h2 className="text-xl font-semibold">Couldn&apos;t open email?</h2>
            <p className="measure mt-2 text-slate">
              Copy the message below and send it to{" "}
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
            <label htmlFor="composed" className="sr-only">
              Message to copy
            </label>
            <Textarea
              id="composed"
              readOnly
              className="mt-4 min-h-48 font-sans"
              value={`Subject: ${composed.subject}\n\n${composed.body}`}
            />
            <div className="mt-3 flex items-center gap-4">
              <Button type="button" variant="outline" onClick={copyMessage}>
                Copy message
              </Button>
              {copied && (
                <span className="text-sm font-medium">Copied.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
