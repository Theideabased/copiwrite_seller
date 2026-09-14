"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "company" | "service" | "budget" | "message", string>>;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors: FieldErrors = {};

    if (String(data.name || "").trim().length < 2) nextErrors.name = "Tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.email || ""))) nextErrors.email = "Enter a valid email address.";
    if (!data.service) nextErrors.service = "Choose the kind of help you need.";
    if (String(data.message || "").trim().length < 20) nextErrors.message = "Add a little more detail (at least 20 characters).";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const firstInvalid = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setState("submitting");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "We could not send your message.");
      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setServerMessage(error instanceof Error ? error.message : "We could not send your message.");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <span className="success-icon" aria-hidden="true">
          <Check size={24} />
        </span>
        <p className="eyebrow">Message received</p>
        <h3>Thanks for telling us about your business.</h3>
        <p>Expect a reply from info@copiwrite.com within two business days.</p>
        <button className="text-button" type="button" onClick={() => setState("idle")}>
          Send another message <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <Field label="Your name" id="name" error={errors.name}>
          <input id="name" name="name" type="text" autoComplete="name" placeholder="Ada Okafor" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        </Field>
        <Field label="Your email" id="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="ada@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
        <Field label="Business name (optional)" id="company" error={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your business name" aria-invalid={Boolean(errors.company)} />
        </Field>
        <Field label="What do you need?" id="service" error={errors.service}>
          <select id="service" name="service" defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
            <option value="" disabled>Choose the help you need</option>
            <option value="Message strategy">A clear plan to sell more</option>
            <option value="Website or landing page">Website or landing page</option>
            <option value="Campaign or launch">Ads and posts for a launch</option>
            <option value="Sales content">Sales posts and buyer replies</option>
            <option value="Ongoing growth support">Help each month</option>
            <option value="Help choosing a service">I’m not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Your budget in naira (optional)" id="budget" error={errors.budget}>
        <input id="budget" name="budget" type="text" maxLength={50} placeholder="Enter an amount or write ‘Not sure yet’" />
      </Field>

      <Field label="What do you sell, and where do you need help?" id="message" error={errors.message} hint="You can share your website or social media page too.">
        <textarea id="message" name="message" rows={5} minLength={20} maxLength={2000} placeholder="I sell clothes in Ibadan. People like my posts, but I need help getting more orders…" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} />
      </Field>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state === "error" && (
        <div className="form-error" role="alert">
          <p>{serverMessage}</p>
          <p>
            You can also email us directly at <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>.
          </p>
        </div>
      )}

      <button className="button button-primary form-submit" type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>
        {state === "submitting" ? (
          <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending your message</>
        ) : (
          <>Help Me Get More Sales <ArrowRight size={18} aria-hidden="true" /></>
        )}
      </button>
      <p className="form-note">Tell us what you need. We agree on the work and price before we start.</p>
    </form>
  );
}

function Field({ label, id, error, hint, children }: { label: string; id: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {hint && !error && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
