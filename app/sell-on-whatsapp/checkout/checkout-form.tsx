"use client";

import { ArrowRight, LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type FieldErrors = Partial<Record<"name" | "email" | "phone", string>>;

export function CheckoutForm() {
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverMessage, setServerMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const nextErrors: FieldErrors = {};

    if (String(data.name || "").trim().length < 2) nextErrors.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.email || ""))) nextErrors.email = "Enter a valid email.";
    if (String(data.phone || "").replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid WhatsApp number.";
    }

    setErrors(nextErrors);
    setServerMessage("");
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/payments/paystack/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { authorizationUrl?: string; message?: string };
      if (!response.ok || !result.authorizationUrl) {
        throw new Error(result.message || "Payment could not be started.");
      }
      window.location.assign(result.authorizationUrl);
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "Payment could not be started.");
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="checkout-name">Full name</label>
        <input
          id="checkout-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Ada Okafor"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "checkout-name-error" : undefined}
        />
        {errors.name && <p id="checkout-name-error">{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="checkout-email">Email address</label>
        <input
          id="checkout-email"
          name="email"
          type="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="ada@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "checkout-email-error" : "checkout-email-hint"}
        />
        {errors.email ? (
          <p id="checkout-email-error">{errors.email}</p>
        ) : (
          <small id="checkout-email-hint">Use the email where you want to receive access.</small>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="checkout-phone">WhatsApp number</label>
        <input
          id="checkout-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+234 801 234 5678"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "checkout-phone-error" : "checkout-phone-hint"}
        />
        {errors.phone ? (
          <p id="checkout-phone-error">{errors.phone}</p>
        ) : (
          <small id="checkout-phone-hint">We will use this for access and first-20 audit instructions.</small>
        )}
      </div>

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="checkout-website">Website</label>
        <input id="checkout-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {serverMessage && <div className={styles.formError} role="alert">{serverMessage}</div>}

      <button type="submit" disabled={submitting} aria-busy={submitting}>
        {submitting ? (
          <><LoaderCircle className={styles.spinner} size={19} aria-hidden="true" />Opening secure checkout</>
        ) : (
          <>Pay ₦10,000 Securely <ArrowRight size={19} aria-hidden="true" /></>
        )}
      </button>
      <p className={styles.paymentNote}>Your payment details are entered securely on Paystack.</p>
    </form>
  );
}
