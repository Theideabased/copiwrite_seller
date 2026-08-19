import type { Metadata } from "next";
import { LockKeyhole } from "lucide-react";
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
          <h1 id="order-heading">Complete your order.</h1>
          <p className={styles.total}><strong>₦10,000</strong><span>One-time payment</span></p>
        </section>

        <section className={styles.formCard} aria-labelledby="buyer-heading">
          <div className={styles.secureLabel}>
            <LockKeyhole size={16} aria-hidden="true" />
            Secure Paystack checkout
          </div>
          <h2 id="buyer-heading">Enter your details</h2>
          <CheckoutForm />
        </section>
      </div>
    </main>
  );
}
