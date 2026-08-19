import type { Metadata } from "next";
import { Check, LockKeyhole } from "lucide-react";
import { CheckoutForm } from "./checkout-form";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Checkout — WhatsApp Views-to-Sales",
  description: "Complete your payment for WhatsApp Views-to-Sales.",
  robots: { index: false, follow: false },
};

export default function WhatsAppCheckoutPage() {
  return (
    <main className={styles.page}>
      <a className={styles.brand} href="/sell-on-whatsapp">
        <span aria-hidden="true">W</span>
        WhatsApp Views-to-Sales
      </a>

      <div className={styles.checkoutGrid}>
        <section className={styles.summary} aria-labelledby="order-heading">
          <p className={styles.eyebrow}>Your order</p>
          <h1 id="order-heading">Start turning views into sales.</h1>
          <p className={styles.intro}>
            Enter your details, then continue to Paystack to complete your secure payment.
          </p>

          <ul>
            <li><Check size={18} aria-hidden="true" />Complete implementation system</li>
            <li><Check size={18} aria-hidden="true" />Sales diagnostic and checklist</li>
            <li><Check size={18} aria-hidden="true" />Direct personal access to Copiwrite</li>
            <li><Check size={18} aria-hidden="true" />First-20 audit, while places remain</li>
          </ul>

          <div className={styles.total}>
            <span>Total</span>
            <strong>₦5,000</strong>
            <small>One-time payment</small>
          </div>
        </section>

        <section className={styles.formCard} aria-labelledby="buyer-heading">
          <div className={styles.secureLabel}>
            <LockKeyhole size={16} aria-hidden="true" />
            Secure Paystack checkout
          </div>
          <h2 id="buyer-heading">Where should we send your access?</h2>
          <CheckoutForm />
        </section>
      </div>
    </main>
  );
}
