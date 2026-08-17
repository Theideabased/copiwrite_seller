import type { Metadata } from "next";
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
    title: "The complete step-by-step implementation system",
    benefit:
      "Work through your WhatsApp sales process in order instead of collecting random tips.",
  },
  {
    title: "The WhatsApp Sales Diagnostic",
    benefit:
      "Identify whether your real problem is audience, attention, views, trust, conversion, closing or follow-up.",
  },
  {
    title: "The Implementation Checklist",
    benefit:
      "Turn what you learn into actions you can complete, review and improve in your own business.",
  },
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
      "No honest person can guarantee that. Your product, market, offer, pricing and implementation all affect your result. This system helps you identify and improve the WhatsApp sales process you can control.",
  },
  {
    question: "Do I have to watch the video before I can buy?",
    answer:
      "No. You can watch the free lesson, read the sales letter or go directly to the offer. Nothing is locked.",
  },
];

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
            <span>Ready to stop guessing what to post?</span>
            <strong>Get the step-by-step implementation system.</strong>
            <p>
              Find what is stopping your WhatsApp views or sales—and know what
              to implement next.
            </p>
            <small>
              {offerConfig.hasConfiguredPrice
                ? `${productName} · ${price} · One-time payment`
                : "Final price coming soon"}
            </small>
          </div>
          <a href={checkoutUrl}>
            Get The Complete System
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
            You save more contacts. You post consistently. You add your price.
            You tell people to patronize you. Then you check your views again
            and again, hoping today will be different.
          </p>
          <p>
            Sometimes the views are low. Sometimes people watch and say
            nothing. Sometimes someone asks, “How much?”—then disappears the
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
            When you don&apos;t know which part is broken, every new WhatsApp tip
            becomes another guess.
          </p>
        </article>
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

      <section className={styles.offerSection} id="offer">
        <div className={styles.offerCard}>
          <div className={styles.offerIntro}>
            <p className={styles.chapter}>Introducing the implementation system</p>
            <h2>{productName}</h2>
            <p>
              Know where your WhatsApp selling process is leaking—and follow a
              clear path for deciding what to implement next.
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

          <div className={styles.fitSection}>
            <div>
              <h3>This is for you if...</h3>
              <p>You already use WhatsApp to sell and want a structured way to improve low views, weak response or lost enquiries.</p>
            </div>
            <div>
              <h3>This is not for you if...</h3>
              <p>You want guaranteed income, an overnight trick, or a result without changing how you post, sell and follow up.</p>
            </div>
          </div>

          <div className={styles.honestNote}>
            <h3>“What if I pay and nothing changes about my sales?”</h3>
            <p>
              That is a fair question. Your product, market, offer, price and
              implementation still matter, so there is no honest way to
              guarantee income. What this system removes is the blind guessing:
              you will know what to examine, what to change, what to test and
              what to work on next.
            </p>
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
              Get {productName}
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <p className={styles.priceReassurance}>One clear system. One payment. Implement at your own pace.</p>
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
            of the process to examine—instead of blaming your customers,
            dropping your price or posting twenty more products.
          </p>
          <p>
            {productName} gives you a process you can return to whenever your
            WhatsApp sales feel stuck.
          </p>
          <p className={styles.finalPrice}>{productName} · {price}</p>
          <a className={styles.buyButton} href={checkoutUrl}>
            Get The Complete System
            <ArrowRight size={19} aria-hidden="true" />
          </a>
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
