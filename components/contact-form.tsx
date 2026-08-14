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
    if (!/^\S+@\S+\.\S+$/.test(String(data.email || ""))) nextErrors.email = "Enter a valid work email.";
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
      if (!response.ok) throw new Error(result.message || "We could not send your brief.");
      setState("success");
      form.reset();
    } catch (error) {
      setState("error");
      setServerMessage(error instanceof Error ? error.message : "We could not send your brief.");
    }
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <span className="success-icon" aria-hidden="true">
          <Check size={24} />
        </span>
        <p className="eyebrow">Brief received</p>
        <h3>Thanks. We’ll take a proper look.</h3>
        <p>Expect a reply from info@copiwrite.com within two business days.</p>
        <button className="text-button" type="button" onClick={() => setState("idle")}>
          Send another brief <ArrowRight size={16} aria-hidden="true" />
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
        <Field label="Work email" id="email" error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="ada@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
        <Field label="Company" id="company" error={errors.company}>
          <input id="company" name="company" type="text" autoComplete="organization" placeholder="Your company" aria-invalid={Boolean(errors.company)} />
        </Field>
        <Field label="What do you need?" id="service" error={errors.service}>
          <select id="service" name="service" defaultValue="" aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? "service-error" : undefined}>
            <option value="" disabled>Select a service</option>
            <option value="Message strategy">Message strategy</option>
            <option value="Website or landing page">Website or landing page</option>
            <option value="Campaign or launch">Campaign or launch</option>
            <option value="Sales content">Sales content</option>
            <option value="Ongoing growth support">Ongoing growth support</option>
          </select>
        </Field>
      </div>

      <fieldset className="budget-fieldset">
        <legend>Indicative project budget</legend>
        <div className="radio-row">
          {["Under $2k", "$2k–$5k", "$5k–$10k", "$10k+"].map((budget) => (
            <label className="radio-label" key={budget}>
              <input type="radio" name="budget" value={budget} />
              <span>{budget}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Tell us what is changing" id="message" error={errors.message} hint="What are you launching, fixing, or trying to sell more clearly?">
        <textarea id="message" name="message" rows={5} minLength={20} maxLength={2000} placeholder="We have a strong product, but our homepage and sales deck tell two different stories..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : "message-hint"} />
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
          <><LoaderCircle className="spin" size={18} aria-hidden="true" /> Sending your brief</>
        ) : (
          <>Start the conversation <ArrowRight size={18} aria-hidden="true" /></>
        )}
      </button>
      <p className="form-note">No hard sell. If we’re not the right fit, we’ll say so.</p>
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
