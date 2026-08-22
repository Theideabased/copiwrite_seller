import type { Metadata } from "next";
import Image from "next/image";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { offerConfig } from "./offer-config";
import styles from "./page.module.css";
import { MobileCta, SalesVideo } from "./whatsapp-sales-interactions";

export const metadata: Metadata = {
  title: "Why Your WhatsApp Views Are Not Turning Into Sales",
  description:
    "Watch the free video and learn five things to do differently when selling through WhatsApp Status.",
};

const salesChain = [
  "Right people",
  "Attention",
  "Views",
  "Trust",
  "Desire",
  "Conversation",
  "Closing",
  "Follow-up",
  "Sales",
];

const deliverables = [
  {
    title: "The Status Attention System",
    benefit:
      "Know how to open your status so the right people have a reason to stop, tap and keep watching.",
  },
  {
    title: "The What-To-Post Sales Map",
    benefit:
      "Turn random product posts into a deliberate sequence that builds trust, desire and action.",
  },
  {
    title: "The Views-To-Conversation Method",
    benefit:
      "Move interested viewers from silent watching to asking questions and starting a buying conversation.",
  },
  {
    title: "The Closing And Follow-Up Process",
    benefit:
      "Know what to do when somebody asks for the price, says they will get back to you or disappears.",
  },
  {
    title: "Bonus: The WhatsApp Sales Diagnostic",
    benefit:
      "Find the exact weak link between audience, attention, views, trust, desire, closing and follow-up.",
  },
  {
    title: "Bonus: The Implementation Checklist",
    benefit:
      "Turn every lesson into actions you can complete, review and improve inside your own business.",
  },
  {
    title: "Direct Personal Access To Copiwrite",
    benefit:
      "Get a direct contact channel after purchase so you can ask questions when you are applying the system to your business.",
  },
];

const auditAreas = [
  "Your WhatsApp Status and sales flow",
  "Your active Instagram business page",
  "Your active TikTok business page",
  "Your active Facebook business page",
  "Your offer, trust signals and calls to action",
  "Your biggest sales gaps, ranked by priority",
];

const additionalBonuses = [
  "Facebook and Instagram Ads Guide",
  "TikTok Ads Guide",
  "Social Media Profile Optimization",
];

const discoveryBullets = [
  "How to earn attention from your first WhatsApp status without begging for views, dancing on camera or posting all day.",
  "The status-posting mistake that trains good customers to tap past your business before they even see the offer.",
  "What to post before you reveal your price so people understand the value before they judge the number.",
  "How to build trust when people know what you sell but still do not feel ready to buy from you.",
  "The dirty truth about “How much?” and why answering with only a price can quietly kill a sale.",
  "What you should never send when a prospect goes silent and how to follow up without sounding desperate or pushy.",
  "How to locate the exact leak between contacts, views, trust, desire, conversations and sales instead of changing everything at once.",
];

const faqs = [
  {
    question: "Is this only for people with low views?",
    answer:
      "No. It is also for you if people view but do not buy, ask for your price and disappear, or you simply do not know what to post next.",
  },
  {
    question: "Will this guarantee that I make sales?",
    answer:
      "Your result still depends on your product, offer, market and implementation. Complete the lessons and apply every guideline back-to-back. If you still do not make a sale, message us and we will help you identify where the process is getting stuck. If you want us to implement the complete system for your business, that is available as a separate paid service.",
  },
  {
    question: "Can you implement everything for my business?",
    answer:
      "Yes. If you would rather have us review your business and implement the system with you, message us for a separate implementation quote. This done-for-you service is not included in the ₦10,000 product price.",
  },
  {
    question: "What is included in the first-20 buyer audit?",
    answer:
      "We will review the selling presence for one business: your WhatsApp Status and sales process, plus the active Instagram, TikTok and Facebook business pages you submit. You will receive a detailed, prioritized report showing what is weakening attention, trust, your offer, calls to action and follow-up. This is an audit and action report; done-for-you implementation remains a separate paid service.",
  },
  {
    question: "How do I know if I qualify for the free audit?",
    answer:
      "The audit is reserved for the first 20 verified buyers. If your purchase is within those first 20, we will contact you with instructions for submitting one business and its active selling pages. Once all 20 places have been claimed, this bonus closes.",
  },
  {
    question: "What if I miss the first 20 or want the audit but don't qualify?",
    answer:
      "You can still message us for a paid audit of your social-selling presence. It follows the same review process as the free bonus — your WhatsApp Status, active Instagram/TikTok/Facebook pages, and a prioritized action report — just as a separate paid service outside the ₦10,000 product price.",
  },
  {
    question: "What does direct personal access mean?",
    answer:
      "After purchase, you will receive a direct contact channel for asking questions about applying the lessons to your business. It gives you guidance when you get stuck; it does not include unlimited done-for-you content, page management or full implementation.",
  },
  {
    question: "Do I have to watch the video before I can buy?",
    answer:
      "No. You can watch the free lesson, read the sales letter or go directly to the offer. Nothing is locked.",
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
  const { productName, price, originalValue, videoUrl, checkoutUrl } =
    offerConfig;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.productName} href="#top">
            <span aria-hidden="true">W</span>
            WhatsApp Views-to-Sales
          </a>
          <a className={styles.headerLink} href="#offer">
            See what you get
          </a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>For business owners who sell on WhatsApp</p>
          <h1>
            Do you post on your WhatsApp status and you have low views?
            <span>Or you even have views and nobody is buying?</span>
          </h1>
          <p className={styles.heroLead}>Then watch this video to the end.</p>
        </div>

        <div className={styles.videoWrap} aria-label="Free WhatsApp sales video">
          <SalesVideo videoUrl={videoUrl} />
        </div>

        <p className={styles.videoNote}>
          This free lesson shows you why people may be ignoring your business
          status—and five things you can start doing differently.
        </p>

        <div className={styles.afterVideoOffer}>
          <div>
            <strong>{price} · One-time payment</strong>
            <p className={styles.launchTeaser}>
              <AuditSlotMessage />
            </p>
          </div>
          <a href={checkoutUrl}>
            Start Implementing Now
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>

        <a className={styles.continueLink} href="#story">
          Want to see exactly what you get first? Keep reading.
          <ArrowDown size={17} aria-hidden="true" />
        </a>
      </section>

      <section className={styles.letterSection} id="story">
        <article className={styles.letter}>
          <p className={styles.chapter}>The frustrating part</p>
          <h2>You Can Post Every Day And Still Be Fixing The Wrong Problem.</h2>

          <p>
            You have tried posting more. Adding your price. Sharing product
            pictures. Running discounts. Saving more contacts. Telling people
            to patronize you.
          </p>
          <p>
            Still, you check your views again and again hoping today will be
            different.
          </p>
          <p>
            Sometimes the views are low. Sometimes people watch and say
            nothing. Sometimes someone asks, “How much?” then disappears the
            moment you reply.
          </p>
          <p>
            Those situations feel like one big problem: <strong>“WhatsApp is
            not working for my business.”</strong> But they are not the same
            problem, and they cannot be fixed with the same advice.
          </p>

          <div className={styles.wrongFixes}>
            <p><span>Low views?</span> More contacts will not fix a status nobody wants to open.</p>
            <p><span>Views but no sales?</span> Posting more will not fix weak trust or an unclear reason to buy.</p>
            <p><span>Price then silence?</span> A discount will not always fix an unanswered objection.</p>
          </div>

          <p className={styles.pullQuote}>
            More views can help. But views alone do not create trust, answer
            objections or close a sale.
          </p>
        </article>
      </section>

      <section className={styles.founderAuthoritySection} id="founder-proof" aria-labelledby="founder-authority-heading">
        <aside className={styles.founderAuthority}>
          <Image
            className={styles.founderLogo}
            src="/brands/mantajobs.png"
            alt="Mantajobs"
            width={1200}
            height={1140}
            sizes="112px"
          />
          <div>
            <p className={styles.founderLabel}>Used in the Mantajobs business</p>
            <h2 id="founder-authority-heading">I Use This System In Mantajobs.</h2>
            <p className={styles.founderMessage}>
              These same WhatsApp principles helped me land consulting and
              partnership projects worth up to ₦10 million through WhatsApp Status.
            </p>
            <p className={styles.founderName}>Seyi, Founder — Copiwrite &amp; Mantajobs.</p>
          </div>
        </aside>
      </section>

      <section className={styles.changesSection}>
        <div className={styles.letter}>
          <p className={styles.chapter}>The reason random tips fail</p>
          <h2>A Sale Is The Last Step In A Chain.</h2>
          <p>
            Before somebody buys, the right person has to see your status. Your
            first post has to earn their attention. What follows has to build
            trust, create desire and make starting a conversation feel easy.
          </p>
          <p>
            Then, when they message you, the conversation, closing and follow-up
            still have to move them forward. One weak link can stop the sale.
          </p>

          <ol className={styles.salesChain} aria-label="The WhatsApp sales chain">
            {salesChain.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
                {index < salesChain.length - 1 && <ArrowDown size={16} aria-hidden="true" />}
              </li>
            ))}
          </ol>

          <p className={styles.pullQuote}>
            Your first job is not to post more. Your first job is to find the
            weak link—then fix the right problem.
          </p>
        </div>
      </section>

      <section className={styles.systemSection} id="system">
        <article className={styles.letter}>
          <p className={styles.chapter}>The difference that matters</p>
          <h2>Information Leaves You With Homework. A System Shows You What To Do Next.</h2>

          <p>
            You can watch the entire video, agree with every word and still
            wake up tomorrow with your phone in your hand asking:
          </p>

          <div className={styles.questions}>
            <p>What exactly should I post?</p>
            <p>What do I do first?</p>
            <p>What should come after my first status?</p>
            <p>What should I say?</p>
            <p>When should I follow up?</p>
            <p>How do I create an offer people actually want?</p>
            <p>How do I use this for <em>my</em> business?</p>
          </div>

          <p>
            You do not need another list of things you “should” be doing. You
            need a way to look at your business, identify the real gap and know
            what to implement first.
          </p>
          <p>
            That is why I created <strong>{productName}</strong>: a guided
            implementation system that takes you from diagnosis to action, one
            part of the WhatsApp sales process at a time.
          </p>

          <div className={styles.outcomeBlock}>
            <span>The goal is simple</span>
            <p>Stop asking “What should I try today?”</p>
            <strong>Start knowing what your business needs next.</strong>
          </div>
        </article>
      </section>

      <section className={styles.discoverySection}>
        <article className={styles.letter}>
          <p className={styles.chapter}>Inside the complete system</p>
          <h2>What Changes When You Stop Treating Your Status Like A Digital Price List?</h2>
          <p className={styles.discoveryLead}>
            You stop hoping that another “Available now” post will suddenly do
            what the last twenty could not. You start using each status for a
            specific job in the sale.
          </p>

          <ul className={styles.discoveryBullets}>
            {discoveryBullets.map((bullet) => (
              <li key={bullet}>
                <Check size={20} aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <p className={styles.pullQuote}>
            You do not need to become a content creator. You need to know what
            each post is supposed to make the buyer think, feel or do next.
          </p>
        </article>
      </section>

      <section className={styles.proofSection} id="customer-results">
        <div className={styles.proofList}>
          <figure className={`${styles.letter} ${styles.proofBlock}`}>
          <p className={styles.chapter}>A real WhatsApp business result</p>
          <blockquote>
            “With the help I received, Nita Watches has made over ₦2 million
            in jewellery sales through WhatsApp even though I do not have a
            physical store.”
          </blockquote>
          <figcaption className={styles.proofFooter}>
            <Image
              className={styles.proofAvatar}
              src="/testimonials/benita-nita-watches.png"
              alt="Benita, founder of Nita Watches in Port Harcourt"
              width={72}
              height={72}
              sizes="72px"
            />
            <p className={styles.proofAttribution}>
              <strong>Benita</strong>
              <span>Founder, Nita Watches · Port Harcourt</span>
            </p>
            <p className={styles.proofResult}>
              <strong>₦2M+</strong>
              <span>WhatsApp jewellery sales · No physical store</span>
            </p>
          </figcaption>
          </figure>

          <figure className={`${styles.letter} ${styles.proofBlock}`}>
            <p className={styles.chapter}>Another business using the system</p>
            <blockquote>
              “Since I started using this WhatsApp system for my cooked-food
              business, I now get about 50 orders every week.”
            </blockquote>
            <figcaption className={styles.proofFooter}>
              <Image
                className={styles.proofAvatar}
                src="/testimonials/olayemi-food-business.png"
                alt="Olayemi, orthopaedic nurse and cooked-food business owner in Ondo State"
                width={72}
                height={72}
                sizes="72px"
              />
              <p className={styles.proofAttribution}>
                <strong>Olayemi</strong>
                <span>Orthopaedic nurse &amp; cooked-food business owner · Ondo State</span>
              </p>
              <p className={styles.proofResult}>
                <strong>50 orders</strong>
                <span>Every week</span>
              </p>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={styles.offerSection} id="offer">
        <div className={styles.offerCard}>
          <div className={styles.offerIntro}>
            <p className={styles.chapter}>Introducing the implementation system</p>
            <h2>{productName}</h2>
            <p>
              Turn your WhatsApp Status from a collection of product posts into
              a guided sales conversation one deliberate step at a time.
            </p>
            <p className={styles.notTips}>This is a process to work through, not content to consume and forget.</p>
          </div>

          <div className={styles.transformation}>
            <p>Instead of...</p>
            <ul>
              <li>Posting whatever comes to mind</li>
              <li>Blaming low views for every sales problem</li>
              <li>Dropping your price when people disappear</li>
              <li>Trying one new tip every week</li>
            </ul>
            <strong>You will have a process for deciding what deserves your attention first.</strong>
          </div>

          <div className={styles.included}>
            <h3>Here&apos;s exactly what you get:</h3>
            <ul>
              {deliverables.map((item) => (
                <li key={item.title}>
                  <Check size={19} aria-hidden="true" />
                  <span><strong>{item.title}</strong><small>{item.benefit}</small></span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.resourceBonuses}>
            <div className={styles.resourceBonusIntro}>
              <p className={styles.chapter}>Included with every purchase</p>
              <h3>You Also Get These 3 Bonuses.</h3>
              <p>
                Use the main WhatsApp sales guide to improve how you sell, then
                use these bonuses to reach more people and prepare your social
                profiles for buyers.
              </p>
            </div>
            <Image
              className={styles.bonusMockup}
              src="/products/whatsapp-guide-bonus-bundle.png"
              alt="WhatsApp Views-to-Sales guide with Facebook and Instagram Ads, TikTok Ads, and Social Media Profile Optimization bonuses"
              width={1535}
              height={1024}
              sizes="(max-width: 640px) calc(100vw - 3rem), 56rem"
            />
            <ol className={styles.resourceBonusList}>
              {additionalBonuses.map((bonus, index) => (
                <li key={bonus}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{bonus}</strong>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.bonusStack}>
            <p className={styles.bonusBadge}>
              Limited launch bonus
            </p>
            <p className={styles.bonusAvailability}><AuditSlotMessage /></p>
            <h3>We Will Review Your Social-Selling Presence For Free.</h3>
            <p className={styles.bonusLead}>
              You will not be left wondering whether you applied the system
              correctly. If you are among the first 20 verified buyers, submit
              one business and we will examine the places where you actively
              sell not only WhatsApp.
            </p>
            <ul className={styles.bonusGrid}>
              {auditAreas.map((area) => (
                <li key={area}>
                  <Check size={18} aria-hidden="true" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
            <div className={styles.reportPromise}>
              <strong>Your result: a detailed, prioritized action report.</strong>
              <p>
                You will see what is helping, what is costing you attention or
                trust, and what to fix first across the channels you submit.
              </p>
            </div>
            <p className={styles.personalAccess}>
              <strong>Every buyer also gets direct personal access to Copiwrite</strong>
              <span>
                Ask implementation questions when you get stuck instead of
                abandoning the system halfway.
              </span>
            </p>
            <p className={styles.bonusLimit}>
              The free audit covers one business per eligible buyer. It is an
              audit and report, not done-for-you implementation. Once the first
              20 verified purchases are claimed, this bonus closes.
            </p>
          </div>

          <div className={styles.fitSection}>
            <div>
              <h3>This is for you if...</h3>
              <p>You sell a real product or service on WhatsApp, are willing to follow the lessons in order and want a structured way to improve low views, weak response or lost enquiries.</p>
            </div>
            <div>
              <h3>This is not for you if...</h3>
              <p>You want an overnight trick, refuse to change how you post and follow up, or expect customers to buy without giving them a clear reason.</p>
            </div>
          </div>

          <div className={styles.honestNote}>
            <p className={styles.guaranteeLabel}>Implementation support when you need it</p>
            <h3>Follow Everything. Still No Sale? Bring It To Us.</h3>
            <p>
              Complete the lessons. Use the diagnostic. Apply every guideline
              back-to-back across your status, offer, conversations and
              follow-up. If you still do not make a sale, message us.
            </p>
            <p>
              We will help you identify where the process is getting stuck. If
              you want us to personally implement the complete system for your
              business, you can hire us separately for that service. The
              implementation fee is not included in the {price} product price.
            </p>
            <a
              className={styles.guaranteeContact}
              href="mailto:info@copiwrite.com?subject=WhatsApp%20Views-to-Sales%20Implementation%20Promise"
            >
              Ask about personal implementation
            </a>
          </div>

          <div className={styles.price} id="price">
            <div>
              {originalValue && (
                <p className={styles.originalValue}>
                  Normal value: <s>{originalValue}</s>
                </p>
              )}
              <span>Get complete access today</span>
              <strong>{price}</strong>
              <small>
                {offerConfig.hasConfiguredPrice
                  ? "One-time payment"
                  : "Add the final price before publishing"}
              </small>
            </div>
            <a className={styles.buyButton} href={checkoutUrl}>
              Start Implementing Now
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <p className={styles.auditReminder}>
              <AuditSlotMessage />
            </p>
            <p className={styles.priceReassurance}>One clear system. One payment. Direct personal access is included. Done-for-you implementation is available as a separate paid service.</p>
          </div>
        </div>
      </section>

      {offerConfig.implementationUrl && (
        <section className={styles.implementationHelp}>
          <div className={styles.letter}>
            <p className={styles.chapter}>A separate option</p>
            <h2>Don&apos;t Want To Implement Everything Yourself?</h2>
            <p>
              We can look at your business with you, identify what is stopping
              your WhatsApp views or sales and help implement the system for
              your specific business.
            </p>
            <strong>
              This is a separate premium service. It is not included in the
              standard product price.
            </strong>
            <a href={offerConfig.implementationUrl}>
              Get help implementing it
              <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      )}

      <section className={styles.faqSection}>
        <div className={styles.letter}>
          <h2>Questions You May Still Have</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.letter}>
          <h2>The Next Time Your Views Drop, You Should Know What To Look At.</h2>
          <p>
            And when people view without buying, you should know the next part
            of the process to examine instead of blaming your customers,
            dropping your price or posting twenty more products.
          </p>
          <p>
            {productName} gives you a process you can return to whenever your
            WhatsApp sales feel stuck—and direct access to ask for guidance
            while you put it to work.
          </p>
          <p className={styles.finalBonus}>
            <AuditSlotMessage />
          </p>
          <p className={styles.finalPrice}>{productName} · {price}</p>
          <a className={styles.buyButton} href={checkoutUrl}>
            Start Implementing Now
            <ArrowRight size={19} aria-hidden="true" />
          </a>
          <p className={styles.postscript}>
            <strong>P.S.</strong> If you keep posting the same way, the result
            has no reason to change. Your next status can be another guess or
            the first step in a sales system you finally understand.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>WhatsApp Views-to-Sales · A Copiwrite product</p>
        <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>
      </footer>

      <MobileCta
        checkoutUrl={checkoutUrl}
        price={price}
        hasConfiguredPrice={offerConfig.hasConfiguredPrice}
      />
    </main>
  );
}
