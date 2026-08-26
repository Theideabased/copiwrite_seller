import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, MessageCircle, Search } from "lucide-react";
import { offerConfig } from "../sell-on-whatsapp/offer-config";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The WhatsApp Secret Behind ₦10 Million In Sales",
  description:
    "A plain, step-by-step guide to help you turn WhatsApp Status views into more sales without relying on ads.",
  robots: {
    index: false,
    follow: false,
  },
};

const fiveChecks = [
  {
    number: "01",
    title: "Get the right eyes",
    text: "A large contact list is not enough. You need people who may want what you sell.",
  },
  {
    number: "02",
    title: "Earn the next tap",
    text: "Your first post must give the right person a good reason to keep watching.",
  },
  {
    number: "03",
    title: "Build trust",
    text: "Show how it works. Teach one small thing. Share proof that a buyer can check.",
  },
  {
    number: "04",
    title: "Make the next step clear",
    text: "Do not end every post with just a price. Tell the buyer what to do next.",
  },
  {
    number: "05",
    title: "Follow up with care",
    text: "A person who went quiet may still want to buy. Give them a useful reason to reply.",
  },
];

const systemItems = [
  "A clear check to find what is stopping your views or sales",
  "A simple way to plan what you will post",
  "Steps that move a viewer from interest to a chat",
  "Words to use when a buyer asks for the price",
  "A follow-up plan for people who go quiet",
  "Facebook and Instagram Ads Guide",
  "TikTok Ads Guide",
  "Social Media Profile Optimization Guide",
  "Direct access to ask us a question when you get stuck",
];

const faqs = [
  {
    question: "Can this help me make 90–400 sales each month?",
    answer:
      "It can help you build the steps needed to get more views, chats and sales. Your own number will depend on what you sell, your price, your market and how well you use the steps. The aim is to stop guessing and improve each part you can control.",
  },
  {
    question: "Do I need to run ads?",
    answer:
      "No. The main plan is built for WhatsApp Status and can be used without ads. The ad guides are extra tools for the day you want to reach more people.",
  },
  {
    question: "What if I get views but no one buys?",
    answer:
      "The guide does not stop at views. It helps you check trust, your offer, the next step, the sales chat and your follow-up.",
  },
  {
    question: "What if I use the full guide and still get no sale?",
    answer:
      "Message us. We will help you find where the steps are stuck. If you want us to do the full work for you, that is a separate paid service.",
  },
  {
    question: "How will I get the guide?",
    answer:
      "After Paystack confirms your payment, you will go to your own access page. You can download the guide there. We will also send access to your email.",
  },
];

function AuditMessage() {
  const { auditSlotLimit, auditSlotsClaimed } = offerConfig;

  if (auditSlotsClaimed >= auditSlotLimit) {
    return (
      <>
        The free audit is now closed. You can email{" "}
        <a href="mailto:info@copiwrite.com?subject=Paid%20Social-Selling%20Audit">
          info@copiwrite.com
        </a>{" "}
        for a paid audit.
      </>
    );
  }

  return (
    <>
      <strong>{auditSlotsClaimed} of {auditSlotLimit}</strong> free audit spots claimed
    </>
  );
}

export default function SellOnWhatsAppTextPage() {
  const { productName, price, checkoutUrl } = offerConfig;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="WhatsApp Views-to-Sales home">
            <span aria-hidden="true">W</span>
            WhatsApp Views-to-Sales
          </a>
          <a className={styles.headerLink} href="#system">See the full plan</a>
        </div>
      </header>

      <section className={styles.hero} id="top">
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>For you if you sell on WhatsApp</p>
          <h1>The Secret A WhatsApp Vendor Used To Make ₦10 Million In WhatsApp Sales</h1>
          <p className={styles.subtitle}>
            How would you like 90–400 sales per month on WhatsApp?
          </p>
          <p className={styles.supportingLine}>
            Secret way to boost WhatsApp views and sales without running ads
          </p>

          <div className={styles.numberBreakdown} aria-label="Monthly sales target broken into daily sales">
            <p><strong>90</strong><span>sales a month</span><small>3 sales a day</small></p>
            <p><strong>400</strong><span>sales a month</span><small>about 13 sales a day</small></p>
          </div>

          <p className={styles.heroNote}>
            That will not come from luck. It starts when the right person sees
            the right post, trusts you and knows what to do next.
          </p>
          <a className={styles.primaryButton} href="#how-it-works">
            Let me show you
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className={styles.noVideo}>No long video. The full lesson is on this page.</p>
        </div>
      </section>

      <section className={styles.letterSection} id="how-it-works">
        <article className={styles.letter}>
          <p className={styles.kicker}>Let us be plain</p>
          <h2>You Do Not Need Every Contact To Buy.</h2>

          <p>You need the right few people to take the next step.</p>

          <p>But this may be what happens now.</p>

          <p>You post a shoe. A cake. A wig. A watch. A service.</p>

          <p>You add the price.</p>

          <p>Then you wait.</p>

          <div className={styles.shortList}>
            <p>Some days, your views are low.</p>
            <p>Some days, people watch but say nothing.</p>
            <p>Some ask, “How much?” Then they go quiet.</p>
          </div>

          <p>
            So you post more. You add more contacts. You cut your price. You may
            even pay for ads.
          </p>

          <p className={styles.pullQuote}>
            But more eyes will not fix a sales path that is not clear.
          </p>
        </article>
      </section>

      <section className={styles.darkSection}>
        <div className={styles.letter}>
          <p className={styles.kicker}>The part most people miss</p>
          <h2>Ads Can Bring A Crowd. They Cannot Make The Crowd Trust You.</h2>
          <p>
            If your first post feels like an ad, people tap past it.
          </p>
          <p>
            If your page feels weak, they do not trust it.
          </p>
          <p>
            If your offer is not clear, they do not act.
          </p>
          <p>
            If you do not follow up, warm buyers get cold.
          </p>
          <p className={styles.darkCallout}>
            The secret is not one magic post. It is a set of small steps that
            work in the right order.
          </p>
        </div>
      </section>

      <section className={styles.factsSection}>
        <div className={styles.wide}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>This is how Nigerians already sell</p>
            <h2>WhatsApp Is Not A Side Tool In Nigeria.</h2>
            <p>
              This is not a plan copied from the US. Nigerian firms already use
              chats and social pages to find buyers and close sales.
            </p>
          </div>

          <div className={styles.factGrid}>
            <article>
              <strong>95%</strong>
              <p>of the Nigerian firms in a GSMA study said online trade raised their sales.</p>
              <a href="https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/webinar-e-commerce-in-nigeria-unleashing-the-opportunity-for-msmes/" target="_blank" rel="noreferrer">
                Source: GSMA Nigeria study, 2023
              </a>
            </article>
            <article>
              <strong>More than half</strong>
              <p>sold only through social pages such as WhatsApp, Facebook and Instagram.</p>
              <a href="https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/gsma_resources/webinar-e-commerce-in-nigeria-unleashing-the-opportunity-for-msmes/" target="_blank" rel="noreferrer">
                Source: GSMA Nigeria study, 2023
              </a>
            </article>
            <article>
              <strong>No. 1</strong>
              <p>WhatsApp was the top named chat and sales tool in a PwC survey of 557 Nigerian firms.</p>
              <a href="https://www.pwc.com/ng/en/assets/pdf/2024-pwc-msme-survey-report.pdf" target="_blank" rel="noreferrer">
                Source: PwC Nigeria, 2024
              </a>
            </article>
          </div>

          <p className={styles.factClose}>
            So the issue is not if Nigerians buy through social pages. They do.
            The issue is if your own posts help them stop, trust you and send a chat.
          </p>
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderNote}>
          <Image
            src="/brands/mantajobs.png"
            alt="Mantajobs"
            width={1200}
            height={1140}
            sizes="96px"
          />
          <div>
            <p className={styles.kicker}>What I changed in three months</p>
            <h2>I Did Not Post More. I Gave Each Post A Job.</h2>
            <p>
              I tested these steps in Mantajobs, a very different type of
              business.
            </p>

            <div className={styles.storySteps}>
              <p><strong>Month one:</strong> I stopped using Status like a board full of ads. I looked at where people lost care.</p>
              <p><strong>Month two:</strong> Each post got one job. Get a tap. Build trust. Show the value. Or start a chat.</p>
              <p><strong>Month three:</strong> I made the next step clear and gave warm leads a good reason to reply.</p>
            </div>

            <p>
              Chats that began on WhatsApp Status helped me win consulting and
              partnership work worth up to ₦10 million.
            </p>
            <p>
              I did not need to post all day. I needed each post to move the
              right person one step.
            </p>
            <strong>Seyi, Founder — Copiwrite &amp; Mantajobs</strong>
          </div>
        </div>
      </section>

      <section className={styles.checksSection}>
        <div className={styles.wide}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Try this before your next post</p>
            <h2>Check These Five Things.</h2>
            <p>One weak step can stop the sale. Find it before you change all else.</p>
          </div>

          <ol className={styles.checkGrid}>
            {fiveChecks.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ol>

          <div className={styles.quickTest}>
            <Search size={30} aria-hidden="true" />
            <div>
              <strong>A quick test for today</strong>
              <p>
                Open your last ten status posts. Count how many teach, show proof
                or ask for a small next step. If all ten only show a product and
                price, you have found one place to start.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.proofSection}>
        <div className={styles.wide}>
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Real people. Two types of work.</p>
            <h2>What This Can Look Like.</h2>
          </div>

          <div className={styles.proofGrid}>
            <figure>
              <blockquote>
                “With the help I received, Nita Watches has made over ₦2 million
                in jewellery sales through WhatsApp even though I do not have a
                physical store.”
              </blockquote>
              <figcaption>
                <Image
                  src="/testimonials/benita-nita-watches.png"
                  alt="Benita, founder of Nita Watches"
                  width={72}
                  height={72}
                  sizes="72px"
                />
                <p><strong>Benita</strong><span>Nita Watches · Port Harcourt</span></p>
                <p className={styles.result}><strong>₦2M+</strong><span>WhatsApp sales</span></p>
              </figcaption>
            </figure>

            <figure>
              <blockquote>
                “Since I started using this WhatsApp system for my cooked-food
                business, I now get about 50 orders every week.”
              </blockquote>
              <figcaption>
                <Image
                  src="/testimonials/olayemi-food-business.png"
                  alt="Olayemi, food business owner in Ondo State"
                  width={72}
                  height={72}
                  sizes="72px"
                />
                <p><strong>Olayemi</strong><span>Food business · Ondo State</span></p>
                <p className={styles.result}><strong>50 orders</strong><span>Each week</span></p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className={styles.bridgeSection}>
        <article className={styles.letter}>
          <p className={styles.kicker}>Now you know the main idea</p>
          <h2>But Knowing Is Not The Same As Doing.</h2>

          <p>You can save this page.</p>

          <p>You can try one tip today.</p>

          <p>Then next week, you may still ask:</p>

          <div className={styles.questionBox}>
            <p>What do I post first?</p>
            <p>What comes next?</p>
            <p>What do I say when they ask for the price?</p>
            <p>When should I follow up?</p>
          </div>

          <p>
            That is why I put the full plan in one place. You can follow it one
            step at a time.
          </p>

          <div className={styles.choiceBox}>
            <div>
              <span>If you keep guessing</span>
              <p>You may post more, cut your price and still not know what stopped the sale.</p>
            </div>
            <div>
              <span>If you use a clear plan</span>
              <p>You can know what to post, what to fix and what to say next.</p>
            </div>
          </div>

          <p className={styles.pullQuote}>
            Your goal is not to make noise. It is to help the right buyer take
            the next small step.
          </p>
        </article>
      </section>

      <section className={styles.offerSection} id="system">
        <div className={styles.offerCard}>
          <div className={styles.offerIntro}>
            <p className={styles.kicker}>The full step-by-step plan</p>
            <h2>{productName}</h2>
            <p>
              A simple guide to help you find the weak step, fix it and know what
              to do next.
            </p>
          </div>

          <Image
            className={styles.productMockup}
            src="/products/whatsapp-guide-bonus-bundle.png"
            alt="WhatsApp Views-to-Sales guide with Facebook and Instagram Ads, TikTok Ads, and Social Media Profile Optimization bonuses"
            width={1535}
            height={1024}
            sizes="(max-width: 760px) calc(100vw - 2rem), 62rem"
          />

          <div className={styles.inside}>
            <h3>Here is what you get.</h3>
            <ul>
              {systemItems.map((item) => (
                <li key={item}><Check size={19} aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </div>

          <div className={styles.auditBox}>
            <p className={styles.auditCount}><AuditMessage /></p>
            <h3>Buy Early And We Will Check Your Sales Pages For Free.</h3>
            <p>
              If you are one of the first 20 buyers, we will check one business
              across WhatsApp and the social pages you use to sell.
            </p>
            <p>
              You will get a clear report that shows what is weak and what to
              fix first.
            </p>
          </div>

          <div className={styles.priceBox} id="price">
            <p>One payment. Full access.</p>
            <strong>{price}</strong>
            <span>Guide, bonuses and direct access to ask us for help.</span>
            <a className={styles.buyButton} href={checkoutUrl}>
              Get The Full Guide
              <ArrowRight size={19} aria-hidden="true" />
            </a>
            <small>Pay with Paystack. Get your guide as soon as payment is confirmed.</small>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.letter}>
          <p className={styles.kicker}>Before you choose</p>
          <h2>Questions You May Have.</h2>
          <div className={styles.faqList}>
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalSection}>
        <div className={styles.letter}>
          <MessageCircle size={34} aria-hidden="true" />
          <h2>Your Next Status Can Be One More Guess. Or It Can Have A Job.</h2>
          <p>
            You now know that views, trust, the offer and follow-up must work as
            one path.
          </p>
          <p>Use the full guide to build that path for your own business.</p>
          <p className={styles.finalAudit}><AuditMessage /></p>
          <a className={styles.primaryButton} href={checkoutUrl}>
            Get Access For {price}
            <ArrowRight size={18} aria-hidden="true" />
          </a>
          <p className={styles.ps}>
            <strong>P.S.</strong> If you keep posting the same way, your result
            has no good reason to change.
          </p>
        </div>
      </section>

      <footer className={styles.footer}>
        <p>WhatsApp Views-to-Sales · A Copiwrite product</p>
        <a href="mailto:info@copiwrite.com">info@copiwrite.com</a>
      </footer>
    </main>
  );
}
