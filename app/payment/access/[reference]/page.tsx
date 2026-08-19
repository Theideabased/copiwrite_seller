import type { Metadata } from "next";
import { Check, Download, FileText, Mail, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import {
  hasValidDeliveryAccessKey,
  isCompletedProductPayment,
  metadataRecord,
  verifyPaystackTransaction,
} from "@/lib/paystack";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Guide — WhatsApp Views-to-Sales",
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ reference: string }>;
  searchParams: Promise<{ key?: string | string[] }>;
};

export default async function BuyerAccessPage({ params, searchParams }: PageProps) {
  const { reference: rawReference } = await params;
  const query = await searchParams;
  const rawKey = Array.isArray(query.key) ? query.key[0] : query.key || "";
  const reference = /^[A-Za-z0-9.=-]{5,100}$/.test(rawReference) ? rawReference : "";

  if (!reference || !hasValidDeliveryAccessKey(reference, rawKey)) notFound();

  const verification = await verifyPaystackTransaction(reference).catch(() => null);
  if (!verification || !isCompletedProductPayment(verification)) notFound();

  const metadata = metadataRecord(verification.data?.metadata);
  const name = String(metadata.buyer_name || "");
  const firstName = name.split(/\s+/)[0];
  const downloadUrl = `/api/downloads/whatsapp-guide?reference=${encodeURIComponent(reference)}&key=${rawKey}`;

  return (
    <main className={styles.page}>
      <a className={styles.brand} href="/sell-on-whatsapp">
        <span aria-hidden="true">W</span>
        WhatsApp Views-to-Sales
      </a>
      <section className={styles.shell}>
        <div className={styles.confirmation}>
          <span className={styles.check} aria-hidden="true"><Check size={22} /></span>
          <div>
            <p>Payment confirmed</p>
            <h1>Your guide is ready{firstName ? `, ${firstName}` : ""}.</h1>
          </div>
        </div>

        <p className={styles.intro}>
          Download your WhatsApp Views-to-Sales step-by-step guide and start with the first action today.
        </p>

        <article className={styles.document}>
          <span className={styles.fileIcon} aria-hidden="true"><FileText size={29} /></span>
          <div className={styles.fileCopy}>
            <p>PDF guide</p>
            <h2>WhatsApp Views-to-Sales</h2>
            <span>Step-by-step video slides · PDF</span>
          </div>
          <a className={styles.download} href={downloadUrl} download>
            <Download size={19} aria-hidden="true" />
            Download PDF
          </a>
        </article>

        <div className={styles.notes}>
          <p><Mail size={17} aria-hidden="true" />We also sent this private access link to your payment email.</p>
          <p><MessageCircle size={17} aria-hidden="true" />Our team has your details and may contact you on WhatsApp.</p>
        </div>

        <div className={styles.reference}>
          <span>Payment reference</span>
          <code>{reference}</code>
        </div>

        <small>Keep this page private. Need help? <a href="mailto:info@copiwrite.com">info@copiwrite.com</a></small>
      </section>
    </main>
  );
}
