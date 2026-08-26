import type { Metadata } from "next";
import { Check, Download, FileText, Mail, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import {
  hasValidDeliveryAccessKey,
  isCompletedProductPayment,
  metadataRecord,
  verifyPaystackTransaction,
} from "@/lib/paystack";
import { WHATSAPP_SUPPORT_URL, whatsappProductFiles } from "@/lib/whatsapp-product-files";
import { PurchaseEvent } from "./purchase-event";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Guides  WhatsApp Views-to-Sales",
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
  const downloadUrl = (file: string) =>
    `/api/downloads/whatsapp-guide?reference=${encodeURIComponent(reference)}&key=${encodeURIComponent(rawKey)}&file=${encodeURIComponent(file)}`;

  return (
    <main className={styles.page}>
      <PurchaseEvent reference={reference} />
      <a className={styles.brand} href="/sell-on-whatsapp">
        <span aria-hidden="true">W</span>
        WhatsApp Views-to-Sales
      </a>
      <section className={styles.shell}>
        <div className={styles.confirmation}>
          <span className={styles.check} aria-hidden="true"><Check size={22} /></span>
          <div>
            <p>Payment confirmed</p>
            <h1>Your guides are ready{firstName ? `, ${firstName}` : ""}.</h1>
          </div>
        </div>

        <p className={styles.intro}>
          Your full bundle is ready. Start with the main WhatsApp guide, then use the three bonus guides when you need them.
        </p>

        <div className={styles.documents}>
          {whatsappProductFiles.map((productFile) => (
            <article className={styles.document} key={productFile.id}>
              <span className={styles.fileIcon} aria-hidden="true"><FileText size={29} /></span>
              <div className={styles.fileCopy}>
                <p>{productFile.kind}</p>
                <h2>{productFile.title}</h2>
                <span>{productFile.description} · PDF</span>
              </div>
              <a className={styles.download} href={downloadUrl(productFile.id)} download>
                <Download size={19} aria-hidden="true" />
                Download PDF
              </a>
            </article>
          ))}
        </div>

        <div className={styles.notes}>
          <p><Mail size={17} aria-hidden="true" />We also sent this private access link to your payment email.</p>
          <p><MessageCircle size={17} aria-hidden="true" />Our team has your details and may contact you on WhatsApp.</p>
        </div>

        <a className={styles.whatsapp} href={WHATSAPP_SUPPORT_URL} target="_blank" rel="noreferrer">
          <MessageCircle size={19} aria-hidden="true" />
          Reach Us On WhatsApp
        </a>

        <div className={styles.reference}>
          <span>Payment reference</span>
          <code>{reference}</code>
        </div>

        <small>Keep this page private. You can also email <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>.</small>
      </section>
    </main>
  );
}
