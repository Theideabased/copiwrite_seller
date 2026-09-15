"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { automationNeeds, DemoErrors, industries, leadSources, validateDemo } from "@/lib/demo-request";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<DemoErrors>({});
  const [serverMessage, setServerMessage] = useState("");
  const inFlight = useRef(false);
  const successRef = useRef<HTMLDivElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors = validateDemo(data);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = form.elements.namedItem(Object.keys(nextErrors)[0]);
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    inFlight.current = true;
    setState("submitting");
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data), signal: AbortSignal.timeout(25000),
      });
      const result = await response.json() as { message?: string; errors?: DemoErrors };
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(result.message || "We could not send your request. Please try again.");
      }
      setState("success");
      form.reset();
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error) {
      setState("error");
      setServerMessage(error instanceof Error && error.name !== "TimeoutError" ? error.message : "Your request took too long. Please try again or email us.");
    } finally { inFlight.current = false; }
  }

  if (state === "success") return (
    <div className="form-success" role="status" tabIndex={-1} ref={successRef}>
      <span className="success-icon" aria-hidden><Check size={24} /></span>
      <h3>Your demo request is in.</h3>
      <p>We’ll review your sales process and email you within two business days to arrange a conversation. Your demo is not booked yet.</p>
      <button className="auto-button" type="button" onClick={() => setState("idle")}>Send another request <ArrowRight size={16} aria-hidden /></button>
    </div>
  );

  const aria = (id: keyof DemoErrors) => ({ "aria-invalid": Boolean(errors[id]), "aria-describedby": errors[id] ? `${id}-error` : undefined });
  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <p className="form-note">All fields are required except Website.</p>
      <div className="form-grid">
        <Field label="Name" id="name" error={errors.name}><input id="name" name="name" autoComplete="name" maxLength={100} required {...aria("name")} /></Field>
        <Field label="Business email" id="email" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" spellCheck={false} maxLength={200} required {...aria("email")} /></Field>
        <Field label="Company" id="company" error={errors.company}><input id="company" name="company" autoComplete="organization" maxLength={150} required {...aria("company")} /></Field>
        <Field label="Website (optional)" id="businessWebsite" error={errors.businessWebsite}><input id="businessWebsite" name="businessWebsite" type="url" autoComplete="url" placeholder="https://example.com" spellCheck={false} maxLength={300} {...aria("businessWebsite")} /></Field>
      </div>
      <Field label="Industry" id="industry" error={errors.industry}><select id="industry" name="industry" defaultValue="" required {...aria("industry")}><option value="" disabled>Select your industry</option>{industries.map(item => <option key={item}>{item}</option>)}</select></Field>
      <Field label="Where do most of your leads come from?" id="leadSource" error={errors.leadSource}><select id="leadSource" name="leadSource" defaultValue="" required {...aria("leadSource")}><option value="" disabled>Select your main lead source</option>{leadSources.map(item => <option key={item}>{item}</option>)}</select></Field>
      <Field label="What would you like to automate?" id="service" error={errors.service}><select id="service" name="service" defaultValue="" required {...aria("service")}><option value="" disabled>Select an area</option>{automationNeeds.map(item => <option key={item}>{item}</option>)}</select></Field>
      <Field label="Tell us what currently happens after someone becomes a lead." id="message" error={errors.message}><textarea id="message" name="message" rows={4} minLength={20} maxLength={2000} required placeholder="Our website leads go to email. Our team calls them back when they have time…" {...aria("message")} /></Field>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Leave this field blank</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      {state === "error" && <div className="form-error" role="alert"><p>{serverMessage}</p><p>You can also email <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>.</p></div>}
      <button className="auto-button" type="submit" disabled={state === "submitting"} aria-busy={state === "submitting"}>{state === "submitting" ? <><LoaderCircle className="spin" size={18} aria-hidden /> Sending your request</> : <>Request My Automation Demo <ArrowRight size={18} aria-hidden /></>}</button>
      <p className="form-note">We’ll use these details to respond to your request. Please do not include customer records or sensitive information.</p>
    </form>
  );
}

function Field({ label, id, error, children }: { label: string; id: string; error?: string; children: React.ReactNode }) {
  return <div className="field"><label htmlFor={id}>{label}</label>{children}{error && <p className="field-error" id={`${id}-error`}>{error}</p>}</div>;
}
