import type { Metadata } from "next";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { redirect } from "next/navigation";
import { deliverCompletedOrder } from "@/lib/order-delivery";
import {
  createDeliveryAccessPath,
  isCompletedProductPayment,
  verifyPaystackTransaction,
} from "@/lib/paystack";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment Status — WhatsApp Views-to-Sales",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<{ reference?: string | string[]; trxref?: string | string[] }>;
};

export default async function PaymentVerificationPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const rawReference = Array.isArray(params.reference)
    ? params.reference[0]
    : params.reference || (Array.isArray(params.trxref) ? params.trxref[0] : params.trxref) || "";
  const reference = /^[A-Za-z0-9.=-]{5,100}$/.test(rawReference) ? rawReference : "";

  if (!reference) {
    return <PaymentState status="invalid" />;
  }

  let verification: Awaited<ReturnType<typeof verifyPaystackTransaction>>;
  try {
    verification = await verifyPaystackTransaction(reference);
  } catch {
    return <PaymentState status="pending" reference={reference} />;
  }

  if (!isCompletedProductPayment(verification)) {
    return <PaymentState status="pending" reference={reference} />;
  }

  // This product intentionally delivers through the verified callback only.
  const fallbackOrigin = process.env.PAYSTACK_CALLBACK_URL || "http://localhost:3000";
  const delivered = await deliverCompletedOrder(verification, fallbackOrigin);
  if (!delivered) {
    console.error("Payment callback delivery was incomplete. See the email or Telegram error above.");
  }
  redirect(createDeliveryAccessPath(reference));
}

function PaymentState({
  status,
  reference,
}: {
  status: "pending" | "invalid";
  reference?: string;
}) {
  const invalid = status === "invalid";

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <span className={`${styles.icon} ${styles.warning}`} aria-hidden="true">
          {invalid ? <AlertTriangle size={28} /> : <RefreshCw size={28} />}
        </span>
        <p className={styles.eyebrow}>WhatsApp Views-to-Sales</p>
        <h1>
          {invalid ? "We need your payment reference." : "Your payment is not confirmed yet."}
        </h1>
        <p>
          {invalid
            ? "Return from the Paystack checkout or use the payment reference supplied by Paystack."
            : "If you completed payment, wait a moment and check again. Paystack may still be processing the transaction."}
        </p>

        {reference && (
          <div className={styles.reference}>
            <span>Payment reference</span>
            <code>{reference}</code>
          </div>
        )}

        <div className={styles.actions}>
          {reference && <a href={`/payment/verify?reference=${encodeURIComponent(reference)}`}>Check Again</a>}
          <a className={styles.secondary} href="/sell-on-whatsapp">Back To Checkout</a>
        </div>

        <small>Need help? Email <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>.</small>
      </section>
    </main>
  );
}
