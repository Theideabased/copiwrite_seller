import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { whatsappProductFiles } from "@/lib/whatsapp-product-files";
import { offerConfig } from "./offer-config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Views But No Sales? | WhatsApp Views-to-Sales",
  description: `Learn what to post, how to build trust and what to say when a buyer goes quiet. Get the WhatsApp sales guide and three bonus PDFs for ${offerConfig.price}.`,
};

const lessons = [
  "What to post first so people have a reason to keep watching.",
  "What to show before your price so buyers see the value.",
  "How to reply to “How much?” without making a discount your first move.",
  "How to follow up with a quiet buyer without begging for the sale.",
];

const faqs = [
  {
    question: "How do I get my guides?",
    answer:
      "Pay through Paystack. Once your payment is confirmed, your own download page opens. We also email you the access link. All four guides are PDFs you can save and read on your phone.",
  },
  {
    question: "What if I have low views or sell a service?",
    answer:
      "The guide covers both low views and views that do not lead to sales. You can use the steps for goods or services. Start with the checklist to find what needs work in your business.",
  },
  {
    question: "Do I need to run ads?",
    answer:
      "No. Start with how you use WhatsApp Status and speak with buyers. The ad guides are extras for when you choose to reach more people. Ad spend is separate.",
  },
  {
    question: "What if I follow the steps and still get stuck?",
    answer:
      "Message us on WhatsApp. Help with using the lessons is included. If you follow all the steps and still make no sale, we will help you find where you are stuck. Results depend on your offer and how you use the steps.",
  },
  {
    question: "Who gets the free audit?",
    answer: offerConfig.auditSlotsClaimed >= offerConfig.auditSlotLimit
      ? "All 20 free places have been claimed. The bonus was for the first 20 verified buyers. You can still message info@copiwrite.com for a paid audit with the same review scope. It is a separate paid service."
      : "The first 20 verified buyers qualify. We will contact you to collect the pages for one business. The review covers WhatsApp and your active Instagram, TikTok and Facebook selling pages, with a report on what to fix first.",
  },
  {
    question: "Can you do the work for me, or offer a paid audit?",
    answer: `Yes. If you miss the free bonus, ask for a paid audit with the same review scope. We also offer a separate service to do the work with you. These services cost extra and are outside the ${offerConfig.price} guide bundle.`,
  },
];

function AuditSlotMessage() {
  const { auditSlotLimit, auditSlotsClaimed } = offerConfig;

  if (auditSlotsClaimed >= auditSlotLimit) {
    return (
      <>
        The free-audit bonus is closed. Message{" "}
        <a href="mailto:info@copiwrite.com?subject=Paid%20Social-Selling%20Audit">
          info@copiwrite.com
        </a>{" "}
        for a paid audit quote — same review scope, separate paid service.
      </>
    );
  }

  return (
    <>
      <strong className={styles.auditSlotCount}>
        {auditSlotsClaimed} of {auditSlotLimit}
      </strong>{" "}
      free-audit slots claimed
    </>
  );
}

export default function SellOnWhatsAppPage() {
  const { productName, price, checkoutUrl, auditSlotsClaimed, auditSlotLimit } = offerConfig;
  const auditOpen = auditSlotsClaimed < auditSlotLimit;

  return (
    <main className={`${styles.page} ${styles.concisePage}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.productName} href="#top">
            <span aria-hidden="true">W</span>
            {productName}
          </a>
          <a className={styles.headerLink} href={checkoutUrl}>Buy now — {price}</a>
        </div>
      </header>

      <section className={styles.hero} id="top" aria-labelledby="offer-heading">
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>For Nigerian WhatsApp business owners</p>
            <h1 id="offer-heading">
              They view your status.
              <span>So why don’t they buy?</span>
            </h1>
            <p className={styles.heroLead}>
              Learn what to post, how to build trust, and what to say when a buyer goes quiet.
            </p>
            <p className={styles.heroPrice}><strong>{price}</strong><span>Pay once.</span></p>
            <a className={`${styles.buyButton} ${styles.heroBuyButton}`} href={checkoutUrl}>
              Get My Guides — {price}<ArrowRight size={19} aria-hidden="true" />
            </a>
            <p className={styles.heroMeta}>4 PDF guides · WhatsApp support for your questions</p>
          </div>
          <div className={styles.heroProduct}>
            <Image
              className={styles.bonusMockup}
              src="/products/whatsapp-guide-bonus-bundle.png"
              alt="WhatsApp Views-to-Sales guide with Facebook and Instagram Ads, TikTok Ads, and Social Media Profile Optimization bonuses"
              width={1535}
              height={1024}
              sizes="(max-width: 860px) calc(100vw - 2rem), 520px"
              priority
            />
            <p className={styles.launchTeaser}><AuditSlotMessage /></p>
          </div>
        </div>
      </section>

      <section className={styles.letterSection} id="story" aria-labelledby="story-heading">
        <article className={styles.letter}>
          <p className={styles.chapter}>Before you cut your price again</p>
          <h2 id="story-heading">The sale may slip away before they ask the price.</h2>
          <p>You post your goods. Add the price. Check your views.</p>
          <p>One person asks, “How much?” You reply. Then silence.</p>
          <p>
            It is easy to think your price is the problem. But did they see why
            your product is worth it? Did you give them a reason to trust you?
          </p>
          <div className={styles.quickLesson}>
            <strong>Try this with your next status.</strong>
            <p>Show the problem your product solves. Share proof. Then show the price.</p>
          </div>
          <p>
            The guide walks you through each step, from your first post to
            what you say when a buyer goes quiet.
          </p>
        </article>
      </section>

      <section className={styles.founderAuthoritySection} id="founder-proof" aria-labelledby="founder-heading">
        <aside className={styles.founderAuthority}>
          <Image className={styles.founderLogo} src="/brands/mantajobs.png" alt="Mantajobs" width={1200} height={1140} sizes="80px" />
          <div>
            <h2 id="founder-heading">I use this in Mantajobs.</h2>
            <p className={styles.founderMessage}>
              These same WhatsApp steps helped me land consulting and partnership
              projects worth up to ₦10 million in Mantajobs. The talks started on WhatsApp Status.
            </p>
            <p className={styles.founderName}>Seyi, Founder — Copiwrite &amp; Mantajobs</p>
          </div>
        </aside>
      </section>

      <section className={styles.proofSection} id="customer-results" aria-labelledby="proof-heading">
        <div className={styles.letter}>
          <p className={styles.chapter}>Jewellery. Food. Real businesses.</p>
          <h2 id="proof-heading">See how they used it.</h2>
        </div>
        <div className={styles.proofList}>
          <figure className={styles.proofBlock}>
            <blockquote>
              “With the help I received, Nita Watches has made over ₦2 million
              in jewellery sales through WhatsApp even though I do not have a physical store.”
            </blockquote>
            <figcaption className={styles.proofFooter}>
              <Image className={styles.proofAvatar} src="/testimonials/benita-nita-watches.png" alt="Benita, founder of Nita Watches" width={72} height={72} sizes="56px" />
              <p className={styles.proofAttribution}><strong>Benita</strong><span>Nita Watches · Port Harcourt</span></p>
            </figcaption>
          </figure>
          <figure className={styles.proofBlock}>
            <blockquote>
              “Since I started using this WhatsApp system for my cooked-food
              business, I now get about 50 orders every week.”
            </blockquote>
            <figcaption className={styles.proofFooter}>
              <Image className={styles.proofAvatar} src="/testimonials/olayemi-food-business.png" alt="Olayemi, nurse and cooked-food business owner" width={72} height={72} sizes="56px" />
              <p className={styles.proofAttribution}><strong>Olayemi</strong><span>Nurse &amp; food vendor · Ondo State</span></p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.offerSection} id="offer" aria-labelledby="contents-heading">
        <div className={styles.offerCard}>
          <div className={styles.offerIntro}>
            <p className={styles.chapter}>Inside the guide</p>
            <h2 id="contents-heading">Know what to post. Know what to say next.</h2>
          </div>
          <ul className={styles.guideLessons}>
            {lessons.map((lesson) => (
              <li key={lesson}><Check size={19} aria-hidden="true" /><span>{lesson}</span></li>
            ))}
          </ul>
          <div className={styles.guideBundle}>
            <h3>All four PDFs are yours.</h3>
            <ol>
              {whatsappProductFiles.map((file) => (
                <li key={file.id}><span>{file.kind}</span><strong>{file.title}</strong></li>
              ))}
            </ol>
            <p>Use the checklist to find what to fix first. Message us on WhatsApp when you need help with the steps.</p>
          </div>
          <div className={styles.price} id="price">
            <div><strong>{price}</strong><small>One payment. Main guide + 3 bonuses.</small></div>
            <a className={styles.buyButton} href={checkoutUrl}>Get My Guides — {price}<ArrowRight size={19} aria-hidden="true" /></a>
            <p className={styles.priceReassurance}>Secure Paystack payment. Download after payment is confirmed.</p>
          </div>
          <aside className={styles.bonusStack} aria-label="Free audit bonus availability">
            {auditOpen && <h3>First {auditSlotLimit} buyers get a free sales audit.</h3>}
            <p className={styles.bonusAvailability}><AuditSlotMessage /></p>
            {auditOpen && (
              <p className={styles.bonusLead}>
                We review one business across WhatsApp and your active Instagram,
                TikTok and Facebook pages. You get a clear report on what to fix first.
                Done-for-you work costs extra.
              </p>
            )}
          </aside>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-heading">
        <div className={styles.letter}>
          <h2 id="faq-heading">Before you buy.</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          {offerConfig.implementationUrl && (
            <a className={styles.guaranteeContact} href={offerConfig.implementationUrl}>Ask about paid help to put the steps in place<ArrowRight size={17} aria-hidden="true" /></a>
          )}
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="last-offer-heading">
        <div className={styles.letter}>
          <h2 id="last-offer-heading">Your next status can have a plan.</h2>
          <a className={styles.buyButton} href={checkoutUrl}>Get My Guides — {price}<ArrowRight size={19} aria-hidden="true" /></a>
          <p className={styles.finalBonus}><AuditSlotMessage /></p>
          <a className={styles.questionLink} href="https://wa.me/2347013546734?text=Hi%20Copiwrite%2C%20I%20have%20a%20question%20about%20the%20WhatsApp%20sales%20guide.">
            Have a question? Chat with us on WhatsApp.
          </a>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>{productName} · By Copiwrite</p>
        <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>
      </footer>
      <div className={styles.mobileCta}>
        <a href={checkoutUrl}>Get My Guides — {price}<ArrowRight size={17} aria-hidden="true" /></a>
      </div>
    </main>
  );
}
